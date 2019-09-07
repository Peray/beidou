<template>
    <div class="olMap" :id="id"></div>
</template>

<script>
import ol from 'openLayers/dist/ol.js'
import 'openlayers/dist/ol-debug.css'
import {initialMap} from '@/assets/js/map/olFunction.js'

export default {
    name: 'olMap',
    props: {
        lat: {
            required: true,
            type: Number
        },

        lon: {
            required: true,
            type: Number
        },

        zoom: {
            required: false,
            type: Number,
            default: 12
        }
    },
    data () {
        return {
        
        }
    },
    computed: {
        id () {
            return this.$options.name + '-' + this._uid
        }
    },
    mounted () {
        this.loadMap();
    },
    methods: {
      loadMap: function(){
        this.$emit('id',this.id);
      }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .olMap{
        height:100%;
    }
</style>