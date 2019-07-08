<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 客户支出统计列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="支出" name="first">
                            <el-row :gutter="24">
                                <el-col :span="18">
                                    <p style="font-size: 18px;color:#333;margin: 60px 0 60px ;font-weight: 800">支出趋势</p>
                                    <div id="eight" style="width:100%;height:400px;"></div>
                                </el-col>
                                <el-col :span="6" style="padding-left: 35px">
                                    <div class="block">
                                        <el-date-picker
                                                v-model="value6"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                    <p style="font-size: 18px;color:#333;margin: 30px 0 60px ;font-weight: 800">
                                        大客戶排名</p>
                                    <ul style="padding: 0;width: 100%;" class="rightList">
                                        <li>
                                            <img src="../../assets/img/大客户排名第一.png" alt="">
                                            <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                                            <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                                        </li>
                                        <li>
                                            <img src="../../assets/img/大客户排名第一.png" alt="">
                                            <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                                            <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                                        </li>
                                        <li>
                                            <img src="../../assets/img/大客户排名第一.png" alt="">
                                            <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                                            <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                                        </li>
                                    </ul>

                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="EXCEL" name="second">
                            <div>

                                <div class="">
                                    <div class="handle-box">
                                        <el-form :inline="true" style="margin: 20px 0 0 0;">
                                            <el-row>
                                                <el-col>
                                                    <el-form-item label="公司名称">
                                                        <el-input v-model="Company "></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="客户账号">
                                                        <el-input v-model="AccountNumber"></el-input>
                                                    </el-form-item>


                                                </el-col>
                                                <el-col>
                                                    <el-form-item label="结算方式">
                                                        <el-select
                                                                v-model="select_cate"
                                                                placeholder="请选择"
                                                                class="handle-select mr10"

                                                        >
                                                            <el-option key="0" label="月结" value="月结"></el-option>
                                                            <el-option key="1" label="现金" value="现金"></el-option>

                                                        </el-select>
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


                                                    <!--     <el-form-item>
                                                           <el-button style="background:#eee;" >已结算</el-button>
                                                         </el-form-item>
                                                         <el-form-item>
                                                           <el-button style="background:#eee;" >未结算</el-button>
                                                         </el-form-item>-->

                                                    <img src="../../assets/img/查询.png" alt="查询图标"
                                                         style="margin-left: 10px;" @click="getData">
                                                    <div style="float: right">
                                                        <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px"
                                                             @click="dataExport()">
                                                        <img src="../../assets/img/刷新.png" alt="" @click="refresh()">

                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-form>
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
                                        <el-table-column prop="AccountNumber" label="客户账号"
                                                         align="center" class-name="curstomNum"
                                                         label-class-name="aaa"></el-table-column>
                                        <el-table-column prop="UnitName" label="公司名称" align="center"
                                                         :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="CountType" label="结算类型" align="center"></el-table-column>
                                        <!--
                                                                                <el-table-column prop="BillNumber" label="是否结算" align="center" :show-overflow-tooltip="true"></el-table-column>
                                        -->
                                        <el-table-column prop="BillNumber" label="车辆支出" align="center"
                                                         :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column label="取件费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.TakePay |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="发货费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.TakeOutPay |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="干冰费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.TakeGBPay |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="TakePackagePay" label="包装费" align="center"
                                                         :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column label="派送费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.NetPsPay |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="提货费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.NetTHPay |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="返箱费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.BBackMoney |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="返箱车费" align="center" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.BBCarMoney |rounding}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="BillNumber" label="支出合计" align="center"
                                                         :show-overflow-tooltip="true"></el-table-column>

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
</style>


<script>
    import echarts from 'echarts';

    export default {
        data() {
            return {
                loading: true, //表格加载loading
                Company: '',
                time: '',
                StateTime: '',
                EndTime: '',
                AccountNumber: '',
                select_cate: "", //运单状态
                tableData: [],
                value6: "",
                option: [],
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                activeName: "first",

                multipleSelection: [],

                restaurants: [{name: '旺角茶餐厅', value: '刘顺利3'}, {name: '新旺角茶餐厅', value: '孟健康'}, {
                    name: '旺角茶餐厅',
                    value: '刘顺利'
                }, {name: '旺角茶餐厅', value: '李平安'}, {name: '旺角茶', value: '孟小孟'}, {name: '旺角茶餐厅', value: '刘顺利2'}],
                state2: '',


            }
        },
        created() {
            this.getData();
        },
        mounted() {
            var eight = echarts.init(document.getElementById('eight'));
            eight.setOption({
                backgroundColor: '#f3f3f4',
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });

            window.onresize = eight.resize;  // 基于准备好的dom，初始化echarts实例
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
                            "车辆支出",
                            "取件费",
                            "发货费",
                            "干冰费",
                            "包装费",
                            "派送费",
                            "提货费",
                            "返箱费",
                            "返箱车费",
                            "支出合计",

                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "AccountNumber",
                            "UnitName",
                            "CountType",
                            "BillNumber",
                            "TakePay",
                            "TakeOutPay",
                            "TakeGBPay",
                            "TakePackagePay",
                            "NetPsPay",
                            "NetTHPay",
                            "BBackMoney",
                            "BBCarMoney",
                            "BillNumber",


                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "客户支出统计列表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },
            //刷新
            refresh() {
                this.loading = true;
                this.AccountNumber = '';//客户账号
                this.time = '';
                this.Company = '';
                this.select_cate = '',
                    this.getData();
                this.loading = false;
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
                // // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                this.$axios
                    .post(
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/statistical/customerspending",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            AccountNumber: this.AccountNumber,//客户账号
                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间
                            Company: this.Company,
                            Type: 'Excel',
                            PayWay: this.select_cate, //结算类型
                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.AccountNumber = '';
                        this.StateTime='';
                        this.time = '';
                        this.Company = '';
                        this.PayWay = '';
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            jumpDetails(row, column, cell, event) {
                console.log(column.label, 0)
                if (column.label == "客户账号") {
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
    }
</script>
