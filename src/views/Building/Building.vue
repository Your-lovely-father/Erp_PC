<template>
    <div class="report">
        <!--    卡片视图区域    -->
        <el-card>
            <!--     表单区域       -->
            <div class="box_form">
                <div class="form">
                    <div class="int_box">
                        <label>楼盘名称</label>
                        <el-input
                                placeholder="请输入楼盘名称"
                                v-model="name"
                                clearable
                                class="report_int"
                        >
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>楼盘别称</label>
                        <el-input
                                placeholder="请输入楼盘别称"
                                v-model="nickname"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>时间</label>
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
                        <label>楼盘缩写</label>
                        <el-input
                                placeholder="请输入楼盘缩写"
                                v-model="abbreviations"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>楼盘地址</label>
                        <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
                    </div>
                    <div class="int_box">
                        <label>平均单价</label>
                        <el-input
                                placeholder="请输入平均单价"
                                v-model="price"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>开盘时间</label>
                        <el-date-picker
                                v-model="openDate"
                                type="date"
                                placeholder="选择日期"
                                class="date"
                        >
                        </el-date-picker>
                        -
                        <el-time-picker
                                v-model="openTime"
                                placeholder="选择时间"
                                class="date"
                        >
                        </el-time-picker>
                    </div>
                    <div class="int_box">
                        <label>总建筑面积</label>
                        <el-input
                                placeholder="请输入总建筑面积"
                                v-model="area"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>绿化面积</label>
                        <el-input
                                placeholder="请输入绿化面积"
                                v-model="greening"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>区域管理</label>
                        <el-input
                                placeholder="请输入区域管理"
                                v-model="management"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                </div>
                <div class="upload">
                    <div class="int_box">
                        <label>楼盘图片</label>
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="buildingHandlePictureCardPreview"
                                :on-remove="buildingHandleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="buildingDialogVisible">
                            <img width="100%" :src="buildingDialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="int_box">
                        <label>户型图片</label>
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="modelHandlePictureCardPreview"
                                :on-remove="modelHandleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="modelDialogVisible">
                            <img width="100%" :src="modelDialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="sub_btn">
                    <el-button type="primary">提交信息</el-button>
                </div>
            </div>
            <!--     表格区域       -->
            <div class="tab">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;"

                >
                    <el-table-column
                            fixed
                            prop="name"
                            label="楼盘名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            label="楼盘别称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="abbreviations"
                            label="楼盘缩写"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="areaOptions"
                            label="楼盘地址"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="平均单价"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="openDate"
                            label="开盘时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="area"
                            label="总建筑面积"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            prop="greening"
                            label="绿化面积"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="customer"
                            label="楼盘图片"
                            width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.buildingDialogImageUrl" style="height: 50px"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="management"
                            label="区域管理"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="customer"
                            label="户型图片"
                            width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.modelDialogImageUrl" style="height: 50px"/>
                        </template>
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
    import mySee from '../../views/Building/See/See'
    import myModify from '../../views/Building/Modify/Modify'

    export default {
        name: "Report",
        components: {
            mySee,
            myModify
        },
        data() {
            return {
                name: '',
                nickname: '',
                type: [],
                date: '',
                time: '',
                abbreviations: '',
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
                price: '',
                type: [],
                openDate: '',
                openTime: '',
                area:'',
                greening:'',
                management:'',
                customer: '',
                buildingDialogImageUrl: '',
                buildingDialogVisible: false,
                modelDialogImageUrl: '',
                modelDialogVisible: false,
                tableData: [
                    {
                        name:'楼盘名称',
                        nickname:'别名',
                        date:'2020/7/3',
                        abbreviations:'缩写',
                        areaOptions:'辽宁沈阳红番区',
                        price:'100万',
                        openDate:'2020/8/30',
                        area:'50平',
                        greening:'100平',
                        management:'80',
                        buildingDialogImageUrl:require('../../assets/images/logo-ip.png'),
                        modelDialogImageUrl:require('../../assets/images/logo-ip.png'),
                    }
                ],
                currentPage4: 4,
                isShow: false ,//查看
                isShowsUpd:false,//修改
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
            buildingHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            buildingHandlePictureCardPreview(file) {
                this.buildingDialogImageUrl = file.url;
                this.buildingDialogVisible = true;
            },
            modelHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            modelHandlePictureCardPreview(file) {
                this.modelDialogImageUrl = file.url;
                this.modelDialogVisible = true;
            }
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
    .upload{
        display: flex;
        width: 800px;
        justify-content: space-between;
    }
</style>
