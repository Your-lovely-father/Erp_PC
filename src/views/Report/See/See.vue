<template>
    <div class="reportAdd" v-show="seeStatus">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看报备
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页"
                                    placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent bottom">
                    <div class="The_title">
                        <p>查看报备</p>
                    </div>
                    <div class="content_box">
                        <div class="See_int">
                            <div class="int">
                                <label>姓名</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="detailList.client_name"
                                >
                                </el-input>
                            </div>
                            <div class="int">
                                <label>电话</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="detailList.client_phone"
                                >
                                </el-input>
                            </div>
                            <div class="int">
                                <label>时间</label>
                                <el-date-picker
                                        v-model="detailList.reported_time"
                                        type="date"
                                        placeholder="选择日期"
                                        class="date"
                                        :disabled="true"
                                >
                                </el-date-picker>
                                -
                                <el-time-picker
                                        v-model="detailList.reported_time"
                                        placeholder="选择时间"
                                        class="date"
                                        :disabled="true"
                                >
                                </el-time-picker>
                            </div>
                            <div class="int left1">
                                <label>备注</label>
                                <el-input
                                        :disabled="true"
                                        class="report_int"
                                        v-model="detailList.remarks"
                                >
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="addContent bottom top">
                    <div class="The_title">
                        <p>查看维护人</p>
                    </div>
                    <div class="tab">
                        <el-table
                                :data="tableData"
                                style="width: 100%"
                                border
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        >
                            <el-table-column
                                    label='维护人'
                                    prop="user_name">
                            </el-table-column>
                            <el-table-column
                                    label='手机号'
                                    prop="user_phone">
                            </el-table-column>
                            <el-table-column
                                    label='门店名称'
                                    prop="storefront_name">
                            </el-table-column>
                            <el-table-column
                                    label='时间'
                                    prop="update_time">
                            </el-table-column>
                        </el-table>
                        <!--     分页区域       -->
                        <div class="page">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="queryInfo.page"
                                    :page-sizes="[5, 10, 20, 30]"
                                    :page-size="queryInfo.offset"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="tablePage">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="addContent bottom top">
                    <div class="The_title">
                        <p>查看带看楼盘</p>
                    </div>
                    <div class="tab">
                        <el-table
                                :data="lookData"
                                style="width: 100%"
                                border
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        >
                            <el-table-column
                                    label='员工名称'
                                    prop="user_name">
                            </el-table-column>
                            <el-table-column
                                    label='楼盘名称'
                                    prop="building_name">
                            </el-table-column>
                            <el-table-column
                                    label='带看内容'
                                    prop="guide_look_content">
                            </el-table-column>
                            <el-table-column
                                    label='时间'
                                    prop="look_time">
                            </el-table-column>
                        </el-table>
                        <!--     分页区域       -->
                        <div class="page">
                            <el-pagination
                                    @size-change="lookSizeChange"
                                    @current-change="lookCurrentChange"
                                    :current-page="lookInfo.page"
                                    :page-sizes="[5, 10, 20, 30]"
                                    :page-size="lookInfo.offset"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="lookPage">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="addContent bottom top">
                    <div class="The_title">
                        <p>查看意向楼盘</p>
                    </div>
                    <div class="tab">
                        <el-table
                                :data="likeData"
                                style="width: 100%"
                                border
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        >
                            <el-table-column
                                    label='维护人'
                                    prop="user_name">
                            </el-table-column>
                            <el-table-column
                                    label='客户'
                                    prop="client_name">
                            </el-table-column>
                            <el-table-column
                                    label='意向楼盘'
                                    prop="building_name">
                            </el-table-column>
                            <el-table-column
                                    label='时间'
                                    prop="update_time">
                            </el-table-column>
                        </el-table>
                        <!--     分页区域       -->
                        <div class="page">
                            <el-pagination
                                    @size-change="likeSizeChange"
                                    @current-change="likeCurrentChange"
                                    :current-page="likeInfo.page"
                                    :page-sizes="[5, 10, 20, 30]"
                                    :page-size="likeInfo.offset"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="likePage">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="footer">
                        <el-button size="medium" @click="cancel()">取消</el-button>
                        <el-button type="primary" size="medium" @click="confirm()">确认</el-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Api from '../../../api/Report/Report'
    import localStorage from '../../../utils/localStorage'
    export default {
        name: "See",
        data() {
            return {
                queryInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                tablePage: 0,//总条数
                tableData: [],

                lookInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                lookPage: 0,//总条数
                lookData: [],

                likeInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                likePage: 0,//总条数
                likeData: []
            };
        },
        methods: {
            onPage() {
                this.$store.commit('isReport', true);
                this.$store.commit('isSee', false);
                localStorage.remove('detailList')
            },
            cancel() {
                this.onPage();
            },
            confirm() {
                this.onPage();
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.offset = newSize;
                this.getSlectList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.page = newPage;
                this.getSlectList()
            },
            lookSizeChange(newSize) { //当前显示多少条操作
                this.lookInfo.offset = newSize;
                this.looklist()
            },
            lookCurrentChange(newPage) { //当前页数操作
                this.lookInfo.page = newPage;
                this.looklist()
            },
            likeSizeChange(newSize) { //当前显示多少条操作
                this.likeInfo.offset = newSize;
                this.intentionList()
            },
            likeCurrentChange(newPage) { //当前页数操作
                this.likeInfo.page = newPage;
                this.intentionList()
            },
            getSlectList() { //维护人列表
                let page = 1;
                let offset = 999;
                let province_id = this.detailList.province_id;
                let city_id = this.detailList.city_id;
                let area_id = this.detailList.area_id;
                let storefront_id = this.detailList.storefront_id;
                Api.getSlectList(page, offset, province_id, city_id, area_id, storefront_id).then((res) => {
                    this.tablePage=res.data.count;
                    this.tableData = res.data.user_data;
                })
            },
            looklist(){ //带看管理列表
                let page = 1;
                let offset = 999;
                let area_id = this.detailList.area_id;
                let storefront_id = this.detailList.storefront_id;
                let id =this.detailList.id;
                Api.lookList(page, offset, storefront_id,area_id,id).then((res) => {
                    this.lookPage=res.data.count;
                    this.lookData=res.data.data;
                })
            },
            intentionList(){ //意向楼盘列表
                let page = 1;
                let offset = 999;
                let id =this.detailList.id;
                Api.intentionList(page,offset,id).then((res)=>{
                    this.likePage=res.data.count;
                    let data=res.data.data;
                    data.map((val)=>{
                        if (val.client_id===this.detailList.id) {
                            val.client_name=this.detailList.client_name
                        }
                    });
                   this.likeData=data

                })
            }

        },
        computed: {
            seeStatus() {
                return this.$store.state.report.seeStatus
            },
            detailList() {
                return this.$store.state.report.detailList
            }
        },
        created(){
            this.getSlectList();
            this.looklist();
            this.intentionList()
        },
        watch: {
            detailList(val) {
                if (val) {
                    this.getSlectList();
                    this.looklist();
                    this.intentionList()
                }
            }
        }
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .add_box {
        width: 300px;
        height: 300px;
        background: #f0f2f5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: change 1s;
        -webkit-animation-fill-mode: forwards;
        overflow: hidden;
    }

    @keyframes change {
        from {
            width: 300px;
            height: 300px;
        }

        to {
            width: 100%;
            height: 100%;
        }

    }

    .poor {
        width: 98.2%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 99;
    }

    .el-icon-close {
        color: #333;
        font-weight: bold;
        font-size: 18px;
    }

    .addContent {
        width: 98.3%;
        margin: 15px;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 55px;
    }

    .The_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px #eee solid;
        padding-left: 15px;
    }

    .content_box {
        width: 98.3%;
        padding: 15px;
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }

    label {
        display: block;
        padding: 20px 0;
    }

    .report_int {
        width: 300px;
    }

    .content_box {
        width: 100%;
    }

    .See_int {
        width: 98.3%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .bottom {
        padding-bottom: 30px;
    }

    .top {
        margin-top: 20px;
    }

    .tab {
        padding: 0 15px;
        padding-top: 30px;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .page {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>
