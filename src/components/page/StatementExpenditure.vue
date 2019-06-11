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

                <el-row>
                    <el-col>
                        <el-row :gutter="24" class="mgb20">
                            <el-col :span="1">
                                <img src="../../assets/img/cargo@2x.png" alt="">
                            </el-col>

                            <el-col :span="4">

                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-1">

                                        <div class="grid-cont-right">
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/huowumingcheng.png" alt="">
                                                <h6 style="color: #fff;">&nbsp&nbsp货物名称: {{CargoName}}</h6>
                                            </div>


                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/wendu.png" alt="">
                                                <h6 style="color: #fff;">&nbsp&nbsp&nbsp溫度区间: {{WDQJ}}</h6>
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
                                                <h6 style="color: #fff;">&nbsp&nbsp件数: {{Jian}}</h6>
                                            </div>
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/tiji.png" alt="">
                                                <h6 style="color: #fff;">&nbsp&nbsp体积: {{Volume}}</h6>
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
                                                <h6 style="color: #fff;">&nbsp&nbsp实际重量: {{Aweight}}</h6>
                                            </div>
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/jifeizhongliang.png" alt="">
                                                <h6 style="color: #fff;">&nbsp&nbsp计费重量: {{Cweight}}</h6>
                                            </div>
                                        </div>


                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="5">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-4">
                                        <div class="grid-cont-right">
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/kehuzhichu.png" alt="">
                                                <h6 style="color: #fff;">&nbsp&nbsp客户支出:</h6>
                                            </div>
                                            <div style="display: -webkit-box;">
                                                <img src="../../assets/img/yundanzhichu.png" alt="">
                                                <h6 style="color: #fff;">&nbsp&nbsp&nbsp运单支出:</h6>
                                            </div>

                                        </div>
                                        <div class="grid-img" style="border-left: 1px solid #fff;padding: 0px 30px">
                                            <h4 style="color: #fff">占比</h4>
                                            <br>
                                            9.6%
                                        </div>


                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <div style="display: -webkit-box">
                                    <img src="../../assets/img/kehuzhanghao.png" alt="">
                                    <span style="padding-right: 40px;font-size: 14px;">&nbsp&nbsp客户账号：1111</span>
                                    <img src="../../assets/img/yundanhaoma.png" alt="">
                                    <span style="font-size: 14px;">&nbsp&nbsp运单号码：10000</span>

                                </div>
                                <div style="margin-top:50px;float: right">
                                    <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                    <img src="../../assets/img/刷新.png" alt="" @click="refresh()">

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
                v-loading="loading"


        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column
                    label="网络名称"
                    width="150"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">

                        <p>北京中集</p>
                        <p>省: 北京</p>
                        <p>市: 北京</p>

                        <div slot="reference" class="name-wrapper">
                            <el-tag size="large">{{ scope.row.CountCompany }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="ParkPay" label="车辆支出" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="SettlementType" label="取件费" align="center"></el-table-column>
            <el-table-column prop="income" label="发货费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="GBPay" label="干冰费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BZPay" label="包装费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="interest" label="派送费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="THPay" label="提货费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="poll" label="返箱费" align="center" :show-overflow-tooltip="true"
                             :sortable="true"></el-table-column>
            <el-table-column prop="numberPackages" label="返箱车费" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="weight" label="支出合计" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="CYCompany" label="承运商" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="CYNumber" label="承运单号" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="UnauditedVotes" label="班次" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="INWayOut" label="运输方式" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="UnauditedVotes" label="配载时间" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ToDepart" label="路由省份" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ToCity" label="路由城市" align="center" :show-overflow-tooltip="true"></el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                    :page-sizes="[10,20,30,40,50,60,100, ]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="ccc"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                WDQJ: '',
                tableData: [],
                isFirst: true,
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数l
                loading: true,
                Aweight: '',
                Cweight: '',
                Jian: '',
                Volume: '',
                CargoName: ''

            };
        },
        created() {
            this.getData();
        },

        methods: {
            //点击客户账号\收入、支出时的跳转
            /* jumpDetails(row, column, cell, event){
                 console.log(column.label,0)
                 if (column.label == "运单号码") {
                     this.$router.push("/StatementExpenditure");
                 }
             },*/
            //导出   导出时需要依赖xlsx file-saver Blob.js  Export2Excel
            /*    dataExport() {
                    this.loading = true;
                    let import_file;
                    new Promise((resolve, reject) => {
                        import_file = this.multipleSelection;
                        if (import_file.length == 0) {
                            //this.limit = 10000;
                            // this.getData();
                            import_file = this.tableData;

                        }
                        resolve(import_file);
                    }).then(res => {
                        // console.log(res);return;
                        require.ensure([], () => {
                            const {export_json_to_excel} = require("../../assets/js/Export2Excel");
                            // 这就是表头 展示的表头
                            const tHeader = [

                                "运单号码",
                                "温度区间",
                                "货物名称",
                                "车辆支出",
                                "取件费",
                                "发货费",
                                "干冰费",
                                "包装费",
                                "派送费",
                                "提货费",
                                "返箱费",
                                "返箱车费",
                                "其他费用",
                                "支出合计"

                            ];
                            // 这就是 对应的 字段
                            const filterVal = [

                                "BillNumber",
                                "WDQJ",
                                "CargoName",
                                "ParkMoney",
                                "TakePay",
                                "TakeOutPay",
                                "GBPay",
                                "TakePackagePay",
                                "NetPsPay",
                                "NetTHPay",
                                "BBackMoney",
                                "BBCarMoney",
                                "OtherFei",
                                "BillNumber"

                            ];
                            const list = res;
                            this.loading = false;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, "客户支出明细表");  // 这是  excel文件名
                        });
                    });

                },*/
            /* formatJson: function (filterVal, jsonData) {
                 return jsonData.map(v => filterVal.map(j => v[j]));
             },*/
            //刷新
            refresh() {
                this.Bill = '';//yundanhaoma
                this.aaa = '';
                this.isOne = true;
                this.isWei = true;
                this.getData();
            },

            /*    details(val){
                    this.isFirst =false;
                    this.BillNumber = val.BillNumber; // zhe就是
                    this.GetName = val.GetName;
                    this.Jian = val.Jian;
                    this.Aweight = val.Aweight;
                    this.Cweight = val.Cweight;
                    this.InCity =val.InCity;
                    this.CargoSize = val.CargoSize;
                    this.SendsCompany= val.SendsCompany;
                    this.SendsName = val.SendsName;
                    this.SendsTelephone =val.SendsTelephone;
                    this.SendsAddress = val.SendsAddress;
                    this.GetCompany= val.GetCompany;
                    this.GetName = val.GetName;
                    this.GetTelephone =val.GetTelephone;
                    this.GetAddress = val.GetAddress;
                    this.SafeItem = val.SafeItem;
                    this.SafeMoney =val.SafeMoney
                },*/

            handleCurrentChange(val) {
                this.loading = true;
                this.cur_page = val;
                this.getData();
            },
            handleSelect(item) {
                console.log(item);
            },
            handleSizeChange(val) {
                this.loading = true;

                // console.log(val); // 每页显示  条数
                this.limit = val;
                this.getData();
            },
            getData() {
                let BillNumber = window.localStorage.getItem("BillNumber");
                this.BillNumber = BillNumber;
                this.$axios
                    .post(
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/statistical/statementexpenditure",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            BillNumber: BillNumber,
                        }
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.ccc = res.data.sum;
                        this.WDQJ = res.data.WDQJ;
                        this.CargoName = res.data.CargoName;
                        this.Jian = res.data.Jian;
                        this.Volume = res.data.Volume;
                        this.Aweight = res.data.Aweight;
                        this.Cweight = res.data.Cweight
                        console.log(this.WDQJ, 99)
                        this.loading = false;

                        if (res.data.code == 0) {
                            this.tableData = res.data.data;

                            this.ccc = res.data.sum;
                            this.loading = false;
                        } else if (res.data.code == 450) {
                            this.$message.success("登录时间过长，请重新登录");
                            this.$router.push("/login");
                        }
                    });
            },
        }
    };
</script>
<style>
    .curstomNum:not(.aaa) .cell {
        color: #649EFE !important;

    }

    .curstomNum:not(.aaa) .cell:hover {
        cursor: pointer;
    }

    .grid-content:hover {
        cursor: pointer;
    }

    .el-tag {
        background-color: rgba(64, 158, 255, .1);
        padding: 0 5px;
        height: 32px;
        line-height: 30px;
        font-size: 12px;
        color: #409EFF;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid rgba(64, 158, 255, .2);
        white-space: nowrap;
    }
</style>
<style scoped>
    .el-popover p {
        height: 30px;
        line-height: 30px;
        text-align: left;;
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
        margin: 0px 20px 0 20px;
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
