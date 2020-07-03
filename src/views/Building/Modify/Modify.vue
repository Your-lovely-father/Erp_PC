<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowsUpd"
        >
            <div class="See_int">
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
                            <el-cascader :options="areaOptions" clearable class="report_int" ></el-cascader>
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
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="buildingHandlePictureCardPreview"
                                    :on-remove="buildingHandleRemove"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="buildingDialogVisible">
                                <img width="100%" :src="buildingDialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="int_box">
                            <label>户型图片</label>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="modelHandlePictureCardPreview"
                                    :on-remove="modelHandleRemove"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="modelDialogVisible">
                                <img width="100%" :src="modelDialogImageUrl" alt="">
                            </el-dialog>
                        </div>
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
            isShowsUpd: {
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
                buildingDialogImageUrl: '',
                buildingDialogVisible: false,
                modelDialogImageUrl: '',
                modelDialogVisible: false,
            }
        },
        methods: {
            cancel() {
                this.$emit("update:isShowsUpd", false);
            },
            confirm() {
                this.$emit("update:isShowsUpd", false);
            },
            buildingHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            buildingHandlePictureCardPreview(file) {
                this.buildingDialogImageUrl = file.url;
                this.buildingDialogVisible = true;
            },
            modelHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            modelHandlePictureCardPreview(file) {
                this.modelDialogImageUrl = file.url;
                this.modelDialogVisible = true;
            }
        }
    }
</script>

<style scoped>
    .See {
        width: 100%;

    }

    .See >>> .el-dialog__header {
        display: none !important;
    }

    .form{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .report_int {
        width: 500px;
    }
    .date {
        width: 242px;
    }
    .upload{
        display: flex;
        width: 500px;
        justify-content: space-between;
    }
    label {
        display: block;
        padding: 15px 0;
    }
</style>
