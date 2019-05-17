
<template>
  <div class>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> 客户收入统计列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收入" name="first">
              <el-row :gutter="24">
                <el-col :span="18">
                  <p style="font-size: 18px;color:#333;margin: 60px 0 60px ;font-weight: 800">收入趋势</p>
                  <div id="eight" style="width:100%;height:400px;"></div>
                </el-col>
                <el-col :span="6" style="padding-left: 35px">
                 <!-- <div class="block">
                    <el-date-picker
                      v-model="value6"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>-->
                  <p style="font-size: 18px;color:#333;margin: 30px 0 60px ;font-weight: 800">大客戶排名</p>
                  <ul style="padding: 0;width: 100%;" class="rightList">
                    <li>
                      <img src="../../assets/img/大客户排名第一.png" alt>
                      <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                      <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                    </li>
                    <li>
                      <img src="../../assets/img/大客户排名第一.png" alt>
                      <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                      <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                    </li>
                    <li>
                      <img src="../../assets/img/大客户排名第一.png" alt>
                      <font style="margin-left: 30px;font-size:14px;color:#333;">工专路一号店</font>
                      <font style="font-size:14px;color:#666;margin-left: 50px;">$123122</font>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="EXCEL" name="second">
              <div>
                <div class>
                  <div class="handle-box">
                    <el-form :inline="true" style="margin: 20px 0 0 0;">
                      <el-row>
                        <el-col>
                          <el-form-item label="客户账号">
                            <el-input></el-input>
                          </el-form-item>
                          <el-form-item label="结算类型">
                            <el-select
                              v-model="select_cate"
                              placeholder="请选择"
                              class="handle-select mr10"
                            >
                              <el-option key="0" label="支付宝" value="支付宝"></el-option>
                              <el-option key="1" label="微信" value="微信"></el-option>
                              <el-option key="2" label="现金" value="现金"></el-option>
                            </el-select>
                          </el-form-item>
                          <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;">
                          <div style="float: right">
                            <img src="../../assets/img/导出.png" alt style="margin: 0 20px">
                            <img src="../../assets/img/刷新.png" alt>
                            <img src="../../assets/img/柱状图.png" alt style="margin: 0 20px">
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
                    <el-table-column
                      prop="ID"
                      label="客户账号"
                      align="center"
                      class-name="curstomNum"
                      label-class-name="aaa"
                    ></el-table-column>
                    <el-table-column
                      prop="GetCompany"
                      label="公司名称"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column prop="Condition" label="结算类型" align="center"></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="是否结算"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="超远费"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="运费"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="仓储费"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="温度计"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="专车费"
                      align="center"
                      :show-overflow-tooltip="true"

                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="冷藏费"
                      align="center"


                    ></el-table-column>
                    <el-table-column
                          prop="BillNumber"
                          label="其他费用"
                          align="center"


                  ></el-table-column>


                    <el-table-column
                      prop="BillNumber"
                      label="收入合计"
                      align="center"

                    ></el-table-column>

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
import echarts from "echarts";
export default {
  data() {
    return {
      select_cate: "", //运单状态
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
      value6: "",

      option: [],
      cur_page: 1,
      limit: 10,
      ccc: 500, //总页数
      activeName: "first",

      multipleSelection: []
    };
  },
  mounted() {
    var eight = echarts.init(document.getElementById("eight"));
    eight.setOption({
      color: ['#e5cd00'],
      backgroundColor: '#4ba4ba',
      xAxis: {
        type: 'category',
        data: ['河流', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel : {
          color : 'white'
        },
        axisLine : {
          lineStyle : {
            color : 'rgba(200,200,200,0.2)'
          }

        },
      },
      yAxis: {
        type: 'value',
        axisLine : {
          show : false,
          lineStyle : {
            color : 'rgba(200,200,200,0.2)'
          }
        },
        axisLabel : {
          color : '#4397d2'
        },
        splitLine : {
          lineStyle : {
            color : 'rgba(200,200,200,0.2)'
          }
        },
        splitArea : {
          show : true,
          areaStyle :{
            color : ['rgba(250,250,250,0)','rgba(200,200,200,0.1)']
          }
        }
      },
      grid : {
        top : '12%',
        bottom : '15%'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: 20,
        itemStyle : {
          normal : {
            barBorderRadius: [10, 10, 0, 0] //圆角
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            color : 'white'
          }
        },
      }]

    });

    window.onresize = eight.resize; // 基于准备好的dom，初始化echarts实例
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    // 2019.5.5 李洋 点击客户账号 跳转
    jumpDetails(row, column, cell, event) {
      // console.log(row,column.label,222);
      if (column.label == "客户账号") {
        this.$router.push("/customeDatails");
      }
    }
  }
};
</script>
