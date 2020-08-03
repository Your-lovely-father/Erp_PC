<template>
    <div class="reportAdd" v-show="addstores">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加门店
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>门店信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="form_box">
                            <div class="form">
                                <div class="int_box">
                                    <label>门店名称</label>
                                    <el-input
                                            placeholder="请输入门店名称"
                                            v-model="storefront_name"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>负责区域</label>
                                    <el-cascader :options="areaOptions" clearable class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    ></el-cascader>
                                </div>
                                <!--<div class="int_box_right">-->
                                    <!--<label>时间</label>-->
                                    <!--<el-date-picker-->
                                            <!--v-model="date"-->
                                            <!--type="date"-->
                                            <!--placeholder="选择日期"-->
                                            <!--class="data"-->
                                    <!--&gt;-->
                                    <!--</el-date-picker>-->
                                    <!-- - -->
                                    <!--<el-time-picker-->
                                            <!--v-model="time"-->
                                            <!--placeholder="选择时间"-->
                                            <!--class="data"-->
                                    <!--&gt;-->
                                    <!--</el-time-picker>-->
                                <!--</div>-->
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
    import Api from '../../../api/Stores/Stores'
    import Axios from '../../../api/pub/pub'
    export default {
        data() {
            return {
                storefront_name: '', //门店名称
                areaOptions: [], //区域
                province_id:'', //省
                city_id:'',//市
                area_id:'', //区
                // type: [],
                // date: '',
                // time: '',
            }
        },
        methods: {
            onPage() {
                this.$store.commit('showstores', true);
                this.$store.commit('showstoresStatus', false);
            },
            cancel() {
                this.onPage()
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id=pathvalue[0]
                this.city_id=pathvalue[1]
                this.area_id=pathvalue[2]
            },
            confirm() {
                Api.storesAdd(this.storefront_name,this.province_id, this.city_id,this.area_id).then((res)=>{
                    if(res.code==="200001"){
                        this.$message.success(res.msg);
                        this.$emit('storesSee'); //调用父组件上的员工列表方法
                    }else{
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
        },
        mounted(){
            this.getSelect()
        },
        computed: {
            addstores() {
                return this.$store.state.stores.addstores
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

    .form_box {
        width: 100%;
    }

    .form {
        width: 100%;
        display: flex;
    }

    .report_int {
        width: 300px;
        margin-right: 20px;
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
