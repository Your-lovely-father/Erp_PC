<template>
    <div class="log">
        <!--    卡片视图区域    -->
        <el-card>
            <!--   表格区域         -->
            <div class="tab">
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="时间"
                            prop="date">
                    </el-table-column>
                    <el-table-column
                            label="带看记录"
                            prop="look">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"
                                    prefix-icon="el-icon-search"
                            >
                            </el-input>
                        </template>
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
            <mySee :isShow.sync="isShow"/>
            <myModify :isShowsUpd.sync="isShowsUpd"/>
        </el-card>
    </div>
</template>

<script>
    import mySee from '../../views/Look/See/See'
    import myModify from '../../views/Look/Modify/Modify'
    export default {
        components:{
            mySee,
            myModify
        },
        name: "Log",
        data() {
            return {
                tableData: [{
                    date:'2019-5-30 12:20',
                    look:'删除了门店',
                },
                ],
                search: '',
                isShow:false,
                isShowsUpd:false,
                currentPage4: 4,
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.isShow=true
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            upd(){
                this.isShowsUpd=true
            }
        },
    }
</script>

<style scoped>
    .left_btn{
        margin-left: 10px;
    }
    .log {
        width: 100%;
        height: 100%;
    }

    .el-card {
        height: 100%;
    }
    .tab{
        width: 100%;
    }
    .tab>>>.el-table--enable-row-transition .el-table__body td{
        text-align: center;
    }
    .tab>>>.el-table th>.cell {
        text-align: center;
    }
    .el-input--mini{
        width: 300px;
    }
    .el-input--mini .el-input__inner{
        width: 300px;
    }
    .page {
        width: 100%;
        text-align: center;
        padding: 30px 0;
    }


</style>
