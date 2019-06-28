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
                                            v-model="time"
                                            type="daterange"
                                            value-format="yyyy-MM-dd"
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
                                <el-cascader
                                        v-model="StartCity"
                                        :options="areaOptions"
                                        @change="handleItemChange"

                                ></el-cascader>
                            </el-form-item>

                            <el-form-item label="收件城市">
                                <el-cascader
                                        v-model="EndCity"
                                        :options="areaOptions"
                                        @change="handleItemChange2"
                                ></el-cascader>
                            </el-form-item>
                            <el-form-item label="运输方式">
                                <el-select
                                        v-model="WayOut"
                                        placeholder="请选择"
                                        class="handle-select mr10"
                                >
                                    <el-option key="0" label="铁路" value="铁路"></el-option>
                                    <el-option key="1" label="航空" value="航空"></el-option>
                                    <el-option key="2" label="公路" value="公路"></el-option>
                                </el-select>
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
                <el-row >
                    <el-col >
                        <el-row :gutter="24" class="mgb20">
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}" >
                                    <div class="grid-content grid-con-1" >

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">已录入承运费合计</h6>
                                            <div class="grid-num">&yen; {{CyCountMoney|rounding }}</div>

                                        </div>
                                        <div class="grid-img">
                                            <img src="../../assets/img/chengyunshang.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-2" >

                                        <div class="grid-cont-right">
                                            <h6  style="color: #fff">已录入票数合计</h6>
                                            <div class="grid-num">&yen; {{CountPiao}}</div>

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
                                            <div class="grid-num">&yen; {{CountJian}}</div>

                                        </div>
                                        <div  class="grid-img">
                                            <img src="../../assets/img/chudanjianshu.png" alt="">
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                    <div class="grid-content grid-con-4" >

                                        <div class="grid-cont-right">
                                            <h6 style="color: #ffffff;">已录入重量合计</h6>
                                            <div class="grid-num">&yen; {{CountCweight |rounding}}</div>
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
                element-loading-text="拼命加载中……"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                height="410"
                v-loading="loading"
        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="CountCompany" label="站点" align="center"></el-table-column>
<!--
            <el-table-column prop="GetCompany" label="发件省份" align="center" :show-overflow-tooltip="true"></el-table-column>
-->
            <el-table-column prop="CountCity" label="发件城市" align="center"></el-table-column>
            <el-table-column prop="CYCompany" label="承运商" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="PayWay" label="结算方式" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Piao" label="票数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Jian" label="件数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column  label="重量" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.Cweight  | weightGuo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="CYPay" label="承运费" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="WayOut" label="运输方式" align="center" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="ToDepart" label="收货省份" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ToCity" label="收货城市" align="center" :show-overflow-tooltip="true"  ></el-table-column>

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
    import areaOptions from "../../../static/js/area";
    export default {
        data() {
            return {
                areaOptions: areaOptions,

                tableData: [],//table数据
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                time: '',//时间
                StateTime: '',
                EndTime: '',
                restaurants: [{name:'旺角茶餐厅',value:'刘顺利3'},{name:'新旺角茶餐厅',value: '孟健康'},{name:'旺角茶餐厅',value:'刘顺利'},{name:'旺角茶餐厅',value:'李平安'},{name:'旺角茶',value:'孟小孟'},{name:'旺角茶餐厅',value:'刘顺利2'}],
                state2:'',
                loading:true,
                SendCity:'北京',
                ReceiptCity:'上海',
                WayOut:'',
                StartCity:[],
                EndCity:[],
                CountCweight:'',
                CyCountMoney:'',
                CountPiao:'',
                CountJian:''

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
        methods:{
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
                            "站点",
                            "发件城市",
                            "承运商",
                            "结算方式",
                            "票数",
                            "件数",
                            "重量",
                            "承运费",
                            "运输方式",
                            "收货省份",
                            "收货城市",

                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "CountCompany",
                            "CountCity",
                            "CYCompany",
                            "PayWay",
                            "Piao",
                            "Jian",
                            "Piao",
                            "Jian",
                            "Cweight",
                            "CYPay",
                            "WayOut",
                            "ToDepart",
                            "ToCity",

                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "承运商费用统计表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },
            //刷新
            refresh() {
                this.loading = true;
                this.StartCity = [];//客户账号
                this.time = '';
                this.EndCity = [];
                this.WayOut='';
                this.getData();
                this.loading = false;
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
            handleItemChange(val) {
                // 省市区
                this.val = val;

            },
            handleItemChange2(val2) {
                // 省市区
                this.val2 = val2;

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
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/carrierfees/index",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            WayOut:this.WayOut,
                            EndCity:this.EndCity,
                            StartCity:this.StartCity,
                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间

                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.CountCweight  = res.data.CountCweight;
                        this.CyCountMoney = res.data.CyCountMoney;
                        this.CountJian = res.data.CountJian;
                        this.CountPiao =res.data.CountPiao

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
<style scoped>

    .grid-content {
        display: flex;
        align-items: center;
        height: 130px;
    }
    .grid-img {
        flex: 1;
    }
    .grid-cont-right {
        flex: 1;
        margin:0px 80px 0 10px;
        font-size: 14px;
        color: #999;
        text-align: center;
    }


    .grid-num {
        font-size: 16px;
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
