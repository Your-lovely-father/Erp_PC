<!--<template>-->
<!--    <div class="log">-->
<!--        &lt;!&ndash;    卡片视图区域    &ndash;&gt;-->
<!--        <el-card>-->
<!--            &lt;!&ndash;     搜索区域       &ndash;&gt;-->
<!--            <myShare/>-->
<!--            &lt;!&ndash;   表格区域   &ndash;&gt;-->
<!--            <div class="tab">-->
<!--                <el-table-->
<!--                        :data="tableData"-->
<!--                        style="width: 100%"-->
<!--                        border-->
<!--                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"-->
<!--                >-->
<!--                    <el-table-column-->
<!--                            align="right"  label="操作">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
<!--                            <el-popconfirm-->
<!--                                    confirmButtonText='确定'-->
<!--                                    cancelButtonText='取消'-->
<!--                                    icon="el-icon-info"-->
<!--                                    iconColor="red"-->
<!--                                    title="确定要删除吗？"-->
<!--                            >-->
<!--                                <el-button-->
<!--                                        slot="reference"-->
<!--                                        size="mini"-->
<!--                                        type="danger"-->
<!--                                        class="left_btn"-->
<!--                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                            </el-popconfirm>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </el-table>-->
<!--            </div>-->
<!--            &lt;!&ndash;     分页区域       &ndash;&gt;-->
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
<!--            <mySee :isShow.sync="isShow"/>-->
<!--        </el-card>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->

<!--        name: "Log",-->

<!--        methods: {-->
<!--            handleEdit(index, row) {-->
<!--                console.log(index, row);-->
<!--                this.isShow=true-->
<!--            },-->
<!--            handleDelete(index, row) {-->
<!--                console.log(index, row);-->
<!--            }-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .left_btn{-->
<!--        margin-left: 15px;-->
<!--    }-->
<!--    .log {-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--    }-->

<!--    .el-card {-->
<!--        height: 100%;-->
<!--    }-->
<!--    .tab{-->
<!--        width: 100%;-->
<!--        padding-top: 30px;-->
<!--    }-->
<!--    .tab>>>.el-table&#45;&#45;enable-row-transition .el-table__body td{-->
<!--        text-align: center;-->
<!--    }-->
<!--    .tab>>>.el-table th>.cell {-->
<!--        text-align: center;-->
<!--    }-->
<!--    .page {-->
<!--        width: 100%;-->
<!--        text-align: center;-->
<!--        padding: 30px 0;-->
<!--    }-->

<!--</style>-->


<template>
    <div class="component" >
        <div class="report" v-show="logStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <el-card>
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
                                    label="操作人"
                                    prop="operation">
                            </el-table-column>
                            <el-table-column
                                    label="操作时间"
                                    prop="date">
                            </el-table-column>
                            <el-table-column
                                    label="操作内容"
                                    prop="content">
                            </el-table-column>
                            <el-table-column
                                    label="区域管理"
                                    prop="area">
                            </el-table-column>
                            <el-table-column
                                    label="门店管理"
                                    prop="stores">
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
        <mySee/>
    </div>
</template>

<script>
    import mySee from '../../views/Log/See/See'
    import  myShare from '../../components/Pub/share/share'
    export default {
        components:{
            mySee,
            myShare
        },
        data() {
            return {
                tableData: [{
                    operation:'12',
                    date:'2019-5-30 12:20',
                    content:'删除了门店',
                    area:'20',
                    stores:'30',
                },
                ],
                search: '',
                isShow:false,
                currentPage4: 4,
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.$store.commit('logStatus', false);
                this.$store.commit('seeLog', true)
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
            logStatus() {
                return this.$store.state.log.logStatus
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
