<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 承运商未录入统计列表
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

                            <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;"
                                 @click="getData">
                        </el-col>


                    </el-row>
                </el-form>


            </div>
            <el-row :gutter="24">

                <el-col :span="12">
                    <div >
                        <div style="padding: 10px;" class="rightContent">
                            <div>

                                <span style="color:#333;font-size: 16px;font-weight: 600;border-left: 3px solid deeppink">&nbsp各站点占比情况</span>

                                <el-row >
                                    <el-col>
                                        <el-row :gutter="24" style="margin: 30px 0px">

                                            <el-col :span="10" :offset="2" >
                                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                                    <div class="grid-content grid-con-3">
                                                        <div class="grid-img">
                                                            <img src="../../assets/img/yueheji.png" alt="">
                                                        </div>
                                                        <div class="grid-cont-right">
                                                            <h6 style="color: #fff">月结合计</h6>
                                                            <div class="grid-num">&yen; {{CountYJ}}</div>

                                                        </div>
                                                        <div class="grid-cont-right2">
                                                            <h6 style="color: #fff">占比</h6>
                                                            <div class="grid-num2">{{YJbfb}}</div>

                                                        </div>


                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-card shadow="hover" :body-style="{padding: '0px'}">
                                                    <div class="grid-content grid-con-2">
                                                        <div class="grid-img">
                                                            <img src="../../assets/img/xianjin.png" alt="">
                                                        </div>
                                                        <div class="grid-cont-right">
                                                            <h6 style="color: #fff">现金合计</h6>
                                                            <div class="grid-num">&yen; {{CountXJ}}</div>

                                                        </div>
                                                        <div class="grid-cont-right2">
                                                            <h6 style="color: #fff">占比</h6>
                                                            <div class="grid-num2">{{XJbfb}}</div>

                                                        </div>


                                                    </div>
                                                </el-card>
                                            </el-col>

                                        </el-row>

                                    </el-col>
                                </el-row>

                            <div style="border-top:1px solid #eee;margin:10px 0"></div>
                                <div id="eight22" style="width:100%;height:350px;padding-top:20px"></div>
                            </div>

                        </div>







                    </div>
                </el-col>
                <el-col :span="12">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            ref="multipleTable"
                            border
                            element-loading-text="拼命加载中……"
                            element-loading-background="rgba(0, 0, 0, 0.5)"
                            height="600"
                            v-loading="loading"
                            show-summary
                            @cell-click="jumpDetails"
                            @selection-change="handleSelectionChange"

                    >
                        <el-table-column type="selection" width="60" align="center"></el-table-column>
<!--
                        <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
-->
                        <el-table-column prop="CountCompany" label="站点" align="center"></el-table-column>
                        <el-table-column prop="CountCity" label="城市" align="center"></el-table-column>
                        <el-table-column prop="PayWay" label="结算方式" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Piao" label="票数" align="center" :show-overflow-tooltip="true"      class-name="curstomNum"
                                         label-class-name="aaa"></el-table-column>


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
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
    import echarts from 'echarts';
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
                CountXJ:'',
                loading:true,
                CountYJ:'',
                YJbfb:'',
                XJbfb:''

            };
        },
        created() {
            this.getData();
        },
        mounted(){
            var eight22 = echarts.init(document.getElementById('eight22'));
            eight22.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['月结','现金'],
                    icon: "circle",
                    itemWidth: 20,  // 设置宽度
                    itemHeight: 8, // 设置高度
                    right:'0%'


                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                "dataZoom": [{
                    "show": true,
                    "height": 10,
                    "xAxisIndex": [
                        0
                    ],
                    bottom: 0,
                    "start": 10,
                    "end": 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle:{
                        color:"#000",

                    },
                    textStyle:{
                        color:"#000"},
                    borderColor:"#90979c"


                }, {
                    "type": "inside",
                    "show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35
                }],
                xAxis: [{
                    type: 'category',
                    data: ['北京', '长沙', '成都', '云南', '西藏', '上海'],
                    axisLine:{
                        lineStyle:{
                            color:'#8FA3B7',//y轴颜色
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#6D6D6D',
                        }
                    },
                    axisTick: {show: false}
                }],
                yAxis: [{
                    type: 'value',
                    splitLine:{show: false},
                    //max: 700,
                    splitNumber: 3,
                    axisTick: {show: false},
                    axisLine:{
                        lineStyle:{
                            color:'#8FA3B7',//y轴颜色
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#6D6D6D',
                        }
                    },
                }],
                series: [

                    {
                        name: '月结',
                        type: 'bar',
                        barWidth: '40%',
                        itemStyle: {
                            normal: {
                                color: '#FAD610'
                            }
                        },
                        stack: '信息',
                        data: [320, 132, 101, 134, 90, 30]
                    },

                    {
                        name: '现金',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#4DB3F5'
                            }
                        },
                        stack: '信息',
                        data: [150, 132, 201, 154, 90, 130]
                    }
                ]
            });
        },
        methods:{

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
            jumpDetails(row, column, cell, event) {
                // console.log(row,column.label,222);
                if (column.label == "票数") {
                    window.localStorage.setItem("CountCompany", row.CountCompany);  window.localStorage.setItem("PayWay", row.PayWay);
                    this.$router.push("/NotEnterDetails");
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
                       "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/carrierfees/carriernotrecorded",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数

                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间

                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;

                        this.ccc = res.data.sum;
                        this.CountYJ = res.data.CountYJ;
                        this.CountXJ = res.data.CountXJ;
                        this.XJbfb = res.data.XJbfb;
                        this.YJbfb = res.data.YJbfb;
                        this.time = '';

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
        color: #00d1b2;
    }
</style>
<style scoped>

    .grid-content {
        display: flex;
        align-items: center;
        height: 120px;
    }
    .grid-img {
        margin:0px 0px 0 10px;
    }
    .grid-cont-right {
        flex: 1;
        margin:0px 30px 0 30px;
        font-size: 14px;
        color: #999;

        border-right: 1px solid #fff!important;
    }
    .grid-cont-right2 {
        flex: 1;

        font-size: 14px;
        color: #999;


    }

    .grid-num2 {
        font-size: 16px;

        margin: 5px 0px;
        color: #000;

    }
    .grid-num{
        font-size: 20px;
        font-weight: 800;
        margin: 5px 0px;
        color: #000!important;

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
        background-color: #f8ac59;
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
