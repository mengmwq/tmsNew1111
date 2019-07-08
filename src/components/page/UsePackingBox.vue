<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 包装箱使用统计表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="24">
                <el-col>
                    <p style="font-size: 14px;color:#333;  ;padding-left:5px;font-weight: 800;border-left: 3px solid green;font-family: cursive;">
                        包装箱使用</p>
                    <div style="float: right">
                        <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px" @click="dataExport()">
                        <img src="../../assets/img/刷新.png" alt="" @click="refresh()">
                    </div>
                </el-col>
                <el-col :span="15">

                    <div class="handle-box">

                        <el-form :inline="true" style="margin: 0 0 0 0;">
                            <el-row>
                                <el-col>
                                    <el-form-item  label="委托时间">
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="time"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="箱型" >
                                        <el-autocomplete
                                                class="inline-input"
                                                v-model="PackageName"
                                                :fetch-suggestions="querySearch"
                                                placeholder="请输入内容"
                                                :trigger-on-focus="false"
                                                :debounce=0
                                                @select="handleSelect"
                                                style=" width:100px"
                                        ></el-autocomplete>


                                    </el-form-item>
                                    <el-form-item label="温区">
                                        <el-autocomplete
                                                class="inline-input"
                                                v-model="WDQJ"
                                                :fetch-suggestions="querySearch2"
                                                placeholder="请输入内容"
                                                :trigger-on-focus="false"
                                                :debounce=0
                                                @select="handleSelect"
                                                style=" width:120px"
                                        ></el-autocomplete>


                                    </el-form-item>
                                    <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;"
                                         @click="getData">
                                    <!-- <div style="float: right">

                                         <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                         <img src="../../assets/img/刷新.png" alt="" >

                                     </div>-->
                                </el-col>
                            </el-row>
                        </el-form>

                    </div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            ref="multipleTable"
                            border
                            element-loading-text="拼命加载中……"
                            element-loading-background="rgba(0, 0, 0, 0.7)"

                            @selection-change="handleSelectionChange"
                            v-loading="loading"


                            height="500"
                    >
                        <el-table-column type="selection" width="60" align="center"></el-table-column>

                        <el-table-column prop="StartDepart" label="始发省份" align="center"
                                         :show-overflow-tooltip="true"  :formatter="addtimesta"></el-table-column>

                        <el-table-column prop="StartCity" label="始发城市" align="center" :formatter="addtimesta2"
                                         :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="PackageName" label="箱型" align="center"></el-table-column>
                        <el-table-column prop="WDQJ" label="温度区间" align="center"
                                         :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Jian" label="件数" align="center"
                                         :show-overflow-tooltip="true"></el-table-column>

                    </el-table>
                </el-col>
                <el-col :span="9" style="margin-top:0px;border: 1px solid #ccc;height:500px;">

                    <el-row :gutter="24">
                        <el-col>
                            <div style="font-size: 14px;padding: 10px 5px">件数合计：{{CountJian}}</div>
                        </el-col>
                        <el-col>
                            <div id="eight" style="width:99%;height:200px;margin-bottom: 20px;"></div>
                            <div id="eightBottom" style="width:99%;height:200px;"></div>
                        </el-col>
                    </el-row>

                </el-col>

            </el-row>
        </div>
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
    import echarts from 'echarts';
    export default {
        name: "UsePackingBox",
        data() {
            return {

                multipleSelection: [],
                CountJian:'',
                tableData: [],//table数据
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                time: '',//时间
                StateTime: '',
                EndTime: '',
                loading: true, //表格加载loading
                SendCity: '',
                ReceiptCity: '',
                WDQJ:'',
                WDQJ1:'',
                WDJian:'',
                PackageName:'',
                PackageJian:'',
                PackageXX:'',
                csvS : [],
            };

        },
        //chuangjan
        created() {
            this.getData();
        },

        watch: {
            PackageName: {
                handler: function () {
                    this.csvS = [];//这是定义好的用于存放下拉提醒框中数据的数组
                    var len = this.PackageXX.length;//csvList是页面初始化时得到的初始全部数据
                    var arr = [];
                    for (var i = 0; i < len; i++) {//根据输入框中inputName的值进行模糊匹配
                        if (this.PackageXX[i].indexOf(this.PackageName) >= 0) {
                            arr.push(this.PackageXX[i]);//符合条件的值都放入arr中
                        }
                    }
                    // console.log(arr);

                    //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
                    for (var i = 0; i < arr.length; i++) {
                        var obj = {value: ""};
                        obj.value = arr[i];
                        this.csvS.push(obj);
                    }
                }
            },
            WDQJ: {
                handler: function () {
                    this.csvS = [];//这是定义好的用于存放下拉提醒框中数据的数组
                    var len = this.WDQJ1.length;//csvList是页面初始化时得到的初始全部数据
                    var arr = [];
                    for (var i = 0; i < len; i++) {//根据输入框中inputName的值进行模糊匹配
                        if (this.WDQJ1[i].indexOf(this.WDQJ) >= 0) {
                            arr.push(this.WDQJ1[i]);//符合条件的值都放入arr中
                        }
                    }
                    // console.log(arr);

                    //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
                    for (var i = 0; i < arr.length; i++) {
                        var obj = {value: ""};
                        obj.value = arr[i];
                        this.csvS.push(obj);
                    }
                }
            },

        },
        methods:{
            //始发省份暂无
            addtimesta(row, colume) {
                return row.StartDepart == null ? '暂无' : row.StartDepart;
            },
            //始发城市暂无
            addtimesta2(row, colume) {
                return row.StartCity == null ? '暂无' : row.StartCity;
            },
            //客户账号模糊搜索
            querySearch(queryString, cb) {
                var csvS = this.csvS;
                console.log(csvS,456);
                cb(csvS);
              /*  var restaurants = this.PackageXX; // 所有数据

                let arr = [];
                restaurants.forEach(item => {
                    let obj ={value: item};
                    arr.push(obj);
                })
                console.log(arr,666)
                var results = queryString
                    ? arr.filter(this.createFilter(queryString))
                    : arr;
                // 调用 callback 返回建议列表的数据
                cb(results);*/
            },
            createFilter(queryString) {
                console.log(queryString)
                return restaurant => {
                    return (
                        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                    );
                };
            },
            handleSelect(item) {
                console.log(item);
            },
            //客户账号模糊搜索
            querySearch2(queryString, cb) {
                var csvS = this.csvS;
                console.log(csvS,456);
                cb(csvS);
             /*   var restaurants = this.WDQJ1; // 所有数据

                let arr = [];
                restaurants.forEach(item => {
                    let obj ={value: item};
                    arr.push(obj);
                })
                console.log(arr,666)
                var results = queryString
                    ? arr.filter(this.createFilter(queryString))
                    : arr;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                console.log(queryString)
                return restaurant => {
                    return (
                        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                    );
                };
            },
            handleSelect(item) {
                console.log(item);*/
            },
            //刷新
            refresh() {
                this.loading = true;
                this.WDQJ = '';//温区
                this.time = '';
                this.PackageName = '';
                this. cur_page= 1;//当前页
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
                            "始发省份",
                            "始发城市",
                            "箱型",
                            "温度区间",
                            "件数",

                        ];
                        // 这就是 对应的 字段
                        const filterVal = [
                            "StartDepart",
                            "StartCity",
                            "PackageName",
                            "WDQJ",
                            "Jian",

                        ];
                        const list = res;
                        this.loading = false;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, "包装箱使用表");  // 这是  excel文件名
                    });
                });

            },
            formatJson: function (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
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
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/boxstatistics/usepackingbox",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            PackageName: this.PackageName,//箱型
                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间
                            WDQJ: this.WDQJ
                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.CountJian = res.data.CountJian;
                        this.ccc = res.data.sum;
                        this.WDQJ1 = res.data.WDQJ;
                        this.WDJian = res.data.WDJian;
                        this.PackageJian = res.data.PackageJian;
                        this.PackageXX = res.data.PackageXX;
                        this.time='';
                        this.PackageName= '';
                        this.WDQJ='';

                        this.loading = false;
                        var eight = echarts.init(document.getElementById('eight'));
                        var eightBottom = echarts.init(document.getElementById('eightBottom'));
                        eight.setOption({
                            backgroundColor: '#f3f3f4',
                            title: {
                                text: '箱型',
                                textStyle:{
                                    color:'#0DB9F2',        //颜色
                                    fontStyle:'normal',     //风格
                                    fontWeight:'normal',    //粗细
                                    fontFamily:'Microsoft yahei',   //字体
                                    fontSize:14,     //大小
                                    align:'center'   //水平对齐
                                },
                            },

                            xAxis: {
                                type: 'category',
                                data: this.PackageXX,
                                boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
                                axisLabel: {
                                    interval:0,
                                    rotate:40
                                },
                                textStyle: {
                                    //更改坐标轴文字颜色
                                    fontSize : 10      //更改坐标轴文字大小
                                }
                            },
                            tooltip: {
                                show: true,
                                formatter: "{b} </br>{c}件",
                                trigger: 'axis'
                            },
                            yAxis: {
                                type: 'value',
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed',
                                        color: '#DDD'
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value} '
                                },
                                axisPointer: {
                                    snap: true
                                }
                            },
                            series: [{
                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        color: {
                                            type: 'linear',

                                            colorStops: [{
                                                offset: 0,
                                                color: '#FFCAD4' // 0% 处的颜色
                                            }, {
                                                offset: 0.4,
                                                color: '#F58080' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#F58080' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        },
                                        shadowColor: 'rgba(245,128,128, 0.5)',
                                        shadowBlur: 10,
                                        shadowOffsetY: 7
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 9, [{
                                            offset: 0,
                                            color: 'rgba(0, 136, 212, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(0, 136, 212, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                data: this.PackageJian,
                                type: 'line',
                                smooth: true
                            }]
                        });
                        eightBottom.setOption({
                            backgroundColor: '#f3f3f4',
                            title: {
                                text: '温度区间',
                                textStyle:{
                                    color:'#F27CDE',      //颜色
                                    fontStyle:'normal',     //风格
                                    fontWeight:'normal',    //粗细
                                    fontFamily:'Microsoft yahei',   //字体
                                    fontSize:14,     //大小
                                    left:'20%'   //水平对齐
                                },

                            },

                            xAxis: {
                                type: 'category',
                                data: this.WDQJ1,
                                boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
                                axisLabel: {
                                    interval:0,
                                    rotate:40,
                                    lineStyle: {
                                        color: "#999"
                                    },
                                    textStyle: {
                                       //更改坐标轴文字颜色
                                        fontSize : 10      //更改坐标轴文字大小
                                    }
                                },
                            },
                            tooltip: {
                                show: true,
                                formatter: "{b} </br>{c}件",
                                trigger: 'axis'

                            },
                            yAxis: {
                                type: 'value',
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed',
                                        color: '#DDD'
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                },
                                axisPointer: {
                                    snap: true
                                }
                            },
                            series: [{
                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        color: {
                                            type: 'linear',

                                            colorStops: [{
                                                offset: 0,
                                                color: '#AAF487' // 0% 处的颜色
                                            },
                                                {
                                                    offset: 0.4,
                                                    color: '#47D8BE' // 100% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#47D8BE' // 100% 处的颜色
                                                }
                                            ],
                                            globalCoord: false // 缺省为 false
                                        },
                                        shadowColor: 'rgba(71,216,190, 0.5)',
                                        shadowBlur: 10,
                                        shadowOffsetY: 7
                                    },

                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 9, [{
                                            offset: 0,
                                            color: 'rgba(0, 136, 212, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(0, 136, 212, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                // itemStyle: {
                                //     normal: {
                                //         color: 'rgb(0,136,212)',
                                //         borderColor: 'rgba(0,136,212,0.2)',
                                //         borderWidth: 12
                                //
                                //     }
                                // },
                                data: this.WDJian,
                                type: 'line',
                                smooth: true,
                                color: 'rgb(137,189,27)',
                            }]
                        });
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

    }
</script>
<style>
    .el-table thead {
        color: #909399!important;
        font-weight: 500;
    }
 /*   .el-table th, .el-table tr {
        background-color: #ccc!important;
    }*/
 .el-table tbody tr:hover>td { background-color: #ccc!important; }
</style>
<style scoped>
    input.el-input__inner {
        width: 100px;
    }
 /* table{
      border:1px solid @hhfeh
  }*/
</style>