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
                                    <el-cascader :options="roleOptions" clearable class="report_int"
                                                 @change="roleChange"
                                                 ref="roleAdd"
                                    ></el-cascader>
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
                                                active-value="1"
                                                inactive-value="2"
                                                @change="status($event)"
                                        >
                                        </el-switch>
                                    </div>
                                    <div class="int_box">
                                        <label>开通手机端</label>
                                        <el-switch
                                                v-model="mobile_terminal_status"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-value="1"
                                                inactive-value="2"
                                                @change="mobileStatus($event)"
                                        >
                                        </el-switch>
                                    </div>
                                </div>
                                <div class="upload">
                                    <div class="int_box">
                                        <label>头像</label>
                                        <!--       action 图片上传到的api地址
                                                   on-preview  处理图片预览效果
                                                   on-remove 处理移除图片的操作
                                                   on-success	文件上传成功时的钩子
                                                   on-error	文件上传失败时的钩子
                                                   limit 最多可上传1张
                                         -->
                                        <el-upload
                                                class="avatar-uploader"
                                                ref="upload_img"
                                                action=""
                                                accept="image/jpeg,image/jpg,image/png"
                                                :name="upload_name"
                                                list-type="picture-card"
                                                :on-exceed="fileBeyond"
                                                :on-remove="handleRemove"
                                                :limit="1"
                                                :http-request="uploadSectionFile"
                                                :on-preview="headHandlePictureCardPreview"
                                        >
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :modal='false' :visible.sync="headDialogVisible">
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
    import axios from 'axios'

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
                user_status: 0,//员工状态
                mobile_terminal_status: 0,//是否开通手机端
                headDialogVisible: false,//图片显示隐藏
                headDialogImageUrl: '',//图片
                areaOptions: [],//区域三级联动数据
                storesOptions: [],//门店数据
                roleOptions: [],//角色数据
                genderOptions: [{ //性别
                    value: '10',
                    label: '男'
                }, {
                    value: '20',
                    label: '女'
                }],
                upload_name: 'files',//图片上传的后端接受图片文件的 key
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
            status(e) { //状态的值
                this.user_status = e
            },
            mobileStatus(e) { //手机
                this.mobile_terminal_status = e
            },
            uploadSectionFile(params) {// 自定义上传方法
                let that = this;
                let file = params.file;  //获取上传的文件
                let fileType = file.type;   //获取文件类型
                let isImage = fileType.indexOf('image') != -1; // 判断是否是图片类型
                let file_url = that.$refs.upload_img.uploadFiles[0].url;
                let isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {  // 判断大小
                    that.$message.error('上传图片的大小不能超过 2MB!');
                    that.$refs.upload_img.uploadFiles = [];  //不符合就清空已选择的图片
                    return;
                }
                if (!isImage) {  // 文件格式
                    that.$message.error('请选择图片文件！');
                    that.$refs.upload_img.uploadFiles = [];   //不符合就清空已选择的图片
                    return;
                }
                if (isImage) {
                    var img = new Image();
                    img.src = file_url;
                    img.onload = function () {
                        //  一切验证通过后调用上传方法
                        that.uploadFile(file);
                    }
                }
            },
            uploadFile(file) {
                var that = this;
                var formData = new FormData();
                formData.append('files', file);
                formData.append('type', '3');
                let Authorization = window.localStorage.getItem('access_token');
                let token = JSON.parse(Authorization);
                const instance = axios.create({
                    withCredentials: true
                });
                //上传头像
                instance({
                    method: 'post',
                    url: 'http://localhost:8080/api/erp/upload_file',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'access-token': token
                    },
                    data: formData
                }).then((res) => {
                    if (res.data.code === "200005") {  //成功的话将数据插入data中
                        that.user_image = res.data.data.url;
                        that.$message.success('图片上传成功')
                    } else {
                        // 上传失败，清除已选择 内容 ，并提示失败原因
                        that.$refs.upload_img.uploadFiles = [];
                        that.$message.error('图片上传异常');
                    }
                })
            },
            //文件删除
            handleRemove() {
                this.user_image = '';
            },
            headHandlePictureCardPreview(file) { //处理图片预览效果
                this.headDialogImageUrl = file.url;
                this.headDialogVisible = true;
            },
            //文件超限
            fileBeyond() {
                this.$message({
                    type: 'info',
                    message: '最多上传1张图片'
                });
            },
            confirm() {
                Api.postAdd(
                    this.user_name, this.user_phone, this.user_age, this.gender, this.user_id_card,
                    this.user_image,
                    this.user_password, this.user_role,
                    this.province_id, this.city_id, this.area_id,
                    this.storefront_id,
                    this.user_status, this.mobile_terminal_status,
                ).then((res) => {
                    if (res.code === "200001") {
                        this.$message.success(res.msg);
                        this.$emit('getSelectList'); //调用父组件上的员工列表方法
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
                    window.localStorage.setItem('linkage', JSON.stringify(data));
                    var linkage = window.localStorage.getItem('linkage');
                    this.areaOptions = JSON.parse(linkage)
                })
            },

            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.storesOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                })
            },
            roleChange() { //获取角色id
                var rolevalue = this.$refs.roleAdd.getCheckedNodes()[0].data.id;
                this.user_role = rolevalue
            },
            obtain(e) { //门店id
                this.storefront_id = e
            },
            genderValue(e) { //性别
                this.gender = e
            },
            postRole() { // 查询角色管理
                Api.postRole().then((res) => {
                    const roleData = res.data;
                    roleData.map((item) => {
                        item.label = item.group_name;
                        item.value = item.id;
                        item.children = item.children;
                        if (item.children) {
                            item.children.map(el => {
                                el.label = el.group_name;
                                el.value = el.id;
                            })
                        }
                    });
                    this.roleOptions = roleData
                })
            },

        },

        mounted() {
            this.getSelect();
            this.postRole()
        },
        computed: {
            addEmployees() {
                return this.$store.state.employees.addEmployees
            },
        },
        watch: { //三级联动切换区域清空门店内容
            area_id(val) {
                if (val) {
                    this.storefront_id = ''
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

    .status_upload_box {
        width: 100%;
    }

    .state {
        width: 480px;
        display: flex;
        justify-content: space-between;
        margin-left: 35px;
    }

    .upload {
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
