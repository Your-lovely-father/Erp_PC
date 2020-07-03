<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShow"
        >
            <div class="See_int">
                <div class="int">
                    <label>姓名</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
                <div class="int">
                    <label>电话</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
                <div class="int">
                    <label>时间</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
                <div class="int">
                    <label>带看楼盘</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
                <div class="int">
                    <label>维护人</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
                <div class="int">
                    <label>意向楼盘</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
                <div class="int">
                    <label>备注</label>
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
            return {};
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
    .See>>>.el-dialog__header{
        display: none !important;
    }
    .See_int{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .el-input{
        width: 300px;
    }
    label{
        display: block;
        padding: 15px 0;
    }
</style>
