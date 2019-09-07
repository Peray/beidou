<template>
    <div class="homePage">
        <Bmap></Bmap>
        <div class="mes">
            <template>
                <el-alert :title="title" type="success" show-icon></el-alert>
            </template>
        </div>
        <el-card class="box-card" v-show="bool">
            <div slot="header" class="clearfix">
                <span>消息中心</span>
                <el-button style="float: right; padding: 3px 0" type="text">清空</el-button>
            </div>
            <p class="card-title">系统消息</p>
            <div v-for="o in 1" :key="o" class="text item">
                <el-badge :value="2" class="item">
                    {{'列表内容 ' + o }}
                </el-badge>
            </div>
            <div class="footer">
                <span @click="seeal">查看全部</span>
            </div>
        </el-card>
        <div class="setup">
            <el-dropdown trigger="click" :hide-on-click="false" :show-timeout="0" :hide-timeout="0"
                         @visible-change="toggle">
                <el-button type="primary" :class="{statu : togglestatu==true}">
                    <img :src="togglestatu==true ? setselected : setsrc">设置
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-model="total">
                        <el-checkbox :checked="total" label="统计信息" name="total" @change="total = !total"></el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item v-model="warn">
                        <el-checkbox :checked="warn" label="报警信息" name="warn" @change="warn = !warn"></el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="totalshow" v-show="total==true">
            <template>
                <el-card>
                    <el-table
                        :data="totalshow">
                        <el-table-column label="统计信息">
                            <el-table-column
                                prop="bdknum"
                                label="北斗卡数量"
                                width="140">
                            </el-table-column>

                            <el-table-column
                                prop="tbnum"
                                label="今日通报数量"
                                width="140">
                            </el-table-column>

                            <el-table-column
                                prop="sbnum"
                                label="上报位置数量"
                                width="140">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-card>
            </template>
        </div>
        <div class="warnshow" v-show="warn==true">
            <template>
                <el-card>
                    <el-table
                        :data="warnshow">
                        <el-table-column label="报警信息">
                            <el-table-column
                                prop="out"
                                label="越界报警"
                                width="140">
                            </el-table-column>

                            <el-table-column
                                prop="enc"
                                label="围栏报警"
                                width="120">
                            </el-table-column>

                            <el-table-column
                                prop="sped"
                                label="超速报警"
                                width="140">
                            </el-table-column>

                            <el-table-column
                                prop="statu"
                                label="状态"
                                width="120">
                            </el-table-column>

                            <el-table-column
                                prop="pos"
                                label="定位"
                                width="120">
                                <template slot-scope="scope">
                                    <img :src="scope.row.pos" width="16" height="16"/>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-card>
            </template>
        </div>
    </div>
</template>

<script>

    import Bmap from '@/components/admin/index/map'

    export default {
        components: {
            Bmap,
        },
        name: 'homePage',
        data() {
            return {
                title: '通航北斗门户被动终端产品，新产品具有定位，通信功能，欢迎新老用户选购！',
                total: true,
                warn: true,
                togglestatu: false,
                setsrc: require('@/assets/img/admin/set up_icon_normal.png'),
                setselected: require('@/assets/img/admin/set up_icon_selected.png'),
                totalshow: [
                    {
                        bdknum: 10,
                        tbnum: 0,
                        sbnum: 1
                    }
                ],
                warnshow: [
                    {
                        out: '机尾号0119越界',
                        enc: '111110',
                        sped: '机尾号0119超速',
                        statu: '已处理',
                        pos: require('@/assets/img/admin/location_icon_normal.png')
                    },
                    {
                        out: '机尾号0119越界',
                        enc: '111110',
                        sped: '机尾号0119超速',
                        statu: '未处理',
                        pos: require('@/assets/img/admin/location_icon_selected.png')
                    },
                    {
                        out: '机尾号0119越界',
                        enc: '111110',
                        sped: '机尾号0119超速',
                        statu: '未处理',
                        pos: require('@/assets/img/admin/location_icon_selected.png')
                    }
                ]
            }
        },
        mounted: function () {
            //显示最近的一条系统消息
            this.getLastMessage();

        },
        methods: {
            toggle(val) {
                this.togglestatu = val;
            },
            seeal() {
                this.$router.push({path: '/news'})
            },
            getLastMessage: function () {
                let param = {};
                param.pageNum = 1;
                param.pageSize = 1;
                this.$http.get(config.getSystemSMS, {params: param}).then(response => {
                        if (response.ok) {
                            if (response.body.list.length !== 0) {
                                this.title = response.body.list[0].newsContent;
                            }
                        } else {
                            console.log(response);
                        }
                    },
                    response => {
                        console.log(response);
                    });
            }
        },
        computed: {
            bool() {
                return this.$store.state.bool;
                console.log(this.bool)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .homePage {
        height: 100%;
        position: relative;
        .mes {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 1;
            .el-alert {
                width: 580px;
            }
            .el-alert--success {
                background-color: rgba(255, 255, 255, .7);
                color: $primaryColor;
                .el-alert__icon {
                    width: 19px;
                    height: 18px;
                }
                .el-icon-success {
                    background: url("~@/assets/img/admin/news_icon.png");
                    &:before {
                        content: '';
                    }
                }
            }
            .el-alert__content {
                padding: 0 14px;
            }
            .el-alert__closebtn {
                font-size: 20px;
                top: auto;
            }
            .el-alert__title {
                font-size: 14px;
            }
        }
        .box-card {
            position: absolute;
            top: 0;
            right: 80px;
            z-index: 2;
            width: 300px;
            text-align: left;
            .el-card__body {
                padding: 0;
                font-size: 14px;
                .text {
                    padding: 10px 40px;
                    & > .item {
                        width: 100%;
                        .el-badge__content {
                            background-color: #B2B2B2;
                        }
                        .el-badge__content.is-fixed {
                            top: 10px;
                        }
                    }
                }
                .card-title {
                    padding: 15px 20px 0;
                    color: $primaryColor;
                }
            }
            .footer {
                text-align: center;
                line-height: 58px;
                height: 58px;
                border-top: 1px solid #ebeef5;
                span {
                    cursor: pointer;
                    padding: 10px;
                    font-size: 16px;
                }
            }
        }
        .setup {
            position: absolute;
            top: 20px;
            right: 90px;
            z-index: 1;
            .el-button {
                padding: 10px 26px 10px 15px;
                border-radius: 0;
                width: 105px;
                span {
                    img {
                        vertical-align: middle;
                        margin-top: -3px;
                        margin-right: 11px;
                    }
                }
            }
            .el-button--primary {
                color: #606266;
                background-color: #fff;
                border: none;
            }
            .statu {
                color: $primaryColor;
            }
        }
        .totalshow {
            position: absolute;
            top: 80px;
            right: 90px;
            z-index: 1;
            td .cell {
                color: $primaryColor;
                font-weight: bold;
            }
        }
        .warnshow {
            position: absolute;
            top: 250px;
            right: 90px;
            z-index: 1;
        }
        .el-table thead.is-group th {
            background: #fff;
            color: #000;
        }
        .el-table thead.is-group tr:nth-child(1) > th {
            font-size: 16px;
        }
        .el-table thead.is-group tr:nth-child(2) > th {
            border-bottom: 0;
        }
        .el-table thead.is-group tr:not(:nth-child(1)) > th {
            text-align: center;
        }
        .el-table td, .el-table th {
            padding: 0;
            height: 40px;
            line-height: 40px;
        }
        .el-table--border td {
            border-right: 0;
        }
    }
</style>
