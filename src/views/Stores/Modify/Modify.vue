<template>
    <div class="reportAdd" v-show="updstores">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改门店
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页"
                                    placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>修改门店</p>
                    </div>
                    <div class="content_box">
                        <div class="form_box">
                            <div class="int_box">
                                <label>门店名称</label>
                                <el-input
                                        placeholder="请输入门店名称"
                                        v-model="storefront_name"
                                        clearable
                                        class="report_int"
                                >
                                </el-input>
                            </div>
                            <div class="int_box">
                            <label>区域</label>
                            <el-cascader v-model="areaValue" :options="areaOptions" clearable class="report_int"
                                         @change="handleChange"
                                         ref="cascaderAddr"
                            ></el-cascader>
                            </div>
                            <!--<div class="int_box">-->
                                <!--<label>时间</label>-->
                                <!--<el-date-picker-->
                                        <!--v-model="date"-->
                                        <!--type="date"-->
                                        <!--placeholder="选择日期"-->
                                        <!--class="data"-->
                                <!--&gt;-->
                                <!--</el-date-picker>-->
                                 <!-- - -->
                                <!--<el-time-picker-->
                                        <!--v-model="time"-->
                                        <!--placeholder="选择时间"-->
                                        <!--class="data"-->
                                <!--&gt;-->
                                <!--</el-time-picker>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="footer">
                        <el-button @click="cancel" size="medium">取消</el-button>
                        <el-button type="primary" @click="confirm" size="medium">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import  Api from '../../../api/pub/pub'
    import  Axios from '../../../api/Stores/Stores'
    export default {
        data() {
            return {
                storefront_name:'',//门店名称
                areaOptions: [], //区域
                areaValue:[], //区域回显数据以组形势显示
                id:'',  //门店id
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdStores', true);
                this.$store.commit('isUpdStatusStores', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                Axios.storesUpd(this.id,this.storefront_name,this.areaValue[0],this.areaValue[1],this.areaValue[2]).then((res)=>{
                    if(res.code==="200003"){
                        this.$message.success('修改成功');
                        this.$emit('storesSee')
                    }else {
                        this.$message.error('修改失败')
                    }
                })
            },
            getSelect(){  //这块是接口的三级联动数据
                Api.getSelect().then((res)=>{
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
                    this.areaOptions = JSON.parse(linkage)
                })
            },
            handleChange() { //获取省市区id
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.areaValue[0]= pathvalue[0];
                this.areaValue[1]  = pathvalue[1];
                this.areaValue[2] = pathvalue[2];
            },
            storesDate(data){
                this.id=data.id;
                this.storefront_name=data.storefront_name;
                this.areaValue=[data.province_id + '', data.city_id + '', data.area_id + '']
            },
            parentMsg(){
                this.modifySee;
            },
        },
        computed: {
            updstores() {
                return this.$store.state.stores.updstores
            },
            modifySee(){
                this.storesDate(this.$store.state.stores.modifySee);
                return this.$store.state.stores.modifySee
            }
        },
        mounted(){
            this.modifySee;
            this.getSelect();
        },

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
        overflow: hidden;
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

    label {
        display: block;
        padding: 20px 0;
    }

    .form_box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 300px;
        margin-right: 20px;
    }

    .content_box {
        width: 100%;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
