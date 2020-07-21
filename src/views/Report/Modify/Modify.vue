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
                                        v-model="create_data"
                                        type="date"
                                        placeholder="选择日期"
                                        class="date"
                                        value-format="yyyy-MM-dd"
                                        @change="finishDate"
                                >
                                </el-date-picker>
                                -
                                <el-time-picker
                                        v-model="create_time"
                                        placeholder="选择时间"
                                        class="date"
                                        value-format="HH:mm:ss"
                                        @change="finishTime"
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
                                <el-cascader v-model="valueArea" :options="areaOptions" clearable class="report_int"
                                             @change="handleChange"
                                             ref="cascaderAddr"
                                ></el-cascader>
                            </div>
                            <div class="int_box">
                                <label>门店</label>
                                <el-select v-model="storefront_name" placeholder="请选择区域" class="report_int"
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
                                <el-select v-model="user_Id" placeholder="请选择维护人" class="report_int"
                                           @change="userId"
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
                                <el-select v-model="clientType" placeholder="请选择客户类别" class="report_int"
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
                id: '',//报备id
                client_name: '', //客户名称
                client_phone: '', //电话
                create_data: '', //日期
                create_time: '', //时间
                remarks: '', //备注
                areaOptions: [],  //区域
                valueArea: [], // 区域回显 v-model 绑定的是一个数组
                area_id: '',// 区域id
                storefront_id: '',//门店id
                storefront_name: '',//门店名称
                storefrontOptions: [],//门店列表
                userOoptions: [],//维护人列表
                user_id: '',//维护人id
                user_Id: '',//维护人名称
                client_type: '',//客户类别id
                clientType: '',//客户类别名称
                clientOoptions: [],//客户类别列表
                dataTiem: '',//合并日期时间
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
                console.log(this.storefront_id)
                // this.onPage()
                // Api.clientUpd(
                //     this.id,
                //     this.client_name,
                //     this.client_phone,
                //     this.dataTiem,
                //     this.user_id,
                //     this.valueArea[0],
                //     this.valueArea[1],
                //     this.valueArea[2],
                //     this.storefront_id,
                //     this.remarks,
                //     this.client_type,
                // ).then((res) => {
                //     if(res.code==="200003"){
                //         this.$message.success('修改成功');
                //         this.$emit('reportList')
                //     }else{
                //         this.$message.error('修改失败')
                //     }
                // });
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
                this.valueArea[0]= pathvalue[0];
                this.valueArea[1]  = pathvalue[1];
                this.valueArea[2] = pathvalue[2];
                Axios.postStores(this.areaId).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.storefrontOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                });
            },
            getSlectList() { //获取员工列表拿到维护人id
                let page = 1;
                let pagesum = 999;
                let province_id =  this.valueArea[0];
                let city_id =  this.valueArea[1];
                let area_id =  this.valueArea[2];
                let storefront_id = this.storefront_id;
                Api.getSlectList(page, pagesum, province_id, city_id, area_id, storefront_id).then((res) => {
                    let cityData = JSON.stringify(res.data.user_data);
                    this.userOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                })
            },
            categoryList() { //客户类别
                let pageNum = 1;
                let pageSize = 999;
                Api.categoryList(pageNum, pageSize).then((res) => {
                    let cityData = JSON.stringify(res.data);
                    this.clientOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/type_name/g, "label"));
                })
            },
            storesData() { //门店回显处理数据
                Axios.postStores(this.valueArea[2]).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.storefront_id) {
                            this.storefront_name = item.label;
                        }
                    })
                });
            },
            userData() { //维护人回显数据判断
                let page = 1;
                let pagesum = 999;
                let province_id =  this.valueArea[0];
                let city_id =  this.valueArea[1];
                let area_id =  this.valueArea[2];
                let storefront_id = this.storefront_id;
                Api.getSlectList(page, pagesum, province_id, city_id, area_id, storefront_id).then((res) => {
                    let cityData = JSON.stringify(res.data.user_data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.user_id) {
                            this.user_Id = item.label
                        }
                    })
                })
            },
            categoryDdta() { //客户类别回显数据处理
                let pageNum = 1;
                let pageSize = 999;
                Api.categoryList(pageNum, pageSize).then((res) => {
                    let cityData = JSON.stringify(res.data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/type_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.client_type) {
                            this.clientType = item.label
                        }
                    })
                })
            },
            storefrontValue(e) { //获取门店id
                this.storefront_id = e;
                this.getSlectList()
            },
            userId(e) {
                this.user_id = e
            },
            clientValue(e) { //获取客户类别id
                this.client_type = e
            },
            finishDate(e) { //日期处理
                this.create_data = e;
            },
            finishTime(e) { //时间处理
                this.create_time = e;
                this.dataTiem = this.create_data + ' ' + this.create_time
            },
            setData(data) { //设置vuex数据负值给data
                this.client_name = data.client_name;
                this.client_phone = data.client_phone;
                this.create_data = data.create_time;
                this.create_time = data.create_time;
                this.dataTiem=data.create_time;
                this.remarks = data.remarks;
                this.storefront_id = data.storefront_id;
                this.area_id = data.area_id;
                this.user_id = data.user_id;
                this.client_type = data.client_type;
                this.id = data.id;
                this.valueArea = [data.province_id + '', data.city_id + '', data.area_id + '']
            },
            parentMsg() {
                this.detailList;
                this.storesData();
                this.userData();
                this.categoryDdta();
            }
        },
        computed: {
            updStatus() {
                return this.$store.state.report.updStatus
            },
            detailList() {
                this.setData(this.$store.state.report.detailList);
                return this.$store.state.report.detailList
            }
        },

        mounted() {
            this.getSelect();
            this.detailList;
            this.storesData();
            this.userData();
            this.categoryDdta();
            this.categoryList();
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

    .report_int {
        width: 600px;
    }

    .content_box {
        width: 100%;
    }

    .date {
        width: 295px;
    }

    .See_int {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
