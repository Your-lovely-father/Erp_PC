<template>
    <div class="component" >
        <div class="report" v-show="isIntentionStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            意向楼盘
                        </p>
                    </div>
                    <div class="content_btn" style="cursor:pointer">
                        <p @click="reportAdd()">
                            <span class="el-icon-plus"></span>
                            <span>意向楼盘添加</span>
                        </p>
                    </div>
                </div>
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
                                    label='客户'
                                    prop="address">
                            </el-table-column>
                            <el-table-column
                                    label='维护人'
                                    prop="address">
                            </el-table-column>
                            <el-table-column
                                    label='区域'
                                    prop="address">
                            </el-table-column>
                            <el-table-column
                                    label='意向楼盘'
                                    prop="address">
                            </el-table-column>
                            <el-table-column
                                    align="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button @click="intentionSee(scope.row)"
                                               size="mini">查看</el-button>
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">修改
                                    </el-button>

                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                class="left_btn"
                                                @click="handleDelete(scope.$index, scope.row)">删除
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
    import myModify from './Modify/Modify'
    import myAdd from './Add/Add'
    import mySee from './See/See'
    export default {
        components: {
            myModify,
            myAdd,
            mySee
        },
        data() {
            return {
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
                this.$store.commit('isIntentionStatus', false);
                this.$store.commit('addisIntention', true)
            },
            intentionSee(index, row) {
                console.log(index, row);
                this.$store.commit('isIntentionStatus', false);
                this.$store.commit('seeisIntention', true)
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleEdit(){
                this.$store.commit('isIntentionStatus', false);
                this.$store.commit('updisIntention', true)
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                // this.trackingList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                // this.trackingList()
            },
        },
        computed: {
            isIntentionStatus() {
                return this.$store.state.intention.isIntentionStatus
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
</style>
