<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowAdd"
        >
            <!--    表单区域        -->
            <div class="form_box">
                <div class="form">
                    <div class="int_box">
                        <label>门店名称</label>
                        <el-input
                                placeholder="请输入门店名称"
                                v-model="stores"
                                clearable
                                class="report_int"
                        >
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>负责区域</label>
                        <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
                    </div>
                    <div class="int_box_right">
                        <label>时间</label>
                        <el-date-picker
                                v-model="date"
                                type="date"
                                placeholder="选择日期"
                                class="report_int"
                        >
                        </el-date-picker>
                        -
                        <el-time-picker
                                v-model="time"
                                placeholder="选择时间"
                                class="report_int"
                        >
                        </el-time-picker>
                    </div>
                </div>
                <div class="sub_btn">
                    <el-button type="primary">提交信息</el-button>
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
                stores:'',
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
                type: [],
                date: '',
                time: '',
            }
        },
        methods: {
            cancel() {
                this.$emit("update:isShowAdd", false);
            },
            confirm() {
                this.$emit("update:isShowAdd", false);
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

    .report_int {
        width: 500px;
    }

    label {
        display: block;
        padding: 15px 0;
    }
</style>
