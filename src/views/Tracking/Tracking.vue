<template>
    <div class="log">
        <!--    卡片视图区域    -->
        <el-card>
            <!--   表单区域    -->
            <div class="form">
                <div class="form-box">
                    <div class="int_box">
                        <label>跟进记录</label>
                        <el-input
                                placeholder="请输入跟进记录"
                                clearable
                                v-model="tracking"
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>时间</label>
                        <el-date-picker
                                v-model="date"
                                type="date"
                                placeholder="选择日期"
                                class="report_int"
                        >
                        </el-date-picker>
                        -
                        <el-time-picker
                                v-model="time"
                                placeholder="选择时间"
                                class="report_int"
                        >
                        </el-time-picker>
                    </div>
                    <div class="int_box">
                        <label>维护人</label>
                        <el-input
                                placeholder="请输入维护人"
                                clearable
                                v-model="maintenance"
                                class="report_int">
                        </el-input>
                    </div>

                </div>
                <div class="sub_btn">
                    <el-button type="primary">提交信息</el-button>
                </div>
            </div>
            <!--     搜索区域       -->
            <myShare/>
            <!--   表格区域         -->
            <div class="tab">
                <el-table
                        :data="tableData"
                        style="width: 100%">
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
    import mySee from '../../views/Tracking/See/See'
    import myModify from '../../views/Tracking/Modify/Modify'
    import myShare from '../../components/Pub/share/share'
    export default {
        components:{
            mySee,
            myModify,
            myShare
        },
        name: "Log",
        data() {
            return {
                tableData: [{
                    date:'2019-5-30 12:20',
                    tracking:'删除了门店',
                },
                ],
                search: '',
                isShow:false,
                isShowsUpd:false,
                currentPage4: 4,
                tracking:'',
                type:[],
                date:'',
                time:'',
                maintenance:'',
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

    .report_int{
        width: 390px;
    }
    label {
        display: block;
        padding: 15px 0;
    }
    .form{
        width: 100%;
    }
    .form-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .sub_btn{
        width: 100%;
        margin: 20px 0;
        text-align: right;
    }

</style>
