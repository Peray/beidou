// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueBus from 'vue-bus'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from '@/store/index'
// import user from '@/store/user'
import routes from '@/router/index'
import filter from '@/assets/js/filter/filter.js'
import config from '@/assets/js/config.js'
// import Globe from './globe.js'
import echarts from 'echarts'
import ol from 'openLayers/dist/ol.js'

Vue.prototype.$echarts = echarts
Vue.prototype.$ol = ol

Vue.config.productionTip = false

global.jumpPage = '/adminindex'

router.beforeEach((to, from, next) => {
	// if (to.path === '/login' || to.path === '/regin') {
	// 	sessionStorage.removeItem('user')
	// }
	// let user = JSON.parse(sessionStorage.getItem('user'))
	// if (!user && to.path === '/adminindex') {
	// 	global.jumpPage = '/adminindex'
 // 		next({ path: '/login' })
 // 	}else if (!user && to.path === '/gis'){
 // 		global.jumpPage = '/gis'
 // 		next({ path: '/login' })
 // 	} else {
 //  		next()
 // 	}
 	// if (!user && to.path === '/gis'){
 	// 	next({ path: '/login' })
 	// }
 	next()
})


Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueBus)
// Vue.use(Globe)

global.config = config;


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	VueResource,
	Vuex,
	store,
	VueBus,
	template: '<App/>',
	components: { App }
})

