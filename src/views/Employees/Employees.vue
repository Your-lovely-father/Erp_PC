<template>
    <div class="report">
        <!--    卡片视图区域    -->
        <el-card>
            <!--     表格区域       -->
            <div class="tab">
                <div class="add">
                    <el-row>
                        <el-button type="primary" @click="add()">添加</el-button>
                    </el-row>
                </div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;"

                >
                    <el-table-column
                            fixed
                            prop="user_name"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="user_phone"
                            label="电话"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user_image"
                            label="头像"
                            width="180"

                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.headDialogImageUrl" style="height: 50px"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="user_age"
                            label="年龄"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user_sex"
                            label="性别"
                            width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.user_sex === 20 ? '男' : '女'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="user_id_card"
                            label="身份证号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user_status"
                            label="状态"
                            width="180">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.user_status === 1 ? true : false "
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="storefront_id"
                            label="门店"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="mobile_terminal_status"
                            label="开通手机端"
                            width="180">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.mobile_terminal_status === 1 ? true : false "
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="upd(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <mySee :isShow.sync="isShow" :selectSee="selectSee"/>
            <myModify :isShowsUpd.sync="isShowsUpd" :selectUpd="selectUpd"/>
            <myAdd :isShowAdd.sync="isShowAdd"  @getSelectList="getSelectList"/>
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
</template>

<script>
    import mySee from '../../views/Employees/See/See'
    import myModify from '../../views/Employees/Modify/Modify'
    import myAdd from '../../views/Employees/Add/Add'
    import Api from '../../api/Employees/Employees'

    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                isShowAdd: false,//添加
                isShow: false,//查看
                isShowsUpd: false,//修改
                tableData: [],//员工列表
                queryInfo: { //分页
                    query: '',
                    pagenum: 1, //当前第几页
                    pagesize: 5 //当前显示几条
                },
                totalPage: 0 ,//总条数
                selectSee:{},//详情数据
                selectUpd:{}//修改数据
            }
        },
        methods: {
            handleClick(id) { //查看
               Api.postSee(id).then((res)=>{
                   if (res.code !== 200) {
                       return this.$message.error('获取详情失败')
                   }
                    this.selectSee=res.data
               });
                this.isShow = true
            },
            add() {//添加弹框
                this.isShowAdd = true
            },
            upd(val) { //修改弹框
                this.selectUpd=val;
                this.isShowsUpd = true
            },
            del(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.postDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.getSelectList()
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
            getSelectList() {//员工列表查询
                Api.getSlectList(this.queryInfo).then((res) => {
                    if (res.code !== 200) {
                        return this.$message.error('获取员工列表失败')
                    }
                    this.tableData = res.data.user_data ; //员工列表数据
                    this.totalPage = res.data.count //分页总条数

                });
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                this.getSelectList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.getSelectList()
            },
        },
        mounted() {
            this.getSelectList();
        }
    }
</script>

<style scoped>
    .report {
        width: 100%;
        height: 100%;
    }

    .el-card {
        height: 100%;
        overflow: auto;
    }

    .el-popconfirm {
        margin-left: 10px;
    }

    .box_form {
        width: 100%;
    }

    .form {
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .report_int {
        width: 800px;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .date {
        width: 392px;
    }

    .sub_btn {
        padding: 20px 0;
        text-align: right;
    }

    .tab {
        width: 100%;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .page {
        width: 100%;
        text-align: center;
        padding: 30px 0;
    }

    .state {
        display: flex;
        width: 800px;
        justify-content: space-between;
    }

    .add {
        padding: 30px 0;
    }
</style>
