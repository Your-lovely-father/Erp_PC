<template>
    <div class="component">
        <div class="report" v-show="buildingStatus">
            <div class="add_box">
                <div class="add_content">
                    <div class="herder_box">
                        <div class="report_top">
                            <div class="layui-card-header">
                                <p>楼盘管理</p>
                                <p style="color: #177ce3;cursor: pointer" @click="reportAdd()" v-permission="{action:'add'}">+ 楼盘添加</p>
                            </div>
                        </div>
                        <div class="report-bottom">
                            <div class="search_int">
                                <label>区域</label>
                                <el-cascader :options="employeesAreaOptions"
                                             class="report_int"
                                             @change="employeesHandleChange"
                                             ref="employeesCascaderAddr"
                                             clearable
                                >
                                </el-cascader>
                            </div>
                            <div class="search_int">
                                <label>楼盘名称</label>
                                <el-input
                                        placeholder="请输入楼盘名称"
                                        v-model="housesName"
                                        clearable
                                        class="report_int"
                                        @clear="clearHousesName"

                                >
                                </el-input>
                            </div>
                            <div class="search_btn">
                                <el-button type="primary" class="btn" @click="searchBtn">立即查询</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--    表格区域        -->
                <el-card class="top" v-permission="{action:'list'}">
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
                                    <el-button @click="handleClick(scope.row.id)" type="text" size="small"
                                               v-permission="{action:'detail',effect:'disabled'}"
                                    >查看</el-button>
                                    <el-button type="text" size="small" @click="upd(scope.row.id)"
                                               v-permission="{action:'edit',effect:'disabled'}"
                                    >编辑</el-button>
                                        <el-button type="text" size="small" slot="reference" class="el-popconfirm" @click="del(scope.row.id)"
                                                   v-permission="{action:'del',effect:'disabled'}"
                                        >删除
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
    import  { initDynamicRoutes } from '../../router/index'
    import Axios from '../../api/pub/pub'
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
                //搜素字段-------
                employeesAreaOptions:[],
                housesName:'',
                employeesProvince_id:'',//省
                employeesCity_id:'',//市
                employeesArea_id:'',//区
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
                Api.buildingList(
                    this.queryInfo.pagenum,
                    this.queryInfo.pagesize,
                    this.employeesProvince_id,
                    this.employeesCity_id,
                    this.employeesArea_id,
                    this.housesName
                ).then((res)=>{
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
            },
            //搜索操作
            employeesGetSelect() { //三级联动数据
                Axios.getSelect().then((res) => {
                    const data = res.data[0].son;
                    data.map((item) => {
                        item.label = item.AREA_NAME;
                        item.value = item.AREA_ID;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.AREA_NAME;
                                el.value = el.AREA_ID;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.AREA_NAME;
                                        key.value = key.AREA_ID;
                                        key.children = key.son;

                                    })
                                }
                            })
                        }
                    });
                    //把数据存在本地长期储存中
                    window.localStorage.setItem('linkage', JSON.stringify(data));
                    var linkage = window.localStorage.getItem('linkage');
                    this.employeesAreaOptions = JSON.parse(linkage)
                })
            },
            employeesHandleChange() { //获取省市区id传给后台获取门店数据
                if(!this.$refs.employeesCascaderAddr.getCheckedNodes()[0]){
                    this.employeesProvince_id = '';
                    this.employeesCity_id = '';
                    this.employeesArea_id = '';
                    return false;
                }
                var pathvalue = this.$refs.employeesCascaderAddr.getCheckedNodes()[0].path;
                this.employeesProvince_id = pathvalue[0];
                this.employeesCity_id = pathvalue[1];
                this.employeesArea_id = pathvalue[2];
            },
            searchBtn(){
                this.buildingList()
            },
            clearHousesName(){
                this.housesName=''
            }
        },
        computed: {
            buildingStatus() {
                return this.$store.state.building.buildingStatus
            },
        },
        mounted() {
            this.buildingList();
            initDynamicRoutes();
            this.employeesGetSelect()
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
    /*herder*/
    .herder_box {
        margin-bottom: 15px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }

    .layui-card-header {
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
        border-bottom: 1px solid #f6f6f6;
        color: #333;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }

    /*  search  */
    .report-bottom {
        padding: 10px 15px;
        line-height: 24px;
    }

    label {
        display: block;
        padding: 10px 0;
    }
    .search_int {
        padding-right: 15px;
    }
    .report-bottom {
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 260px;
    }

    @media screen and (max-width: 1024px) {
        .report_int {
            width: 100% !important;
        }

        .search_int {
            width: 100% !important;
            padding-right: 0 !important;
        }
        .search_btn {
            padding-top: 15px !important;
        }
    }

    .btn {
        width: 100px;
        background-image: -webkit-linear-gradient(left, #29adeb, #177ce3);
    }

    .search_btn {
        padding-top: 43px;
    }


</style>

