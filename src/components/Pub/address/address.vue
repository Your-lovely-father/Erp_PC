<template>
    <div class="address">
        <div class="select">
            <label>门店</label>
            <el-select v-model="value1" clearable placeholder="请选择" @change="select">
                <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" clearable placeholder="请选择" v-show="isShowCity" @change="option">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value3" clearable placeholder="请选择" v-show="isShowArea">
                <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    import Axios from '../../../api/pub/pub'

    export default {
        data() {
            return {
                options1: [],
                value1: '',
                options2: [],
                value2: '',
                options3: [],
                value3: '',
                isShowCity: false,
                isShowArea: false
            }
        },
        methods: {
            select(e) {
                if (e) {
                    this.isShowCity = true
                }
            },
            option(e) {
                if (e) {
                    this.isShowArea = true
                }
            },
            getSelect() {
                Axios.getSelect().then((res) => {
                    // const data = res.data[0].son;
                    // data.map((item,index) => {
                    //     item.label = item.AREA_NAME;
                    //     item.value = item.AREA_ID;
                    //     this.options1.push(item)
                    //     console.log( this.options1)
                    //     if (item.son) {
                    //         item.son.map(el => {
                    //             el.label = el.AREA_NAME;
                    //             el.value = el.AREA_ID;
                    //             this.options2.push(el)
                    //             console.log( this.options2)
                    //             if (el.son) {
                    //                 el.son.map(key => {
                    //                     key.label = key.AREA_NAME;
                    //                     key.value = key.AREA_ID;
                    //                     this.options3.push(key)
                    //                     console.log( this.options3)
                    //                 })
                    //             }
                    //         })
                    //     }
                    // });
                    let cityData = JSON.stringify(res.data[0].son);
                    let options = JSON.parse(cityData.replace(/AREA_ID/g, "value").replace(/AREA_NAME/g, "label"));
                    options.map((item, index) => {
                        this.options1.push(item);
                        console.log( this.options1)
                            item.son.map((el) => {
                                // console.log(el)
                                this.options2.push(el);
                            })
                    });
                    // data.map((itme)=>{
                    //     console.log(itme)
                    //     this.options1.push(itme)
                    //     // this.options1.push({
                    //     //     label:item.AREA_NAME,
                    //     //     value:item.AREA_ID
                    //     // })
                    // })
                    // console.log(data)
                    // window.sessionStorage.setItem('linkage', JSON.stringify(data))
                    // var linkage = window.sessionStorage.getItem('linkage')
                    // this.storesOptions = JSON.parse(linkage)
                })

            }
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>

</style>
