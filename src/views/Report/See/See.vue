<template>
    <div class="reportAdd" v-show="seeStatus">
        <div class="add_box">
            <div class="com">
                <div class="box_content">
                    <div class="herder">
                        <div class="poor_text">
                            查看报备
                        </div>
                        <div class="del">
                            <el-tooltip class="item" effect="dark" content="点击此处返回上一页"
                                        placement="bottom-end">
                                <span class="el-icon-close" @click="onPage"></span>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="add_content">
                        <div class="add_left">
                            <div class="information">
                                <div class="layui-card-header">
                                    基本信息
                                </div>
                                <div class="information_form">
                                    <div class="See_int">
                                        <label>姓名</label>
                                        <el-input
                                                :disabled="true"
                                                class="report_int"
                                                v-model="seeClient_name"
                                        >
                                        </el-input>
                                    </div>
                                    <div class="See_int">
                                        <label>电话</label>
                                        <el-input
                                                :disabled="true"
                                                class="report_int"
                                                v-model="seeClient_phone"
                                        >
                                        </el-input>
                                    </div>
                                    <div class="See_int">
                                        <label>时间</label>
                                        <el-date-picker
                                                v-model="seeReported_time"
                                                type="date"
                                                placeholder="选择日期"
                                                class="date"
                                                :disabled="true"
                                        >
                                        </el-date-picker>
                                        -
                                        <el-time-picker
                                                v-model="seeReported_time"
                                                placeholder="选择时间"
                                                class="date"
                                                :disabled="true"
                                        >
                                        </el-time-picker>
                                    </div>
                                    <div class="See_int">
                                        <label>备注</label>
                                        <el-input
                                                :disabled="true"
                                                class="report_int"
                                                v-model="seeRemarks"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="follow">
                                <div class="layui-card-header">
                                    跟进信息
                                </div>
                                <div class="people_content">
                                    <div class="tab">
                                        <el-table
                                                :data="followData"
                                                style="width: 100%"
                                                border
                                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                        >
                                            <el-table-column
                                                    label='客户名称'
                                                    prop="client_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='维护人'
                                                    prop="user_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='跟进记录'
                                                    prop="record_content">
                                            </el-table-column>
                                            <el-table-column
                                                    label='时间'
                                                    prop="follow_time">
                                            </el-table-column>
                                            <el-table-column
                                                    align="right" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="mini"
                                                            @click="followEdit(scope.row)"
                                                            v-permission="{action:'detail',effect:'disabled'}"
                                                    >查看
                                                    </el-button>
                                                    <el-button
                                                            slot="reference"
                                                            size="mini"
                                                            type="danger"
                                                            class="left_btn"
                                                            @click="followDelete(scope.row.id)"
                                                            v-permission="{action:'del',effect:'disabled'}"
                                                    >删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!--     分页区域       -->
                                        <div class="page">
                                            <el-pagination
                                                    @size-change="followSizeChange"
                                                    @current-change="followCurrentChange"
                                                    :current-page="followInfo.page"
                                                    :page-sizes="[5, 10, 20, 30]"
                                                    :page-size="followInfo.offset"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="followPage">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <el-dialog
                                            title="跟进信息"
                                            :visible.sync="isShowFollow"
                                            width="30%"
                                            :append-to-body="true"
                                    >
                                        <div class="tail_content">
                                            <div class="form">
                                                <div class="tail_box">
                                                    <span class="p1">客户名称</span>
                                                    <el-input
                                                            clearable
                                                            v-model="followClient_name"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">维护人</span>
                                                    <el-input
                                                            clearable
                                                            v-model="followUser_name"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box_textarea">
                                                    <span class="p1">跟进记录</span>
                                                    <el-input
                                                            clearable
                                                            type="textarea"
                                                            placeholder="请输入跟进记录"
                                                            clearable
                                                            v-model="followRecord_content"
                                                            class="tracking_textarea">
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">时间</span>
                                                    <el-date-picker
                                                            v-model="followFollow_time"
                                                            type="date"
                                                            placeholder="选择日期"
                                                            class="tracking_data"
                                                            value-format="yyyy-MM-dd"
                                                    >
                                                    </el-date-picker>
                                                    -
                                                    <el-time-picker
                                                            v-model="followFollow_time"
                                                            placeholder="选择时间"
                                                            class="tracking_data"
                                                            value-format="HH:mm:ss"
                                                    >
                                                    </el-time-picker>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="isShowFollow=false" size="small">关闭</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                            </div>
                            <div class="people">
                                <div class="layui-card-header">
                                    维护人信息
                                </div>
                                <div class="people_content">
                                    <div class="tab">
                                        <el-table
                                                :data="tableData"
                                                style="width: 100%"
                                                border
                                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                        >
                                            <el-table-column
                                                    label='维护人'
                                                    prop="user_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='手机号'
                                                    prop="user_phone">
                                            </el-table-column>
                                            <el-table-column
                                                    label='门店名称'
                                                    prop="storefront_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='时间'
                                                    prop="update_time">
                                            </el-table-column>
                                            <el-table-column
                                                    align="right" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="mini"
                                                            @click="peopleEdit(scope.row)"
                                                            v-permission="{action:'detail',effect:'disabled'}"
                                                    >查看
                                                    </el-button>
                                                    <el-button
                                                            slot="reference"
                                                            size="mini"
                                                            type="danger"
                                                            class="left_btn"
                                                            @click="peopleDelete(scope.row.id)"
                                                            v-permission="{action:'del',effect:'disabled'}"
                                                    >删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!--     分页区域       -->
                                        <div class="page">
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="queryInfo.page"
                                                    :page-sizes="[5, 10, 20, 30]"
                                                    :page-size="queryInfo.offset"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="tablePage">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <el-dialog
                                            title="维护人信息"
                                            :visible.sync="isShowPeople"
                                            width="30%"
                                            :append-to-body="true"
                                    >
                                        <div class="tail_content">
                                            <div class="form">
                                                <div class="tail_box">
                                                    <span class="p1">维护人</span>
                                                    <el-input
                                                            clearable
                                                            v-model="peopleUser_name"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">手机号</span>
                                                    <el-input
                                                            clearable
                                                            v-model="peopleUser_phone"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">门店名称</span>
                                                    <el-input
                                                            clearable
                                                            v-model="peopleStorefront_name"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">时间</span>
                                                    <el-date-picker
                                                            v-model="peopleUpdate_time"
                                                            type="date"
                                                            placeholder="选择日期"
                                                            class="tracking_data"
                                                            value-format="yyyy-MM-dd"
                                                    >
                                                    </el-date-picker>
                                                    -
                                                    <el-time-picker
                                                            v-model="peopleUpdate_time"
                                                            placeholder="选择时间"
                                                            class="tracking_data"
                                                            value-format="HH:mm:ss"
                                                    >
                                                    </el-time-picker>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="isShowPeople=false" size="small">关闭</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                            </div>
                            <div class="building">
                                <div class="layui-card-header">
                                    带看信息
                                </div>
                                <div class="building_content">
                                    <div class="tab">
                                        <el-table
                                                :data="lookData"
                                                style="width: 100%"
                                                border
                                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                        >
                                            <el-table-column
                                                    label='客户名称'
                                                    prop="client_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='员工名称'
                                                    prop="user_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='楼盘名称'
                                                    prop="building_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='带看内容'
                                                    prop="guide_look_content">
                                            </el-table-column>
                                            <el-table-column
                                                    label='时间'
                                                    prop="look_time">
                                            </el-table-column>
                                            <el-table-column
                                                    align="right" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="mini"
                                                            @click="lookEdit(scope.row)"
                                                            v-permission="{action:'detail',effect:'disabled'}"
                                                    >查看
                                                    </el-button>
                                                    <el-button
                                                            slot="reference"
                                                            size="mini"
                                                            type="danger"
                                                            class="left_btn"
                                                            @click="lookDelete(scope.row.id)"
                                                            v-permission="{action:'del',effect:'disabled'}"
                                                    >删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!--     分页区域       -->
                                        <div class="page">
                                            <el-pagination
                                                    @size-change="lookSizeChange"
                                                    @current-change="lookCurrentChange"
                                                    :current-page="lookInfo.page"
                                                    :page-sizes="[5, 10, 20, 30]"
                                                    :page-size="lookInfo.offset"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="lookPage">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <el-dialog
                                            title="带看信息"
                                            :visible.sync="isShowBuilding"
                                            width="30%"
                                            :append-to-body="true"
                                    >
                                        <div class="tail_content">
                                            <div class="form">
                                                <div class="tail_box">
                                                    <span class="p1">客户名称</span>
                                                    <el-input
                                                            clearable
                                                            v-model="client_nameLook"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">员工名称</span>
                                                    <el-input
                                                            clearable
                                                            v-model="user_nameLook"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">楼盘名称</span>
                                                    <el-input
                                                            clearable
                                                            v-model="building_nameLook"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box_textarea">
                                                    <span class="p1">带看内容</span>
                                                    <el-input
                                                            clearable
                                                            type="textarea"
                                                            placeholder="请输入跟进记录"
                                                            clearable
                                                            v-model="guide_look_contentLook"
                                                            class="tracking_textarea">
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">时间</span>
                                                    <el-date-picker
                                                            v-model="look_timeLook"
                                                            type="date"
                                                            placeholder="选择日期"
                                                            class="tracking_data"
                                                            value-format="yyyy-MM-dd"
                                                    >
                                                    </el-date-picker>
                                                    -
                                                    <el-time-picker
                                                            v-model="look_timeLook"
                                                            placeholder="选择时间"
                                                            class="tracking_data"
                                                            value-format="HH:mm:ss"
                                                    >
                                                    </el-time-picker>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="isShowBuilding=false" size="small">关闭</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                            </div>
                            <div class="intention">
                                <div class="layui-card-header">
                                    意向楼盘信息
                                </div>
                                <div class="intention_content">
                                    <div class="tab">
                                        <el-table
                                                :data="likeData"
                                                style="width: 100%"
                                                border
                                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                        >
                                            <el-table-column
                                                    label='客户'
                                                    prop="client_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='维护人'
                                                    prop="user_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='意向楼盘'
                                                    prop="building_name">
                                            </el-table-column>
                                            <el-table-column
                                                    label='时间'
                                                    prop="update_time">
                                            </el-table-column>
                                            <el-table-column
                                                    align="right" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="mini"
                                                            @click="intentionEdit(scope.row)"
                                                            v-permission="{action:'detail',effect:'disabled'}"
                                                    >查看
                                                    </el-button>
                                                    <el-button
                                                            slot="reference"
                                                            size="mini"
                                                            type="danger"
                                                            class="left_btn"
                                                            @click="intentionDelete(scope.row.id)"
                                                            v-permission="{action:'del',effect:'disabled'}"
                                                    >删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!--     分页区域       -->
                                        <div class="page">
                                            <el-pagination
                                                    @size-change="likeSizeChange"
                                                    @current-change="likeCurrentChange"
                                                    :current-page="likeInfo.page"
                                                    :page-sizes="[5, 10, 20, 30]"
                                                    :page-size="likeInfo.offset"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="likePage">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <el-dialog
                                            title="维护人信息"
                                            :visible.sync="isShowIntention"
                                            width="30%"
                                            :append-to-body="true"
                                    >
                                        <div class="tail_content">
                                            <div class="form">
                                                <div class="tail_box">
                                                    <span class="p1">客户名称</span>
                                                    <el-input
                                                            clearable
                                                            v-model="client_nameIntention"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">维护人</span>
                                                    <el-input
                                                            clearable
                                                            v-model="user_nameIntention"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">意向楼盘</span>
                                                    <el-input
                                                            clearable
                                                            v-model="building_nameIntention"
                                                            class="tracking_int"
                                                    >
                                                    </el-input>
                                                </div>
                                                <div class="tail_box">
                                                    <span class="p1">时间</span>
                                                    <el-date-picker
                                                            v-model="update_timeIntention"
                                                            type="date"
                                                            placeholder="选择日期"
                                                            class="tracking_data"
                                                            value-format="yyyy-MM-dd"
                                                    >
                                                    </el-date-picker>
                                                    -
                                                    <el-time-picker
                                                            v-model="update_timeIntention"
                                                            placeholder="选择时间"
                                                            class="tracking_data"
                                                            value-format="HH:mm:ss"
                                                    >
                                                    </el-time-picker>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="isShowIntention=false" size="small">关闭</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                            </div>
                        </div>
                        <div class="add_right">
                            <div class="operation">
                                <div class="layui-card-header">
                                    常用操作
                                </div>
                                <div class="layui-card-body">
                                    <span class="layui-btn-normal" @click=" lookDialogVisible = true">写带看</span>
                                    <span class="layui-btn-normal" @click="followDialogVisible = true">写跟进</span>
                                    <span class="layui-btn-normal" @click="fondDialogVisible = true">写意向楼盘</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <el-button type="primary" size="medium" @click="confirm()">关闭</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--   写带看     -->
        <el-dialog
                title="带看管理"
                :visible.sync="lookDialogVisible"
                width="30%"
        >
            <div class="tail_content">
                <!--      表单添加区域      -->
                <div class="form">
                        <div class="tail_box">
                            <span class="p1">带看楼盘</span>
                            <el-select v-model="lookBuilding_id" placeholder="请选择" class="tracking_int"
                                       @change="lookBuildingId"
                            >
                                <el-option
                                        v-for="item in lookBuilding_idOoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="tail_box_textarea">
                            <span class="p1">带看记录</span>
                            <el-input
                                    clearable
                                    type="textarea"
                                    placeholder="请输入带看记录"
                                    clearable
                                    v-model="lookGuide_look_content"
                                    class="tracking_textarea">
                            </el-input>
                        </div>
                        <div class="tail_box">
                            <span class="p1">时间</span>
                            <el-date-picker
                                    v-model="lookLookDate"
                                    type="date"
                                    placeholder="选择日期"
                                    class="tracking_data"
                                    @change="LookGetData"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                            -
                            <el-time-picker
                                    v-model="lookLookTime"
                                    placeholder="选择时间"
                                    class="tracking_data"
                                    @change="LookGetTime"
                                    value-format="HH:mm:ss"
                            >
                            </el-time-picker>
                        </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="lookOff" size="small">取 消</el-button>
                <el-button type="primary" @click="lookAscertain" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <!--   写跟进      -->
        <el-dialog
                title="跟进管理"
                :visible.sync="followDialogVisible"
                width="30%"
        >
            <div class="tail_content">
                <!--      表单添加区域      -->
                <div class="form">
                    <div class="tail_box_textarea">
                        <span class="p1">跟进记录</span>
                        <el-input
                                placeholder="请输入跟进记录"
                                clearable
                                type="textarea"
                                v-model="trackingGuide_look_content"
                                class="tracking_textarea"
                        >
                        </el-input>
                    </div>
                    <div class="tail_box">
                        <span class="p1">时间</span>
                        <el-date-picker
                                v-model="trackingLookDate"
                                type="date"
                                placeholder="选择日期"
                                class="tracking_data"
                                @change="trackingGetData"
                                value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                        -
                        <el-time-picker
                                v-model="trackingLookTime"
                                placeholder="选择时间"
                                class="tracking_data"
                                @change="trackingGgetTime"
                                value-format="HH:mm:ss"
                        >
                        </el-time-picker>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="follwOff" size="small">取 消</el-button>
                <el-button type="primary" @click="followAscertain" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <!--   写意向楼盘     -->
        <el-dialog
                title="意向楼盘管理"
                :visible.sync="fondDialogVisible"
                width="30%"
        >
            <div class="tail_content">
                <!--      表单添加区域      -->
                <div class="form_box">
                        <div class="tail_box">
                            <span class="p1">区域</span>
                            <el-cascader :options="fondSearchAreaOptions" clearable class="tracking_int"
                                         @change="fondHandleChange"
                                         ref="fondCascaderAddr"
                            ></el-cascader>
                        </div>
                        <div class="tail_box">
                            <span class="p1">意向楼盘</span>
                            <el-select v-model="fondBuilding_id" placeholder="请选择" class="tracking_int"
                                       @change="fondBbuildingId"
                            >
                                <el-option
                                        v-for="item in fondBuildingOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="tail_box">
                            <span class="p1">客户-手机号-维护人</span>
                            <el-select v-model="fondClient_name" placeholder="请选择" class="tracking_int"
                                       @change="fondObtainId"
                            >
                                <el-option
                                        v-for="item in fondCustomerList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fondOff" size="small">取 消</el-button>
                <el-button type="primary" @click="fondAscertain" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import  Api from '../../../api/Report/Report'
    import  Axios from '../../../api/pub/pub'
    import  LookApi from '../../../api/Look/Look'
    import  fondApi from '../../../api/Intention/Intention'
    import  employeesApi from '../../../api/Employees/Employees'
    import  intentionApi from '../../../api/Intention/Intention'
    import  lookApi from '../../../api/Look/Look'
    import  trackingApi from '../../../api/Tracking/Tracking'
    export default {
        data() {
            return {
                queryInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                tablePage: 0,//总条数
                tableData: [],

                lookInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                lookPage: 0,//总条数
                lookData: [],

                likeInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                likePage: 0,//总条数
                likeData: [],

                followInfo: {
                    query: '',
                    page: 1, //当前第几页
                    offset: 5, //每页显示多少条
                },
                followPage: 0,//总条数
                followData:[],
                //回显字段---------------
                seeClient_name:'',
                seeClient_phone:'',
                seeReported_time:'',
                seeRemarks:'',
                seeId:'',
                seeProvince_id:'',
                seeCity_id:'',
                seeArea_id:'',
                seeStorefront_id:'',
                seeUser_id:'',
                seeClient_id:'',
                //回显from字段-----跟进--------
                isShowFollow:false,
                followClient_name:'',
                followUser_name:'',
                followRecord_content:'',
                followFollow_time:'',
                //回显from字段-----员工--------
                isShowPeople:false,
                peopleUser_name:'',
                peopleUser_phone:'',
                peopleStorefront_name:'',
                peopleUpdate_time:'',
                //回显from字段-----带看--------
                isShowBuilding:false,
                client_nameLook:'',
                user_nameLook:'',
                building_nameLook:'',
                guide_look_contentLook:'',
                look_timeLook:'',
                //回显from字段-----意向楼盘--------
                isShowIntention:false,
                client_nameIntention:'',
                user_nameIntention:'',
                building_nameIntention:'',
                update_timeIntention:'',
                // 带看字段------------------
                lookDialogVisible:false,
                lookGuide_look_content:'', //带看记录
                lookBuilding_id:'',//楼盘id
                lookBuilding_idOoptions:[],//楼盘列表
                lookLookDate:'',//日期
                lookLookTime:'',//时间
                lookLook_time:'' ,//日期时间合并
                lookProvince_id:'',
                lookCity_id:'',
                lookArea_id:'',
                // 跟进字段------------------
                followDialogVisible:false,
                trackingGuide_look_content:'', //带看记录
                trackingLookDate:'',//日期
                trackingLookTime:'',//时间
                trackingLook_time:'' ,//日期时间合并
                // 意向楼盘字段------------------
                fondDialogVisible:false,
                fondSearchAreaOptions:[] , //区域
                fondProvince_id:'',//省
                fondCity_id:'',//市
                fondArea_id:'',//区
                fondCustomerList:[], //客户-手机号-维护人
                fondBuildingOptions:[],//楼盘
                fondClient_name:'',//客户id
                fondClient_id:'',//客户id
                fondUser_id:'',//维护人id
                fondBuilding_id:'',//楼盘id

            };
        },
        methods: {
            onPage() {
                this.$store.commit('isReport', true);
                this.$store.commit('isSee', false);
            },
            //vuex数据
            getSee(){
                this.detailList;
                this.followList(); //跟进
                this.getSlectList(); //维护人
                this.looklist(); //带看
                this.lookBuildingList(); //楼盘
                this.intentionList(); //意向楼盘
            },
            confirm() {
                this.onPage();
            },
            handleSizeChange(newSize) { //当前显示多少条操作
                this.queryInfo.offset = newSize;
                this.getSlectList()
            },
            handleCurrentChange(newPage) { //当前页数操作
                this.queryInfo.page = newPage;
                this.getSlectList()
            },
            lookSizeChange(newSize) { //当前显示多少条操作
                this.lookInfo.offset = newSize;
                this.looklist()
            },
            lookCurrentChange(newPage) { //当前页数操作
                this.lookInfo.page = newPage;
                this.looklist()
            },
            likeSizeChange(newSize) { //当前显示多少条操作
                this.likeInfo.offset = newSize;
                this.intentionList()
            },
            likeCurrentChange(newPage) { //当前页数操作
                this.likeInfo.page = newPage;
                this.intentionList()
            },
            followSizeChange(newSize){
                this.followInfo.offset = newSize;
                this.followList()
            },
            followCurrentChange(newPage){
                this.followInfo.page = newPage;
                this.followList()
            },

            //所有列表方法
            followList(){//跟进列表
                Api.followSelectList(
                    this.followInfo.page,
                    this.followInfo.offset,
                    this.seeUser_id,
                    this.seeArea_id,
                    this.seeStorefront_id,
                    this.seeId
                ).then((res)=>{
                    this.followPage=res.data.count;
                    this.followData=res.data.data;

                })
            },
            followEdit(val){ //跟进查看
                this.isShowFollow=true;
                this.followClient_name=val.client_name;
                this.followUser_name=val.user_name;
                this.followRecord_content=val.record_content;
                this.followFollow_time=val.follow_time;
            },
            followDelete(id){//跟进删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    trackingApi.trackingDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.followList()
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            getSlectList() { //维护人列表
                Api.getSlectList(
                    this.queryInfo.page,
                    this.queryInfo.offset,
                    this.seeProvince_id,
                    this.seeCity_id,
                    this.seeArea_id,
                    this.seeStorefront_id

                ).then((res) => {
                    this.tablePage = res.data.count;
                    this.tableData = res.data.user_data;
                })
            },
            peopleEdit(val){ //员工查看
                this.isShowPeople=true;
                this.peopleUser_name = val.user_name;
                this.peopleUser_phone = val.user_phone;
                this.peopleStorefront_name = val.storefront_name;
                this.peopleUpdate_time = val.update_time;
            },
            peopleDelete(id){//员工删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    employeesApi.postDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.getSlectList()
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            looklist() { //带看管理列表
                Api.lookList(
                    this.lookInfo.page,
                    this.lookInfo.offset,
                    this.seeStorefront_id,
                    this.seeArea_id,
                    this.seeUser_id,
                    this.seeId
                ).then((res) => {
                    this.lookPage = res.data.count;
                    this.lookData = res.data.data;
                })
            },
            lookEdit(val){ //带看查看
                this.isShowBuilding=true;
                this.client_nameLook=val.client_name;
                this.user_nameLook=val.user_name;
                this.building_nameLook=val.building_name;
                this.guide_look_contentLook=val.guide_look_content;
                this.look_timeLook=val.look_time;

            },
            lookDelete(id){//带看删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    lookApi.lookDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.looklist()
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            intentionList() { //意向楼盘列表
                Api.intentionList(
                    this.likeInfo.page,
                    this.likeInfo.offset,
                    this.seeProvince_id,
                    this.seeCity_id,
                    this.seeArea_id,
                    this.seeClient_id
                ).then((res) => {
                    this.likePage = res.data.count;
                    let data = res.data.data;
                    data.map((val) => {
                        if (val.client_id === this.detailList.id) {
                            val.client_name = this.detailList.client_name
                        }
                    });
                    this.likeData = data;
                })
            },
            intentionEdit(val){ //意向楼盘查看
                this.isShowIntention=true;
                this.client_nameIntention=val.client_name;
                this.user_nameIntention=val.user_name;
                this.building_nameIntention=val.building_name;
                this.update_timeIntention=val.update_time;
            },
            intentionDelete(id){//意向楼盘删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    intentionApi.intentionDel(id).then(res => {
                        if (res.code === "100006") {
                            this.$message.success(res.msg);
                            this.intentionList()
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //  带看操作
            lookOff(){
                this.lookDialogVisible=false;
            },
            lookAscertain(){
                this.lookDialogVisible=false;
                LookApi.lookAdd(
                    this.lookGuide_look_content,
                    this.seeId,
                    this.seeUser_id,
                    this.seeArea_id,
                    this.seeStorefront_id,
                    this.lookBuilding_id,
                    this.lookLook_time).then((res)=>{
                    if(res.code==="200001"){
                        this.$message.success('添加成功');
                        this.looklist();
                    }
                });
            },
            lookGetSelect() { //三级联动数据
                Axios.getSelect().then((res) => {
                    const data = res.data[0].son;
                    data.map((item) => {
                        item.label = item.AREA_NAME;
                        item.value = item.AREA_ID;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.AREA_NAME;
                                el.value = el.AREA_ID;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.AREA_NAME;
                                        key.value = key.AREA_ID;
                                        key.children = key.son;

                                    })
                                }
                            })
                        }
                    });
                    //把数据存在本地长期储存中
                    window.localStorage.setItem('linkage', JSON.stringify(data));
                    var linkage = window.localStorage.getItem('linkage');
                    this.lookAreaOptions = JSON.parse(linkage)
                })
            },
            lookBuildingList(){ //楼盘字典列表获取意向楼盘
                let page =1 ;
                let pagesum = 999;
                let province_id =this.seeProvince_id;
                let city_id = this.seeCity_id;
                let area_id = this.seeArea_id;
                Api.buildingList(page,pagesum,province_id,city_id,area_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.lookBuilding_idOoptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                });
            },
            lookBuildingId(e){ //意向楼盘
                this.lookBuilding_id=e;
            },
            LookGetData(e){//日期
                this.lookLookDate=e
            },
            LookGetTime(e){ //时间
                this.lookLookTime=e;
                this.lookLook_time=this.lookLookDate + ' '+this.lookLookTime
            },
            //  跟进操作
            follwOff(){ //取消
                this.followDialogVisible=false;
            },
            followAscertain(){//确定
                this.followDialogVisible=false;
                trackingApi.trackingAdd(
                    this.trackingGuide_look_content,
                    this.seeId,
                    this.seeUser_id,
                    this.seeArea_id,
                    this.seeStorefront_id,
                    this.trackingLook_time
                ).then((res)=>{
                    if(res.code==="200001"){
                        this.$message.success('添加成功');
                        this.followList()
                    }
                });
            },
            trackingGetData(e){//日期
                this.trackingLookDate=e
            },
            trackingGgetTime(e){ //时间
                this.trackingLookTime=e;
                this.trackingLook_time=this.trackingLookDate + ' '+this.trackingLookTime
            },
           // 意向楼盘操作
           fondOff(){
                this.fondDialogVisible=false;
           },
           fondAscertain(){
                this.fondDialogVisible=false;
               fondApi.intentionAdd(
                   this.fondClient_id,
                   this.fondUser_id,
                   this.fondBuilding_id,
                   this.fondProvince_id,
                   this.fondCity_id,
                   this.fondArea_id
               ).then((res)=>{
                   if(res.code === "200001"){
                       this.$message.success('添加成功');
                       this.intentionList()
                   }
               })
           },
           fondGetSelect() { //三级联动数据
                Axios.getSelect().then((res) => {
                    const data = res.data[0].son;
                    data.map((item) => {
                        item.label = item.AREA_NAME;
                        item.value = item.AREA_ID;
                        item.children = item.son;
                        if (item.son) {
                            item.son.map(el => {
                                el.label = el.AREA_NAME;
                                el.value = el.AREA_ID;
                                el.children = el.son;
                                if (el.son) {
                                    el.son.map(key => {
                                        key.label = key.AREA_NAME;
                                        key.value = key.AREA_ID;
                                        key.children = key.son;

                                    })
                                }
                            })
                        }
                    });
                    //把数据存在本地长期储存中
                    window.localStorage.setItem('linkage', JSON.stringify(data));
                    var linkage = window.localStorage.getItem('linkage');
                    this.fondSearchAreaOptions = JSON.parse(linkage)
                })
            },
           fondHandleChange() { //获取省市区id传给后台获取门店数据
                var pathvalue = this.$refs.fondCascaderAddr.getCheckedNodes()[0].path;
                this.fondProvince_id = pathvalue[0];
                this.fondCity_id = pathvalue[1];
                this.fondArea_id = pathvalue[2];
                fondApi.intentionSelect(this.fondArea_id).then((res)=>{
                    res.data.forEach(item => {
                        this.fondCustomerList.push({
                            label:'名称 : '+item.client_name + ' ; 手机号 : '+item.client_phone + ' ; 维护人 : '+item.user_name,
                            client_phone:item.client_phone,
                            value:item.client_id +','+item.user_id
                        });
                    });
                });
                this.fondBuildingList()
            },
           fondBuildingList(){ //楼盘字典列表获取意向楼盘
                let page =1 ;
                let pagesum = 999;
                let province_id =this.fondProvince_id;
                let city_id = this.fondCity_id;
                let area_id = this.fondArea_id;
                Api.buildingList(page,pagesum,province_id,city_id,area_id).then((res)=>{
                    let cityData = JSON.stringify(res.data.data);
                    this.fondBuildingOptions = JSON.parse(cityData.replace(/id/g, "value").replace(/building_name/g, "label"))
                })
            },
           fondObtainId(e){ //获取客户 / 维护人id
                let data =e.split(',');
                this.fondClient_id=data[0];
                this.fondUser_id=data[1];
            },
           fondBbuildingId(e){ //获取楼盘id
                this.fondBuilding_id=e
           },
           setList(data){
               this.seeClient_name=data.client_name;
               this.seeClient_phone=data.client_phone;
               this.seeReported_time=data.reported_time;
               this.seeRemarks=data.remarks;
               this.seeId=data.id;
               this.seeProvince_id=data.province_id;
               this.seeCity_id=data.city_id;
               this.seeArea_id=data.area_id;
               this.seeStorefront_id=data.storefront_id;
               this.seeUser_id=data.user_id;
               this.seeClient_id=data.client_id

           }
        },
        computed: {
            seeStatus() {
                return this.$store.state.report.seeStatus
            },
            detailList() {
                this.setList(this.$store.state.report.detailList);
                return this.$store.state.report.detailList
            }
        },
        mounted() {
            this.detailList;
            this.followList(); //跟进
            this.getSlectList(); //维护人
            this.looklist(); //带看
            this.lookBuildingList(); //楼盘
            this.intentionList(); //意向楼盘
            this.lookGetSelect();
            this.fondGetSelect();
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
    .com {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .herder {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 15px;
        border-bottom: 1px #eee solid;
        background: #eee;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 99;
    }
    .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 99;
        background: #ffffff;
        padding: 15px 0;
        text-align: center;
    }
    .box_content {
        width: 100%;
    }
    .add_content {
        width: 100%;
        padding: 0 15px 15px 15px;
        box-sizing: border-box;
        margin-top: 55px;
        margin-bottom: 80px;
        display: flex;
        justify-content: space-between;
    }
    .add_left {
        width: 69%;
    }
    .information {
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .information_form {
        padding: 15px 15px;
        box-sizing: border-box;
    }
    .people, .building, .intention,.follow {
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        justify-content: space-between;
        margin-top: 15px;
    }
    .tab {
        padding: 15px 15px;
        box-sizing: border-box;
    }
    .information_form {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    label {
        display: block;
        padding: 10px 0;
    }
    .report_int {
        width: 425px;
    }
    .date {
        width: 206px;
    }
    /* 操作样式*/
    .add_right {
        width: 30%;
    }
    .operation {
        width: 100%;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }
    .layui-card-header {
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
        border-bottom: 1px solid #f6f6f6;
        color: #333;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
    }
    .layui-card-body {
        padding: 15px 15px;
        line-height: 24px;
        display: flex;
        flex-wrap: wrap;
    }
    .layui-btn-normal {
        border: 1px #177ce3 solid;
        color: #177ce3;
        text-align: center;
        padding: 2px 15px;
        margin-right: 15px;
    }
    .page {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
    .tab >>> .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        text-align: center;
    }
   /* 带看操作*/

   /* 跟进操作*/
    /*  弹框样式   */
    .component>>>.el-dialog__header{
        padding: 0 80px 0 20px;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        background-color: #F8F8F8;
        border-radius: 2px 2px 0 0;
    }
    .component>>>.el-dialog__headerbtn{
        margin-top: -7px;
    }
    .component>>>.el-dialog__title{
        font-size: 14px;
        color: #333;
    }
    .dialog-footer{
        width: 100%;
        text-align: center;
    }
    .tail_content{
        padding: 10px 15px 0 15px;
    }
    /* 弹框内容样式*/
    .form{
        width: 100%;
    }
    .p1{
        float: left;
        display: block;
        padding: 9px 15px;
        width: 80px;
        font-weight: 400;
        line-height: 20px;
        text-align: right;
    }
    .tracking_int{
        display: block;
        width: 100%;
    }
    .tracking_data{
        width: 50%;
        display: block;
    }
    .tail_box{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .tail_box_textarea{
        width: 100%;
        height: 110px;
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .tail_box_textarea>>>.el-textarea__inner{
        width: 100%;
        height: 110px;
        resize: none;
    }
</style>
