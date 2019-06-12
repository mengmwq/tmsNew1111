<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 箱型统计表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container" style="margin:20px 0px">

            <el-row :gutter="24">
                <el-col>
                    <p style="font-size: 14px;color:#333;  ;padding-left:5px;font-weight: 800;border-left: 3px solid green">
                        箱型统计</p>
                </el-col>
                <el-col>
                    <el-form :inline="true" style="margin: 20px 0 0 0;">
                        <el-row>
                            <el-col>
                                <el-form-item label="委托时间">
                                    <div class="block">
                                        <el-date-picker
                                                v-model="value6"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>


                                <el-form-item label="箱型">
                                    <el-input v-model="SendCity"></el-input>

                                </el-form-item>
                                <el-form-item label="客户账号">
                                    <el-input v-model="ReceiptCity"></el-input>

                                </el-form-item>
                                <el-form-item label="始发地">
                                    <el-input v-model="ReceiptCity"></el-input>

                                </el-form-item>
                                <el-form-item label="目的地">
                                    <el-input v-model="ReceiptCity"></el-input>

                                </el-form-item>
                                <img src="../../assets/img/查询.png" alt="查询图标"
                                     style="margin-left: 10px;margin-top: 3px;">
                                <div style="float: right">

                                    <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                    <img src="../../assets/img/刷新.png" alt="">

                                </div>
                            </el-col>
                        </el-row>
                    </el-form>


                </el-col>
                <el-col :span="15">
                    <el-row>
                        <el-col>
                            <el-row
                                    :gutter="24"
                                    class="mgb20"
                            >
                                <el-col :span="6">
                                    <el-card
                                            shadow="hover"
                                            :body-style="{padding: '0px'}"
                                    >
                                        <div class="grid-content grid-con-1">

                                            <div class="grid-cont-right">
                                                <h6 style="color: #fff">收入合计</h6>

                                            </div>
                                            <div class="grid-img">
                                                210万元
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="6">
                                    <el-card
                                            shadow="hover"
                                            :body-style="{padding: '0px'}"
                                    >
                                        <div class="grid-content grid-con-2">

                                            <div class="grid-cont-right">
                                                <h6 style="color: #fff">支出合计</h6>

                                            </div>
                                            <div class="grid-img">
                                                210万元
                                            </div>

                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="6">
                                    <el-card
                                            shadow="hover"
                                            :body-style="{padding: '0px'}"
                                    >
                                        <div class="grid-content grid-con-3">

                                            <div class="grid-cont-right">
                                                <h6 style="color: #fff">分控费用合计</h6>

                                            </div>
                                            <div class="grid-img">
                                                210万元
                                            </div>

                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="6">
                                    <el-card
                                            shadow="hover"
                                            :body-style="{padding: '0px'}"
                                    >
                                        <div class="grid-content grid-con-4">

                                            <div class="grid-cont-right">
                                                <h6 style="color: #fff">毛利率合</h6>

                                            </div>
                                            <div class="grid-img">
                                             50%
                                            </div>

                                        </div>
                                    </el-card>
                                </el-col>

                            </el-row>

                        </el-col>
                    </el-row>
                    <div id="eight2" style="width:100%;height:300px;"></div>
                </el-col>
                <el-col :span="9" style="border: 1px solid #ccc">

                    <el-row :gutter="24">
                        <el-col>
                            <div style="font-size: 14px;padding: 10px 5px">数据统计</div>
                        </el-col>
                        <el-col>
                            <div id="eight3" style="width:100%;height:350px;"></div>
                        </el-col>

                    </el-row>

                </el-col>

            </el-row>


        </div>
        <div class="container" style="margin:20px 0px">
            <el-table
                    :data="tableData"
                    style="width: 100%;"
                    ref="multipleTable"
                    border
                    max-height="400"
            >
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column prop="BillNumber" label="客户账号" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="始发省份" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="始发城市" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="目的城市" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="箱型" align="center"></el-table-column>
                <el-table-column prop="BillNumber" label="收入" align="center"></el-table-column>
                <el-table-column prop="BillNumber" label="支出" align="center"></el-table-column>
                <el-table-column prop="BillNumber" label="分控费用" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="毛利率" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="票数" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="件数" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="BillNumber" label="重量" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>

            </el-table>

        </div>
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
    import echarts from 'echarts';

    export default {
        data() {
            return {
                tableData: [
                    {
                        ID: "ceshizhanghao1",
                        city: "北京",
                        BillNumber: "现金",
                        poll: "50"
                    },
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    },
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    },
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }
                    ,
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    },
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    },
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }
                    ,
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    },
                    {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }, {
                        ID: "ceshizhanghao2",
                        city: "上海",
                        BillNumber: "支付宝",
                        poll: "20"
                    }

                ],
                value6: '',
                cur_page: 1,
                limit: 10,
                ccc: 500,
                SendCity: '',
                ReceiptCity: ''
            };
        },
        mounted() {

            var eight2 = echarts.init(document.getElementById('eight2'));
            var eight3 = echarts.init(document.getElementById('eight3'));
            eight2.setOption({

                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['收入', '支出', '分控费', '毛利率'],
                    align: 'right',
                    right: 10
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['4L', '15L', '7L', '12L', '11L', '10L', '4L', '15L', '7L', '12L',]
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                series: [{
                    name: '收入',
                    type: 'bar',
                    itemStyle: {
                        color: '#c12e34'
                    },
                    data: [20, 12, 31, 34, 31, 20, 12, 31, 34, 31]
                },
                    /*{
                        type: 'line',
                        barWidth: '60%',
                        symbol: 'circle',

                        itemStyle: {
                            color: '#c12e34'
                        },
                        data: [20, 12, 31, 34, 31,20, 12, 31, 34, 31]
                    },*/
                    {
                        name: '支出',
                        type: 'bar',
                        itemStyle: {
                            color: '#cda819'
                        },
                        data: [10, 20, 5, 9, 3, 20, 12, 31, 34, 31]
                    },
                    {
                        name: '分控费',
                        type: 'bar',
                        itemStyle: {
                            color: '#339ca8'
                        },
                        data: [1, 1, 2, 3, 1, 1, 1, 2, 3, 1]
                    },
                    {
                        name: '毛利率',
                        type: 'line',
                        barWidth: '60%',
                        symbol: 'circle',

                        itemStyle: {
                            color: '#4c41cc'
                        },
                        data: [1, 12, 24, 34, 1, 14, 18, 2, 3, 1]
                    },

                ]
            });
            var data = [20, 32, 11, 65, 25, 50, 21];
            var xMax = 100;
            eight3.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br />{b}: {c}%',
                    "axisPointer": {
                        "type": "none"
                    },
                },
                grid: {
                    top: '5%',
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                yAxis: [{
                    type: 'category',
                    show: true,
                    data: [
                        '票数', '件数', '重量',
                    ],
                    axisLine: {
                        show: false,
                    },
                    "axisTick": { //y轴刻度线
                        "show": false
                    },
                    splitLine: {
                        show: false
                    },
                }],
                xAxis: [{
                    type: 'value',
                    //  position:'top',
                    show: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#fff',
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        rotate: 0,
                        textStyle: {
                            color: '#737373'
                        }
                    }
                }],
                series: [{
                    name: '占比',
                    type: 'bar',
                    stack: '',
                    z: 1,
                    barWidth: '16%',
                    data: [20, 32, 11, 65, 25, 50, 21],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: function (params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#308cef', '#4c41cc', '#fd7b09', '#ffbf37', '#f2ff36', '#4fae36',
                                ];
                                return colorList[params.dataIndex]
                            },
                            "label": {
                                "show": false,
                                "textStyle": {
                                    "color": "rgba(0,0,0,1)"
                                },
                                position: 'right',
                                formatter: function (p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    }
                }, {
                    name: '占位',
                    type: 'bar',
                    barWidth: '25%',
                    barGap: '-124%',
                    silent: true,
                    itemStyle: {
                        normal: {
                            borderWidth: 0.4,
                            color: 'transparent',
                            borderColor: '#49698f',
                            barBorderRadius: 50,
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "rgba(0,0,0,1)"
                                },
                                "position": "right",
                                formatter: function (p) {
                                    return data[p.dataIndex];
                                }
                            }
                        }
                    },
                    data: data.map(function (d) {
                        return xMax
                    }),
                },]
            });
            var symbolSize = 20;
            var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
            var points = [];





        },
        methods: {}

    };
</script>
<style scoped>
    .grid-content {
        display: flex;
        align-items: center;
        height: 80px;
    }

    .grid-img {
        flex: 1;
    }

    .grid-cont-right {
        flex: 1;
        margin: 0px 20px 0 20px;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 20px;
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

    .el-input.el-input--small {
        width: 120px;
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
