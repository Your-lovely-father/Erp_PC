<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShow"
        >
            <div class="See_int">
                <div class="int_box_right">
                    <label>时间</label>
                    <el-date-picker
                            v-model="date"
                            type="date"
                            placeholder="选择日期"
                            class="report_int"
                            :disabled="true"
                    >
                    </el-date-picker>
                    -
                    <el-time-picker
                            v-model="time"
                            placeholder="选择时间"
                            class="report_int"
                            :disabled="true"
                    >
                    </el-time-picker>
                </div>
                <div class="int left">
                    <label>跟进记录</label>
                    <el-input
                            :disabled="true">
                    </el-input>
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
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                type: [],
                date: '',
                time: '',
            };
        },
        methods: {
            cancel() {
                this.$emit("update:isShow", false);
            },
            confirm() {
                this.$emit("update:isShow", false);
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
    }

    .el-input {
        width: 500px;
    }

    label {
        display: block;
        padding: 15px 0;
    }
</style>
