<template>
    <div class="component">
        <div class="report" v-show="reportStatus">
            <!--  herder      -->
            <div class="herder_box">
                <div class="report_top">
                    <div class="layui-card-header">
                        <p>客户报备</p>
                        <p style="color: #177ce3;cursor: pointer" @click="reportAdd()" v-permission="{action:'add'}">+ 报备添加</p>
                    </div>
                </div>
                <div class="report-bottom">
                    <div class="search_int">
                        <label>姓名</label>
                        <el-input
                                placeholder="请输入姓名"
                                v-model="client_name"
                                clearable
                                class="report_int"
                                prefix-icon="el-icon-search"
                                @clear="clearName"
                        >
                        </el-input>
                    </div>
                    <div class="search_int">
                        <label>电话</label>
                        <el-input
                                placeholder="请输入电话"
                                v-model="client_phone"
                                clearable
                                class="report_int"
                                prefix-icon="el-icon-search"
                                @clear="clearPhone"
                        >
                        </el-input>
                    </div>
                    <div class="search_int">
                        <label>区域</label>
                        <el-cascader :options="searchAreaOptions" clearable
                                     class="report_int"
                                     @change="handleChange"
                                     ref="cascaderAddr"
                        >
                        </el-cascader>
                    </div>
                    <div class="search_int">
                        <label>门店</label>
                        <el-select v-model="storefront_id" placeholder="请选择" class="report_int"
                                   @change="storefrontValue"
                                   clearable
                                   @clear="clearStorefront"
                        >
                            <el-option
                                    v-for="item in searchStoresOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search_int">
                        <label>维护人</label>
                        <el-select v-model="user_id" placeholder="请选择" class="report_int"
                                   @change="userId"
                                   clearable
                                   @clear="clearUser"
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
                    <div class="search_int">
                        <label>意向楼盘</label>
                        <el-select v-model="building_id" placeholder="请选择" class="report_int"
                                   @change="buildingId"
                                   clearable
                                   @clear="clearBuilding_id"
                        >
                            <el-option
                                    v-for="item in building_idOoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search_int">
                        <label>客户类别</label>
                        <el-select v-model="client_type" placeholder="请选择" class="report_int"
                                   @change="clientValue"
                                   clearable
                                   @clear="clearType"
                        >
                            <el-option
                                    v-for="item in searchCustomerOoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search_int">
                        <label>起止时间</label>
                        <el-date-picker
                                v-model="start_data_start"
                                type="date"
                                placeholder="选择日期"
                                class="report_int date"
                                prefix-icon="el-icon-search"
                                @change="getData"
                                value-format="yyyy-MM-dd"
                                clearable
                                @clear="clearStartDate"
                        >
                        </el-date-picker>
                        <span class="cross">
                                    -
                            </span>
                        <el-time-picker
                                v-model="start_time_start"
                                placeholder="选择时间"
                                class="report_int date"
                                prefix-icon="el-icon-search"
                                @change="getTime"
                                value-format="HH:mm:ss"
                                clearable
                                @clear="clearStartTime"
                        >
                        </el-time-picker>
                    </div>
                    <div class="search_int">
                        <label class="label">结束时间</label>
                        <el-date-picker
                                v-model="end_data_finish"
                                type="date"
                                placeholder="选择日期"
                                class="report_int date"
                                prefix-icon="el-icon-search"
                                @change="finishDate"
                                value-format="yyyy-MM-dd"
                                clearable
                                @clear="clearFinishDate"
                        >
                        </el-date-picker>
                        <span class="cross">
                                    -
                            </span>
                        <el-time-picker
                                v-model="end_time_finish"
                                placeholder="选择时间"
                                class="report_int date"
                                prefix-icon="el-icon-search"
                                @change="finishTime"
                                value-format="HH:mm:ss"
                                clearable
                                @clear="clearFinishTime"
                        >
                        </el-time-picker>
                    </div>
                    <div class="search_btn">
                        <el-button type="primary" class="btn" @click="searchBtn">立即查询</el-button>
                    </div>
                </div>
            </div>
            <!--   table     -->
            <div class="table_box">
                <div class="tab">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%;"
                            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                    >
                        <el-table-column
                                fixed
                                prop="client_name"
                                label="姓名"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="client_phone"
                                label="电话"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="reported_time"
                                label="报备时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="user_name"
                                label="维护人"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="province_name,city_name,area_name"
                                label="区域"
                                width="180">
                            <template slot-scope="scope">
                                {{scope.row.province_name}}-{{scope.row.city_name}}-{{scope.row.area_name}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="storefront_name"
                                label="门店"
                                width="180">
                        </el-table-column>

                        <el-table-column
                                prop="remarks"
                                label="备注"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="type_name"
                                label="客户类别"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-dropdown trigger="click">
                                    <dl class="more">
                                        <dt><p></p>
                                            <p>更多</p>
                                            <p class="el-icon-caret-bottom"></p></dt>
                                    </dl>
                                    <el-dropdown-menu :style="menuShows">
                                        <el-dropdown-item style="padding:0">
                                            <dl class="more">
                                                <dd>
                                                    <p @click="handleClick(scope.row.client_id)"
                                                       v-permission="{action:'detail',effect:'disabled'}"
                                                    >查看</p>
                                                    <p @click="upd(scope.row.client_id)"
                                                       v-permission="{action:'edit',effect:'disabled'}"
                                                    >编辑</p>
                                                    <p slot="reference" class="el-popconfirm "
                                                       @click="del(scope.row.client_id)"
                                                       v-permission="{action:'del',effect:'disabled'}"
                                                    >删除
                                                    </p>
                                                    <p @click="genJin(scope.row)">跟进
                                                    </p>
                                                </dd>
                                            </dl>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--     分页区域       -->
                <div class="page">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            :page-sizes="[5, 10, 20, 30]"
                            :page-size="queryInfo.pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalPage">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--  弹框区域      -->
        <el-dialog
                title="跟进管理"
                :visible.sync="dialogVisible"
                width="30%"
               >
            <div class="tail_content">
                <!--      表单添加区域      -->
                <div class="form">
                        <div class="tail_box_textarea">
                            <span class="p1">跟进记录</span>
                            <el-input
                                    placeholder="请输入跟进记录"
                                    clearable
                                    type="textarea"
                                    v-model="trackingGuide_look_content"
                                    class="tracking_textarea"
                            >
                            </el-input>
                        </div>
                        <div class="tail_box">
                             <span class="p1">时间</span>
                            <el-date-picker
                                    v-model="trackingLookDate"
                                    type="date"
                                    placeholder="选择日期"
                                    class="tracking_data"
                                    @change="trackingGetData"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                            -
                            <el-time-picker
                                    v-model="trackingLookTime"
                                    placeholder="选择时间"
                                    class="tracking_data"
                                    @change="trackingGgetTime"
                                    value-format="HH:mm:ss"
                            >
                            </el-time-picker>
                        </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
            <el-button @click="off" size="small">取 消</el-button>
            <el-button type="primary" @click="ascertain" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <!--   组件区域     -->
        <myAdd @reportList="reportList"/>
        <mySee ref="mySee"/>
        <myModify ref="myModify" @reportList="reportList"/>
    </div>

</template>

<script>
    import mySee from '../../views/Report/See/See'
    import myModify from '../../views/Report/Modify/Modify'
    import myAdd from '../../views/Report/Add/Add'
    import Api from '../../api/Report/Report'
    import Axios from '../../api/pub/pub'
    import {initDynamicRoutes} from '../../router/index'
    import  trackingApi from '../../api/Tracking/Tracking';

    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                //搜索字段
                start_data_start: '',
                start_time_start: '',
                start_time: '',//起始时间
                end_data_finish: '',
                end_time_finish: '',
                end_time: '',//结束时间
                building_id: '',//楼盘id
                client_name: '',//客户姓名
                client_phone: '',//客户电话
                area_id: '',//区域id
                storefront_id: '',// 门店id
                user_id: '',//员工id
                client_type: '',//客户类型id
                searchAreaOptions: [], //区域
                searchStoresOptions: [], //门店
                searchCustomerOoptions: [], // 客户类别
                user_idOoptions: [], // 员工列表
                building_idOoptions: [], // 楼盘列表
                province_id: '',
                city_id: '',
                tableData: [],
                queryInfo: { //分页
                    query: '',
                    pagenum: 1, //当前第几页
                    pagesize: 5 //当前显示几条
                },
                totalPage: 0,//总条数
                isShowMore: false,
                menuShows: {},
                //------------跟进字段
                dialogVisible: false,
                trackingGuide_look_content:'', //带看记录
                trackingClient_id:'',//客户id
                trackingUser_id:'',//维护人id
                trackingStorefront_id:'',//门店id
                trackingLookDate:'',//日期
                trackingLookTime:'',//时间
                trackingLook_time:'' ,//日期时间合并
                trackingProvince_id:'',
                trackingCity_id:'',
                trackingArea_id:''

            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('reportStatus', false);
                this.$store.commit('addStatus', true)
            },
            handleClick(id) {
                this.$store.commit('reportStatus', false);
                this.$store.commit('seeStatus', true);
                this.menuShows = {display: 'none', opacity: '0'};
                setTimeout(() => {
                    this.menuShows = {display: 'none', opacity: '1'}
                }, 500);
                //获取详情
                Api.detailObject(id).then((res) => {
                    this.$store.commit('detailList', res.data);
                    this.$refs.mySee.getSee()
                });
            },
            upd(id) {
                this.$store.commit('reportStatus', false);
                this.$store.commit('updStatus', true);
                this.menuShows = {display: 'none', opacity: '0'};
                setTimeout(() => {
                    this.menuShows = {display: 'none', opacity: '1'}
                }, 500);
                //获取详情
                Api.detailObject(id).then((res) => {
                    this.$store.commit('detailList', res.data);
                    this.$refs.myModify.parentMsg() //给子组件传方法，点击时触发
                });
            },
            genJin(val){
                this.dialogVisible=true;
                this.trackingClient_id=val.id;
                this.trackingUser_id=val.user_id;
                this.trackingArea_id=val.area_id;
                this.trackingStorefront_id=val.storefront_id;
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                this.reportList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.reportList()
            },
            del(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.reportDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.reportList()
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
                    this.searchAreaOptions = JSON.parse(linkage)
                })
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                if (!this.$refs.cascaderAddr.getCheckedNodes()[0]) {
                    this.province_id = '';
                    this.city_id = '';
                    this.area_id = '';
                    return false;
                }
                this.storefront_id='';
                this.user_id='';
                this.user_idOoptions=[];
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.searchStoresOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                });
                this.buildingList()
            },
            getSlectList() { //获取员工列表拿到维护人id
                let page = 1;
                let pagesum = 999;
                let province_id = this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                let storefront_id = this.storefront_id + '';
                Api.getSlectList(page, pagesum, province_id, city_id, area_id, storefront_id).then((res) => {
                    let cityData = JSON.stringify(res.data.user_data);
                    this.user_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                })
            },
            buildingList() { //楼盘字典列表获取意向楼盘
                let page = 1;
                let pagesum = 999;
                let province_id = this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                Api.buildingList(page, pagesum, province_id, city_id, area_id).then((res) => {
                    let cityData = JSON.stringify(res.data.data);
                    this.building_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                })
            },
            category() { //客户类别列表
                let page = 1;
                let pageNum = 999;
                Api.categoryList(page, pageNum).then((res) => {
                    let cityData = JSON.stringify(res.data);
                    this.searchCustomerOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/type_name/g, "label"));
                })
            },
            searchBtn() {//搜索
                this.reportList()
            },
            storefrontValue(e) { //获取门店id
                this.storefront_id = e;
                this.user_id='';
                this.getSlectList()
            },
            clientValue(e) { //获取客户类别id
                this.client_type = e
            },
            userId(e) { //维护人id
                this.user_id = e
            },
            getData(e){ //起止日期处理 yyy-mm-dd
                this.start_data_start=e;
                if(!this.start_data_start){
                    this.start_data_start=''
                }
                this.start_time=this.start_data_start + ' ' +this.start_time_start;
                if(!this.start_data_start && !this.start_time_start){
                    this.start_time=''
                }
            },
            getTime(e){ //起止时间处理
                this.start_time_start=e;
                if(!this.start_time_start){
                    this.start_time_start=''
                }
                if(!this.start_data_start){
                    this.start_data_start=''
                }
                this.start_time=this.start_data_start + ' ' +this.start_time_start;
                if(!this.start_data_start && !this.start_time_start){
                    this.start_time=''
                }
            },
            finishDate(e){ //结束日期处理
                this.end_data_finish=e;
                if(!this.end_data_finish){
                    this.end_data_finish=''
                }
                this.end_time=this.end_data_finish + ' ' +this.end_time_finish;
                if(!this.end_data_finish && !this.end_time_finish){
                    this.end_time=''
                }
            },
            finishTime(e){ //结束时间处理
                this.end_time_finish=e;
                if(!this.end_time_finish){
                    this.end_time_finish=''
                }
                if(!this.end_data_finish){
                    this.end_data_finish=''
                }
                this.end_time=this.end_data_finish + ' ' +this.end_time_finish;
                if(!this.end_data_finish && !this.end_time_finish){
                    this.end_time=''
                }
            },
            buildingId(e) { // 楼盘id
                this.building_id = e
            },
            reportList() { //客户报备列表
                Api.reportList(this.queryInfo.pagenum, this.queryInfo.pagesize, this.start_time, this.end_time, this.building_id, this.client_name, this.client_phone, this.area_id, this.storefront_id, this.user_id, this.client_type).then((res) => {
                    this.tableData = res.data.data;
                    // console.log(this.tableData)
                    this.totalPage = res.data.count;
                })
            },
            //以下是清空搜索操作
            clearName() {
                this.client_name = ''
            },
            clearPhone() {
                this.client_phone = ''
            },
            clearStartDate() {
                this.start_data_start = ''
            },
            clearStartTime() {
                this.start_time_start = ''
            },
            clearFinishDate() {
                this.end_data_finish = ''
            },
            clearFinishTime() {
                this.end_time_finish = ''
            },
            clearStorefront() {
                this.storefront_id = ''
            },
            clearUser() {
                this.user_id = ''
            },
            clearBuilding_id() {
                this.building_id = ''
            },
            clearType() {
                this.client_type = ''
            },
            //以下为跟进操作区域
            off(){ //取消
                this.dialogVisible=false;
            },
            ascertain(){//确定
                this.dialogVisible=false;
                trackingApi.trackingAdd(
                    this.trackingGuide_look_content,
                    this.trackingClient_id,
                    this.trackingUser_id,
                    this.trackingArea_id,
                    this.trackingStorefront_id,
                    this.trackingLook_time
                ).then((res)=>{
                    if(res.code==="200001"){
                        this.$message.success('添加成功');
                    }
                });
            },
            trackingGetData(e){//日期
                this.trackingLookDate=e
            },
            trackingGgetTime(e){ //时间
                this.trackingLookTime=e;
                this.trackingLook_time=this.trackingLookDate + ' '+this.trackingLookTime
            }
        },
        computed: {
            reportStatus() {
                return this.$store.state.report.reportStatus
            },
            reluAdus() {
                return this.$store.state.report.reluAdus
            }
        },
        mounted() {
            this.reportList();
            this.getSelect();
            this.category();
            initDynamicRoutes();
        },
    }
</script>

<style scoped>
    .component {
        width: 100%;
        height: 100%;
    }

    .report {
        padding: 15px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    /*herder*/
    .herder_box {
        margin-bottom: 15px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }

    .layui-card-header {
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
        border-bottom: 1px solid #f6f6f6;
        color: #333;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }

    /*  search  */
    .report-bottom {
        padding: 10px 15px;
        line-height: 24px;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .search_int {
        padding-right: 15px;
    }


    .report-bottom {
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 193px;
    }

    @media screen and (max-width: 1024px) {
        .report_int {
            width: 100% !important;
        }

        .search_int {
            width: 100% !important;
            padding-right: 0 !important;
        }

        .date {
            width: 48.9% !important;
        }

        .search_btn {
            padding-top: 15px !important;
        }
    }

    .btn {
        width: 100px;
        background-image: -webkit-linear-gradient(left, #29adeb, #177ce3);
    }
    .search_btn {
        padding-top: 43px;
    }
    /* table */
    .table_box {
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .tab {
        padding: 10px 15px;
    }

    .tab >>> .el-table_1_column_9 > .cell {
        display: flex;
        justify-content: center;
    }

    /*  更多   */
    .more {
        margin: 0 2px;
        width: 75px;
        /*position: relative;*/
    }

    .more > dt {
        border-radius: 5px;
        background: #ffffff;
        width: 100%;
        height: 24px;
        font-weight: bold;
        color: gray;
        border: 1px solid #d2ccc4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
    }

    .more > dt:hover {
        border: 1px solid #177ce3;
        cursor: pointer;
    }

    .more > dd {
        width: 100%;
        padding: 0 5px;
        text-align: center;
        box-sizing: border-box;
        z-index: 999;
        background: #ffffff;
    }

    .more > dd > p {
        line-height: 28px;
        padding: 5px 8px;
        border-bottom: 1px #ccc solid;
        color: #177ce3;
    }

    .more > dd > p:nth-child(4) {
        border-bottom: none;
    }

    .more > dd > p:hover {
        cursor: pointer;
    }

    /*  page   */
    .page {
        text-align: center;
        padding: 10px 15px;
    }
    /*  弹框样式   */
    .component>>>.el-dialog__header{
        padding: 0 80px 0 20px;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        background-color: #F8F8F8;
        border-radius: 2px 2px 0 0;
    }
    .component>>>.el-dialog__headerbtn{
       margin-top: -7px;
    }
    .component>>>.el-dialog__title{
        font-size: 14px;
        color: #333;
    }
    .dialog-footer{
        width: 100%;
        text-align: center;
    }
    .tail_content{
        padding: 10px 15px 0 15px;
    }
    /* 弹框内容样式*/
    .form{
        width: 100%;
    }
    .p1{
        float: left;
        display: block;
        padding: 9px 15px;
        width: 80px;
        font-weight: 400;
        line-height: 20px;
        text-align: right;
    }
    .tracking_int{
      display: block;
      width: 100%;
    }
    .tracking_data{
        width: 50%;
        display: block;
    }
    .tail_box{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .tail_box_textarea{
        width: 100%;
        height: 110px;
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .tail_box_textarea>>>.el-textarea__inner{
            width: 100%;
            height: 110px;
            resize: none;
    }

</style>
<style>
    .el-dropdown-menu {
        border: 1px solid #d2ccc4;
        padding: 0 3px;
        transform: translateX(10px);
    }
</style>
