<template>
    <div class="component">
        <div class="report" v-show="roleStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            角色设置
                        </p>
                    </div>
                    <div class="content_btn" style="cursor:pointer">
                        <p @click="reportAdd" >
                            <span class="el-icon-plus"></span>
                            <span>角色添加</span>
                        </p>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top">
                    <div class="tab">
                        <el-table
                                :data="tableData"
                                style="width: 100%;margin-bottom: 20px;"
                                row-key="id"
                                border
                                accordion
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                :tree-props="{children: 'son'}">
                            <el-table-column
                                    label='角色名称'
                                    prop="group_name">
                            </el-table-column>
                            <el-table-column
                                    label="时间"
                                    prop="create_time">
                            </el-table-column>
                            <el-table-column
                                    align="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.row.id)">查看
                                    </el-button>
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="upd(scope.row.id)">修改
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
                    <!--                    <div class="page">-->
                    <!--                        <el-pagination-->
                    <!--                                @size-change="handleSizeChange"-->
                    <!--                                @current-change="handleCurrentChange"-->
                    <!--                                :current-page="queryInfo.pagenum"-->
                    <!--                                :page-sizes="[5, 10, 20, 30]"-->
                    <!--                                :page-size="queryInfo.pagesize"-->
                    <!--                                layout="total, sizes, prev, pager, next, jumper"-->
                    <!--                                :total="totalPage">-->
                    <!--                        </el-pagination>-->
                    <!--                    </div>-->
                </el-card>
            </div>
        </div>
        <myAdd @roleList="roleList" ref="reportAdd"/>
        <mySee ref="mySee"/>
        <myModify @roleList="roleList" ref="myModify"/>
    </div>
</template>

<script>
    import mySee from '../../views/Role/See/See'
    import myModify from '../../views/Role/Modify/Modify'
    import myAdd from '../../views/Role/Add/Add'
    import Api from '../../api/Role/Role'

    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                tableData: [],
                // queryInfo: { //分页
                //     query: '',
                //     pagenum: 1, //当前第几页
                //     pagesize: 5 //当前显示几条
                // },
                // totalPage: 0,//总条数
            }
        },
        methods: {
            reportAdd() {
                this.$refs.reportAdd.getSelect();
                this.$refs.reportAdd.getAdminSelect();
                this.$store.commit('roleStatus', false);
                this.$store.commit('addSRole', true)

            },
            handleEdit(id) {
                this.$store.commit('roleStatus', false);
                this.$store.commit('seeRole', true);
                Api.detailObj(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.mySee.getRple()
                })
            },
            upd(id) {
                this.$store.commit('roleStatus', false);
                this.$store.commit('updRole', true);
                Api.detailObj(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.myModify.getRple()
                })
            },
            handleDelete(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.roleDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.roleList()
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
            // handleSizeChange(newSize) { //当前显示多少条操作
            //     this.queryInfo.pagesize = newSize;
            //     this.roleList()
            // },
            // handleCurrentChange(newPage) { //当前页数操作
            //     this.queryInfo.pagenum = newPage;
            //     this.roleList()
            // },
            roleList() { //列表
                Api.roleList().then((res) => {
                    this.tableData = res.data;
                })
            }
        },
        computed: {
            roleStatus() {
                return this.$store.state.role.roleStatus
            },
        },
        mounted() {
            this.roleList()
        }
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

    .left_btn {
        margin-left: 10px;
    }

    label {
        display: block;
        padding: 10px 0;
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

    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    /*.page {*/
    /*    width: 100%;*/
    /*    text-align: center;*/
    /*    margin-top: 30px;*/
    /*}*/
</style>
