<template>
    <div class="component" >
        <div class="report" v-show="logStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                日志管理
                            </p>
                        </div>
                    </div>
                    <myShare @logSee="logSee"/>
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
                                    label="操作人"
                                    prop="user_name">
                            </el-table-column>
                            <el-table-column
                                    label="操作时间"
                                    prop="create_time">
                            </el-table-column>
                            <el-table-column
                                    label="操作内容"
                                    prop="title">
                            </el-table-column>
                            <el-table-column
                                    label="区域管理"
                                    prop="province_name,city_name,area_name">
                                <template slot-scope="scope">
                                    {{scope.row.province_name}}-{{scope.row.city_name}}-{{scope.row.area_name}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="门店管理"
                                    prop="storefront_name">

                            </el-table-column>

                            <el-table-column
                                    align="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.row.id)"
                                            v-permission="{action:'detail',effect:'disabled'}"
                                    >查看
                                    </el-button>
                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                class="left_btn"
                                                @click="handleDelete( scope.row.id)"
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
        <mySee ref="myModify" />
    </div>
</template>

<script>
    import  mySee from '../../views/Log/See/See'
    import  myShare from '../../components/Pub/share/share'
    import  Api from '../../api/Log/Log'
    import  { initDynamicRoutes } from '../../router/index'
    export default {
        components:{
            mySee,
            myShare
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
            }
        },
        methods: {
            handleEdit(id) {
                this.$store.commit('logStatus', false);
                this.$store.commit('seeLog', true);
                Api.logDetail(id).then((res)=>{
                    this.$store.commit('detailObject', res.data);
                    this.$refs.myModify.parentMsg() //给子组件传方法，点击时触发
                })
            },
            handleDelete(id){ //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.logDel(id).then(res => {
                        if (res.code === "200") {
                            this.$message.success("删除"+res.msg);
                            this.logSee()
                        } else {
                            this.$message.error("删除"+res.msg);
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
                this.logSee()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.logSee()
            },
            logSee(){
                Api.logSee(this.queryInfo.pagenum,this.queryInfo.pagesize,this.$store.state.log.area_id,this.$store.state.log.storefront_id,this.$store.state.log.user_id,this.$store.state.log.start_time,this.$store.state.log.end_time).then((res)=>{
                    this.tableData=res.data.data;
                    this.totalPage=res.data.count
                })
            }
        },
        computed: {
            logStatus() {
                return this.$store.state.log.logStatus
            },
        },
        mounted() {
            this.logSee();
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
    .add_box {
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
</style>
