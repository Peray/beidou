<template>
	<div class="message">
		<el-dialog title="消息管理" :visible.sync="dialogMessageVisible">
			<el-container>
  				<el-aside width="260px">
  					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
  						 <el-menu-item index="1">通航设备</el-menu-item>
  						 <el-menu-item index="2">通讯模板</el-menu-item>
  					</el-menu>
  						<div class="infolist infoitem-bg-Even">
  							<i class="infoitem-icon">
  								<img src="../../../static/img/gis/zsj.png">
  							</i> 
  							<div class="infoitem-content">
	  							<span class="infoitem-title">
	  								<label class="reg">机尾号：425229</label>
	  								<label class="flight">卡号：425229</label>
	  							</span> 
	  							<span class="infoitem-description">
	  								<i class="el-icon-time"></i>
	  							</span>
  							</div>
  						</div>
  				</el-aside>
	  			<el-container>
		    		<el-header style="height:40px">
		    			<div class="headerWrap">
		    				<span class="headerIcon">
		    					<i class="el-icon-menu">&nbsp;&nbsp;</i>
		    				</span>
		    				<span class="flightCard">
		    					通航卡号：1123213
		    				</span>
		    			</div>
		    		</el-header>
		    		<el-main>
		    			<div class="rightd">
		    				<span class="rightimg"><img src="../../../static/img/gis/admin.png"></span> 
		    				<div class="talkTime">
                        		2018-03-13 15:43:43
                    		</div>
                    		<div class="speech right">
                        		即将雷雨天气，请速速返航
                    		</div>
                    	</div>
                    	<div class="leftd">
                    		<span class="leftimg"><img src="../../../static/img/gis/thplane.png"></span>
                    		<div class="talkTime">
                        		2018-03-13 18:15:44
                    		</div> 
                    		<div class="speech left">
                        906106FFEF0421E30C06F2AB0C025F18B800470000000006000002FFFFFC0047000000000C000006FFFFF900460000000012000007FFFFF700460000000018000008FFFFFD00450000000000
                    		</div>
                    	</div>
		    		</el-main>
		    		<el-footer>Footer</el-footer>
	  			</el-container>
			</el-container>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'message',
		props:{
			dialogMessageVisible:{
				type: Boolean,
				default: false,
			}
		},
		data () {
			return {
				activeIndex: '1',
			}
		}
	}
</script>
<style scoped>
	.el-dialog{
		background: #F3F3F3 !important;
	}
	.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    text-align: center;
    line-height: 30px;

  }
  
  .el-main {
    color: #333;
    text-align: center;
    height: 300px;
    background: #F3F3F3
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
/*    line-height: 260px;*/
  }
  
  .el-container:nth-child(7) .el-aside {
/*    line-height: 320px;*/
  }
  
  .infolist {
  	width: 100%;
  	height: 30px;
    padding: 2px 1px;
    margin: 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: #1F2D3D;
    opacity: 1;
    display: table;
    border-bottom: 1px solid #DFE6EC;
    transition: opacity .2s;
    font-family: "Bernard MT Condensed","SimHei"
  }
  .infoitem-icon {
  	font-size: 24px;
    width: 24px;
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }

.infoitem-content {
    display: table-cell;
    padding: 0 8px;
    text-align: left;
}
.infoitem-title {
	font-size: 13px;
}
.infoitem-title .reg {
    color: #13CE66;
}
.infoitem-title .flight {
    color: #A9334C;
}
.infoitem-description {
	display: block;
	text-align: right;
}
.headerWrap {
	display: table;
	line-height:40px;
}
.headerWrap .headerIcon, .flightCard {
	display: table-cell;
}
 /* 微信气泡 */

    div.speech {
        font-family: Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, Arial, sans-serif;
        float: left;
        margin: 26px 0;
        padding: 9px 13px;
        table-layout: fixed;
        word-break: break-all;
        position: relative;
        background-color: #fff;

        border-radius: 4px;
        font-size: 14px;
    }

        div.speech:before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 15px;
            top: -20px;
            border: 10px solid;
            border-color: transparent transparent #d6d2d2 transparent;
        }

        div.speech:after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 17px;
            top: -16px;
            border: 8px solid;
            border-color: transparent transparent #ffffff transparent;
        }

        div.speech.right {
            display: inline-block;
            /*box-shadow: -2px 2px 5px #CCC;*/
            margin-right: 32px;
            top: -32px;
            max-width: 75%;
            float: right;
            /*background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#e4ffa7), color-stop(0.1, #bced50), color-stop(0.4, #aed943), color-stop(0.8, #a7d143), to(#b2e281));*/
            background-color: #b2e281;
        }

            div.speech.right:before {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                top: 9px;
                bottom: auto;
                left: auto;
                right: -10px;
                border-width: 9px 0 9px 10px;
                border-color: transparent #d6d2d2;
            }

            div.speech.right:after {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                top: 10px;
                bottom: auto;
                left: auto;
                right: -8px;
                border-width: 8px 0 8px 9px;
                border-color: transparent #b2e281;
            }

    div .left {
        display: inline-block;
        /*box-shadow: 2px 2px 2px #CCCCCC;*/
        margin-left: 32px;
        top: -30px;
        max-width: 75%;
        position: relative;
        /*background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #eae8e8), color-stop(0.4, #E3E3E3), color-stop(0.8, #DFDFDF), to(#D9D9D9));*/
    }

        div .left:before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: 9px;
            bottom: auto;
            left: -10px;
            border-width: 9px 10px 9px 0;
            border-color: transparent #fff;
        }

        div .left:after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: 10px;
            bottom: auto;
            left: -8px;
            border-width: 8px 9px 8px 0;
            border-color: transparent #fff;
        }

    .leftimg {
        float: left;
        margin-top: 10px;
    }

    .rightimg {
        float: right;
        margin-top: 10px;
    }

    .leftd {
        clear: both;
        float: left;
        margin-left: 10px;
    }

    .rightd {
        clear: both;
        float: right;
        margin-right: 10px;
    }

    .leftd_h {
        width: 39px;
        height: 39px;
        border-radius: 100%;
        display: block;
        float: left;
        overflow: hidden;
    }

        .leftd_h img {
            display: block;
            width: 100%;
            height: auto;
        }

    .rightd_h {
        width: 39px;
        height: 39px;
        border-radius: 100%;
        display: block;
        float: right;
        overflow: hidden;
    }

        .rightd_h img {
            display: block;
            width: 100%;
            height: auto;
        }

    .talkTime {
        font-size: 10px;
    }

    .leftd .talkTime {
        margin-left: 32px;
    }
</style>