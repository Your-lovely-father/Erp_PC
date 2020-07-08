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
            <myAdd :isShowAdd.sync="isShowAdd"/>
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
    import myAdd from '../../views/Building/Add/Add'

    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                isShowAdd: false,
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
            add() {
                this.isShowAdd = true
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
        overflow: auto;
    }
    .add {
        width: 100%;
        margin: 30px 0;
    }
    .el-popconfirm {
        margin-left: 10px;
    }

    label {
        display: block;
        padding: 10px 0;
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
