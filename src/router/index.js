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
                    path: '/CustomeRevenue',
                    component: resolve => require(['../components/page/CustomeRevenue.vue'], resolve),
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
