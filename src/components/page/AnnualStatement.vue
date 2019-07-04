<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 年度报表列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 100%;"ref="parentWidth"></div>
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
                           <!--     <el-form
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

                                            <img
                                                    src="../../assets/img/查询.png"
                                                    alt="查询图标"
                                                    style="margin-left: 10px;margin-top: 3px;"
                                            >

                                        </el-col>
                                    </el-row>
                                </el-form>-->
                                <el-row  :gutter="24">
                                    <el-col :span="6">
                                        <el-row
                                                :gutter="24"
                                                class="mgb20"
                                        >
                                            <el-col :span="24" class="mgb20">
                                                <el-card
                                                        shadow="hover"
                                                        :body-style="{padding: '0px'}"
                                                >
                                                    <div class="grid-content grid-con-1">

                                                        <div class="grid-cont-right">
                                                            <h4 style="color: #fff">2019年收入合计</h4>
                                                            <div class="grid-num">￥{{Total}}</div>

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
                                            <el-col :span="24">
                                                <el-card
                                                        shadow="hover"
                                                        :body-style="{padding: '0px'}"
                                                >
                                                    <div class="grid-content grid-con-2">

                                                        <div class="grid-cont-right">
                                                            <h4 style="color: #fff">2019年成本合计</h4>
                                                            <div class="grid-num">￥{{Pay}}</div>

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


                                        </el-row>

                                    </el-col>
                                    <el-col :span="18">
                                        <div
                                                id="eight1"
                                                style="width:100%;height:420px;"
                                                v-loading="loading"
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
                                                                v-model="EndTime"
                                                                type="datetime"
                                                                placeholder="选择截止时间"
                                                                value-format="yyyy-MM-dd"
                                                        >
                                                        </el-date-picker>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item label="客户账号">
                                                    <el-input v-model="AccountNumber"></el-input>
                                                </el-form-item>
                                                <el-form-item label="销售员">
                                                    <el-input v-model="SaleName0"></el-input>
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
                                                          @click="getTableData"
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
                                                            @click="refresh()"
                                                    >

                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                                <el-table

                                        :data="monthData.data"
                                        style="width: 100%"
                                        ref="multipleTable"
                                        border
                                        max-height="400"
                                        v-loading="isLoading"
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
                                            
                                            label="日期"
                                            align="center"
                                            fixed

                                    ></el-table-column>
                                    <el-table-column
                                            prop="DepartMent"
                                            label="部门"
                                            align="center"
                                            fixed

                                    ></el-table-column>
                                    <el-table-column
                                            prop="AccountNumber"
                                            label="客户账号"
                                            align="center"

                                            width="120"

                                            fixed
                                    ></el-table-column>

                                    <el-table-column
                                            prop="UnitName"
                                            label="公司名称"
                                            align="center"
                                            fixed
                                            :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                            show-summary
                                            prop="Condition"
                                            label="合计"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="province"
                                                label="收入"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="支出"

                                        >
                                        </el-table-column>

                                    </el-table-column>
                                    <el-table-column
                                            v-for="(item,index) in monthData.ArrMonth"
                                            :key="index"                                
                                            :label="item+'月'"
                                            align="center"

                                    >
                                        <el-table-column
                                                prop="MonthInfo[1].pay"
                                                label="收入"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="MonthInfo.index.Pay"
                                                label="支出"
                                                width="50"
                                        >
                                        </el-table-column>

                                    </el-table-column>


  





                                    <el-table-column
                                            prop="SaleName0"
                                            label="销售员"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="SaleName"
                                            label="项目客服"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="DepartMent"
                                            label="客户类型"
                                            align="center"
                                            :show-overflow-tooltip="true"
                                            fixed="right"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="UniteCode"
                                            label="业务类型"
                                            align="center"
                                            fixed="right"
                                            :show-overflow-tooltip="true"
                                          
                                    ></el-table-column>
                                    <el-table-column
                                            prop="CountType"
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
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
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
<!-- *****888888888888888888888888888888线路线路线路线路线路88888888888********************************************** -->
                        <el-tab-pane
                                label="线路"
                                name="first"
                        >
                            <div v-show="tempShow">
                              <!--  <el-form
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
                                </el-form>-->
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
                                                            <div class="grid-num">{{CountPiaoYLR}}</div>

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
                                                            <div class="grid-num">{{CountJianYLR}}</div>

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
                                                            <div class="grid-num">{{CountCweightYLR}}</div>

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
                                                            <div class="grid-num">￥{{Pay}}</div>

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
                                <el-row>
                                    <el-col :span="24">
                                        <div
                                                id="fgf"
                                                style="width: 100%;height: 500px"
                                                v-loading="loading"
                                        ></div>
                                    </el-col>

                                </el-row>

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
                                                            v-model="EndTime"
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                            value-format="yyyy-MM-dd"

                                                    >
                                                    </el-date-picker>
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="客户账号">
                                                <el-input style="width: 80px" v-model="AccountNumber"></el-input>
                                            </el-form-item>

                                            <el-form-item label="发货城市">
                                                <el-input style="width: 80px" v-model="StartCity"></el-input>
                                            </el-form-item>
                                            <el-form-item label="收货城市">
                                                <el-input style="width: 80px" v-model="EndCity"></el-input>
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
                                                    @click="getLineTable"
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
                                                        @click="refresh2()"
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
                                                v-loading="isLoading"
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
                                                    prop="AccountNumber"
                                                    label="客户账号"
                                                    align="center"
                                                    fixed

                                            ></el-table-column>
                                            <el-table-column
                                                    prop="WayOut"
                                                    label="运输方式"
                                                    align="center"
                                                    class-name="curstomNum"
                                                    width="120"
                                                    label-class-name="aaa"

                                            ></el-table-column>
                                            <el-table-column
                                                    prop="StartCity"
                                                    label="发货城市"
                                                    align="center"
                                                    fixed

                                            ></el-table-column>
                                            <el-table-column
                                                    prop="EndCity"
                                                    label="收货城市"
                                                    align="center"
                                                    fixed

                                            ></el-table-column>


                                            <el-table-column
                                                    show-summary
                                                    
                                                    label="合计"
                                                    align="center"

                                            >
                                                <el-table-column
                                                        prop="Cweight"
                                                        label="费用"
                                                     >
                                                </el-table-column>
                                                <el-table-column
                                                        prop="Piao"
                                                        label="票数"

                                                >
                                                </el-table-column>
                                                <el-table-column
                                                        prop="Jian"
                                                        label="件数"

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



                                        </el-table>
                                <div class="pagination">
                                    <el-pagination
                                            :page-sizes="[20,50, 100, 500, 2000]"
                                            :page-size="20"
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
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
                loading:true,
                isLoading: false,
                monthData:[],
                StartCity:'',
                EndCity:'',
             
                WayOut:'',
                Total:'',
                Pay:'',
                piao:'',
                month:'',
                JianYLR:'',
                CweightYLR:'',
                CountCweightYLR:'',
                CountJianYLR:'',
                CountPiaoYLR:'',
                PiaoYLR:'',
                lineLine: lineActive,
                lineExcel: excelDefault,
                clientLine: lineActive,
                clientExcel: excelDefault,
                lineDefault: home_no, // 折线 默认
                excelActive: home, // 表格 蓝色
                lineActive: lineActive, // 折线 蓝色
                excelDefault: excelDefault, // 表格 默认
                Jian:'',
                tempShow: true,
                tempShow2: true,
                tableShow: false,
                tableShow2: false,
                EndTime: "",
                AccountNumber:'',
                SaleName0:'',
                select_cate: "", //运单状态
                tableData: [],
                value6: "",
                value1: "",

                option: [],
                 cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                activeName: "second",

                multipleSelection: []
            };
        },
        created() {
            this.getEcharts()
        },
        methods: {
            refresh(){
                State:'Account';
                this.EndTime='';
                this.AccountNumber='';
                this.SaleName0='';
                this.loading = false;
                this.getTableData()

            },
            refresh2() {

                    this.EndTime='';
                    this.AccountNumber='';
                    this.StartCity='';
                    this.EndCity='';
                    this.WayOut='';
                     this.getLineTable()

            },

             handleCurrentChange(val) {
                this.isLoading = true;
                this.cur_page = val;
                this.getTableData();
            },
            handleSelectionChange(val) {
                // 选中的  当前条 数据
                this.multipleSelection = val;

            },
            handleSizeChange(val) {
                this.isLoading = true;

                // console.log(val); // 每页显示  条数
                this.limit = val;
                this.getTableData();
            },
            //得到客户图表部分数据和线路部分的数据
            getEcharts(){
                 this.$axios
                     .post("http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/annualstatement/index",
                         {
                             State:'Chart'
                     }
                     ).then(res=>{
                         console.log(res,11111);
                         this.Total =res.data.Total;
                         this.CountCweightYLR = res.data.CountCweightYLR;
                         this.CountJianYLR =res.data.CountJianYLR;
                         this.CountPiaoYLR =res.data.CountPiaoYLR;
                         this.CweightYLR =res.data.CweightYLR;
                         this.Pay = res.data.Pay;
                         this.month = res.data.month;
                         this.piao = res.data.Piao;
                         this.Jian =res.data.Jian;
                         this.JianYLR = res.data.JianYLR;
                         this.PiaoYLR = res.data.PiaoYLR;
                         this.CweightYLR = res.data.CweightYLR

                     var xAxisData =  this.month;
                     var legendData= ['票数','件数'];
                      var eight1 = echarts.init(document.getElementById("eight1"));
                     this.loading = false;
                     var serieData = [];
                     var metaDate = [
                         this.piao,
                         this.Jian
                     ]
                     for(var v=0; v < legendData.length ; v++){
                         var serie = {
                             name:legendData[v],
                             type: 'line',
                             symbol:"circle",
                             symbolSize:10,
                             data: metaDate[v]
                         };
                         serieData.push(serie)
                     }
                     var colors = ["#00a1e4","#ffc600"];
                     eight1.setOption( {
                         backgroundColor: '#0f375f',

                         legend: {
                             show:true,left:"center",data:legendData,y:"3%",
                             itemWidth:18,itemHeight:12,textStyle:{color:"#fff",fontSize:14},
                         },
                         color:colors,
                         grid: {left: '2%',top:"12%",bottom: "5%",right:"5%",containLabel: true},
                         tooltip : { trigger: 'axis',axisPointer : { type : 'shadow'}},
                         xAxis: [
                             {
                                 type: 'category',
                                 axisLine: { show: true,lineStyle:{ color:'#6173A3' }},
                                 axisLabel:{interval:0,textStyle:{color:'#9ea7c4',fontSize:14} },
                                 axisTick : {show: false},
                                 data:xAxisData,
                             },
                         ],
                         yAxis: [
                             {
                                 axisTick : {show: false},
                                 splitLine: {show:false},
                                 axisLabel:{textStyle:{color:'#9ea7c4',fontSize:14} },
                                 axisLine: { show: true,lineStyle:{ color:'#6173A3'}},
                             },
                         ],
                         series:serieData
                     });


                     window.onresize = eight1.resize; // 基于准备好的dom，初始化echarts实例
                     document.getElementById("fgf").style.width = this.$refs.parentWidth.offsetWidth - 50 +'px';


                 //线路图表渲染
                     var xAxisData =  this.month;
                     var legendData= ["票数", "件数", "重量", "成本"];
                     var fgf = echarts.init(document.getElementById("fgf"));
                     this.loading = false;
                     var serieData2 = [];
                     var metaDate = [
                        this.JianYLR,
                         this.PiaoYLR,
                         this.CweightYLR,
                         [500000,70000, 84000, 70000, 89000, 88000, 70000, 90000, 853000, 13000, 10000 ,30000,]
                     ]
                     for(var v=0; v < legendData.length ; v++){
                         var serie = {
                             name:legendData[v],
                             type: 'line',
                             symbol:"circle",
                             symbolSize:10,
                             data: metaDate[v]
                         };
                         serieData2.push(serie)
                     }
                     var colors = ["#625bef","#2EF7F3","#ffc600","#ED6070","#ED6070"];
                     fgf.setOption({


                         backgroundColor: '#0f375f',

                         legend: {
                             show:true,left:"center",data:legendData,y:"3%",
                             itemWidth:18,itemHeight:12,textStyle:{color:"#fff",fontSize:16},
                         },
                         color:colors,
                         grid: {left: '2%',top:"12%",bottom: "5%",right:"5%",containLabel: true},
                         tooltip : { trigger: 'axis',axisPointer : { type : 'shadow'}},
                         xAxis: [
                             {
                                 type: 'category',
                                 axisLine: { show: true,lineStyle:{ color:'#6173A3' }},
                                 axisLabel:{interval:0,textStyle:{color:'#9ea7c4',fontSize:14} },
                                 axisTick : {show: false},
                                 data:xAxisData,
                             },
                         ],
                         yAxis: [
                             {
                                 axisTick : {show: false},
                                 splitLine: {show:false},
                                 axisLabel:{textStyle:{color:'#9ea7c4',fontSize:14} },
                                 axisLine: { show: true,lineStyle:{ color:'#6173A3'}},
                             },
                         ],
                         series:serieData2
                     });
                     window.onresize = fgf.resize; // 基于准备好的dom，初始化echarts实例

                 })
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
                    this.getLineTable()
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
                    this.getTableData();
                }
            },
            getTableData(){

                this.isLoading = true;
                 this.$axios
                     .post("http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/annualstatement/index",
                         {
                             State:'Account',
                             EndTime:this.EndTime,
                             AccountNumber:this.AccountNumber,
                             SaleName0:this.SaleName0,
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数


                     }
                     ).then(res => {
                         this.isLoading = false;
                         this.ccc = res.data.sum;
                         this.monthData = res.data;
                     })
            },
            //获得线路   表格数据
            getLineTable(){
                this.isLoading = true;
                this.$axios
                    .post("http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/annualstatement/index",
                        {
                            State:'Way',
                             EndTime:this.EndTime,
                             AccountNumber:this.AccountNumber,
                             StartCity:this.StartCity,
                             EndCity:this.EndCity,
                             WayOut:this.WayOut,
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数


                        }
                    ).then(res => {
                    this.isLoading = false;
                    this.tableData = res.data.data;
                    
                    this.ccc = res.data.sum;
                   
                })
            }
        }
    };
</script>
<style scoped>
    .grid-content {
        display: flex;
        align-items: center;
        height: 150px;
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
        font-size: 16px;
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