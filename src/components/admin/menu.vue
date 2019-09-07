<template>
    <div class="menu">
        <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :default-openeds="openIds"
        background-color="#fff"
        text-color="#A2A3A6"
        active-text-color="#fff"
        :unique-opened="true"
        router>
            <el-menu-item :index="indexmenu.href">
                <div @mouseenter="showActive(indexmenu.href,true)" @mouseleave="showActive(indexmenu.href,false)">
                    <i class="el-icon-">
                        <img :src="indexmenu.href == num || indexmenu.href == $route.path ? indexmenu.icon_selected : indexmenu.icon">
                    </i>
                    <span slot="title">{{indexmenu.name}}</span>
                </div>
            </el-menu-item>

            <el-submenu :index="`${index1}`"
            v-for="(first,index1) in firstmenu"
            :key="index1">
                <template slot="title">
                    <div @mouseenter="showActive(index1,true)" @mouseleave="showActive(index1,false)">
                        <i class="el-icon-">
                            <img :src="index1 == num ? adminimg+first.icon.split(';')[1] : adminimg+first.icon.split(';')[0]">
                        </i>
                        <span>{{first.name}}</span>
                    </div>
                </template>
                <el-menu-item :index="second.href" :ref="second.href == activePath ? 'activeItem' : second.href"
                v-for="(second,index2) in first.childMenus"
                :key="index2">
                    <span>{{second.name}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'leftmenu',
    data () {
        return {
            num: -1,
            indexmenu:{
                href:'/adminindex',
                icon:require('@/assets/img/admin/icon1_normal.png'),
                icon_selected:require('@/assets/img/admin/icon1_selected.png'),
                name:'首页'
            },
            firstmenu:[],
            adminimg:'',
            activePath: '/index',
            openIds:[]
        }
    },
    created() {
        this.activePath = this.$route.path;
    },
    mounted: function (){
        let index;
        this.adminRole == '运营角色' ? index = 3 : index = 2
        this.$http.get(config.adminmenu,{params:{target:index}}).then(response => {
            if(response.data.length != 0){
                this.firstmenu = response.data;
                this.$nextTick(() => {
                    var activeMenu = this.$refs.activeItem[0].$parent;
                    var activeMenuIndex = activeMenu.index;
                    this.openIds=[activeMenuIndex];
                })
            }
        }, response => {
            console.log(response.status);
        });
        this.adminimg = config.adminimgsrc
        this.$store.dispatch('adminIndex',this.aaa);
    },
    methods:{
        handleOpen(key, keyPath) {

            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        showActive(index,bool){
            bool==true ? this.num = index : this.num = -1
        }
    },
    watch:{
        '$route'() {
            this.activePath = this.$route.path;
        }
    },
    computed:{
        // activePath(){
        //     return this.$store.state.adminIndex
        // },
        aaa(){
            return this.$route.path
        },
        adminRole(){
            return this.$store.state.LoginedUser.adminrole
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .menu {
        .el-menu {
            li {
                text-align:left;
            }
        }
        .el-submenu .el-menu-item{
            min-width:auto;
        }

        //ÐÞ¸Ä×é¼þÄ¬ÈÏÑùÊ½
        .el-menu-item:hover,
        .el-submenu__title:hover,
        .el-submenu:hover{
            background-color:$primaryColor!important;
            color:#fff!important;
        }
        .el-menu-item.is-active{
            background-color:$primaryColor!important;
        }
    }
</style>
