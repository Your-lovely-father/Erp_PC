<template>
    <div class="reportAdd" v-show="addLook">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加带看
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>带看信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="form">
                            <div class="form-box">
                                <div class="int_box">
                                    <label>带看记录</label>
                                    <el-input
                                            placeholder="请输入带看记录"
                                            clearable
                                            v-model="guide_look_content"
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader :options="areaOptions" clearable
                                                 class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    >
                                    </el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>门店</label>
                                    <el-select v-model="storefront_id" placeholder="请选择" class="report_int"
                                               @change="storefrontValue"
                                    >
                                        <el-option
                                                v-for="item in storesOptions"
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
                                               @change="userValue"
                                    >
                                        <el-option
                                                v-for="item in userOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>意向楼盘</label>
                                    <el-select v-model="building_id" placeholder="请选择" class="report_int"
                                               @change="buildingId"
                                    >
                                        <el-option
                                                v-for="item in building_idOoptions"
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
                                    >
                                        <el-option
                                                v-for="item in clientOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="int_box">
                                    <label>时间</label>
                                    <el-date-picker
                                            v-model="lookDate"
                                            type="date"
                                            placeholder="选择日期"
                                            class="data"
                                            @change="getData"
                                            value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="lookTime"
                                            placeholder="选择时间"
                                            class="data"
                                            @change="getTime"
                                            value-format="HH:mm:ss"
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
    import  Api from '../../../api/Look/Look';
    import  Axios from '../../../api/pub/pub';
    import  RepApi from '../../../api/Report/Report'
    import LookApi from '../../../api/Look/Look'
    export default {
        data() {
            return {
                guide_look_content:'', //带看记录
                client_id:'',//客户id
                clientOptions:[],//客户列表
                user_id:'',//维护人id
                userOptions:[],//维护人列表
                areaOptions:[],//区域列表
                storefront_id:'',//门店id
                storesOptions:[],//门店列表
                building_id:'',//楼盘id
                building_idOoptions:[],//楼盘列表
                lookDate:'',//日期
                lookTime:'',//时间
                look_time:'' ,//日期时间合并
                province_id:'',
                city_id:'',
                area_id:''
            }
        },
        methods: {
            onPage() {
                this.$store.commit('showLook', true);
                this.$store.commit('showStatusLook', false);
            },
            cancel(){
                this.onPage()
            },
            confirm(){
                this.onPage();
                Api.lookAdd(this.guide_look_content,this.client_id,this.user_id,this.area_id,this.storefront_id,this.building_id,this.look_time).then((res)=>{
                    if(res.code==="200001"){
                        this.$message.success('添加成功');
                        this.$emit('lookList')
                    }
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
                });
                this.buildingList()
            },
            getSlectList(){ //获取员工列表拿到维护人id
                let page =1;
                let pagesum =999;
                let province_id =this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                let storefront_id = this.storefront_id+'';
                RepApi.getSlectList(page,pagesum,province_id,city_id,area_id,storefront_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.user_data);
                    this.userOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                })
            },
            buildingList(){ //楼盘字典列表获取意向楼盘
                let page =1 ;
                let pagesum = 999;
                let province_id =this.province_id;
                let city_id = this.city_id;
                let area_id = this.area_id;
                RepApi.buildingList(page,pagesum,province_id,city_id,area_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.building_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                });
            },
            clientList(){ //获取所有客户名称
                let page =1;
                let pagesum =999;
                LookApi.clientList(page,pagesum).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.clientOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/client_name/g, "label"));
                })
            },
            storefrontValue(e){ //获取门店id
                this.storefront_id=e;
                this.getSlectList()
            },
            userValue(e){ //维护人id
                this.user_id=e
            },
            buildingId(e){ //意向楼盘
                this.building_id=e;
            },
            clientId(e){ //客户id
                this.client_id=e
            },
            getData(e){//日期
                this.lookDate=e
            },
            getTime(e){ //时间
                this.lookTime=e;
                this.look_time=this.lookDate + ' '+this.lookTime
            }


        },
        computed: {
            addLook() {
                return this.$store.state.look.addLook
            },
        },
        mounted() {
            this.getSelect();
            this.clientList()
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
    .content_box{
        width: 98.3%;
        padding: 15px;
    }
    .footer{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }
    .form{
        width: 100%;
    }
    .form-box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .data{
        width:245px;
    }
    .report_int{
        width: 500px;
        margin-right: 30px;
    }
    label{
        display: block;
        padding: 20px 0;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
