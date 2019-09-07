<template>
    <div id="app">
        <nav-compent style="height: 70px;" v-show="hide"></nav-compent>
        <router-view/>
        <contact-compent v-show="hide"></contact-compent>
    </div>
</template>

<script>
import NavCompent from '@/components/nav/NavCompent'
import ContactCompent from '@/components/footer/ContactCompent'
export default {
    name: 'app',
    components:{
        NavCompent,
        ContactCompent
    },
    data() {
        return {
            
        }
    },
    created() {
       
        this.$store.dispatch('login');
       
    },
    mounted: function(){
        
    },
    computed:{
        hide() {
            return this.$store.state.hides;
        }
    },
    watch: {
        '$route'(to) {
            this.$store.dispatch('login');
        }
    }
}
</script>

<style>
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strong, sub, sup, var, b, u, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, 
tfoot, thead, tr, th, td ,textarea { 
    margin:0; padding:0;  
}
a{
    text-decoration: none;
    color: #000;
}
ul,ol,li{
    list-style: none;
}
#app {
    font-family: 'MicrosoftYaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    min-width: 1200px;
    height: 100%;
}
</style>
