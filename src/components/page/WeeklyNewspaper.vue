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
                                    <el-input style="width: 120px;"
                                    v-model="AccountNumber"></el-input>
                                </el-form-item>
                                <el-form-item label="销售员">
                                    <el-input style="width: 120px;"  v-model="SaleName" ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="block">

                                        <el-date-picker
                                                v-model="EndTime"
                                                type="datetime"
                                                placeholder="选择截止时间"
                                                value-format="yyyy-MM-dd"
                                        >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>

                                <img
                                        src="../../assets/img/查询.png"
                                        alt="查询图标"
                                        style="margin-left: 10px;margin-top: 3px;"
                                        @click="getData"
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
                                                    <h4 style="color: #fff">{{LastWeek}}周收入 <font style="padding: 0 20px">{{CountLastMoney}}元</font></h4>
                                                    <h4 style="color: #fff">{{ThisWeek}}周收入 <font style="padding: 0 20px">{{CountThisMoney}}元</font></h4>

                                                </div>
                                                <div class="grid-imgw">
                                                    <h4 style="color: #fff">差额</h4>
                                                    <h4 style="color: #fff">{{CountChae}}元</h4>

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
                                            @click="refresh()"
                                    >
                                    <img
                                            src="../../assets/img/导出.png"
                                            alt
                                            style="margin: 0 20px"
                                            @click="dataExport()"
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
                    v-loading="loading"

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
                        prop="AccountNumber"
                        label="客户账号"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                        prop="SaleName"
                        label="销售员"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"
                ></el-table-column>

                <el-table-column
                        prop="UnitName"
                        label="公司名称"
                        align="center"
                        :show-overflow-tooltip="true"
                        fixed="right"
                ></el-table-column>
                <el-table-column
                        prop="CompanyType"
                        label="客户类型"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="UniteCode"
                        label="业务类型"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="CountType"
                        label="结算类型"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="LastMoney"
                        label="上周收入"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="ThisMoney"
                        label="本周收入"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>
                <el-table-column
                        prop="Chae"
                        label="差额"
                        align="center"
                        fixed="right"
                        :show-overflow-tooltip="true"

                ></el-table-column>

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
                EndTime:'',
                AccountNumber:'',
                SaleName:'',
                loading:true,
                tableData: [

                ],
                CountChae:'',
                CountLastMoney: '',
                CountThisMoney:'',
                LastWeek:'',
                ThisWeek:'',
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                activeName: "second",
                multipleSelection: [],

            };
        },
        created() {
         this.getData()
        },
        methods:{    //导出   导出时需要依赖xlsx file-saver Blob.js  Export2Excel
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
                            "销售员",
                            "公司名称",
                            "客户类型",
                            "业务类型",
                            "结算类型",
                            "上周收入",
                            "本周收入",
                            "差额",

                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "AccountNumber",
                            "SaleName",
                            "UnitName",
                            "CompanyType",
                            "UniteCode",
                            "CountType",
                            "LastMoney",
                            "ThisMoney",
                            "Chae",

                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "周报列表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },

            //刷新
            refresh(){
             this.AccountNumber='';//客户账号this.EndTime='';
             this.SaleName='';
             this.getData()
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
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/projectweekly/weeklynewspaper",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            AccountNumber: this.AccountNumber,//客户账号
                            EndTime:this.EndTime,
                            SaleName:this.SaleName

                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.loading = false;
                        this.ccc = res.data.sum;
                        this.CountLastMoney = res.data.CountLastMoney;
                        this.CountThisMoney = res.data.CountThisMoney;
                        this.LastWeek =res.data.LastWeek;
                        this.ThisWeek =res.data.ThisWeek;
                        this.CountChae =res.data.CountChae;

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