<template>
    <div class="component" >
        <div class="report" v-show="isIntentionStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <div class="add_content">
                    <div class="herder_box">
                        <div class="report_top">
                            <div class="layui-card-header">
                                <p>意向楼盘</p>
                                <p style="color: #177ce3;cursor: pointer;display: none" @click="reportAdd()" v-permission="{action:'add'}">+ 意向楼盘添加</p>
                            </div>
                        </div>
                        <div class="report-bottom">
                            <div class="search_int">
                                <label>区域</label>
                                <el-cascader :options="employeesAreaOptions"
                                             class="report_int"
                                             @change="employeesHandleChange"
                                             ref="employeesCascaderAddr"
                                             clearable
                                >
                                </el-cascader>
                            </div>
                            <div class="search_int">
                                <label>客户-手机号-维护人</label>
                                <el-select v-model="client_name" placeholder="请选择" class="report_int"
                                           @change="obtainId"
                                           clearable
                                           @clear="clearClient"
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
                            <div class="search_int">
                                <label>客户姓名</label>
                                <el-input
                                        placeholder="请输入客户姓名"
                                        v-model="housesName"
                                        class="report_int"
                                        clearable
                                        @clear="clearHousesName"
                                >
                                </el-input>
                            </div>
                            <div class="search_btn">
                                <el-button type="primary" class="btn" @click="searchBtn">立即查询</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top" v-permission="{action:'list'}">
                    <div class="tab">
                        <el-table
                                :data="tableData"
                                style="width: 100%"
                                border
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        >
                            <el-table-column
                                    label='客户名称'
                                    prop="client_name">
                            </el-table-column>
                            <el-table-column
                                    label='维护人'
                                    prop="user_name">
                            </el-table-column>
                            <el-table-column
                                    label='区域'
                                    prop="area_name">
                            </el-table-column>
                            <el-table-column
                                    label='意向楼盘'
                                    prop="building_name">
                            </el-table-column>
                            <el-table-column
                                    label='时间'
                                    prop="update_time">
                            </el-table-column>
                            <el-table-column
                                    align="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button @click="intentionSee(scope.row.id)"
                                               size="mini"
                                               v-permission="{action:'detail',effect:'disabled'}"
                                    >查看</el-button>
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.row.id)"
                                            v-permission="{action:'edit',effect:'disabled'}"
                                    >修改
                                    </el-button>
                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                class="left_btn"
                                                @click="handleDelete(scope.row.id)"
                                                v-permission="{action:'del',effect:'disabled'}"
                                        >删除
                                        </el-button>
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
        <myAdd @intentionList="intentionList"/>
        <mySee ref="mySee"/>
        <myModify ref="myModify" @intentionList="intentionList"/>
    </div>
</template>

<script>
    import myModify from './Modify/Modify'
    import myAdd from './Add/Add'
    import mySee from './See/See'
    import  Api from '../../api/Intention/Intention'
    import Axios from '../../api/pub/pub'
    import  { initDynamicRoutes } from '../../router/index'
    export default {
        components: {
            myModify,
            myAdd,
            mySee
        },
        data() {
            return {
                tableData: [],
                queryInfo: { //分页
                    query: '',
                    pagenum: 1, //当前第几页
                    pagesize: 5 //当前显示几条
                },
                totalPage: 0,//总条数
                //搜素字段-------
                employeesAreaOptions:[],
                housesName:'',
                employeesProvince_id:'',//省
                employeesCity_id:'',//市
                employeesArea_id:'',//区
                client_name:'',//客户id
                customerList:[], //客户-手机号-维护人
                client_id:'',
                user_id:'',

            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('isIntentionStatus', false);
                this.$store.commit('addisIntention', true)
            },
            intentionSee(id) {
                this.$store.commit('isIntentionStatus', false);
                this.$store.commit('seeisIntention', true);
                Api.detailList(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.mySee.createSet()
                })
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.intentionDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.intentionList()
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
            handleEdit(id){
                this.$store.commit('isIntentionStatus', false);
                this.$store.commit('updisIntention', true);
                Api.detailList(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.myModify.createSet()
                })
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                this.intentionList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.intentionList()
            },
            intentionList(){ //楼盘列表
                Api.intentionList(
                    this.queryInfo.pagenum,
                    this.queryInfo.pagesize,
                    this.client_id,
                    this.employeesProvince_id,
                    this.employeesCity_id,
                    this.employeesArea_id,
                    this.housesName
            ).then((res)=>{
                    this.tableData=res.data.data;
                    this.totalPage=res.data.count;
                })
            },
            //搜索操作
            employeesGetSelect() { //三级联动数据
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
                    this.employeesAreaOptions = JSON.parse(linkage)
                })
            },
            employeesHandleChange() { //获取省市区id传给后台获取门店数据
                if(!this.$refs.employeesCascaderAddr.getCheckedNodes()[0]){
                    this.employeesProvince_id = '';
                    this.employeesCity_id = '';
                    this.employeesArea_id = '';
                    return false;
                }
                var pathvalue = this.$refs.employeesCascaderAddr.getCheckedNodes()[0].path;
                this.employeesProvince_id = pathvalue[0];
                this.employeesCity_id = pathvalue[1];
                this.employeesArea_id = pathvalue[2];
                Api.intentionSelect(this.employeesArea_id).then((res)=>{
                    res.data.forEach(item => {
                        this.customerList.push({
                            label:'名称 : '+item.client_name + ' ; 手机号 : '+item.client_phone + ' ; 维护人 : '+item.user_name,
                            client_phone:item.client_phone,
                            value:item.client_id +','+item.user_id
                        });
                    });
                });
            },
            searchBtn(){
                this.intentionList()
            },
            obtainId(e){ //获取客户 / 维护人id
                let data =e.split(',');
                this.client_id=data[0];
                this.user_id=data[1];
            },
            clearHousesName(){
                this.housesName=''
            },
            clearClient(){
                this.client_id=''
            }
        },
        computed: {
            isIntentionStatus() {
                return this.$store.state.intention.isIntentionStatus
            },
        },
        mounted() {
            this.intentionList();
            initDynamicRoutes();
            this.employeesGetSelect()
        }
    }
</script>

<style scoped>
    .component{
        width: 100%;
        height: 100%;
    }
    .report {
        width: 100%;
        height: 100%;
        padding: 15px;
        box-sizing: border-box;
    }

    .add_box {
        width: 100%;
    }

    .add_content {
        width: 100%;
    }

    .content_btn > p:nth-child(1) {
        font-weight: bold;
    }


    .add_box >>> .el-card__body {
        padding: 20px 0 !important;
    }

    label {
        display: block;
        padding: 10px 0;
    }
    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
    .left_btn {
        margin-left: 10px;
    }
    .add_content {
        width: 100%;
    }
    .content_btn > p:nth-child(1) {
        font-weight: bold;
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
        width: 420px;
    }

    @media screen and (max-width: 1024px) {
        .report_int {
            width: 100% !important;
        }

        .search_int {
            width: 100% !important;
            padding-right: 0 !important;
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
</style>
