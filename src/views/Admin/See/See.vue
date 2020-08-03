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
                        <div class="form_box">
                            <div class="permi_box">
                                <label>权限选择</label>
                                <el-tree
                                        :data="permissionsList"
                                        show-checkbox
                                        node-key="id"
                                        :props="props"
                                        @check-change="permissions"
                                        default-expand-all
                                        ref="tree"
                                        :check-strictly="true"
                                        :default-checked-keys="rule"
                                >
                                </el-tree>
                            </div>
                            <div class="form-inline">
                                <div class="int_box">
                                    <label>权限名称</label>
                                    <el-input
                                            placeholder="请输权限名称"
                                            v-model="rule_name"
                                            clearable
                                            class="report_int"
                                            disabled
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>权限路径</label>
                                    <el-input
                                            placeholder="请输入权限路径"
                                            v-model="rule_url"
                                            clearable
                                            class="report_int"
                                            disabled
                                    >
                                    </el-input>
                                </div>
                                <div class="int_box">
                                    <label>权重</label>
                                    <el-input
                                            placeholder="请输入权重1-10000"
                                            v-model="weight"
                                            clearable
                                            class="report_int"
                                            disabled
                                    >
                                    </el-input>
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
    import Api from '../../../api/Admin/Admin'
    export default {
        data() {
            return {
                permissionsList:[],
                pid:'',
                rule_name:'',
                rule_url:'',
                weight:'',
                props: {
                    children: 'children',
                    label: 'label'
                },
                rule:[]
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
            getAdminSelect(){
                Api.adminList().then((res)=>{
                    const data = res.data;
                    data.map(item=>{
                        item.label = item.rule_name;
                        item.value = item.id;
                        item.children = item.son;
                        item.disabled=true;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.rule_name;
                                el.value = el.id;
                                el.children = el.son;
                                el.disabled=true;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.rule_name;
                                        key.value = key.id;
                                        key.children = key.son;
                                        key.disabled=true;
                                    })
                                }
                            })
                        }
                    });
                    this.permissionsList=data
                })
            },
            permissions(){
                let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
                let value =res.join(',');
                this.pid=value
            },
            setAdmin(){
                this.detailObj
            },
            setData(data){
                this.rule_name=data.rule_name;
                this.rule_url=data.rule_url;
                this.weight=data.weight;
                let role =data.pid+'';
                if(typeof(role) == 'string'){
                    this.rule=role.split(',');
                }
            }
        },
        computed: {
            seeAdmin() {
                return this.$store.state.admin.seeAdmin
            },
            detailObj() {
                this.setData(this.$store.state.admin.detailObj);
                return this.$store.state.admin.detailObj;
            },
        },
        mounted() {
            this.getAdminSelect();
            this.detailObj
        }
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

    .permi_box>>>.el-tree-node__children{
        display: flex;
    }
    .form-inline{
        width: 84%;
        display: flex;
        justify-content: space-between;
    }
    .report_int {
        width: 400px;
    }
    .form_box{
        padding-left: 20px;
    }
</style>
