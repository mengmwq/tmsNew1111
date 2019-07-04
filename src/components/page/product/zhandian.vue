<template>
  <div>
    <el-row :gutter="24">

      <div style="margin:15px 0">
        <el-col :span="16">
          <span style="font-size: 18px;color:#333;  ;padding-left:5px;font-weight: 800;border-left: 3px solid green;font-family: cursive;">{{echart_title}}</span>
        </el-col>
        <el-col :span="5">

          <div>

            <div style="display:flex;align-items:center;float:left;">
              <el-select
                style="width:100px;"
                v-model="selectDataEchar"
                placeholder="请选择"
                class="handle-select mr10"
                @change="selectTriggerEchar"
              >
                <el-option
                  key="1"
                  label="类型"
                  value="类型"
                ></el-option>
                <el-option
                  key="0"
                  label="业务类型"
                  value="业务类型"
                ></el-option>
              </el-select>
              <div
                v-for="(item,index) in selectEcharData"
                :key="index"
                class="selectDataClass"
              >
                <span style="font-size: 14px">{{item}}</span>
              </div>

            </div>
          </div>

        </el-col>
        <el-col :span="3">
          <template>

            <div style="float: right">
              <el-button
                :class="isZhandian ? 'blackDefault' : 'blueActive'"
                @click="CLSD(1)"
              >全站点
              </el-button>
              <el-button
                :class="isQuyu ? 'blackDefault' : 'blueActive'"
                @click="CLSD(0)"
              >全区域
              </el-button>
            </div>
          </template>
        </el-col>
      </div>
    </el-row>
    <div
      id="tubiao"
      style="width:100%;height:200px;margin-bottom: 20px;"
    ></div>


	<el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        border
        element-loading-spinner="el-icon-loading2"
        element-loading-background="rgba(0, 0, 0, 0.2)"
 
        v-loading="loading"
        text-align="center"
        height="350"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="UnitName"
          label="区域"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <template v-if="table1">
          <el-table-column
            prop="CountType"
            label="站点"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="abc"
            label="城市"
            align="center"
          ></el-table-column>
        </template>
        <el-table-column
          prop="qq"
          label="票数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="4L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="12L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="28L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="35L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="45L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="56L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="70L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="97L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="130L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="150L"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="CW"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="CW(冬)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="xps保温箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="XS26"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="XS27"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="XS28"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="XS29"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="A箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="B箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="新GB(大)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="GB(大)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="GB(小)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="托盘保温箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="冷藏专车"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="普货重量"
          align="center"
        ></el-table-column>
		        <el-table-column
          prop="qq"
          label="普货件数"
          align="center"
        ></el-table-column>
		        <el-table-column
          prop="qq"
          label="调拨重量"
          align="center"
        ></el-table-column>
		        <el-table-column
          prop="qq"
          label="调拨件数"
          align="center"
        ></el-table-column>
		        <el-table-column
          prop="qq"
          label="人效标准箱数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="标准箱数量"
          align="center"
        ></el-table-column>

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
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      echart_title: "全国货量排名-站点操作",
      isZhandian: false,
      isQuyu: true,
      selectDataEchar: "类型",
	  selectEcharData: ["始发", "中转", "派送"],
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
	  ccc:0,
	  table1: true,
	loading: false,
	cur_page: 1,
	multipleSelection:'',
	limit: 10
    };
  },
  computed: {},
    // 接收  父页面  传过来的  参数   搜索的时候用
  props:{
	searchParams: {
        type: String,
        required: true
	  }
  },
    watch:{
	  searchParams(){
		  console.log(this.searchParams, "我是站点");
	  }
  },
  created(){

	  
  },
  methods: {
	      handleCurrentChange(val) {
      this.loading = true;
      this.cur_page = val;
    },

    handleSizeChange(val) {
      this.loading = true;

      // console.log(val); // 每页显示  条数
      this.limit = val;
	},
	
    selectTriggerEchar() {
      let val = this.selectDataEchar;
      if (val == "类型") {
        this.selectEcharData = ["始发", "中转", "派送"];
      } else {
        this.selectEcharData = ["临床临检", "非临床临检"];
      }
    },
    CLSD(val) {
      if (Number(val) === 1) {
        //全站点
		this.table1 = true;
        this.isZhandian = false;
        this.isQuyu = true;
        // 请求接口  走一个方法  然后  再走 this.get_zhandian(d,x);  一样得传这俩  渲染图标

        new Promise((resolve, reject) => {
          let data = this.getTableData("站点");
          resolve(data);
          //   console.log(data, 9);
        }).then(res => {
          this.get_zhandian(res.a, res.b);
        });
        // console.log("我要全站点的数据");
      } else {
        // 全区域
        this.isZhandian = true;
        this.isQuyu = false;
		this.table1 = false;
        new Promise((resolve, reject) => {
          let data = this.getTableData("区域");
          resolve(data);
        }).then(res => {
          this.get_zhandian(res.a, res.b);
        });
        // console.log("我要全区域的数据");
      }
    },
    // 请求接口
    getTableData(type) {
      // 到时候  接口  就写到这里
      if (type == "站点") {
        let d = [
          "北京",
          "上海",
          "重庆",
          "山西",
          "南京",
          "云南",
          "河北",
          "上海",
          "湖南",
          "湖北",
          "东北",
          "山东",
          "江苏",
          "安徽",
          "上海",
          "浙江",
          "江西",
          "福建",
          "台湾"
        ];
        let x = [[5,6,7],[1,2,3],[4,2,6]];
        let obj = { a: d, b: x };
        return obj;
      } else if (type == "区域") {
        let d = ["华北区", "东北区", "华中区", "华南区", "西南区", "西北区"];
        let x = [[5,6,7],[1,2,3],[4,2,6]];
        let obj = { a: d, b: x };
        return obj;
      }
    },
    //  渲染图标
    get_zhandian(xData, sData) {
      var tubiao = echarts.init(document.getElementById("tubiao"));
      tubiao.setOption(
        {
          tooltip: {
            trigger: "axis"
          },
          color: [
            "#37b70c",
            "#fae521",
            "#f29c00",
            "#dd3f36",
            "#b3013f",
            "#a00398"
          ],

          xAxis: [
            {
             
              type: "category",
              axisTick: {
                alignWithLabel: true
              },
              data: xData
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              data: sData[0],
              name: "派送",
              stack: "one",
              type: "bar"
            },
            {
              data: sData[1],
              name: "中转",
              stack: "one",
              type: "bar"
            },
            {
              data: sData[2],
              name: "始发",
              stack: "one",
              type: "bar"
            }
          ]
        },
        true
      );
    }
  },
  mounted() {
    // 默认  请求 全站点
    let d = [
      "北京",
      "上海",
      "重庆",
      "山西",
      "南京",
      "云南",
      "河北",
      "上海",
      "湖南",
      "湖北",
      "东北",
      "山东",
      "江苏",
      "安徽",
      "上海",
      "浙江",
      "江西",
      "福建",
      "台湾"
    ];
    let x = [[5,6,7],[1,2,3],[4,2,6]];

    /**
     *  等有接口  直接就请求接口获取数据   一个 d  x轴数据   x  对应的value
     * 默认全站点
     */
    this.get_zhandian(d, x);
  }
};
</script>
<style scoped>
.blackDefault {
  background: #eee;
  color: #000;
}

.blueActive {
  background: #00d1b2 !important;
  color: #fff;
}
.selectDataClass {
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
}
.selectDataClass:nth-of-type(2) {
  background: #00d1b2;
}
.selectDataClass:nth-of-type(3) {
  background: #ff0000;
}
.selectDataClass:nth-of-type(4) {
  background: #00ff00;
}
</style>
