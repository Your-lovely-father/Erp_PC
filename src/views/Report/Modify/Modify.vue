<template>
    <div class="See">
        <el-dialog
                width="60%"
                :visible="isShowsUpd"
        >
            <div class="See_int">
                <div class="int_box">
                    <label>姓名</label>
                    <el-input
                            placeholder="请输入姓名"
                            v-model="name"
                            clearable
                            class="report_int"
                    >
                    </el-input>
                </div>
                <div class="int_box">
                    <label>电话</label>
                    <el-input
                            placeholder="请输入电话"
                            v-model="phone"
                            clearable
                            class="report_int">
                    </el-input>
                </div>
                <div class="int_box">
                    <label>报备时间</label>
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
                    <label>带看楼盘</label>
                    <el-input
                            placeholder="请输带看楼盘"
                            v-model="look"
                            clearable
                            class="report_int">
                    </el-input>
                </div>
                <div class="int_box">
                    <label>维护人</label>
                    <el-input
                            placeholder="请输维护人"
                            v-model="maintenance"
                            clearable
                            class="report_int">
                    </el-input>
                </div>
                <div class="int_box">
                    <label>意向楼盘</label>
                    <el-input
                            placeholder="请输意向楼盘"
                            v-model="intention"
                            clearable
                            class="report_int">
                    </el-input>
                </div>
                <div class="int_box">
                    <label>区域</label>
                    <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
                </div>
                <div class="int_box">
                    <label>门店</label>
                    <el-select v-model="stores" placeholder="请选择" class="report_int"
                    >
                        <el-option
                                v-for="item in storesOptions"
                                :key="item.stores"
                                :label="item.label"
                                :value="item.stores"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="int_box">
                    <label>备注</label>
                    <el-input
                            placeholder="请输入备注"
                            v-model="note"
                            clearable
                            class="report_int">
                    </el-input>
                </div>
                <div class="int_box">
                    <label>客户类别</label>
                    <el-select v-model="customer" placeholder="请选择" class="report_int"
                    >
                        <el-option
                                v-for="item in customerOoptions"
                                :key="item.customer"
                                :label="item.label"
                                :value="item.customer"
                        >
                        </el-option>
                    </el-select>
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
                phone: '',
                type: [],
                date: '',
                time: '',
                look: '',
                maintenance: '',
                intention: '',
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
                storesOptions: [{
                    stores: '选项1',
                    label: 'A门店'
                }, {
                    stores: '选项2',
                    label: 'B门店'
                }],
                stores: '',
                note: '',
                customerOoptions: [
                    {
                        customer: '选项1',
                        label: '客户类别A'
                    },
                    {
                        customer: '选项2',
                        label: '客户类别B'
                    },
                    {
                        customer: '选项3',
                        label: '客户类别C'
                    }
                ],
                customer: '',
                search: '',
                tableData: [
                    {
                        name: '王志远',
                        phone: '15942999924',
                        date: '2019/9/14-11:14',
                        look: '阳光100',
                        maintenance: '小周',
                        intention: '别墅',
                        area: '辽宁省沈阳市铁西区',
                        stores: 'A门店',
                        note: '这套房子我喜欢',
                        customer: 'A级客户',
                    }
                ],
                currentPage4: 4,
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
    .el-input {
        width: 214px;
    }
    label {
        display: block;
        padding: 15px 0;
    }
</style>
