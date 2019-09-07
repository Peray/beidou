<template>
    <div class="news">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div v-show="num === 0">
                    <div v-if="systemMessageData.length === 0">
                        <newsnone></newsnone>
                    </div>
                    <div v-else>
                        <el-row class="list" v-for="(item,index) in systemMessageData" :key="index"
                                @click.native="rowClickEvent(index , item ,'systemMessage')"
                                style="cursor: pointer;">
                            <el-col :span="21">{{item.newsTitle + " , " +item.newsContent}}</el-col>
                            <el-col :span="3">{{datetimeFormat(new Date(item.fbTime))}}</el-col>
                        </el-row>

                        <div class="block">
                            <el-pagination
                                @current-change="handleCurrentChange1"
                                :background="true"
                                :current-page.sync="currentPage1"
                                :page-size="pageSize"
                                layout="prev,pager,next,jumper,total"
                                :page-count="pageCount1"
                                prev-text="上一页"
                                next-text="下一页">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div v-show="num === 1">
                    <div v-if="privateMessageData.length === 0">
                        <newsnone></newsnone>
                    </div>
                    <div v-else>
                        <el-row class="list" v-for="(item,index) in privateMessageData" :key="index"
                                @click.native="rowClickEvent(index , item  , 'privateMessage')"
                                style="cursor: pointer;"
                                :style="{color: item.status == 0? '#6DA8E1':''}"
                        >
                            <el-col :span="21">{{item.name + " , " +item.content}}</el-col>
                            <el-col :span="3">{{item.startTime != null ? datetimeFormat(new
                                Date(item.startTime)):datetimeFormat(new Date())}}
                            </el-col>
                        </el-row>

                        <div class="block">
                            <el-pagination
                                @current-change="handleCurrentChange2"
                                :background="true"
                                :current-page.sync="currentPage2"
                                :page-size="pageSize"
                                layout="prev,pager,next,jumper,total"
                                :page-count="pageCount2"
                                prev-text="上一页"
                                next-text="下一页">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <el-dialog :visible.sync="messageDialogVisible" @close="dialogDismiss" :show-close="false"
                           :title="dialogTitle">
                    <el-card>
                        <!--<div slot="header">-->
                        <!--<span>{{dialogTitle}}</span>-->
                        <!--</div>-->
                        <div>
                            <span>{{dialogContent}}</span>
                        </div>
                    </el-card>
                </el-dialog>

            </div>
        </div>
    </div>
</template>

<script>
    let newsnone = {
        template: `<div class="newsnone">
                    <img :src="noneimg"/>
                       <p><span>暂时还没有收到任何消息哦！</span></p>
                </div>`,
        data() {
            return {
                noneimg: require('@/assets/img/admin/ordernone.png')
            }
        },
        methods: {}
    };
    export default {
        name: 'news',
        components: {
            'newsnone': newsnone
        },
        data() {
            return {
                items: ['系统消息', '个人消息'],
                num: 0,
                currentPage1: 1,
                currentPage2: 1,
                pageSize: 10,
                pageCount1: '',
                pageCount2: '',
                sysmes: [],
                permes: [],
                messageDialogVisible: false,
                dialogTitle: '',
                dialogContent: '',
                systemMessageData: [],
                privateMessageData: []
            }
        },
        mounted: function () {
            //请求消息列表
            let param = {};
            param.pageNum = 1;
            param.pageSize = this.pageSize;
            this.getSystemMessage(param);
            this.getPrivateMessage(param);

        },
        computed: {
            data() {
                var page = [];
                var _this = this;
                if (_this.sysmes) {
                    for (var i = (_this.currentPage - 1) * _this.pageSize; i < _this.currentPage * _this.pageSize; i++) {
                        if (_this.sysmes[i]) {
                            page.push(_this.sysmes[i]);
                        }
                        ;
                    }
                    ;
                }
                ;
                return page;
            },
            data2() {
                var page = []
                var _this = this;
                if (_this.permes) {
                    for (var i = (_this.currentPage - 1) * _this.pageSize; i < _this.currentPage * _this.pageSize; i++) {
                        if (_this.permes[i]) {
                            page.push(_this.permes[i]);
                        }
                        ;
                    }
                    ;
                }
                ;
                return page;
            }

        },
        methods: {
            tab(index) {
                this.num = index
            },
            getSystemMessage: function (param) {

                this.$http.get(config.getSystemSMS, {params: param}).then(response => {
                    console.log(response);
                        if (response.ok) {
                            this.systemMessageData = response.body.list;
                            this.pageCount1 = response.body.pages;
                        } else {
                            console.log(response);
                        }
                    },
                    response => {
                    console.log(response);
                    });
            },
            getPrivateMessage: function (param) {
                this.$http.get(config.getPrivateSMS, {params: param}).then(response => {
                    console.log(response);
                        if (response.ok) {
                            this.privateMessageData = response.body.list;
                            this.pageCount2 = response.body.pages;
                        } else {

                        }

                    },
                    response => {
                    console.log(response);
                    });
            },
            getUnReadMessageCount: function () {
                this.$http.get(config.getUnReadMessageCount).then(response => {
                        if (response.ok) {
                            console.log(response);
                            this.$store.dispatch('unreadMessageCount', response.body);
                        }
                    },
                    response => {
                    });
            },
            datetimeFormat: function (datetime) {
                var year = datetime.getFullYear(),
                    month = datetime.getMonth() + 1,
                    date = datetime.getDate(),
                    hour = datetime.getHours(),
                    minutes = datetime.getMinutes(),
                    second = datetime.getSeconds();
                if (month < 10) {
                    month = "0" + month;
                }
                if (date < 10) {
                    date = "0" + date;
                }
                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (second < 10) {
                    second = "0" + second;
                }
                return (year + "/" + month + "/" + date + " " + hour + ":" + minutes);
            },
            rowClickEvent: function (index, item, type) {
                switch (type) {
                    case 'systemMessage':
                        this.dialogTitle = item.newsTitle;
                        this.dialogContent = item.newsContent;
                        break;
                    case 'privateMessage':
                        this.dialogTitle = item.name;
                        this.dialogContent = item.content;
                        //设置已读
                        this.setSMSReaded(item.id);
                        break;
                }

                this.messageDialogVisible = true;
            },
            setSMSReaded: function (id) {
                var param = {};
                param.id = id;
                this.$http.get(config.setSMSReaded, {params: param}).then(response => {
                        if (response.ok) {
                            let param = {};
                            param.pageNum = 1;
                            param.pageSize = this.pageSize;
                            this.getPrivateMessage(param);
                            //更改admin.vue中未读消息数量
                            this.getUnReadMessageCount();
                        } else {
                        }
                    },
                    response => {
                    });
            },
            dialogDismiss: function () {
                this.dialogTitle = '';
                this.dialogContent = '';
            },
            handleCurrentChange1(currentPage) {
                this.currentPage1 = currentPage;
                let param = {};
                param.pageNum = currentPage;
                param.pageSize = this.pageSize;
                this.getSystemMessage(param);
            },
            handleCurrentChange2(currentPage) {
                this.currentPage2 = currentPage;
                let param = {};
                param.pageNum = currentPage;
                param.pageSize = this.pageSize;
                this.getPrivateMessage(param);
            }
        },
        watch: {
            // row2h:function(){
            //     return $('body').height()-50 +'px';
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .news {
        color: #999;
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
                .newsnone {
                    text-align: center;
                    padding: 220px 0;
                    background-color: #fff;
                    & > p {
                        padding: 20px 0;
                        font-size: 17px;
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
                        &.active {
                            background-color: $primaryColor;
                            border: 1px solid $primaryColor;
                        }
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
                        font-size: 16px;
                        .el-pagination__editor.el-input .el-input__inner {
                            height: 30px;
                        }
                    }

                }
            }
        }
    }
</style>
