<template>
    <div class="component" >
        <div class="report" v-show="trackingStatus">
            <div class="add_box">
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                跟进管理
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer;display: none">
                            <p @click="reportAdd()" v-permission="{action:'add'}">
                                <span class="el-icon-plus"></span>
                                <span>跟进添加</span>
                            </p>
                        </div>
                    </div>
                    <!--    搜索区域        -->
                    <div class="share">
                        <myShare @trackingList="trackingList"/>
                    </div>
                </el-card>
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
                                    label="时间"
                                    prop="follow_time">
                            </el-table-column>
                            <el-table-column
                                    label="跟进记录"
                                    prop="record_content">
                            </el-table-column>
                            <el-table-column
                                    label="客户名称"
                                    prop="client_name">
                            </el-table-column>
                            <el-table-column
                                    label="维护人"
                                    prop="user_name">
                            </el-table-column>
                            <el-table-column
                                    align="right"  label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.row.id)"
                                            v-permission="{action:'detail',effect:'disabled'}"
                                    >查看</el-button>
                                    <el-button type="primary"  size="mini" @click="upd(scope.row.id)"
                                               v-permission="{action:'edit',effect:'disabled'}"
                                    >修改</el-button>

                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                class="left_btn"
                                                @click="handleDelete(scope.row.id)"
                                                v-permission="{action:'del',effect:'disabled'}"
                                        >删除</el-button>
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
        <myAdd @trackingList="trackingList"/>
        <mySee  ref="mySee"/>
        <myModify ref="myModify" @trackingList="trackingList"/>
    </div>
</template>

<script>
    import mySee from '../../views/Tracking/See/See'
    import myModify from '../../views/Tracking/Modify/Modify'
    import myShare from '../../components/Pub/share/share'
    import myAdd from '../../views/Tracking/Add/Add'
    import  Api from '../../api/Tracking/Tracking'
    import  { initDynamicRoutes } from '../../router/index'
    export default {
        components: {
            mySee,
            myModify,
            myShare,
            myAdd
        },
        data() {
            return {
                tableData: [],//员工列表
                queryInfo: { //分页
                    query: '',
                    pagenum: 1, //当前第几页
                    pagesize: 5 //当前显示几条
                },
                totalPage: 0,//总条数
            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('trackingStatus', false);
                this.$store.commit('addTracking', true)
            },
            handleEdit(id) {
                this.$store.commit('trackingStatus', false);
                this.$store.commit('seeTracking', true);
                Api.detailList(id).then((res)=>{
                    this.$store.commit('detailList',res.data);
                    this.$refs.mySee.parentMsg() //给子组件传方法，点击时触发
                })

            },
            upd(id) {
                this.$store.commit('trackingStatus', false);
                this.$store.commit('updTracking', true);
                Api.detailList(id).then((res)=>{
                    this.$store.commit('detailList',res.data);
                    this.$refs.myModify.parentMsg() //给子组件传方法，点击时触发
                })
            },
            handleDelete(id){ //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.trackingDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.trackingList()
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
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                this.trackingList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.trackingList()
            },
            trackingList(){ //列表
                Api.trackingList(this.queryInfo.pagenum ,this.queryInfo.pagesize,
                    this.$store.state.log.area_id,this.$store.state.log.storefront_id,
                    this.$store.state.log.user_id,this.$store.state.log.start_time,this.$store.state.log.end_time
                ).then((res)=>{
                    this.tableData=res.data.data;
                    this.totalPage=res.data.count
                })
            }
        },
        computed: {
            trackingStatus() {
                return this.$store.state.tracking.trackingStatus
            },
        },
        mounted() {
            this.trackingList();
            initDynamicRoutes()
        }
    }
</script>

<style scoped>
    .component{
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
        padding: 12px 15px;
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
        padding: 0 !important;
        box-sizing: border-box;
    }
    .share{
       width: 100%;
    }
    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }
    .left_btn{
        margin-left: 10px;
    }
    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>

