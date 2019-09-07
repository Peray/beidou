<template>
    <div class="shortmes">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div v-show="num === 0" class="intro">
                    <el-row class="title" style="font-size: 18px;color: #6DA8E1;font-weight: bold" id="title">
                        短信互通业务
                    </el-row>
                    <div v-for="(item , index) in intro" :key="index">
                        <el-row class="title" style="color: #6DA8E1;">
                            {{item.title}}
                        </el-row>
                        <el-row class="detail" style="line-height: 1.5">
                            <div v-if="index == 0">
                                <span>{{item.detail}}</span>
                            </div>
                            <div v-if="index == 1">
                                <el-table border :data="item.data">
                                    <el-table-column :label="item.th[0]" prop="annualFee" :width="tableColumnWidth">
                                    </el-table-column>
                                    <el-table-column :label="item.th[1]" prop="content" :width="tableColumnWidth">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div v-if="index == 2" class="userapply" style="line-height: 1.5">
                                <p v-for="(i ,index ) in item.list" :key="index">
                                    {{i.name}}
                                </p>
                            </div>
                        </el-row>
                    </div>
                </div>
                <div v-show="num === 1">
                    <el-card style="padding: 0 25%;">
                        <div>
                            <el-row>
                                <el-col style="text-align: center">
                                    <el-input placeholder="请输入申请办理业务的手机号码">
                                    </el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <p style="line-height: 1.5;margin: 10px;">短信包</p>
                                </el-col>
                            </el-row>
                            <el-row style="text-align: center">
                                <el-radio-group v-model="radioChecked">
                                    <el-radio-button border style="margin:10px;"
                                                     v-for="(item , index) in smsPackage"
                                                     :key="index" :label="index">
                                        <span class="checkbox-style">{{item.num}}条<br/>{{item.price}}元</span>
                                    </el-radio-button>
                                </el-radio-group>
                            </el-row>
                            <el-row style="margin-top: 50px">
                                <el-col :span="6" :offset="18">
                                    <el-button type="info">立即购买</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
                <div v-show="num === 2" class="intro">
                    <el-row class="title" style="color: #6DA8E1;">
                        yonghuming
                    </el-row>
                    <el-row class="title">
                        固定业务：20000.00元
                    </el-row>
                    <el-row style="font-size: 30px ; color: #6da8e1;text-align: center;font-weight: bold">
                        <el-col :span="12">
                            账户余额：120元
                        </el-col>
                        <el-col :span="12">
                            短信包：10条
                        </el-col>
                    </el-row>
                    <el-row class="title">
                        使用趋势
                    </el-row>

                    <div id="lineChart" style="width: 100%;"></div>

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
        name: 'shortmes',
        data() {
            return {
                items: ['业务介绍', '业务申请', '费用管理'],
                num: 0,
                intro: [{
                    title: '业务介绍',
                    detail: '短信互通业务：设备之间通过短信的形式，满足通讯的需求，可对终端进行位置管理，实现历史轨迹绘制、回放等功能，并直接向北斗终端发送短报文，短信互通业务：设备之间通过短信的形式，满足通讯的需求，可对终端进行位置管理，实现历史轨迹绘制、回放等功能，并直接向北斗终端发送短报文，实现历史轨迹绘制、回放等功能。'
                }, {
                    title: '资费详情',
                    th: ['年费', '业务内容'],
                    data: [{
                        annualFee: '1200元',
                        content: '包含1000条信息，100元服务费'
                    }]
                }, {
                    title: '办理须知',
                    list: [
                        {name: '1、业务只能在国内使用'},
                        {name: '2、***省不能申请此业务'},
                        {name: '3、办理此业务，必须有***条件'},
                        {name: '4、业务申请开通后，不可退订'},
                        {name: '5、自申请开通之日起，可享受平台的短信互通服务'}
                    ]
                }],
                smsPackage: [
                    {
                        num: '100',
                        price: 20
                    },
                    {
                        num: '200',
                        price: 80
                    },
                    {
                        num: '500',
                        price: 100
                    },
                    {
                        num: '1000',
                        price: 300
                    }
                ],
                radioChecked: 0,
                tableColumnWidth: '300px'
            }
        },
        mounted: function () {
            this.drawChart();

        },
        computed: {},
        methods: {
            tab(index) {
                this.num = index
            },
            drawChart: function () {
                let width = document.getElementById('title').scrollWidth;
                let height = width / 2.69 + 'px';
                $("#lineChart").css({'width': width + 'px', 'height': height});

                var myChart = echarts.init(document.getElementById('lineChart'));
                var lineOption = {
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
                            name: '短信使用条数',
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
                myChart.setOption(lineOption);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .shortmes {
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
                padding: 20px 43px 0;
                .intro {
                    margin: 30px 0;
                    padding-bottom: 50px;
                    .el-row {
                        margin: 30px 0;
                        .title {
                            font-size: 16px;
                            color: $primaryColor;
                            font-weight: bold;
                            span {
                                margin-right: 20px;
                            }
                        }
                        .detail {
                            font-size: 14px;
                            line-height: 2;
                            .userapply {
                                line-height: 2;
                            }
                            .ups {
                                font-weight: bold;
                                line-height: 2;
                            }
                        }
                    }
                }
                .list {
                    padding: 20px 0;
                    font-size: 14px;
                }
                .el-pager {
                    color: #666;
                    li {
                        border: 1px solid #D9D9D9;
                        border-radius: 3px;
                        font-size: 16px;
                        margin: 0 2px;
                        height: 30px;
                        font-weight: normal;
                        min-width: 30px;
                    }
                }
                .el-pagination {
                    text-align: center;
                    padding: 40px 0 60px;
                    .btn-next, .btn-prev {
                        border: 1px solid #D9D9D9;
                        border-radius: 3px;
                        height: 30px;
                        padding: 0 10px;
                    }
                    .el-pagination__total {
                        font-size: 16px;
                        margin-left: 20px;
                    }
                    .el-pagination__jump {
                        height: 30px;
                        height: 30px;
                        font-size: 16px;
                        .el-pagination__editor.el-input .el-input__inner {
                            height: 30px;
                        }
                    }

                }
            }
        }
        .checkbox-style {
            text-align: center;
            height: 80px;
            width: 100px;
            border-radius: 4px;
        }
    }
</style>
