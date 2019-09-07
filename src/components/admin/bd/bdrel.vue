<template>
    <div class="bdrel">
        <el-input placeholder="请输入北斗卡号" v-model="inputNumber">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchNumber"></i>
        </el-input>
        <div class="bdrellist">
            <template>
                <el-table 
                ref="multipleTable"
                :data="dataTable" 
                @selection-change="handleSelectionChange"
                @select="select">
                    <el-table-column type="selection" width="100"></el-table-column>

                    <el-table-column prop="num" label="序号" width="50" type="index" :index="indexMethod"></el-table-column>

                    <el-table-column prop="cardId" label="北斗卡号"></el-table-column>

                    <el-table-column label="绑定设备">
                        <template slot-scope="scope">
                            <span>{{scope.row.airplaneId}}</span>
                            <i class="edit el-icon-edit-outline" 
                            v-if="dataTable[scope.$index].isSelected" 
                            @click="handleEdit(scope.$index,scope.row)"></i>
                        </template>
                    </el-table-column>


                    <el-table-column prop="startTime" label="申请时间">
                        <template slot-scope="scope">
                            {{scope.row.startTime | formatDate}}
                        </template>
                    </el-table-column>


                    <el-table-column prop="status" label="状态" :formatter="formatStatus">
                    </el-table-column>

                </el-table>
            </template>
            <div class="block">
                <el-pagination
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
        <el-dialog title="关联申请" :visible.sync="dialogFormVisible" top="30vh">
            <el-form :inline="true" :model="form">
                <el-form-item label="北斗设备" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="机尾号" :label-width="formLabelWidth">
                    <el-input v-model="form.region" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'bdrel',
    data () {
        return {
            inputNumber:'',
            currentPage:1,
            pageSize:10,
            pageCount:0,
            multipleSelection:[],
            arr:[],
            dialogFormVisible: false,
            form: {
                name: '',
                region: ''
            },
            formLabelWidth: '80px',
            bdrel:[
                {
                    num:'1',
                    cardnum:'000001',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'2',
                    cardnum:'000002',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'3',
                    cardnum:'000003',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'4',
                    cardnum:'000004',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'5',
                    cardnum:'000005',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'6',
                    cardnum:'000006',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'7',
                    cardnum:'000007',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'8',
                    cardnum:'000008',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'9',
                    cardnum:'000009',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'10',
                    cardnum:'0000010',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'11',
                    cardnum:'0000011',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'12',
                    cardnum:'0000012',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'13',
                    cardnum:'0000013',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                },
                {
                    num:'14',
                    cardnum:'0000014',
                    equip:'001234',
                    binddate:'2017-12-02',
                    status:'已关联',
                    isSelected:false
                }
            ],
            dataTable:[]
        }
    },
    mounted: function (){
        var param = {};
        param.pageNum = 1;
        param.pageSize = this.pageSize;
        this.requestList(param);

    },
    methods:{
        searchNumber: function(){
            var param = {};
            param.cardId = this.inputNumber;
            param.pageNum = 1;
            this.requestList(param);
        },
        formatStatus: function(row , column){
            var val = '';
            switch(row.status){
                case '1':
                val = '关联申请';
                break;
                case '2':
                val = '已关联';
                break;
                case '3':
                val = '关联变更';
                break;
            }
            return val ;
        },
        indexMethod(index){
            return (this.currentPage - 1) * this.pageSize + index + 1 ;
        },
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
        select(selection,row){
            row.isSelected = !row.isSelected
            this.$refs.multipleTable.toggleRowSelection(row,row.isSelected)
        },
        handleEdit(index,row){
            // console.log(row)
            this.dialogFormVisible = true
        },
        handleSizeChange: function (size) {
            this.pageSize = size;
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            var param = {};
            param.pageNum = currentPage;
            param.pageSize = this.pageSize ;
            this.requestList(param);
        },
        requestList: function(param){

            this.$http.get(config.getBdCardRelList , {params: param}).then(response =>{
                if(response.ok){
                 if (response.body.list && response.body.list.length > 0) {
                    this.dataTable = response.body.list;
                    this.pageCount = response.body.pages;
                }else{
                    this.$message.warning('暂无搜索结果！')
                }
            }
        },
        response => {

            });
        }
    },
    computed:{
        // dataTable(){
        //     return this.bdrel.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .bdrel{
        padding:30px;
        text-align: left;
        &>.el-input{
            width:250px;
            margin:0 0 30px;
            .el-input__inner{
                border-radius:0;
            }
            .el-input__suffix{
                color:$primaryColor;
                font-size:18px;
                cursor: pointer;
                .el-icon-search{
                    font-weight:bold;
                    width:30px;
                }
            }
        }
        .bdrellist{
            background-color:#fff;
            &>.el-table thead{
                color:#000;
            }
            &>.el-table th,
            &>.el-table td,{
                text-align: center;
                padding:15px 0;
            }
            &>.el-table th{
                font-size:15px;
            }
            &>.el-table td{
                font-size:13px;
                .edit{
                    margin: -3px -26px 0 10px;
                    cursor:pointer;
                    color: $primaryColor;
                    font-size:16px;
                }
            }
            &>.block{
                .el-pager{
                    color:#666;
                    li{
                        border:1px solid #D9D9D9;
                        border-radius:3px;
                        font-size:16px;
                        margin: 0 2px;
                        height:30px;
                        font-weight:normal;
                        min-width:30px;
                        &.active{
                            background-color:$primaryColor;
                            border: 1px solid $primaryColor;
                        }
                    }
                }
                .el-pagination{
                    text-align:center;
                    padding:40px 0 60px;
                    .btn-next,.btn-prev{
                        border:1px solid #D9D9D9;
                        border-radius:3px;
                        height:30px;
                        padding:0 10px;
                    }
                    .el-pagination__total{
                        font-size:16px;
                        margin-left:20px;
                    }
                    .el-pagination__jump{
                        height:30px;
                        height:30px;
                        font-size:16px;
                        .el-pagination__editor.el-input .el-input__inner{
                            height:30px;
                        }
                    }
                    
                }
            }
        } 
        &>.el-dialog__wrapper{
            .el-dialog{
                width:620px;
                .el-dialog__header{
                    background-color:$primaryColor;
                    .el-dialog__title{
                        color:#fff;
                    }
                    .el-dialog__headerbtn{
                        .el-dialog__close{
                            color:#fff;
                        }
                    }
                }
                .el-dialog__body{
                    padding:30px 20px 0;
                    .el-form{
                        padding: 0 28px;
                        &>.el-form-item{
                            &>.el-form-item__label{
                                line-height:35px;
                            }
                            &>.el-form-item__content{
                                width:170px;
                                line-height:35px;
                                .el-input__inner{
                                    border-radius:0;
                                    height:35px;
                                }
                            }
                        }
                    }
                }
                .el-dialog__footer{
                    text-align: center;
                    padding-bottom:25px;
                    .el-button{
                        padding:10px 20px;
                        border-radius:0;
                    }
                    .el-button--default{
                        border-color:$primaryColor;
                        &:hover{
                            color:$primaryColor;
                        }
                    }
                    .el-button--primary{
                        background-color:$primaryColor;
                        border-color:$primaryColor;
                    }
                }
            }
        } 
    }
</style>