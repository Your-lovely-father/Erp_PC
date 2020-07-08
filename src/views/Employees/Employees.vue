<template>
    <div class="report">
        <!--    卡片视图区域    -->
        <el-card>
            <myAddress/>
            <!--     表单区域       -->
            <div class="box_form">
                <div class="form">
                    <div class="int_box">
                        <label>姓名</label>
                        <el-input
                                placeholder="请输入姓名"
                                v-model="name"
                                clearable
                                class="report_int"
                        >
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>电话</label>
                        <el-input
                                placeholder="请输入电话"
                                v-model="phone"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>年龄</label>
                        <el-input
                                placeholder="请输入年龄"
                                v-model="age"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <!--                    <div class="int_box">-->
                    <!--                        <label>职位</label>-->
                    <!--                        <el-input-->
                    <!--                                placeholder="请输入职位"-->
                    <!--                                v-model="position"-->
                    <!--                                clearable-->
                    <!--                                class="report_int">-->
                    <!--                        </el-input>-->
                    <!--                    </div>-->
                    <div class="int_box">
                        <label>性别</label>
                        <el-input
                                placeholder="请输入性别"
                                v-model="gender"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>身份证号</label>
                        <el-input
                                placeholder="请输入身份证号"
                                v-model="idNumber"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <!--                    <div class="int_box">-->
                    <!--                        <label>账号</label>-->
                    <!--                        <el-input-->
                    <!--                                placeholder="请输入账号"-->
                    <!--                                v-model="account"-->
                    <!--                                clearable-->
                    <!--                                class="report_int">-->
                    <!--                        </el-input>-->
                    <!--                    </div>-->
                    <div class="int_box">
                        <label>密码</label>
                        <el-input
                                placeholder="请输入密码"
                                v-model="password"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>角色管理</label>
                        <el-input
                                placeholder="请输入角色管理"
                                v-model="role"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>门店</label>
                        <!--                        <el-input-->
                        <!--                                placeholder="请输入门店"-->
                        <!--                                v-model="stores"-->
                        <!--                                clearable-->
                        <!--                                class="report_int">-->
                        <!--                        </el-input>-->
                        <el-cascader :options="storesOptions" clearable class="report_int"
                                     @change="handleChange"
                                     ref="cascaderAddr"
                        ></el-cascader>
                    </div>
                    <div class="state">
                        <div class="int_box">
                            <label>状态</label>
                            <el-switch
                                    v-model="state"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="int_box">
                            <label>开通手机端</label>
                            <el-switch
                                    v-model="open"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            >
                            </el-switch>
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <div class="int_box">
                        <label>头像</label>
                        <el-upload
                                action="/erp/user_add"
                                list-type="picture-card"
                                :on-preview="headHandlePictureCardPreview"
                                :on-remove="headHandleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="headDialogVisible">
                            <img width="100%" :src="headDialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="sub_btn">
                    <el-button type="primary" @click="add">提交信息</el-button>
                </div>
            </div>
            <!--     表格区域       -->
            <div class="tab">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;"

                >
                    <el-table-column
                            fixed
                            prop="name"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="电话"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="abbreviations"
                            label="头像"
                            width="180"

                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.headDialogImageUrl" style="height: 50px"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="age"
                            label="年龄"
                            width="180">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="position"-->
                    <!--                            label="职位"-->
                    <!--                            width="180">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            prop="gender"
                            label="性别"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="idNumber"
                            label="身份证号"
                            width="180">
                    </el-table-column>

                    <!--                    <el-table-column-->
                    <!--                            prop="account"-->
                    <!--                            label="账户"-->
                    <!--                            width="180">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            prop="password"
                            label="密码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                            width="180">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.state"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="role"
                            label="角色管理"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="stores"
                            label="门店"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="open"
                            label="开通手机端"
                            width="180">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.open"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="upd()">编辑</el-button>
                            <el-popconfirm
                                    confirmButtonText='确定'
                                    cancelButtonText='取消'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="确定要删除吗？"
                            >
                                <el-button type="text" size="small" slot="reference" class="el-popconfirm">删除
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <mySee :isShow.sync="isShow"/>
            <myModify :isShowsUpd.sync="isShowsUpd"/>
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
        </el-card>
    </div>
</template>

<script>
    import mySee from '../../views/Employees/See/See'
    import myModify from '../../views/Employees/Modify/Modify'
    import  myAddress from '../../components/Pub/address/address'
    import Api from '../../api/Employees/Employees'
    import Axios from '../../api/pub/pub'
    export default {
        name: "Report",
        components: {
            mySee,
            myModify,
            myAddress
        },
        data() {
            return {
                name: '',
                phone: '',
                age: '',
                // position: '',
                gender: '',
                idNumber: '',
                password: '',
                // account:'',
                role: '',
                stores: '',
                state: false,
                open: false,
                headDialogImageUrl: '',
                headDialogVisible: false,
                tableData: [
                    {
                        name: '大卫',
                        phone: '1888888888',
                        headDialogImageUrl: require('../../assets/images/logo-ip.png'),
                        age: '18',
                        // position: '经理',
                        gender: '男',
                        idNumber: '211422199804165619',
                        // account:'95241616',
                        password: '123456',
                        role: '超级管理员',
                        stores: 'A门店',
                        state: false,
                        open: false,
                    }
                ],
                currentPage4: 4,
                isShow: false,//查看
                isShowsUpd: false,//修改
                storesOptions: [],
                provinceValue:'',
                cityValue:'',
                areaValue:''

            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
                this.isShow = true
            },
            upd() {
                this.isShowsUpd = true
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            headHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            headHandlePictureCardPreview(file) {
                this.headDialogImageUrl = file.url;
                this.headDialogVisible = true;
            },
            add() {
                const user_name = this.name;//员工姓名
                const user_phone = this.phone;//员工电话
                const user_age = this.age;//员工年龄
                const user_sex = this.gender;//员工性别(10男20女)
                const user_id_card = this.idNumber;//员工身份证号
                // const user_image = this.headDialogImageUrl;//员工头像
                const user_password = this.password;//员工密码
                var user_status
                if (this.state === true) { //状态
                    user_status = 1
                } else {
                    user_status = 2
                }
                const user_role = this.role;//员工角色id
                const province_id = this.provinceValue;//省级id
                const city_id = this.cityValue;//市级id
                const area_id = this.areaValue;//区域id
                const storefront_id = this.stores;//门店id
                var mobile_terminal_status
                if (this.open === true) {//是否开启手机端(1开通2锁定)
                    mobile_terminal_status = 1
                } else {
                    mobile_terminal_status = 2
                }
                Api.postAdd(user_name, user_phone, user_age, user_sex, user_id_card, user_password, user_status, user_role,
                    province_id, city_id, area_id, storefront_id, mobile_terminal_status,).then((res) => {
                    console.log(res)
                })
            },
            getSelect() {
                Axios.getSelect().then((res) => {
                    const data = res.data[0].son;
                    data.map((item)=>{
                        item.label = item.AREA_NAME;
                        item.value = item.AREA_ID;
                        item.children =  item.son;
                        if(item.son){
                            item.son.map(el=>{
                                el.label = el.AREA_NAME;
                                el.value = el.AREA_ID;
                                el.children =  el.son;
                                if(el.son){
                                    el.son.map(key=>{
                                        key.label = key.AREA_NAME;
                                        key.value = key.AREA_ID;
                                        key.children =  key.son;

                                    })
                                }
                            })
                        }
                    });
                    window.sessionStorage.setItem('linkage',JSON.stringify(data))
                    var linkage  =window.sessionStorage.getItem('linkage')
                    this.storesOptions = JSON.parse(linkage)
                })
            },
            handleChange(){
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.provinceValue=pathvalue[0];
                this.cityValue=pathvalue[1];
                this.areaValue=pathvalue[2];
                // console.log(this.provinceValue)
                // console.log(  this.cityValue)
                // console.log( this.areaValue)
                Axios.postStores().then(res=>{
                    console.log(res)
                })
            }
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>
    .report {
        width: 100%;
        height: 100%;
    }

    .el-card {
        height: 100%;
        overflow: auto;
    }

    .el-popconfirm {
        margin-left: 10px;
    }

    .box_form {
        width: 100%;
    }

    .form {
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .report_int {
        width: 800px;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .date {
        width: 392px;
    }

    .sub_btn {
        padding: 20px 0;
        text-align: right;
    }

    .tab {
        width: 100%;
    }

    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }

    .page {
        width: 100%;
        text-align: center;
        padding: 30px 0;
    }

    .state {
        display: flex;
        width: 800px;
        justify-content: space-between;
    }
</style>
