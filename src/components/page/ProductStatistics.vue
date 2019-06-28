<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 产品货量统计列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" style="margin: 20px 0 0 0;border-bottom:1px solid #ccc">
          <el-row>
            <el-col>
              <el-form-item label="服务对象">
                <el-select
                        v-model="selectData"
                        placeholder="请选择"
                        class="handle-select mr10"
                        @change="selectTrigger(selectData)"

                >
                  <el-option key="0" label="站点" value="站点"></el-option>
                  <el-option key="1" label="分控" value="分控"></el-option>
                  <el-option key="2" label="员工" value="员工"></el-option>

                </el-select>
              </el-form-item>
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
              <el-form-item label="区域选择">
                <el-input style="width: 80px"></el-input>
              </el-form-item>

              <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;">

              <span style="margin-left: 10px;  position: relative;top: -9px;">票数合计：500票</span>
              <div style="float: right">

                <img src="../../assets/img/导出.png" alt="" style="margin: 0 20px">
                <img src="../../assets/img/刷新.png" alt="" >

              </div>

            </el-col>
          </el-row>
        </el-form>
        <div style="margin:15px 0">
          <span style="font-size: 18px;color:#333;  ;padding-left:5px;font-weight: 800;border-left: 3px solid green;font-family: cursive;">
            全国货量排名-分控操作</span>
          <div style="float: right">

            <el-button type="primary">全站点</el-button>
            <el-button type="success">全区域</el-button>
<!--            <el-button type="info">信息按钮</el-button>-->
<!--            <el-button type="warning">警告按钮</el-button>-->
<!--            <el-button type="danger">危险按钮</el-button>-->

          </div>

        </div>
        <div id="tubiao" style="width:100%;height:200px;margin-bottom: 20px;"></div>
      </div>
      <el-table
              :data="tableData"
              style="width: 100%"
              ref="multipleTable"
              border
              element-loading-spinner="el-icon-loading2"
              element-loading-background="rgba(0, 0, 0, 0.2)"
              @selection-change="handleSelectionChange"
              v-loading="loading"
              text-align="center"
              height="350"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>

        <el-table-column prop="UnitName" label="区域" align="center"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="CountType" label="站点" align="center" ></el-table-column>
        <el-table-column prop="abc" label="城市" align="center"></el-table-column>
        <el-table-column prop="qq" label="票数" align="center"></el-table-column>
        <el-table-column prop="qq" label="4L" align="center"></el-table-column>
        <el-table-column prop="qq" label="12L" align="center"></el-table-column>
        <el-table-column prop="qq" label="28L" align="center"></el-table-column>
        <el-table-column prop="qq" label="35L" align="center"></el-table-column>
        <el-table-column prop="qq" label="45L" align="center"></el-table-column>
        <el-table-column prop="qq" label="56L" align="center"></el-table-column>
        <el-table-column prop="qq" label="70L" align="center"></el-table-column>
        <el-table-column prop="qq" label="97L" align="center"></el-table-column>
        <el-table-column prop="qq" label="130L" align="center"></el-table-column>
        <el-table-column prop="qq" label="150L" align="center"></el-table-column>
        <el-table-column prop="qq" label="CW" align="center"></el-table-column>
        <el-table-column prop="qq" label="CW(冬)" align="center"></el-table-column>
        <el-table-column prop="qq" label="xps保温箱" align="center"></el-table-column>
        <el-table-column prop="qq" label="XS26" align="center"></el-table-column>
        <el-table-column prop="qq" label="XS27" align="center"></el-table-column>
        <el-table-column prop="qq" label="XS28" align="center"></el-table-column>
        <el-table-column prop="qq" label="XS29" align="center"></el-table-column>
        <el-table-column prop="qq" label="A箱" align="center"></el-table-column>
        <el-table-column prop="qq" label="B箱" align="center"></el-table-column>
        <el-table-column prop="qq" label="新GB(大)" align="center"></el-table-column>
        <el-table-column prop="qq" label="GB(大)" align="center"></el-table-column>
        <el-table-column prop="qq" label="GB(小)" align="center"></el-table-column>
        <el-table-column prop="qq" label="托盘保温箱" align="center"></el-table-column>
        <el-table-column prop="qq" label="冷藏专车" align="center"></el-table-column>
        <el-table-column prop="qq" label="普货重量" align="center"></el-table-column>
        <el-table-column prop="qq" label="标准箱数量" align="center"></el-table-column>
        <el-table-column prop="qq" label="费用" align="center"></el-table-column>


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
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
export default {
  data(){
    return{
      serviceObject:'',//服务对象
      time:'',//时间
      tableData: [],//table数据
      cur_page: 1,//当前页
      limit: 20, //每页多少条
      ccc: 0, //总页数
      loading:false,
      selectData:'',
      tableData: [
        {
          UnitName: "ceshizhanghao1",
          CountType: "测试公司1",
          abc: "beij",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "山西",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "河北",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "湖南",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "湖南",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "湖南",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "湖南",
          qq: "100000"
        },
        {
          UnitName: "ceshizhanghao2",
          CountType: "测试公司2",
          abc: "湖南",
          qq: "100000"
        }

      ],
    }
  },
  name: "ProductStatistics",
  created(){
    //this.getData();
  },

  mounted() {
    var tubiao = echarts.init(document.getElementById('tubiao'));
    var data = [1000, 900, 800, 700, 600, 500, 400, 300,200, 100, 90, 80, 70, 60, 50, 40,30, 20, 10, 60, 80, 100, 120, 100,10, 20, 40, 60, 80, 100, 120, 100];
    var dataShadow = [];
    var yMax = 120;
    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    tubiao.setOption ({


      grid: {
        top: '10%',
        left: '0',
        right: '0',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        data: ['北京', '上海', '重庆', '山西', '南京', '云南', '河北', '上海','湖南','湖北','东北','山东','江苏','安徽','上海','浙江','江西','福建','台湾'],
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 45
        },
      },
      yAxis: {
        show: false
      },
      series: [{
        name: '销量',
        type: 'bar',
        barWidth: '10%',
        data: [1000, 900, 800, 700, 600, 500, 400, 300,200, 100, 90, 80, 70, 60, 50, 40,44, 43, 42, 60, 80, 100, 120, 100,10, 20, 40, 60, 80, 100, 120, 100],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00fcae'
            }, {
              offset: 1,
              color: '#006388'
            }]),
            opacity: 1,
          }
        }
      }]


  });
  },
  methods: {
    //区域选择触发事件
    selectTrigger(val) {
      if(val=="分控"){
        alert('fenk')
//请求分控页面
      }else if(val=='员工'){
        alert('yuangong')
      //请求员工页面
      }else{
        alert("zhandian")
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


  }
};
</script>

<style scoped>



</style>
