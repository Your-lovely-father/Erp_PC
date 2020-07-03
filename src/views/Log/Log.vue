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
            <mySee :isShow.sync="isShow"/>
        </el-card>
    </div>
</template>

<script>
    import mySee from '../../views/Log/See/See'
    export default {
        components:{
            mySee
        },
        name: "Log",
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
                isShow:false
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.isShow=true
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>

<style scoped>
    .left_btn{
        margin-left: 15px;
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


</style>
