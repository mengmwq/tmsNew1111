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
                                <el-input ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="block">

                                    <el-date-picker
                                            v-model="value1"
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
        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
            <el-table-column prop="ID" label="客户账号" align="center"></el-table-column>
            <el-table-column prop="GetCompany" label="公司名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Condition" label="结算类型" align="center"></el-table-column>
            <el-table-column prop="BillNumber" label="收入" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="税后收入" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="支出" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="运输毛利率" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="税后运输毛利率" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="票数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="BillNumber" label="件数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="BillNumber" label="运费录入票数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="未审核票数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>

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
    .table_td {
        background-color: #eff4f6;
    }
</style>
