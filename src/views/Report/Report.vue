<template>
    <div class="report">
        <!--    卡片视图区域    -->
        <el-card>
            <!--     表单区域       -->
            <div class="box_form">
                <div class="form">
                    <div class="int_box">
                        <label>姓名</label>
                        <el-input
                                placeholder="请输入姓名"
                                v-model="name"
                                clearable
                                class="report_int"
                        >
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>电话</label>
                        <el-input
                                placeholder="请输入电话"
                                v-model="phone"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>报备时间</label>
                        <el-date-picker
                                v-model="date"
                                type="date"
                                placeholder="选择日期"
                                class="date"
                        >
                        </el-date-picker>
                        -
                        <el-time-picker
                                v-model="time"
                                placeholder="选择时间"
                                class="date"
                        >
                        </el-time-picker>
                    </div>
                    <div class="int_box">
                        <label>带看楼盘</label>
                        <el-input
                                placeholder="请输入带看楼盘"
                                v-model="look"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>维护人</label>
                        <el-input
                                placeholder="请输入维护人"
                                v-model="maintenance"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>意向楼盘</label>
                        <el-input
                                placeholder="请输入意向楼盘"
                                v-model="intention"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>区域</label>
                        <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
                    </div>
                    <div class="int_box">
                        <label>门店</label>
                        <el-select v-model="stores" placeholder="请选择" class="report_int"
                        >
                            <el-option
                                    v-for="item in storesOptions"
                                    :key="item.stores"
                                    :label="item.label"
                                    :value="item.stores"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="int_box">
                        <label>备注</label>
                        <el-input
                                placeholder="请输入备注"
                                v-model="note"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>客户类别</label>
                        <el-select v-model="customer" placeholder="请选择" class="report_int"
                        >
                            <el-option
                                    v-for="item in customerOoptions"
                                    :key="item.customer"
                                    :label="item.label"
                                    :value="item.customer"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="sub_btn">
                    <el-button type="primary">提交信息</el-button>
                </div>
            </div>
            <!--     表格区域       -->
            <div class="tab">
                <!--     搜索区域       -->
                <div class="search">
                    <el-input
                            placeholder="请输入内容"
                            v-model="search"
                            clearable
                            class="int_search"
                    >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button type="primary" class="btn_search" size="small">搜索</el-button>
                </div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;"

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
            <mySee :isShow.sync="isShow"/>
            <myModify :isShowsUpd.sync="isShowsUpd"/>
            <!--     分页区域       -->
            <!--            <div class="page">-->
            <!--                <el-pagination-->
            <!--                        @size-change="handleSizeChange"-->
            <!--                        @current-change="handleCurrentChange"-->
            <!--                        :current-page="currentPage4"-->
            <!--                        :page-sizes="[100, 200, 300, 400]"-->
            <!--                        :page-size="100"-->
            <!--                        layout="total, sizes, prev, pager, next, jumper"-->
            <!--                        :total="400">-->
            <!--                </el-pagination>-->
            <!--            </div>-->
        </el-card>
    </div>
</template>

<script>
    import mySee from '../../views/Report/See/See'
    import myModify from '../../views/Report/Modify/Modify'

    export default {
        name: "Report",
        components: {
            mySee,
            myModify
        },
        data() {
            return {
                name: '',
                phone: '',
                type: [],
                date: '',
                time: '',
                look: '',
                maintenance: '',
                intention: '',
                areaOptions: [{
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
                storesOptions: [{
                    stores: '选项1',
                    label: 'A门店'
                }, {
                    stores: '选项2',
                    label: 'B门店'
                }],
                stores: '',
                note: '',
                customerOoptions: [
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
                customer: '',
                search: '',
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
                isShow: false ,//查看
                isShowsUpd:false//修改
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
                this.isShow = true
            },
            upd() {
                this.isShowsUpd=true
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
    }
</script>

<style scoped>
    .report {
        width: 100%;
        height: 100%;
    }

    .el-card {
        height: 100%;
    }

    .el-popconfirm {
        margin-left: 10px;
    }

    .search {
        width: 100%;
        padding: 20px 0;
        display: flex;
        justify-content: flex-end;
    }

    .int_search {
        width: 300px;
    }

    .btn_search {
        margin-left: 20px;
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
        width: 286px;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .date {
        width: 135px;
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

</style>
