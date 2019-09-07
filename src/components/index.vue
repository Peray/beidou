<template>
    <div class="hello">
        <el-container>
            <el-main>
                <banner-compent></banner-compent>
                <service-compent></service-compent>
                <solve-compent></solve-compent>
                <cooperative-compent></cooperative-compent>
            </el-main>   
        </el-container>
    </div>
</template>

<script>
import BannerCompent from '@/components/index/BannerCompent'
import ServiceCompent from '@/components/index/ServiceCompent'
import SolveCompent from '@/components/index/SolveCompent'
import CooperativeCompent from '@/components/index/CooperativeCompent'

export default {
    components:{
        BannerCompent,
        ServiceCompent,
        SolveCompent,
        CooperativeCompent
    },
    name: 'index',
    data () {
        return {
          hides:true,
          active:'1',
          s:'500px'
        }
    },
    mounted: function () {
        this.$store.dispatch('showup',this.hides);
        this.$store.dispatch('increase',this.active);
        this.$store.dispatch('h',this.s);
        global.jumpPage = '/adminindex'
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-main{
        padding: 0;
    }
</style>
