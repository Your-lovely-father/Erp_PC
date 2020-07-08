<template>
    <div class="area">
        <!--    卡片视图区域    -->
        <el-card>
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
                    <el-table-column type="expand">
                        <template slot-scope="props">
                           <div class="content" style="text-align: left">
                               <el-form label-position="left" inline class="demo-table-expand">
                                   <el-form-item :label="itme.adminName" v-for="itme in props.row.children">
                                       <span>{{ props.row.name }}</span>
                                   </el-form-item>
                               </el-form>
                           </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label='角色名称'
                            prop="name">
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
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="upd()">修改
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
            <mySee :isShow.sync="isShow"/>
            <myAdd :isShowAdd.sync="isShowAdd"/>
            <myModify :isShowsUpd.sync="isShowsUpd"/>

        </el-card>
    </div>
</template>

<script>
    import mySee from '../../views/Role/See/See'
    import myModify from '../../views/Role/Modify/Modify'
    import myAdd from '../../views/Role/Add/Add'

    export default {
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                isShowAdd:false,
                tableData: [{
                    name: '超级管理员',
                    date: '2019-5-30 12:20',
                    children:[
                        {
                            adminName:'客户管理',
                        },
                        {
                            adminName:'楼盘管理',
                        }
                    ]
                },
                ],
                search: '',
                isShow:false,
                isShowsUpd: false,//修改
                currentPage4: 4,
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.isShow=true
            },
            upd(index, row) {
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
    label {
        padding: 15px;
        display: block;
    }
    .tab >>> .el-table--enable-row-transition .el-table__body td {
        text-align: center;
    }

    .tab >>> .el-table th > .cell {
        text-align: center;
    }
    .el-input--mini .el-input__inner {
        width: 300px;
    }

    .left_btn {
        margin-left: 10px;
    }
    .page {
        width: 100%;
        text-align: center;
        padding: 30px 0;
    }


</style>
