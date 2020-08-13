<template>
    <div class="browse">
        <div class="browse_box">
            <div class="browse_box_left">
                <div class="left_one_box">
                    <div class="oen_content">
                        <p>业绩排名</p>
                    </div>
                    <div class="oen_table">
                        <el-table
                                :data="tableData"
                                style="width: 100%;"
                                :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
                                class="border"
                        >
                            <el-table-column
                                    prop="paiming"
                                    label="排名"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="177"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="zong"
                                    label="总业绩/元"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="xin"
                                    label="新房业绩/元"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="mai"
                                    label="买房业绩/元"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="zhu"
                                    label="租房业绩/元"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="left_two_box">
                    <div class="left_one_box">
                        <div class="oen_content">
                            <ul>
                                <li :class="{isShowActived1:isShowActived1}" @click="qiehuan(1)">昨日出售统计</li>
                                <li :class="{isShowActived2:isShowActived2}" @click="qiehuan(2)">昨日出租统计</li>
                                <li :class="{isShowActived3:isShowActived3}" @click="qiehuan(3)">本月出售统计</li>
                                <li :class="{isShowActived4:isShowActived4}" @click="qiehuan(4)">本月出租统计</li>
                            </ul>
                        </div>
                        <div class="oen_table">
                            <el-table
                                    :data="tableDate"
                                    style="width: 100%;"
                                    :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
                                    class="border"
                            >
                                <el-table-column
                                        prop="paiming"
                                        label="新增房"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="带看"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="zong"
                                        label="独家"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="xin"
                                        label="实勘"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="mai"
                                        label="钥匙"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="zhu"
                                        label="跟进"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="browse_box_right">
                <div class="information_content">
                    <div class="information">
                        <div class="information_box">
                            <div class="img_portrait">
                                <img src="http://www.hanshilong.com/kelikes/kelike/oldhome/images/home.jpg" alt="">
                            </div>
                            <div class="rigth_text">
                                <div class="title_top">
                                    <p>王志远</p>
                                    <span>A4 · 买卖经纪人 · 杏花里店A组</span>
                                </div>
                                <div class="title_bottom">
                                    <div class="text_box">
                                        <span class="span1">系统号：</span> <span>20316199</span>
                                    </div>
                                    <div class="text_box">
                                        <span class="span1">联系电话：</span> <span>20316199</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left_one_box top">
                    <div class="display_flex">
                        <p>公司公告</p>
                        <p class="iconfont icon-gantanhao"></p>
                    </div>
                    <div class="oen_table color_text">
                        <p>一直以来定然不会错过这一拥抱吧。</p>
                    </div>
                </div>
                <div class="left_two_box top">
                    <div class="left_one_box">
                        <div class="oen_content">
                            <ul>
                                <li :class="{isShowActiver1:isShowActiver1}" @click="isSwitch(1)">实勘王</li>
                                <li :class="{isShowActiver2:isShowActiver2}" @click="isSwitch(2)">钥匙王</li>
                                <li :class="{isShowActiver3:isShowActiver3}" @click="isSwitch(3)">带看王</li>
                            </ul>
                        </div>
                        <div class="oen_table">
                            <el-table
                                    :data="tableWang"
                                    style="width: 100%;"
                                    :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
                                    class="border"
                            >
                                <el-table-column
                                        prop="paiming"
                                        label="排名"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="姓名"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="zong"
                                        label="数量"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Browse",
        data() {
            return {
                tableData: [{
                    paiming: '1',
                    name: '无锡',
                    zong: '10000',
                    xin: '10000',
                    mai: '10000',
                    zhu: '10000'
                },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '10000',
                        xin: '10000',
                        mai: '10000',
                        zhu: '10000'
                    },
                ],
                tableDate: [{
                    paiming: '0',
                    name: '0',
                    zong: '0',
                    xin: '0',
                    mai: '0',
                    zhu: '0'
                }
                ],
                tableWang: [
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '1',
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '1',
                    },
                    {
                        paiming: '1',
                        name: '无锡',
                        zong: '1',
                    }
                ],
                isShowActiver1: true,
                isShowActiver2: false,
                isShowActiver3: false,
                isShowActived1: true,
                isShowActived2: false,
                isShowActived3: false,
                isShowActived4: false,


            }
        },
        methods: {
            isSwitch(val) {
                if (val === 1) {
                    this.isShowActiver1 = true;
                    this.isShowActiver2 = false;
                    this.isShowActiver3 = false

                } else if (val === 2) {
                    this.isShowActiver2 = true;
                    this.isShowActiver1 = false;
                    this.isShowActiver3 = false
                } else if (val === 3) {
                    this.isShowActiver3 = true;
                    this.isShowActiver1 = false;
                    this.isShowActiver2 = false
                }
            },
            qiehuan(val) {
                if (val === 1) {
                    this.isShowActived1 = true;
                    this.isShowActived2 = false;
                    this.isShowActived3 = false;
                    this.isShowActived4 = false;

                } else if (val === 2) {
                    this.isShowActived2 = true;
                    this.isShowActived1 = false;
                    this.isShowActived3 = false;
                    this.isShowActived4 = false;
                } else if (val === 3) {
                    this.isShowActived3 = true;
                    this.isShowActived2 = false;
                    this.isShowActived1 = false;
                    this.isShowActived4 = false;
                } else if (val === 4) {
                    this.isShowActived4 = true;
                    this.isShowActived3 = false;
                    this.isShowActived2 = false;
                    this.isShowActived1 = false;
                }
            }
        }
    }
</script>

<style scoped>
    .browse {
        padding: 15px;
    }

    .browse_box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    @media screen and (max-width:1024px){
        .browse_box_left{
            width: 100%!important;
        }
        .browse_box_right{
            width: 100% !important;
            margin-top: 15px ;
        }
    }
    .browse_box_left {
        width: 64%;
    }
    .browse_box_right {
        width: 35%;
    }

    .left_one_box {
        width: 100%;
        background: #ffffff;
    }

    .oen_content > p {
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
        color: #333;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
        border-bottom: 1px solid #f6f6f6;
    }

    .oen_table {
        padding: 10px 15px;
    }

    .oen_table >>> .el-table__body-wrapper is-scrolling-none {
        background: #666;
    }

    .oen_table >>> .is-leaf {
        text-align: center;
    }

    .oen_table >>> .cell {
        text-align: center;
    }

    .left_two_box {
        margin-top: 15px;
    }

    .oen_content > ul {
        display: flex;
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
        color: #333;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
        border-bottom: 1px solid #f6f6f6;
    }

    .oen_content > ul > li {
        margin: 0 15px;
    }

    .isShowActiver1 {
        border-bottom: 2px solid #009688;
    }

    .isShowActiver2 {
        border-bottom: 2px solid #009688;
    }

    .isShowActiver3 {
        border-bottom: 2px solid #009688;
    }

    .oen_content > ul > li:hover {
        cursor: pointer;
    }

    .isShowActived1 {
        border-bottom: 2px solid #009688;
    }

    .isShowActived2 {
        border-bottom: 2px solid #009688;
    }

    .isShowActived3 {
        border-bottom: 2px solid #009688;
    }

    .isShowActived4 {
        border-bottom: 2px solid #009688;
    }

    .information {
        padding: 10px 15px;

    }

    .information_content {
        background: white;
    }

    .information_box {
        display: flex;
    }

    .img_portrait {
        width: 72px;
        height: 92px;
        margin-right: 24px;
    }

    .img_portrait > img {
        width: 100%;
        height: 100%;
    }

    .title_top {
        display: flex;
    }

    .title_top > p {
        font-size: 22px;
        line-height: 1;
        color: #333;
        margin: 5px 12px 0 0;
    }

    .title_top > span {
        padding: 6px;
        font-size: 14px;
        line-height: 1;
        color: #3e485f;
        background: #f1f1f3;
        border-radius: 3px;
    }

    .title_bottom {
        margin-top: 10px;
    }

    .text_box {
        margin-top: 5px;
    }

    .span1 {
        font-size: 14px;
        color: #9399a5;
    }



    .top {
        margin-top: 15px;
    }

    .display_flex {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f6f6f6;
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
        color: #333;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
    }

    .color_text > p {
        margin-left: 30px;
        color: gray;
    }

    .border {
        border-left: 1px solid #EBEEF9;
        border-right: 1px solid #EBEEF9;
    }

    .border >>> .is-leaf {
        text-align: center;
        padding: 8px 0;
    }

    .border >>> .el-table_1_column_1 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_1_column_2 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_1_column_3 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_1_column_4 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_1_column_5 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }
    .border >>> .el-table_2_column_7 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_2_column_8 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_2_column_9 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_2_column_10 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_2_column_11 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_3_column_13 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }

    .border >>> .el-table_3_column_14 {
        border-right: 1px solid #EBEEF9;
        padding: 8px 0;
    }
</style>
