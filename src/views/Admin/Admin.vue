<template>
    <div class="component">
        <div class="report" v-show="adminStatus">
            <div class="add_box">
                <!--    搜索区域        -->
                <el-card>
                    <div class="add_content">
                        <div class="content_title">
                            <p>
                                权限管理
                            </p>
                        </div>
                        <div class="content_btn">
                            <p @click="reportAdd()">
                                <span class="el-icon-plus"></span>
                                <span>权限添加</span>
                            </p>
                        </div>
                    </div>
                    <div class="search">
                        <div class="int_box">
                            <label>角色</label>
                            <el-input
                                    placeholder="请输角色"
                                    v-model="name"
                                    clearable
                                    class="report_int"
                            >
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                        <div class="int_box_right left">
                            <label>时间</label>
                            <el-date-picker
                                    v-model="date"
                                    type="date"
                                    placeholder="选择日期"
                                    class="date"
                            >
                            </el-date-picker>
                            -
                            <el-time-picker
                                    v-model="time"
                                    placeholder="选择时间"
                                    class="date"
                            >
                            </el-time-picker>
                        </div>
                        <div class="btn">
                            <el-row>
                                <el-button type="primary" size="medium" class="btn_a">搜索</el-button>
                            </el-row>
                        </div>
                    </div>
                </el-card>
                <!--    表格区域        -->
                <el-card class="top">
                    <div class="admin-box">
                        <!--    树形控件区域    -->
                        <div class="mdmin-left">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"
                                     default-expand-all></el-tree>
                        </div>
                        <div class="mdmin-right">
                            <!--    表格区域  -->
                            <div class="table">
                                <div class="tab">
                                    <el-table
                                            :data="tableData"
                                            style="width: 100%"
                                            border
                                            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                    >
                                        <el-table-column type="expand">
                                            <template slot-scope="props">
                                                <div class="content" style="text-align: left">
                                                    <el-form label-position="left" inline class="demo-table-expand">
                                                        <el-form-item :label="itme.adminName"
                                                                      v-for="itme in props.row.children">
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
                                                        @click="handleEdit(scope.$index, scope.row)">查看
                                                </el-button>
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
                        </div>
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
    import mySee from '../../views/Admin/See/See'
    import myAdd from '../../views/Admin/Add/Add'
    import myModify from '../../views/Admin/Modify/Modify'

    export default {
        components: {
            mySee,
            myModify,
            myAdd
        },
        data() {
            return {
                isShow: false,//查看
                isShowAdd: false,//添加
                isShowsUpd: false,//修改
                data: [{
                    label: '超级管理员',
                    children: [
                        {
                            label: '客户报备',
                        },
                        {
                            label: '楼盘管理',
                        },
                        {
                            label: '区域管理',
                        },
                        {
                            label: '门店管理',
                        },
                        {
                            label: '日志管理',
                        },
                        {
                            label: '带看管理',
                        },
                        {
                            label: '跟进管理',
                        },
                        {
                            label: '组织架构',
                        },
                        {
                            label: '权限设置',
                        },
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                name: '',
                type: [],
                date: '',
                time: '',
                currentPage4: 4,
                tableData: [{
                    name: '超级管理员',
                    date: '2019-5-30 12:20',
                    children: [
                        {
                            adminName: '客户管理',
                        },
                        {
                            adminName: '楼盘管理',
                        }
                    ]
                }]
            }
        },
        methods: {

            reportAdd() {
                this.$store.commit('adminStatus', false);
                this.$store.commit('addAdmin', true)
            },
            handleEdit() {
                this.$store.commit('adminStatus', false);
                this.$store.commit('seeAdmin', true)
            },
            upd() {
                this.$store.commit('adminStatus', false);
                this.$store.commit('updAdmin', true)
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
        computed: {
            adminStatus() {
                return this.$store.state.admin.adminStatus
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
    .admin-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .mdmin-left {
        width: 16%;
    }

    .mdmin-right {
        width: 82%;

    }

    .search {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin-left: 20px;
        margin-top: 20px;
    }

    .report_int {
        width: 300px;
        margin-right: 20px;
    }
    .btn {
        margin-left: 20px;
    }

    .left_btn {
        margin-left: 10px;
    }
    label{
        margin-right: 20px;
    }
    .btn_a {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
    }


</style>
