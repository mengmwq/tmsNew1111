<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 周报列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form
                            :inline="true"
                            style="margin: 20px 0 0 0;"
                    >
                        <el-row :gutter="24" >
                            <el-col :span="14">
                                <el-form-item label="客户账号">
                                    <el-input style="width: 120px;
"></el-input>
                                </el-form-item>
                                <el-form-item label="销售员">
                                    <el-input style="width: 120px;"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="block">

                                        <el-date-picker
                                                v-model="time"
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
                            <el-col :span="6" >
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
                                                <div class="grid-img">
                                                    <img
                                                            src="../../assets/img/收入合计上的图标.png"
                                                            alt=""
                                                    >
                                                </div>
                                                <div class="grid-cont-right">
                                                    <h4 style="color: #fff">36周收入 <font style="padding: 0 20px">2019元</font></h4>
                                                    <h4 style="color: #fff">35周收入 <font style="padding: 0 20px">2019元</font></h4>

                                                </div>
                                                <div class="grid-imgw">
                                                    <h4 style="color: #fff">差额</h4>
                                                    <h4 style="color: #fff">50万元</h4>

                                                </div>

                                            </div>

                                        </el-card>


                                    </el-col>


                                </el-row>

                            </el-col>
                            <el-col :span="3"  :offset="1" >
                                <div style="margin-top:50px" >
                                    <img

                                            src="../../assets/img/刷新.png"

                                            style="margin-left: 10px;"
                                    >
                                    <img
                                            src="../../assets/img/导出.png"
                                            alt
                                            style="margin: 0 20px"
                                    >

                                </div>
                            </el-col>
                        </el-row>
                    </el-form>

                </el-col>
            </el-row>
            <el-table

                    :data="tableData"
                    style="width: 100%"
                    ref="multipleTable"
                    border
                    max-height="400"

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
                        prop="BillNumber"
                        label="销售员"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                        prop="BillNumber"
                        label="客户账号"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                        prop="GetCompany"
                        label="公司名称"
                        align="center"
                        :show-overflow-tooltip="true"
                        fixed="right"
                ></el-table-column>
                <el-table-column
                        prop="BillNumber"
                        label="客户类型"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

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
                        label="结算类型"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="BillNumber"
                        label="上周收入"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="BillNumber"
                        label="本周收入"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="BillNumber"
                        label="差额"
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

    export default {
        data() {
            return {
                time:'',


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



                cur_page: 1,
                limit: 10,
                ccc: 500, //总页数
                activeName: "second",


            };
        },
        created() {

        },

    };
</script>
<style scoped>
    .grid-content {
        display: flex;
        align-items: center;
        height: 80px;
    }



    .grid-cont-right {
        flex: 2;
        margin: 0px 10px 0 10px;
        font-size: 14px;
        color: #999;
        border-right: 1px solid #ccc;
    }
    .grid-imgw{
        flex: 1;
        font-size: 14px;
    }
    .grid-num2 {
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