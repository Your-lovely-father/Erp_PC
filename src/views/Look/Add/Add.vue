<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowAdd"
        >
            <!--   表单区域    -->
            <div class="form">
                <div class="form-box">
                    <div class="int_box">
                        <label>带看记录</label>
                        <el-input
                                placeholder="请输入带看记录"
                                clearable
                                v-model="look"
                                class="report_int">
                        </el-input>
                    </div>
                    <div class="int_box">
                        <label>维护人</label>
                        <el-input
                                placeholder="请输入维护人"
                                clearable
                                v-model="maintenance"
                                class="report_int">
                        </el-input>
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
                look:'',
                type:[],
                date:'',
                time:'',
                maintenance:'',
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
