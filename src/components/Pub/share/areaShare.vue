<template>
    <div>
        <div class="search">
            <div class="search_box">
                <span>区域</span>
                <el-cascader :options="searchOptions" clearable class="search_int"></el-cascader>
            </div>
            <div class="search_btn">
                <el-button type="primary" size="medium">搜索</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "areaShare",
        data(){
            return{
                searchOptions: [{
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
        }
    }
</script>

<style scoped>
    .search{
        width: 100%;
        display: flex;
        margin: 20px 0;
    }
    .search_box>span{
        padding-right: 20px;
    }
    .search_btn{
        margin-left: 20px;
    }
</style>
