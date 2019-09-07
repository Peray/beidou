<template>
    <div class="navigation">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'navigation',
    data () {
        return {
    		s:'350px',
            hides:true
        }
    },
    mounted: function (){
    	this.$store.dispatch('h',this.s);
        this.$store.dispatch('showup',this.hides);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>