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
                    <p style="font-size: 14px;color:#333;  ;padding-left:5px;font-weight: 800;border-left: 3px solid green">
                        包装箱使用</p>
                    <div style="float: right">
                        <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                        <img src="../../assets/img/刷新.png" alt="">
                    </div>
                </el-col>
                <el-col :span="15">

                    <div class="handle-box">

                        <el-form :inline="true" style="margin: 0 0 0 0;">
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
                                        <el-input v-model="SendCity" style="width: 100px;"></el-input>

                                    </el-form-item>
                                    <el-form-item label="温区">
                                        <el-input v-model="ReceiptCity"style="width: 100px;"></el-input>

                                    </el-form-item>
                                    <img src="../../assets/img/查询.png" alt="查询图标"
                                         style="margin-left: 10px;margin-top: 3px;">
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
                            style="width: 100%;
"
                            ref="multipleTable"
                            border
                            max-height="450"
                    >
                        <el-table-column type="BillNumber" width="60" align="center"></el-table-column>
                        <el-table-column prop="BillNumber" label="始发省份" align="center"
                                         :show-overflow-tooltip="true"></el-table-column>

                        <el-table-column prop="BillNumber" label="始发城市" align="center"
                                         :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="BillNumber" label="箱型" align="center"></el-table-column>
                        <el-table-column prop="BillNumber" label="温度区间" align="center"
                                         :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="BillNumber" label="件数" align="center"
                                         :show-overflow-tooltip="true"></el-table-column>

                    </el-table>
                </el-col>
                <el-col :span="9" style="margin-top:0px;border: 1px solid #ccc;height:500px;">

                    <el-row :gutter="24">
                        <el-col>
                            <div style="font-size: 14px;padding: 10px 5px">件数合计：1265</div>
                        </el-col>
                        <el-col>
                            <div id="eight" style="width:99%;height:200px;margin-bottom: 20px;"></div>
                            <div id="eightBottom" style="width:99%;height:200px;"></div>
                        </el-col>
                        <!-- <el-col>
                             <div style="width:100%;height:200px;"></div>
                         </el-col>-->

                    </el-row>

                </el-col>

            </el-row>
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
        name: "UsePackingBox",
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
                    data: ['4L', '15L', '7L', '12L', '11L', '10L', '4L', '15L', '7L', '12L',]
                },
                tooltip: {
                    trigger: 'axis',

                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 件'
                    },
                    axisPointer: {
                        snap: true
                    }
                },
                series: [{
                    data: [25, 35, 901, 150, 666, 333, 568,22,55,999,552,1425,888],
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
                    data: ['4℃', '15℃', '7℃', '12℃', '11℃', '10℃', '4℃', '15℃', '7℃', '12℃',]
                },
                tooltip: {
                    trigger: 'axis',

                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 件'
                    },
                    axisPointer: {
                        snap: true
                    }
                },
                series: [{
                    data: [25, 35, 901, 150, 666, 333, 568,22,55,999,552,1425,888],
                    type: 'line',
                    smooth: true,
                    color: 'rgb(137,189,27)',
                }]
            });




        },

    }
</script>
<style>

</style>
<style scoped>
    input.el-input__inner {
        width: 100px;
    }
</style>