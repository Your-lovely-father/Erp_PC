<template>
    <div class="component">
        <div class="report" v-show="adminStatus">
            <div class="add_box">
                <!--    搜索区域        -->
<!--                <el-card>-->
<!--                    <div class="add_content">-->
<!--                        <div class="content_title">-->
<!--                            <p>-->
<!--                                权限管理-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="content_btn" style="cursor:pointer">-->
<!--                            <p @click="reportAdd()">-->
<!--                                <span class="el-icon-plus"></span>-->
<!--                                <span>权限添加</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="search">-->
<!--                        <div class="int_box">-->
<!--                            <label>角色</label>-->
<!--                            <el-input-->
<!--                                    placeholder="请输角色"-->
<!--                                    v-model="name"-->
<!--                                    clearable-->
<!--                                    class="report_int"-->
<!--                            >-->
<!--                                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
<!--                            </el-input>-->
<!--                        </div>-->
<!--                        <div class="int_box_right left">-->
<!--                            <label>时间</label>-->
<!--                            <el-date-picker-->
<!--                                    v-model="date"-->
<!--                                    type="date"-->
<!--                                    placeholder="选择日期"-->
<!--                                    class="date"-->
<!--                            >-->
<!--                            </el-date-picker>-->
<!--                            - -->
<!--                            <el-time-picker-->
<!--                                    v-model="time"-->
<!--                                    placeholder="选择时间"-->
<!--                                    class="date"-->
<!--                            >-->
<!--                            </el-time-picker>-->
<!--                        </div>-->
<!--                        <div class="btn">-->
<!--                            <el-row>-->
<!--                                <el-button type="primary" size="medium" class="btn_a">搜索</el-button>-->
<!--                            </el-row>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </el-card>-->
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            权限管理
                        </p>
                    </div>
                    <div class="content_btn" style="cursor:pointer">
                        <p @click="reportAdd()" v-permission="{action:'add'}">
                            <span class="el-icon-plus"></span>
                            <span>权限添加</span>
                        </p>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top" v-permission="{action:'list'}">
                    <!--    表格区域  -->
                    <div class="table">
                        <div class="tab">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%;margin-bottom: 20px;"
                                    row-key="id"
                                    border
                                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                    :tree-props="{children: 'son'}">
                                <el-table-column
                                        label='角色名称'
                                        prop="rule_name">
                                </el-table-column>
                                <el-table-column
                                        label="Url"
                                        prop="rule_url">
                                </el-table-column>
                                <el-table-column
                                        align="right"
                                        label="操作"
                                >
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                @click="handleEdit(scope.row.id)"
                                                v-permission="{action:'detail',effect:'disabled'}"
                                        >查看
                                        </el-button>
                                        <el-button
                                                type="primary"
                                                size="mini"
                                                @click="upd(scope.row.id)"
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
                        <!--                            <div class="page">-->
                        <!--                                <el-pagination-->
                        <!--                                        @size-change="handleSizeChange"-->
                        <!--                                        @current-change="handleCurrentChange"-->
                        <!--                                        :current-page="queryInfo.pagenum"-->
                        <!--                                        :page-sizes="[5, 10, 20, 30]"-->
                        <!--                                        :page-size="queryInfo.pagesize"-->
                        <!--                                        layout="total, sizes, prev, pager, next, jumper"-->
                        <!--                                        :total="totalPage">-->
                        <!--                                </el-pagination>-->
                        <!--                            </div>-->
                    </div>
                </el-card>
            </div>
        </div>
        <myAdd @adminList="adminList"/>
        <mySee ref="mySee"/>
        <myModify ref="myModify" @adminList="adminList"/>
    </div>
</template>

<script>
    import mySee from '../../views/Admin/See/See'
    import myAdd from '../../views/Admin/Add/Add'
    import myModify from '../../views/Admin/Modify/Modify'
    import Api from '../../api/Admin/Admin'
    import  { initDynamicRoutes } from '../../router/index'
    export default {
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                isShow: false,//查看
                isShowAdd: false,//添加
                isShowsUpd: false,//修改
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                name: '',
                type: [],
                date: '',
                time: '',
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
                this.$store.commit('adminStatus', false);
                this.$store.commit('addAdmin', true);
            },
            handleEdit(id) {
                this.$store.commit('adminStatus', false);
                this.$store.commit('seeAdmin', true);
                Api.detailObj(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.mySee.setAdmin()
                })
            },
            upd(id) {
                this.$store.commit('adminStatus', false);
                this.$store.commit('updAdmin', true);
                Api.detailObj(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.myModify.setAdmin()
                })
            },
            handleDelete(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.adminDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.adminList()
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
            //     this.adminList()
            // },
            // handleCurrentChange(newPage) { //当前页数操作
            //     this.queryInfo.pagenum = newPage;
            //     this.adminList()
            // },
            adminList() {
                Api.adminList().then((res) => {
                    this.tableData = res.data;
                })
            }
        },
        computed: {
            adminStatus() {
                return this.$store.state.admin.adminStatus
            },
        },
        mounted() {
            this.adminList();
            initDynamicRoutes()
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

    .add_content {
        width: 100%;
        height: 60px;
        line-height: 40px;
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

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
    .search {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin-left: 20px;
        margin-top: 20px;
    }

    .report_int {
        width: 300px;
        margin-right: 20px;
    }

    .btn {
        margin-left: 20px;
    }

    .left_btn {
        margin-left: 10px;
    }

    label {
        margin-right: 20px;
    }

    .btn_a {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
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


    .add_box >>> .el-card__body {
        padding: 20px 0 !important;
    }

    .top {
        margin-top: 20px;
        padding: 20px;
    }

</style>
