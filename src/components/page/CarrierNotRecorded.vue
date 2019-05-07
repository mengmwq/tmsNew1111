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
                                            v-model="value1"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>

                        </el-col>

                    </el-row>
                </el-form>

            </div>
            <el-row :gutter="24">

                <el-col :span="12">
                    <div style="border: 1px solid #ccc">
                        <div style="padding: 10px;" class="rightContent">
                            <div>

                                <span style="color:#333;font-size: 16px;font-weight: 600;border-left: 3px solid deeppink">&nbsp结算方式占比</span>

                                <div id="eight2" style="width:100%;height:350px;"></div>

                                <hr>
                                <div id="eight22" style="width:100%;height:350px;"></div>
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
                            max-height="700"
                            v-loading="loading"
                            show-summary
                            @cell-click="jumpDetails"
                    >
                        <el-table-column type="selection" width="60" align="center"></el-table-column>
                        <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
                        <el-table-column prop="ID" label="站点" align="center"></el-table-column>
                        <el-table-column prop="city" label="城市" align="center"></el-table-column>
                        <el-table-column prop="BillNumber" label="结算方式" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="poll" label="票数" align="center" :show-overflow-tooltip="true"      class-name="curstomNum"
                                         label-class-name="aaa"></el-table-column>


                    </el-table>
                    <div class="pagination">
                        <el-pagination

                                :page-sizes="[50, 100, 500, 2000]"
                                :page-size="50"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="ccc"
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
                cur_page: 1,
                limit:10,
                ccc: 500, //总页数
                value1:"",
                state2:'',
                loading:false,


            };
        },
        mounted(){

            var eight2 = echarts.init(document.getElementById('eight2'));
            var eight22 = echarts.init(document.getElementById('eight22'));
            eight2.setOption({


                title: {
                    text: "84%",
                    subtext: '月结',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        color: "#000",
                        fontSize: 30,
                        fontWeight: 'normal'
                    },
                    subtextStyle: {
                        color: "#000",
                        fontSize: 14,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['rose3', 'rose5', 'rose6', 'rose7', 'rose8']
                },
                calculable: true,
                series: [

                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [100, 130],
                        center: ['50%', '50%'],
                        data: [{
                            value: 34,
                            name: '吴际帅\n牛亚莉',
                            itemStyle: {

                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#f6e3a1'
                                }, {
                                    offset: 1,
                                    color: '#ff4236'
                                }])
                            },
                            label: {
                                color: "#000",
                                fontSize: 14,
                                formatter: '完成梳理部门\n{a|34}个',
                                rich: {
                                    a: {
                                        color: "#000",
                                        fontSize: 20,
                                        lineHeight: 30
                                    },
                                }
                            }
                        },
                            {
                                value: 52,
                                name: 'rose2',
                                itemStyle: {
                                    color: "transparent"
                                }
                            }
                        ]
                    },
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [110, 120],
                        center: ['50%', '50%'],
                        data: [{
                            value: 34,
                            name: '吴际帅\n牛亚莉',
                            itemStyle: {
                                color: "transparent"
                            }
                        },
                            {
                                value: 52,
                                name: 'rose2',
                                itemStyle: {

                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#348fe6'
                                    }, {
                                        offset: 1,
                                        color: '#625bef'
                                    }])
                                },
                                label: {
                                    color: "#000",
                                    fontSize: 14,
                                    formatter: '部门总量\n{a|52}个',
                                    rich: {
                                        a: {
                                            color: "#000",
                                            fontSize: 20,
                                            lineHeight: 30
                                        },
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
            eight22.setOption({


                title: {
                    text: "84%",
                    subtext: '现金',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        color: "#000",
                        fontSize: 30,
                        fontWeight: 'normal'
                    },
                    subtextStyle: {
                        color: "#000",
                        fontSize: 14,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['rose3', 'rose5', 'rose6', 'rose7', 'rose8']
                },
                calculable: true,
                series: [

                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [100, 130],
                        center: ['50%', '50%'],
                        data: [{
                            value: 34,
                            name: '吴际帅\n牛亚莉',
                            itemStyle: {

                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#f6e3a1'
                                }, {
                                    offset: 1,
                                    color: '#ff4236'
                                }])
                            },
                            label: {
                                color: "#000",
                                fontSize: 14,
                                formatter: '完成梳理部门\n{a|34}个',
                                rich: {
                                    a: {
                                        color: "#000",
                                        fontSize: 20,
                                        lineHeight: 30
                                    },
                                }
                            }
                        },
                            {
                                value: 52,
                                name: 'rose2',
                                itemStyle: {
                                    color: "transparent"
                                }
                            }
                        ]
                    },
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [110, 120],
                        center: ['50%', '50%'],
                        data: [{
                            value: 34,
                            name: '吴际帅\n牛亚莉',
                            itemStyle: {
                                color: "transparent"
                            }
                        },
                            {
                                value: 52,
                                name: 'rose2',
                                itemStyle: {

                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#348fe6'
                                    }, {
                                        offset: 1,
                                        color: '#625bef'
                                    }])
                                },
                                label: {
                                    color: "#000",
                                    fontSize: 14,
                                    formatter: '部门总量\n{a|52}个',
                                    rich: {
                                        a: {
                                            color: "#000",
                                            fontSize: 20,
                                            lineHeight: 30
                                        },
                                    }
                                }
                            }
                        ]
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
                    this.$router.push("/NotEnterDetails");
                }
            }
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
        height: 150px;
    }
    .grid-img {
        flex: 1;
    }
    .grid-cont-right {
        flex: 1;
        margin:0px 80px 0 40px;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
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
