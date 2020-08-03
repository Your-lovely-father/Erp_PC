<template>
    <div class="reportAdd" v-show="updEmployees">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改员工
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页"
                                    placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>修改员工</p>
                    </div>
                    <div class="content_box">
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
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>年龄</label>
                                    <el-input
                                            placeholder="请输入年龄"
                                            v-model="user_age"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>性别</label>
                                    <el-select v-model="user_sex" placeholder="请输入性别" class="report_int"
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
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader v-model="valueArea" :options="areaOptions" clearable class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    ></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-select v-model="storefront" placeholder="请选择" class="report_int"
                                        @change="storeId"
                                    >
                                        <el-option
                                                v-for="item in storeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>密码</label>
                                    <el-input
                                            placeholder="密码为空为原始密码"
                                            v-model="user_password"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="state">
                                    <div class="int_box">
                                        <label>状态</label>
                                        <el-switch
                                                v-model="user_status"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-value="1"
                                                inactive-value="2"
                                                @change="status"
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
                                                @change="mobile"
                                        >
                                        </el-switch>
                                    </div>
                                </div>
                            </div>
                            <div class="upload">
                                <div class="prmi_box ">
                                    <label>角色管理</label>
                                    <el-tree
                                            :data="managementList"
                                            show-checkbox
                                            node-key="id"
                                            default-expand-all
                                            :props="defaultProps"
                                            :check-strictly="true"
                                            :default-checked-keys="rule"
                                            @check-change="management"
                                            ref="tree1"
                                    >
                                    </el-tree>
                                </div>
                                <div class="int_box">
                                    <label>头像</label>
                                    <el-upload
                                            class="avatar-uploader"
                                            ref="upload_img"
                                            action=""
                                            accept="image/jpeg,image/jpg,image/png"
                                            list-type="picture-card"
                                            :file-list="picture_list"
                                            :on-exceed="fileBeyond"
                                            :on-remove="handleRemove"
                                            :limit="1"
                                            :http-request="uploadSectionFile"
                                            :on-preview="headHandlePictureCardPreview"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :append-to-body="true" :visible.sync="headDialogVisible">
                                        <img width="100%" :src="headDialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <el-button @click="cancel" size="medium">取消</el-button>
                        <el-button type="primary" @click="confirm" size="medium">确认</el-button>
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
    import roleApi from '../../../api/Role/Role'
    export default {
        data() {
            return {
                headDialogImageUrl: '',
                headDialogVisible: false,
                user_name: '', //姓名
                user_phone: '', //手机号
                user_age: '', //年龄
                user_sex: '', //性别
                user_id_card: '', //身份证
                areaOptions: [], //区域列表
                valueArea: [], //区域回显
                storeList: [], //门店列表
                storefront: '', //门店回显
                storefront_id:'',
                user_image: '',//员工头像
                user_status: '', //状态
                mobile_terminal_status: '', //开通手状态
                genderOptions: [{ //性别
                    value: '10',
                    label: '男'
                }, {
                    value: '20',
                    label: '女'
                }],
                userImage:'https://erp-report-shenyang.oss-cn-beijing.aliyuncs.com/',
                imageUrl:'', //详情图片
                picture_list: [],//回显图片
                flag:true ,//控制点击后清除回显图片且在不执行该方法
                id:'', //此数据唯一id
                user_password:'',//密码
                managementList: [],//权限管理
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                rule:[]
            };
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdEmployees', true);
                this.$store.commit('isUpdStatusEmployees', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                let imgage ='';
                if(!this.user_image){
                    imgage=this.imageUrl
                }else {
                    imgage=this.user_image
                }
                let user_role = '';
                if(!this.user_role){
                    user_role=this.rule.join(',');
                }else {
                    user_role=this.user_role
                }
                Api.postUpd(
                    this.id,
                    this.user_name,
                    this.user_sex,
                    this.user_phone,
                    imgage,
                    this.user_age,
                    this.user_id_card,
                    this.user_password,
                    this.user_status,
                    user_role,
                    this.valueArea[0],
                    this.valueArea[1],
                    this.valueArea[2],
                    this.storefront_id,
                    this.mobile_terminal_status
                ).then((res) => {
                    if(res.code === "200003"){
                        this.$message.success('修改成功');
                        this.$emit('getSelectList')
                    }else {
                        this.$message.error('修改失败')
                    }
                });
                this.onPage()
            },
            logoutHandle(){//清除图片
                if(this.flag){
                    this.picture_list=[];
                    this.flag = false
                }
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
                    url: 'http://localhost:8081/api/erp/upload_file',
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
                    this.areaOptions = JSON.parse(linkage);
                })
            },
            getSelectList() {
                roleApi.roleList().then((res) => {
                    const jsonData = res.data;
                    jsonData.map((item) => {
                        item.label = item.group_name;
                        item.value = item.id;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.group_name;
                                el.value = el.id;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.group_name;
                                        key.value = key.id;
                                        key.children = key.son;
                                        if (key.son) {
                                            key.son.map(area => {
                                                area.label = area.group_name;
                                                area.value = area.id;
                                                area.children = area.son;
                                                if (area.son) {
                                                    area.son.map(stores => {
                                                        stores.label = stores.group_name;
                                                        stores.value = stores.id;
                                                        stores.children = stores.son;
                                                        if (stores.son) {
                                                            stores.son.map(people => {
                                                                people.label = people.group_name;
                                                                people.value = people.id;
                                                                people.children = people.son;
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        this.managementList=jsonData
                    });
                })
            },
            management(){
                let res = this.$refs.tree1.getCheckedKeys().concat(this.$refs.tree1.getHalfCheckedKeys());
                let value =res.join(',');
                this.user_role=value;
                this.rule=[]
            },
            userSex(){ //性别回显
               this.genderOptions.forEach((item,index)=>{
                   if(item.value===this.user_sex){
                       this.user_sex='男'
                   }else {
                       this.user_sex='女'
                   }
               })
            },
            genderValue(e){ //获取男女
                this.user_sex=e
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.valueArea[0] = pathvalue[0];
                this.valueArea[1] = pathvalue[1];
                this.valueArea[2] = pathvalue[2];
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.storeList = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                });
                this.storefront=''
            },
            storesData() { //门店回显处理数据
                Axios.postStores(this.valueArea[2]).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.storefront_id) {
                            this.storefront = item.label;
                        }
                    })
                });
            },
            storeId(e){ //获取门店id
               this.storefront_id=e
            },
            status(e){ //获取状态 1 true 2 false
                this.user_status=e
            },
            mobile(e){ //获取手机端状态 1 true 2 false
                this.mobile_terminal_status=e
            },
            parentMsg() {
                this.detailsObj;
                this.storesData()
            },
            setData(data) {
                this.user_name = data.user_name;
                this.user_phone = data.user_phone;
                this.user_age = data.user_age;
                this.user_sex = data.user_sex+'';
                this.user_id_card = data.user_id_card;
                this.storefront_id = data.storefront_id;
                this.user_status = data.user_status+'';
                this.mobile_terminal_status = data.mobile_terminal_status+'';
                this.valueArea = [data.province_id + '', data.city_id + '', data.area_id + ''];
                let role =data.user_role;
                if(role !== undefined){
                    this.rule=data.user_role.split(',');
                }
                this.imageUrl = data.user_image;
                this.id=data.id;
                this.picture_list.push({
                    url:this.userImage+this.imageUrl
                });
                if (this.picture_list.length === 2){
                    this.picture_list.shift()
                }
            },
        },
        computed: {
            updEmployees() {
                return this.$store.state.employees.updEmployees
            },
            detailsObj() {
                this.setData(this.$store.state.employees.detailsObj);
                return this.$store.state.employees.detailsObj
            }
        },
        mounted() {
            this.detailsObj
            this.getSelect();
            this.userSex();
            this.storesData();
            this.getSelectList();
            this.$refs.upload_img.$children[this.$refs.upload_img.$children.length-1].$el.addEventListener('click',()=>{
                this.logoutHandle()
            })
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
        margin-top: 13px;
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
