<template>
    <div class="component">
        <div class="report" v-show="buildingStatus">
            <div class="add_box">
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            楼盘管理
                        </p>
                    </div>
                    <div class="content_btn">
                        <p @click="reportAdd()">
                            <span class="el-icon-plus"></span>
                            <span>楼盘添加</span>
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
                currentPage4:4,
                tableData: [
                    {
                        name: '楼盘名称',
                        nickname: '别名',
                        date: '2020/7/3',
                        abbreviations: '缩写',
                        areaOptions: '辽宁沈阳红番区',
                        price: '100万',
                        area:'1000',
                        openDate: '2020/8/30',
                        greening: '100平',
                        management: '80',
                        buildingDialogImageUrl: require('../../assets/images/logo-ip.png'),
                        modelDialogImageUrl: require('../../assets/images/logo-ip.png'),
                    }
                ],
            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('buildingStatus', false);
                this.$store.commit('addBuiding', true)
            },
            handleClick() {
                this.$store.commit('buildingStatus', false);
                this.$store.commit('seeStatusBuilding', true)
            },
            upd() {
                this.$store.commit('buildingStatus', false);
                this.$store.commit('updStatusBuilding', true)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
        computed: {
            buildingStatus() {
                return this.$store.state.building.buildingStatus
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

    .el-popconfirm {
        margin-left: 10px;
    }

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>

