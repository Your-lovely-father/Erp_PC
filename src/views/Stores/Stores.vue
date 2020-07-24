<template>
    <div class="component">
        <div class="report" v-show="storesStatus">
            <div class="add_box">
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                门店管理
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer">
                            <p @click="reportAdd()">
                                <span class="el-icon-plus"></span>
                                <span>门店添加</span>
                            </p>
                        </div>
                    </div>
                    <!--    搜索区域        -->
                    <myShare/>
                </el-card>
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
                                    label='门店名称'
                                    prop="storefront_name">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--label='负责区域'-->
                            <!--prop="address">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    label="时间"
                                    prop="update_time">
                            </el-table-column>
                            <el-table-column
                                    align="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.row.id)">修改
                                    </el-button>
                                    <el-button
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
                                :current-page="queryInfo.page"
                                :page-sizes="[5, 10, 20, 30]"
                                :page-size="queryInfo.offset"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tablePage">
                        </el-pagination>
                    </div>
                </el-card>
            </div>
        </div>
        <myAdd @storesSee="storesSee"/>
        <myModify/>
    </div>
</template>

<script>
    import myModify from '../../views/Stores/Modify/Modify'
    import myShare from '../../components/Pub/address/address'
    import myAdd from '../../views/Stores/Add/Add'
    import Api from '../../api/Stores/Stores'

    export default {
        name: "Report",
        components: {
            myShare,
            myModify,
            myAdd
        },
        data() {
            return {
                tableData: [], //门店列表数据
                queryInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                tablePage: 0,//总条数
            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('storesStatus', false);
                this.$store.commit('addstores', true)
            },
            handleEdit(id) {
                Api.storesDetails(id).then((res) => {
                    this.$store.commit('modifySee',res.data)
                });
                this.$store.commit('storesStatus', false);
                this.$store.commit('updStores', true)
            },
            handleDelete(id) { //删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.storesDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.storesSee()
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
                this.queryInfo.offset = newSize;
                this.storesSee()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.page = newPage;
                this.storesSee()
            },
            storesSee() { //列表的查询
                Api.storesSee(this.queryInfo.page, this.queryInfo.offset).then((res) => {
                    this.tableData = res.data.data;
                    this.tablePage = res.data.count //总条数
                })
            }
        },
        computed: {
            storesStatus() {
                return this.$store.state.stores.storesStatus
            },
        },
        mounted() {
            this.storesSee()
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

    .add_box > > > .el-card__body {
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

    .tab>>>.el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
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
