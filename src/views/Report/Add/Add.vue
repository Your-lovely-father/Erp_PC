<template>
    <!--    <div class="See" >-->
    <!--        <el-dialog-->
    <!--                width="60%"-->
    <!--        :visible="isShowAdd"-->
    <!--                -->
    <!--        >-->
    <!--            &lt;!&ndash;     表单区域       &ndash;&gt;-->
    <!--            <div class="box_form">-->
    <!--                <div class="form">-->
    <!--                    <div class="int_box">-->
    <!--                        <label>姓名</label>-->
    <!--                        <el-input-->
    <!--                                placeholder="请输入姓名"-->
    <!--                                v-model="name"-->
    <!--                                clearable-->
    <!--                                class="report_int"-->
    <!--                        >-->
    <!--                        </el-input>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>电话</label>-->
    <!--                        <el-input-->
    <!--                                placeholder="请输入电话"-->
    <!--                                v-model="phone"-->
    <!--                                clearable-->
    <!--                                class="report_int">-->
    <!--                        </el-input>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>报备时间</label>-->
    <!--                        <el-date-picker-->
    <!--                                v-model="date"-->
    <!--                                type="date"-->
    <!--                                placeholder="选择日期"-->
    <!--                                class="date"-->
    <!--                        >-->
    <!--                        </el-date-picker>-->
    <!--                        - -->
    <!--                        <el-time-picker-->
    <!--                                v-model="time"-->
    <!--                                placeholder="选择时间"-->
    <!--                                class="date"-->
    <!--                        >-->
    <!--                        </el-time-picker>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>带看楼盘</label>-->
    <!--                        <el-input-->
    <!--                                placeholder="请输入带看楼盘"-->
    <!--                                v-model="look"-->
    <!--                                clearable-->
    <!--                                class="report_int">-->
    <!--                        </el-input>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>维护人</label>-->
    <!--                        <el-input-->
    <!--                                placeholder="请输入维护人"-->
    <!--                                v-model="maintenance"-->
    <!--                                clearable-->
    <!--                                class="report_int">-->
    <!--                        </el-input>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>意向楼盘</label>-->
    <!--                        <el-input-->
    <!--                                placeholder="请输入意向楼盘"-->
    <!--                                v-model="intention"-->
    <!--                                clearable-->
    <!--                                class="report_int">-->
    <!--                        </el-input>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>区域</label>-->
    <!--                        <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>门店</label>-->
    <!--                        <el-select v-model="stores" placeholder="请选择" class="report_int"-->
    <!--                        >-->
    <!--                            <el-option-->
    <!--                                    v-for="item in storesOptions"-->
    <!--                                    :key="item.stores"-->
    <!--                                    :label="item.label"-->
    <!--                                    :value="item.stores"-->
    <!--                            >-->
    <!--                            </el-option>-->
    <!--                        </el-select>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>备注</label>-->
    <!--                        <el-input-->
    <!--                                placeholder="请输入备注"-->
    <!--                                v-model="note"-->
    <!--                                clearable-->
    <!--                                class="report_int">-->
    <!--                        </el-input>-->
    <!--                    </div>-->
    <!--                    <div class="int_box">-->
    <!--                        <label>客户类别</label>-->
    <!--                        <el-select v-model="customer" placeholder="请选择" class="report_int"-->
    <!--                        >-->
    <!--                            <el-option-->
    <!--                                    v-for="item in customerOoptions"-->
    <!--                                    :key="item.customer"-->
    <!--                                    :label="item.label"-->
    <!--                                    :value="item.customer"-->
    <!--                            >-->
    <!--                            </el-option>-->
    <!--                        </el-select>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <span slot="footer" class="dialog-footer">-->
    <!--                <el-button @click="cancel">取 消</el-button>-->
    <!--                <el-button type="primary" @click="confirm">确 定</el-button>-->
    <!--           </span>-->
    <!--        </el-dialog>-->
    <!--    </div>-->
    <div class="reportAdd" v-show="addStatus">
        <div class="add_box">
            11111111111
        </div>
    </div>

</template>

<script>
    export default {
        name: "See",
        data() {
            return {
                //添加字段
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
            }
        },
        methods: {
            // cancel() {
            //     this.$emit("update:isShowAdd", false);
            // },
            // confirm() {
            //     this.$emit("update:isShowAdd", false);
            // }
        },
        computed: {
            addStatus() {
                return this.$store.state.addStatus
            }

        },
    }
</script>

<style scoped>
    .reportAdd{
        width: 100%;
        height: 100%;
        position: relative;

    }
    .add_box{
        width: 300px;
        height: 300px;
        background: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        animation: change 1s;
        -webkit-animation-fill-mode: forwards;
        overflow: hidden;
    }

    @keyframes change {
        from {
            width:300px;
            height: 300px;
        }

        to {
            width: 100%;
            height: 100%;
        }

    }

    /*.See {*/
    /*    width: 100%;*/
    /*}*/
    /*.box_form{*/
    /*    width: 100%;*/
    /*}*/
    /*.form{*/
    /*    width: 100%;*/
    /*    display: flex;*/
    /*    flex-wrap: wrap;*/
    /*    justify-content: space-around;*/
    /*}*/
    /*label {*/
    /*    display: block;*/
    /*    padding: 10px 0;*/
    /*}*/
    /*.report_int {*/
    /*    width: 458px;*/
    /*}*/
    /*.See >>> .el-dialog__header {*/
    /*    display: none !important;*/
    /*}*/
    /*.reportAdd {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    position: relative;*/
    /*}*/

    /*.add_box {*/
    /*    width: 500px;*/
    /*    height: 500px;*/
    /*    !*position: absolute;*!*/
    /*    !*top: 50%;*!*/
    /*    background: #C94E00;*/
    /*    position: absolute;*/
    /*    top: 50%;*/
    /*    left: 50%;*/
    /*    !*transform: translate(-50% ,-50%);*!*/
    /*    !*animation: change 5s;*!*/
    /*    !*animation-fill-mode:forwards;*!*/

    /*}*/



</style>
