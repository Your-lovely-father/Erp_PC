<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShow"
        >
            <div class="See_int">
                <div class="form">
                    <div class="int_box">
                        <label>角色名称</label>
                        <el-input
                                placeholder="请输角色名称"
                                v-model="name"
                                clearable
                                class="report_int"
                                :disabled="true"
                        >
                        </el-input>
                    </div>
                    <div class="int_box_right">
                        <label>权限管理</label>
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                name:'',
                data: [{
                    label: '超级管理员',
                    children: [
                        {
                            label: '客户报备',
                        },
                        {
                            label: '楼盘管理',
                        }
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            cancel() {
                this.$emit("update:isShow", false);
            },
            confirm() {
                this.$emit("update:isShow", false);
            },
            handleNodeClick(data) {
                console.log(data);
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
