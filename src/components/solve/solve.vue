<template>
    <div class="solve">
        <div class="securityhead">
            <div class="securityImg">
                <img :src="imgsrc+item[0].faBanner">
            </div>
            <div class="securityText">
                <h3>{{item[0].faName}}</h3>
                <p>{{item[0].faContent}}</p>
            </div>
        </div>
        <div class="securityService">
            <h3>方案概述</h3>
            <p>{{item[0].faGs}}</p>
        </div>
        <div class="securityFun">
            <h3>方案特点</h3>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(list, index) in item" :key="index" :offset="index > 0 ? .3 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="imgsrc+list.fatdIco">
                        <p class="CardTitle">{{ list.fatdName }}</p>
                        <p class="CardContent">{{ list.fatdContent }}</p>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'solve',
        data() {
            return {
                s: '350px',
                hides: true,
                imgsrc: '',
                item: [],
            }
        },
        mounted: function () {
            let index = this.$route.params.id
            this.$http.get(config.slovedetailUrl, {params: {menuId: index}}).then(response => {
                debugger
                this.item = response.data
            }, response => {
                console.log(response.status);
            });
            this.imgsrc = config.imgsrc;
            this.$store.dispatch('h', this.s);
            this.$store.dispatch('showup', this.hides);
        },
        watch: {
            '$route': function () {
                let index = this.$route.params.id;
                debugger
                this.$http.get(config.slovedetailUrl, {params: {menuId: index}}).then(response => {
                    this.item = response.data
                }, response => {
                    console.log(response.status);
                });
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .solve {
        color: #fff;
        .securityhead {
            height: 350px;
            .securityImg {
                /*height: 100%;*/
                img {
                    /*height: 100%;*/
                    width: 100%;
                }
            }
            .securityText {
                position: absolute;
                top: 160px;
                left: 130px;
                text-align: left;
                h3 {
                    font-size: 30px;
                    font-weight: normal;
                    font-family: "sourcehansansCN-Regular";
                }
                p {
                    width: 500px;
                    font-size: 14px;
                    font-family: "sourcehansansCN-Light";
                    margin: 30px 0 0;
                    line-height: 1.8;
                }
            }
        }
        .securityService {
            text-align: left;
            padding: 0 130px;
            h3 {
                font-size: 24px;
                color: #333;
                padding: 40px 0;
            }
            p {
                font-size: 16px;
                color: #2d2d2d;
            }
        }
        .securityFun {
            text-align: left;
            padding: 0 130px 40px;
            h3 {
                font-size: 24px;
                color: #333;
                padding: 50px 0 40px;
            }
            .el-row {
                width: 1200px;
                margin: 0 auto !important;
                .el-col {
                    padding: 0;
                    .el-card {
                        border-radius: 0;
                        border: 1px solid #E1E1E1;
                        .el-card__body {
                            text-align: center;
                            img {
                                margin: 30px 0;
                            }
                            .CardTitle {
                                text-align: center;
                                font-size: 18px;
                            }
                            .CardContent {
                                font-size: 14px;
                                height: 63px;
                                line-height: 1.5;
                                padding: 0 20px;
                                margin: 30px 0 50px;
                                color: #838383;
                                text-align: left;
                                word-break: break-all;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
