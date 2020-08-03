<template>
    <div class="reportAdd" v-show="updTracking">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改带看
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
                        <p>修改带看</p>
                    </div>
                    <div class="content_box">
                        <div class="form_box">
                            <div class="int_box">
                                <label>跟进记录</label>
                                <el-input
                                        placeholder="请输入跟进记录"
                                        clearable
                                        class="report_int"
                                        v-model="record_content"
                                >
                                </el-input>
                            </div>
                            <div class="int_box">
                                <label>时间</label>
                                <el-date-picker
                                        v-model="followDate"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        @change="date"
                                >
                                </el-date-picker>
                                -
                                <el-time-picker
                                        v-model="followTime"
                                        placeholder="选择时间"
                                        value-format="HH:mm:ss"
                                        @change="time"
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
    import  Api from '../../../api/Tracking/Tracking'
    export default {
        data() {
            return {
               record_content:'',
               followDate:'',
               followTime:'',
               id:'',
               dateTime:'',
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdTracking', true);
                this.$store.commit('isUpdStatusTracking', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                if(this.followDate !== null && this.followTime !== null){
                    let lookDate = this.followDate.substr(0,10);
                    this.dateTime= lookDate + ' '+ this.followTime
                }else{
                    this.dateTime= ''
                }
                Api.trackingUpd(this.id,this.record_content,this.dateTime).then((res)=>{
                    if(res.code === "200003"){
                        this.$message.success("修改成功");
                        this.$emit('trackingList')
                    }else {
                        this.$message.error('修改失败')
                    }

                });
            },
            parentMsg(){
                this.detailList
            },
            date(e){
                this.followDate=e

            },
            time(e){
                this.followTime=e;
            },
            setData(data){
                this.record_content=data.record_content;
                this.followDate=data.follow_time;
                this.followTime=data.follow_time;
                this.id=data.id;
                if(typeof data.follow_time == 'string'){
                    this.followTime=data.follow_time.substr(10);
                }
            }
        },
        computed: {
            updTracking() {
                return this.$store.state.tracking.updTracking
            },
            detailList(){
                this.setData(this.$store.state.tracking.detailList);
                return this.$store.state.tracking.detailList
            }
        },
        mounted() {
            this.detailList
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
    .form_box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .report_int{
        width: 300px;
        margin-right: 20px;
    }
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
