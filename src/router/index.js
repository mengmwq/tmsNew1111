import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    //系统首页
                    path: '/index',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                /*{
                    path: '/aaa',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },*/
                /*{
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },*/
               /* {
                    path: '/3',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '3' }
                },*/

                {
                    //收支统计
                    path: '/statistical',
                    component: resolve => require(['../components/page/incomeStatistics.vue'], resolve),
                    meta: { title: '收支统计' }
                },
                {
                    // 客户收入统计 
                    path: '/CustomerRevenue',
                    component: resolve => require(['../components/page/CustomerRevenue.vue'], resolve),
                    meta: { title: '客户收入统计' },

                },
                {
                    // 客户收入明细
                    path: '/customeDatails',
                    component: resolve => require(['../components/page/customeDatails.vue'], resolve),
                    meta: { title: '客户收入明细' },
                },

                {
                    // 客户支出统计组件
                    path: '/CustomerSpending',
                    component: resolve => require(['../components/page/CustomerSpending.vue'], resolve),
                    meta: { title: '客户支出统计' }
                },
                {
                    //客户支出明细
                    path:'/CustomerSpendDetails',
                    component: resolve => require(['../components/page/CustomerSpendDetails.vue'], resolve),
                    meta: { title: '客户支出入明细' },

                },

                {
                    //未录入运费统计局NotRecorded
                    path: '/NotRecorded',
                    component: resolve => require(['../components/page/NotRecorded.vue'], resolve),
                    meta: { title: '未录入运费统计' },

                },
                {
                  //未录入明细
                    path:"/NotRecordedDatails",
                    component:resolve => require(['../components/page/NotRecordedDatails.vue'],resolve),
                    meta:{title:'未录入运费明细'}
                },

                {
                    //客户收支统计
                    path: '/BOPS',
                    component: resolve => require(['../components/page/BOPS.vue'], resolve),
                    meta: {title: '客户收支统计'}
                },
                {
                    //货量统计
                    path:'/Volume',
                    component:resolve => require(['../components/page/Volume.vue'],resolve),
                    meta:{title:'货量统计'}
                },
                {
                    //产品货量统计
                    path:'/ProductStatistics',
                    component:resolve => require(['../components/page/ProductStatistics.vue'],resolve),
                    meta:{title:'产品货量统计'}
                },
                {
                    //承运商费用统计
                    path:'/CarrierFees',
                    component:resolve => require(['../components/page/CarrierFees.vue'],resolve),
                    meta:{title:'承运商费用统计'}
                },
                {
                    //承运商费用未录入统计
                    path:'/CarrierNotRecorded',
                    component:resolve => require(['../components/page/CarrierNotRecorded.vue'],resolve),
                    meta:{title:'承运商费用未录入统计'}
                },
                {
                    //未录入明细NotEnterDetails
                    path:'/NotEnterDetails',
                    component:resolve => require(['../components/page/NotEnterDetails.vue'],resolve),
                    meta:{title:'承运商未录入明细'}
                },

                {
                    //线路承运成本统计
                    path:'/LineCostStatistics',
                    component:resolve => require(['../components/page/LineCostStatistics.vue'],resolve),
                    meta:{title:'线路承运成本统计'}
                },
                {
                    //年度报表
                    path:'/AnnualStatement',
                    component:resolve => require(['../components/page/AnnualStatement.vue'],resolve),
                    meta:{title:'年度报表列表'}
                },
                {
                    //项目周报
                    path:'/ProjectWeekly',
                    component:resolve => require(['../components/page/ProjectWeekly.vue'],resolve),
                    meta:{title:'项目周报列表'}
                },
                {
                    //周报
                    path:'/WeeklyNewspaper',
                    component:resolve => require(['../components/page/WeeklyNewspaper.vue'],resolve),
                    meta:{title:'周报列表'}
                },


                /*  {
                      // 图片上传组件
                      path: '/upload',
                      component: resolve => require(['../components/page/Upload.vue'], resolve),
                      meta: { title: '文件上传' }
                  },*/
                /*{
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },*/
                /*{
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },*/
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                /*{
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }*/
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
