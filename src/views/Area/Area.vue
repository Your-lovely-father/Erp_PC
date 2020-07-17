<template>
    <div class="component" >
        <div class="report" v-show="AreaStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                区域管理
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer">
                            <p @click="reportAdd()">
                                <span class="el-icon-plus"></span>
                                <span>区域添加</span>
                            </p>
                        </div>
                    </div>
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
                                    label='区域'
                                    prop="address">
                            </el-table-column>
                            <el-table-column
                                    label="时间"
                                    prop="date">
                            </el-table-column>
                            <el-table-column
                                    align="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">修改
                                    </el-button>
                                    <el-popconfirm
                                            confirmButtonText='确定'
                                            cancelButtonText='取消'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="确定要删除吗？"
                                    >
                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                class="left_btn"
                                                @click="handleDelete(scope.$index, scope.row)">删除
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
        <myModify/>
    </div>
</template>

<script>
    import myModify from '../../views/Area/Modify/Modify'
    import myShare from '../../components/Pub/address/address'
    import myAdd from '../../views/Area/Add/Add'
    export default {
        name: "Report",
        components: {
            myShare,
            myModify,
            myAdd
        },
        data() {
            return {
                tableData: [{
                    address: '辽宁省/沈阳市/铁西区',
                    date: '2019-5-30 12:20',
                },
                ],
                isShowAdd:false,
                isShowsUpd: false,//修改
                currentPage4: 4,
            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('AreaStatus', false);
                this.$store.commit('addArea', true)
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$store.commit('AreaStatus', false);
                this.$store.commit('updStatusArea', true)
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
        computed: {
            AreaStatus() {
                return this.$store.state.area.AreaStatus
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

    label {
        display: block;
        padding: 10px 0;
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
    .left_btn {
        margin-left: 10px;
    }
</style>
