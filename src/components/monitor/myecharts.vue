<template>
    <div class="myecharts" id="myChart" style="height:400px;"></div>
</template>

<script>
import echarts from 'echarts';
import '@/assets/js/myecharts.js';

export default {
    name: 'myecharts',
    data () {
        return {
        
        }
    },
    mounted () {
       echarts.myecharts()
    },
    methods: {
      
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .olMap{
        height:100%;
    }
</style>