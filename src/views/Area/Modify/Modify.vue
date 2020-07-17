<template>
    <div class="reportAdd" v-show="updArea">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改区域
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
                        <p>修改区域</p>
                    </div>
                    <div class="content_box">
                     <div class="form_box">
                         <div class="int_box">
                             <label>区域</label>
                             <el-cascader :options="areaOptions" clearable class="report_int"></el-cascader>
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
                type: [],
                date: '',
                time: '',
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
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdArea', true);
                this.$store.commit('isUpdStatusArea', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
        },
        computed: {
            updArea() {
                return this.$store.state.area.updArea
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
        width: 98.3%;
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
    .form_box{
        width: 100%;
        display: flex;
    }
    .report_int{
        width: 300px;
        margin-right: 20px;
    }
    label {
        display: block;
        padding: 20px 0;
    }
</style>
