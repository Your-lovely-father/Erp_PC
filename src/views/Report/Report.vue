<template>
    <div class="component">
        <div class="report" v-show="reportStatus">
            <div class="add_box">
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                客户报备
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer">
                            <p @click="reportAdd()">
                                <span class="el-icon-plus"></span>
                                <span>报备添加</span>
                            </p>
                        </div>
                    </div>
                    <!--    搜索区域        -->
                    <div class="search">
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
                                    <label>姓名</label>
                                    <el-input
                                            placeholder="请输入姓名"
                                            v-model="searchName"
                                            clearable
                                            class="report_int"
                                            prefix-icon="el-icon-search"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>电话</label>
                                    <el-input
                                            placeholder="请输入电话"
                                            v-model="searchPhone"
                                            clearable
                                            class="report_int"
                                            prefix-icon="el-icon-search"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box dateTime">
                                    <div class="start">
                                        <label class="">起止时间</label>
                                        <el-date-picker
                                                v-model="searchDate"
                                                type="date"
                                                placeholder="选择日期"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                        >
                                        </el-date-picker>
                                        <span class="cross">
                                    -
                                </span>
                                        <el-time-picker
                                                v-model="searchTime"
                                                placeholder="选择时间"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                        >
                                        </el-time-picker>
                                    </div>
                                    <div class="finish">
                                        <label class="label">结束时间</label>
                                        <el-date-picker
                                                v-model="searchDate"
                                                type="date"
                                                placeholder="选择日期"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                        >
                                        </el-date-picker>
                                        <span class="cross">
                                    -
                                </span>
                                        <el-time-picker
                                                v-model="searchTime"
                                                placeholder="选择时间"
                                                class="report_int"
                                                prefix-icon="el-icon-search"
                                        >
                                        </el-time-picker>
                                    </div>
                                </div>
                                <div class="int_box">
                                    <label>带看楼盘</label>
                                    <el-input
                                            placeholder="请输入带看楼盘"
                                            v-model="searchLook"
                                            clearable
                                            class="report_int"
                                            prefix-icon="el-icon-search"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>维护人</label>
                                    <el-input
                                            placeholder="请输入维护人"
                                            v-model="searchMaintenance"
                                            clearable
                                            class="report_int"
                                            prefix-icon="el-icon-search"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>意向楼盘</label>
                                    <el-input
                                            placeholder="请输入意向楼盘"
                                            v-model="searchIntention"
                                            clearable
                                            class="report_int"
                                            prefix-icon="el-icon-search"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader :options="searchAreaOptions" clearable class="report_int"
                                    ></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-select v-model="searchStores" placeholder="请选择" class="report_int"
                                    >
                                        <el-option
                                                v-for="item in searchStoresOptions"
                                                :key="item.searchStores"
                                                :label="item.label"
                                                :value="item.searchStores"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>备注</label>
                                    <el-input
                                            placeholder="请输入备注"
                                            v-model="searchNote"
                                            clearable
                                            class="report_int"
                                            prefix-icon="el-icon-search"

                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>客户类别</label>
                                    <el-select v-model="searchCustomer" placeholder="请选择" class="report_int"
                                    >
                                        <el-option
                                                v-for="item in searchCustomerOoptions"
                                                :key="item.searchCustomer"
                                                :label="item.label"
                                                :value="item.searchCustomer"

                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box btn_search">
                                    <el-button type="primary" class="btn">搜索</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
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
                                    prop="client_name"
                                    label="姓名"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="client_phone"
                                    label="电话"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="reported_time"
                                    label="报备时间"
                                    width="180">
                            </el-table-column>
                            <!--                            <el-table-column-->
                            <!--                                    prop="look"-->
                            <!--                                    label="带看楼盘"-->
                            <!--                                    width="180">-->
                            <!--                            </el-table-column>-->
                            <el-table-column
                                    prop="maintenance"
                                    label="维护人"
                                    width="180">
                            </el-table-column>
                            <!--                            <el-table-column-->
                            <!--                                    prop="intention"-->
                            <!--                                    label="意向楼盘"-->
                            <!--                                    width="180">-->
                            <!--                            </el-table-column>-->
                            <el-table-column
                                    prop="area"
                                    label="区域"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="stores"
                                    label="门店"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    prop="remarks"
                                    label="备注"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="customer"
                                    label="客户类别"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small" @click="upd()">编辑</el-button>
                                    <el-button type="text" size="small" slot="reference" class="el-popconfirm"
                                               @click="del(scope.row.id)">删除
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
        <myAdd/>
        <mySee/>
        <myModify/>
    </div>
</template>

<script>
    import mySee from '../../views/Report/See/See'
    import myModify from '../../views/Report/Modify/Modify'
    import myAdd from '../../views/Report/Add/Add'
    import Api from '../../api/Report/Report'

    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                //搜索字段
                searchName: '',
                searchPhone: '',
                type: [],
                searchDate: '',
                searchTime: '',
                searchLook: '',
                searchMaintenance: '',
                searchIntention: '',
                flag: false,
                searchAreaOptions: [{
                    value: 'province',
                    label: '辽宁省',
                    children: [{
                        value: ' city',
                        label: '沈阳市',
                        children: [{
                            value: 'area',
                            label: '铁西区'
                        }],
                    }],
                }],
                searchStoresOptions: [{
                    searchStores: '选项1',
                    label: 'A门店'
                }, {
                    searchStores: '选项2',
                    label: 'B门店'
                }],
                searchStores: '',
                searchNote: '',
                searchCustomerOoptions: [
                    {
                        customer: '选项1',
                        label: '客户类别A'
                    },
                    {
                        customer: '选项2',
                        label: '客户类别B'
                    },
                    {
                        customer: '选项3',
                        label: '客户类别C'
                    }
                ],
                searchCustomer: '',
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
                this.$store.commit('reportStatus', false);
                this.$store.commit('addStatus', true)
            },
            handleClick() {
                this.$store.commit('reportStatus', false);
                this.$store.commit('seeStatus', true)
            },
            upd() {
                this.$store.commit('reportStatus', false);
                this.$store.commit('updStatus', true)
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                this.reportList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.reportList()
            },
            del(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.reportDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.reportList()
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
            reportList() {
                Api.reportList(this.queryInfo.pagenum, this.queryInfo.pagesize).then((res) => {
                    this.tableData = res.data.data;
                    this.totalPage = res.data.count;
                })
            }
        },
        computed: {
            reportStatus() {
                return this.$store.state.report.reportStatus
            },
        },
        mounted() {
            this.reportList()
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

    .box_form {
        padding: 20px;
    }

    .form {
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 200px;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .int_box {
        margin-right: 30px;
    }

    .btn_search {
        margin-top: 37px;
    }

    .btn {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
    }

    .cross {
        padding: 0 7px;
    }

    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .el-popconfirm {
        margin-left: 10px;
    }

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
    .dateTime{
        display: flex;
        height: 79px;
        align-items: center;
    }
    .label{
        display: block;
    }
    .finish{
        margin-left: 30px;
    }

</style>
