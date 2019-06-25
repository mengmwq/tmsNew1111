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
                                            v-model="time"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>



                            <el-form-item label="发件城市">
                                <el-input v-model="StartCity"></el-input>

                            </el-form-item>
                            <el-form-item label="收件城市">
                                <el-input v-model="EndCity"></el-input>

                            </el-form-item>
                            <img src="../../assets/img/查询.png" alt="查询图标" style="margin-left: 10px;margin-top: 3px;"
                                 @click="getData">
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
                    <div id="eight" style="width:100%;height:400px;"  v-loading="loading"></div>
                </el-col>
                <el-col :span="11">
                    <p  style="font-size: 18px;color:#333;margin: 10px 0 20px  ;padding-left:5px;font-weight: 800;border-left: 3px solid green">
                        货量统计
                    </p>
                    <el-row :gutter="24" >
                        <el-col :span="8">
                            <div id="eight2" style="width:100%;height:400px;"  v-loading="loading"></div>
                        </el-col>
                        <el-col :span="8">
                            <div id="eight22" style="width:100%;height:400px;"  v-loading="loading"></div>
                        </el-col>
                        <el-col :span="8">
                            <div id="eight222" style="width:100%;height:400px;"  v-loading="loading"></div>
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
                height="410"
                v-loading="loading"
                @cell-click="jumpDetails"
        >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="StartCity" label="发货城市" align="center"></el-table-column>
            <el-table-column prop="EndCity" label="收货城市" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Piao" label="票数" align="center"></el-table-column>
            <el-table-column prop="Jian" label="件数" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="重量" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.Cweight  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="CYPay" label="承运费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column  label="单公斤费用" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.CYSinglePay  | rounding}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ParkMoney" label="车辆费用" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="TakePay" label="分控取件费" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="TakePaySingle" label="取单件费" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="PsPay" label="分控派件费" align="center" :show-overflow-tooltip="true"  ></el-table-column>
            <el-table-column prop="PsPaySingle" label="派单件费" align="center" :show-overflow-tooltip="true"   ></el-table-column>
            <el-table-column prop="Count" label="合计" align="center" :show-overflow-tooltip="true"     class-name="curstomNum" label-class-name="aaa" :sortable="true"  ></el-table-column>


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
    import echarts from 'echarts';
    export default {
        data() {
            return {
                tableData: [],//table数据
                cur_page: 1,//当前页
                limit: 20, //每页多少条
                ccc: 0, //总页数
                time: '',//时间
                StateTime: '',
                EndTime: '',
                EndCity:'',
                StartCity:'',
                loading:true,
                Jian: '', // 总件数
                Piao : '', // 总票数
                Cweight : '' ,// 总重量
                setPiao: 0,
                setJian: 0,
                setCweight: 0
            };
        },
        created() {

            this.getData();
        },
        mounted(){

        },
        filters: {
            rounding(value) {
                return Number(value).toFixed(2)
            },
            weightGuo(value) {
                return Number(value).toFixed(3)
            }
        },
        methods:{
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
            jumpDetails(row, column, cell, event) {
                if (column.label === "合计") {
                    this.setPiao = ((row.Piao / this.Piao)* 100).toFixed(3);
                    this.setJian = ((row.Jian / this.Jian)* 100).toFixed(3);
                    this.setCweight = ((row.Cweight / this.Cweight)* 100).toFixed(3);
                    var eight2 = echarts.init(document.getElementById('eight2'));
                    var eight22 = echarts.init(document.getElementById('eight22'));
                    var eight222 = echarts.init(document.getElementById('eight222'));
                    eight2.setOption({

                        series: [{
                             color:["#00F5FF","#f8ac59"],
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
                                value: this.setPiao,
                                name: this.setPiao+'%',
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
                                    value: 100 - this.setPiao,
                                    name: '票数占比',
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
                            color:["#f8ac59","#00F5FF"],
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
                                value:  this.setJian,
                                name: this.setJian+'%',
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
                                    value:  100 - this.setJian,
                                    name: '件数占比',
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
                            color:["#f8ac59","#000"],
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
                                        fontSize: '25',
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
                                value: this.setCweight ,
                                name: this.setCweight+'%',
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
                                    value: 100-this.setCweight,
                                    name: '重量占比',
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
                }
            },

            // 第一次 渲染 饼图 3个合计
            setBing(){
                var eight2 = echarts.init(document.getElementById('eight2'));
                var eight22 = echarts.init(document.getElementById('eight22'));
                var eight222 = echarts.init(document.getElementById('eight222'));
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
                            value: this.setPiao,
                            name: this.setPiao,
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
                                value: 0,
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
                            value:  this.setJian,
                            name: this.setJian,
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
                                value:  0,
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
                            value: this.setCweight ,
                            name: this.setCweight,
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color:"#000"
                                    }
                                }
                            },
                        },
                            {
                                value: 0,
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
            //渲染表格
            getData() {
                // // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };

                this.$axios
                    .post(
                        "http://www.zjcoldcloud.com/zhanghaining/tms/public/index.php/carrierfees/linecoststatistics",
                        {
                            Page: this.cur_page,//当前页码
                            PageSize: this.limit,//每页条数
                            EndCity:this.EndCity,
                            StartCity:this.StartCity,
                            StateTime: this.time[0] || '',//开始时间
                            EndTime: this.time[1] || '', //结束时间

                        },
                    )
                    .then(res => {
                        this.tableData = res.data.data;
                        this.Jian = this.setJian  = res.data.Jian;
                        this.Piao = this.setPiao = res.data.Piao;
                        this.Cweight = this.setCweight = Number(res.data.Cweight).toFixed(2);

                        var eight = echarts.init(document.getElementById('eight'));

                        this.setBing();

                        var points = [];
                        eight.setOption ({
                            backgroundColor: '#011c3a',
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            xAxis: {
                                data: ['承运费用', '单公斤费', '车辆费用', '分控取件费', '取单件费', '分控派件费', '派单件费'],
                                axisLine: {
                                    lineStyle: {
                                        color: '#0177d4'
                                    }
                                },
                                axisLabel: {
                                    color: '#fff',
                                    fontSize: 14
                                },
                            },


                            yAxis: {
                                name: "（元）",
                                nameTextStyle: {
                                    color: '#fff',
                                    fontSize: 16
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#0177d4'
                                    }
                                },
                                axisLabel: {
                                    color: '#fff',
                                    fontSize: 16,

                                },
                                splitLine: {
                                    show:false,
                                    lineStyle: {
                                        color: '#0177d4'
                                    }
                                },
                                interval:500,
                                max:5000

                            },
                            series: [{

                                type: 'bar',

                                z: 12,
                                itemStyle:{
                                    normal:{
                                        color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#00b0ff'
                                        }, {
                                            offset: 0.8,
                                            color: '#7052f4'
                                        }], false)
                                    }
                                },
                                data: [254, 3254, 1654, 2454, 4757, 2011, 1211]
                            }]
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





                        this.ccc = res.data.sum;

                        this.loading = false;
                        if (res.data.code == 0) {
                            this.tableData = res.data.data;

                            this.ccc = res.data.sum;
                            this.loading = false;
                        } else if (res.data.code == 450) {
                            this.$message.success("登录时间过长，请重新登录");
                            this.$router.push("/login");
                        }
                    });
            },
        }

    };
</script>
<style>
    .curstomNum:not(.aaa) .cell {
        color: #649EFE !important;

    }



    .curstomNum:not(.aaa) .cell:hover {
        cursor: pointer;
    }
</style>
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
