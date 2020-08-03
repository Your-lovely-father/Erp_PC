<template>
    <div class="reportAdd" v-show="seeEmployees">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看员工
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
                        <p>查看员工</p>
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
                                            :disabled="true"
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
                                            :disabled="true"
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
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>性别</label>
                                    <el-input
                                            placeholder="请输入性别"
                                            v-model="user_sex"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>身份证号</label>
                                    <el-input
                                            placeholder="请输入身份证号"
                                            v-model="user_id_card"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader v-model="valueArea" :options="areaOptions" clearable class="report_int"
                                                 :disabled="true"
                                    ></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-select v-model="storefront" placeholder="请选择" class="report_int"
                                               :disabled="true"
                                    >
                                        <el-option
                                                v-for="item in storeList"
                                                :key="item.value"
                                                :label="item.label"
                                                value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box ">
                                    <label>角色管理</label>
                                    <el-cascader v-model="user_role" :options="roleOptions" clearable   :disabled="true" class="report_int"
                                    ></el-cascader>
                                </div>
                                <div class="state">
                                    <div class="int_box">
                                        <label>状态</label>
                                        <el-switch
                                                v-model="user_status"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                :disabled="true"
                                        >
                                        </el-switch>
                                    </div>
                                    <div class="int_box">
                                        <label>开通手机端</label>
                                        <el-switch
                                                v-model="mobile_terminal_status"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                :disabled="true"
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
                                            :disabled="true"
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
                user_role:[],
                user_status: '', //状态
                mobile_terminal_status: '' //开通手状态
            };
        },
        methods: {
            onPage() {
                this.$store.commit('isEmployees', true);
                this.$store.commit('isSeeEmployees', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
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
                        item.value = item.id+'';
                        item.children = item.children;
                        if (item.children) {
                            item.children.map(el => {
                                el.label = el.group_name;
                                el.value = el.id;
                            })
                        }
                    });
                    this.roleOptions=roleData;
                })
            },
            parentMsg() {
                this.detailsObj
            },
            setData(data) {
                this.user_name = data.user_name;
                this.user_phone = data.user_phone;
                this.user_age = data.user_age;
                this.user_sex = data.user_sex === 10 ? '男' : '女';
                this.user_id_card = data.user_id_card;
                this.storefront = data.storefront;
                this.user_status = data.user_status  === 1 ? true : false;
                this.mobile_terminal_status = data.mobile_terminal_status  === 1 ? true : false;
                this.valueArea = [data.province_id + '', data.city_id + '', data.area_id + ''];
                this.user_role=[data.user_role];
                this.headDialogImageUrl=data.user_image;
            }
        },
        computed: {
            seeEmployees() {
                return this.$store.state.employees.seeEmployees
            },
            detailsObj() {
                this.setData(this.$store.state.employees.detailsObj);
                return this.$store.state.employees.detailsObj
            }
        },
        mounted() {
            this.detailsObj
            this.getSelect();
            this.postRole()
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

    .state {
        width: 480px;
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
    }

    .upload {
        margin-left: 46px;
    }

    label {
        display: block;
        padding: 20px 0;
    }

    .content_box {
        width: 100%;
    }


    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
