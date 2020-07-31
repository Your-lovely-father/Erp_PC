<template>
    <div class="address">
        <div class="select">
            <div class="select_box">
                <label>区域</label>
                <el-select v-model="prov" clearable placeholder="请选择省"
                           @change="update"
                           @clear="clearProve"
                >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <p v-show="isShowCity">-</p>
                <el-select v-model="city" clearable placeholder="请选择市" v-show="isShowCity" @change="updateCity"
                           @clear="clearCity"
                >
                    <el-option
                            v-for="item in cityArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <p v-show="isShowArea">-</p>
                <el-select v-model="area" clearable placeholder="请选择区" v-show="isShowArea" @change="updateArea"
                           @clear="clearArea"
                >
                    <el-option
                            v-for="item in cityArea"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
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
                province_id: '',
                city_id: '',
                area_id: '',
            }
        },
        methods: {
            getSelect() {
                Axios.getSelect().then((res) => {
                    let cityData = JSON.stringify(res.data[0].son);
                    this.options = JSON.parse(cityData.replace(/AREA_ID/g, "value").replace(/AREA_NAME/g, "label"));
                })


            },
            update(value) {
                this.province_id = value;
                this.options.forEach((item, index) => {
                    if (item.value === value) {
                        this.cityArr = item.son;
                        return
                    }
                });
                this.city = '';
                this.area = ''
            },
            updateCity(value) {
                this.city_id = value;
                this.cityArr.forEach((item, index) => {
                    if (item.value === value) {
                        this.cityArea = item.son;
                        return
                    }
                })
            },
            updateArea(value) {
                this.area_id = value
            },
            search() { //搜索
                this.$store.commit('province_id', this.province_id);
                this.$store.commit('city_id', this.city_id);
                this.$store.commit('area_id', this.area_id);
                this.$emit("storesSee")
            },
            clearProve(){
                this.province_id=''
            },
            clearCity(){
                this.city_id=''
            },
            clearArea(){
                this.area_id=''
            },


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
