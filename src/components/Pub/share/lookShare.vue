<template>
    <div>
        <div class="search">
            <div class="search_box">
                <div class="box_form">
                    <div class="form">
                        <div class="int_box">
                            <label>区域</label>
                            <el-cascader :options="searchAreaOptions" clearable class="report_int"
                                         @change="handleChange"
                                         ref="cascaderAddr"
                            ></el-cascader>
                        </div>
                        <div class="int_box">
                            <label>门店</label>
                            <el-select v-model="storefront_id" placeholder="请选择" class="report_int"
                                       @change="storefrontValue"
                                       clearable
                                       @clear="clearStorefront"
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
                        <div class="int_box">
                            <label>维护人</label>
                            <el-select v-model="user_id" placeholder="请选择" class="report_int"
                                       clearable
                                       @change="userId"
                                       @clear="clearUser"
                            >
                                <el-option
                                        v-for="item in user_idOoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="int_box">
                            <label>客户名称</label>
                            <el-select v-model="client_id" placeholder="请选择" class="report_int"
                                       clearable
                                       @change="clientId"
                                       @clear="clearClien"
                            >
                                <el-option
                                        v-for="item in client_idOoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="start">
                            <label class="">起止时间</label>
                            <el-date-picker
                                    v-model="start_data_start"
                                    type="date"
                                    placeholder="选择日期"
                                    class="report_data"
                                    prefix-icon="el-icon-search"
                                    @change="getData"
                                    value-format="yyyy-MM-dd"
                                    clearable
                                    @clear="clearData"
                            >
                            </el-date-picker>
                            <span class="cross">
                                    -
                                </span>
                            <el-time-picker
                                    v-model="start_time_start"
                                    placeholder="选择时间"
                                    class="report_int"
                                    prefix-icon="el-icon-search"
                                    @change="getTime"
                                    value-format="HH:mm:ss"
                                    clearable
                                    @clear="clearTime"
                            >
                            </el-time-picker>
                        </div>

                        <div class="finish">
                            <label class="label">结束时间</label>
                            <el-date-picker
                                    v-model="end_data_finish"
                                    type="date"
                                    placeholder="选择日期"
                                    prefix-icon="el-icon-search"
                                    @change="finishDate"
                                    class="report_data"
                                    value-format="yyyy-MM-dd"
                                    clearable
                                    @clear="clearFinishDate"
                            >
                            </el-date-picker>
                            <span class="cross">
                                    -
                                </span>
                            <el-time-picker
                                    v-model="end_time_finish"
                                    placeholder="选择时间"
                                    prefix-icon="el-icon-search"
                                    @change="finishTime"
                                    class="report_int"
                                    value-format="HH:mm:ss"
                                    clearable
                                    @clear="clearFinishTime"
                            >
                            </el-time-picker>
                        </div>
                        <div class="int_box btn_search">
                            <el-button type="primary" class="btn" @click="searchBtn">立即查询</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from '../../../api/pub/pub';
    import Api from '../../../api/Report/Report';
    import LookApi from '../../../api/Look/Look'
    export default {
        name: "share",
        data() {
            return {
                searchAreaOptions:[] ,//区域列表
                searchStoresOptions:[],//门店列表
                storefront_id:'',//门店id
                user_idOoptions:'',//员工列表
                user_id:'',//维护人id
                province_id:'',//省
                city_id:'',//市
                area_id:'',//区
                start_data_start:'',
                start_time_start:'',
                start_time:'',//起始时间
                end_data_finish:'',
                end_time_finish:'',
                end_time:'',//结束时间
                client_idOoptions:[],
                client_id:''
            }
        },
        methods:{
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
            handleChange() { //获取省市区id传给后台获取门店数据
                if(!this.$refs.cascaderAddr.getCheckedNodes()[0]){
                    this.province_id = '';
                    this.city_id = '';
                    this.area_id = '';
                    return false;
                }
                this.storefront_id='';
                this.user_id='';
                this.user_idOoptions=[];
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.province_id = pathvalue[0];
                this.city_id = pathvalue[1];
                this.area_id = pathvalue[2];
                Axios.postStores(this.area_id).then(res => {
                    let cityData = JSON.stringify(res.data.data);
                    this.searchStoresOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/storefront_name/g, "label"));
                });
            },
            storefrontValue(e){ //获取门店id
                this.storefront_id=e;
                this.user_id='';
                this.getSlectList();
            },
            getSlectList(){ //获取员工列表拿到维护人id
                let page =1;
                let pagesum =999;
                let province_id =this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                let storefront_id = this.storefront_id+'';
                Api.getSlectList(page,pagesum,province_id,city_id,area_id,storefront_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.user_data);
                    this.user_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                })
            },
            clientList(){ //获取所有客户名称
                let page =1;
                let pagesum =999;
                LookApi.clientList(page,pagesum).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.client_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/client_name/g, "label"));
                })
            },
            getData(e){ //起止日期处理 yyy-mm-dd
                this.start_data_start=e;
                if(!this.start_data_start){
                    this.start_data_start=''
                }
                this.start_time=this.start_data_start + ' ' +this.start_time_start;
                if(!this.start_data_start && !this.start_time_start){
                    this.start_time=''
                }
            },
            getTime(e){ //起止时间处理
                this.start_time_start=e;
                if(!this.start_time_start){
                    this.start_time_start=''
                }
                if(!this.start_data_start){
                    this.start_data_start=''
                }
                this.start_time=this.start_data_start + ' ' +this.start_time_start;
                if(!this.start_data_start && !this.start_time_start){
                    this.start_time=''
                }

            },
            finishDate(e){ //结束日期处理
                this.end_data_finish=e;
                if(!this.end_data_finish){
                    this.end_data_finish=''
                }
                this.end_time=this.end_data_finish + ' ' +this.end_time_finish;
                if(!this.end_data_finish && !this.end_time_finish){
                    this.end_time=''
                }
            },
            finishTime(e){ //结束时间处理
                this.end_time_finish=e;
                if(!this.end_time_finish){
                    this.end_time_finish=''
                }
                if(!this.end_data_finish){
                    this.end_data_finish=''
                }
                this.end_time=this.end_data_finish + ' ' +this.end_time_finish;
                if(!this.end_data_finish && !this.end_time_finish){
                    this.end_time=''
                }
            },
            userId (e) {//获取维护人id
                this.user_Id=e;
            },
            clientId(e){
                this.client_id=e
            },
            searchBtn(){//搜索
                this.$store.commit('area_id',this.area_id);
                this.$store.commit('storefront_id',this.storefront_id);
                this.$store.commit('user_id',this.user_id);
                this.$store.commit('client_id',this.client_id);
                this.$store.commit('start_time',this.start_time);
                this.$store.commit('end_time',this.end_time);
                if(this.$route.path==='/look'){
                    this.$emit('lookList')
                }
            },
            //一下是搜索清空功能
            clearStorefront(){
                this.storefront_id=''
            },
            clearUser(){
                this.user_id=''
            },
            clearData(){
                this.start_data_start='';
            },
            clearTime(){
                this.start_time_start= '';
            },
            clearFinishDate(){
                this.end_data_finish=''
            },
            clearFinishTime(){
                this.end_time_finish=''
            },
            clearClien(){
                this.client_id=''
            }
        },
        mounted(){
            this.getSelect();
            this.clientList()
        }
    }
</script>

<style scoped>
    .search {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;
        box-sizing: border-box;
    }

    label {
        display: block;
        padding: 10px 0;
    }

    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 250px;
        margin-right: 20px;
    }
    .report_data{
        width: 250px;
    }
    .btn_search{
        margin-top: 39px;
    }
    .search_box {
        margin-right: 20px;
        padding: 10px 0;
    }
    .cross{
        padding: 0 3px;
    }
    .btn {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
    }
    @media screen and  (max-width: 1024px){
        .report_data{
            width: 100% !important;
        }
        .start{
            width: 100% !important;
        }
        .finish{
            width: 100% !important;
        }
        .int_box{
            width: 100% !important;
        }
        .report_int{
            width: 100% !important;
        }
        .btn_search{
            margin-top: 15px !important;
        }
    }

</style>
