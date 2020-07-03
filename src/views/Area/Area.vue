<template>
    <div class="area">
        <!--    卡片视图区域    -->
        <el-card>
        <!--    表单区域        -->
            <div class="form_box">
                <div class="form">
                    <div class="int_box">
                        <label>区域</label>
                        <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
                    </div>
                    <div class="int_box_right">
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
                </div>
                <div class="sub_btn">
                    <el-button type="primary">提交信息</el-button>
                </div>
            </div>
            <!--   表格区域         -->
            <div class="tab">
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                                    type="primary"
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
            <myModify :isShowsUpd.sync="isShowsUpd"/>
        </el-card>
    </div>
</template>

<script>
    import myModify from '../../views/Area/Modify/Modify'
    export default {
        components:{
            myModify
        },
        name: "Area",
        data(){
            return{
                areaOptions: [{
                    value: 'province',
                    label: '辽宁省',
                    children: [{
                        value: ' city',
                        label: '沈阳市',
                        children: [{
                            value: 'area',
                            label: '铁西区'
                        }],
                    }],
                }],
                type: [],
                date: '',
                time: '',
                tableData: [{
                    address:'辽宁省/沈阳市/铁西区',
                    date:'2019-5-30 12:20',
                },
                ],
                search: '',
                isShowsUpd:false//修改
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.isShowsUpd=true
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>

<style scoped>
    .area {
        width: 100%;
        height: 100%;
    }

    .el-card {
        height: 100%;
    }
    .form_box{
        width: 100%;
    }
    .form{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    label{
        padding: 15px;
        display: block;
    }
    .report_int{
        width: 533px;
    }
    .int_box_right{
        margin-left: 20px;
    }
    .sub_btn {
        padding: 20px 0;
        text-align: right;
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
    .left_btn{
        margin-left: 10px;
    }


</style>
