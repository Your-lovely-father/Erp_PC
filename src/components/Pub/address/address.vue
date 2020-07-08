<template>
    <div class="address">
        <div class="select">
            <div class="select_box">
                <label>区域</label>
                <el-select v-model="prov" clearable placeholder="请选择省" @change="update">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :value="item.label"
                            :label="item.label"
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
                <el-select v-model="area" clearable placeholder="请选择区" v-show="isShowArea">
                    <el-option
                            v-for="item in cityArea"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                    >
                    </el-option>
                </el-select>
                <div class="search_btn">
                    <el-button type="primary" size="medium">搜索</el-button>
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
                isShowArea: true
            }
        },
        methods: {
            getSelect() {
                Axios.getSelect().then((res) => {
                    let cityData = JSON.stringify(res.data[0].son);
                    this.options = JSON.parse(cityData.replace(/AREA_ID/g, "value").replace(/AREA_NAME/g, "label"));
                })

            },
            update() {
                // this.isShowCity = true;
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
            updateCity() {
                // this.isShowArea = true;
                this.cityArr.forEach((item, index) => {
                    if (item.label === this.city) {
                        this.cityArea = item.son;
                        return
                    }
                })
            }
        },
        watch: {
            area(val) {
                // this.isShowArea = false
                if (val) {

                }
            }
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>
    .address {
        width: 100%;
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
        padding: 0 20px;
    }

    label {
        padding: 0 20px 0 0;
    }

    .el-select {
        /*width: 235px;*/
        width: 466px;
    }

    .search_btn {
        margin-left: 20px;
    }

</style>
