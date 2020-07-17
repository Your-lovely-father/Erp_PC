<template>
    <div class="reportAdd" v-show="seeAdmin">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        查看权限
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
                        <p>查看权限</p>
                    </div>
                    <div class="content_box">
                        <div class="See_int">
                            <div class="form">
                                <div class="int_box">
                                    <label>角色</label>
                                    <el-input
                                            placeholder="请输角色"
                                            v-model="name"
                                            clearable
                                            class="report_int"
                                            :disabled="true"
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box_right">
                                    <label>权限管理</label>
                                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"
                                             default-expand-all></el-tree>
                                </div>
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
                name: '',
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
            onPage() {
                this.$store.commit('isAdmin', true);
                this.$store.commit('isSeeAdmin', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage()
            },
            handleNodeClick(data) {
                console.log(data);
            }
        },
        computed: {
            seeAdmin() {
                return this.$store.state.admin.seeAdmin
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

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }

    label {
        display: block;
        padding: 20px 0;
    }

    .com {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .See_int {
        width: 100%;
    }

    .form {
        width: 400px;
        margin-left: 30px;
    }

    .report_int {
        width: 400px;
    }
</style>
