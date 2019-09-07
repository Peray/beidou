<template>
    <div class="admin">
        <el-row>
            <el-col :span="20" class="logo">
                <router-link to="/index">
                    <img :src="logoImg">
                </router-link>
            </el-col>
            <el-col :span="4" class="user">
                <el-badge :value="unreadMessageCount" :max="10" class="item">
                     <img :src="usersrc" v-model="bool" @click="toggle(bool)">
                 </el-badge>
                <el-dropdown trigger="click" :hide-on-click="false" :show-timeout="0" :hide-timeout="0">
                    <span class="el-dropdown-link">
                        {{Username}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item>1111</el-dropdown-item> -->
                        <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <el-row :style="{height:row2h}" class="row2">
            <el-col :span="3">
                <admin-menu></admin-menu>
            </el-col>
            <el-col :span="21">
                <router-view/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    
    import adminMenu from '@/components/admin/menu'

    export default {
        components: {
            adminMenu
        },
        name: 'admin',
        data() {
            return {
                hides: false,
                active: '7',
                s: '350px',
                logoImg: require('@/assets/img/admin/adminlogo.png'),
                usersrc: require('@/assets/img/admin/news_icon2.png'),
                bool: false
            }
        },
        mounted: function () {
            this.$store.dispatch('h', this.s);
            this.$store.dispatch('showup', this.hides);
            this.$store.dispatch('increase', this.active);
            // console.log(this.user)
            //设置未读消息数量
            this.$http.get(config.getUnReadMessageCount).then(response => {
                    this.unreadMessageCount = response.body;
                },
                response => {
                    console.log(response);
                });
        },
        computed: {
            row2h() {
                return $('body').height() - 50 + 'px';
            },
            logined() {
                return this.$store.state.logined;
            },
            Username() {
                return this.$store.state.LoginedUser.username
            },
            unreadMessageCount: {
                get: function () {
                    return this.$store.state.unreadMessageCount
                },
                set: function (newValue) {
                    this.$store.state.unreadMessageCount = newValue
                }
            }
        },
        methods: {
            toggle(n) {
                this.bool = !n;
                this.$store.dispatch('bool', this.bool);
            },
            logOut() {
                this.$http.get(config.logout).then(response => {
                    sessionStorage.removeItem('user')
                    this.$store.dispatch('logout')
                    this.$router.push({path: '/index'})
                }, response => {
                    console.log(response);
                });
            }
        },
        watch: {
            // row2h:function(){
            //     return $('body').height()-50 +'px';
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .admin {
        height: 100%;
        & > .el-row:nth-child(1) {
            background-color: #fff;
            text-align: left;
            .logo {
                height: 50px;
                line-height: 50px;
                a {
                    display: inline-block;
                    height: 100%;
                    margin-left: 20px;
                    img {
                        vertical-align: middle;
                    }
                }
            }
            .user {
                height: 50px;
                line-height: 50px;
                cursor: pointer;
                .item {
                    img {
                        vertical-align: middle;
                        padding: 0 20px;
                    }
                    .el-badge__content.is-fixed {
                        bottom: 0;
                        top: auto;
                        right: 30px;
                    }
                    .el-badge__content {
                        line-height: 15px;
                        height: 15px;
                        padding: 0 4px;
                    }
                }
            }
        }
        .row2 {
            & > .el-col {
                height: 100%;
            }
            & > .el-col-3 {
                .el-menu {
                    border-right: none;
                }
            }
            & > .el-col-21 {
                background-color: #F1F3F6;
            }
        }
    }
</style>
