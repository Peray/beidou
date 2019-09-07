<template>
    <div class="gis" :class="{openleft: openLeftFlag}">
        <div class="gis-left">
            <div class="gis-logo">
                <div class="gis-logo-div">
                    <img :src="footlogo" class="gis-logo-img" :alt="gisTitle">
                </div>
                <div class="gis-logo-text">
                    {{gisTitle}}
                </div>
            </div>
            <div class="gis-left-content">
                <section class="gis-left-section">
                    <el-dialog title="电子围栏图形设置"  :visible.sync="drawStyle" width="800px" :modal="!0" :append-to-body="!0">
                        <edit-style></edit-style>
                    </el-dialog>
                    <el-row>
                        <el-col :span="3">
                            <ul>
                                <li class="iconlist" :class="{active:index == search.num}"
                                    v-for="(item,index) in search.items" @click="tabChange(index)">
                                    <el-tooltip :content="item.des" placement="right" transition="el-fade-in-linear">
                                        <img :src="item.icon">
                                    </el-tooltip>
                                </li>
                            </ul>
                        </el-col>
                        <el-col :span="21" style="text-align:left;" class="gis-left-info">
                            <!--快捷视图-->
                            <div v-if="search.num == 2">
                                <ul style="height:calc(100% - 85px);overflow-y:auto;">
                                    <li class="layers" v-for="(item,index) in search.quick">
                                        <el-row>
                                            <el-col :span="3">
                                                <img @click="quickViewClick(item.id)"
                                                     :src="search.showicon"
                                                     style="vertical-align:middle;width:16px;">
                                            </el-col>
                                            <el-col :span="19">{{item.name}}</el-col>
                                            <el-col :span="2">
                                                <i class="el-icon-close" @click="deletequick(item.type,item.id,index,index)"></i>
                                            </el-col>
                                        </el-row>
                                    </li>
                                </ul>
                            </div>
                            <!--告警-->
                            <div v-if="search.num == 0">444</div>
                            <!--通航-->
                            <div v-if="search.num == 1">
                                <ul>
                                    <li class="addresslist" v-for="(item,index) in search.result"
                                        @click="addressDetail">
                                        <el-row>
                                            <el-col :span="2">
                                                <i class="el-icon-location"></i>
                                            </el-col>
                                            <el-col :span="22">
                                                <span>{{item}}</span>
                                            </el-col>
                                        </el-row>
                                    </li>
                                </ul>
                            </div>
                            <!--查询-->
                            <div v-if="search.num == 3">

                            </div>
                        </el-col>
                    </el-row>
                </section>
            </div>
        </div>
        <div class="gis-right">
            <div class="gis-header">
                <div class="show-in-left">
                    <i class="el-icon-menu" @click="toggleLeft"></i>
                </div>

                <div class="gisuser">
                    <el-popover
                        ref="userinfo"
                        placement="top"
                        width="160"
                        v-model="uservisible">
                        <ul>
                            <li class="mapset" @click="mapset">
                                <span><i class="el-icon-setting"></i>系统设置</span>
                            </li>
                            <li class="mapset" @click="mapset">
                                <span><i class="el-icon-setting"></i>信息管理</span>
                            </li>
                            <li class="mapset" @click="mapset">
                                <span><i class="el-icon-setting"></i>用户详情</span>
                            </li>
                            <li class="mapset" @click="mapset">
                                <span><i class="el-icon-setting"></i>退出系统</span>
                            </li>
                        </ul>
                    </el-popover>
                    <div class="gisuser-info" v-popover:userinfo>
                        <img :src="gisuser">
                        <span class="userName">{{LoginedUser.username}}</span>
                        <i :class="uservisibleIcon"></i>
                    </div>
                </div>
                <div class="gis-menu">
                    <div class="m-list-box">
                        <div class="m-list-title">功能窗口<i style="margin-left: 5px" class="el-icon-arrow-down"></i></div>
                        <ul class="m-list-ul">
                            <li class="m-list">新建窗口</li>
                            <li class="m-list">基本设置</li>
                            <li class="m-list">通航设置</li>
                        </ul>
                    </div>
                    <div class="m-list-box">
                        <div class="m-list-title">信息窗口<i style="margin-left: 5px" class="el-icon-arrow-down"></i></div>
                        <ul class="m-list-ul">
                            <li class="m-list">新建窗口</li>
                            <li class="m-list">基本设置</li>
                            <li class="m-list">通航设置</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="gis-main" ref="gismain">
                <div class="searchmodel" :style="{height:search.modelHeight}">
                    <el-input size="medium" :placeholder="placeholder" v-model="searchInput" @blur="searchBlur"
                              @focus="searchFocus" @click.native="toggle" v-show="!mapboole">
                        <el-select v-model="select" slot="prepend" @change="queryselect" style="width: 100px;">
                            <el-option label="飞行器" value="1"></el-option>
                            <el-option label="机场" value="2"></el-option>
                            <el-option label="航路" value="3"></el-option>
                        </el-select>

                        <el-button slot="append" :icon="searchIcon" class="map-search-btn"></el-button>
                    </el-input>

                    <div class="searchBorder" v-show="!mapboole">
                        <p></p>
                    </div>
                    <div class="blurBorder" :class="{activeW:active}"></div>

                    <transition name="slideLeft">
                        <div class="searchIgo" v-if='showCon'>
                            <div class="searchCon searchConPane">
                                <header>
                                    <el-row>
                                        <el-col :span="4" style="text-align:left;visibility:hidden;"
                                                v-show="search.span4">
                                            <el-button type="primary" icon="el-icon-back"></el-button>
                                        </el-col>
                                        <el-col :span="search.span24" style="height: 46px;line-height: 46px;">
                                            <div class="searchTitle">{{search.title}}</div>
                                        </el-col>
                                        <el-col :span="4" style="text-align:right;" v-show="search.span4">
                                            <el-button type="primary" icon="el-icon-menu"
                                                       @click.native="listChange"></el-button>
                                        </el-col>
                                    </el-row>
                                </header>
                                <section>
                                    <!-- <ul v-if="search.list">
                                        <li class="iemlist" v-for="(item,index) in search.items" @click="searchChange(index)">
                                            <el-row>
                                                <el-col :span="3">
                                                    <i :class="item.icon"></i>
                                                </el-col>
                                                <el-col :span="21" style="text-align:left;">
                                                    <span>{{item.des}}</span>
                                                </el-col>
                                            </el-row>
                                        </li>
                                    </ul> -->

                                    <ul v-if="search.list">
                                        <li class="iemlist" v-for="(item,index) in search.items"
                                            @click="searchChange(index)">
                                            <i v-if="index==0" :class="item.icon"></i>
                                            <img v-else :src="item.icon">
                                            <span>{{item.des}}</span>
                                        </li>
                                    </ul>
                                    <div v-else>
                                        <el-row>
                                            <el-col :span="3" style="box-shadow: 2px 0 2px 0 #ddd;">
                                                <ul>
                                                    <li class="iconlist" :class="{active:index == search.num}"
                                                        v-for="(item,index) in search.items" @click="tabChange(index)">
                                                        <el-tooltip :content="item.des" placement="right"
                                                                    transition="el-fade-in-linear">
                                                            <i v-if="index==0" :class="item.icon"></i>
                                                            <img v-else :src="item.icon">
                                                        </el-tooltip>
                                                    </li>
                                                </ul>
                                            </el-col>
                                            <el-col :span="21" style="text-align:left;">
                                                <div v-if="search.num == 0">
                                                    <ul>
                                                        <li class="addresslist" v-for="(item,index) in search.result"
                                                            @click="addressDetail">
                                                            <el-row>
                                                                <el-col :span="2">
                                                                    <i class="el-icon-location"></i>
                                                                </el-col>
                                                                <el-col :span="22">
                                                                    <span>{{item}}</span>
                                                                </el-col>
                                                            </el-row>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div v-if="search.num == 1" style="height:100%;">
                                                    <ul style="height:calc(100% - 85px);overflow-y:auto;">
                                                        <li class="layers" v-for="(item,index) in search.layers">
                                                            <el-row>
                                                                <el-col :span="3">
                                                                    <!-- <i v-show="item.childlayers" @click="item.layersshow ? item.layersshow = false : item.layersshow = true" :class="item.layersshow ? 'el-icon-minus' : 'el-icon-plus'"></i> -->
                                                                    <img v-show="item.childlayers"
                                                                         @click="item.layersshow ? item.layersshow = false : item.layersshow = true"
                                                                         :src="item.layersshow ? search.hidechild : search.showchild"
                                                                         style="vertical-align:middle;width:16px;">
                                                                </el-col>
                                                                <el-col :span="17"
                                                                        @click.native="item.layersshow ? item.layersshow = false : item.layersshow = true">
                                                                    {{item.name}}
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <img
                                                                        :src="item.eyesicon ? search.showicon  : search.hideicon"
                                                                        style="width:20px;vertical-align:middle;"
                                                                        @click="listlayers(item.type,item.id,index,index,item.eyesicon)"
                                                                        v-show="item.name!='基础底图组'">
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <i @click="item.detailshow = !item.detailshow"
                                                                       style="vertical-align:middle;"
                                                                       class="el-icon-more"></i>
                                                                </el-col>
                                                            </el-row>
                                                            <el-row v-show="item.detailshow">
                                                                <el-col :span="10" :offset="3">
                                                                    <div class="block">
                                                                        <el-slider
                                                                            v-model="item.layervalue"
                                                                            :step="10"
                                                                            show-stops
                                                                            @change="layerSliderControl(item.type,item.id,item.layervalue)">
                                                                        </el-slider>
                                                                    </div>
                                                                </el-col>
                                                                <el-col :span="2" :offset="3">
                                                                    <i class="el-icon-plus"
                                                                       v-show="item.name=='基础编辑图层组'"
                                                                       @click="showvisible(item)"></i>
                                                                </el-col>
                                                                <el-col :span="2"
                                                                        :offset="item.name=='基础编辑图层组' ? 0 : 5">
                                                                    <i class="el-icon-sort-up"
                                                                       @click="upRecord(item.type,search.layers,index)"></i>
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <i class="el-icon-sort-down"
                                                                       @click="downRecord(item.type,search.layers,index)"></i>
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <i class="el-icon-delete"
                                                                       v-show="item.name!='基础底图组'"
                                                                       @click="deletelayers(item.name,item.type,item.id,index,index)"></i>
                                                                </el-col>
                                                            </el-row>
                                                            <ul v-show="item.layersshow" class="childlayer">
                                                                <li class="layers" v-for="(list,e) in item.childlayers">
                                                                    <el-row>
                                                                        <el-col :span="16" :offset="4">{{list.name}}
                                                                        </el-col>
                                                                        <el-col :span="2">
                                                                            <img
                                                                                :src="list.eyesicon ? search.showicon  : search.hideicon"
                                                                                style="width:20px;vertical-align:middle;"
                                                                                @click="listlayers(list.type,list.id,index,e,list.eyesicon)">
                                                                        </el-col>
                                                                        <el-col :span="2">
                                                                            <i style="vertical-align:middle;"
                                                                               @click="list.detailshow = !list.detailshow"
                                                                               class="el-icon-more"></i>
                                                                        </el-col>
                                                                    </el-row>
                                                                    <el-row v-show="list.detailshow">
                                                                        <el-col :span="9" :offset="4">
                                                                            <div class="block">
                                                                                <el-slider
                                                                                    v-model="list.layervalue"
                                                                                    :step="10"
                                                                                    show-stops
                                                                                    @change="layerSliderControl(list.type,list.id,list.layervalue)">
                                                                                </el-slider>
                                                                            </div>
                                                                        </el-col>
                                                                        <el-col :span="2" :offset="3">
                                                                            <i class="el-icon-edit"
                                                                               :class="list.edits ? 'edit' : 'disedit'"
                                                                               v-show="item.name=='基础编辑图层组'"
                                                                               @click="layerCanEdit(index,e)"></i>
                                                                        </el-col>
                                                                        <el-col :span="2"
                                                                                :offset="item.name=='基础编辑图层组' ? 0 : 5">
                                                                            <i class="el-icon-sort-up"
                                                                               @click="upRecord(list.type,item.childlayers,e)"></i>
                                                                        </el-col>
                                                                        <el-col :span="2">
                                                                            <i class="el-icon-sort-down"
                                                                               @click="downRecord(list.type,item.childlayers,e)"></i>
                                                                        </el-col>
                                                                        <el-col :span="2">
                                                                            <i class="el-icon-delete"
                                                                               v-show="item.name!='基础底图组'"
                                                                               @click="deletelayers(item.name,list.type,list.id,index,e)"></i>
                                                                        </el-col>
                                                                    </el-row>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div v-if="search.num == 2">333</div>
                                                <div v-if="search.num == 3">444</div>
                                                <div v-if="search.num == 4">
                                                    <ul style="height:calc(100% - 85px);overflow-y:auto;">
                                                        <li class="layers" v-for="(item,index) in search.quick">
                                                            <el-row>
                                                                <el-col :span="3">
                                                                    <!-- <i v-show="item.childlayers" @click="item.layersshow ? item.layersshow = false : item.layersshow = true" :class="item.layersshow ? 'el-icon-minus' : 'el-icon-plus'"></i> -->
                                                                    <img v-show="item.childlayers"
                                                                         @click="item.layersshow ? item.layersshow = false : item.layersshow = true"
                                                                         :src="item.layersshow ? search.hidechild : search.showchild"
                                                                         style="vertical-align:middle;width:16px;">
                                                                </el-col>
                                                                <el-col :span="19"
                                                                        @click.native="item.layersshow ? item.layersshow = false : item.layersshow = true">
                                                                    {{item.name}}
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <i class="el-icon-delete"
                                                                       @click="deletequick(item.type,item.id,index,index)"></i>
                                                                </el-col>
                                                            </el-row>
                                                            <ul class="childlayer" v-show="item.layersshow">
                                                                <li class="layers" v-for="(list,e) in item.childlayers">
                                                                    <el-row>
                                                                        <el-col :span="18" :offset="4"
                                                                                @click.native="quickViewClick(list.id)">
                                                                            {{list.name}}
                                                                        </el-col>
                                                                        <el-col :span="2">
                                                                            <i class="el-icon-delete"
                                                                               @click="deletequick(list.type,list.id,index,e)"></i>
                                                                        </el-col>
                                                                    </el-row>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </section>
                            </div>
                            <div class="searchdetail" :class="{detailActive: detailActive}">
                                <header>
                                    <el-row>
                                        <el-col :span="4" style="text-align:left;">
                                            <el-button type="primary" :icon="downIcon"
                                                       @click.native="slideToggle"></el-button>
                                        </el-col>
                                        <el-col :span="16" style="height: 46px;line-height: 46px;">
                                            <div class="searchTitle">111</div>
                                        </el-col>
                                        <el-col :span="4" style="text-align:right;">
                                            <el-button type="primary" icon="el-icon-share"></el-button>
                                        </el-col>
                                    </el-row>
                                </header>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="gis-layer-ctrl">
                    <div class="layer-ctrl-btn" :class="isShowLayerCtrl ? 'active': ''" @click="toggleLayerCtrl"></div>
                </div>
                <div class="toolTip">
                    <ul>
                        <li v-for="(item,index) in toolTip" class="firstLi" @click="toggledown(index,toolTip)">
                            <img style="vertical-align:middle;" :src="item.icon"/>
                            <span :class="{active:num == index}">{{item.title}}</span>
                            <i :class="item.iconDown" v-if="item.secondtoolTip"></i>
                            <ul v-show="item.isclose">
                                <li v-for="(second,childindex) in item.secondtoolTip"
                                    @click="doevent(index,childindex)">
                                    <i class="second.icon"></i>
                                    <span>{{second.title}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="logo">
                    <img :src="logoImg">
                </div>
                <el-dialog
                    title="添加图层"
                    :visible.sync="dialoglayer"
                    width="30%">
                    <el-input v-model="layerName" placeholder="请输入图层名称"></el-input>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="dialoglayer = false">取 消</el-button>
                <el-button type="primary" @click="addlayers(layerName)">确 定</el-button>
            </span>
                </el-dialog>
                <el-dialog
                    title="添加地图标签"
                    :visible.sync="addlabel.dialoglabel"
                    width="25%" id="selectlabel">
                    <el-form label-width="100px">
                        <el-form-item label="书签名称">
                            <el-input v-model="addlabel.labelName" placeholder="请输入地图标签名称"></el-input>
                        </el-form-item>
                        <el-form-item label="是否对外开放" style="text-align:left;">
                            <el-switch v-model="addlabel.labelValue"></el-switch>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="addlabel.dialoglabel = false">取 消</el-button>
                        <el-button type="primary" @click="addmapLbel(search.quick,addlabel.labelName,addlabel.labelValue)">确 定</el-button>
                    </span>
                </el-dialog>
                <div class="winmap" :class="{winmapdt:mapboole}" @onpropertychange="updateSize()">
                    <!-- <ol-map :lat="39.915168" :lon="116.403875" v-on:id="listenToOlMapId"></ol-map> -->
                    <my-chart></my-chart>
                </div>
                <div class="basicmap" :class="{basicmapdt:mapboole}">
                    <ol-map :lat="39.915168" :lon="116.403875" v-on:id="listenToOlMapId"></ol-map>
                </div>
            </div>
        </div>
        <div class="copyrightInfo">
            <el-row style="line-height:22px;">
                <el-col :span="16">
                    <span class="infoText">{{copyright.info}}</span>
                </el-col>
               <!--  <el-col :span="4">
                    <span>投影方式:</span>
                    <el-select v-model="selectvalue" size="mini" @change="handleCommand" style="width:110px;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col> -->
                <el-col :span="4">
                    <el-popover
                        ref="popover4"
                        placement="top"
                        width="200"
                        trigger="click"
                        v-model="local.visible">
                        <el-input v-model="local.inputLng" placeholder="请输入经度" size="mini"
                                  class="popoverInput"></el-input>
                        <el-input v-model="local.inputLat" placeholder="请输入纬度" size="mini"
                                  class="popoverInput"></el-input>
                        <el-button size="mini" class="popoverBtn" @click="localconfirm(local.inputLng,local.inputLat)">
                            确认
                        </el-button>
                    </el-popover>
                    <span v-popover:popover4 style="cursor:pointer;">当前坐标：</span>
                    <span>{{copyright.coord}}</span>
                </el-col>
                <el-col :span="2">
                    当前级别：
                    <el-tag size="mini">{{copyright.zoom}}</el-tag>
                </el-col>
                <el-col :span="2">
                    飞机总数：
                    <el-tag size="mini" type="danger">{{copyright.num}}</el-tag>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import olMap from '@/components/monitor/olMap'
    import myChart from '@/components/monitor/myecharts'
    import ol from 'openLayers/dist/ol.js'
    import '@/assets/js/map/olFunction.js';

    import EditStyle from './EditStyle.vue'
    export default {
        name: 'app',
        components: {
            olMap,
            myChart,
            EditStyle
        },
        data() {
            return {
                drawStyle: false,
                // 左侧展开
                openLeftFlag: false,
//            logoImg: require('@/assets/img/logo.png'),
                gisTitle: '北斗低空监视与信息服务平台',
                // 图层控制
                isShowLayerCtrl: false,
                mapId: '',
                hides: false,
                detailActive: false,
                dialoglayer: false,
                mapboole: false,
                addlabel: {
                    dialoglabel: false,
                    labelName: '',
                    enterName: '',
                    labelValue: '',
                    radio: '1'
                },
                layerName: '基础矢量图层',
                layerArr: '',
                placeholder: '请输入飞行器编号，例：000001',
                active: false,
                searchInput: '',
                select: '飞行器',
                searchIcon: 'el-icon-search',
                downIcon: 'el-icon-upload2',
                showCon: false,
                jsHeight: '',
                num: '-1',
                logoImg: require('@/assets/img/resignlogo.png'),
                footlogo: require('@/assets/img/footlogo.png'),
                gisuser: require('../../../static/img/gis/mapuser.png'),
                uservisible: false,
                local: {
                    inputLng: '',
                    inputLat: '',
                    visible: false
                },
                selectvalue: '3857',
                options: [
                    {
                        value: '3857',
                        label: 'EPSG:3857'
                    }, {
                        value: '4326',
                        label: 'EPSG:4326'
                    }
                ],
                search: {
                    modelHeight: '55px',
                    span4: false,
                    list: false,
                    span24: 24,
                    title: '通航监视平台',
                    num: 0,
                    showicon: require('../../../static/img/gis/eye100.png'),
                    hideicon: require('../../../static/img/gis/eye101.png'),
                    showchild: require('../../../static/img/gis/eye10.png'),
                    hidechild: require('../../../static/img/gis/eye11.png'),
                    quickvalue: '',
                    groupchildlayers: [],
                    quick: [],
                    layers: [],
                    items: [
                        {
                            icon: require('../../assets/img/version2/tonghang2.png'),
                            des: '通航列表'
                        },
                        {
                            icon: require('../../assets/img/version2/gaojing2.png'),
                            des: '告警信息'
                        },
                        {
                            icon: require('../../assets/img/version2/4_icon_sel.png'),
                            des: '快捷视图'
                        },
                        {
                            icon: require('../../assets/img/version2/3_icon_sel.png'),
                            des: '查询结果'
                        }
                    ],
                    result: [
                        '北京市海淀区中关村南三街6号中科资源大厦'
                    ]
                },
                copyright: {
                    info: '@2017 中国民航科学技术研究院 版权所有',
                    coord: '',
                    zoom: '10',
                    num: '10'
                },
                toolTip: [
                    {
                        icon: require('../../../static/img/gis/bdgj.png'),
                        title: '北斗工具',
                    },
                    {
                        icon: require('../../../static/img/gis/clgj.png'),
                        iconDown: 'el-icon-arrow-down',
                        title: '测量工具',
                        isclose: false,
                        secondtoolTip: [
                            {
                                icon: 'el-icon-edit',
                                title: '面积量算',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '距离量算',
                            }
                        ]
                    },
                    {
                        icon: require('../../../static/img/gis/mapgj.png'),
                        iconDown: 'el-icon-arrow-down',
                        title: '地图工具',
                        isclose: false,
                        secondtoolTip: [
                            {
                                icon: 'el-icon-edit',
                                title: '选择',
                            },
                            {
                                icon: 'el-icon-delete',
                                title: '删除',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '清除',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '添加地图标签',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '添加距离环',
                            }
                        ]
                    },
                    {
                        icon: require('../../../static/img/gis/hzgj.png'),
                        iconDown: 'el-icon-arrow-down',
                        title: '绘制工具',
                        isclose: false,
                        secondtoolTip: [
                            {
                                icon: 'el-icon-edit',
                                title: '点'
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '线',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '面',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '矩形',
                            },
                            {
                                icon: 'el-icon-edit',
                                title: '圆形',
                            }
                        ]
                    }
                ]
            }
        },
        mounted: function (x) {
            this.$nextTick(() => {
                this.setGisMapStyle();
            });
            window.addEventListener('resize', () => {
                this.setGisMapStyle();
            });
            this.$store.dispatch('showup', this.hides)
            ol.initial(this);
        },
        methods: {
            toggleLeft() {
                this.openLeftFlag = !this.openLeftFlag;
            },
            mapUpdateSize() {
                let timenum = 0;
                let timer = setInterval(() => {
                    if (timenum >= 300) {
                        clearInterval(timer)
                    }
                    map.updateSize();
                    timenum += 20;
                }, 20)
            },
            // 设置地图区域高度，宽度
            setGisMapStyle() {
                let gisMain = this.$refs.gismain;
                let gisMainOffsetLeft = gisMain.offsetLeft;
                let gisMainoOffsetTop = gisMain.offsetTop;
                let appWidth = this.$root.$el.offsetWidth;
                let appHeight = this.$root.$el.offsetHeight;
//            gisMain.style.width = appWidth - gisMainOffsetLeft + 'px';
                gisMain.style.height = appHeight - gisMainoOffsetTop + 'px';
            },
//        显示图层控制
            toggleLayerCtrl() {
                this.isShowLayerCtrl = !this.isShowLayerCtrl
            },
            listenToOlMapId: function (id) {
                this.mapId = id
            },
            openDrawStyle() {
                this.drawStyle = true;
            },
            closeDrawStyle() {
                this.drawStyle = false;
            },
            toggle(e){
//                if(e.target.className == 'el-input-group__append' || e.target.className == 'el-icon-menu' || e.target.className == 'el-icon-arrow-left'){
//                    if(this.searchIcon == 'el-icon-menu'){
//                        this.searchIcon = 'el-icon-arrow-left'
//                        this.showCon = true
//                        this.search.modelHeight = '100%'
//                    }else{
//                        this.searchIcon = 'el-icon-menu'
//                        this.showCon = false
//                        setTimeout(()=>{
//                            this.search.modelHeight = '55px'
//                        },500)
//
//                    }
//                }
            },
            queryselect(name){
                if (name == '1') {
                    this.placeholder = '请输入飞行器编号，例：000001'
                } else if (name == '2') {
                    this.placeholder = '请输入机场名称'
                } else if (name == '3') {
                    this.placeholder = '请输入机尾号，例1234'
                }
            },
            slideToggle(){
                this.detailActive = !this.detailActive
                if (!this.detailActive) {
                    this.downIcon = 'el-icon-upload2'
                } else {
                    this.downIcon = 'el-icon-download'
                }
            },
            addressDetail(){
                this.detailActive = true
                this.downIcon = 'el-icon-download'
            },
            searchBlur(){
                this.placeholder = '请输入内容'
                this.active = false
            },
            searchFocus(){
                this.placeholder = ''
                this.active = true
            },
            searchChange(index){
                this.search.num = index
                this.search.title = this.search.items[index].des
                this.search.span4 = true
                this.search.span24 = 16
                this.search.list = false
            },
            listChange(){
                this.search.title = '通航监视平台'
                this.search.span4 = false
                this.search.span24 = 24
                this.search.list = true
            },
            swapItems(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0]
                return arr
            },
            // 上移
            upRecord(type, arr, index) {
                if (index == 0) {
                    return
                }
                if (type == 'layer')
                    map.changeZIndexByTwoLayerId(arr[index].id, arr[index - 1].id)
                else
                    map.changeZIndexByTwoGroupId(arr[index].id, arr[index - 1].id)
                this.swapItems(arr, index, index - 1)
            },
            // 下移
            downRecord(type, arr, index) {
                if (index == arr.length - 1) {
                    return
                }
                if (type == 'layer')
                    map.changeZIndexByTwoLayerId(arr[index].id, arr[index + 1].id)
                else
                    map.changeZIndexByTwoGroupId(arr[index].id, arr[index + 1].id)
                this.swapItems(arr, index, index + 1)
            },
            showvisible(arr){
                this.dialoglayer = true
                this.layerArr = arr
            },
            addlayers(layerName){
                this.dialoglayer = false
                var groupId = this.layerArr.id
                var name = this.layerArr.name
                this.$http.post(config.insertLayerControl, {
                    'layerName': this.layerName,
                    'layerLabel': this.layerName,
                    'layerGroupId': groupId
                }, {emulateJSON: true}).then(response => {
                    if (response != undefined) {
                        this.layerArr.childlayers.push({
                            'name': layerName,
                            'detailshow': false,
                            'eyesicon': true,
                            'layervalue': 100,
                            'id': response.body.id,
                            'type': 'layer',
                            'edits': false
                        })
                        var order = (this.layerArr.order * 100 + response.body.layerOrder)
                        var newLy = map.createVectorLayer(groupId, response.body.id, layerName, order, true)
                        this.layerName = ""
                    }
                })
            },
            listlayers(type, id, index, e, boole){
                if (type == 'layer') {
                    if (index == 5) {
                        var layers = this.search.layers[index].childlayers
                        if (!boole) {
                            layers.forEach(l => {
                                if (l.eyesicon) {
                                    l.eyesicon = false
                                    map.getLayerById(l.id).setVisible(false)
                                }
                            })
                            layers[e].eyesicon = true
                            map.getLayerById(id).setVisible(true)
                        }
                    }
                    else {
                        this.search.layers[index].childlayers[e].eyesicon = !boole
                        var layers = this.search.layers[index].childlayers
                        map.getLayerById(id).setVisible(!boole)
                    }
                } else {
                    this.search.layers[index].eyesicon = !this.search.layers[index].eyesicon
                    map.getGroupById(id).setVisible(!boole);
                }
            },
            deletelayers(name, type, id, index, e){
                if (type == 'layer') {
                    if (name == "基础编辑图层组") {
                        this.$http.delete(config.deleteLayerControl, {params: {'id': id}}).then(response => {
                            if (response.body)
                                this.search.layers[index].childlayers.splice(e, 1)
                            else
                                this.$message.error('删除失败!')
                        })
                    }
                }
                else {
                    this.search.layers.splice(index, 1)
                }
            },
            deletequick(type, id, index, e, boole){
                if (type == 'layer')
                    this.search.quick[index].childlayers.splice(e, 1);
                else
                    this.search.quick.splice(index, 1)
            },
            layerSliderControl(type, id, val){
                if (type == 'layer')
                    map.getLayerById(id).setOpacity(val / 100)
            },
            layerCanEdit(index, e){
                var layers = this.search.layers[index].childlayers
                layers.forEach(l => {
                    if (l.id == layers[e].id) {
                        l.edits = !l.edits
                        if (l.edits)
                            ol.default.editLayer = map.getLayerById(l.id);
                        else
                            ol.default.editLayer = null
                    } else if (l.edits) {
                        l.edits = false
                    }
                })
            },
            tabChange(index){
                this.openLeftFlag = true;
                this.search.num = index
                this.search.title = this.search.items[index].des
            },
            toggledown(index, arr){
                var boole = this.toolTip[index].isclose;
                arr.forEach(i => {
                    i.isclose = false
                })
                this.num = index
                if (index == 0) {
                    //北斗工具
                    //保存编辑矢量图层
                    var layer = ol.default.editLayer
                    var layerId = layer.getProperties().id
                    if (layerId != undefined) {
                        var features = layer.getSource().getFeatures()
                        features.forEach(feature => {
                            var id = feature.getProperties().id
                            if (id == undefined) {
                                var type = feature.getProperties().type
                                var arrayString;
                                var geoMetry = feature.getGeometry();
                                if (type != 'Circle')
                                    arrayString = geoMetry.getCoordinates().toString()
                                else
                                    arrayString = geoMetry.getCenter().toString() + ',' + geoMetry.getRadius().toString()

                                var projection = map.getView().getProjection().getCode()

                                this.$http.post(config.insertFeaturesManager, {
                                    'layerId': layerId,
                                    'features': arrayString,
                                    'type': type,
                                    'projection': projection
                                }, {emulateJSON: true}).then(response => {
                                    // feature.set("id", response.body.id);
                                })
                            }
                        })
                    }
                } else {
                    this.toolTip[index].isclose = !boole
                    if (this.toolTip[index].isclose) {
                        this.toolTip[index].iconDown = 'el-icon-arrow-up'
                    } else {
                        this.toolTip[index].iconDown = 'el-icon-arrow-down'
                        this.num = -1
                    }
                }
            },
            doevent(index, childindex){
                if (index == 3) {
                    ol.drawFigureFunction(childindex)
                } else if (index == 2) {
                    if (childindex == 0) {
                        // alert("选择")
                        ol.selectTransInteraction()
                    } else if (childindex == 1) {
                        ol.deleteFeatureInteraction()
                    } else if (childindex == 2) {
                        this.clear()
                    } else if (childindex == 3) {
                        this.addlabel.dialoglabel = true

                    } else if (childindex == 4) {
                        alert("添加距离还")
                    }
                } else if (index == 1) {
                    ol.measureFunction(childindex)
                }
            },
            clear(){
                map.removeLayers();
            },
            groupArr(index){
                this.groupchildlayers = this.search.quick[index].childlayers
            },
            quickViewClick(id){
                map.getView().setViewById(id);
            },
            addmapLbel(arr, name, value){
                var center = map.getView().getCenter()
                var lonlat = ol.proj.toLonLat(center)
                var zoom = map.getView().getZoom()
                this.$http.post(config.insertQuickView,{
                    'label':name,
                    'zoomLevel':zoom,
                    'centerLon':lonlat[0],
                    'centerLat':lonlat[1],
                    'pId':1
                },{emulateJSON:true}).then(r=>{

                    // arr.push({
                    //     'name': m.label,
                    //     'id': m.id
                    // });
                    console.log(r)
                })
                this.addlabel.dialoglabel = false
            },
            handleCommand(command){
                var layer = map.getLayers()
                layer.setProjectionControl(command)
            },
            localconfirm(lng, lat){
                this.local.visible = false
                ol.inputLocation(lng, lat)
            },
            mapset(){
                this.uservisible = false
            },
            updateSize(){
                debugger
            }
        },
        computed: {
            LoginedUser() {
                return this.$store.state.LoginedUser
            },
            uservisibleIcon() {
                return this.uservisible ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
            }
        },
        watch: {
            openLeftFlag(val) {
                this.mapUpdateSize();
            }
        }
    }
</script>

<style lang="scss">
    $outColor: #1e2028;
    $primaryColor: #6DA8E1;
    $leftWidth: 50px;
    $openLeftWidth: 400px;
    $topWidth: 50px;
    //ol
    .ol-zoom {
        right: 2em;
        top: 30em;
        left: auto;
        button {
            background-color: rgba(61, 71, 81, .7);
            cursor: pointer;
        }
    }

    .ol-attribution {
        display: none;
    }

    .ol-scale-line {
        bottom: 30px;
        left: 60px;
        background: rgba(61, 71, 81, .7);
    }

    //elementui
    .el-button--primary,
    .el-button--primary:hover,
    .el-button--primary:focus {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .popoverBtn {
        margin: 10px 72px 0;
        display: inline-block;
    }

    .popoverInput {
        margin: 5px 0;
    }

    .mapset {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px dashed #eee;
        cursor: pointer;
    }

    .el-slider__button-wrapper {
        z-index: 1;
    }

    .gis {
        &.openleft {
            .gis-left {
                width: $openLeftWidth;
            }
            .gis-right {
                margin-left: $openLeftWidth;
            }
        }
        // .el-input__inner{
        //  border:0;
        // }
        height: 100%;
        .gis-left {
            position: relative;
            color: #fff;
            text-align: left;
            transition: .3s;
            width: $leftWidth;
            float: left;
            height: 100%;
            background-color: $outColor;
            .gis-logo {
                height: $topWidth;
                background: #6da8e1;
                overflow: hidden;
                vertical-align: middle;
                line-height: $topWidth;
                .gis-logo-div {
                    width: $leftWidth;
                    height: $topWidth;
                    position: absolute;
                    top: 0;
                    left: 0;
                    text-align: center;
                    .gis-logo-img {
                        vertical-align: middle;
                        width: 38px;
                    }
                }
                .gis-logo-text {
                    margin-left: $leftWidth;
                    width: $openLeftWidth - $leftWidth;
                    font-size: 17px;
                    font-weight: bold;
                    padding-left: 5px;
                }
            }
            .gis-left-content {
                overflow: hidden;
                position: absolute;
                top: $topWidth;
                left: 0;
                right: 0;
                bottom: 0;
                .gis-left-section {
                    width: $openLeftWidth;
                    height: 100%;
                    .gis-left-info {
                        background: #3b454e;
                        height: 100%
                    }
                }
            }
        }
        .gis-right {
            transition: .3s;
            margin-left: $leftWidth;
            .show-in-left {
                float: left;
                margin-top: 9px;
                font-size: 26px;
                margin-left: 10px;
                cursor: pointer;
            }
            .gis-header {
                text-align: left;
                height: $topWidth;
                background: $outColor;
                color: #fff;
                .gis-menu {
                    float: right;
                    .m-list-box {
                        position: relative;
                        float: left;
                        margin-top: 9px;
                        margin-right: 30px;
                        .m-list-title {
                            padding: 3px 5px;
                            cursor: pointer;
                        }
                        &:hover {
                            .m-list-title {
                                color: #6DA8E1;
                            }
                            .m-list-ul {
                                display: block;

                            }
                        }
                        .m-list-ul {
                            padding-top: 10px;
                            position: absolute;
                            color: #2c3e50;
                            top: 26px;
                            left: 0px;
                            width: 100%;
                            display: none;
                            z-index: 3;
                            text-align: center;
                            .m-list {
                                background: #fff;
                                padding-top: 5px;
                                padding-bottom: 5px;
                                cursor: pointer;
                                &:hover {
                                    color: #6DA8E1;
                                }
                            }
                        }
                    }
                }
            }
            .gis-main {
                height: 500px;
                position: relative;
            }
        }

        /*图层控制*/
        .gis-layer-ctrl {
            position: absolute;
            top: 20px;
            right: 80px;
            z-index: 1;
            .layer-ctrl-btn {
                width: 35px;
                height: 35px;
                cursor: pointer;
                border-radius: 3px;
                background: #fff url('../../assets/img/version2/layer-ctrl.png') no-repeat center center;
                &.active {
                    background-image: url('../../assets/img/version2/layer-ctr2.png');
                }
            }
        }
        .searchmodel {
            position: absolute;
            z-index: 1;
            width: 400px;
            top: 20px;
            left: 20px;
            // height:100%;
            .el-input-group__append {
                background: #3a8ee6;
                color: #fff;
                font-size: 20px;
            }
            .slideLeft-enter-active, .slideLeft-leave-active {
                transition: transform .5s;
            }
            .slideLeft-enter, .slideLeft-leave-to {
                transform: translateX(-100%);
            }
            .searchBorder {
                position: absolute;
                top: 50px;
                left: 0;
                width: 390px;
                padding: 0 5px;
                z-index: 2;
                p {
                    width: 100%;
                    height: 1px;
                    background: rgba(0, 0, 0, .42);
                }
            }
            .blurBorder {
                position: absolute;
                top: 50px;
                left: 0;
                z-index: 2;
                width: 0;
                height: 2px;
                transition: .5s;
                background: $primaryColor;
            }
            .activeW {
                width: 100%;
            }
        }
        .searchIgo {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background-color: #fff;
            width: 100%;
            height: 100%;
            box-shadow: 2px 0 2px 0 #ddd;
            .detailActive {
                height: calc(100% / 2 - 10px);
            }
        }
        .searchCon, .gis-left {
            &.searchConPane {
                position: absolute;
                top: 55px;
                bottom: 0;
                left: 0;
                padding: 0 5px;
                width: 390px;
            }
            header {
                background-color: $primaryColor;
                i {
                    font-size: 20px;
                }
                .searchTitle {
                    color: #fff;
                    font-weight: bold;
                }
            }
            section {
                height: calc(100% - 47px);
                border-bottom: 1px solid #ccc;
                & > div {
                    height: 100%;
                    .el-row {
                        height: 100%;
                        .el-col {
                            height: 100%;
                        }
                    }
                }
                .iemlist {
                    // padding:13px 0;
                    font-size: 17px;
                    cursor: pointer;
                    width: 50%;
                    float: left;
                    height: 150px;
                    line-height: 150px;
                    box-shadow: 3px 3px 1px 1px #ccc;
                    i {
                        color: #000;
                        font-size: 20px;
                    }
                    span {
                        padding: 0 10px;
                    }
                }
                .iconlist {
                    height: 49px;
                    line-height: 49px;
                    font-size: 17px;
                    cursor: pointer;
                    text-align: center;
                    &.active {
                        background-color: #3b454e;
                    }
                    i {
                        color: #000;
                        font-size: 20px;
                    }
                }
                .layers {
                    & > .el-row {
                        cursor: pointer;
                        .el-col-2, .el-col-3 {
                            text-align: center;
                            i {
                                font-size: 20px;
                                color: $primaryColor;
                                &.el-icon-delete {
                                    color: red;
                                }
                            }
                        }
                    }
                    & > .el-row:nth-child(1) {
                        height: 35px;
                        line-height: 35px;
                    }
                    & > .el-row:nth-child(2) {
                        line-height: 22px;
                        padding: 10px 0;
                    }
                    & > .childlayer {
                        font-size: 14px;
                        img {
                            width: 16px !important;
                            vertical-align: middle;
                        }
                        i {
                            font-size: 16px !important;
                        }
                    }
                    .el-slider__runway {
                        height: 2px;
                        margin: 10px 0;
                        .el-slider__bar {
                            height: 2px;
                        }
                        .el-slider__button-wrapper {
                            width: 20px;
                            height: 20px;
                            top: -11px;
                            .el-slider__button {
                                width: 10px;
                                height: 10px;
                            }
                        }
                    }
                }
                .addresslist {
                    padding: 13px 10px;
                    font-size: 17px;
                    cursor: pointer;
                }
            }
        }
        .searchdetail {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            background-color: #fff;
            width: 100%;
            height: 80px;
            box-shadow: 2px 0 2px 0 #ddd;
            padding-top: 5px;
            border-top: 1px solid #ccc;
            transition: .5s;
            header {
                background-color: $primaryColor;
                i {
                    font-size: 20px;
                }
                .searchTitle {
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
        .copyrightInfo {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            /*min-width:1300px;*/
            background: rgba(255, 255, 255, .7);
            text-align: left;
            padding: 2px 0;
            font-size: 14px;
            color: #000;
            .infoText {
                padding-left: 10px;
            }
            .el-tag {
                background-color: rgb(64, 158, 255);
                color: #fff;
            }
            .el-tag--danger {
                background-color: rgb(245, 108, 108);
            }
            .el-col.el-col-4 {
                .el-input--mini .el-input__inner {
                    height: 22px !important;
                }
                .el-input__inner {
                    background-color: inherit;
                    color: #fff;
                }
            }
        }
        .toolTip {
            position: absolute;
            top: 20px;
            right: 130px;
            z-index: 1;
            font-size: 14px;
            .firstLi {
                background-color: #fff;
                padding: 8px 15px;
                float: left;
                cursor: pointer;
                box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
                border-right: 1px solid #eee;
                .active {
                    color: $primaryColor;
                }
                & > ul {
                    & > li {
                        padding: 10px 0;
                        cursor: pointer;
                    }
                }
            }
        }
        .gisuser {
            float: right;
            margin-top: 4px;
            margin-right: 60px;
            .gisuser-info {
                cursor: pointer;
                line-height: 38px;
            }
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                vertical-align: middle;
                display: inline-block;
            }
        }
        .logo {
            position: absolute;
            bottom: 28px;
            left: 12px;
            img {
                width: 40px;
                vertical-align: middle;
            }
        }
        .edit {
            color: #6DA8E1;
        }
        .disedit {
            color: #ccc !important;
        }
        .winmap {
            width: 0;
            height: 100%;
            transition: .5s;
            float: left;
        }
        .basicmap {
            width: 100%;
            height: 100%;
            transition: .5s;
            float: left;
        }
        .winmapdt {
            width: 30%;
        }
        .basicmapdt {
            width: 70%;
        }
    }
</style>
