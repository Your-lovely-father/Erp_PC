<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowAdd"
        >
            <!--     表单区域       -->
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
                                class="report_int">
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
                                class="report_int">
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
                                class="report_int">
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
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>绿化面积</label>
                        <el-input
                                placeholder="请输入绿化面积"
                                v-model="greening"
                                clearable
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>区域管理</label>
                        <el-input
                                placeholder="请输入区域管理"
                                v-model="management"
                                clearable
                                class="report_int">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "See",
        props: {
            isShowAdd: {
                type: Boolean,
                default: false
            }
        },
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
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        methods: {
            cancel() {
                this.$emit("update:isShowAdd", false);
            },
            confirm() {
                this.$emit("update:isShowAdd", false);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style scoped>
    .See {
        width: 100%;
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
    label {
        display: block;
        padding: 10px 0;
    }
    .report_int {
        width: 458px;
    }
    .See >>> .el-dialog__header {
        display: none !important;
    }
    .upload{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .int_box{
        width: 458px;
    }

</style>
