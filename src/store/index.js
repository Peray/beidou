
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const LocalEvent = function(item){          // 定义一个本地存储的构造函数
    this.get = function () {                // 拿数据
        return JSON.parse(sessionStorage.getItem(item)) || '';
    }
    this.set = function (obj) {             // 存数据
        sessionStorage.setItem(item,JSON.stringify(obj));
    }
    this.clear = function () {              // 删数据
        sessionStorage.removeItem(item);
    }
}
const local = new LocalEvent('lx_notepad'); // 创建一个本地存储的事例


const state = {
    activeIndex:local.get('activeIndex'),
    hides:true,
    popu:'500px',
    rollid:15,
    adminIndex:local.get('adminIndex'),
    bool:false,

    
    logined: false,
    LoginedUser: {
        id: '',
        username: '',
        ip:'',
        createDate:'',
        realName:'',
        adminrole:''
    },
    unreadMessageCount: 0,
    menuIdtoName: {},
}

const mutations={
	selecta(state,v){
		state.activeIndex=v;
		local.set(state.activeIndex)
	},
	show(state,boolean){
		state.hides = boolean;
	},
	height(state,h){
		state.popu = h;
	},
	roll(state,roll){
		state.rollid = roll;
	},
	adminIndex(state,i){
		state.adminIndex=i
		local.set(state.adminIndex)
	},
	bool(state,n){
		state.bool = !n;
	},
    setMenuIdtoName(state, menuIdtoName) {
        state.menuIdtoName = menuIdtoName;
    },

	// 登录
    LOGIN (state) {
        // 先让登录状态变为登录了
        // state.logined = true
        // 然后去sessionStorage取用户数据
        let userString = sessionStorage.getItem('user');
        let user = null;
        if(userString) {
            user = JSON.parse(userString);
            state.logined = true;
            // let adminRole = JSON.parse(sessionStorage.getItem('adminRole'));
            // 再把用户数据发下去
            state.LoginedUser.id = user.id;
            state.LoginedUser.username = user.loginName;
            state.LoginedUser.ip = user.loginIp;
            state.LoginedUser.createDate = user.createDate;
            state.LoginedUser.realName = user.realName;
            state.LoginedUser.adminrole = user.roleNames;
        }
    },

    // 登出
    LOGOUT (state) {
        sessionStorage.removeItem('user');
        state.logined = false
        state.LoginedUser.id = ''
        state.LoginedUser.username = ''
        state.LoginedUser.ip = ''
        state.LoginedUser.createDate = ''
        state.LoginedUser.realName = ''
        state.LoginedUser.adminrole = ''
    },
    unreadMessageCount(state, unreadMessageCount) {
        state.unreadMessageCount = unreadMessageCount;
    }
}


const actions = {
	increase (context, num) {
		context.commit('selecta',num.toString())
	},
	showup (context, hides) {
		context.commit('show',hides)
	},
	h(context,s) {
		context.commit('height',s)
	},
	roll(context,rollid) {
		context.commit('roll',rollid)
	},
	adminIndex(context,aaa){
		context.commit('adminIndex',aaa)
	},
	bool(context,n){
		context.commit('bool',n)
	},


	login ({commit}) {
        commit('LOGIN')
    },
    logout ({commit}) {
        commit('LOGOUT')
    },
    unreadMessageCount(context, unreadMessageCount) {
        context.commit('unreadMessageCount', unreadMessageCount)
    }
}

export default new Vuex.Store({
	state,mutations,actions
});
