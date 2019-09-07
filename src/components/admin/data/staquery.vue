<template>
    <div class="staquery">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div v-show="num === 0">
                    <div>
                        <el-form status-icon :model="filterBeanForm" :inline="true">
                            <el-form-item label="卡号：" label-width='120'>
                                <el-input type="text" v-model="filterBeanForm.cardNumber" suffix-icon="el-icon-tickets">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="选择日期：" label-width='120'>
                                <el-date-picker
                                    v-model="datePickerValue"
                                    type="daterange"
                                    :picker-options="pickerOptions"
                                    range-separator="~"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right"
                                    format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <div style="display: flex;">
                            <div class="tip-box" style="background-color: #F7C855;">
                                <p>短报文接收总数</p>
                                <p style="font-size: 24px">1110</p>
                            </div>
                            <div class="tip-box" style="background-color: #6DA8E1;">
                                <p>短报文发送总数</p>
                                <p style="font-size: 24px">546</p>
                            </div>
                        </div>
                    </div>
                    <div class="bodyStyle">
                        <div id="lineChart1" style="width: 100%;">
                        </div>
                    </div>
                </div>
                <div v-show="num === 1">
                    <div>
                        <el-form status-icon :model="filterBeanForm" :inline="true">
                            <el-form-item label="卡号：" label-width='120'>
                                <el-input type="text" v-model="filterBeanForm.cardNumber" suffix-icon="el-icon-tickets">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="选择日期：" label-width='120'>
                                <el-date-picker
                                    v-model="datePickerValue"
                                    type="daterange"
                                    :picker-options="pickerOptions"
                                    range-separator="~"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right"
                                    format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <div style="display: flex;">
                            <div class="tip-box" style="background-color: #6DA8E1;">
                                <p>定位信息总数</p>
                                <p style="font-size: 24px">356</p>
                            </div>
                        </div>
                    </div>
                    <div class="bodyStyle">
                        <div id="lineChart2" style="width: 100%;">
                        </div>
                    </div>
                </div>
                <div v-show="num === 2">
                    <div>
                        <el-form status-icon :model="filterBeanForm" :inline="true">
                            <el-form-item label="卡号：" label-width='120'>
                                <el-input type="text" v-model="filterBeanForm.cardNumber" suffix-icon="el-icon-tickets">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="选择日期：" label-width='120'>
                                <el-date-picker
                                    v-model="datePickerValue"
                                    type="daterange"
                                    :picker-options="pickerOptions"
                                    range-separator="~"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right"
                                    format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <div style="display: flex;">
                            <div class="tip-box" style="background-color: #F7C855;">
                                <p>发至北斗网络应用端的通信数量</p>
                                <p style="font-size: 24px">1110</p>
                            </div>
                            <div class="tip-box" style="background-color: #6DA8E1;">
                                <p>发至北斗网络应用端的定位数量</p>
                                <p style="font-size: 24px">546</p>
                            </div>
                        </div>
                    </div>
                    <div class="bodyStyle">
                        <div id="lineChart3" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //引入基本模板
    let echarts = require('echarts/lib/echarts');
    //引入柱状图组件
    require('echarts/lib/chart/line');
    require('echarts/lib/chart/bar');
    //引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/toolbox');


    export default {
        name: 'staquery',
        data() {
            return {
                items: ['短报文统计', '定位数据统计', '网络分发统计'],
                num: 0,
                filterMenuShowing: true,
                inputCardNumber: 0,
                filterBeanForm: {
                    cardNumber: '',
                    dateRange: ''
                },
                currentPage: 1,
                pageSize: 10,
                datePickerValue: '',
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.setHours(0, 0, 0, 0));
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                end.setTime(end.setHours(0, 0, 0, 0));
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                start.setTime(start.setHours(0, 0, 0, 0));
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },

            }
        },
        mounted: function () {


            this.drawCharts();

        },
        computed: {},
        methods: {
            tab(index) {
                this.num = index
            },
            drawCharts: function () {

                let width = document.getElementById('lineChart1').scrollWidth;
                let height = width / 2.69 + 'px';
                $('#lineChart1').css('height', height);
                $("#lineChart2").css({'width': width + 'px', 'height': height});
                $("#lineChart3").css({'width': width + 'px', 'height': height});

                var myChart1 = echarts.init(document.getElementById('lineChart1'));
                var myChart2 = echarts.init(document.getElementById('lineChart2'));
                var myChart3 = echarts.init(document.getElementById('lineChart3'));
                var lineOption1 = {
                    color: ['#F7C855', '#6DA8E1'],
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    toolbox: {
                        orient: 'horizontal',
                        feature: {
                            magicType: {
                                type: ['line', 'bar']
                            }
                        }
                    },
                    grid: {
                        left: 40,
                        right: 40,
                    },
                    legend: {
                        data: [
                            {name: '短报文接收', icon: 'circle'},
                            {name: '短报文发送', icon: 'circle'}
                        ],
                        left: '75%'
                    },
                    calculable: true,
                    xAxis: {
                        name: '',
                        nameLocation: 'end',
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: "#4F5562"
                            }
                        },
                        data: ['2017-06-10 00', '2017-06-10 02', '2017-06-10 04', '2017-06-10 08', '2017-06-10 10', '2017-06-10 12', '2017-06-10 14'],
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量(条)',
                        nameLocation: 'end',
                        axisLine: {
                            lineStyle: {
                                color: "#4F5562"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#CCCCCC'],
                                type: 'solid'
                            }
                        }
                    },

                    series: [
                        {
                            name: '短报文接收',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            lineStyle: {
                                normal: {
                                    color: "#F7C855",
                                    width: 3
                                }
                            },
                            data: [50, 20, 70, 40, 30, 100, 70]
                        },
                        {
                            name: '短报文发送',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            lineStyle: {
                                normal: {
                                    color: "#6DA8E1",
                                    width: 3
                                }
                            },
                            data: [10, 20, 30, 40, 50, 40, 30]

                        }
                    ]
                };
                var lineOption2 = {
                    color: ['#6DA8E1'],
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    toolbox: {
                        orient: 'horizontal',
                        feature: {
                            magicType: {
                                type: ['line', 'bar']
                            }
                        }
                    },
                    grid: {
                        left: 40,
                        right: 40,
                    },
                    calculable: true,
                    xAxis: {
                        name: '',
                        nameLocation: 'end',
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: "#4F5562"
                            }
                        },
                        data: ['2017-06-10 00', '2017-06-10 02', '2017-06-10 04', '2017-06-10 08', '2017-06-10 10', '2017-06-10 12', '2017-06-10 14'],
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量(条)',
                        nameLocation: 'end',
                        axisLine: {
                            lineStyle: {
                                color: "#4F5562"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#CCCCCC'],
                                type: 'solid'
                            }
                        }
                    },

                    series: [
                        {
                            name: '定位信息总数',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            lineStyle: {
                                normal: {
                                    color: "#6DA8E1",
                                    width: 3
                                }
                            },
                            data: [10, 20, 100, 40, 50, 40, 30]
                        }
                    ]
                };
                var lineOption3 = {
                    color: ['#F7C855', '#6DA8E1'],
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    toolbox: {
                        orient: 'horizontal',
                        feature: {
                            magicType: {
                                type: ['line', 'bar']
                            }
                        }
                    },
                    grid: {
                        left: 40,
                        right: 40,
                    },
                    legend: {
                        data: [
                            {name: '通信数据', icon: 'circle'},
                            {name: '定位数据', icon: 'circle'}
                        ],
                        left: '75%'
                    },
                    calculable: true,
                    xAxis: {
                        name: '',
                        nameLocation: 'end',
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: "#4F5562"
                            }
                        },
                        data: ['2017-06-10 00', '2017-06-10 02', '2017-06-10 04', '2017-06-10 08', '2017-06-10 10', '2017-06-10 12', '2017-06-10 14'],
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量(条)',
                        nameLocation: 'end',
                        axisLine: {
                            lineStyle: {
                                color: "#4F5562"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#CCCCCC'],
                                type: 'solid'
                            }
                        }
                    },
                    series: [
                        {
                            name: '通信数据',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            lineStyle: {
                                normal: {
                                    color: "#F7C855",
                                    width: 3
                                }
                            },
                            data: [180, 50, 70, 20, 150, 100, 80]
                        },
                        {
                            name: '定位数据',
                            type: 'line',
                            symbol: 'circle',
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    color: "#6DA8E1",
                                    width: 3
                                }
                            },
                            data: [50, 10, 40, 30, 20, 30, 40]
                        }
                    ]
                };
                myChart1.setOption(lineOption1);
                myChart2.setOption(lineOption2);
                myChart3.setOption(lineOption3);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .staquery {
        padding: 30px;
        text-align: left;
        & > .tab {
            background-color: #fff;
            & > .tab-title {
                border-bottom: 1px solid #E6E6E6;
                padding-left: 20px;
                span {
                    display: inline-block;
                    padding: 15px 20px 0;
                    cursor: pointer;
                    &.active {
                        a {
                            border-bottom: 2px solid $primaryColor;
                            color: $primaryColor;
                        }
                    }
                    a {
                        display: inline-block;
                        font-size: 16px;
                        color: #999;
                        border-bottom: 2px solid #fff;
                        padding: 0 3px 15px;
                    }
                }
                &.clearfix:after {
                    display: table;
                    content: " ";
                    clear: both;
                }
                &.clearfix {
                    *zoom: 1;
                }
            }
            & > .tab-content {
                padding: 20px;

            }
        }
        .tip-box {
            width: 240px;
            height: 80px;
            margin-bottom: 10px;
            border-radius: 4px;
            text-align: center;
            vertical-align: middle;
            line-height: 40px;
            margin-right: 20px;
            color: #fff;
            .tip-box-left {
                background-color: #F7C855;
            }
            .tip-box-right {
                background-color: #6DA8E1;
            }
        }

        & > .el-button {
            margin-bottom: 30px;
            width: 120px;
            border-radius: 0;
            &:focus, &:hover {
                color: #000;
                border-color: $primaryColor;
                background-color: #fff;
            }
        }
        & > .el-form {
            .el-form-item__label {
                font-size: 16px;
            }
            .el-form-item:nth-child(1) {
                .el-input {
                    width: 160px;
                    .el-input__inner {
                        border-radius: 0;
                    }
                }
                .el-range-editor.is-active,
                .el-range-editor.is-active:hover {
                    border-color: $primaryColor;
                }
            }
            .el-form-item:nth-child(2) {
                .el-input__inner {
                    width: 360px;
                    border-radius: 0;
                }
                .el-range-editor.is-active,
                .el-range-editor.is-active:hover {
                    border-color: $primaryColor;
                }
            }
            .el-form-item:nth-child(3) {
                .el-button {
                    width: 120px;
                    background-color: $primaryColor;
                    font-size: 16px;
                    padding: 10px 20px;
                    border-color: $primaryColor;
                    border-radius: 0;
                }
            }
        }
        .bodyStyle {
            /*margin-top: 10px;*/
            /*padding: 15px;*/
        }
    }
</style>
