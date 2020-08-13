<template>
    <div class="reportAdd" v-show="updisIntention">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改区域
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
                        <p>修改区域</p>
                    </div>
                    <div class="content_box">
                        <div class="form_box">
                            <div class="form">
                                <div class="int_box">
                                    <label>区域</label>
                                    <el-cascader v-model="regionValue" :options="regionOptions" clearable class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    ></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>客户名称</label>
                                    <el-select v-model="client_name" placeholder="请选择" class="report_int"
                                               :disabled="true"
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
                                    <label>维护人</label>
                                    <el-select v-model="user_name" placeholder="请选择" class="report_int"
                                               :disabled="true"
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
                                    <el-select v-model="building_name" placeholder="请选择" class="report_int"
                                        @change="buildingId"
                                    >
                                        <el-option
                                                v-for="item in buildingOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
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
    import repApi from '../../../api/Report/Report'
    import Api from '../../../api/Intention/Intention'
    export default {
        data() {
                return {
                    regionOptions:[],//区域
                    regionValue:[], //回显数据
                    clientOptions:[], //客户列表
                    client_name:'',//客户回显名称
                    client_id:'',//客户id
                    userOptions:[],//维护人列表
                    user_name:'',//维护人名称
                    user_id:'',//维护人id
                    buildingOptions:[],//意向楼盘列表
                    building_name:'',//意向楼盘名称
                    building_id:'',//意向楼盘id
                    id:''
                };
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdupdisIntention', true);
                this.$store.commit('isUpdStatusupdisIntention', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                Api.intentionUpd(
                    this.id,
                    this.building_id,
                    this.regionValue[0],
                    this.regionValue[1],
                    this.regionValue[2]
                ).then((res)=>{
                    if(res.code === "200003"){
                        this.$message.success('修改成功');
                        this.$emit('intentionList')
                    }else {
                        this.$message.error('修改失败')
                    }
                })
            },
            createSet(){
                this.detailObj;
                this.buildingEcho();
                this.buildingList();
                this.customer();
                this.customerEcho();
                this.employees();
                this.employeesEcho()
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
                    this.regionOptions = JSON.parse(linkage)
                })
            },
            handleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0].path;
                this.regionValue[0] = pathvalue[0];
                this.regionValue[1] = pathvalue[1];
                this.regionValue[2] = pathvalue[2];
                this.buildingList();
                this.employees();
                this.customer();
                this.building_name='';
                // this.user_id='';
                // this.client_id='';
            },
            customer(){ //客户列表
                let page =1 ;
                let pagesum = 999;
                repApi.reportList(page,pagesum).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.clientOptions = JSON.parse(cityData.replace(/client_id/g, "value").replace(/client_name/g, "label"));
                })
            },
            customerEcho(){ //客户回显数据
                let page =1 ;
                let pagesum = 999;
                repApi.reportList(page,pagesum).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    let data = JSON.parse(cityData.replace(/client_id/g, "value").replace(/client_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.client_id) {
                            this.client_name = item.label;
                        }
                    })
                })
            },
            employees(){ //员工列表
                let page = 1;
                let pagesum = 999;
                repApi.getSlectList(page, pagesum,this.regionValue[0],this.regionValue[1],this.regionValue[2]).then((res) => {
                    let cityData = JSON.stringify(res.data.user_data);
                    this.userOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                })
            },
            employeesEcho(){ //员工回显数据
                let page = 1;
                let pagesum = 999;
                repApi.getSlectList(page, pagesum,this.regionValue[0],this.regionValue[1],this.regionValue[2]).then((res) => {
                    let cityData = JSON.stringify(res.data.user_data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/user_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.user_id) {
                            this.user_name = item.label;
                        }
                    })
                })
            },
            buildingList(){ //楼盘字典列表获取意向楼盘
                let page =1 ;
                let pagesum = 999;
                repApi.buildingList(page,pagesum,this.regionValue[0],this.regionValue[1],this.regionValue[2]).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.buildingOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                })
            },
            buildingEcho(){ //楼盘字典回显数据
                let page =1 ;
                let pagesum = 999;
                repApi.buildingList(page,pagesum,this.regionValue[0],this.regionValue[1],this.regionValue[2]).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    let data = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"));
                    data.map((item, index) => {
                        if (item.value == this.building_id) {
                            this.building_name = item.label;
                        }
                    })
                })
            },
            buildingId(e){ //获取楼盘id
                this.building_id=e
            },
            setData(data){
                this.building_id=data.building_id;
                this.user_id=data.user_id;
                this.client_id=data.client_id;
                this.id=data.id;
                this.regionValue=[data.province_id+'',data.city_id+'',+data.area_id+'']
            }
        },
        computed: {
            updisIntention() {
                return this.$store.state.intention.updisIntention
            },
            detailObj() {
                this.setData(this.$store.state.intention.detailObj);
                return this.$store.state.intention.detailObj
            },
        },
        mounted() {
            this.detailObj;
            this.getSelect();
            this.buildingList();
            this.buildingEcho();
            this.customer();
            this.customerEcho();
            this.employees();
            this.employeesEcho()
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
    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }
    .form{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    label{
        display: block;
        padding: 15px 0;
    }
    .report_int{
        width: 380px;
    }
</style>
