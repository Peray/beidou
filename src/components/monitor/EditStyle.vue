<template>
    <div>
        <table class="grid-table">
            <tbody>
            <tr>
                <td colspan="3">
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>点对象</el-tag>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-2">
                                    <label class="labelInTable">名称:</label>
                                </div>
                                <div class="el-col el-col-6">
                                    <div class="el-input el-input--small">
                                        <el-input placeholder="请输入名称..." size="mini" type="text" v-model="featureStyle.pointObj.name"></el-input>
                                    </div>
                                </div>
                                <div class="el-col el-col-4">
                                    <label class="labelInTable">是否缓冲:</label>
                                </div>
                                <div class="el-col el-col-4">
                                    <el-switch v-model="featureStyle.pointObj.isBuffer"></el-switch>
                                </div>
                                <div class="el-col el-col-4"><label class="labelInTable">半径[km]:</label></div>
                                <div class="el-col el-col-4">
                                    <el-input size="mini" placeholder="输入半径" v-model="featureStyle.pointObj.radius"></el-input>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>标注样式</el-tag>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-8"><label class="labelInTable">名称:</label></div>
                                <div class="el-col el-col-16">
                                    <div class="el-input el-input--small">
                                        <el-input auto-complete="off" placeholder="请输入标注名称..."   size="mini" type="text"  v-model="featureStyle.label.name"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-8">
                                    <label class="labelInTable">大小[px]:</label>
                                </div>
                                <div class="el-col el-col-16">
                                    <el-input type="number"  auto-complete="off" class="layui-input" size="mini" v-model="featureStyle.label.size"></el-input>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-8"><label class="labelInTable">颜色:</label></div>
                                <div class="el-col el-col-16">
                                    <el-color-picker v-model="featureStyle.label.color"></el-color-picker>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
                <td width="30%">
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>线样式</el-tag>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-6">
                                    <label class="labelInTable">类型:</label>
                                </div>
                                <div class="el-col el-col-18">
                                    <el-select size="mini" v-model="featureStyle.lineStyle.type" placeholder="请选择">
                                        <el-option label="虚线" value="dashed"></el-option>
                                        <el-option label="实线" value="solid"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-6">
                                    <label class="labelInTable">线宽:</label>
                                </div>
                                <div class="el-col el-col-18">
                                    <el-input type="number" auto-complete="off" size="mini" v-model="featureStyle.lineStyle.width"></el-input>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-6"><label class="labelInTable">颜色:</label></div>
                                <div class="el-col el-col-18">
                                    <el-color-picker v-model="featureStyle.lineStyle.color"></el-color-picker>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
                <td width="40%" rowspan="3">
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>时效设置</el-tag>
                            <el-checkbox v-model="featureStyle.dateSetting.isOpen">启动设置</el-checkbox>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-24">
                                    有效日期范围：
                                    <el-date-picker style="margin-bottom: 12px" size="mini" :disabled="!featureStyle.dateSetting.isOpen" v-model="featureStyle.dateSetting.startDay" type="date" placeholder="开始日期"></el-date-picker>
                                    <el-date-picker size="mini" :disabled="!featureStyle.dateSetting.isOpen" v-model="featureStyle.dateSetting.endDay" type="date" placeholder="结束日期"></el-date-picker>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-24">
                                    有效时间范围：
                                    <el-time-picker style="margin-bottom: 12px" size="mini" :disabled="!featureStyle.dateSetting.isOpen" v-model="featureStyle.dateSetting.startTime" placeholder="开始时间"></el-time-picker>
                                    <el-time-picker size="mini" :disabled="!featureStyle.dateSetting.isOpen" v-model="featureStyle.dateSetting.endTime" placeholder="结束时间"></el-time-picker>
                                </div>
                            </div>
                            <div class="el-row">
                                <el-checkbox-group v-model="featureStyle.dateSetting.weeks">
                                    <el-checkbox  :disabled="!featureStyle.dateSetting.isOpen" v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <el-tag type="danger">过期自动删除</el-tag>
                                </div>
                                <div class="el-col el-col-12">
                                    <el-switch  :disabled="!featureStyle.dateSetting.isOpen" v-model="featureStyle.dateSetting.isExpireDelete"></el-switch>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
            </tr>
            <tr>
                <td>
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>点样式</el-tag>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-8">
                                    <label class="labelInTable">大小[px]:</label>
                                </div>
                                <div class="el-col el-col-16">
                                    <el-input type="number" size="mini" v-model="featureStyle.pointStyle.size"></el-input>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-8"><label class="labelInTable">颜色:</label></div>
                                <div class="el-col el-col-16">
                                    <el-color-picker v-model="featureStyle.pointStyle.color"></el-color-picker>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
                <td>
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>面样式</el-tag>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-8"><label class="labelInTable">颜色:</label></div>
                                <div class="el-col el-col-16">
                                    <el-color-picker v-model="featureStyle.gonStyle.color"></el-color-picker>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-8"><label class="labelInTable">透明度:</label></div>
                                <div class="el-col el-col-16">
                                    <el-slider v-model="featureStyle.gonStyle.opacity"></el-slider>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <fieldset class="layui-elem-field">
                        <legend>
                            <el-tag>预警高度</el-tag>
                            <el-checkbox v-model="checked">启动预警</el-checkbox>
                        </legend>
                        <div class="field-content">
                            <div class="el-row">
                                <div class="el-col el-col-4"><label>高度范围:</label></div>
                                <div class="el-col el-col-8">
                                    <el-input placeholder="最小高度范围" v-model="minH" size="mini">
                                        <template slot="prepend">Min:</template>
                                    </el-input>
                                </div>
                                <div class="el-col el-col-2">
                                    <hr>
                                </div>
                                <div class="el-col el-col-8">
                                    <el-input placeholder="最大高度范围" v-model="maxH" size="mini">
                                        <template slot="prepend">Max:</template>
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="confirm-style-btns">
            <el-button size="mini" @click="cancle">取消</el-button>
            <el-button @click="saveStyle" size="mini" type="primary">确定</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'EditStyle',
        data() {
            return {
                value6: true,
                polylineStyle: 'solid',
                checked: false,
                time1: '',
                time2: '',
                time3: '',
                time4: '',
                weeks: ['周一', '周二','周三', '周四','周五', '周六','周日'],
                checkedWeek: '',
                exp: false,
                color1: '#ccc',
                opacity: 0,
                minH: 123,
                maxH: 345,
                featureStyle: {
                    // 点对象
                    pointObj: {
                        name: '',
                        //是否缓冲
                        isBuffer: false,
                        radius: ''
                    },
                    pointStyle: {
                        size: 16,
                        color: '#f0f'
                    },
                    label: {
                        name: '',
                        size: 16,
                        color: '#0f0'
                    },
                    lineStyle: {
                        type: 'solid',
                        width: 1,
                        color: '#f00'
                    },
                    gonStyle: {
                        color: '#f00',
                        opacity: 30
                    },
                    dateSetting: {
                        // 是否开启
                        isOpen: false,
                        // 是否过期删除
                        isExpireDelete: false,
                        startDay: '',
                        endDay: '',
                        startTime: '',
                        endTime: '',
                        weeks: []
                    }
                }
            }
        },
        methods: {
            // 确定保存style
            saveStyle() {
                //关闭弹窗
                vueGis.closeDrawStyle();
                this.$ol.getStyleByDataBase(this.featureStyle);
            },
            cancle() {
                vueGis.closeDrawStyle();
                this.$ol.cancelOperatetoRemoveFeature();
            }
        }
    }
</script>
<style lang="scss">
    .labelInTable {
        text-align: right;
        float: right;
        padding: 2px 2px 2px 0px;
        vertical-align: middle;
    }
    .layui-elem-field {
        .el-slider__runway {
            margin: 6px 0px
        }
        margin: 0 3px;
        border: 1px solid rgba(64,158,255,.8);
        border-radius: 4px;
        background: rgba(65, 158, 255, .1);
        legend {
            margin-left: 20px;
        }
        .field-content {
            padding: 2px 15px;
        }
    }
    .confirm-style-btns {
        text-align: right;
        padding-right: 50px;
        padding-top: 20px;
    }
</style>
