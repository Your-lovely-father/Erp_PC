<template>
    <div class="component">
        <div class="report" v-show="buildingStatus">
            <div class="add_box">
                <div class="add_content">
                    <div class="content_title">
                        <p>
                            楼盘管理
                        </p>
                    </div>
                    <div class="content_btn" style="cursor:pointer">
                        <p @click="reportAdd()">
                            <span class="el-icon-plus"></span>
                            <span>楼盘添加</span>
                        </p>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top">
                    <div class="tab">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%;"
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        >
                            <el-table-column
                                    fixed
                                    prop="building_name"
                                    label="楼盘名称"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="building_nickname"
                                    label="楼盘别称"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="building_abbreviation"
                                    label="楼盘缩写"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="building_address"
                                    label="楼盘地址"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="average_unit_price_begin"
                                    label="平均单价"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="average_unit_price_end"
                                    label="开盘时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="overall_floorage"
                                    label="总建筑面积"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    prop="green_area"
                                    label="绿化面积"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="building_images"
                                    label="楼盘图片"
                                    width="180">
                                <template slot-scope="scope">
                                    <img :src="$Tool.formatImg(scope.row.building_img_url)" style="height: 50px"/>
                                </template>
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop="management"-->
<!--                                    label="区域管理"-->
<!--                                    width="180">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    prop="opening_time"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="floor_plan"
                                    label="户型图片"
                                    width="180">
                                <template slot-scope="scope">
                                    <img :src="$Tool.formatImg(scope.row.floor_img_url)" style="height: 50px"/>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small" @click="upd(scope.row.id)">编辑</el-button>
                                        <el-button type="text" size="small" slot="reference" class="el-popconfirm" @click="del(scope.row.id)">删除
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
        <myAdd @buildingList="buildingList"/>
        <mySee ref="mySee"/>
        <myModify ref="myModify" @buildingList="buildingList"/>
    </div>
</template>

<script>
    import mySee from '../../views/Building/See/See'
    import myModify from '../../views/Building/Modify/Modify'
    import myAdd from '../../views/Building/Add/Add'
    import Api from '../../api/Building/Building'
    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAdd
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
                this.$store.commit('buildingStatus', false);
                this.$store.commit('addBuiding', true)
            },
            handleClick(id) {
                this.$store.commit('buildingStatus', false);
                this.$store.commit('seeStatusBuilding', true);
                Api.detailObject(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.mySee.parentMsg() //给子组件传方法，点击时触发
                })
            },
            upd(id) {
                this.$store.commit('buildingStatus', false);
                this.$store.commit('updStatusBuilding', true);
                Api.detailObject(id).then((res)=>{
                    this.$store.commit('detailObj',res.data);
                    this.$refs.myModify.parentMsg() //给子组件传方法，点击时触发
                })
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.pagesize = newSize;
                this.buildingList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.pagenum = newPage;
                this.buildingList()
            },
            del(id) { //删除操作
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.reportDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.buildingList()
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            buildingList(){ //列表
                Api.buildingList(this.queryInfo.pagenum,this.queryInfo.pagesize).then((res)=>{
                    let data =res.data.data;
                    data.map(item => {
                        return {
                            ...item,
                            building_img_url:this.$Tool.formatImg(item.building_img_url),
                            floor_img_url:this.$Tool.formatImg(item.floor_img_url)
                        };
                    });
                    this.tableData=data;
                    this.totalPage=res.data.count
                })
            }
        },
        computed: {
            buildingStatus() {
                return this.$store.state.building.buildingStatus
            },
        },
        mounted() {
            this.buildingList()
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


    .add_box >>> .el-card__body {
        padding: 20px 0 !important;
    }

    .top {
        margin-top: 20px;
        padding: 20px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .el-popconfirm {
        margin-left: 10px;
    }

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>

