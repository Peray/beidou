<template>
    <div class="map">
        <div id="allmap">

        </div>
    </div>
</template>

<script>
    // import {MP} from '@/assets/js/map'

    export default {
        name: 'bmap',
        data() {
            return {
                status: 0
            }
        },
        mounted: function () {
            this.$nextTick(() => {

                var mapScript = document.getElementById('mapScript');
                if (mapScript) {
                     this.initMap();
                }else {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "http://api.map.baidu.com/getscript?v=2.0&ak=9UTgovKEgN6uhI5EfUGscnYXFDylXseX";
                    script.id = "mapScript";
                    document.head.appendChild(script);
                    script.onload = () => {
                        this.initMap();
                    }
                 }
            });
        },
        methods: {
            initMap() {
                var map = new BMap.Map("allmap");            // 创建Map实例
                var point = new BMap.Point(116.373883, 39.987297); // 创建点坐标
                map.centerAndZoom(point, 5); // 3~19级
                map.enableScrollWheelZoom(true);
                map.setMapStyle({
                    styleJson: [{
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": {"visibility": "off"}
                    }]
                });//隐藏路网
            },
            refresh: function () {
                window.location.reload();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .map {
        height: 100%;
        #allmap {
            height: 100%;
            border: #ccc solid 1px;
            font-size: 12px;
        }
    }
</style>
