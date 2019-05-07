
<template>
  <div class>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> 年度报表列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
          >

            <el-tab-pane
              label="客户"
              name="second"
            >
              <div>
                <div class>
                  <div class="handle-box">
                    <el-form
                      :inline="true"
                      style="margin: 20px 0 0 0;"
                    >
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
                              <el-option
                                key="0"
                                label="支付宝"
                                value="支付宝"
                              ></el-option>
                              <el-option
                                key="1"
                                label="微信"
                                value="微信"
                              ></el-option>
                              <el-option
                                key="2"
                                label="现金"
                                value="现金"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <img
                            src="../../assets/img/查询.png"
                            alt="查询图标"
                            style="margin-left: 10px;"
                          >
                          <div style="float: right">
                            <img
                              src="../../assets/img/导出.png"
                              alt
                              style="margin: 0 20px"
                            >
                            <img
                              src="../../assets/img/刷新.png"
                              alt
                            >
                            <img
                              src="../../assets/img/柱状图.png"
                              alt
                              style="margin: 0 20px"
                            >
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
                    <el-table-column
                      type="selection"
                      width="60"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      type="index"
                      width="50"
                      label="序号"
                      align="center"
                      fixed
                    ></el-table-column>
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
                    <el-table-column
                      prop="Condition"
                      label="结算类型"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="收入"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="税后收入"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="支出"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="运输毛利率"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="税后运输毛利率"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="票数"
                      align="center"
                      :show-overflow-tooltip="true"
                      :sortable="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="件数"
                      align="center"
                      :show-overflow-tooltip="true"
                      :sortable="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="运费录入票数"
                      align="center"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                      prop="BillNumber"
                      label="未审核票数"
                      align="center"
                      :show-overflow-tooltip="true"
                      :sortable="true"
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
            <el-tab-pane
              label="线路"
              name="first"
            >
              <div v-show="tempShow">
                <el-form
                  :inline="true"
                  style="margin: 20px 0 0 0;"
                >
                  <el-row>
                    <el-col>
                      <el-form-item>
                        <div class="block">

                          <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>

                      <img
                        src="../../assets/img/查询.png"
                        alt="查询图标"
                        style="margin-left: 10px;margin-top: 3px;"
                      >

                    </el-col>
                  </el-row>
                </el-form>
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
                              <h6 style="color: #fff">已录入票数合计</h6>
                              <div class="grid-num">&yen; 4,232</div>

                            </div>
                            <div class="grid-img">
                              <img
                                src="../../assets/img/收入合计上的图标.png"
                                alt=""
                              >
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
                              <h6 style="color: #fff">已录入件数合计</h6>
                              <div class="grid-num">&yen; 4,232</div>

                            </div>
                            <div class="grid-img">
                              <img
                                src="../../assets/img/支出合计上的图标.png"
                                alt=""
                              >
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
                              <h6 style="color: #fff">已录入重量合计</h6>
                              <div class="grid-num">&yen; 4,232</div>

                            </div>
                            <div class="grid-img">
                              <img
                                src="../../assets/img/毛利率上的图标.png"
                                alt=""
                              >
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
                              <h6 style="color: #ffffff;">2019年成本合计</h6>
                              <div class="grid-num">&yen; 4,232</div>

                            </div>
                            <div class="grid-img">
                              <img
                                src="../../assets/img/未录入运费票数合计.png"
                                alt=""
                              >
                            </div>

                          </div>
                        </el-card>
                      </el-col>

                    </el-row>

                  </el-col>
                </el-row>
                <div
                  id="eight"
                  style="width:100%;height:700px;"
                ></div>
              </div>
              <div v-show="tableShow">
                <el-form
                  :inline="true"
                  style="margin: 20px 0 0 0;"
                >
                  <el-row>
                    <el-col>
                      <el-form-item>
                        <div class="block">

                          <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>

                      <img
                        src="../../assets/img/查询.png"
                        alt="查询图标"
                        style="margin-left: 10px;margin-top: 3px;"
                      >

                    </el-col>
                  </el-row>
                </el-form>
                <div>biaoge </div>
              </div>

              <div style="text-align: center;margin-top: 20px;">

                <img
                  src="../../assets/img/折线.png"
                  alt=""
                  @click="switcher(true)"
                >
                &nbsp; &nbsp; &nbsp;
                <img
                  src="../../assets/img/表格.png"
                  alt=""
                  @click="switcher(false)"
                >

              </div>

            </el-tab-pane>
            <!-- <el-tab-pane label="线路" name="first" v-if="!temp">
                            <el-form :inline="true" style="margin: 20px 0 0 0;">
                                <el-row>
                                    <el-col>
                                        <el-form-item  >
                                            <div class="block">

                                                <el-date-picker
                                                        v-model="value1"
                                                        type="datetime"
                                                        placeholder="选择日期时间">
                                                </el-date-picker>
                                            </div>
                                        </el-form-item>

                                        <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;">


                                    </el-col>
                                </el-row>
                            </el-form>
                        <div>biaoge </div>



                        </el-tab-pane> -->

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
      tempShow: true,
      tableShow: false,
      value1: "",
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
      /*baseOption: {
                    timeline: {
                        show: false,
                        type: 'slider',
                        axisType: 'category',
                        bottom: '10',
                        currentIndex: 0, //0 时表示当前选中项为 timeline.data[0]（即使用 options[0]

                        loop: true,
                        realtime: true, //拖动圆点的时候，是否实时更新视图。
                        controlPosition: 'left',
                        label: {
                            normal: {
                                color: '#2998ff',
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#fff',
                                borderColor: '#2998ff',
                                borderWidth: 2,
                            }
                        },
                        checkpointStyle: { //『当前项』（checkpoint）的图形样式
                            color: 'rgb(215, 0, 0)',
                        },
                        lineStyle: {
                            show: true, //false 不显示轴线
                            color: '#2998ff',
                        },
                        controlStyle: { //控制按钮的样式
                            show: true,
                            showPrevBtn: false,
                            showNextBtn: false,
                            itemGap: 50,
                            itemSize: 36,
                            normal: {
                                color: 'rgb(215, 0, 0)',
                                borderColor: 'rgb(215, 0, 0)',
                            },
                            emphasis: {
                                color: 'rgb(215, 0, 0)',
                                borderColor: 'rgb(215, 0, 0)',
                            },
                        },
                        data: ['区域人数', '流入人数', '流出人数'],
                    },
                    tooltip: { //提示框组件
                        trigger: 'axis',

                        axisPointer: {
                            type: 'shadow',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        textStyle: {
                            color: '#fff',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        }
                    },
                    grid: {
                        left: 10,
                        right: 35,
                        bottom: 70,
                        top: 60,
                        containLabel: true,
                    },
                    legend: { //图例组件，颜色和名字
                        right: 0,
                        top: 0,
                        itemGap: 16,
                        itemWidth: 20,
                        itemHeight: 14,
                        data: [{
                            name: '2019-08-05 至 2019-09-05',
                            icon: 'rect',
                        },

                        ],
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        }
                    },
                    dataZoom: [{
                        show: false,
                        bottom: 10,
                        start: 60,
                        end: 100,
                    }, {
                        type: "inside",
                        show: false,
                        height: 15,
                        start: 1,
                        end: 35
                    }],
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false, //坐标轴两边留白

                        axisLabel: { //坐标轴刻度标签的相关设置。
                            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                            margin: 15,
                            textStyle: {
                                color: '#078ceb',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ccc',
                            },
                        },
                        axisTick: { //坐标轴刻度相关设置。
                            show: false,
                        },
                        axisLine: { //坐标轴轴线相关设置
                            lineStyle: {
                                color: '#999',
                            }
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        splitNumber: 6,
                        axisLabel: {
                            textStyle: {
                                color: '#333',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            }
                        },

                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#ccc',
                            },
                        }

                    }],
                    series: [{

                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 0, //空心标记的大小
                        smooth: true, //是否平滑曲线显示
                        smoothMonotone: 'x', //指明是在 x 轴或者 y 轴上保持单调性
                        label: { //图形上的文本标签
                            normal: {
                                show: false,
                                position: 'top',
                                textStyle: {
                                    color: '#018ada',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                        },
                        lineStyle: { //线条样式
                            normal: {
                                width: 2,
                                color: '#4ac7f5',
                                opacity: 1,
                            }
                        },
                        itemStyle: { //折线拐点标志的样式。
                            normal: {
                                color: '#4ac7f5',
                                borderColor: '#4ac7f5',
                                borderWidth: 2,
                            }
                        }
                    }, {
                        markArea: {
                            silent: true,
                            label: {
                                normal: {
                                    position: ['10%', '50%']
                                }
                            },

                        },

                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 6, //空心标记的大小
                        smooth: true, //是否平滑曲线显示
                        smoothMonotone: 'x', //指明是在 x 轴或者 y 轴上保持单调性
                        label: { //图形上的文本标签
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#f6a436',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                        },
                        areaStyle: { //区域填充样式。
                            normal: {
                                opacity: 0,
                                color: '#f6a436'
                            }
                        },
                        lineStyle: { //线条样式
                            normal: {
                                width: 2,
                                color: '#f6a436'
                            }
                        },
                        itemStyle: { //折线拐点标志的样式。
                            normal: {
                                color: '#f6a436',
                                borderColor: '#f6a436',
                                borderWidth: 2,
                            }
                        }
                    }]
                },
                options: [

                    {

                        xAxis: [{
                            data: ['一周', '二周', '三周', '四周', '五周', '六周', '七周', '八周', '九周', '十周', '十一周', '十二周'],

                        }],
                        series: [{
                            data: [156, 23, 39, 56, 452, 70, 542, 638, 774, 102, 209, 456]
                        },

                        ]
                    },


                ]*/
      backgroundColor: "#000",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: ["票数", "件数", "重量", "成本"],
        align: "right",
        right: 20,
        textStyle: {
          color: "#fff"
        },
        itemGap: 30,
        itemWidth: 30,
        itemHeight: 10
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#034e90",
              width: 2,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9fceff",
              fontSize: 14
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          splitNumber: 6,
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#91bdeb",
              fontSize: 16
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00a1e4",
              width: 2,
              type: "solid"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#034e90",
              width: 2,
              type: "solid"
            }
          }
        }
      ],
      series: [
        {
          name: "票数",
          type: "line",
          data: (function() {
            var d = [];
            for (let i = 0; i < 12; i++) {
              d.push(parseInt(Math.random() * (100 - 50 + 1) + 50, 10));
            }
            return d;
          })(),
          itemStyle: {
            normal: {
              color: "#00a1e4"
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          }
        },
        {
          name: "件数",
          type: "line",
          data: (function() {
            var d = [];
            for (let i = 0; i < 12; i++) {
              d.push(parseInt(Math.random() * (90 - 40) + 40, 10));
            }
            return d;
          })(),
          itemStyle: {
            normal: {
              color: "#ffc600"
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          }
        },
        {
          name: "重量",
          type: "line",
          data: (function() {
            var d = [];
            for (let i = 0; i < 12; i++) {
              d.push(parseInt(Math.random() * (80 - 30 + 1) + 30, 10));
            }
            return d;
          })(),
          itemStyle: {
            normal: {
              color: "#24c768"
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          }
        },
        {
          name: "成本",
          type: "line",
          data: (function() {
            var d = [];
            for (let i = 0; i < 12; i++) {
              d.push(parseInt(Math.random() * (70 - 20 + 1) + 20, 10));
            }
            return d;
          })(),
          itemStyle: {
            normal: {
              color: "#de7008"
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          }
        }
      ]
    });

    window.onresize = eight.resize; // 基于准备好的dom，初始化echarts实例
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    //qiehuan表格
    switcher(t) {
      this.temp = t;
      if (t) {
		// 折线
		this.tempShow = true;
		this.tableShow = false;
      } else {
		// 表格
		this.tempShow = false;
		this.tableShow = true;
      }
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
  margin: 0px 80px 0 40px;
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