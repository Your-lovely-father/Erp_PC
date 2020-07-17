<template>
    <div class="component" >
        <div class="report" v-show="reportStatus">
            <div class="add_box">
                <!--    搜索区域        -->
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
                                <div class="int_box">
                                    <label>报备时间</label>
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
                                    prop="name"
                                    label="姓名"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="电话"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="报备时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="look"
                                    label="带看楼盘"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="maintenance"
                                    label="维护人"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="intention"
                                    label="意向楼盘"
                                    width="180">
                            </el-table-column>
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
                                    prop="note"
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
                                    <el-popconfirm
                                            confirmButtonText='确定'
                                            cancelButtonText='取消'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="确定要删除吗？"
                                    >
                                        <el-button type="text" size="small" slot="reference" class="el-popconfirm">删除
                                        </el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--     分页区域       -->
                    <div class="page">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
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
                tableData: [
                    {
                        name: '王志远',
                        phone: '15942999924',
                        date: '2019/9/14-11:14',
                        look: '阳光100',
                        maintenance: '小周',
                        intention: '别墅',
                        area: '辽宁省沈阳市铁西区',
                        stores: 'A门店',
                        note: '这套房子我喜欢',
                        customer: 'A级客户',
                    }
                ],
                currentPage4: 4,
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
        computed: {
            reportStatus() {
                return this.$store.state.report.reportStatus
            },
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
</style>
