<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 收支统计列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" style="margin: 20px 0 0 0;">
                    <el-row>
                        <el-col>
                            <el-form-item label="客户账号">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="CustomerAccount"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        :trigger-on-focus="false"
                                        :debounce=0
                                        @select="handleSelect"
                                ></el-autocomplete>
                            </el-form-item>
                            <el-form-item>
                                <div class="block">
                                    <el-date-picker
                                            v-model="time"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>

                            <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;">
                            <div style="float: right">

                                <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                <img src="../../assets/img/刷新.png" alt="" >

                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row >
                    <el-col >
                        <el-row :gutter="24" class="mgb20">
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}" >
                                    <div class="grid-content grid-con-1"  @click="linkRevenue">

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">收入合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>
                                            <h6 style="color:#000;">同期环比34% </h6>
                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/收入合计上的图标.png" alt="">
                                        </div>
                                        </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-2" @click="linkSpending">

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">支出合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>
                                            <h6 style="color:#000;">同期环比34% </h6>
                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/支出合计上的图标.png" alt="">
                                        </div>

                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-3">

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">毛利率</h6>
                                            <div class="grid-num">&yen; 4,232</div>

                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/毛利率上的图标.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-4" @click="LinkNotRecorded">

                                        <div class="grid-cont-right">
                                            <h6 style="color: #ffffff;">未录入运费票数合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>

                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/未录入运费票数合计.png" alt="">
                                        </div>

                                    </div>
                                </el-card>
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
                @cell-click="jumpDetails"

        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column
                    label="客户账号"
                  >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>客户账号: 1111111</p>
                        <hr>
                        <p>客户类型: 222222222</p>
                        <p>业务类型: 不知道</p>
                        <p>销售员: 孟健康</p>
                        <p>项目客服: 李平安</p>
                        <p>单位: 智冷</p>
                        <p>时间: 2018/11/25</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag >{{ scope.row.ID }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="companyName" label="公司名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="SettlementType" label="结算类型" align="center"></el-table-column>
            <el-table-column prop="income" label="收入" align="center" :show-overflow-tooltip="true" class-name="curstomNum" label-class-name="aaa"></el-table-column>
            <el-table-column prop="afterTaxIncome" label="税后收入" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="expend" label="支出" align="center" :show-overflow-tooltip="true" class-name="curstomNum" label-class-name="aaa"></el-table-column>
            <el-table-column prop="interest" label="运输毛利率" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="GrossTax" label="税后运输毛利率" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="poll" label="票数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="numberPackages" label="件数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="weight" label="重量" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="RevenueEntryNotVotes" label="收入未录入票数" align="center" :show-overflow-tooltip="true"    class-name="curstomNum" label-class-name="aaa"></el-table-column>
            <el-table-column prop="UnauditedVotes" label="未审核票数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>

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
                restaurants: [{name:'旺角茶餐厅',value:'刘顺利3'},{name:'新旺角茶餐厅',value: '孟健康'},{name:'旺角茶餐厅',value:'刘顺利'},{name:'旺角茶餐厅',value:'李平安'},{name:'旺角茶',value:'孟小孟'},{name:'旺角茶餐厅',value:'刘顺利2'}],
                CustomerAccount:'',//客户账号
                loading:false, //表格加载loading
                tableData: [
                    {
                        ID: "1000546",
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
            //收入合计跳转
            linkRevenue(){
                this.$router.push("/CustomerRevenue");
            },
            //支出合计
            linkSpending(){
                this.$router.push("./CustomerSpending")
            },
            //未录入
            LinkNotRecorded(){
                this.$router.push("./NotRecorded")
            },
            //客户账号模糊搜索
            querySearch(queryString, cb) {
                var restaurants = this.restaurants; // 所有数据
                var results = queryString
                    ? restaurants.filter(this.createFilter(queryString))
                    : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return restaurant => {
                    return (
                        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
                        0
                    );
                };
            },

            handleSelect(item) {
                console.log(item);
            },
            //点击客户账号\收入、支出时的跳转
            jumpDetails(row, column, cell, event){
                console.log(column.label,0)
                if (column.label == "客户账号") {
                    this.$router.push("/BOPS");
                }else if(column.label == "收入"){
                    this.$router.push("/customeDatails");
                }else if(column.label == "支出"){
                    this.$router.push("/CustomerSpendDetails");
                }else if(column.label == "收入未录入票数"){
                    this.$router.push("./NotRecordedDatails")
                }
            },
            //客户账号hover时
          /*  hoverDetails(row, column, cell, event){
                if (column.label == "客户账号") {
               //.....
                }
            }*/
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
        height: 150px;

    }
    .grid-img {
        flex: 1;
    }
    .grid-cont-right {
        flex: 1;
        margin:0px 80px 0 40px;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 24px;
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
