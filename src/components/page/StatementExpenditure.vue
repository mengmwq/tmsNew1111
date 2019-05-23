<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 运单收支明细列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-row >
                    <el-col >
                        <el-row :gutter="24" class="mgb20">
                            <el-col :span="1">
                                <img src="../../assets/img/cargo@2x.png" alt="">
                            </el-col>

                            <el-col :span="4">

                                <el-card shadow="hover" :body-style="{padding: '0px'}" >
                                    <div class="grid-content grid-con-1" >

                                        <div class="grid-cont-right">
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/huowumingcheng.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp货物名称:</h6>
                                            </div>


                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/wendu.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp&nbsp溫度区间:</h6>
                                            </div>
                                        </div>

                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="4">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-2">

                                        <div class="grid-cont-right">
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/jianshu.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp件数:</h6>
                                            </div>
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/tiji.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp体积:</h6>
                                            </div>

                                        </div>



                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="4">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-3">

                                        <div class="grid-cont-right">
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/shijizhongliang.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp实际重量:</h6>
                                            </div>
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/jifeizhongliang.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp计费重量:</h6>
                                            </div>
                                        </div>


                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="5">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-4"  >
                                        <div class="grid-cont-right">
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/kehuzhichu.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp客户支出:</h6>
                                            </div>
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/yundanzhichu.png" alt="">
                                                <h6  style="color: #fff;" >&nbsp&nbsp&nbsp运单支出:</h6>
                                            </div>

                                        </div>
                                        <div  class="grid-img" style="border-left: 1px solid #fff;padding: 0px 30px">
                                            <h4  style="color: #fff">占比</h4 >
                                            <br>
                                            9.6%
                                        </div>



                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" >
                                <div style="display: -webkit-box">
                                    <img src="../../assets/img/kehuzhanghao.png" alt="">
                                    <span style="padding-right: 40px;font-size: 14px;">&nbsp&nbsp客户账号：1111</span>
                                    <img src="../../assets/img/yundanhaoma.png" alt="">
                                    <span style="font-size: 14px;" >&nbsp&nbsp运单号码：10000</span>

                                </div>
                                <div style="margin-top:50px;float: right">
                                    <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                    <img src="../../assets/img/刷新.png" alt="" >

                                </div>



                            </el-col>

                        </el-row>

                    </el-col>
                </el-row>
            </div>

        </div>
        <el-table
                :data="tableData"
                style="width: 100%"
                ref="multipleTable"
                border
                max-height="400"
                v-loading="loading"


        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column
                    label="网络名称"

            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">

                        <p>北京中集</p>
                        <p>省: 北京</p>
                        <p>市: 北京</p>

                        <div slot="reference" class="name-wrapper">
                            <el-tag size="large" >{{ scope.row.ID }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="companyName" label="车辆支出" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="SettlementType" label="取件费" align="center"></el-table-column>
            <el-table-column prop="income" label="发货费" align="center" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="afterTaxIncome" label="干冰费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="expend" label="包装费" align="center" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="interest" label="派送费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="GrossTax" label="提货费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="poll" label="返箱费" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="numberPackages" label="返箱车费" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="weight" label="支出合计" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="RevenueEntryNotVotes" label="承运商" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="UnauditedVotes" label="承运单号" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="UnauditedVotes" label="班次" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="UnauditedVotes" label="运输方式" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="UnauditedVotes" label="配载时间" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="UnauditedVotes" label="路由省份" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="UnauditedVotes" label="路由城市" align="center" :show-overflow-tooltip="true"  ></el-table-column>

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
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],//table数据
                cur_page: 1,//当前页
                limit:10, //每页多少条
                ccc: 500, //总页数
                time:"",//时间
                CustomerAccount:'',//客户账号
                loading:false, //表格加载loading
                tableData: [
                    {
                        ID: "北京中集",
                        companyName: "智冷",
                        Condition: "现金",
                        SettlementType: "已结算",
                        income:1000,
                        afterTaxIncome:800,
                        expend:100,
                        interest:123,
                        poll:25,
                        GrossTax:12,
                        numberPackages:'2件',
                        weight:'50KG',
                        RevenueEntryNotVotes:'15票',

                        UnauditedVotes:'15票',




                    },

                ],
            };
        },

        methods:{





        }

    };
</script>
<style>
    .curstomNum:not(.aaa) .cell {
        color: #649EFE!important;

    }
    .curstomNum:not(.aaa) .cell:hover {
        cursor: pointer;
    }
    .grid-content:hover{
        cursor: pointer;
    }
    .el-tag {
        background-color: rgba(64,158,255,.1);
        padding: 0 5px;
        height: 32px;
        line-height: 30px;
        font-size: 12px;
        color: #409EFF;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid rgba(64,158,255,.2);
        white-space: nowrap;
    }
</style>
<style scoped>
    .el-popover p{
        height: 30px;
        line-height: 30px;
        text-align: left;
    ;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 120px;
    }
    .grid-img {
        flex: 1;
    }
    .grid-cont-right {
        flex: 1;
        margin:0px 20px 0 20px;
        font-size: 14px;
        color: #999;

        line-height: 40px;

    }

    .grid-con-1 {
        background-color: #23c6c8;
        color: #fff;
    }
    .grid-con-1 .grid-num {
        color: #fff;
    }
    .grid-con-2  {
        background-color:#1ab394;
    }
    .grid-con-3 {
        background-color: #23c6c8;
    }
    .grid-con-2 .grid-num {
        color: #fff;
    }
    .grid-con-4  {
        background: #f8ac59;
    }
    .grid-con-3 .grid-num {
        color: #fff;
    }
    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }
    .user-info-list span {
        margin-left: 70px;
    }
    .mgb20 {
        margin-bottom: 20px;
    }
    td,
    th {
        border: solid #ccc;
        border-width: 0px 1px 1px 0px;
        padding: 10px 0px;
        text-align: center;
    }

    table {
        border: solid #ccc;
        border-width: 1px 0px 0px 1px;
        border-collapse: collapse;
        width: 100%;
    }

</style>
