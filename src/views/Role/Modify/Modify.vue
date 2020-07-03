<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowsUpd"
        >

            <div class="int_box">
                <label>角色名称</label>
                <el-input
                        placeholder="请输角色名称"
                        v-model="name"
                        clearable
                        class="report_int"
                >
                </el-input>
            </div>

            <div class="int_box">
                <label>权限设置</label>
                <el-select v-model="value" placeholder="请选择" class=" report_int">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
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
                name:'',
                options: [{
                    value: '选项1',
                    label: '报备管理'
                }, {
                    value: '选项2',
                    label: '楼盘管理'
                }, {
                    value: '选项3',
                    label: '区域管理'
                }, {
                    value: '选项4',
                    label: '门店管理'
                }, {
                    value: '选项5',
                    label: '日志管理'
                }],
                value: ''
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
