<template>
    <div>
        <!--       导航区         -->
<!--        <el-menu-->
<!--                background-color="#304156"-->
<!--                text-color="#fff"-->
<!--                active-text-color="#409EFF"-->
<!--                :unique-opened="true"-->
<!--                :collapse="isCollapsed"-->
<!--                :collapse-transition="false"-->
<!--                :router="true"-->
<!--        >-->
<!--            &lt;!&ndash;                    &lt;!&ndash;        主菜单           &ndash;&gt;&ndash;&gt;-->
<!--            &lt;!&ndash;                    <el-menu-item :index="'/'+ item.path" v-for="item in list" :key="item.id">&ndash;&gt;-->
<!--            &lt;!&ndash;                        <i :class="icon[item.id]" id="icon"></i>&ndash;&gt;-->
<!--            &lt;!&ndash;                        <span class="text">{{item.name}}</span>&ndash;&gt;-->
<!--            &lt;!&ndash;                    </el-menu-item>&ndash;&gt;-->

<!--            <el-submenu :index="'/'+ item.path" v-for="item in navList" :key="item.id">-->
<!--                &lt;!&ndash;     一级菜单模板区&ndash;&gt;-->
<!--                <template slot="title">-->
<!--                    <i :class="icon[item.id]" id="icon"></i>-->
<!--                    <span class="text">{{item.name}}</span>-->
<!--                </template>-->

<!--                &lt;!&ndash;       二级菜单区域        &ndash;&gt;-->
<!--                <el-menu-item :index=" '/'+ item1.path" v-for="item1 in item.children" :key="item1.id">-->
<!--                    <template slot="title">-->
<!--                        <i :class="childrenIcon[item1.id]" id="icon"></i>-->
<!--                        <span class="text">{{item1.user}}</span>-->
<!--                    </template>-->
<!--                </el-menu-item>-->
<!--            </el-submenu>-->
<!--        </el-menu>-->
    </div>
</template>

<script>
    export default {
        name: "myTree",
        props:{
            navList:{
              type:Array,
              default(){
                  return []
              }
          }
        }
    }
</script>

<style scoped>
</style>
