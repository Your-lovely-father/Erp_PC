<template>
    <div class="reportAdd" v-show="addAdmin">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加权限
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>权限信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                    <div class="form_box">
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
                            <label>时间</label>
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
                    </div>
                    </div>
                    <div class="footer">
                        <el-button size="medium" @click="cancel()">取消</el-button>
                        <el-button type="primary" size="medium" @click="confirm()">确认</el-button>
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
            onPage() {
                this.$store.commit('showAdmin', true);
                this.$store.commit('showStatusAdmin', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
        },
        computed: {
            addAdmin() {
                return this.$store.state.admin.addAdmin
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
    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
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
        width: 98.3%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed !important;
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
    .form_box{
        width: 400px;
        margin-left: 30px;
    }
    .report_int {
        width: 400px;
    }
    label {
        display: block;
        padding: 20px 0;
    }
    .date{
        width: 192px;
    }
</style>
