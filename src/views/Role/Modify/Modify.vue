<template>
    <div class="reportAdd" v-show="updRole">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        修改角色
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
                        <p>修改角色</p>
                    </div>
                    <div class="content_box">
                        <div class="form_box">
                            <div class="permi_box">
                                <label>权限设置</label>
                                <el-tree
                                        :data="permissionsList"
                                        show-checkbox
                                        node-key="id"
                                        :props="defaultProps"
                                        @check-change="permissions"
                                        default-expand-all
                                        ref="tree"
                                        :check-strictly="true"
                                        :default-checked-keys="rule"
                                >
                                </el-tree>
                            </div>
                            <div class="int_box">
                                <label>角色名称</label>
                                <el-input
                                        placeholder="请输角色名称"
                                        v-model="group_name"
                                        clearable
                                        class="report_int"
                                >
                                </el-input>
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
    import adminApi from '../../../api/Admin/Admin'
    import Api from '../../../api/Role/Role'
    export default {
        data() {
            return {
                group_name:'',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                permissionsList:[],
                rule:[],
                id:'',
                rule_ids:'',
                pid:''
            }
        },
        methods: {
            onPage() {
                this.$store.commit('isUpdRole', true);
                this.$store.commit('isUpdStatusRole', false);
                this.permissionsList = [];
                this.rule=[];
                this.getAdminSelect();
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                let rule_ids='';
                if(this.rule_ids === ''){
                    rule_ids=this.rule.join(',')
                }else {
                    rule_ids=this.rule_ids
                }
                Api.releUpd(this.id,this.pid,this.group_name,rule_ids).then((res)=>{
                    if(res.code === '200003'){
                        this.$message.success('修改成功');
                        this.$emit('roleList')
                    }else {
                        this.$message.error('修改失败')
                    }
                });
                this.onPage();
            },
            getRple(){
                this.detailObj;
            },
            setData(data){
                this.group_name=data.group_name;
                this.id=data.id;
                this.pid=data.pid;
                if(data.rule instanceof Array ){
                    let arrInfo = [];
                    function setrule(arr) { //递归
                        arr.forEach(item=>{
                            arrInfo.push(item.id);
                            if(item.son){
                                if(item.son !== ''){
                                    setrule(item.son)
                                }
                            }
                        })
                    }
                    setrule(data.rule);
                    this.rule=arrInfo;
                }
            },
            getAdminSelect(){
                adminApi.adminList().then((res)=>{
                    const data = res.data;
                    data.map(item=>{
                        item.label = item.rule_name;
                        item.value = item.id;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.rule_name;
                                el.value = el.id;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.rule_name;
                                        key.value = key.id;
                                        key.children = key.son;
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
                this.rule_ids=value;
                this.rule=[]
            },
        },
        computed: {
            updRole() {
                return this.$store.state.role.updRole
            },
            detailObj(){
                this.setData(this.$store.state.role.detailObj);
                return this.$store.state.role.detailObj
            }
        },
        mounted() {
            this.detailObj;
            this.getAdminSelect();
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

    .com{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .form_box{
        width: 100%;
    }
    .report_int{
        width: 400px;
    }
    label{
        padding: 20px 0;
        display: block;
    }
    .permi_box>>>.el-tree-node__children{
        display: flex;
    }

</style>
