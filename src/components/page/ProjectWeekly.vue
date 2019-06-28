<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 项目周报列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-tabs
                            v-model="activeName"
                            @tab-click="handleClick"
                    >

                        <el-tab-pane
                                label="客户"
                                name="second"
                        >
                            <div v-show="tempShow2">
                                <el-form
                                        :inline="true"
                                        style="margin: 20px 0 0 0;"
                                >
                                    <el-row :gutter="24" >
                                        <el-col :span="16">
                                            <el-form-item>
                                                <div class="block">

                                                    <el-date-picker
                                                            v-model="value1"
                                                            type="datetime"
                                                            placeholder="选择截止时间"
                                                    >
                                                    </el-date-picker>
                                                </div>
                                            </el-form-item>

                                            <img
                                                    src="../../assets/img/查询.png"
                                                    alt="查询图标"
                                                    style="margin-left: 10px;margin-top: 3px;"
                                            >

                                        </el-col>
                                        <el-col :span="6">
                                            <el-row
                                                    :gutter="24"
                                                    class="mgb20"
                                            >
                                                <el-col :span="24" class="">
                                                    <el-card
                                                            shadow="hover"
                                                            :body-style="{padding: '0px'}"
                                                    >
                                                        <div class="grid-content grid-con-1">

                                                            <div class="grid-cont-right">
                                                                <h4 style="color: #fff;font-size: 12px;">2019年收入合计</h4>
                                                                <div class="grid-num">&yen; 4,232</div>

                                                            </div>
                                                            <div class="grid-img">
                                                                <img
                                                                        src="../../assets/img/收入合计上的图标.png"
                                                                        alt=""
                                                                >
                                                            </div>
                                                        </div>
                                                    </el-card>
                                                </el-col>


                                            </el-row>

                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-row  :gutter="24">

                                    <el-col>
                                        <div
                                                id="eight1"
                                                style="width:100%;height:420px;"
                                        ></div>
                                    </el-col>
                                </el-row>

                            </div>
                            <div v-show="tableShow2">
                                <div class="handle-box">
                                    <el-form
                                            :inline="true"
                                            style="margin: 20px 0 0 0;"
                                    >
                                        <el-row>
                                            <el-col>
                                                <el-form-item>
                                                    <div class="block">

                                                        <el-date-picker
                                                                v-model="value1"
                                                                type="datetime"
                                                                placeholder="选择截止时间"
                                                        >
                                                        </el-date-picker>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item label="客户账号">
                                                    <el-input></el-input>
                                                </el-form-item>
                                                <el-form-item label="销售员">
                                                    <el-input></el-input>
                                                </el-form-item>
                                                <!--   <el-form-item label="结算类型">
                                                       <el-select
                                                               v-model="select_cate"
                                                               placeholder="请选择"
                                                               class="handle-select mr10"
                                                       >
                                                           <el-option
                                                                   key="0"
                                                                   label="支付宝"
                                                                   value="支付宝"
                                                           ></el-option>
                                                           <el-option
                                                                   key="1"
                                                                   label="微信"
                                                                   value="微信"
                                                           ></el-option>
                                                           <el-option
                                                                   key="2"
                                                                   label="现金"
                                                                   value="现金"
                                                           ></el-option>
                                                       </el-select>
                                                   </el-form-item>-->
                                                <img
                                                        src="../../assets/img/查询.png"
                                                        alt="查询图标"
                                                        style="margin-left: 10px;"
                                                >
                                                <div style="float: right">
                                                    <img
                                                            src="../../assets/img/导出.png"
                                                            alt
                                                            style="margin: 0 20px"
                                                    >
                                                    <img
                                                            src="../../assets/img/刷新.png"
                                                            alt
                                                    >

                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>

                                <el-table

                                        :data="tableData"
                                        style="width: 100%"
                                        ref="multipleTable"
                                        border
                                        max-height="400"
                                        @cell-click="jumpDetails"
                                >
                                    <el-table-column
                                            type="selection"
                                            width="60"
                                            align="center"
                                    ></el-table-column>
                                    <!--  <el-table-column
                                              type="index"
                                              width="50"
                                              label="序号"
                                              align="center"
                                              fixed
                                      ></el-table-column>-->
                                    <el-table-column
                                            prop="Condition"
                                            label="日期"
                                            align="center"
                                            fixed

                                    ></el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="部门"
                                            align="center"
                                            fixed

                                    ></el-table-column>
                                    <el-table-column
                                            prop="ID"
                                            label="客户账号"
                                            align="center"
                                            class-name="curstomNum"
                                            width="120"
                                            label-class-name="aaa"
                                            fixed
                                    ></el-table-column>
                                    <el-table-column
                                            prop="ID"
                                            label="公司名称"
                                            align="center"
                                            width="120"
                                            fixed
                                    ></el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="合计"
                                            align="center"
                                            width="120"
                                            :render-header="renderHeader"
                                    >
                                    </el-table-column>
                                    <template v-if="isSum">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="53-50周"
                                                    align="center"
                                                    width="120"
                                                    :render-header="renderHeader2"
                                                    v-if="isfive"
                                                    key="1"
                                            >
                                            </el-table-column>

                                        <template v-if="isMondy">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="53周"
                                                    width="120"
                                                    align="center"
                                                    :render-header="renderHeader21"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="52周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="51周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="50周"
                                                    align="center"
                                            >
                                            </el-table-column>

                                        </template>

                                        <el-table-column
                                                prop="Condition"
                                                label="49-40周"
                                                align="center"
                                                :render-header="renderHeader3"
                                                width="120"
                                        >

                                        </el-table-column>
                                        <template v-if="isMondy2">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="49周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="48周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="47周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="46周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="45周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="44周"
                                                    align="center"
                                            >
                                            </el-table-column>  <el-table-column
                                                prop="Condition"
                                                label="43周"
                                                align="center"
                                        >
                                        </el-table-column>  <el-table-column
                                                prop="Condition"
                                                label="42周"
                                                align="center"
                                        >
                                        </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="41周"
                                                    align="center"
                                            >
                                            </el-table-column>  <el-table-column
                                                prop="Condition"
                                                label="40周"
                                                align="center"
                                        >
                                        </el-table-column>




                                        </template>
                                        <el-table-column
                                                prop="Condition"
                                                label="39-30周"
                                                align="center"
                                                :render-header="renderHeader4"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <template v-if="isMondy3">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="39周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="38周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="37周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="36周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="35周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="34周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="33周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="32周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="31周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="30周"
                                                    align="center"
                                            >
                                            </el-table-column>

                                        </template>
                                        <el-table-column
                                                prop="Condition"
                                                label="29-20周"
                                                align="center"
                                                :render-header="renderHeader5"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <template v-if="isMondy4">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="29周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="28周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="27周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="26周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="25周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="24周"
                                                    align="center"
                                            >
                                            </el-table-column><el-table-column
                                                prop="Condition"
                                                label="23周"
                                                align="center"
                                        >
                                        </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="22周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="21周"
                                                    align="center"
                                            >
                                            </el-table-column><el-table-column
                                                prop="Condition"
                                                label="20周"
                                                align="center"
                                        >
                                        </el-table-column>



                                        </template>
                                        <el-table-column
                                                prop="Condition"
                                                label="19-10周"
                                                align="center"
                                                :render-header="renderHeader6"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <template v-if="isMondy5">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="19周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="18周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="17周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                prop="Condition"
                                                label="16周"
                                                align="center"
                                        >
                                        </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="15周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="14周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="13周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="12周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="11周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="10周"
                                                    align="center"
                                            >
                                            </el-table-column>

                                        </template>
                                        <el-table-column
                                                prop="Condition"
                                                label="9-0周"
                                                align="center"
                                                :render-header="renderHeader7"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <template v-if="isMondy6">
                                            <el-table-column
                                                    prop="Condition"
                                                    label="9周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="8周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="7周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="6周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="5周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="4周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="3周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="2周"
                                                    align="center"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="Condition"
                                                    label="1周"
                                                    align="center"
                                            >
                                            </el-table-column>

                                        </template>

                                    </template>




                                    <el-table-column
                                            prop="BillNumber"
                                            label="销售员"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="BillNumber"
                                            label="项目客服"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="BillNumber"
                                            label="客户类型"
                                            align="center"
                                            :show-overflow-tooltip="true"
                                            fixed="right"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="BillNumber"
                                            label="业务类型"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"

                                    ></el-table-column>
                                    <el-table-column
                                            prop="BillNumber"
                                            label="结算模式"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"

                                    ></el-table-column>

                                </el-table>
                                <div class="pagination">
                                    <el-pagination
                                            :page-sizes="[50, 100, 500, 2000]"
                                            :page-size="50"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="ccc"
                                    ></el-pagination>
                                </div>
                            </div>
                            <div style="text-align: center;margin-top: 20px;">

                                <img
                                        :src="clientLine"
                                        alt=""
                                        @click="switcher2(true)"
                                >
                                &nbsp; &nbsp; &nbsp;
                                <img
                                        :src="clientExcel"
                                        alt=""
                                        @click="switcher2(false)"
                                >

                            </div>

                        </el-tab-pane>
                        <el-tab-pane
                                label="线路"
                                name="first"
                                :disabled="true"
                        >
                            <div v-show="tempShow">
                                <el-form
                                        :inline="true"
                                        style="margin: 20px 0 0 0;"
                                >
                                    <el-row>
                                        <el-col>
                                            <el-form-item>
                                                <div class="block">

                                                    <el-date-picker
                                                            v-model="value1"
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                    >
                                                    </el-date-picker>
                                                </div>
                                            </el-form-item>


                                            <img
                                                    src="../../assets/img/查询.png"
                                                    alt="查询图标"
                                                    style="margin-left: 10px;margin-top: 3px;"
                                            >

                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-row>
                                    <el-col>
                                        <el-row
                                                :gutter="24"
                                                class="mgb20"
                                        >
                                            <el-col :span="6">
                                                <el-card
                                                        shadow="hover"
                                                        :body-style="{padding: '0px'}"
                                                >
                                                    <div class="grid-content grid-con-1">

                                                        <div class="grid-cont-right">
                                                            <h6 style="color: #fff">已录入票数合计</h6>
                                                            <div class="grid-num">4556票</div>

                                                        </div>
                                                        <div class="grid-img">
                                                            <img
                                                                    src="../../assets/img/收入合计上的图标.png"
                                                                    alt=""
                                                            >
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-card
                                                        shadow="hover"
                                                        :body-style="{padding: '0px'}"
                                                >
                                                    <div class="grid-content grid-con-2">

                                                        <div class="grid-cont-right">
                                                            <h6 style="color: #fff">已录入件数合计</h6>
                                                            <div class="grid-num">2444件</div>

                                                        </div>
                                                        <div class="grid-img">
                                                            <img
                                                                    src="../../assets/img/支出合计上的图标.png"
                                                                    alt=""
                                                            >
                                                        </div>

                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-card
                                                        shadow="hover"
                                                        :body-style="{padding: '0px'}"
                                                >
                                                    <div class="grid-content grid-con-3">

                                                        <div class="grid-cont-right">
                                                            <h6 style="color: #fff">已录入重量合计</h6>
                                                            <div class="grid-num">557g</div>

                                                        </div>
                                                        <div class="grid-img">
                                                            <img
                                                                    src="../../assets/img/毛利率上的图标.png"
                                                                    alt=""
                                                            >
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-card
                                                        shadow="hover"
                                                        :body-style="{padding: '0px'}"
                                                >
                                                    <div class="grid-content grid-con-4">

                                                        <div class="grid-cont-right">
                                                            <h6 style="color: #ffffff;">2019年成本合计</h6>
                                                            <div class="grid-num">￥88832</div>

                                                        </div>
                                                        <div class="grid-img">
                                                            <img
                                                                    src="../../assets/img/未录入运费票数合计.png"
                                                                    alt=""
                                                            >
                                                        </div>

                                                    </div>
                                                </el-card>
                                            </el-col>

                                        </el-row>

                                    </el-col>
                                </el-row>
                                <div
                                        id="eight"
                                        style="width:100%;height:700px;"
                                ></div>
                            </div>
                            <div v-show="tableShow">
                                <el-form
                                        :inline="true"
                                        style="margin: 20px 0 0 0;"
                                >
                                    <el-row>
                                        <el-col>
                                            <el-form-item>
                                                <div class="block">

                                                    <el-date-picker
                                                            v-model="value1"
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                    >
                                                    </el-date-picker>
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="客户账号">
                                                <el-input style="width: 80px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="发货城市">
                                                <el-input style="width: 80px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="收货城市">
                                                <el-input style="width: 80px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="运输方式">
                                                <el-select
                                                        v-model="WayOut"
                                                        placeholder="请选择"
                                                        class="handle-select mr10"
                                                >
                                                    <el-option key="0" label="铁路" value="铁路"></el-option>
                                                    <el-option key="1" label="航空" value="航空"></el-option>
                                                    <el-option key="2" label="公路" value="公路"></el-option>
                                                </el-select>
                                            </el-form-item>

                                            <img
                                                    src="../../assets/img/查询.png"
                                                    alt="查询图标"
                                                    style="margin-left: 10px;margin-top: 3px;"
                                            >
                                            <div style="float: right">
                                                <img
                                                        src="../../assets/img/导出.png"
                                                        alt
                                                        style="margin: 0 20px"
                                                >
                                                <img
                                                        src="../../assets/img/刷新.png"
                                                        alt
                                                >

                                            </div>

                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-table

                                        :data="tableData"
                                        style="width: 100%"
                                        ref="multipleTable"
                                        border
                                        max-height="400"
                                        @cell-click="jumpDetails"
                                >
                                    <el-table-column
                                            type="selection"
                                            width="60"
                                            align="center"
                                    ></el-table-column>
                                    <!--  <el-table-column
                                              type="index"
                                              width="50"
                                              label="序号"
                                              align="center"
                                              fixed
                                      ></el-table-column>-->
                                    <el-table-column
                                            prop="Condition"
                                            label="发货城市"
                                            align="center"
                                            fixed

                                    ></el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="收货城市"
                                            align="center"
                                            fixed

                                    ></el-table-column>


                                    <el-table-column
                                            show-summary
                                            prop="Condition"
                                            label="合计"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="12月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="11月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="10月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="9月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="8月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="7月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="6月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="5月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="4月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="3月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="2月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="Condition"
                                            label="1月"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="费用"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="票数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="件数"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="重量"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            prop="jjj"
                                            label="运输方式"
                                            align="center"
                                            class-name="curstomNum"
                                            width="120"
                                            label-class-name="aaa"
                                            fixed="right"
                                    ></el-table-column>


                                </el-table>
                                <div class="pagination">
                                    <el-pagination
                                            :page-sizes="[50, 100, 500, 2000]"
                                            :page-size="50"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="ccc"
                                    ></el-pagination>
                                </div>
                            </div>

                            <div style="text-align: center;margin-top: 20px;">

                                <img
                                        :src="lineLine"
                                        alt=""
                                        @click="switcher(true)"
                                >
                                &nbsp; &nbsp; &nbsp;
                                <img
                                        :src="lineExcel"
                                        alt=""
                                        @click="switcher(false)"
                                >

                            </div>

                        </el-tab-pane>
                        <!-- <el-tab-pane label="线路" name="first" v-if="!temp">
                                        <el-form :inline="true" style="margin: 20px 0 0 0;">
                                            <el-row>
                                                <el-col>
                                                    <el-form-item  >
                                                        <div class="block">

                                                            <el-date-picker
                                                                    v-model="value1"
                                                                    type="datetime"
                                                                    placeholder="选择日期时间">
                                                            </el-date-picker>
                                                        </div>
                                                    </el-form-item>

                                                    <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;">


                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    <div>biaoge </div>



                                    </el-tab-pane> -->

                    </el-tabs>
                </el-col>

            </el-row>
        </div>

    </div>

</template>


<style>

    ul > li {
        list-style: none !important;
    }

    .rightList li {
        margin-bottom: 40px;
        display: flex;
        align-items: center;
    }

    .curstomNum:not(.aaa) {
        cursor: pointer;
    }

    .curstomNum:not(.aaa) .cell {
        color: blue;
    }
</style>


<script>
    import echarts from "echarts";
    import home_no from "../../assets/img/hsexcel.png";
    import home from "../../assets/img/lsbiaoge.png";
    import lineActive from "../../assets/img/折线.png";
    import excelDefault from "../../assets/img/表格.png";

    export default {
        data() {
            return {

                isfive: true, // 53-50周


                isMondy6:false,
                isMondy5:false,
                isMondy4:false,
                isMondy3:false,
                isMondy2:false,
                isMondy: false,
                isSum: false, // 默认折叠
                // isFirst: false,
                aaaa : 'el-icon-circle-plus', // 加号
                bbbb :'el-icon-circle-plus',
                bbbb1 : 'el-icon-remove',
                cccc : 'el-icon-circle-plus',
                dddd : 'el-icon-circle-plus',
                eeee : 'el-icon-circle-plus',
                ffff : 'el-icon-circle-plus',
                gggg : 'el-icon-circle-plus',

                WayOut:'',
                lineLine: lineActive,
                lineExcel: excelDefault,
                clientLine: lineActive,
                clientExcel: excelDefault,
                lineDefault: home_no, // 折线 默认
                excelActive: home, // 表格 蓝色
                lineActive: lineActive, // 折线 蓝色
                excelDefault: excelDefault, // 表格 默认

                tempShow: true,
                tempShow2: true,
                tableShow: false,
                tableShow2: false,
                value1: "",
                select_cate: "", //运单状态
                tableData: [
                    {
                        ID: "ceshizhanghao1",
                        GetCompany: "测试公司1",
                        Condition: "现金",
                        BillNumber: "100000"
                    },
                    {
                        ID: "ceshizhanghao2",
                        GetCompany: "测试公司2",
                        Condition: "现金",
                        BillNumber: "100000"
                    },
                    {
                        ID: "ceshizhanghao2",
                        GetCompany: "测试公司2",
                        Condition: "现金",
                        BillNumber: "100000"
                    },
                    {
                        ID: "ceshizhanghao2",
                        GetCompany: "测试公司2",
                        Condition: "现金",
                        BillNumber: "100000"
                    }
                ],
                value6: "",

                option: [],
                cur_page: 1,
                limit: 10,
                ccc: 500, //总页数
                activeName: "second",

                multipleSelection: []
            };
        },
        created() {

        },
        mounted() {
            var eight1 = echarts.init(document.getElementById("eight1"));
            eight1.setOption({
                backgroundColor: "#eee",
                tooltip: {
                    trigger: 'axis',

                },
                "dataZoom": [{
                    "show": true,
                    "height": 10,
                    "xAxisIndex": [
                        0
                    ],
                    bottom: 0,
                    "start": 10,
                    "end": 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle:{
                        color:"#000",
                    },
                    textStyle:{
                        color:"#000"},
                    borderColor:"#90979c"
                }, {
                    "type": "inside",
                    "show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35
                }],
                xAxis: {
                    type: 'category',
                    data: ['一周', '二周', '三周', '四周', '五周', '六周', '七周','八周',"九周"]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320,112,445],
                    type: 'line'
                }]
            });

            window.onresize = eight1.resize; // 基于准备好的dom，初始化echarts实例
            var eight = echarts.init(document.getElementById("eight"));

            eight.setOption({

                backgroundColor: "#ccc",
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: ["票数", "件数", "重量", "成本"],
                    align: "right",
                    right: 20,
                    textStyle: {
                        color: "#000"
                    },
                    itemGap: 30,
                    itemWidth: 30,
                    itemHeight: 10
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#034e90",
                                width: 2,
                                type: "solid"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#9fceff",
                                fontSize: 14
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        splitNumber: 6,
                        axisLabel: {
                            formatter: "{value}",
                            textStyle: {
                                color: "#91bdeb",
                                fontSize: 16
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#00a1e4",
                                width: 2,
                                type: "solid"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#034e90",
                                width: 2,
                                type: "solid"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "票数",
                        type: "line",
                        data: (function () {
                            var d = [];
                            for (let i = 0; i < 12; i++) {
                                d.push(parseInt(Math.random() * (100 - 50 + 1) + 50, 10));
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                color: "#00a1e4"
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                shadowColor: "rgba(0,0,0,0.4)",
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        }
                    },
                    {
                        name: "件数",
                        type: "line",
                        data: (function () {
                            var d = [];
                            for (let i = 0; i < 12; i++) {
                                d.push(parseInt(Math.random() * (90 - 40) + 40, 10));
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                color: "#ffc600"
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                shadowColor: "rgba(0,0,0,0.4)",
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        }
                    },
                    {
                        name: "重量",
                        type: "line",
                        data: (function () {
                            var d = [];
                            for (let i = 0; i < 12; i++) {
                                d.push(parseInt(Math.random() * (80 - 30 + 1) + 30, 10));
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                color: "#24c768"
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                shadowColor: "rgba(0,0,0,0.4)",
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        }
                    },
                    {
                        name: "成本",
                        type: "line",
                        data: (function () {
                            var d = [];
                            for (let i = 0; i < 12; i++) {
                                d.push(parseInt(Math.random() * (70 - 20 + 1) + 20, 10));
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                color: "#de7008"
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                shadowColor: "rgba(0,0,0,0.4)",
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        }
                    }
                ]
            });

            window.onresize = eight.resize; // 基于准备好的dom，初始化echarts实例

        },
        methods: {
            getRender (h,column,c,d,num){
                    return h(
                        'div',
                        [
                            h('span', column.label),
                            h('i', {
                                class: c,
                                style:'color:#000;margin-left:5px;cursor:pointer;font-size: 15px;',
                                on:{
                                    click : d
                                }
                            })
                        ],
                    );
            },
            renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
                return this.getRender(h,column,this.aaaa,this.collpaseMondy);
            },
            renderHeader2 (h, {column}){  // 53-50
                return this.getRender(h,column,this.bbbb,this.collpaseTodey);
            },
            renderHeader21 (h , {column}){ // 53 减号
                return this.getRender(h,column,this.bbbb1,this.collpaseTodey1);
            },
            renderHeader3 (h ,{column}) {  // 49-40
                return this.getRender(h,column,this.cccc,this.collpaseFourty);
            },
            renderHeader4 (h ,{column}) { // 39-30
                return this.getRender(h,column,this.dddd,this.collpaseThirty);
            },
            renderHeader5 (h ,{column}) { // 29-20
                return this.getRender(h,column,this.eeee,this.collpaseTwenty);
            },
            renderHeader6 (h ,{column}) { // 19-10
                return this.getRender(h,column,this.ffff,this.collpaseTen);
            },
            renderHeader7 (h ,{column}) { // 9 -0
                return this.getRender(h,column,this.gggg,this.collpaseZero);
            },
            collpaseZero(){
                if(this.gggg == 'el-icon-remove'){
                    // 点击  减号
                    this.gggg = 'el-icon-circle-plus';
                    this.isMondy6 = false;
                    // this.isFirst = true;
                }else{
                    // 点击  加号
                    this.gggg = 'el-icon-remove';
                    this.isMondy6 = true;
                    // this.isFirst = false;
                }
            },
            collpaseTen(){
                if(this.ffff == 'el-icon-remove'){
                    // 点击  减号
                    this.ffff = 'el-icon-circle-plus';
                    this.isMondy5 = false;
                    // this.isFirst = true;
                }else{
                    // 点击  加号
                    this.ffff = 'el-icon-remove';
                    this.isMondy5 = true;
                    // this.isFirst = false;
                }
            },
            collpaseTwenty(){
                if(this.eeee == 'el-icon-remove'){
                    // 点击  减号
                    this.eeee = 'el-icon-circle-plus';
                    this.isMondy4 = false;
                    // this.isFirst = true;
                }else{
                    // 点击  加号
                    this.eeee = 'el-icon-remove';
                    this.isMondy4 = true;
                    // this.isFirst = false;
                }
            },
            collpaseThirty(){
                if(this.dddd == 'el-icon-remove'){
                    // 点击  减号
                    this.dddd = 'el-icon-circle-plus';
                    this.isMondy3 = false;
                    // this.isFirst = true;
                }else{
                    // 点击  加号
                    this.dddd = 'el-icon-remove';
                    this.isMondy3 = true;
                    // this.isFirst = false;
                }
            },
            collpaseFourty(){
                if(this.cccc == 'el-icon-remove'){
                    // 点击  减号
                    this.cccc = 'el-icon-circle-plus';
                    this.isMondy2 = false;
                    // this.isFirst = true;
                }else{
                    // 点击  加号
                    this.cccc = 'el-icon-remove';
                    this.isMondy2 = true;
                    // this.isFirst = false;
                }
            },
            collpaseTodey(){
                // if(this.bbbb == 'el-icon-remove'){
                //     // 点击  减号
                //     this.bbbb = 'el-icon-circle-plus';
                //     this.isMondy = false;
                //
                // }else{
                    // 点击  加号
                console.log(1231313);
                    this.bbbb1 = 'el-icon-remove';
                    this.isMondy = true;
                    this.isfive = false;
                    this.bbbb  = 'el-icon-remove';

                //
                // }
            },
            collpaseTodey1(){
                this.bbbb1 = 'el-icon-circle-plus';
                this.bbbb = 'el-icon-circle-plus';
                this.isMondy = false;
                this.isfive = true;
                // console.log(this.bbbb)
            },

            collpaseMondy(){
                if(this.aaaa == 'el-icon-remove'){
                    // 点击  减号
                    this.aaaa = 'el-icon-circle-plus';
                    this.isSum = false;
                    // this.isFirst = false;
                    // this.bbbb1 = '';
                    // this.bbbb = '';

                }else{
                    // 点击  加号
                    this.aaaa = 'el-icon-remove';
                    this.isSum = true;
                    // this.isFirst = true;
                }

            },


            handleClick(tab, event) {
                // console.log(tab.name);
                if (tab.name == "second") {
                    // 客户
                    this.tempShow2 = true;
                    this.tableShow2 = false;
                    this.clientLine = this.lineActive;
                    this.clientExcel = this.excelDefault;
                } else {
                    // 线路
                    this.tempShow = true;
                    this.tableShow = false;
                    this.lineLine = this.lineActive;
                    this.lineExcel = this.excelDefault;
                }
            },
            //qiehuan表格
            switcher(t) {
                // 线路
                if (t) {
                    // 折线
                    this.lineLine = this.lineActive;
                    this.lineExcel = this.excelDefault;
                    this.tempShow = true;
                    this.tableShow = false;

                } else {
                    // 表格
                    this.lineLine = this.lineDefault;
                    this.lineExcel = this.excelActive;
                    this.tempShow = false;
                    this.tableShow = true;
                }
            },
            switcher2(t) {
                // 客户
                if (t) {
                    // 折线
                    this.tempShow2 = true;
                    this.tableShow2 = false;
                    this.clientLine = this.lineActive;
                    this.clientExcel = this.excelDefault;
                } else {
                    // 表格
                    this.tempShow2 = false;
                    this.tableShow2 = true;
                    this.clientLine = this.lineDefault;
                    this.clientExcel = this.excelActive;
                }
            },
            // 2019.5.5 李洋 点击客户账号 跳转
            jumpDetails(row, column, cell, event) {
                // console.log(row,column.label,222);
                if (column.label == "客户账号") {
                    this.$router.push("/customeDatails");
                }
            }
        }
    };
</script>
<style scoped>
    .grid-content {
        display: flex;
        align-items: center;
        height: 80px;
    }

    .grid-img {
        flex: 1;
    }

    .grid-cont-right {
        flex: 1;
        margin: 0px 80px 0 40px;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 20px;
        font-weight: 800;
        margin: 5px 0px;
        color: #fff;
    }

    .grid-con-1 {
        background-color: #23c6c8;
        color: #fff;
    }

    .grid-con-1 .grid-num {
        color: #fff;
    }

    .grid-con-2 {
        background-color: #1ab394;
    }

    .grid-con-3 {
        background-color: #23c6c8;
    }

    .grid-con-2 .grid-num {
        color: #fff;
    }

    .grid-con-4 {
        background: #f8ac59;
    }

    .grid-con-3 .grid-num {
        color: #fff;
    }
</style>