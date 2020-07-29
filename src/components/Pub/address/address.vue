<template>
    <div class="address">
        <div class="select">
            <div class="select_box">
                <label>区域</label>
                <el-select v-model="prov" clearable placeholder="请选择省"
                           @change="update"
                >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                    >
                    </el-option>
                </el-select>
                <p v-show="isShowCity">-</p>
                <el-select v-model="city" clearable placeholder="请选择市" v-show="isShowCity" @change="updateCity">
                    <el-option
                            v-for="item in cityArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                    >
                    </el-option>
                </el-select>
                <p v-show="isShowArea">-</p>
                <el-select v-model="area" clearable placeholder="请选择区" v-show="isShowArea" @change="updateArea">
                    <el-option
                            v-for="item in cityArea"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                    >
                    </el-option>
                </el-select>
                <div class="search_btn">
                    <el-button type="primary" size="medium" class="btn" @click="search">搜索</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from '../../../api/pub/pub'
    export default {
        data() {
            return {
                options: [],
                cityArr: [],
                cityArea: [],
                prov: '',
                city: '',
                area: '',
                isShowCity: true,
                isShowArea: true,
                province_id:'',
                city_id:'',
                area_id:'',
            }
        },
        methods: {
            getSelect() {
                Axios.getSelect().then((res) => {
                    let cityData = JSON.stringify(res.data[0].son);
                    this.options = JSON.parse(cityData.replace(/AREA_ID/g,"value").replace(/AREA_NAME/g,"label"));
                })


            },
            update(value) {
                let obj = {};
                obj = this.options.find((item) => { // 这里的options就是上面遍历的数据源
                    return item.label === value;// 筛选出匹配数据
                });
              this.province_id=obj.value;
                this.options.forEach((item, index) => {
                    if (item.label === this.prov) {
                        this.cityArr = item.son;
                        return
                    }
                });
                this.city = '';
                this.area = '';
                // this.city = this.cityArr[0].label
            },
            updateCity(value) {
                let obj = {};
                obj = this.cityArr.find((item) => { // 这里的cityArr就是上面遍历的数据源
                    return item.label === value;// 筛选出匹配数据
                });
                this.city_id=obj.value;
                // this.isShowArea = true;
                this.cityArr.forEach((item, index) => {
                    if (item.label === this.city) {
                        this.cityArea = item.son;
                        return
                    }
                })
            },
            updateArea(value){
                let obj = {};
                obj = this.cityArea.find((item) => { // 这里的cityArea就是上面遍历的数据源
                    return item.label === value;// 筛选出匹配数据
                });
                this.area_id=obj.value;
            },
            search(){ //搜索
                this.$store.commit('province_id',this.province_id);
                this.$store.commit('city_id',this.city_id);
                this.$store.commit('area_id',this.area_id);
                this.$emit("storesSee")
            }
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>
    .address {
        width: 98.5%;
        margin-top: 20px;
        padding: 0 20px;
    }

    .select {
        width: 100%;
    }

    .select_box {
        width: 100%;
        display: flex;
        height: 40px;
        align-items: center;
    }

    p {
        padding: 0 10px;
    }

    label {
        padding: 0 20px 0 0;
    }

    .el-select {
        width: 300px;
    }

    .search_btn {
        margin-left: 20px;
    }
    .btn {
        width: 100px;
        background: linear-gradient(#28a9ea, #1981e4);
    }

</style>
