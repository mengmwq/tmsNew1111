<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 未录入运费明细
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        | {{CountCompany}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="handle-box">

                <el-form :inline="true" style="margin: 20px 0 0 0;">
                    <el-row>
                        <el-col>

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

                            <el-form-item label="承运单号">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="CYNumber"
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

            </div>

        </div>
        <el-table
                :data="tableData"
                style="width: 100%"
                ref="multipleTable"
                border
                height="600"
                v-loading="loading"

                @selection-change="handleSelectionChange"

        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="CYCompany" label="承运商" align="center"></el-table-column>

            <el-table-column prop="CYNumber" label="承运单号" align="center" :formatter ="cydanhao"></el-table-column>
            <el-table-column prop="BillNumber" label="运单号码" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="AccountNumber" label="客户账号" align="center"></el-table-column>
            <el-table-column prop="CargoName" label="货物名称" align="center" :show-overflow-tooltip="true"  :formatter ="abc"  ></el-table-column>


            <el-table-column prop="CYNO" label="班次" align="center" :show-overflow-tooltip="true" :formatter = "banci"></el-table-column>
            <el-table-column prop="WayOut" label="运输方式" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Jian" label="件" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column  label="实际重量" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.Aweight  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="计费重量" align="center" :show-overflow-tooltip="true"   >
                <template slot-scope="scope">
                    <span>{{scope.row.Cweight  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="体积" align="center" :show-overflow-tooltip="true"   >
                <template slot-scope="scope">
                    <span>{{scope.row.Volume  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="CargoSize" label="货物尺寸" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="Cypay" label="承运费用" align="center" :show-overflow-tooltip="true" :formatter ="chengyunFei"></el-table-column>
            <el-table-column prop="PayWay" label="结算方式" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="WTNO" label="委托书编号" align="center" :show-overflow-tooltip="true"  :formatter ="weituoNumber"  ></el-table-column>

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
                tableData: [],
                restaurants: [{name:'旺角茶餐厅',value:'刘顺利3'},{name:'新旺角茶餐厅',value: '孟健康'},{name:'旺角茶餐厅',value:'刘顺利'},{name:'旺角茶餐厅',value:'李平安'},{name:'旺角茶',value:'孟小孟'},{name:'旺角茶餐厅',value:'刘顺利2'}],
                CYNumber:'',
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                state222:'',
                CountCompany:'',
                AccountNumber:'',
                time: '',//时间
                StateTime: '',
                EndTime: '',
                loading:true
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
            },

        },
        methods:{
            //承运费运

            chengyunFei(row,colume){
                return row.Cypay == null ? '暂无' : row.Cypay
            },
            weituoNumber(row,colume){
                return row.WTNO  == null ? '暂无': row.WTNO
            },
            abc(row,colume){
                return row.CargoName == null ? '暂无' : row.CargoName
            },
            banci(row,colume){
                return row.CYNO == null ? '暂无' : row.CYNO
            },
            cydanhao(row,colume){
                return row.CYNumber == null ? '暂无' : row.CYNumber
            },

            //刷新
            refresh() {
                this.loading = true;
                this.AccountNumber = '';//客户账号
                this.time = '';
                this.CYNumber = '';
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
                            "承运商",
                            "承运单号",
                            "运单号码",
                            "客户账号",
                            "货物名称",
                            "班次",
                            "运输方式",
                            "件",
                            "实际重量",
                            "计费重量",
                            "体积",
                            "货物尺寸",
                            "承运费用",
                            "结算方式",
                            "委托书编号",


                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "CYCompany",
                            "CYNumber",
                            "BillNumber",
                            "AccountNumber",
                            "CargoName",
                            "CYNO",
                            "WayOut",
                            "Jian",
                            "Aweight",
                            "Cweight",
                            "Volume",
                            "CargoSize",
                            "Cypay",
                            "PayWay",
                            "WTNO",

                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "未录入票数明细表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
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
            getData() {
                let CountCompany = window.localStorage.getItem("CountCompany");
                let PayWay = window.localStorage.getItem("PayWay");
                this.PayWay = PayWay;
                this.CountCompany = CountCompany;
                this.$axios
                    .post(
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/carrierfees/notenterdetails",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            CountCompany: CountCompany,
                            AccountNumber:this.AccountNumber,
                            CYNumber:this.CYNumber,
                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间


                            PayWay: PayWay
                        }
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.ccc = res.data.sum;
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
    .el-table tbody tr:hover>td { background-color: #ccc!important; }
</style>
<style scoped>






    .grid-con-1 .grid-num {
        color: #fff;
    }



    .grid-con-2 .grid-num {
        color: #fff;
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
