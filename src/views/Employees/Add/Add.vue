<template>
    <div class="See">
        <el-dialog
                width="65%"
                :visible="isShowAdd"
        >
            <!--     表单区域       -->
            <div class="box_form">
                <div class="form">
                    <div class="int_box">
                        <label>姓名</label>
                        <el-input
                                placeholder="请输入姓名"
                                v-model="user_name"
                                clearable
                                class="report_int"
                        >
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>电话</label>
                        <el-input
                                placeholder="请输入电话"
                                v-model="user_phone"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>年龄</label>
                        <el-input
                                placeholder="请输入年龄"
                                v-model="user_age"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>性别</label>
                        <el-select v-model="gender" placeholder="请输入性别" class="report_int"
                                   @change="genderValue($event)"
                        >
                            <el-option
                                    v-for="item in genderOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="int_box">
                        <label>身份证号</label>
                        <el-input
                                placeholder="请输入身份证号"
                                v-model="user_id_card"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>密码</label>
                        <el-input
                                placeholder="请输入密码"
                                v-model="user_password"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>角色管理</label>
                        <el-input
                                placeholder="请输入角色管理"
                                v-model="user_role"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>区域</label>
                        <el-cascader :options="areaOptions" clearable class="report_int"
                                     @change="handleChange"
                                     ref="cascaderAddr"
                        ></el-cascader>
                    </div>
                    <div class="int_box">
                        <label>门店</label>
                        <el-select v-model="storefront_id" placeholder="请输入门店" class="report_int"
                                   @change="obtain($event)"
                        >
                            <el-option
                                    v-for="item in storesOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    ref="id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="state">
                        <div class="int_box">
                            <label>状态</label>
                            <el-switch
                                    v-model="user_status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="int_box">
                            <label>开通手机端</label>
                            <el-switch
                                    v-model="mobile_terminal_status"
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
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>

<script>
    import Axios from '../../../api/pub/pub'
    import Api from '../../../api/Employees/Employees'

    export default {
        name: "See",
        props: {
            isShowAdd: {
                type: Boolean,
                default: false
            },
        },

        data() {
            return {
                user_name: '',//员工姓名
                user_phone: '', //电话
                user_age: '', //年龄
                gender: '',//性别
                user_id_card: '', //身份证号
                user_password: '',//密码
                user_role: '',//角色管理
                user_image: '',//员工头像
                storefront_id: '',//门店
                province_id: '',//省
                city_id: '',//市
                area_id: '',//区
                user_status: false,//员工状态
                user_statusValue:'',//状态值
                mobile_terminal_status: false,//是否开通手机端
                mobile_terminal_statusValue:'',//手机端值
                headDialogVisible: false,//图片显示隐藏
                headDialogImageUrl: '',//图片
                areaOptions: [],//区域三级联动数据
                storesOptions: [],//门店数据
                genderOptions: [{ //性别
                    value: '10',
                    label: '男'
                }, {
                    value: '20',
                    label: '女'
                }],
            }
        },
        methods: {
            cancel() {
                this.$emit("update:isShowAdd", false);
            },
            confirm() {//添加
                if (this.user_status === true) { //状态
                    this.user_statusValue = 1
                } else {
                    this.user_statusValue = 2
                }
                if (this.mobile_terminal_status === true) {//是否开启手机端(1开通2锁定)
                    this.mobile_terminal_statusValue = 1
                } else {
                    this.mobile_terminal_statusValue = 2
                }
                Api.postAdd(
                    this.user_name, this.user_phone, this.user_age,this.gender, this.user_id_card,
                    this.user_password, this.user_role, this.storefront_id,
                    this.province_id,this.city_id,this.area_id,
                    this.user_statusValue,this.mobile_terminal_statusValue,
                ).then((res) => {
                    if (res.code === "200001") {
                        this.$message.success(res.msg);
                        this.$emit('getSelectList'); //调用父组件上的员工列表方法
                        this.$emit("update:isShowAdd", false);
                    } else {
                        this.$message.error(res.msg);
                    }

                });
                this.$emit("update:isShowAdd", false);
            },
            getSelect() { //三级联动数据
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
                    window.sessionStorage.setItem('linkage', JSON.stringify(data));
                    var linkage = window.sessionStorage.getItem('linkage');
                    this.areaOptions = JSON.parse(linkage)
                })
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Axios.postStores().then(res => {
                    let cityData = JSON.stringify(res.data);
                    this.storesOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                })
            },
            obtain(e) { //门店id
                this.storefront_id = e
            },
            genderValue(e) { //性别
                this.gender = e
            },
            headHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            headHandlePictureCardPreview(file) {
                this.headDialogImageUrl = file.url;
                this.headDialogVisible = true;
            },
        },
        mounted() {
            this.getSelect();
        }
    }
</script>

<style scoped>
    .See {
        width: 100%;

    }

    .box_form {
        width: 100%;
    }

    .form {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .See >>> .el-dialog__header {
        display: none !important;
    }

    .report_int {
        width: 500px;
    }

    label {
        display: block;
        padding: 15px 0;
    }

    .state {
        width: 500px;
        display: flex;
        justify-content: space-between;
    }

    .upload {
        margin-left: 50px;
    }
</style>
