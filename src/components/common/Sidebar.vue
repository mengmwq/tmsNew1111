<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" >
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title" style="color: #fff;"><router-link :to="subItem.index">{{ subItem.title}}</router-link></template>
                                    <template v-for="(threeItem,i) in subItem.subs">
                                        <el-submenu v-if="threeItem.subs" :key="i" :index="threeItem.index">
                                            <template slot="title"><router-link :to="threeItem.index">{{ threeItem.title }}</router-link></template>
                                                <template v-for="(fourItem,i) in threeItem.subs">
                                                    <el-submenu v-if="fourItem.subs" :key="i" :index="fourItem.index">
                                                        <template slot="title"><router-link :to="fourItem.index">{{fourItem.title}}</router-link></template>
                                                        <template v-for="(fiveItem,i) in fourItem.subs">
                                                            <el-submenu v-if="fiveItem.subs" :key="i" :index="fiveItem.index">
                                                                <template slot="title">{{fiveItem.title}}</template>
                                                                <el-menu-item v-for="(sixItem,i) in fiveItem.subs" :key="i" :index="sixItem.index">
                                                                    {{ sixItem.title }}
                                                                </el-menu-item>
                                                            </el-submenu>
                                                        </template>

                                                    </el-submenu>
                                                    <el-menu-item v-else :index="fourItem.index" :key="fourItem.index">
                                                        {{ fourItem.title }}
                                                    </el-menu-item>
                                                </template>
<!--                                            <el-menu-item v-for="(fourItem,i) in threeItem.subs" :key="i" :index="fourItem.index">-->
<!--                                                {{ fourItem.title }}-->
<!--                                            </el-menu-item>-->
                                        </el-submenu>
                                        <el-menu-item v-else :index="threeItem.index" :key="threeItem.index">
                                            {{ threeItem.title }}
                                        </el-menu-item>
                                    </template>
<!--                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">-->
<!--                                    {{ threeItem.title }}-->
<!--                                </el-menu-item>-->
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'index',
                        title: '系统首页',

                    },
                   /* {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },*/
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '/3',
                        title: '统计表',
                        subs: [
                            {
                                index: 'statistical',
                                title: '收支统计',
                                subs: [
                                    {
                                        index: 'CustomerRevenue',
                                        title: '客户收入统计'
                                    },
                                    {
                                        index: 'CustomerSpending',
                                        title: '客户支出统计'
                                    },
                                    {
                                        index: 'NotRecorded',
                                        title: '未录入运费统计'
                                    },
                                    /*{
                                        index: 'BOPS',
                                        title: '客户收支统计'
                                    },*/


                                ]
                            },
                         /*   {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器',
                                        subs: [
                                            {
                                                index: 'aaa',
                                                title: '孟健康四级1号',
                                                subs: [
                                                    {
                                                        index: 'bbb',
                                                        title: '李可爱五级1',
                                                        subs: [
                                                            {
                                                                index: '3大大大',
                                                                title: '李可爱六级1',
                                                            },
                                                            {
                                                                index: 'bbb大大大',
                                                                title: '李可爱六级2'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        index: 'bbb',
                                                        title: '李可爱五级2'
                                                    }
                                                ]
                                            },
                                            {
                                                index: 'aaa11',
                                                title:'孟健康四级2号'
                                            }
                                        ]
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },*/
                            {
                                index: 'Volume',
                                title: '货量统计',
                                subs: [
                                    {
                                        index: 'ProductStatistics',
                                        title: '产品货量统计'
                                    },



                                ]
                            },
                            {
                                index:'CarrierFees',
                                title:'承运商费用统计',
                                subs: [

                                    {
                                        index: 'CarrierNotRecorded',
                                        title: '承运商费用未录入统计'
                                    },
                                    {
                                        index: 'LineCostStatistics',
                                        title: '线路承运成本统计'
                                    },



                                ]
                            },
                            {
                                index:'AnnualStatement',
                                title:'年度报表',
                                subs: [

                                    {
                                        index: 'ProjectWeekly',
                                        title: '项目周报'
                                    },
                                    {
                                        index: 'WeeklyNewspaper',
                                        title: '周报'
                                    },



                                ]
                            },
                            {
                                index:'UsePackingBox',
                                title:'包装箱统计',

                            },
                        ]
                    },
                   /* {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '自定义图标'
                    },
                    {
                        icon: 'el-icon-lx-favor',
                        index: 'charts',
                        title: 'schart图表'
                    },*/
                    /*{
                        icon: 'el-icon-rank',
                        index: '6',
                        title: '拖拽组件',
                        subs: [
                            {
                                index: 'drag',
                                title: '拖拽列表',
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框',
                            }
                        ]
                    },*/
                    /*{
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }*/
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{

        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;

    }
    li.el-menu-item{
        color: #ffffff!important;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 210px;
        background-image: url(../../assets/img/menu-bg.png)  ;
       background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
