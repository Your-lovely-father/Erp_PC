<template>
    <div class="reportAdd" v-show="addEmployees">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加员工
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>员工信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
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
                            </div>
                           <div class="status_upload_box">
                               <div class="state">
                                   <div class="int_box">
                                       <label>状态</label>
                                       <el-switch
                                               v-model="user_status"
                                               active-color="#13ce66"
                                               inactive-color="#ff4949"
                                       >
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
    import Axios from '../../../api/pub/pub'
    import Api from '../../../api/Employees/Employees'

    export default {
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
                user_statusValue: false,//状态值
                mobile_terminal_status: false,//是否开通手机端
                mobile_terminal_statusValue: '',//手机端值
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
            onPage() {
                this.$store.commit('showEmployees', true);
                this.$store.commit('showStatusEmployees', false);
            },
            cancel() {
                this.onPage()
            },
            flagSwitch(e) {//状态
                this.mobile_terminal_status = e
            },
            flagSwitch(e) {//是否开启手机端
                this.mobile_terminal_statusValue = e
            },
            confirm() {
                if (this.user_status === true) {
                    this.user_statusValue = 1
                } else {
                    this.user_statusValue = 2
                }
                if (this.mobile_terminal_status === true) {
                    this.mobile_terminal_statusValue = 1
                } else {
                    this.mobile_terminal_statusValue = 2
                }
                Api.postAdd(
                    this.user_name, this.user_phone, this.user_age, this.gender, this.user_id_card,
                    this.user_password, this.user_role, this.storefront_id,
                    this.province_id, this.city_id, this.area_id,
                    this.user_statusValue, this.mobile_terminal_statusValue,
                ).then((res) => {
                    if (res.code === "200001") {
                        this.$message.success(res.msg);
                        this.$emit('getSelectList'); //调用父组件上的员工列表方法
                        this.$emit("update:isShowAdd", false);
                    } else {
                        this.$message.error(res.msg);
                    }

                });
                this.onPage()
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
        },
        computed: {
            addEmployees() {
                return this.$store.state.employees.addEmployees
            },
        },
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
        width: 98.3%;
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

    .box_form {
        width: 100%;
    }

    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .report_int {
        width: 480px;
    }
    .status_upload_box{
        width: 100%;
    }
    .state{
        width: 480px;
        display: flex;
        justify-content: space-between;
        margin-left: 35px;
    }
    .upload{
        margin-left: 35px;
    }
    label {
        display: block;
        padding: 20px 0;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
