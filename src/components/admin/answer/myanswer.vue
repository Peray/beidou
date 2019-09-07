<template>
    <div class="myanswer">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div v-show="num === 0">
                    <el-card class="box-card-style" style="text-align: center">
                        <div slot="header">
                            <span style="font-size: 18px">在线提交问题/建议</span>
                        </div>
                        <div>
                            <el-form status-icon :rules="rule" :model="answerSubmitForm" ref="answerFormRef">
                                <el-form-item>
                                    <span style="margin-right: 30px">问题类型</span>
                                    <el-radio-group v-model="answerSubmitForm.type">
                                        <el-radio v-for="(item,index) in options" :key="index" :label="item.label">
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="提交内容" :label-width="formLabelWidth" prop="content">
                                    <el-input type="textarea" v-model="answerSubmitForm.content">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="联系方式" :label-width="formLabelWidth">
                                    <el-input type="text">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="上传图片" :label-width="formLabelWidth" style="text-align: left">
                                    <div>
                                        <el-upload
                                            ref="upload"
                                            action="123"
                                            list-type="picture-card"
                                            :on-preview="handlePicturePreview"
                                            :on-remove="handlePictureRemove"
                                            :before-upload="handleBeforeUpload"
                                            :file-list="answerSubmitForm.fileList"
                                            :auto-upload="false"
                                            :on-change="handlePictureChange"
                                            accept="image/png , image/jpeg ,image/jpg"
                                            :limit="3"
                                            :on-exceed="handleExceed"
                                            multiple
                                        >
                                            <i class="el-icon-plus"></i>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                                        </el-upload>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('answerFormRef')">提交
                                    </el-button>
                                </el-form-item>
                            </el-form>

                            <el-dialog :visible.sync="imgPreviewVisible1" size="tiny">
                                <el-carousel :autoplay="false" :initial-index="imgPreviewCurrentShowIndex">
                                    <el-carousel-item v-for="(item , index) in answerSubmitForm.fileList" :key="index">
                                        <img :src="item.url" alt="" style="max-width: 100%; max-height: 100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </el-dialog>
                        </div>
                    </el-card>
                </div>
                <div v-show="num === 1">
                    <div>
                        <el-form>
                            <el-form-item label="问题类型">
                                <el-radio-group v-model="radio1" @change="answerTypeListener">
                                    <el-radio label="全部">
                                    </el-radio>
                                    <el-radio v-for="(item,index) in options" :key="index" :label="item.label">
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="处理进度">
                                <el-radio-group v-model="radio2" @change="scheduleListener">
                                    <el-radio v-for="(item,index) in schedule" :key="index" :label="item.label">
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择时间">
                                <el-date-picker
                                    v-model="datePickerValue"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right"
                                    style="margin-left: 30px"
                                    @change="timeChangeEvent"
                                    :editable="false"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-bind:class="accordionStyle">
                        <el-collapse accordion @change="accordionChange" :value="currentActiveRow">
                            <el-collapse-item v-for="(item , index) in responseData" :key="index" :name="item.id">
                                <template slot="title">
                                    <div>
                                        <el-tag style="margin-right: 30px" type="info">
                                            {{answerTypeFormatter(item.type)}}
                                        </el-tag>
                                        <span style="color: #409EFF;">
                                            {{item.content.length > 20? item.content.substring(0,20)+"...":item.content}}</span>
                                        <span style="color: #909399; float: right; margin-right: 30px">{{new Date(item.startTime).toLocaleString()}} <el-tag
                                            style="margin-left: 30px" type="success" size="mini">{{statusFormatter(item.status)}}</el-tag></span>
                                    </div>
                                </template>
                                <div>
                                    <el-card>
                                        <div>
                                            <el-form>
                                                <el-form-item label="问题详情">
                                                    <span class="minorTextStyle">{{item.content}}</span>
                                                </el-form-item>
                                                <el-form-item>
                                                    <div v-for="(imgItem ,index) in imgData" :key="index"
                                                         style="float: left;">
                                                        <img :src="imgSrc+imgItem.img" class="pictureStyle"
                                                             @click="pictureClickEvent(imgData,index)"/>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item style="text-align: right">
                                                    <span style="color: #909399;">
                                                        {{new Date(item.startTime).toLocaleString()}}</span>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-card>
                                    <el-card>
                                        <div>
                                            <el-form>
                                                <el-form-item label="解决方案"><span class="minorTextStyle">暂无</span>
                                                </el-form-item>
                                                <el-form-item style="text-align: right"><span
                                                    class="minorTextStyle">{{new Date().toLocaleString()}}</span>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-card>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <div>
                        <el-dialog :visible.sync="scheduleTabDialogVisible" size="tiny"
                                   style="text-align: center">
                            <el-carousel :autoplay="false" :initial-index="carouselShowIndex">
                                <el-carousel-item v-for="(imgItem , index) in imgCarouselList"
                                                  :key="index">
                                    <img :src="imgSrc+imgItem.img" alt=""
                                         style="max-width: 100%; max-height: 100%">
                                </el-carousel-item>
                            </el-carousel>
                        </el-dialog>
                    </div>
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :background="true"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="prev,pager,next,jumper,total"
                            :page-count="pageCount"
                            prev-text="上一页"
                            next-text="下一页">
                        </el-pagination>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import ElSelect from "element-ui/packages/select/src/select";

    import ElRadio from "element-ui/packages/radio/src/radio";
    import ElCard from "element-ui/packages/card/src/main";
    import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";

    export default {
        // components: {ElSelect},
        components: {
            ElCollapseTransition,
            ElCard,
            ElRadio
        },
        name: "myanswer",
        data() {
            var validateContent = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入问题'));
                } else {
                    callback();
                }
            };
            return {
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
                options: [{
                    value: '1',
                    label: '业务咨询'
                }, {
                    value: '2',
                    label: '设备维修'
                }, {
                    value: '3',
                    label: '现场技术支持'
                }],
                answerSubmitForm: {
                    userId: '',
                    type: '业务咨询',
                    content: '',
                    fileList: [],
                },
                schedule: [
                    {
                        value: '1',
                        label: '全部'
                    },
                    {
                        value: '2',
                        label: '处理中'
                    }, {
                        value: '3',
                        label: '已完成'
                    }
                ],
                answerTypeValue: '',
                datePickerValue: '',
                formLabelWidth: '120px',
                dialogFormVisible: false,
                radio1: '全部',
                radio2: '全部',
                fileList: [],
                responseData: [],
                currentPageData: [],
                currentPage: 1,
                pageSize: 10,
                pageCount: 0,
                expands: [],
                rowExpandStatus: false,
                rule: {
                    type: [{required: true, message: '请选择问题类型', trigger: 'change'}],
                    content: [{validator: validateContent, trigger: 'blur'}]
                },
                items: ['创建问题', '处理进度'],
                num: 0,
                imgPreviewVisible1: false,
                dialogImgUrl: '',
                scheduleTabDialogVisible: false,
                imgData: [],
                imgSrc: config.lslimgurl,
                requestParams: {
                    userId: '',
                    type: '',
                    status: '',
                    startTime: '',
                    endTime: ''
                },
                imgCarouselList: [],
                carouselShowIndex: '',
                imgPreviewCurrentShowIndex: 0,
                currentActiveRow: ''

            }
        },
        mounted: function () {
            this.listUpdate();
        },
        methods: {
            requestData(param) {
                this.$http.get(config.queryAnswerList, {params: param}).then(response => {
                        if (response.ok) {
                            console.log(response);
                            if (response.body.list.length === 0) {
                                this.$message.success('查询结果为空!');
                            } else {

                            }
                            this.pageCount = response.body.pages;
                            if (typeof response.body.list !== 'undefined') {
                                this.responseData = response.body.list.reverse();
                            }
                        } else {
                            console.log(response);
                            this.$message.error('查询异常!');
                        }
                    },
                    response => {
                        this.$message.error('查询异常!');
                        console.log(response);
                    })
            },
            handleExceed(files, fileList) {
                this.$message.warning('当前限制选择 3 个文件!');
            },
            handlePictureChange(file, fileList) {
                console.log("add: " + "currentSize: " + this.answerSubmitForm.fileList.length + " changed " + fileList.length);
                this.answerSubmitForm.fileList = fileList;
            },
            handlePicturePreview(file) {
                this.imgPreviewVisible1 = true
            },
            handlePictureRemove(file, fileList) {
                this.answerSubmitForm.fileList = fileList;
                console.log("remove: " + this.answerSubmitForm.fileList.length);

            },
            handleBeforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    if (!isPNG) {
                        this.$message.error('上传图片只能是JPG格式或PNG!');
                    }
                }
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5MB');
                }
                return (isJPG || isPNG) && isLt5M;
            },
            //提交问题表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('验证成功!');

                        var formData = new FormData();
                        for (var i = 0; i < this.answerSubmitForm.fileList.length; i++) {
                            if (this.handleBeforeUpload(this.answerSubmitForm.fileList[i].raw)) {
                                formData.append('file', this.answerSubmitForm.fileList[i].raw);
                            } else {
                                console.log('验证失败');
                                this.answerSubmitForm.fileList = [];
                                return;
                            }
                        }

                        // formData.append("userId", "1");

                        var type = this.answerSubmitForm.type == '业务咨询' ? 1 : (this.answerSubmitForm.type == '设备维修' ? 2 : 3);
                        formData.append("type", type);
                        formData.append("content", this.answerSubmitForm.content);

                        this.dialogFormVisible = false;
                        this.$http.post(config.addAnswerUrl, formData).then(
                            response => {
                                console.log('响应成功：' + response.status + " , " + response.data);
                                if (response.data === true) {
                                    this.$message.success('提交成功!');
                                    //内容置空
                                    this.answerSubmitForm.content = '';
                                    this.answerSubmitForm.fileList = [];
                                    //更新表单数据
                                    // var param = {userId: 1};
                                    this.requestData(null);
                                } else {
                                    this.$message.error('提交失败!')
                                }
                            },
                            response => {
                                console.log('提交失败!' + response.status)
                            }
                        );
                    } else {
                        this.$message.error('请输入问题');
                        console.log('验证失败!');
                        return false;
                    }
                });

            },
            answerTypeFormat: function (row, column) {
                const item = row[column.property];
                return this.answerTypeFormatter(item);
            }
            ,
            statusFormat: function (row, column) {

                const item = row[column.property];
                return this.statusFormatter(item);
            }
            ,
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return this.datetimeFormat(new Date(date));
            }
            ,
            datetimeFormat: function dateToStr(datetime) {
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
                return (year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second);
            }
            ,
            handleSizeChange(size) {
                this.pageSize = size;
                console.log(`每页 ${size} 条`);
            }
            ,
            handleCurrentChange(currentPage) {
                console.log(`当前页: ${currentPage}`);
                this.currentPage = currentPage;
                this.listUpdate();
            }
            ,
            statusFormatter(item) {
                if (item == 1) {
                    return '已提交';
                } else if (item == 2) {
                    return '已解决';
                } else if (item == 3) {
                    return '未解决或失效';
                }
            }
            ,
            answerTypeFormatter(item) {
                if (item == 1) {
                    return '业务咨询';
                } else if (item == 2) {
                    return '设备维修';
                } else if (item == 3) {
                    return '现场技术支持';
                }
            }
            ,
            timeChangeEvent(val) {
                this.pageNum = 1;
                this.listUpdate();
            }
            ,
            answerTypeListener(val) {
                //更改问题类型，重新请求，更新列表
                this.pageNum = 1;
                this.listUpdate();
            },
            scheduleListener(val) {
                //更改处理进度选择，重新请求，更新列表
                this.pageNum = 1;
                this.listUpdate();
            },
            listUpdate() {
                var param = {};
                param.pageNum = this.pageNum;
                param.pageSize = this.pageSize;

                var type = '';
                switch (this.radio1) {
                    case '全部':
                        type = 0;
                        break;
                    case '业务咨询':
                        type = 1;
                        break;
                    case '设备维修':
                        type = 2;
                        break;
                    case '现场技术支持':
                        type = 3;
                        break;
                }

                var schedule = '';
                switch (this.radio2) {
                    case '全部':
                        schedule = -1;
                        break;
                    case '处理中':
                        schedule = 1;
                        break;
                    case '已完成':
                        schedule = 0;
                        break;
                }


                if (type != 0) {
                    param.type = type;
                }

                if (schedule != -1) {
                    param.status = schedule;
                }

                if (this.datePickerValue != null && this.datePickerValue.length > 0) {
                    console.log(this.datePickerValue[0]);
                    const startTime = this.datetimeFormat(this.datePickerValue[0]);
                    const endTime = this.datetimeFormat(this.datePickerValue[1]);

                    param.startAt = startTime;
                    param.endAt = endTime;
                }

                // param.userId = 1;


                this.requestData(param);


            },
            tab(index) {
                this.num = index;
            },
            pictureClickEvent: function (imgList, index) {
                console.log(index);
                this.imgCarouselList = imgList;
                this.carouselShowIndex = index;
                this.scheduleTabDialogVisible = true;
            },
            accordionChange: function (activeNames) {
                console.log(activeNames);
                this.$http.get(config.queryAnswerDetail, {params: {id: activeNames}}).then(response => {
                        console.log(response);
                        if (response.ok) {
                            this.imgData = response.data;
                        } else {
                            this.$message.error('请求问题详情出错！');
                            console.log(response);
                        }
                    },
                    response => {
                        this.$message.error('请求问题详情出错！');
                        console.log(response);
                    })
            }
        },
        computed: {
            accordionStyle: function () {
                return {
                    'text-align': 'left',
                    'margin-top': '30px'
                }
            }
        }
    }
</script>

<style lang="scss">
    .myanswer {
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
                            border-bottom: 2px solid #589bdd;
                            color: #589bdd;
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
                        font-size: 16px;
                        .el-pagination__editor.el-input .el-input__inner {
                            height: 30px;
                        }
                    }

                }
            }
        }
        .headStyle {
            text-align: left;
        }
        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
        & > .box-card-style {
            margin-top: 30px;
            margin-left: 30px;
            margin-right: 30px;
            padding: 0 30px;
        }

        & > .block {
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
                    font-size: 16px;
                    .el-pagination__editor.el-input .el-input__inner {
                        height: 30px;
                    }
                }

            }
        }
    }

    .minorTextStyle {
        color: #909399;
    }

    .commonTextStyle {
        color: #606266
    }

    .pictureStyle {
        width: 146px;
        height: 146px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 8px;
    }


</style>
