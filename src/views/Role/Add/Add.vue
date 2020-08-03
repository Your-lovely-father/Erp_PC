<template>
    <div class="reportAdd" v-show="addSRole">
        <div class="add_box">
            <div class="com">
                <div class="poor">
                    <div class="poor_text">
                        添加角色
                    </div>
                    <div class="del">
                        <el-tooltip class="item" effect="dark" content="点击此处返回上一页" placement="bottom-end">
                            <span class="el-icon-close" @click="onPage"></span>
                        </el-tooltip>
                    </div>
                </div>
                <div class="addContent">
                    <div class="The_title">
                        <p>角色信息</p>
                    </div>
                    <div class="content_box">
                        <!--      表单添加区域      -->
                        <div class="form_box">
                            <div class="form">
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
                                    >
                                    </el-tree>
                                </div>
                              <div class="box">
                                  <div class="mage_box">
                                      <label>职位设置</label>
                                      <el-tree
                                              :data="managementList"
                                              show-checkbox
                                              node-key="id"
                                              default-expand-all
                                              :props="defaultProps"
                                              :check-strictly="true"
                                              :current-node-key="currentArr"
                                              @check-change="management"
                                              ref="tree1"
                                      >
                                      </el-tree>
                                  </div>
                                  <div class="group">
                                      <label>角色名称</label>
                                      <el-input
                                              placeholder="请输角色名称"
                                              clearable
                                              class="report_int"
                                              v-model="group_name"
                                      >
                                      </el-input>
                                  </div>
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
    import Api from '../../../api/Role/Role'
    import adminApi from '../../../api/Admin/Admin'
    export default {
        data() {
            return {
                managementList: [],
                permissionsList:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                props:{
                    children: 'children',
                    label: 'label'
                },
                pid:'',
                group_name:'',
                rule_ids:'',
                currentArr:''
            };
        },
        methods: {
            onPage() {
                this.$store.commit('showRole', true);
                this.$store.commit('showStatusRole', false);
            },
            cancel() {
                this.onPage()
            },
            confirm() {
                this.onPage();
                Api.releAdd(this.pid,this.group_name,this.rule_ids).then((res)=>{
                    if(res.code==="200001"){
                        this.$message.success('添加成功');
                        this.$emit('roleList');
                    }else {
                        this.$message.error('添加失败')
                    }
                })
            },
            getSelect() {
                Api.roleList().then((res) => {
                    // console.log(res)
                    const jsonData = res.data;
                    jsonData.map((item) => {
                        item.label = item.group_name;
                        item.value = item.id;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.group_name;
                                el.value = el.id;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.group_name;
                                        key.value = key.id;
                                        key.children = key.son;
                                        if (key.son) {
                                            key.son.map(area => {
                                                area.label = area.group_name;
                                                area.value = area.id;
                                                area.children = area.son;
                                                if (area.son) {
                                                    area.son.map(stores => {
                                                        stores.label = stores.group_name;
                                                        stores.value = stores.id;
                                                        stores.children = stores.son;
                                                        if (stores.son) {
                                                            stores.son.map(people => {
                                                                people.label = people.group_name;
                                                                people.value = people.id;
                                                                people.children = people.son;
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        this.managementList=jsonData
                    });
                })
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
            management(){
                let res = this.$refs.tree1.getCheckedKeys().concat(this.$refs.tree1.getHalfCheckedKeys());
                let value =res.join(',');
                this.pid=value
            },
            permissions(){
                let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
                let value =res.join(',');
                this.rule_ids=value
            },

        },
        computed: {
            addSRole() {
                return this.$store.state.role.addSRole
            },
        },
        mounted() {
            this.getSelect();
            this.getAdminSelect()
        }
    }
</script>

<style scoped>
    .reportAdd {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .com {
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
        width: 98.2%;
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

    .form_box {
        width: 100%;
    }

    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .report_int {
        width: 300px;
    }

    label {
        display: block;
        padding: 20px 0;
    }
    .permi_box>>>.el-tree-node__children{
        display: flex;
    }
    .permi_box{
        width: 100%;
    }
    .box{
        width: 741px;
        display: flex;
        justify-content: space-between;
    }
</style>
