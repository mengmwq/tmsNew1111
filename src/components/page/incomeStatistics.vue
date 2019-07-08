<template>
    <div class="table">
<!--        <div class="crumbs">-->
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-tickets"></i> 收支统计列表-->
<!--                </el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <div class="container" style="padding: 10px 30px">
            <div class="handle-box">
                <el-form :inline="true" style="margin: 10px 0 0 0;">
                    <el-row>
                        <el-col>
                            <el-form-item label="公司名称">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="Company "
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        :trigger-on-focus="false"
                                        :debounce=0
                                        @select="handleSelect"
                                ></el-autocomplete>
                            </el-form-item>
                            <el-form-item label="客户账号">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="AccountNumber"
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
                                            value-format="yyyy-MM-dd"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>

                            <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;"
                                 @click="getData">
                            <div style="float: right">

                                <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px" @click="dataExport()">
                                <img src="../../assets/img/刷新.png" alt="" @click="refresh()">

                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row>
                    <el-col>
                        <el-row :gutter="24" style="margin-bottom: 10px">
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-1" @click="linkRevenue">

                                        <div class="grid-cont-right">
                                            <h4 style="color: #fff">收入合计</h4>
                                            <div class="grid-num">&yen; {{ToTalAll |rounding}}</div>
                                            <h6 style="color:#fff;">同期环比 &nbsp{{TotalHb}}</h6>
                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/qian.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-2" @click="linkSpending">

                                        <div class="grid-cont-right">
                                            <h4 style="color: #fff">支出合计</h4>
                                            <div class="grid-num">&yen; {{PayAll |rounding}}</div>
                                            <h6 style="color:#fff;">同期环比 &nbsp{{PayHb}}</h6>

                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/hqian.png" alt="">
                                        </div>

                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-3">

                                        <div class="grid-cont-right">
                                            <h6 style="color: #fff">毛利率</h6>
                                            <div class="grid-num">&yen; {{Mll}}</div>

                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/mao.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-4" @click="LinkNotRecorded">

                                        <div class="grid-cont-right">
                                            <h6 style="color: #ffffff;">未录入运费票数合计</h6>
                                            <div class="grid-num">{{NotEnterAll}}</div>

                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/weilu.png" alt="">
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
                element-loading-spinner="el-icon-loading2"
                element-loading-background="rgba(0, 0, 0, 0.2)"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                @cell-click="jumpDetails"
                height="500"
        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column
                    class-name="curstomNum"
                    label-class-name="aaa"

                    label="客户账号"
                    align="center"
                    width="100"

            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>客户账号:{{ scope.row.AccountNumber }}</p>
                        <hr>
                        <p>客户类型: {{scope.row.CompanyType}}</p>
                        <p>业务类型: {{scope.row.UniteCode}}</p>
                        <p>销售员: {{scope.row.SaleName0}}</p>
                        <p>项目客服: {{scope.row.ItemName}}</p>
                        <p>单位: {{scope.row.TwoName}}</p>
                        <p>时间: {{scope.row.indate}}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="large">{{ scope.row.AccountNumber }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="UnitName" label="公司名称" align="center" width="200"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="CountType" label="结算类型" align="center" width="80"></el-table-column>
            <el-table-column label="收入" align="center" :show-overflow-tooltip="true"
                             class-name="curstomNum" label-class-name="aaa" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.Total  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column label="税后收入" align="center" width="100"
                             :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.TotalTax  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column label="支出" align="center" :show-overflow-tooltip="true" class-name="curstomNum"
                             label-class-name="aaa">
                <template slot-scope="scope">
                    <span>{{scope.row.Pay  | rounding}}</span>
                </template>
            </el-table-column>
              <el-table-column prop="interest" label="运输毛利率" align="center" :show-overflow-tooltip="true" :formatter="addtimesta2"></el-table-column>
              <el-table-column prop="GrossTax" label="税后运输毛利率" align="center" :show-overflow-tooltip="true" :formatter="addtimesta22"></el-table-column>
            <el-table-column prop="Piao" label="票数" align="center" :show-overflow-tooltip="true"
                             :sortable="true"></el-table-column>
            <el-table-column prop="Jian" label="件数" align="center" :show-overflow-tooltip="true"
                             :sortable="true"></el-table-column>
            <el-table-column label="重量" align="center" :show-overflow-tooltip="true"
                             :sortable="true">
                <template slot-scope="scope">
                    <span>{{scope.row.Aweight  | weightGuo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="NotEnter" label="收入未录入票数" align="center" :show-overflow-tooltip="true" width="150"
                             class-name="curstomNum" label-class-name="aaa"></el-table-column>
            <el-table-column prop="Unaudit" label="未审核票数" align="center" :show-overflow-tooltip="true" width="150"
                             :sortable="true"></el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                    :page-sizes="[20,30,40,50,60,100, ]"
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
                tableData: [],//table数据
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                time: '',//时间
                StateTime: '',
                EndTime: '',
                restaurants: [{name: '旺角茶餐厅', value: '刘顺利3'}, {name: '新旺角茶餐厅', value: '孟健康'}, {
                    name: '旺角茶餐厅',
                    value: '刘顺利'
                }, {name: '旺角茶餐厅', value: '李平安'}, {name: '旺角茶', value: '孟小孟'}, {name: '旺角茶餐厅', value: '刘顺利2'}],
                AccountNumber: '',//客户账号
                loading: true, //表格加载loading
                Company: '',//公司名称
                multipleSelection: [],
                ToTalAll: '0',
                PayAll: '0',
                Mll: '0',
                NotEnterAll: '0',
                PayHb: '0',
                TotalHb: '0'
            };
        },
        created() {
            this.getData();
        },
        filters: {
            rounding(value) {
                return Number(value).toFixed(2)
            },
            weightGuo(value) {
                return Number(value).toFixed(3)
            }
        },
        methods: {
            //毛利率
            addtimesta2(row, colume) {
                return row.interest == null ? '暂无' : row.interest;
            },
            addtimesta22(row, colume) {
                return row.GrossTax == null ? '暂无' : row.GrossTax;
            },

            //刷新
            refresh() {
                this.loading = true;
                this.AccountNumber = '';//客户账号
                this.time = '';
                this.Company = '';
                this.getData();
                this.loading = false;
            },
            //导出   导出时需要依赖xlsx file-saver Blob.js  Export2Excel
            dataExport() {
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
                            "客户账号",
                            "公司名称",
                            "结算类型",
                            "收入",
                            "税后收入",
                            "支出",
                            "票数",
                            "件数",
                            "重量",
                            "收入未录入票数",
                            "未审核票数",
                            "客户类型",
                            "业务类型",
                            "销售员",
                            "项目客服",
                            "单位",
                            "时间"
                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "AccountNumber",
                            "UnitName",
                            "CountType",
                            "Total",
                            "TotalTax",
                            "Pay",
                            "Piao",
                            "Jian",
                            "Aweight",
                            "NotEnter",
                            "Unaudit",
                            "CompanyType",
                            "UniteCode",
                            "SaleName0",
                            "ItemName",
                            "TwoName",
                            "indate",
                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "收支统计列表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },
            //收入合计跳转
            linkRevenue() {
                this.$router.push("/CustomerRevenue");
            },
            //支出合计
            linkSpending() {
                this.$router.push("./CustomerSpending")
            },
            //未录入
            LinkNotRecorded() {
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
            jumpDetails(row, column, cell, event) {
                if (column.label == "客户账号") {
                    let obj = {
                        Page: this.cur_page,//当前页码
                        PageSize: this.limit,//每页条数
                        AccountNumber: this.AccountNumber,//客户账号
                        StateTime: this.time[0] || '',//开始时间
                        EndTime: this.time[1] || '', //结束时间
                        Company: this.Company //公司名稱
                    }

                    window.sessionStorage.setItem('customeDatails', JSON.stringify(obj));

                    // let AccountNumber = this.AccountNumber;

                    // var detailId = id.toString() ;

                    window.localStorage.setItem("AccountNumber", row.AccountNumber);
                    this.$router.push("/BOPS");
                } else if (column.label == "收入") {
                    let obj = {
                        Page: this.cur_page,//当前页码
                        PageSize: this.limit,//每页条数
                        AccountNumber: this.AccountNumber,//客户账号
                        StateTime: this.time[0] || '',//开始时间
                        EndTime: this.time[1] || '', //结束时间
                        Company: this.Company //公司名稱
                    }

                    window.sessionStorage.setItem('customeDatails', JSON.stringify(obj));

                    // let AccountNumber = this.AccountNumber;

                    // var detailId = id.toString() ;

                    window.localStorage.setItem("AccountNumber", row.AccountNumber);
                    this.$router.push("/customeDatails");
                } else if (column.label == "支出") {
                    let obj = {
                        Page: this.cur_page,//当前页码
                        PageSize: this.limit,//每页条数
                        AccountNumber: this.AccountNumber,//客户账号
                        StateTime: this.time[0] || '',//开始时间
                        EndTime: this.time[1] || '', //结束时间
                    }
                    window.sessionStorage.setItem('zhichuCustomeDatails', JSON.stringify(obj));
                    window.localStorage.setItem("AccountNumber", row.AccountNumber);
                    this.$router.push("/CustomerSpendDetails");
                } else if (column.label == "收入未录入票数") {
                    let obj = {
                        Page: this.cur_page,//当前页码
                        PageSize: this.limit,//每页条数
                        AccountNumber: this.AccountNumber,//客户账号
                        StateTime: this.time[0] || '',//开始时间
                        EndTime: this.time[1] || '', //结束时间
                    }
                    window.sessionStorage.setItem('zhichuCustomeDatails', JSON.stringify(obj));
                    window.localStorage.setItem("AccountNumber", row.AccountNumber);
                    this.$router.push("./NotRecordedDatails")
                }
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.cur_page = val;
                this.getData();
            },
            handleSelectionChange(val) {
                // 选中的  当前条 数据
                this.multipleSelection = val;

            },
            handleSizeChange(val) {
                this.loading = true;

                // console.log(val); // 每页显示  条数
                this.limit = val;
                this.getData();
            },
            //渲染表格
            getData() {
                // // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                this.$axios
                    .post(
                        this.URL_API + "zhanghaining/tms/public/index.php/statistical/index",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            AccountNumber: this.AccountNumber,//客户账号
                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间
                            Company: this.Company
                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;

                        this.ccc = res.data.sum;
                        this.ToTalAll = res.data.ToTalAll;
                        this.PayAll = res.data.PayAll;
                        this.Mll = res.data.Mll;
                        this.NotEnterAll = res.data.NotEnterAll;
                        this.PayHb = res.data.PayHb;
                        this.TotalHb = res.data.TotalHb;
                        this.loading = false;
                        this.AccountNumber = '';
                        this.time='';
                        this.Company= '';
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

    .el-icon-loading2 {
        background: url("../../assets/img/dongtu.gif") center no-repeat;
        background-size: cover;
        width: 20%;
        height: 100px;
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

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #ddd !important;
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
        height: 150px;
        border-radius: 10px;
        border:none;
    }

    .grid-img {
        flex: 1;
        -webkit-box-flex: 1;
        -ms-flex: 1;

        top: -20px;
        position: relative;
        right: 0px;

    }

    .grid-cont-right {
        flex: 3;
      /*  //margin: 0px 30px 0 20px;*/
        font-size: 14px;
        color: #999;
        text-align: center;
    }

    .grid-num {
        font-size: 18px;
        font-weight: 800;
        margin: 10px 0px;
        color: #fff;
    }
    .grid-con-1 {

        color: #fff;
        background: linear-gradient(45deg, #2187C7,  #BDD7E8);
    }
    .grid-con-1 .grid-num {
        color: #fff;
    }
    .grid-con-2 {
        background: linear-gradient(45deg, #F5AB56,  #ECE3DA);
    }
    .grid-con-3 {
        background: linear-gradient(45deg, #ED6070,  #EBC6CE);
    }
    .grid-con-2 .grid-num {
        color: #fff;
    }
    .grid-con-4 {
        background: linear-gradient(45deg, #2CB89D,  #C1E1E0);
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
        border: solid #000;
        border-width: 0px 1px 1px 0px;
        padding: 10px 0px;
        text-align: center;
    }
    table {
        border: solid #000;
        border-width: 1px 0px 0px 1px;
        border-collapse: collapse;
        width: 100%;
    }
</style>
