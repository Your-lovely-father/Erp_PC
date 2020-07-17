<template>
    <div class="reportAdd" v-show="updBuiding">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改楼盘
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
                        <p>修改楼盘</p>
                    </div>
                    <div class="content_box">
                        <div class="box_form">
                            <div class="form">
                                <div class="int_box">
                                    <label>楼盘名称</label>
                                    <el-input
                                            placeholder="请输入楼盘名称"
                                            v-model="name"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘别称</label>
                                    <el-input
                                            placeholder="请输入楼盘别称"
                                            v-model="nickname"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>时间</label>
                                    <el-date-picker
                                            v-model="date"
                                            type="date"
                                            placeholder="选择日期"
                                            class="date"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="time"
                                            placeholder="选择时间"
                                            class="date"
                                    >
                                    </el-time-picker>
                                </div>
                                <div class="int_box">
                                    <label>楼盘缩写</label>
                                    <el-input
                                            placeholder="请输入楼盘缩写"
                                            v-model="abbreviations"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>楼盘地址</label>
                                    <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
                                </div>
                                <div class="int_box">
                                    <label>平均单价</label>
                                    <el-input
                                            placeholder="请输入平均单价"
                                            v-model="price"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>开盘时间</label>
                                    <el-date-picker
                                            v-model="openDate"
                                            type="date"
                                            placeholder="选择日期"
                                            class="date"
                                    >
                                    </el-date-picker>
                                    -
                                    <el-time-picker
                                            v-model="openTime"
                                            placeholder="选择时间"
                                            class="date"
                                    >
                                    </el-time-picker>
                                </div>
                                <div class="int_box">
                                    <label>总建筑面积</label>
                                    <el-input
                                            placeholder="请输入总建筑面积"
                                            v-model="area"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>绿化面积</label>
                                    <el-input
                                            placeholder="请输入绿化面积"
                                            v-model="greening"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>区域管理</label>
                                    <el-input
                                            placeholder="请输入区域管理"
                                            v-model="management"
                                            clearable
                                            class="report_int"
                                    >
                                    </el-input>
                                </div>
                            </div>
                            <div class="upload">
                                <div class="int_box">
                                    <label>楼盘图片</label>
                                    <el-upload
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList"
                                            list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </div>
                                <div class="int_box">
                                    <label>户型图片</label>
                                    <el-upload
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList"
                                            list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
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
    export default {
        data() {
            return {
                name: '',
                nickname: '',
                type: [],
                date: '',
                time: '',
                abbreviations: '',
                areaOptions: [{
                    value: 'province',
                    label: '辽宁省',
                    children: [{
                        value: ' city',
                        label: '沈阳市',
                        children: [{
                            value: 'area',
                            label: '铁西区'
                        }],
                    }],
                }],
                price: '',
                type: [],
                openDate: '',
                openTime: '',
                area:'',
                greening:'',
                management:'',
                customer: '',
                buildingDialogImageUrl: '',
                buildingDialogVisible: false,
                modelDialogImageUrl: '',
                modelDialogVisible: false,
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]
            }
        },

        methods: {
            onPage() {
                this.$store.commit('isBuildingUpd', true);
                this.$store.commit('isBuildingUpdStatus', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        },
        computed: {
            updBuiding() {
                return this.$store.state.building.updBuiding
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
        width: 98.3%;
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

    label {
        display: block;
        padding: 15px 0;
    }

    .report_int {
        width: 600px;
    }

    .content_box {
        width: 100%;
    }

    .date {
        width: 295px;
    }

    .box_form{
        width: 100%;
    }
    .form{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .report_int{
        width: 610px;
    }
    .date{
        width: 299px;
    }
    .upload{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .upload-demo{
        width: 610px;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
