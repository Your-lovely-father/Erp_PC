<template>
    <div class="reportAdd" v-show="updLook">
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
                        <div class="form_box">
                            <div class="int_box">
                                <label>带看记录</label>
                                <el-input
                                        placeholder="请输入带看记录"
                                        clearable
                                        class="report_int"
                                        v-model="guide_look_content"
                                >
                                </el-input>
                            </div>
                            <div class="int_box">
                                <label>时间</label>
                                <el-date-picker
                                        v-model="lookDate"
                                        placeholder="选择日期"
                                        class="data"
                                        value-format="yyyy-MM-dd"
                                        @change="date"
                                >
                                </el-date-picker>
                                -
                                <el-time-picker
                                        v-model="lookTime"
                                        placeholder="选择时间"
                                        class="data"
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
    import  Api from '../../../api/Look/Look'
    export default {
        data() {
            return {
                guide_look_content:'',
                lookDate:'',
                lookTime:'',
                id:'',
                dateTime:''
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdLook', true);
                this.$store.commit('isUpdStatusLook', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                if(this.lookDate !== null && this.lookTime !== null){
                    let lookDate = this.lookDate.substr(0,10);
                    this.dateTime= lookDate + ' '+ this.lookTime
                }else{
                    this.dateTime= ''
                }
                Api.lookUpd(this.id,this.dateTime,this.guide_look_content ).then((res)=>{
                    if(res.code === "200003"){
                        this.$message.success("修改成功");
                        this.$emit('lookList')
                    }else {
                        this.$message.error('修改失败');
                    }

                });
            },
            parentMsg(){
                this.detailList
            },
            date(e){
               this.lookDate=e

            },
            time(e){
                this.lookTime=e;
            },
            setData(data){
                this.guide_look_content=data.guide_look_content;
                this.lookDate=data.look_time;
                this.lookTime=data.look_time;
                this.id=data.id;
                if(typeof data.look_time == 'string'){
                    this.lookTime=data.look_time.substr(10);
                }
            }

        },
        computed: {
            updLook() {
                return this.$store.state.look.updLook
            },
            detailList(){
                this.setData(this.$store.state.look.detailList);
                return this.$store.state.look.detailList
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
