<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowsUpd"
        >
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
                <label>区域</label>
                <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
            </div>

            <div class="int_box">
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
                type: [],
                date: '',
                time: '',
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
            }
        },
        methods: {
            cancel() {
                this.$emit("update:isShowsUpd", false);
            },
            confirm() {
                this.$emit("update:isShowsUpd", false);
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

    .See_int {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .report_int{
        width: 500px;
    }
    label {
        display: block;
        padding: 15px 0;
    }
</style>
