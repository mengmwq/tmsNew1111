<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 未录入运费明细
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-form
                        :inline="true"
                        style="margin: 20px 0 0 0;"
                >
                    <el-row>
                        <el-col>

                            <el-form-item label="运单号">
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


                            <img
                                    src="../../assets/img/查询.png"
                                    alt="查询图标"
                                    style="margin-left: 10px;margin-top: 3px;"
                            >
                            <div style="float: right">
                                <el-form-item
                                        label="客户账号："
                                        style="padding: 0px 30px"
                                >
                                    <span>123456</span>
                                </el-form-item>

                                <img
                                        class='pointer'
                                        src="../../assets/img/导出.png"
                                        alt=""
                                        title='导出'
                                        style="margin: 0 20px"
                                >
                                <img
                                        class='pointer'
                                        src="../../assets/img/刷新.png"
                                        title='刷新'
                                        alt=""
                                >

                            </div>
                        </el-col>
                    </el-row>
                </el-form>

            </div>
            <el-row :gutter="24">
                <el-col :span="15">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            ref="multipleTable"
                            border
                            max-height="400"
                    >
                        <el-table-column
                                type="selection"
                                width="60"
                                align="center"
                        ></el-table-column>

                        <el-table-column
                                prop="GetCompany"
                                label="是否结算"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                type="index"
                                width="50"
                                label="结算方式"
                                align="center"
                                fixed
                        ></el-table-column>
                        <el-table-column
                                prop="ID"
                                label="运单号码"
                                align="center"
                        ></el-table-column>

                        <el-table-column
                                prop="Condition"
                                label="货物名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="运输方式"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="件"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="实际重量"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="计费重量"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="体积"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="委托时间"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="要求到货时间"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="操作人"
                                align="center"
                                :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                                prop="BillNumber"
                                label="详情"
                                align="center"
                                :show-overflow-tooltip="true"
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
                </el-col>
                <el-col :span="9">
                    <div style="border: 1px solid #ccc">
                        <div
                                style="padding: 10px;"
                                class="rightContent"
                        >
                            <div>

                                <span style="color:#333;font-size: 18px;font-weight: 800">运单号：123456</span>
                                <div style="float: right;padding-right:10px;font-family: cursive;font-weight: 800;display:flex;align-items:center;">
                                    <span><img src="../../assets/img/user.png" style="float:left;margin:0 5px 0 0;"></span>
                                    <span>孟健康</span>
                                </div>

                            </div>
                            <div>
                                <span style="font-family: cursive;">2019/12/18</span>
                                <div style="float: right;font-family: cursive ;padding-right:23px;font-weight: 800;display:flex;align-items:center;">
                                    <span><img src="../../assets/img/car.png" style="float:left;margin:0 5px 0 0;"></span>
                                    <span>火车</span>

                                </div>

                            </div>
                            <hr>
                            <div class="detailesContent">
                                <div style="margin-top: 15px">

                                    <el-button
                                            type="success"
                                            plain
                                            :loading="true"
                                    >货物信息</el-button>

                                    <ul style="text-indent: 20px;height: 30px;line-height: 30px">
                                        <li>货物名称：11</li>
                                        <li>件数：1</li>
                                        <li>体积：1</li>

                                    </ul>
                                    <ul style="text-indent: 20px;height: 30px;line-height: 30px">
                                        <li>实际重量：111</li>
                                        <li>计费重量：2222</li>
                                    </ul>

                                </div>
                                <div style="margin-top: 15px">
                                    <el-button
                                            type="primary"
                                            plain
                                            :loading="true"
                                    >包装信息</el-button>
                                    <p style="text-indent: 20px;margin: 20px 0;">包装材料：</p>
                                    <p style="text-indent: 20px;margin: 20px 0;">包装尺寸：</p>

                                </div>
                                <div style="margin-top: 15px">
                                    <el-button
                                            type="warning"
                                            plain
                                            :loading="true"
                                    >发件人信息</el-button>

                                    <p style="text-indent: 20px;margin: 20px 0;">发件人公司：</p>
                                    <span style="margin: 20px 0 20px 20px;  color:#666;font-size: 16px;">发件人：</span>
                                    <span style="margin: 0px 20px 20px 0px;float: right;  color:#666; font-size: 16px;">发件人联系方式：asgjgjokerpggeprp</span>
                                    <span style="margin: 20px 20px 20px 0px;float: right;  color:#666; font-size: 16px;">发件人地址：asgjgjokerpggeprp</span>

                                </div>
                                <div style="margin-top: 15px">
                                    <el-button
                                            type="primary"
                                            plain
                                            :loading="true"
                                    >收件人信息</el-button>

                                    <p style="text-indent: 20px;margin: 20px 0;">收件人公司：</p>
                                    <span style="margin: 20px 0 20px 20px;  color:#666;font-size: 16px;">收件人：</span>
                                    <span style="margin: 0px 20px 20px 0px;float: right;  color:#666; font-size: 16px;">收件人联系方式：asgjgjokerpggeprp</span>
                                    <span style="margin: 20px 20px 20px 0px;float: right;  color:#666; font-size: 16px;">收件人地址：asgjgjokerpggeprp</span>


                                </div>
                                <div style="margin: 15px 0">
                                    <el-button
                                            type="danger"
                                            plain
                                            :loading="true"
                                    >投保信息</el-button>
                                    <div style="margin-top: 15px">
                                        <span style="margin: 20px 0 20px 20px;  color:#666;font-size: 16px;">是否投保：</span>
                                        <span style="margin: 0px 20px 20px 0px;float: right;  color:#666; font-size: 16px;">投保金额：1231233</span>
                                    </div>

                                </div>
                                <div style="color:#999999;font-size: 16px;height: 40px;line-height: 40px;">注意事项……</div>

                            </div>
                        </div>

                    </div>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                restaurants: [{name:'新旺角茶餐厅',value: '10000015456'},{name:'旺角茶餐厅',value:'100000154578'},{name:'旺角茶餐厅',value:'1000004578562'}],
                state2:'',
                cur_page: 1,
                limit: 10,
                ccc: 500 //总页数
            };
        },
        methods: {
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
    };
</script>
<style scoped>
    ui,
    li {
        list-style: none;
        float: left;
        margin-left: 20px;
    }
    .rightContent div {
        margin-bottom: 10px;
    }
    .rightContent span {
        color: #333;
        font-size: 14px;
    }
    .detailesContent p {
        color: #666;
        font-size: 16px;
    }
    .mgb20 {
        margin-bottom: 20px;
    }
    .pointer {
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
