<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShow"
        >
           <div class="See_int">
                <div class="int">
                    <label>操作人</label>
                    <el-input
                            :disabled="true">
                    </el-input>
                </div>
               <div class="int">
                   <label>操作时间</label>
                   <el-input
                           :disabled="true">
                   </el-input>
               </div>
               <div class="int">
                   <label>操作内容</label>
                   <el-input
                           :disabled="true">
                   </el-input>
               </div>
               <div class="int">
                   <label>区域管理</label>
                   <el-input
                           :disabled="true">
                   </el-input>
               </div>
           </div>
            <div class="int left">
                <label>门店管理</label>
                <el-input
                        :disabled="true">
                </el-input>
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
        justify-content: space-around;
    }
    .el-input{
        width: 380px;
    }
    label{
        display: block;
        padding: 15px 0;
    }
    .left{
        margin-left: 86px;
    }
</style>
