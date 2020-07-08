<template>
    <div class="area">
        <!--    卡片视图区域    -->
        <el-card>
            <!--    搜索区域        -->
            <myShare/>
            <!--   表格区域         -->
            <div class="tab">
                <div class="add">
                    <el-row>
                        <el-button type="primary" @click="add()">添加</el-button>
                    </el-row>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%">
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
            <myModify :isShowsUpd.sync="isShowsUpd"/>
            <myAdd :isShowAdd.sync="isShowAdd"/>
        </el-card>
    </div>
</template>

<script>
    import myModify from '../../views/Area/Modify/Modify'
    import myShare from '../../components/Pub/address/address'
    import myAdd from '../../views/Area/Add/Add'
    export default {
        components: {
            myModify,
            myShare,
            myAdd
        },
        name: "Area",
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
            handleEdit(index, row) {
                console.log(index, row);
                this.isShowsUpd = true
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            add() {
                this.isShowAdd = true
            },
        },
    }
</script>

<style scoped>
    .area {
        width: 100%;
        height: 100%;
    }
    .tab >>> .el-table--enable-row-transition .el-table__body td {
        text-align: center;
    }

    .tab >>> .el-table th > .cell {
        text-align: center;
    }
    .left_btn {
        margin-left: 10px;
    }
    .page {
        width: 100%;
        text-align: center;
        padding: 30px 0;
    }
    .add{
        padding: 30px 0;
    }

</style>
