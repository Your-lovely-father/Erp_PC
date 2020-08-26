<template>
    <div class="reportAdd" v-show="seeBuiding">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看楼盘
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
                        <p>查看楼盘</p>
                    </div>
                    <div class="content_box">
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
                                    <label>楼盘名称</label>
                                    <el-input
                                            placeholder="请输入楼盘名称"
                                            v-model="building_name"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘别称</label>
                                    <el-input
                                            placeholder="请输入楼盘别称"
                                            v-model="building_nickname"
                                            :disabled="true"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘缩写</label>
                                    <el-input
                                            placeholder="请输入楼盘缩写"
                                            v-model="building_abbreviation"
                                            :disabled="true"
                                            clearable
                                            class="report_int">
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域管理</label>
                                    <el-cascader :disabled="true" v-model="areaValue" :options="areaOptions" clearable
                                                 class="report_int"
                                    ></el-cascader>
                                </div>
                                <div class="price_box">
                                    <div>
                                        <label>平均单价起</label>
                                        <el-input
                                                placeholder="请输入平均单价起"
                                                v-model="average_unit_price_begin"
                                                :disabled="true"
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
                                                :disabled="true"
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
                                            value-format="yyyy-MM-dd"
                                            :disabled="true"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="openingTime"
                                            placeholder="选择时间"
                                            class="date"
                                            value-format="HH:mm:ss"
                                            :disabled="true"
                                    >
                                    </el-time-picker>
                                </div>
                                <div class="int_box">
                                    <label>总建筑面积</label>
                                    <el-input
                                            placeholder="请输入总建筑面积"
                                            v-model="overall_floorage"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>绿化面积</label>
                                    <el-input
                                            placeholder="请输入绿化面积"
                                            v-model="green_area"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘地址</label>
                                    <el-input
                                            placeholder="请输入楼盘地址"
                                            v-model="building_address"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="upload">
                                <div class="int_box">
                                    <el-upload
                                            class="upload-demo"
                                            action="123"
                                            :file-list="fileHousesList"
                                            list-type="picture"
                                            :on-preview="headHandlePictureCardPreviewHouses"
                                    >
                                        <el-button size="small" type="primary" class="btn_upload" :disabled="true">
                                            点击上传楼盘图片
                                        </el-button>
                                    </el-upload>
                                    <el-dialog :append-to-body="true" :visible.sync="headDialogVisibleHouses">
                                        <img width="100%" :src="headDialogImageUrlHouses" alt="">
                                    </el-dialog>
                                </div>
                                <div class="int_box_upload">
                                    <el-upload
                                            class="upload-demo"
                                            action="123"
                                            :file-list="doorModelList"
                                            list-type="picture"
                                            :on-preview="headHandlePictureCardPreviewModel"
                                    >
                                        <el-button size="small" type="primary" class="btn_upload" :disabled="true">
                                            点击上传户型图片
                                        </el-button>
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
    import Axios from '../../../api/pub/pub'

    export default {
        name: "See",
        data() {
            return {
                building_name: '',//楼盘名称
                building_nickname: '',//楼盘别称
                building_abbreviation: '',//楼盘缩写
                building_address: '',//楼盘地址
                average_unit_price_begin: '',//平均单价起
                average_unit_price_end: '',//平均单价结束
                opening_time: '',//开盘时间
                overall_floorage: '',//总建筑面积
                green_area: '',//绿化面积
                openingData: '',//时间
                openingTime: '',//时间
                building_image: '',//楼盘图
                building_floor: '',//户型图
                areaOptions: [],//区域管理列表
                fileHousesList: [], //楼盘图片列表
                doorModelList: [], //户型图片列表
                areaValue: [],//省市区回显数据
                headDialogVisibleHouses: false,
                headDialogImageUrlHouses: '',
                headDialogVisibleModel: false,
                headDialogImageUrlModel: '',
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isBuilding', true);
                this.$store.commit('isSeeBuilding', false);
                this.fileHousesList=[];
                this.doorModelList=[];
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
            parentMsg() {
                this.detailObj;
            },
            setData(data) {
                if (data.data) {
                    this.building_name = data.data.building_name,
                        this.building_nickname = data.data.building_nickname,
                        this.building_abbreviation = data.data.building_abbreviation,
                        this.building_address = data.data.building_address,
                        this.average_unit_price_begin = data.data.average_unit_price_begin,
                        this.average_unit_price_end = data.data.average_unit_price_end,
                        this.opening_time = data.data.opening_time,
                        this.overall_floorage = data.data.overall_floorage,
                        this.green_area = data.data.green_area,
                        this.openingData = data.data.opening_time,
                        this.openingTime = data.data.opening_time,
                        this.areaValue = [data.data.province_id + '', data.data.city_id + '', data.data.area_id + '']

                }
                if (data.building_img instanceof Array) {
                    this.fileHousesList = data.building_img.map((item) => {
                            return {
                                ...item,
                                name: item.url,
                                url: this.$Tool.formatImg(item.url),
                            };
                    });
                }
                if (data.building_img instanceof Array) {
                    this.doorModelList = data.floor_img.map((item) => {
                        return {
                            ...item,
                            name: item.url,
                            url: this.$Tool.formatImg(item.url),
                        };
                    });
                }
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
            headHandlePictureCardPreviewHouses(file) { //处理图片预览效果
                this.headDialogImageUrlHouses = file.url;
                this.headDialogVisibleHouses = true;
            },
            headHandlePictureCardPreviewModel(file) {//处理图片预览效果
                this.headDialogImageUrlModel = file.url;
                this.headDialogVisibleModel = true;
            },
        },
        computed: {
            seeBuiding() {
                return this.$store.state.building.seeBuiding
            },
            detailObj() {
                this.setData(this.$store.state.building.detailObj);
                return this.$store.state.building.detailObj
            }
        },
        mounted() {
            this.detailObj;
            this.getSelect();
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
        width: 500px;
    }

    .date {
        width: 242px;
    }

    label {
        display: block;
        padding: 20px 0;
    }

    .btn_upload {
        margin: 20px 0 10px 0;
    }

    .upload {
        width: 100%;
        display: flex;
        margin-left: 31px;
    }

    .int_box_upload {
        margin-left: 63px;
    }

    .upload-demo {
        width: 500px;
    }

    .price_box {
        width: 500px;
        display: flex;
        justify-content: space-between;
    }

    .reportInt {
        width: 242px;
    }

    .span1 {
        margin-top: 68px;
    }

    .int_box >>> .el-icon-close {
        display: none;
    }

    .int_box_upload >>> .el-icon-close {
        display: none;
    }
</style>
