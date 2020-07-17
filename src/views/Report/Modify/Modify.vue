<template>
    <div class="reportAdd" v-show="updStatus">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改报备
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页"
                                    placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>修改报备</p>
                    </div>
                    <div class="content_box">
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
                    </div>
                    <div class="footer">
                        <el-button @click="cancel" size="medium">取消</el-button>
                        <el-button type="primary" @click="confirm" size="medium">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
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
            onPage() {
                this.$store.commit('isUpd', true);
                this.$store.commit('isUpdStatus', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
        },
        computed: {
            updStatus() {
                return this.$store.state.report.updStatus
            },
        },
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .add_box {
        width: 300px;
        height: 300px;
        background: #f0f2f5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: change 1s;
        -webkit-animation-fill-mode: forwards;
        overflow: hidden;
    }

    @keyframes change {
        from {
            width: 300px;
            height: 300px;
        }

        to {
            width: 100%;
            height: 100%;
        }

    }

    .poor {
        width: 98.2%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 99;
    }

    .el-icon-close {
        color: #333;
        font-weight: bold;
        font-size: 18px;
    }

    .addContent {
        width: 98.3%;
        margin: 15px;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 55px;
    }

    .The_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px #eee solid;
        padding-left: 15px;
    }

    .content_box {
        width: 98.3%;
        padding: 15px;
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }

    label {
        display: block;
        padding: 15px 0;
    }
    .report_int{
        width: 600px;
    }
    .content_box{
        width: 100%;
    }
    .date{
        width: 295px;
    }
    .See_int{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
