<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 綫路承運
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-form :inline="true" style="margin: 20px 0 0 0;">
                    <el-row>
                        <el-col>
                            <el-form-item  label="委托时间">
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
                            <el-form-item label="站点选择">
                                <el-input ></el-input>
                            </el-form-item>
                            <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;">
                            <div style="float: right">

                                <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                <img src="../../assets/img/刷新.png" alt="" >

                            </div>
                        </el-col>
                    </el-row>
                </el-form>

            </div>
            <hr>
            <el-row :gutter="24" >
                <el-col :span="13" >
                    <p  style="font-size: 18px;color:#333;margin: 10px 0 20px  ;padding-left:5px;font-weight: 800;border-left: 3px solid green">费用明细</p>
                    <div id="eight" style="width:100%;height:400px;"></div>
                </el-col>
                <el-col :span="11">
                    <p  style="font-size: 18px;color:#333;margin: 10px 0 20px  ;padding-left:5px;font-weight: 800;border-left: 3px solid green">
                        货量统计
                    </p>
                    <el-row :gutter="24" >
                        <el-col :span="8">
                            <div id="eight2" style="width:100%;height:400px;"></div>
                        </el-col>
                        <el-col :span="8">
                            <div id="eight22" style="width:100%;height:400px;"></div>
                        </el-col>
                        <el-col :span="8">
                            <div id="eight222" style="width:100%;height:400px;"></div>
                        </el-col>
                    </el-row>

                </el-col>

            </el-row>

        </div>
        <el-table
                :data="tableData"
                style="width: 100%;margin-top: 20px;
"
                ref="multipleTable"
                border
                max-height="400"
        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
            <el-table-column prop="ID" label="客户账号" align="center"></el-table-column>
            <el-table-column prop="GetCompany" label="公司名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Condition" label="结算类型" align="center"></el-table-column>
            <el-table-column prop="BillNumber" label="收入" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="税后收入" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="支出" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="运输毛利率" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="税后运输毛利率" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="票数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="BillNumber" label="件数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>
            <el-table-column prop="BillNumber" label="运费录入票数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BillNumber" label="未审核票数" align="center" :show-overflow-tooltip="true"  :sortable="true" ></el-table-column>

        </el-table>
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
                tableData: [],
                value6: '',
                cur_page: 1,
                limit:10,
                ccc: 500,
            };
        },
        mounted(){
            var eight = echarts.init(document.getElementById('eight'));
            var eight2 = echarts.init(document.getElementById('eight2'));
            var eight22 = echarts.init(document.getElementById('eight22'));
            var eight222 = echarts.init(document.getElementById('eight222'));

            var symbolSize = 20;
            var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
            var points = [];
            eight.setOption ({
                backgroundColor: '#f3f3f4',
                tooltip: {
                    formatter: function (params) {
                        var data = params.data || [0, 0];
                        return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    min: -60,
                    max: 20,
                    type: 'value',
                    axisLine: {onZero: false}
                },
                yAxis: {
                    min: 0,
                    max: 40,
                    type: 'value',
                    axisLine: {onZero: false}
                },
                series: [
                    {
                        id: 'a',
                        type: 'line',
                        smooth: true,
                        symbolSize: symbolSize,
                        data: data
                    }
                ]
            });

            var zr = eight.getZr();


            zr.on('click', function (params) {
                var pointInPixel = [params.offsetX, params.offsetY];
                var pointInGrid = eight.convertFromPixel('grid', pointInPixel);

                if (eight.containPixel('grid', pointInPixel)) {
                    data.push(pointInGrid);

                    eight.setOption({
                        series: [{
                            id: 'a',
                            data: data
                        }]
                    });
                }
            });

            zr.on('mousemove', function (params) {
                var pointInPixel = [params.offsetX, params.offsetY];
                zr.setCursorStyle(eight.containPixel('grid', pointInPixel) ? 'copy' : 'default');
            });


            window.onresize = eight.resize;  // 基于准备好的dom，初始化echarts实例


            var data = [{
                "name": "1",
                "value": 10
            }, {
                "name": "2",
                "value": 10
            }, {
                "name": "3",
                "value": 10
            }]


            eight2.setOption({

                series: [{
                    color:["#00F5FF","#DCDCDC"],
                    name: '访问来源',
                    type: 'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',

                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 75,
                        name: '75%',
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: '25',
                                    fontWeight: 'bold',
                                    color:"#000"
                                }
                            }
                        },
                    },
                        {
                            value: 25,
                            name: '票数合计',
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: '20',
                                        color:'#000',

                                    },
                                    padding: [300, 0, 0, 0]
                                }
                            },
                        }
                    ]
                }]
            });
            eight22.setOption({

                series: [{
                    color:["#625bef","#DCDCDC"],
                    name: '访问来源',
                    type: 'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',

                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 75,
                        name: '85%',
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: '25',
                                    fontWeight: 'bold',
                                    color:"#000"
                                }
                            }
                        },
                    },
                        {
                            value: 25,
                            name: '件数合计',
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: '20',
                                        color:'#000',

                                    },
                                    padding: [300, 0, 0, 0]
                                }
                            },
                        }
                    ]
                }]
            });
            eight222.setOption({

                series: [{
                    color:["#f8ac59","#DCDCDC"],
                    name: '访问来源',
                    type: 'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',

                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 75,
                        name: '55%',
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: '25',
                                    fontWeight: 'bold',
                                    color:"#000"
                                }
                            }
                        },
                    },
                        {
                            value: 25,
                            name: '重量合计',
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: '20',
                                        color:'#000',

                                    },
                                    padding: [300, 0, 0, 0]
                                }
                            },
                        }
                    ]
                }]
            });
        },
        methods:{

        }

    };
</script>
<style scoped>



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
