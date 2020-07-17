<template>
    <div class="component">
        <div class="report" v-show="employeesStatus">
            <div class="add_box">
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            员工管理
                        </p>
                    </div>
                    <div class="content_btn" style="cursor:pointer">
                        <p @click="reportAdd()">
                            <span class="el-icon-plus"></span>
                            <span>员工添加</span>
                        </p>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top">
                    <div class="tab">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%;"
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
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
                                            @change="changeSwitch(scope.row)"
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
                                            @change="moveSwitch(scope.row)"
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
        <myAdd  @getSelectList="getSelectList"/>
        <mySee :selectSee="selectSee"/>
        <myModify :selectUpd="selectUpd"/>
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
                // user_status:false,
                // mobile_terminal_status:false,
                queryInfo: { //分页
                    query: '',
                    pagenum: 1, //当前第几页
                    pagesize: 5 //当前显示几条
                },
                totalPage: 0,//总条数
                selectSee: {},//详情数据
                selectUpd: {}//修改数据
            }
        },

        methods: {
            reportAdd() {
                this.$store.commit('employeesStatus', false);
                this.$store.commit('addEmployees', true)
            },
            handleClick(id) { //查看
                this.$store.commit('employeesStatus', false);
                this.$store.commit('seeEmployees', true)
                Api.postSee(id).then((res)=>{
                    if (res.code !== 200) {
                        return this.$message.error('获取详情失败')
                    }
                    this.selectSee=res.data;
                });
                this.isShow = true
            },
            upd(val) {
                this.$store.commit('employeesStatus', false);
                this.$store.commit('updEmployees', true);
                this.selectUpd=val;
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
            changeSwitch(status){ //状态切换开关
                if(status.user_status === 1){
                    status.user_status= 2
                }else {
                    status.user_status= 1
                }
            },
            moveSwitch(status){ //开通手机端切换开关
                if(status.mobile_terminal_status === 1){
                    status.mobile_terminal_status= 2
                }else {
                    status.mobile_terminal_status= 1
                }
            },
        },
        mounted() {
            this.getSelectList();
        },
        computed: {
            employeesStatus() {
                return this.$store.state.employees.employeesStatus
            },
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

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }
    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>

