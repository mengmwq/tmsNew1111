<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 货量统计列表
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
                        <el-col :span="24">
                            <div id="eight2" style="width:100%;height:400px;"></div>
                        </el-col>

                    </el-row>

                </el-col>

            </el-row>

        </div>
        <el-table

                :data="tableData"
                style="width: 100%"
                ref="multipleTable"
                border
                max-height="400"

        >
            <el-table-column
                    type="selection"

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
                    prop="Condition"
                    label="区域"
                    align="center"
                    fixed

            ></el-table-column>
            <el-table-column
                    prop="jjj"
                    label="省份"
                    align="center"
                    class-name="curstomNum"

                    label-class-name="aaa"

            ></el-table-column>
            <el-table-column
                    prop="站点"
                    label="发货城市"
                    align="center"
                    fixed

            ></el-table-column>



            <el-table-column
                    show-summary
                    prop="Condition"
                    label="票数"
                    align="center"

            >
                <el-table-column
                        prop="province"
                        label="始发"
                      >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="中转"

                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="派送"

                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="合计"

                >
                </el-table-column>

            </el-table-column>
            <el-table-column
                    prop="Condition"
                    label="重量"
                    align="center"

            >
                <el-table-column
                        prop="province"
                        label="始发"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="中转"

                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="派送"

                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="合计"

                >
                </el-table-column>

            </el-table-column>
            <el-table-column
                    prop="Condition"
                    label="件数"
                    align="center"

            >
                <el-table-column
                        prop="province"
                        label="始发"
                      >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="中转"

                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="派送"

                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="合计"

                >
                </el-table-column>

            </el-table-column>

            <el-table-column label="费用"    prop="city"
                        align="center" :show-overflow-tooltip="true" class-name="curstomNum"
                             label-class-name="aaa">

            </el-table-column>


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
                ccc: 500, //总页数
            };
        },
        mounted(){
            var eight = echarts.init(document.getElementById('eight'));
            var eight2 = echarts.init(document.getElementById('eight2'));

            eight.setOption ({
                backgroundColor: '#f3f3f4',
                xAxis: {
                    type: 'category',
                    data: ['提货费', '承运费', '停车费', '路桥费', '租车费', '干冰费', '返箱费','分控费','其他费用','税点费']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320,222,55,63,345,645],
                    type: 'line'
                }]
            });




            window.onresize = eight.resize;  // 基于准备好的dom，初始化echarts实例

            const colorBlueDark = 'rgb(26, 214,214)';
            const colorBlueDark_50 = 'rgba(26, 214,214, 0.5)';
            const colorBlueLight = 'rgb(0, 72, 195)';
            const colorBlueLight_50 = 'rgb(0, 72, 195, 0.5)';
            const colorGreenDark = 'rgba(34,139,34,1)';
            const colorGreenLight = 'rgba(127,250,0,1)';
            const colorYellow = 'rgba(255,255,0,1)';
            const colorOrange = 'rgba(255,128,0,1)';
            const colorRed = 'rgba(255,0,0,1)';
            const colorGrayDark = '#999';
            const colorWhite = '#fff';
            const colorBlack = '#000';
            const colorBlack_40 = 'rgba(0,0,0,0.4)';


            function get_multi_pie_option(settings) {
                let defaultSetting = {
                    title: '',//'Default Title',
                    subtitle_fontsize: 16,
                    legend_fontSize: 16,

                    grid: {
                        left: 0,
                        right: 0,

                    },

                    // Data in as an Array
                    pie_data: {
                        '票数合计': {
                            '始发': 93,
                            '中转': 28,
                            '派送': 284,
                        },
                        '重量合计': {
                            '始发': 89,
                            '中转': 238,
                            '派送': 284,
                        },
                        '件数合计': {
                            '始发': 943,
                            '中转': 284,
                            '派送': 284,
                        },
                    },
                    // pie_name: ['维度1', '维度2', '维度3'],
                    // pie_data_label: ['上周', '本周'],
                };
                $.extend(defaultSetting, settings);

                defaultSetting.pie_name = Object.keys(defaultSetting.pie_data)
                // defaultSetting.pie_data_label = Array.from({})
                const one_pie_width = 100 / defaultSetting.pie_name.length;
                //defaultSetting.pie_data.length = Object.keys(defaultSetting.pie_data).length;
                console.log(defaultSetting);

              eight2.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title: [
                        {

                            textStyle: {
                                color: colorBlack,
                                fontSize: defaultSetting.title_fontsize,
                            },
                        },
                    ].concat(Array.from({length: defaultSetting.pie_name.length}, (v, i) => {
                        // console.log(one_pie_width);
                        let _title = {
                            text: defaultSetting.pie_name[i],
                            bottom: '20%',

                            left: one_pie_width * i + '%',
                            textStyle: {
                                color: colorBlack,
                                fontSize: defaultSetting.subtitle_fontsize,
                            },
                        }
                        return _title;
                    })),
                    legend: [

                    ].concat(Array.from({length: defaultSetting.pie_name.length}, (v,i)=>{
                        let cur_pie_name = defaultSetting.pie_name[i];
                        let cur_pie_date = defaultSetting.pie_data[cur_pie_name];


                        return {
                            data: Object.keys(cur_pie_date),
                            orient: 'horizontal',
                            right: "5%",
                            top: '5%',
                            // right: "0%",
                            textStyle: {
                                color: colorBlack,
                                fontSize: defaultSetting.legend_fontSize,
                            },
                            icon: 'roundRect',
                        };
                    })),
                    grid: {
                        left: '0%',
                        top: 'center',
                        right: '0%',
                        containLabel: true
                    },
                    series: [

                    ].concat(Array.from({length:defaultSetting.pie_name.length}, (v,i)=>{
                        console.log("pie_data",defaultSetting.pie_data);
                        console.log("v,i",v,i);
                        let cur_pie_name = defaultSetting.pie_name[i];
                        let cur_data = defaultSetting.pie_data[cur_pie_name];
                        let cur_data_keys = Object.keys(cur_data);

                        console.log("cur_data",cur_data);
                        return {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{b} : {c} ({d}%)"
                            },
                            type: 'pie',
                            center: [one_pie_width*(i+0.5)+'%', '50%'],
                            radius: one_pie_width+'%',//'33%',//['33%', '0%'],//33%=100%/3
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',//'outside',//'inside',
                                    formatter: '{b},{d}%'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false,//true,//set true if use "position: 'outside',"
                                }
                            },
                            data: Array.from({length:cur_data_keys.length}, (v,idx)=>{
                                let cur_data_key = cur_data_keys[idx];
                                console.log("-------");
                                console.log("idx:",idx, "cur_data_key:",cur_data_key,'cur_data',cur_data);
                                return {
                                    value: cur_data[cur_data_key],
                                    name: cur_data_key,
                                };
                            }),
                        };
                    })),
                });


            }

            eight = get_multi_pie_option(null);

            //
            // var data = [{
            //     "name": "1",
            //     "value": 10
            // }, {
            //     "name": "2",
            //     "value": 10
            // }, {
            //     "name": "3",
            //     "value": 10
            // }]
            //
            //
            // eight2.setOption({
            //
            //     color: ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247'],
            //
            //     title: {
            //         text: '总数',
            //         subtext: 7789,
            //         textStyle: {
            //             color: '#000',
            //             fontSize: 20,
            //             // align: 'center'
            //         },
            //         subtextStyle: {
            //             fontSize: 10,
            //             color: ['#ff9d19']
            //         },
            //         x: 'center',
            //         y: 'center',
            //     },
            //     grid: {
            //         bottom: 150,
            //         left: 100,
            //         right: '10%'
            //     },
            //    /* legend: {
            //         orient: 'vertical',
            //         top: "middle",
            //         right: "5%",
            //         textStyle: {
            //             color: '#f2f2f2',
            //             fontSize: 25,
            //
            //         },
            //         icon: 'roundRect',
            //         data: data,
            //     },*/
            //     series: [
            //         // 主要展示层的
            //         {
            //             radius: ['30%', '61%'],
            //             center: ['50%', '50%'],
            //             type: 'pie',
            //            /* label: {
            //                 normal: {
            //                     show: true,
            //                     formatter: "{c}%",
            //                     textStyle: {
            //                         fontSize: 30,
            //
            //                     },
            //                     position: 'outside'
            //                 },
            //                 emphasis: {
            //                     show: true
            //                 }
            //             },*/
            //             /*labelLine: {
            //                 normal: {
            //                     show: true,
            //                     length: 30,
            //                     length2: 55
            //                 },
            //                 emphasis: {
            //                     show: true
            //                 }
            //             },*/
            //             name: "民警训练总量",
            //             data: data,
            //
            //         },
            //         // 边框的设置
            //         {
            //             radius: ['30%', '34%'],
            //             center: ['50%', '50%'],
            //             type: 'pie',
            //             label: {
            //                 normal: {
            //                     show: false
            //                 },
            //                 emphasis: {
            //                     show: false
            //                 }
            //             },
            //             labelLine: {
            //                 normal: {
            //                     show: false
            //                 },
            //                 emphasis: {
            //                     show: false
            //                 }
            //             },
            //             animation: false,
            //             tooltip: {
            //                 show: false
            //             },
            //             data: [{
            //                 value: 1,
            //                 itemStyle: {
            //                     color: "rgba(250,250,250,0.3)",
            //                 },
            //             }],
            //         }, {
            //             name: '外边框',
            //             type: 'pie',
            //             clockWise: false, //顺时加载
            //             hoverAnimation: false, //鼠标移入变大
            //             center: ['50%', '50%'],
            //             radius: ['65%', '65%'],
            //             label: {
            //                 normal: {
            //                     show: false
            //                 }
            //             },
            //             data: [{
            //                 value: 9,
            //                 name: '',
            //                 itemStyle: {
            //                     normal: {
            //                         borderWidth: 2,
            //                         borderColor: '#0b5263'
            //                     }
            //                 }
            //             }]
            //         },
            //     ]
            // });
        },
        methods:{

        }

    };
</script>
<style scoped>

    .curstomNum:not(.aaa) .cell {
        color: #649EFE !important;

    }


    .curstomNum:not(.aaa) .cell:hover {
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
</style>
