import Vue from 'vue'
import Router from 'vue-router'
// 首页
import index from '@/components/index'

// 产品服务
import product from '@/components/product/product'

//监视平台
import monitor from '@/components/monitor/monitor'
import gis from '@/components/monitor/gis'

// 通航设备
import navigation from '@/components/navigation/navigation'
import navigationTerminal from '@/components/navigation/navigationTerminal'
import navigationDetial from '@/components/navigation/navigationDetial'
    //订单
import orderstart from '@/components/navigation/order/orderstart'
    import orderapply from '@/components/navigation/order/orderapply'
    import orderconfirm from '@/components/navigation/order/orderconfirm'
    import orderfinsh from '@/components/navigation/order/orderfinsh'

// 解决方案
import solve from '@/components/solve/solve'

// 技术支持
import tech from '@/components/tech/tech'

//控制台
import admin from '@/components/admin/admin'
    //首页
    import adminindex from '@/components/admin/index/index'
    import news from '@/components/admin/index/news'

    //北斗卡管理
    import bdlist from '@/components/admin/bd/bdlist'
    import bdapply from '@/components/admin/bd/bdapply'
    import bdnetwork from '@/components/admin/bd/bdnetwork'
    import bdrel from '@/components/admin/bd/bdrel'

    //数据管理
    import dbwquery from '@/components/admin/data/dbwquery'
    import posquery from '@/components/admin/data/posquery'
    import disquery from '@/components/admin/data/disquery'
    import staquery from '@/components/admin/data/staquery'

    //增值业务管理
    import shortmes from '@/components/admin/scre/shortmes'

    //订单管理
    import orderadmin from '@/components/admin/order/orderadmin'
    import adminset from '@/components/admin/order/adminset'
    import invorceadmin from '@/components/admin/order/invorceadmin'
    import addresslist from '@/components/admin/order/addresslist'

    //问题反馈
    import myAnswer from '@/components/admin/answer/myanswer'

    //用户消息中心
    import userbase from '@/components/admin/user/userbase'
    import acount from '@/components/admin/user/acount'
    //飞行器管理
    import aircraftMgr from '@/components/admin/aircraft/aircraftMgr'



//登录
import login from '@/components/login/login'

// 注册
import resign from '@/components/login/resign'

//忘记密码
import forget from '@/components/login/forget'

//404
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/product/:id',
            name: 'product',
            component: product,
        },
        {
            path: '/monitor',
            name: 'monitor',
            component: monitor
        },
        {
            path: '/gis',
            name: 'gis',
            component: gis
        },
        {
            path: '/navigation',
            name: 'navigation',
            component: navigation,
            children:[
                {
                    path: '/terminal',
                    name: 'navigationTerminal',
                    component: navigationTerminal
                },
                {
                    path: '/navigation/:id',
                    name: 'navigationDetial',
                    component: navigationDetial
                },
                {
                    path: '/orderstart',
                    name: 'orderstart',
                    component: orderstart
                },
                {
                    path: '/orderapply',
                    name: 'orderapply',
                    component: orderapply
                },
                {
                    path: '/orderconfirm',
                    name: 'orderconfirm',
                    component: orderconfirm
                },
                {
                    path: '/orderfinsh',
                    name: 'orderfinsh',
                    component: orderfinsh
                }
            ]
        },
        {
            path: '/solve/:id',
            name: 'solve',
            component: solve,
        },
        {
            path: '/tech/:id',
            name: 'tech',
            component: tech,
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            children:[
                {
                    path: '/adminindex',
                    name: 'adminindex',
                    component: adminindex
                },
                {
                    path: '/news',
                    name: 'news',
                    component: news
                },
                {
                    path: '/bdlist',
                    name: 'bdlist',
                    component: bdlist
                },
                {
                    path: '/bdapply',
                    name: 'bdapply',
                    component: bdapply
                },
                {
                    path: '/bdnetwork',
                    name: 'bdnetwork',
                    component: bdnetwork
                },
                {
                    path: '/bdrel',
                    name: 'bdrel',
                    component: bdrel
                },
                {
                    path: '/dbwquery',
                    name: 'dbwquery',
                    component: dbwquery
                },
                {
                    path: '/posquery',
                    name: 'posquery',
                    component: posquery
                },
                {
                    path: '/disquery',
                    name: 'disquery',
                    component: disquery
                },
                {
                    path: '/staquery',
                    name: 'staquery',
                    component: staquery
                },
                {
                    path:'/shortmes',
                    name: 'shortmes',
                    component: shortmes
                },
                {
                    path: '/orderadmin',
                    name: 'orderadmin',
                    component: orderadmin
                },
                {
                    path: '/adminset',
                    name: 'adminset',
                    component: adminset
                },
                {
                    path: '/invorceadmin',
                    name: 'invorceadmin',
                    component: invorceadmin
                },
                {
                    path:'/addresslist',
                    name: 'addresslist',
                    component: addresslist
                },
                {
                    path:'/myanswer',
                    name:'myAnswer',
                    component: myAnswer
                },
                {
                    path:'/userbase',
                    name: 'userbase',
                    component: userbase
                },
                {
                    path:'/acount',
                    name:'acount',
                    component: acount
                },
                {
                    path: '/aircraftMgr',
                    name: 'aircraftMgr',
                    component: aircraftMgr
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component: login
        },
        {
            path:'/resign',
            name:'resign',
            component: resign
        },
        {
            path:'/forget',
            name:'forget',
            component:forget
        }
    ]
})
