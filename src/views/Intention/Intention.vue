<template>
    <div class="component" >
        <div class="report" v-show="isIntentionStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            意向楼盘
                        </p>
                    </div>
                    <div class="content_btn" style="cursor:pointer">
                        <p @click="reportAdd()">
                            <span class="el-icon-plus"></span>
                            <span>意向楼盘添加</span>
                        </p>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top">
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
                                               size="mini">查看</el-button>
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.row.id)">修改
                                    </el-button>
                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                class="left_btn"
                                                @click="handleDelete(scope.row.id)">删除
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
                Api.intentionList(this.queryInfo.pagenum,this.queryInfo.pagesize).then((res)=>{
                    this.tableData=res.data.data;
                    this.totalPage=res.data.count;
                })
            }
        },
        computed: {
            isIntentionStatus() {
                return this.$store.state.intention.isIntentionStatus
            },
        },
        mounted() {
            this.intentionList()
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
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        border-bottom: 1px #eee solid;
        border-radius: 5px;
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
</style>
