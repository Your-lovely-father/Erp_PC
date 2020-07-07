<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowAdd"
        >

            <div class="int_box">
                <label>角色</label>
                <el-input
                        placeholder="请输角色"
                        v-model="name"
                        clearable
                        class="report_int"
                >
                </el-input>
            </div>

            <div class="int_box">
                <label>权限设置</label>
                <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        :props="defaultProps"
                        default-expand-all
                >
                </el-tree>
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
            isShowAdd: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                type: [],
                date: '',
                time: '',
                name: '',
                data: [{
                    id: 1,
                    label: '权限设置',
                    children: [{
                        id: 4,
                        label: '权限管理',
                        children: [
                            {
                                id: 9,
                                label: '权限删除'
                            },
                            {
                                id: 10,
                                label: '权限修改'
                            },
                            {
                                id: 11,
                                label: '权限查询'
                            },
                            {
                                id: 12,
                                label: '权限添加'
                            },
                        ]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
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
