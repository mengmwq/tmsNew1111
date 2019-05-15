<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 未录入运费统计列表
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
                                        v-model="state2"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        :trigger-on-focus="false"
                                        :debounce=0
                                        @select="handleSelect"
                                ></el-autocomplete>
                            </el-form-item>

                            <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;">
                            <div style="float: right">

                                <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                <img src="../../assets/img/刷新.png" alt="" >

                            </div>
                        </el-col>
                    </el-row>
                </el-form>

            </div>

        </div>
        <el-table
                :data="tableData"
                style="width: 100%"
                ref="multipleTable"
                border
                max-height="400"
                @cell-click="jumpDetails"

        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column type="index" width="50" label="是否结算" align="center" fixed></el-table-column>
            <el-table-column prop="Condition" label="结算方式" align="center"></el-table-column>
            <el-table-column prop="ID" label="客户账号" align="center"></el-table-column>
            <el-table-column prop="GetCompany" label="货物名称" align="center" :show-overflow-tooltip="true"></el-table-column>

            <el-table-column prop="BillNumber" label="运输方式" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="件" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="实际重量" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="计费重量" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="体积" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="委托时间" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="BillNumber" label="要求到货时间" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="BillNumber" label="发件人" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="发件人地址" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="BillNumber" label="收货人" align="center" :show-overflow-tooltip="true"   ></el-table-column>

            <el-table-column prop="BillNumber" label="收货人地址" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="BillNumber" label="操作人" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="BillNumber" label="备注" align="center" :show-overflow-tooltip="true"   ></el-table-column>

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
                restaurants: [{name:'旺角茶餐厅',value:'刘顺利3'},{name:'新旺角茶餐厅',value: '孟健康'},{name:'旺角茶餐厅',value:'刘顺利'},{name:'旺角茶餐厅',value:'李平安'},{name:'旺角茶',value:'孟小孟'},{name:'旺角茶餐厅',value:'刘顺利2'}],
                state2:'',
                cur_page: 1,
                limit:10,
                ccc: 500, //总页数
                tableData:[
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
                    }
                ]
            };
        },
        methods:{
            jumpDetails(row, column, cell, event) {
                // console.log(row,column.label,222);
                if (column.label == "客户账号") {
                    this.$router.push("/NotRecordedDatails");
                }
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
    .table_td {
        background-color: #eff4f6;
    }
</style>
