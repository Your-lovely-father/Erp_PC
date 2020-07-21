<template>
    <div class="reportAdd" v-show="updStatus">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改报备
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
                        <p>修改报备</p>
                    </div>
                    <div class="content_box">
                        <div class="See_int">
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
                                        v-model="create_time"
                                        type="date"
                                        placeholder="选择日期"
                                        class="date"
                                >
                                </el-date-picker>
                                -
                                <el-time-picker
                                        v-model="create_time"
                                        placeholder="选择时间"
                                        class="date"
                                >
                                </el-time-picker>
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
                                <label>区域</label>
                                <el-cascader  v-model="valueArea" :options="areaOptions" clearable class="report_int"
                                              @change="handleChange"
                                              ref="cascaderAddr"
                                ></el-cascader>
                            </div>
                            <div class="int_box">
                                <label>门店</label>
                                <el-select v-model="storefront_id" placeholder="请选择区域" class="report_int"
                                           @change="storefrontValue"
                                >
                                    <el-option
                                            v-for="item in storefrontOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="int_box">
                                <label>维护人</label>
                                <el-select v-model="user_id" placeholder="请选择维护人" class="report_int"
                                >
                                    <el-option
                                            v-for="item in userOoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
<!--                            <div class="int_box">-->
<!--                                <label>带看楼盘</label>-->
<!--                                <el-select v-model="customer" placeholder="请选择带看楼盘" class="report_int"-->
<!--                                >-->
<!--                                    <el-option-->
<!--                                            v-for="item in customerOoptions"-->
<!--                                            :key="item.customer"-->
<!--                                            :label="item.label"-->
<!--                                            :value="item.customer"-->
<!--                                    >-->
<!--                                    </el-option>-->
<!--                                </el-select>-->
<!--                            </div>-->
<!--                            <div class="int_box">-->
<!--                                <label>意向楼盘</label>-->
<!--                                <el-select v-model="customer" placeholder="请选择意向楼盘" class="report_int"-->
<!--                                >-->
<!--                                    <el-option-->
<!--                                            v-for="item in customerOoptions"-->
<!--                                            :key="item.customer"-->
<!--                                            :label="item.label"-->
<!--                                            :value="item.customer"-->
<!--                                    >-->
<!--                                    </el-option>-->
<!--                                </el-select>-->
<!--                            </div>-->
                            <div class="int_box">
                                <label>客户类别</label>
                                <el-select v-model="client_type" placeholder="请选择客户类别" class="report_int"
                                           @change="clientValue"
                                >
                                    <el-option
                                            v-for="item in clientOoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
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
    import Axios from '../../../api/pub/pub'
    import Api from '../../../api/Report/Report'
    export default {
        data() {
            return {
                client_name:'', //客户名称
                client_phone:'', //电话
                create_time:'', //时间
                remarks:'', //备注
                areaOptions:[],  //区域
                valueArea:[], //区域
                area_id:'',
                storefront_id:'',//门店
                storefrontOptions:[],//门店
                userOoptions:[],//维护人
                user_id:'',//维护人
                client_type:'',//客户类别
                clientOoptions:[]//客户类别

            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpd', true);
                this.$store.commit('isUpdStatus', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
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
                // var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                // this.province_id = pathvalue[0];
                // this.city_id = pathvalue[1];
                // this.area_id = pathvalue[2];
                // Axios.postStores(this.area_id).then(res => {
                //     let cityData = JSON.stringify(res.data.data);
                //     this.storefrontOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                // });
            },
            stores(){
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                    console.log(this.storefront_id)
                        data.map((item,index)=>{
                        if(item.value == this.storefront_id){
                            this.storefront_id=item.label
                            console.log(this.storefront_id)
                        }
                    })
                });
            },
            storefrontValue(e){ //获取门店id
                // this.storefront_id=e;
                // this.getSlectList()
            },
            clientValue(e){ //获取客户类别id
                // this.client_type=e
            },
            // getSlectList(){ //获取员工列表拿到维护人id
            //     let page =1;
            //     let pagesum =999;
            //     let province_id =this.province_id;
            //     let city_id = this.city_id;
            //     let area_id = this.area_id;
            //     let storefront_id = this.storefront_id+'';
            //     Api.getSlectList(page,pagesum,province_id,city_id,area_id,storefront_id).then((res)=>{
            //         let cityData = JSON.stringify(res.data.user_data);
            //         this.userOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
            //     })
            // },
            // reportList() { //客户报备列表
            //     Api.reportList(this.queryInfo.pagenum, this.queryInfo.pagesize,this.start_time,this.end_time,this.building_id,this.client_name,this.client_phone,this.area_id,this.storefront_id,this.user_id,this.client_type).then((res) => {
            //         this.tableData = res.data.data;
            //         // console.log(this.tableData)
            //         this.totalPage = res.data.count;
            //     })
            // },
            setData(data){
                console.log(data)

                this.client_name=data.client_name;
                this.client_phone=data.client_phone;
                this.create_time=data.create_time;
                this.remarks=data.remarks;
                this.storefront_id=data.storefront_id;
                this.area_id=data.area_id;
                this.valueArea = [data.province_id+'',data.city_id+'',data.area_id+'']
            },
            parentMsg(){
                this.detailList
            }
        },
        computed: {
            updStatus() {
                return this.$store.state.report.updStatus
            },
            detailList() {
                this.setData(this.$store.state.report.detailList);
                return  this.$store.state.report.detailList
            }
        },
        mounted() {
            this.getSelect();
            this.stores()
            this.detailList

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
        padding: 15px 0;
    }
    .report_int{
        width: 600px;
    }
    .content_box{
        width: 100%;
    }
    .date{
        width: 295px;
    }
    .See_int{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
