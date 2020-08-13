<template>
    <div class="component">
        <div class="report" v-show="reportStatus">
            <div class="add_box">
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                客户报备
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer">
                            <p @click="reportAdd()" v-permission="{action:'add'}">
                                <span class="el-icon-plus"></span>
                                <span >报备添加</span>
                            </p>
                        </div>
                    </div>
                    <!--    搜索区域        -->
                    <div class="search">
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
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
                                <div class="int_box">
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
                                <div class="int_box dateTime">
                                    <div class="start">
                                        <label class="">起止时间</label>
                                        <el-date-picker
                                                v-model="start_data_start"
                                                type="date"
                                                placeholder="选择日期"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                                @change="getData"
                                                value-format="yyyy-MM-dd"
                                                @clear="clearStartDate"
                                        >
                                        </el-date-picker>
                                        <span class="cross">
                                    -
                                </span>
                                        <el-time-picker
                                                v-model="start_time_start"
                                                placeholder="选择时间"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                                @change="getTime"
                                                value-format="HH:mm:ss"
                                                @clear="clearStartTime"
                                        >
                                        </el-time-picker>
                                    </div>
                                    <div class="finish">
                                        <label class="label">结束时间</label>
                                        <el-date-picker
                                                v-model="end_data_finish"
                                                type="date"
                                                placeholder="选择日期"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                                @change="finishDate"
                                                value-format="yyyy-MM-dd"
                                                @clear="clearFinishDate"
                                        >
                                        </el-date-picker>
                                        <span class="cross">
                                    -
                                </span>
                                        <el-time-picker
                                                v-model="end_time_finish"
                                                placeholder="选择时间"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                                @change="finishTime"
                                                value-format="HH:mm:ss"
                                                @clear="clearFinishTime"
                                        >
                                        </el-time-picker>
                                    </div>
                                </div>
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader :options="searchAreaOptions" clearable
                                                 class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    >
                                    </el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-select v-model="storefront_id" placeholder="请选择" class="report_int"
                                               @change="storefrontValue"
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
                                <div class="int_box">
                                    <label>维护人</label>
                                    <el-select v-model="user_id" placeholder="请选择" class="report_int"
                                               @change="userId"
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
                                <div class="int_box">
                                    <label>意向楼盘</label>
                                    <el-select v-model="building_id" placeholder="请选择" class="report_int"
                                               @change="buildingId"
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
                                <div class="int_box">
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
                                <div class="int_box btn_search">
                                    <el-button type="primary" class="btn" @click="searchBtn">搜索</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
                <!--    表格区域        -->
                <el-card class="top" v-permission="{action:'list'}">
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
                                        <dt><p></p><p>更多</p><p class="el-icon-caret-bottom"></p></dt>
                                        </dl>
                                        <el-dropdown-menu >
                                            <dl class="more">
                                            <dd >
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
                                            <p >跟进
                                            </p>
                                            </dd>
                                            </dl>
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
                </el-card>
            </div>
        </div>
        <myAdd @reportList="reportList"/>
        <mySee/>
        <myModify ref="myModify" @reportList="reportList"/>
    </div>
</template>

<script>
    import mySee from '../../views/Report/See/See'
    import myModify from '../../views/Report/Modify/Modify'
    import myAdd from '../../views/Report/Add/Add'
    import Api from '../../api/Report/Report'
    import Axios from '../../api/pub/pub'
    import  { initDynamicRoutes } from '../../router/index'
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
                start_data_start:'',
                start_time_start:'',
                start_time:'',//起始时间
                end_data_finish:'',
                end_time_finish:'',
                end_time:'',//结束时间
                building_id:'',//楼盘id
                client_name:'',//客户姓名
                client_phone:'',//客户电话
                area_id:'',//区域id
                storefront_id:'',// 门店id
                user_id:'',//员工id
                client_type:'',//客户类型id
                searchAreaOptions: [], //区域
                searchStoresOptions: [], //门店
                searchCustomerOoptions: [], // 客户类别
                user_idOoptions: [], // 员工列表
                building_idOoptions: [], // 楼盘列表
                province_id:'',
                city_id:'',
                tableData: [],
                queryInfo: { //分页
                    query: '',
                    pagenum: 1, //当前第几页
                    pagesize: 5 //当前显示几条
                },
                totalPage: 0,//总条数
                isShowMore:false,
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
                //获取详情
                Api.detailObject(id).then((res)=>{
                    this.$store.commit('detailList',res.data)
                })
            },

            upd(id) {
                this.$store.commit('reportStatus', false);
                this.$store.commit('updStatus', true);
                //获取详情
                Api.detailObject(id).then((res)=>{
                    this.$store.commit('detailList',res.data);
                    this.$refs.myModify.parentMsg() //给子组件传方法，点击时触发
                })

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
                if(!this.$refs.cascaderAddr.getCheckedNodes()[0]){
                    this.province_id = '';
                    this.city_id = '';
                    this.area_id = '';
                    return false;
                }
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
            buildingList(){ //楼盘字典列表获取意向楼盘
                let page =1 ;
                let pagesum = 999;
                let province_id =this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                Api.buildingList(page,pagesum,province_id,city_id,area_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.building_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                })
            },
            category(){ //客户类别列表
                let page =1;
                let pageNum=999;
                Api.categoryList(page,pageNum).then((res)=>{
                    let cityData = JSON.stringify(res.data);
                    this.searchCustomerOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/type_name/g, "label"));
                })
            },
            searchBtn(){//搜索
                this.reportList()
            },
            storefrontValue(e){ //获取门店id
               this.storefront_id=e;
                this.getSlectList()
            },
            clientValue(e){ //获取客户类别id
                this.client_type=e
            },
            userId(e){ //维护人id
                this.user_id=e
            },
            getData(e){ //起止日期处理 yyy-mm-dd
                this.start_data_start=e;
                if(!e){
                    this.start_data_start='';
                }
            },
            getTime(e){ //起止时间处理
                this.start_time_start=e;
                this.start_time=this.start_data_start + ' ' +this.start_time_start;
                if(!this.start_data_start && !this.start_time_start){
                    this.start_time=''
                }
                if(!e){
                    this.start_time_start=''
                }
            },
            finishDate(e){ //结束日期处理
                this.end_data_finish=e;
                if(!e){
                    this.end_data_finish=''
                }
            },
            finishTime(e){ //结束时间处理
                this.end_time_finish=e;
                this.end_time=this.end_data_finish + ' ' +this.end_time_finish;
                if(!this.end_data_finish && !this.end_time_finish){
                    this.end_time=''
                }
                if(!e){
                    this.end_time_finish=''
                }
            },
            buildingId(e){ // 楼盘id
                this.building_id=e
            },
            reportList() { //客户报备列表
                Api.reportList(this.queryInfo.pagenum, this.queryInfo.pagesize,this.start_time,this.end_time,this.building_id,this.client_name,this.client_phone,this.area_id,this.storefront_id,this.user_id,this.client_type).then((res) => {
                    this.tableData = res.data.data;
                    // console.log(this.tableData)
                    this.totalPage = res.data.count;
                })
            },
            //以下是清空搜索操作
            clearName(){
                this.client_name=''
            },
            clearPhone(){
                this.client_phone=''
            },
            clearStartDate(){
                this.start_data_start=''
            },
            clearStartTime(){
                this.start_time_start=''
            },
            clearFinishDate(){
                this.end_data_finish=''
            },
            clearFinishTime(){
                this.end_time_finish=''
            },
            clearStorefront(){
                this.storefront_id=''
            },
            clearUser(){
                this.user_id=''
            },
            clearBuilding_id(){
                this.building_id=''
            },
            clearType(){
                this.client_type=''
            },
        },
        computed: {
            reportStatus() {
                return this.$store.state.report.reportStatus
            },
            reluAdus(){
                return this.$store.state.report.reluAdus
            }
        },
        mounted() {
            this.reportList();
            this.getSelect();
            this.category();
            initDynamicRoutes()
        },
    }
</script>

<style scoped>
    .component {
        width: 100%;
        height: 100%;
    }

    .report {
        width: 98.3%;
        height: 100%;
        margin: 15px;
    }

    .add_box {
        width: 100%;
    }

    .add_content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px #eee solid;
    }

    .content_title {
        padding-left: 20px;
        padding-bottom: 20px;
    }

    .content_btn {
        padding-right: 20px;
        padding-bottom: 20px;
        color: #1981e4;
    }

    .content_btn > p:nth-child(1) {
        font-weight: bold;
    }


    .add_box >>> .el-card__body {
        padding: 20px 0 !important;
    }

    .box_form {
        padding: 20px;
    }

    .form {
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 200px;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .int_box {
        margin-right: 30px;
    }

    .btn_search {
        margin-top: 37px;
    }

    .btn {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
    }

    .cross {
        padding: 0 7px;
    }

    .top {
        margin-top: 20px;
        padding: 20px;
    }
    .tab{
        width: 100%;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }
    .tab>>>.el-table_1_column_9>.cell{
        display: flex;
        justify-content: center;
        /*overflow: visible !important;*/

    }
    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
    .dateTime{
        display: flex;
        height: 79px;
        align-items: center;
    }
    .label{
        display: block;
    }
    .finish{
        margin-left: 30px;
    }
    .more{
        margin: 0 2px;
        width: 75px;
        /*position: relative;*/
    }
    .more>dt{
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
    .more>dt:hover{
        border: 1px solid #177ce3;
        cursor: pointer;
    }
    .more>dd{
        width: 100%;
        padding: 0 5px;
        text-align: center;
        box-sizing: border-box;
        z-index: 999;
        background: #ffffff;
    }
    .more>dd>p{
        line-height: 28px;
        padding: 5px 8px;
        border-bottom: 1px #ccc solid;
        color: #177ce3;
    }
    .more>dd>p:nth-child(4){
        border-bottom: none;
    }
    .more>dd>p:hover{
        cursor: pointer;
    }

</style>
<style>
   .el-dropdown-menu {
    border: 1px solid #d2ccc4;
       padding: 0 3px;
       transform: translateX(10px);
   }
</style>
