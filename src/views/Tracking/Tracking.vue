<template>
    <div class="component" >
        <div class="report" v-show="trackingStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                跟进管理
                            </p>
                        </div>
                        <div class="content_btn" style="cursor:pointer">
                            <p @click="reportAdd()">
                                <span class="el-icon-plus"></span>
                                <span>跟进添加</span>
                            </p>
                        </div>
                    </div>
                    <div class="share">
                        <myShare/>
                    </div>
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
                                    label="时间"
                                    prop="date">
                            </el-table-column>
                            <el-table-column
                                    label="跟进记录"
                                    prop="tracking">
                            </el-table-column>
                            <el-table-column
                                    align="right"  label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                                    <el-button type="primary"  size="mini" @click="upd">修改</el-button>
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
                                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import mySee from '../../views/Tracking/See/See'
    import myModify from '../../views/Tracking/Modify/Modify'
    import myShare from '../../components/Pub/share/share'
    import myAdd from '../../views/Tracking/Add/Add'
    export default {
        components: {
            mySee,
            myModify,
            myShare,
            myAdd
        },
        data() {
            return {
                isShowAdd:false,
                tableData: [{
                    date:'2019-5-30 12:20',
                    tracking:'删除了门店',
                },
                ],
                search: '',
                isShow:false,
                isShowsUpd:false,
                currentPage4: 4,
            }
        },
        methods: {
            reportAdd() {
                this.$store.commit('trackingStatus', false);
                this.$store.commit('addTracking', true)
            },
            handleEdit() {
                this.$store.commit('trackingStatus', false);
                this.$store.commit('seeTracking', true)
            },
            upd() {
                this.$store.commit('trackingStatus', false);
                this.$store.commit('updTracking', true)
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
            trackingStatus() {
                return this.$store.state.tracking.trackingStatus
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
    .share{
        margin-top: 20px;
    }
    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }
    .left_btn{
        margin-left: 10px;
    }
    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>

