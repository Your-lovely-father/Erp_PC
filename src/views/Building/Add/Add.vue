<template>
    <div class="reportAdd" v-show="addBuiding">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加楼盘
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>楼盘信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
                                    <label>楼盘名称</label>
                                    <el-input
                                            placeholder="请输入楼盘名称"
                                            v-model="building_name"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘别称</label>
                                    <el-input
                                            placeholder="请输入楼盘别称"
                                            v-model="building_nickname"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘缩写</label>
                                    <el-input
                                            placeholder="请输入楼盘缩写"
                                            v-model="building_abbreviation"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域管理</label>
                                    <el-cascader :options="areaOptions" clearable class="report_int"
                                                 @change="handleChange"
                                                 ref="cascaderAddr"
                                    ></el-cascader>
                                </div>
                                <div class="price_box">
                                   <div>
                                       <label>平均单价起</label>
                                       <el-input
                                               placeholder="请输入平均单价起"
                                               v-model="average_unit_price_begin"
                                               clearable
                                               class="reportInt">
                                       </el-input>
                                   </div>
                                   <span class="span1"> - </span>
                                    <div>
                                        <label>平均单价结束</label>
                                        <el-input
                                                placeholder="请输入平均单价结束"
                                                v-model="average_unit_price_end"
                                                clearable
                                                class="reportInt">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="int_box">
                                    <label>开盘时间</label>
                                    <el-date-picker
                                            v-model="openingData"
                                            type="date"
                                            placeholder="选择日期"
                                            class="date"
                                            @change="finishDate"
                                            value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="openingTime"
                                            placeholder="选择时间"
                                            class="date"
                                            @change="finishTime"
                                            value-format="HH:mm:ss"

                                    >
                                    </el-time-picker>
                                </div>
                                <div class="int_box">
                                    <label>总建筑面积</label>
                                    <el-input
                                            placeholder="请输入总建筑面积"
                                            v-model="overall_floorage"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>绿化面积</label>
                                    <el-input
                                            placeholder="请输入绿化面积"
                                            v-model="green_area"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘地址</label>
                                    <el-input
                                            placeholder="请输入楼盘地址"
                                            v-model="building_address"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                            </div>
                            <div class="upload">
                                <div class="int_box">
                                    <el-upload
                                            class="upload-demo"
                                            action="123"
                                            ref="uploadImg"
                                            :on-remove="handleRemove"
                                            :file-list="fileHousesList"
                                            list-type="picture"
                                            accept="image/jpeg,image/jpg,image/png"
                                            :http-request="uploadSectionFile"
                                            :on-preview="headHandlePictureCardPreviewHouses"
                                    >
                                        <el-button size="small" type="primary" class="btn_upload">点击上传楼盘图片</el-button>
                                    </el-upload>
                                    <el-dialog :append-to-body="true" :visible.sync="headDialogVisibleHouses">
                                        <img width="100%" :src="headDialogImageUrlHouses" alt="">
                                    </el-dialog>
                                </div>
                                <div class="int_box_upload">
                                    <el-upload
                                            class="upload-demo"
                                            action="123"
                                            ref="upload_img"
                                            :on-remove="doorModelRemove"
                                            :file-list="doorModelList"
                                            list-type="picture"
                                            accept="image/jpeg,image/jpg,image/png"
                                            :http-request="uploadModelFile"
                                            :on-preview="headHandlePictureCardPreviewModel"
                                    >
                                        <el-button size="small" type="primary" class="btn_upload">点击上传户型图片</el-button>
                                    </el-upload>
                                    <el-dialog :append-to-body="true" :visible.sync="headDialogVisibleModel">
                                        <img width="100%" :src="headDialogImageUrlModel" alt="">
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
    import  Axios from '../../../api/pub/pub'
    import  Api from '../../../api/Building/Building'
    import axios from 'axios'
    export default {
        data() {
            return {
                building_name:'',//楼盘名称
                building_nickname:'',//楼盘别称
                building_abbreviation:'',//楼盘缩写
                building_address:'',//楼盘地址
                average_unit_price_begin:'',//平均单价起
                average_unit_price_end:'',//平均单价结束
                opening_time:'',//开盘时间
                overall_floorage:'',//总建筑面积
                green_area:'',//绿化面积
                province_id:'',//省
                city_id:'',//市
                area_id:'',//区
                openingData:'',//时间
                openingTime:'',//时间
                building_image:'',//楼盘图
                building_floor:'',//户型图
                areaOptions:[],//区域管理列表
                fileHousesList: [], //楼盘图片列表
                imgageList:[],//传给后台的图片列表
                doorModelList:[], //户型图片列表
                userImage:'https://erp-report-shenyang.oss-cn-beijing.aliyuncs.com/',
                headDialogVisibleHouses:false,
                headDialogImageUrlHouses:'',
                headDialogVisibleModel:false,
                headDialogImageUrlModel:'',
            }
        },
        methods: {
            onPage() {
                this.$store.commit('showBuilding', true);
                this.$store.commit('showBuildingaStatus', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                Api.reportAdd(
                    this.building_name,
                    this.building_nickname,
                    this.building_abbreviation,
                    this.building_address,
                    this.average_unit_price_begin,
                    this.average_unit_price_end,
                    this.opening_time,
                    this.overall_floorage,
                    this.green_area,
                    this.province_id,
                    this.city_id,
                    this.area_id,
                    this.building_image,
                    this.building_floor
                ).then((res)=>{
                    if(res.code === '200001'){
                        this.$message.success('添加成功');
                        this.$emit('buildingList')
                    }else {
                        this.$message.error('添加失败')
                    }
                })
            },
            uploadSectionFile(params) {// 自定义上传方法
                let that = this;
                let file = params.file;  //获取上传的文件
                let fileType = file.type;   //获取文件类型
                let isImage = fileType.indexOf('image') != -1; // 判断是否是图片类型
                let file_url = that.$refs.uploadImg.uploadFiles[0].url;
                let isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {  // 判断大小
                    that.$message.error('上传图片的大小不能超过 2MB!');
                    that.$refs.uploadImg.uploadFiles = [];  //不符合就清空已选择的图片
                    return;
                }
                if (!isImage) {  // 文件格式
                    that.$message.error('请选择图片文件！');
                    that.$refs.uploadImg.uploadFiles = [];   //不符合就清空已选择的图片
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
                let fileType=file;
                var that = this;
                var formData = new FormData();
                formData.append('files', file);
                formData.append('type', '1');
                let Authorization = window.localStorage.getItem('access_token');
                let token = JSON.parse(Authorization);
                const instance = axios.create({
                    withCredentials: true
                });
                //上传楼盘
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
                        that.fileHousesList.push({
                            name:fileType.name,
                            url:that.userImage+res.data.data.url
                        });
                        let imgageList = [];
                        this.fileHousesList.forEach(item=>{
                            imgageList.push(item.url.substring(56))
                        });
                        this.building_image= imgageList.join(',');
                        that.$message.success('图片上传成功')
                    } else {
                        // 上传失败，清除已选择 内容 ，并提示失败原因
                        that.$refs.uploadImg.uploadFiles = [];
                        that.$message.error('图片上传异常');
                    }
                })
            },
            //文件删除
            handleRemove(file) {
                let path =file.url;
                let i =this.fileHousesList.findIndex(value => value.url === path);
                this.fileHousesList.splice(i,1);

                let imgageList = [];
                this.fileHousesList.forEach(item=>{
                    imgageList.push(item.url.substring(56))
                });
                this.building_image= imgageList.join(',');
            },
            headHandlePictureCardPreviewHouses(file) { //处理图片预览效果
                this.headDialogImageUrlHouses = file.url;
                this.headDialogVisibleHouses = true;
            },

            uploadModelFile(params){ //自定义方法
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
                        that.uploadFileModel(file);
                    }
                }
            },
            uploadFileModel(file){ //户型图上传
                let fileType=file;
                var that = this;
                var formData = new FormData();
                formData.append('files', file);
                formData.append('type', '2');
                let Authorization = window.localStorage.getItem('access_token');
                let token = JSON.parse(Authorization);
                const instance = axios.create({
                    withCredentials: true
                });
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
                        that.doorModelList.push({
                            name:fileType.name,
                            url:that.userImage+res.data.data.url
                        });
                        let imgageList=[];
                        that.doorModelList.forEach(item=>{
                            imgageList.push(item.url.substring(56))
                        });
                        that.building_floor=imgageList.join(',');
                        that.$message.success('图片上传成功')
                    } else {
                        // 上传失败，清除已选择 内容 ，并提示失败原因
                        that.$refs.upload_img.uploadFiles = [];
                        that.$message.error('图片上传异常');
                    }
                })
            },
            doorModelRemove(file){ //户型图删除
                let path =file.url;
                let i =this.doorModelList.findIndex(value => value.url === path);
                this.doorModelList.splice(i,1);
                let imgageList=[];
                this.doorModelList.forEach(item=>{
                    imgageList.push(item.url.substring(56))
                });
                this.building_floor=imgageList.join(',');
            },
            headHandlePictureCardPreviewModel(file){//处理图片预览效果
                this.headDialogImageUrlModel = file.url;
                this.headDialogVisibleModel = true;
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
            },
            finishDate(date){ //获取日期
                this.openingDate=date
            },
            finishTime(time){ //获取时间
                this.openingTime=time;
                this.opening_time= this.openingDate+' '+ this.openingTime
            },
        },
        computed: {
            addBuiding() {
                return this.$store.state.building.addBuiding
            },
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
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
        position: fixed !important;
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
    .box_form{
        width: 100%;
    }
    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .report_int {
        width: 500px;
    }
    .date{
        width: 242px;
    }
    label {
        display: block;
        padding: 20px 0;
    }
    .btn_upload{
        margin: 20px 0 10px 0;
    }
    .upload{
        width: 100%;
        display: flex;
        margin-left: 28px;
    }
    .int_box_upload{
        margin-left: 54px;
    }
    .upload-demo{
        width: 500px;
    }
    .price_box{
        width: 500px;
        display: flex;
        justify-content: space-between;
    }
    .reportInt{
        width: 242px;
    }
    .span1{
        margin-top: 68px;
    }
</style>



