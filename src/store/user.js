import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)

const state = {
    logined: false,
    LoginedUser: {
        id: '',
        username: '',
        ip:'',
        createDate:'',
        realName:''
    }
}

// 创建改变状态的方法
const mutations = {

    // 登录
    LOGIN (state) {
        // 先让登录状态变为登录了
        state.logined = true
        // 然后去sessionStorage取用户数据
        let user = JSON.parse(sessionStorage.getItem('user'))
        // 再把用户数据发下去
        state.LoginedUser.id = user.id
        state.LoginedUser.username = user.loginName
        state.LoginedUser.ip = user.loginIp
        state.LoginedUser.createDate = user.createDate
        state.LoginedUser.realName = user.realName
    },

    // 登出
    LOGOUT (state) {
        state.logined = false
        state.LoginedUser.id = ''
        state.LoginedUser.username = ''
        state.LoginedUser.ip = ''
        state.LoginedUser.createDate = ''
        state.LoginedUser.realName = ''
    }
}

const actions = {
    login ({commit}) {
        commit('LOGIN')
    },

    logout ({commit}) {
        commit('LOGOUT')
    }
}
 
export default new Vuex.Store({
    state,
    mutations,
    actions
})