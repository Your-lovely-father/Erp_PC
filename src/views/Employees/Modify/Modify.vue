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
                                <div class="int_box ">
                                    <label>角色管理</label>
                                    <el-cascader v-model="user_role" :options="roleOptions" clearable class="report_int"
                                    ></el-cascader>
                                </div>
                                <div class="state">
                                    <div class="int_box">
                                        <label>状态</label>
                                        <el-switch
                                                v-model="user_status"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
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
                                                @change="mobile"
                                        >
                                        </el-switch>
                                    </div>
                                </div>
                            </div>
                            <div class="upload">
                                <div class="int_box">
                                    <label>头像</label>
                                    <el-upload
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            :on-preview="headHandlePictureCardPreview"
                                            :on-remove="headHandleRemove"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="headDialogVisible">
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
                roleOptions: [], //角色列表
                user_role: [],
                user_status: '', //状态
                mobile_terminal_status: '', //开通手状态
                genderOptions: [{ //性别
                    value: '10',
                    label: '男'
                }, {
                    value: '20',
                    label: '女'
                }],
                province_id:'',
                city_id:'',
                area_id:'',

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
                Api.postUpd().then((res) => {

                });
                this.onPage()
            },
            headHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            headHandlePictureCardPreview(file) {
                this.headDialogImageUrl = file.url;
                this.headDialogVisible = true;
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
                    this.roleOptions = roleData;
                })
            },
            userSex(){ //性别回显
               this.genderOptions.forEach((item,index)=>{
                   if(item.value==this.user_sex){
                       this.user_sex='男'
                   }else {
                       this.user_sex='女'
                   }
               })
            },
            genderValue(e){ //获取男女
                console.log(e)
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.storeList = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                });
                this.storefront=''
            },
            storeId(e){ //获取门店id
                console.log(e)
            },
            status(e){ //获取状态 1 true 2 false
                console.log(e)
            },
            mobile(e){ //获取手机端状态 1 true 2 false
                console.log(e)
            },
            parentMsg() {
                this.detailsObj
            },
            setData(data) {
                this.user_name = data.user_name;
                this.user_phone = data.user_phone;
                this.user_age = data.user_age;
                this.user_sex = data.user_sex;
                this.user_id_card = data.user_id_card;
                this.storefront = data.storefront;
                this.user_status = data.user_status === 1 ? true : false;
                this.mobile_terminal_status = data.mobile_terminal_status === 1 ? true : false;
                this.valueArea = [data.province_id + '', data.city_id + '', data.area_id + ''];
                this.user_role = [data.user_role];
                this.headDialogImageUrl = data.user_image;
            },
            // moveSwitch(status) { //开通手机端切换开关
            //     if (status === 1) {
            //         this.selectUpd.mobile_terminal_status = 2
            //     } else {
            //         this.selectUpd.mobile_terminal_status = 1
            //     }
            // },
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
            this.postRole();
            this.userSex()
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
        padding-top: 15px;
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
