<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 客户收入明细
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-form
                        :inline="true"
                        style="margin: 20px 0 0 0;"
                >
                    <el-row>
                        <el-col>

                            <el-form-item label="运单号">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="Bill"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        :trigger-on-focus="false"
                                        :debounce=0
                                        @select="handleSelect"
                                ></el-autocomplete>
                            </el-form-item>

                            <el-form-item>
                                <img
                                        src="../../assets/img/查询.png"
                                        alt="查询图标"
                                        style="margin:0px  30px 0 10px;"
                                        @click="getData"
                                >
                            </el-form-item>


                            <el-form-item>
                                <el-button style="background:#eee;" :class="isOne ? 'blackDefault' : 'blueActive'"  @click="CLSD(1)">已结算</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="background:#eee;" :class="isWei ? 'blackDefault' : 'blueActive'"   @click="CLSD(0)">未结算</el-button>
                            </el-form-item>

                            <div style="float: right">
                                <el-form-item

                                        label="客户账号："
                                        style="padding: 0px 30px"
                                >
                                    <span>{{AccountNumber}}</span>
                                </el-form-item>

                                <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px" @click="dataExport()">
                                <img src="../../assets/img/刷新.png" alt=""  @click="refresh()">


                            </div>
                        </el-col>
                    </el-row>
                </el-form>

            </div>
            <el-row :gutter="24">
                <el-col :span="isFirst ? 24 :15">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            ref="multipleTable"
                            border
                            v-loading="loading"
                    >
                        <el-table-column
                                type="selection"
                                width="60"
                                align="center"
                        ></el-table-column>

                        <el-table-column

                                label="是否结算"
                                align="center"
                                :show-overflow-tooltip="true"
                                width="100"
                        >
                            <template slot-scope="scope">
                                <span style="padding:10px;color:#000;cursor:pointer;border-radius: 10px;" v-if="scope.row.IsInCome == 0"  v-model="aaa">未结算</span>
                                <span style="padding:15px;color:#000;cursor:pointer;border-radius: 10px;" v-if="scope.row.IsInCome == 1" v-model="aaa">已结算</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="运单号码"
                                align="center"
                                width="120"
                                fixed
                        ></el-table-column>
                        <el-table-column
                                prop="WDQJ"
                                label="温度区间"
                                align="center"
                                fixed
                                :show-overflow-tooltip="true"
                        ></el-table-column>

                        <el-table-column
                                prop="CargoName"
                                label="货物名称"
                                align="center"
                        ></el-table-column>

                        <el-table-column
                                prop="FarOutfei"
                                label="超远费"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="yunFei"
                                label="运费"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="CangchuFei"
                                label="仓储费"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="WDJFei"
                                label="温度计费"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="CarFei"
                                label="专车费"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="LCarFei"
                                label="冷藏车费"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="OtherFei"
                                label="其他费用"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                fixed="right"
                                label="收入合计"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column label="操作" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="small" type="primary" @click.native.prevent="details(scope.row)">详情
                                </el-button>

                            </template>
                        </el-table-column>

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
                </el-col>
                <el-col :span="isFirst ? 0 : 9">
                    <div style="border: 1px solid #ccc">
                        <div
                                style="padding: 10px;"
                                class="rightContent"
                        >
                            <div>

                                <span style="color:#333;font-size: 18px;font-weight: 800">运单号：{{BillNumber}}</span>
                                <div style="float: right;padding-right:10px;font-family: cursive;font-weight: 800;display:flex;align-items:center;">
                                    <span><img src="../../assets/img/user.png"
                                               style="float:left;margin:0 5px 0 0;"></span>
                                    <span>{{GetName}}</span>
                                </div>

                            </div>
                            <div>
                                <span style="font-family: cursive;">2019/12/18</span>
                                <div style="float: right;font-family: cursive ;padding-right:23px;font-weight: 800;display:flex;align-items:center;">
                                    <span><img src="../../assets/img/car.png"
                                               style="float:left;margin:0 5px 0 0;"></span>
                                    <span>火车</span>

                                </div>

                            </div>
                            <hr>
                            <div class="detailesContent">
                                <div style="margin-top: 10px">

                                    <el-button
                                            type="success"
                                            plain
                                            :loading="true"
                                    >货物信息
                                    </el-button>

                                    <ul style="text-indent: 20px;height:30px;line-height:30px;display: inline-table"
                                        class="rightLI">
                                        <li>货物名称：</li>
                                        <li>件数：1</li>
                                        <li>体积：1</li>
                                        <li>实际重量：{{Aweight}}</li>
                                        <li>计费重量：{{Cweight}}</li>
                                    </ul>
                                </div>
                                <div>
                                    <el-button
                                            type="primary"
                                            plain
                                            :loading="true"
                                    >包装信息
                                    </el-button>
                                    <div style="text-indent: 40px;margin: 10px 0;">
                                        <span style="text-indent: 20px;margin: 20px 0;font-size: 12px;">包装材料：{{InCity}}</span>
                                        <span style="text-indent: 20px;padding: 20px 20px;font-size: 12px;">包装尺寸：{{CargoSize}}</span>
                                    </div>


                                </div>
                                <div style="margin-top: 15px">
                                    <el-button
                                            type="warning"
                                            plain
                                            :loading="true"
                                    >发件人信息
                                    </el-button>

                                    <p style="text-indent: 20px;margin: 20px 0;font-size: 12px">
                                        发件人公司：{{SendsCompany}}</p>
                                    <span style="margin: 20px 0 20px 20px;  color:#666;font-size: 12px;">发件人：{{SendsName}}</span>
                                    <span style="margin: 0px 20px 20px 0px;float: right;  color:#666; font-size: 12px;">发件人联系方式：{{SendsTelephone}}</span>
                                    <p style="text-indent: 20px;margin: 20px 0;font-size: 12px">
                                        发件人地址：{{SendsAddress}}</p>

                                </div>
                                <div style="margin-top: 15px">
                                    <el-button
                                            type="primary"
                                            plain
                                            :loading="true"
                                    >收件人信息
                                    </el-button>

                                    <p style="text-indent: 20px;margin: 20px 0;font-size: 12px">收件人公司：{{GetCompany}}</p>
                                    <span style="margin: 20px 0 20px 20px;  color:#666;font-size: 12px;">收件人：{{GetName}}</span>
                                    <span style="margin: 0px 20px 20px 0px;float: right;  color:#666; font-size: 12px;">收件人联系方式：{{GetTelephone}}</span>
                                    <p style="text-indent: 20px;margin: 20px 0;font-size: 12px">收件人地址：{{GetAddress}}</p>


                                </div>
                                <div style="margin: 15px 0">
                                    <el-button
                                            type="danger"
                                            plain
                                            :loading="true"
                                    >投保信息
                                    </el-button>
                                    <div style="margin-top: 15px">
                                        <span style="margin: 20px 0 20px 20px;  color:#666;font-size: 12px;">是否投保：{{SafeItem}}</span>
                                        <span style="margin: 0px 20px 20px 0px;float: right;  color:#666; font-size: 12px;">投保金额：{{SafeMoney}}</span>
                                    </div>

                                </div>
                                <div style="color:#999999;font-size: 12px;height: 40px;line-height: 40px;">注意事项……</div>

                            </div>
                        </div>

                    </div>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOne: true, // 判断已结算  点击次数
                isWei: true,// 判断未结算  点击次数
                tableData: [],
                isFirst: true,
                restaurants: [{name: '新旺角茶餐厅', value: '10000015456'}, {
                    name: '旺角茶餐厅',
                    value: '100000154578'
                }, {name: '旺角茶餐厅', value: '1000004578562'}],
                state2: '',
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数l
                loading: true,
                IsInCome:'',
                BillNumber: '',//运单号码
                GetName: '',
                Jian: '',
                Aweight: '',
                Cweight: '',
                InCity: '',
                CargoSize: '',
                SendsCompany: '',
                SendsName: '',
                SendsTelephone: '',
                SendsAddress: '',
                GetAddress: '',
                GetTelephone: '',
                GetCompany: '',
                SafeItem: '',
                SafeMoney: '',
                Bill: '',
                AccountNumber: '',
                multipleSelection: [],
                aaa: '', // 结算状态


            };
        },
        created() {
            this.getData();
        },
        methods: {
            //刷新
            refresh(){
                this.Bill= '';//yundanhaoma
                this.isOne = true;
                this.isWei = true;
                this.aaa = '';
                this.getData();
            },
            //已结算

            CLSD(val){
                /**
                 * 咱们只需要在  console.log('我要已结算的数据')  这些个位置
                 *   改变一下  aaa值   走一下接口  页面自己会渲染
                 *   这就是mvvm    数据  和 视图  同步更新
                 *
                 *   就完事了
                 *
                 *
                 * **/
                if(Number(val) === 1){  //已结算
                    // isOne  true 第一次点   false  第二次点
                    this.isWei = true;
                    if(this.isOne){
                        // 筛选已结算  请求接口
                        this.aaa =1;

                        this.getData()
                        console.log('我要已结算的数据')
                    }else{
                        //  所有的数据
                        console.log('我要所有的数据')
                        this.aaa ='';
                        this.getData();
                    }
                    this.isOne = !this.isOne;
                }else{    // 未结算
                    this.isOne = true;
                    if(this.isWei){
                        // 筛选未结算  请求接口
                        this.aaa =0;
                        this.getData();
                        console.log('我要未结算的数据')
                    }else{
                        //  所有的数据
                        console.log('我要所有的数据')
                        this.aaa ='';
                        this.getData();
                    }
                    this.isWei = !this.isWei;
                }

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
                            "是否结算",
                            "运单号码",
                            "货物名称",
                            "温度区间",
                            "超远费",
                            "运费",
                            "仓储费",
                            "温度计费",
                            "专车费",
                            "冷藏车费",
                            "其他费用",
                            "收入合计",

                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "IsInCome",
                            "BillNumber",
                            "CargoName",
                            "WDQJ",
                            "FarOutfei",
                            "yunFei",
                            "CangchuFei",
                            "WDJFei",
                            "CarFei",
                            "LCarFei",
                            "OtherFei",
                            "BillNumber",//收入合计

                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "客户收入明细表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },
            details(val) {
                this.isFirst = false;
                this.BillNumber = val.BillNumber; // zhe就是
                this.GetName = val.GetName;
                this.Jian = val.Jian;
                this.Aweight = val.Aweight;
                this.Cweight = val.Cweight;
                this.InCity = val.InCity;
                this.CargoSize = val.CargoSize;
                this.SendsCompany = val.SendsCompany;
                this.SendsName = val.SendsName;
                this.SendsTelephone = val.SendsTelephone;
                this.SendsAddress = val.SendsAddress;
                this.GetCompany = val.GetCompany;
                this.GetName = val.GetName;
                this.GetTelephone = val.GetTelephone;
                this.GetAddress = val.GetAddress;
                this.SafeItem = val.SafeItem;
                this.SafeMoney = val.SafeMoney

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
            handleCurrentChange(val) {
                this.loading = true;
                this.cur_page = val;
                this.getData();
            },
            handleSelect(item) {
                console.log(item);
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
                let AccountNumber = window.localStorage.getItem("AccountNumber");
                this.AccountNumber = AccountNumber;
                this.$axios
                    .post(
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/statistical/customedatails",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            AccountNumber: AccountNumber,
                            Bill:this.Bill, //运单号码
                            IsInCome: this.aaa // 这个就是  你传的  结算状态  问下海宁是传啥   比方说IsInCome这个给他传1  他给你已结算的数据 传0  他给你未结算的  传个100万给你
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
<style scoped>
    ui,
    li {
        list-style: none;
        float: left;
        margin-left: 20px;
    }

    .rightContent div {
        margin-bottom: 10px;
    }

    .rightContent span {
        color: #333;
        font-size: 14px;
    }

    .detailesContent p {
        color: #666;
        font-size: 16px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .rightLI li {
        font-size: 12px !important;
    }

    .pointer {
        cursor: pointer;
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
    .blackDefault{
        background: #eee!important;
        color:#000;

    }
    .blueActive{
        background: #00d1b2!important;
        color:#fff;
    }
</style>
