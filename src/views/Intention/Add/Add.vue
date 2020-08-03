<template>
    <div class="reportAdd" v-show="addisIntention">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加区域
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>区域信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="form_box">
                            <div class="form">
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader :options="searchAreaOptions" clearable class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    ></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>意向楼盘</label>
                                    <el-select v-model="building_id" placeholder="请选择" class="report_int"
                                               @change="buildingId"
                                    >
                                        <el-option
                                                v-for="item in buildingOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>客户-手机号-维护人</label>
                                    <el-select v-model="client_name" placeholder="请选择" class="int"
                                               @change="obtainId"
                                    >
                                        <el-option
                                                v-for="item in customerList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="footer">
                        <el-button size="medium" @click="cancel()">取消</el-button>
                        <el-button type="primary" size="medium" @click="confirm()">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from '../../../api/pub/pub'
    import Api from '../../../api/Intention/Intention'
    import repApi from '../../../api/Report/Report'
    export default {
        data() {
            return {
                searchAreaOptions:[] , //区域
                province_id:'',//省
                city_id:'',//市
                area_id:'',//区
                customerList:[], //客户-手机号-维护人
                buildingOptions:[],//楼盘
                client_name:'',//客户id
                client_id:'',//客户id
                user_id:'',//维护人id
                building_id:'',//楼盘id
            }
        },
        methods: {
            onPage() {
                this.$store.commit('showIntention', true);
                this.$store.commit('showIntentionStatus', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                Api.intentionAdd(this.client_id,this.user_id,this.building_id,this.province_id,this.city_id,this.area_id).then((res)=>{
                    if(res.code === "200001"){
                        this.$message.success('添加成功');
                        this.$emit('intentionList')
                    }else {
                        this.$message.error('添加失败')
                    }
                })
            },
            getSelect() { //三级联动数据
                Axios.getSelect().then((res) => {
                    const data = res.data[0].son;
                    data.map((item) => {
                        item.label = item.AREA_NAME;
                        item.value = item.AREA_ID;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.AREA_NAME;
                                el.value = el.AREA_ID;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.AREA_NAME;
                                        key.value = key.AREA_ID;
                                        key.children = key.son;

                                    })
                                }
                            })
                        }
                    });
                    //把数据存在本地长期储存中
                    window.localStorage.setItem('linkage', JSON.stringify(data));
                    var linkage = window.localStorage.getItem('linkage');
                    this.searchAreaOptions = JSON.parse(linkage)
                })
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Api.intentionSelect(this.area_id).then((res)=>{
                    res.data.forEach(item => {
                        this.customerList.push({
                            label:'名称 : '+item.client_name + ' ; 手机号 : '+item.client_phone + ' ; 维护人 : '+item.user_name,
                            client_phone:item.client_phone,
                            value:item.id +','+item.user_id
                        });
                    });
                });
                this.buildingList()
            },
            buildingList(){ //楼盘字典列表获取意向楼盘
                let page =1 ;
                let pagesum = 999;
                let province_id =this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                repApi.buildingList(page,pagesum,province_id,city_id,area_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.buildingOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                })
            },
            obtainId(e){ //获取客户 / 维护人id
                let data =e.split(',');
                this.client_id=data[0];
                this.user_id=data[1];
            },
            buildingId(e){ //获取楼盘id
                this.building_id=e
            },

        },
        computed: {
            addisIntention() {
                return this.$store.state.intention.addisIntention
            },
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .add_box {
        width: 300px;
        height: 300px;
        background: #f0f2f5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: change 1s;
        -webkit-animation-fill-mode: forwards;
    }

    @keyframes change {
        from {
            width: 300px;
            height: 300px;
        }

        to {
            width: 100%;
            height: 100%;
        }

    }

    .poor {
        width: 98.2%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 99;
    }

    .el-icon-close {
        color: #333;
        font-weight: bold;
        font-size: 18px;
    }

    .addContent {
        width: 98.3%;
        margin: 15px;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 55px;

    }

    .The_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px #eee solid;
        padding-left: 15px;
    }

    .content_box {
        width: 98.3%;
        padding: 15px;
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }
    .form_box{
        width: 100%;
    }
    .form{
        width: 100%;
        display: flex;
    }
    .report_int{
        width: 300px;
        margin-right: 20px;
    }
    label {
        display: block;
        padding: 20px 0;
    }
    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .int{
        width: 500px;
    }
</style>
