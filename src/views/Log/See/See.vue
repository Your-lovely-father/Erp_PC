<template>
    <div class="reportAdd" v-show="seeLog">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看日志
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
                        <p>查看日志</p>
                    </div>
                    <div class="content_box">
                        <div class="See_int">
                           <div class="int_box">
                               <div class="int">
                                   <label>操作人</label>
                                   <el-input
                                           :disabled="true"
                                           class="report_int"
                                           v-model="user_name"
                                   >
                                   </el-input>
                               </div>
                               <div class="int">
                                   <label>区域管理</label>
                                   <el-cascader v-model="valueArea" :options="searchAreaOptions" clearable class="report_int"
                                                :disabled="true"
                                   ></el-cascader>
                               </div>
                               <div class="int">
                                   <label>门店管理</label>
                                   <el-select v-model="storefront_name" placeholder="请选择" class="report_int"
                                              clearable
                                              :disabled="true"
                                   >
                                       <el-option
                                               v-for="item in searchStoresOptions"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"
                                       >
                                       </el-option>
                                   </el-select>
                               </div>
                               <div class="int">
                                   <label>操作内容</label>
                                   <el-input
                                           :disabled="true"
                                           class="report_int"
                                           v-model="title"
                                   >
                                   </el-input>
                               </div>
                               <div class="int">
                                   <label>操作时间</label>
                                   <el-date-picker
                                           v-model="createData"
                                           type="date"
                                           placeholder="选择日期"
                                           prefix-icon="el-icon-search"
                                           class="report_int reportdata"
                                           value-format="yyyy-MM-dd"
                                           clearable
                                           :disabled="true"
                                   >
                                   </el-date-picker>
                                   <span class="cross">
                                     -
                                </span>
                                   <el-time-picker
                                           v-model="createTime"
                                           placeholder="选择时间"
                                           prefix-icon="el-icon-search"
                                           class="report_int"
                                           value-format="HH:mm:ss"
                                           clearable
                                           :disabled="true"
                                   >
                                   </el-time-picker>
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
    export default {
        data() {
            return {
                user_name:'',
                storefront_id:'',
                storefront_name:'',
                title:'',
                createData:'',
                createTime:'',
                searchAreaOptions:[],
                searchStoresOptions:[],
                valueArea: [], // 区域回显 v-model 绑定的是一个数组
            };
        },
        methods: {
            onPage() {
                this.$store.commit('isLog', true);
                this.$store.commit('isSeeLog', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
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
                    this.searchAreaOptions = JSON.parse(linkage)
                })
            },
            // storesData() { //门店回显处理数据
            //     Axios.postStores(this.valueArea[2]).then(res => {
            //         let cityData = JSON.stringify(res.data.data);
            //         let data = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
            //         data.map((item, index) => {
            //             console.log(item)
            //             if (item.value == this.storefront_id) {
            //                 this.storefront_name = item.label;
            //             }
            //         })
            //     });
            // },
            parentMsg() {
                this.detailObject;
                // this.storesData();
            },
            setData(data) { //设置vuex数据负值给data
                this.user_name = data.user_name;
                this.title = data.title;
                this.storefront_name=data.storefront_name;
                this.createData = data.create_time;
                this.createTime = data.create_time;
                this.valueArea = [data.province_id + '', data.city_id + '', data.area_id + '']
            },
        },
        computed: {
            seeLog() {
                return this.$store.state.log.seeLog
            },
            detailObject(){
                this.setData(this.$store.state.log.detailObject);
                return this.$store.state.log.detailObject
            }
        },
        mounted() {
            this.detailObject;
            this.getSelect();
            // this.storesData();
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
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
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

    .See_int {
        width: 100%;
    }
    .int {
        margin-right: 15px;
    }
    .report_int {
        width: 398px;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .int_box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    /*.dataTime {*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*}*/
</style>
