<template>
    <div class="component">
        <div class="report" v-show="lookStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                带看管理
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer">
                            <p @click="reportAdd()">
                                <span class="el-icon-plus"></span>
                                <span>带看添加</span>
                            </p>
                        </div>
                    </div>
                    <div class="share">
                        <myShare @lookList="lookList"/>
                    </div>
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
                                    label="时间"
                                    prop="look_time">
                            </el-table-column>
                            <el-table-column
                                    label="带看记录"
                                    prop="guide_look_content">
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
                                    align="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.row.id)">查看
                                    </el-button>
                                    <el-button type="primary" size="mini" @click="upd(scope.row.id)">修改</el-button>
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
        <myAdd @lookList="lookList"/>
        <mySee ref="mySee"/>
        <myModify ref="myModify" @lookList="lookList"/>
    </div>
</template>

<script>
    import mySee from '../../views/Look/See/See'
    import myModify from '../../views/Look/Modify/Modify'
    import myShare from '../../components/Pub/share/lookShare'
    import myAdd from '../../views/Look/Add/Add'
    import Api from '../../api/Look/Look'

    export default {
        components: {
            mySee,
            myModify,
            myShare,
            myAdd
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
                this.$store.commit('lookStatus', false);
                this.$store.commit('addLook', true)
            },
            handleEdit(id) {
                this.$store.commit('lookStatus', false);
                this.$store.commit('seeLook', true);
                Api.detailList(id).then((res)=>{
                    this.$store.commit('detailList',res.data);
                    this.$refs.mySee.parentMsg() //给子组件传方法，点击时触发
                })
            },
            upd(id) {
                this.$store.commit('lookStatus', false);
                this.$store.commit('updLook', true);
                Api.detailList(id).then((res)=>{
                    this.$store.commit('detailList',res.data);
                    this.$refs.myModify.parentMsg() //给子组件传方法，点击时触发
                })
            },
            handleDelete(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.lookDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.lookList()
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
                this.lookList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.lookList()
            },
            lookList() { //列表数据
                Api.lookList(this.queryInfo.pagenum, this.queryInfo.pagesize,this.$store.state.look.storefront_id,this.$store.state.look.area_id,this.$store.state.look.user_id,this.$store.state.look.client_id,this.$store.state.look.start_time,this.$store.state.look.end_time,
                ).then((res) => {
                    this.tableData = res.data.data;
                    this.totalPage = res.data.count
                })
            }
        },
        computed: {
            lookStatus() {
                return this.$store.state.look.lookStatus
            },
        },
        mounted() {
            this.lookList()
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

    .share {
        margin-top: 20px;
    }

    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .left_btn {
        margin-left: 10px;
    }

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>

