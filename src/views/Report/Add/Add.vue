<template>
    <div class="reportAdd" v-show="addStatus">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加报备
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>报备信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
                                    <label>姓名</label>
                                    <el-input
                                            placeholder="请输入姓名"
                                            v-model="client_name"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>电话</label>
                                    <el-input
                                            placeholder="请输入电话"
                                            v-model="client_phone"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>报备时间</label>
                                    <el-date-picker
                                            v-model="reportedData"
                                            type="date"
                                            placeholder="选择日期"
                                            class="date"
                                            @change="reportData"
                                            value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="reportedTime"
                                            placeholder="选择时间"
                                            class="date"
                                            @change="reportTime"
                                            value-format="HH:mm:ss"
                                    >
                                    </el-time-picker>
                                </div>
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader :options="areaOptions" clearable class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-select v-model="storefront_id" placeholder="请选择" class="report_int"
                                               @change="storefrontValue"
                                    >
                                        <el-option
                                                v-for="item in storesOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>维护人</label>
                                    <el-select v-model="user_id" placeholder="请选择" class="report_int"
                                               @change="userValue"
                                    >
                                        <el-option
                                                v-for="item in user_idOoptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>备注</label>
                                    <el-input
                                            placeholder="请输入备注"
                                            v-model="remarks"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>客户类别</label>
                                    <el-select v-model="client_type" placeholder="请选择" class="report_int"
                                               @change="clientValue"
                                    >
                                        <el-option
                                                v-for="item in customerOoptions"
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
    import Api from '../../../api/Report/Report'
    import Axios from '../../../api/pub/pub'

    export default {
        name: "See",
        data() {
            return {
                //添加字段
                client_name: '',//客户姓名
                client_phone: '',//客户电话
                reportedData: '',
                reportedTime: '',
                reported_time: '',//报备时间
                user_id: '',//员工id
                province_id: '',//省级id
                city_id: '',//市级id
                area_id: '',// 区域id
                storefront_id: '',//门店id
                remarks: '',//备注
                province_id:'',
                city_id:'',
                client_type: '',//客户类型
                areaOptions: [], //区域
                storesOptions:[],//门店
                user_idOoptions: [], //维护人
                customerOoptions: [],//客户类别
            }
        },
        methods: {
            onPage() {
                this.$store.commit('showReport', true);
                this.$store.commit('showStatus', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() { //添加
                this.onPage();
                Api.reportAdd(this.client_name, this.client_phone, this.reported_time, this.user_id, this.province_id, this.city_id, this.area_id, this.storefront_id, this.remarks, this.client_type).then((res) => {
                   if(res.code === '200001'){
                       this.$message.success('添加成功');
                       this.$emit('reportList')
                   }else {
                       this.$message.error('添加失败')
                   }
                });
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
                    this.areaOptions = JSON.parse(linkage)
                })
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.storesOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                });
            },
            getSlectList(){ //获取员工列表拿到维护人id
                let page =1;
                let pagesum =999;
                let province_id =this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                let storefront_id = this.storefront_id+'';
                Api.getSlectList(page,pagesum,province_id,city_id,area_id,storefront_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.user_data);
                    this.user_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                })
            },
            categoryList(){ //客户类别列表
                let page =1;
                let pageNum=999;
                Api.categoryList(page,pageNum).then((res)=>{
                    let cityData = JSON.stringify(res.data);
                    this.customerOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/type_name/g, "label"));
                })
            },
            storefrontValue(e) { //获取门店id
                this.storefront_id = e;
                this.getSlectList()

            },
            userValue(e){ //获取维护人id
                this.user_id=e
            },
            reportData(e) { //获取报备时间处理格式
                this.reportedData = e;
            },
            reportTime(e) { //获取报备时间处理格式
                this.reportedTime = e;
                this.reported_time = this.reportedData + ' ' + this.reportedTime;
            },
            clientValue(e){ //获取客户类别id
                this.client_type=e
            },
        },
        computed: {
            addStatus() {
                return this.$store.state.report.addStatus
            },
        },
        mounted() {
            this.getSelect();
            this.categoryList()
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

    .box_form {
        width: 100%;
    }

    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .report_int {
        width: 600px;
    }

    label {
        display: block;
        padding: 20px 0;
    }

    .date {
        width: 295px;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
