<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 承运商费用统计列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-form :inline="true" style="margin: 20px 0 0 0;">
                    <el-row>
                        <el-col>
                            <el-form-item label="委托时间">
                                <div class="block" >

                                    <el-date-picker
                                            v-model="value1"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="承运商">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="state2"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        :trigger-on-focus="false"
                                        :debounce=0
                                        @select="handleSelect"
                                ></el-autocomplete>
                            </el-form-item>
                        </el-col>
                        <el-col>



                            <el-form-item label="发件城市">
                                <el-input v-model="SendCity"></el-input>

                            </el-form-item>
                            <el-form-item label="收件城市">
                                <el-input v-model="ReceiptCity"></el-input>

                            </el-form-item>
                            <el-form-item label="运输方式">
                                <el-select
                                        v-model="select_cate"
                                        placeholder="请选择"
                                        class="handle-select mr10"
                                >
                                    <el-option key="0" label="海运" value="海运"></el-option>
                                    <el-option key="1" label="陆运" value="陆运"></el-option>
                                    <el-option key="2" label="空运" value="空运"></el-option>
                                </el-select>
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
                                            <h6  style="color: #fff">已录入承运费合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>

                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/chengyunshang.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-2" @click="linkSpending">

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">已录入票数合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>

                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/zongtoupiaoshu.png" alt="">
                                        </div>

                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-3">

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">已录入件数合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>

                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/chudanjianshu.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-4" @click="LinkNotRecorded">

                                        <div class="grid-cont-right">
                                            <h6 style="color: #ffffff;">已录入重量合计</h6>
                                            <div class="grid-num">&yen; 4,232</div>

                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/chanpinzhongliang.png" alt="">
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
        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
            <el-table-column prop="ID" label="站点" align="center"></el-table-column>
            <el-table-column prop="GetCompany" label="发件省份" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Condition" label="发件城市" align="center"></el-table-column>
            <el-table-column prop="BillNumber" label="承运商" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="结算方式" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="票数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="件数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="重量" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="承运费" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="BillNumber" label="运输方式" align="center" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="BillNumber" label="收货省份" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="收货城市" align="center" :show-overflow-tooltip="true"  ></el-table-column>

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
                tableData: [],
                cur_page: 1,
                limit:10,
                ccc: 500, //总页数
                value1:"",
                restaurants: [{name:'旺角茶餐厅',value:'刘顺利3'},{name:'新旺角茶餐厅',value: '孟健康'},{name:'旺角茶餐厅',value:'刘顺利'},{name:'旺角茶餐厅',value:'李平安'},{name:'旺角茶',value:'孟小孟'},{name:'旺角茶餐厅',value:'刘顺利2'}],
                state2:'',
                loading:false,
                SendCity:'北京',
                ReceiptCity:'上海',
                select_cate:''
            };
        },
        methods:{
            linkRevenue(){
                this.$router.push("/CustomerRevenue");
            },
            linkSpending(){
                this.$router.push("./CustomerSpending")
            },
            LinkNotRecorded(){
                this.$router.push("./NotRecorded")
            },
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
        margin:0px 80px 0 40px;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 28px;
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
