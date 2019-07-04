<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 产品货量统计列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
       <div class="handle-box">
        <el-form
          :inline="true"
          style="margin: 20px 0 0 0;border-bottom:1px solid #ccc"
        >
          <el-row>
            <el-col>
              <el-form-item label="服务对象">
                <el-select
                  style="width:100px;"
                  v-model="selectData"
                  placeholder="请选择"
                  class="handle-select mr10"
                  @change="selectTrigger"

                >
                  <el-option
                    key="1"
                    label="分控"
                    value="分控"
                  ></el-option>
                  <el-option
                    key="0"
                    label="站点"
                    value="站点"
                  ></el-option>

                  <el-option
                    key="2"
                    label="员工"
                    value="员工"
                  ></el-option>

                </el-select>
              </el-form-item>
              <el-form-item label="委托时间">
                <div class="block">
                  <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="区域选择">
                <el-select
                  v-model="form.tera"
                  placeholder="请选择大区"
                  @change="getArea()"
                  style="width:100px;"
                >
                  <el-option
                    label="请选择"
                    value=""
                  ></el-option>
                  <el-option
                    label="华北区"
                    value="华北区"
                  ></el-option>
                  <el-option
                    label="西北区"
                    value="西北区"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.pro"
                  placeholder="请选择省份"
                  @change="getPro()"
                  style="width:100px;"
                >
                  <el-option
                    label="请选择"
                    value=""
                  ></el-option>
                  <el-option
                    :label="item.name"
                    :value="item.name"
                    v-for="(item,index) in optionPro"
                    :key="index"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.city"
                  placeholder="请选择城市"
                  style="width:100px;"
                >
                  <el-option
                    label="请选择"
                    value=""
                  ></el-option>
                  <el-option
                    :label="item.name"
                    :value="item.name"
                    v-for="(item,index) in optionCity"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>

              <img
                src="../../assets/img/查询.png"
                alt="查询图标"
                style="margin-left: 10px;margin-top: 3px;cursor:pointer;"
                @click="getSearch()"
              >

              <span style="margin-left: 10px;  position: relative;top: -9px;">票数合计：500票</span>
              <div style="float: right">

                <img
                  src="../../assets/img/导出.png"
                  alt=""
                  style="margin: 0 20px"
                >
                <img
                  src="../../assets/img/刷新.png"
                  alt=""
                >

              </div>

            </el-col>
          </el-row>
        </el-form>
        <!-- 组件 -->
          <v-zhandian v-if="iszhandian" :searchParams='searchParams'></v-zhandian>
          <v-fenkong v-if="isfenkong" :searchParams='searchParams'></v-fenkong>
          <v-yuangong v-if="isyuangong" :searchParams='searchParams'></v-yuangong>
        </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import vZhandian from './product/zhandian.vue';
import vFenkong from './product/fenkong.vue';
import vYuangong from './product/yuangong.vue';

export default {
  components:{
    vZhandian,vFenkong,vYuangong
  },
  data() {
    return {
      selectData:'分控',
      time:'',
      form: {
        tera: "",
        city: "",
        pro: ""
      },
      optionCity: [],
      optionPro:[],
      iszhandian: false,
      isfenkong: true,
      isyuangong: false,
      searchParams: ''

    };
  },
  name: "ProductStatistics",
  created() {
    //this.getData();
  },

  mounted() {

  },
  methods: {
    //服务对象选择触发事件   清空搜索条件
    selectTrigger() {
        let val = this.selectData;
        this.form.city = "";
        this.form.pro = "";
        this.form.tera = "";
        this.time = '';
      if (val == "分控") {

        //请求分控页面
        this.iszhandian = false;
        this.isfenkong = true;
        this.isyuangong = false;


      } else if (val == "员工") {
        this.iszhandian = false;
        this.isfenkong = false;
        this.isyuangong = true;
      } else {
        // 站点
        this.iszhandian = true;
        this.isfenkong = false;
        this.isyuangong = false;
      }
    },
    getArea() {
      // 点击 大区
      // console.log(this.form.tera);
      this.form.city = "";
      this.form.pro = "";
      if (this.form.tera == "西北区") {
        this.optionPro = [{ name: "新疆" }, { name: "甘肃" }];
      } else {
        this.optionPro = [{ name: "北京" }, { name: "天津" },{ name: "山西省" }];
      }
    },

    getPro() {
      // 点击 省
      this.form.city = "";
      if (this.form.pro == "新疆") {
        this.optionCity = [
          { name: "乌鲁木齐" },
          { name: "哈撒给" },
          { name: "维吾尔族" }
        ];
      } else if (this.form.pro == "山西省") {
        this.optionCity = [
          { name: "临汾" },
          { name: "晋中" },
          { name: "大同" }
        ];
      } else if (this.form.pro == "北京") {
        this.optionCity = [
          { name: "朝阳区" },
          { name: "海淀区" },
          { name: "西城区" }
        ];
      } else if (this.form.pro == "甘肃") {
        this.optionCity = [
          { name: "武侯区" },
          { name: "锦江区" },
          { name: "成华区" }
        ];
      }
    },
    getSearch() {

      if (this.form.tera == "") {
        this.isZhandian = false;
        this.isQuyu = true;
      } else {
        // 点击搜索   传值   父传子
        let obj = {
          tera: this.form.tera,
          pro: this.form.pro,
          city: this.form.city,
          selectData:this.selectData
        }
        this.searchParams = JSON.stringify(obj);

      }
    },
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
.selectDataClass{
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    color:#fff;

}
.selectDataClass:nth-of-type(2){
    background: #00d1b2;
}
.selectDataClass:nth-of-type(3){
        background: #ff0000;
}
.selectDataClass:nth-of-type(4){
        background: #00ff00;
}

</style>
