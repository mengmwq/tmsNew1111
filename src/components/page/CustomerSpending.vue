
<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 客户支出统计列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="支出" name="first"  >
                            <el-row :gutter="24">
                                <el-col :span="18">
                                    <p  style="font-size: 18px;color:#333;margin: 60px 0 60px ;font-weight: 800">支出趋势</p>
                                    <div id="eight" style="width:100%;height:400px;"></div>
                                </el-col>
                                <el-col :span="6" style="padding-left: 35px">
                                    <div class="block">
                                        <el-date-picker
                                                v-model="value6"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                    <p style="font-size: 18px;color:#333;margin: 30px 0 60px ;font-weight: 800">大客戶排名</p>
                                    <ul style="padding: 0;width: 100%;"  class="rightList" >
                                        <li>
                                            <img src="../../assets/img/大客户排名第一.png" alt="">
                                            <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                                            <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                                        </li>
                                        <li>
                                            <img src="../../assets/img/大客户排名第一.png" alt="">
                                            <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                                            <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                                        </li>
                                        <li>
                                            <img src="../../assets/img/大客户排名第一.png" alt="">
                                            <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                                            <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                                        </li>
                                    </ul>

                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="EXCEL" name="second"  >
                            <div >

                                <div class="">
                                    <div class="handle-box">

                                        <el-form :inline="true" style="margin: 20px 0 0 0;">
                                            <el-row>
                                                <el-col>

                                                    <el-form-item label="客户账号">
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
                                                    <el-form-item label="结算类型" >
                                                        <el-select v-model="select_cate"  placeholder="请选择" class="handle-select mr10">
                                                            <el-option key="0" label="支付宝" value="支付宝"></el-option>
                                                            <el-option key="1" label="微信" value="微信"></el-option>
                                                            <el-option key="2" label="现金" value="现金"></el-option>

                                                        </el-select>
                                                    </el-form-item>
                                                    <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;">
                                                    <div style="float: right">

                                                        <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                                                        <img src="../../assets/img/刷新.png" alt="" >
                                                        <img src="../../assets/img/柱状图.png" alt="" style="margin: 0 20px">
                                                    </div>



                                                </el-col>

                                            </el-row>
                                        </el-form>
                                    </div>
                                    <el-table
                                            :data="tableData"
                                            style="width: 100%"
                                            ref="multipleTable"
                                            border
                                            max-height="400"
                                            @cell-click="jumpDetails"

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
                            </div>
                        </el-tab-pane>

                    </el-tabs>
                </el-col>

            </el-row>

        </div>
    </div>
</template>



<style>
    ul>li{
        list-style: none!important;
    }

    .rightList li{
        margin-bottom: 40px;
        display: flex;
        align-items: center;
    }
</style>



<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
                select_cate: "", //运单状态
                tableData: [],
                value6: '',

                option:[],
                cur_page: 1,
                limit:10,
                ccc: 500, //总页数
                activeName: 'first',
                restaurants: [{name:'旺角茶餐厅',value:'刘顺利3'},{name:'新旺角茶餐厅',value: '孟健康'},{name:'旺角茶餐厅',value:'刘顺利'},{name:'旺角茶餐厅',value:'李平安'},{name:'旺角茶',value:'孟小孟'},{name:'旺角茶餐厅',value:'刘顺利2'}],
                state2:'',

                multipleSelection: [],
                tableData: [
                    {
                        ID: "ceshizhanghao1",
                        GetCompany: "测试公司1",
                        Condition: "现金",
                        BillNumber: "100000"
                    },
                    {
                        ID: "ceshizhanghao2",
                        GetCompany: "测试公司2",
                        Condition: "现金",
                        BillNumber: "100000"
                    }
                ],

            }
        },
        mounted(){
            var eight = echarts.init(document.getElementById('eight'));
            eight.setOption ({
                backgroundColor: '#f3f3f4',
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });

            window.onresize = eight.resize;  // 基于准备好的dom，初始化echarts实例
        },
        methods: {

            handleClick(tab, event) {
                console.log(tab, event);
            },
            jumpDetails(row, column, cell, event){
                console.log(column.label,0)
                if (column.label == "客户账号") {
                    this.$router.push("/CustomerSpendDetails");
                }
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
            }


        }
    }
</script>
