<template>
    <div>
        <div class="search">
            <div class="search_box">
                <span>门店</span>
                <el-select v-model="searchStores" placeholder="请选择" class="report_int"
                >
                    <el-option
                            v-for="item in searchStoresOptions"
                            :key="item.searchStores"
                            :label="item.label"
                            :value="item.searchStores"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="search_box">
                <span>时间</span>
                <el-date-picker
                        v-model="searchDate"
                        type="date"
                        placeholder="选择日期"
                        class="date"
                        prefix-icon="el-icon-search"
                >
                </el-date-picker>
                -
                <el-time-picker
                        v-model="searchTime"
                        placeholder="选择时间"
                        class="date"
                        prefix-icon="el-icon-search"
                >
                </el-time-picker>
            </div>
            <div class="search_box">
                <span>区域</span>
                <el-cascader :options="searchAreaOptions" clearable class="search_int"></el-cascader>
            </div>
            <div class="search_box">
                <span>维护人</span>
                <el-input
                        placeholder="请输入维护人"
                        v-model="searchMaintenance"
                        clearable
                        prefix-icon="el-icon-search"
                >
                </el-input>
            </div>
            <div class="search_btn">
                <el-button type="primary" size="medium" class="btn">搜索</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "share",
        data(){
            return{
                type: [],
                searchDate: '',
                searchTime: '',
                searchMaintenance:'',
                searchStoresOptions: [{
                    searchStores: '选项1',
                    label: 'A门店'
                }, {
                    searchStores: '选项2',
                    label: 'B门店'
                }],
                searchStores: '',
                searchAreaOptions: [{
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
        padding: 0 20px;
    }
    .search_box>span{
        padding-right: 20px;
    }
    .search_box{
        margin-right: 20px;
    }
    .el-input{
        width: 269px;
    }
    .btn {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
    }
</style>
