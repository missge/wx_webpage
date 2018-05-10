<template>
    <section style="left: 185px;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item label="标题">
                    <el-input v-model="filters.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tooltip content="查询" placement="top">
                    <el-button  class="el-icon-search" type="primary" v-on:click="getStorys"></el-button>
                    </el-tooltip>
                    <el-tooltip content="新增" placement="top">
                    <el-button type="primary" @click="handleAdd" class="el-icon-plus"></el-button>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </el-col>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="30" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--列表-->
        <el-table :data="storys" highlight-current-row v-loading="listLoading" border style="font-size:12px;" align="center">
            <el-table-column  align="center" prop="legacy_id"  label="ID"  > </el-table-column>
            <el-table-column  align="center" prop="title"  label="标题"  > </el-table-column>
             <el-table-column  align="center" prop="weight"  label="权重"  > </el-table-column>
            <el-table-column  align="center" prop="status"  label="状态"  > </el-table-column>

            <el-table-column  align="center" prop="album_ids"  label="专辑IDS" ></el-table-column>
            <el-table-column  align="center" prop="categories"  label="分类IDS" ></el-table-column>
            
            <el-table-column align="center" prop="created_at" label="创建时间" ></el-table-column>


            <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="edit"  @click="handleUpdate(scope.row.id)"></el-button>
                    <el-button type="primary" icon="view"  @click="handlePreview(scope.row.h5_url)"></el-button>
                    <el-button type="primary" icon="delete"  @click="handleDelete(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="30" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <el-dialog v-model="dialogVisible" title="手机扫码预览（限内网）" size="tiny">
        <div style="text-align:center">
            <a :href="qr_text" target="_blank">点击浏览器预览</a>
            <vue-qr :text="qr_text" size="300"></vue-qr>
        </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import NProgress from 'nprogress'
    var Resource = require('../../util/Resource');
    import VueQr from 'vue-qr'
    export default {
        components:{VueQr},
        data() {
            return {
                filters: {
                    name: ''
                },
                dialogVisible: false,
                storys: [],
                total: 0,
                pageSize: 30,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                dialogFormVisible: false,
                rules: {
                    name: [
                      {
                          required: true,
                          message: '请输入名称',
                          trigger: 'blur'
                      }
                    ],
                },
                tag: {
                    name: ""
                },
                title:"",
                qr_text: "",
                previewUrl:""
            }
        },
        methods: {
            handleAdd: function() {
                window.location.href = '/#/apps/edit_webpage';
            },
            
            handleCurrentChange(val) {
                this.page = val;
                this.getStorys();
            },
            handleUpdate(id) {
                window.location.href = '/#/apps/edit_webpage?id='+id;
            },
            handlePreview(h5_url) {
                this.qr_text =  h5_url
                this.dialogVisible = true;
            },
            handleDelete(id) {
                var _this = this;
                Resource.delete({
                    resource: "album.story",
                    data: {
                        id: id
                    },
                    success: function(data) {
                        _this.getStorys();
                    },
                    error: function() {
                        _this.$notify({
                            title: '失败',
                            message: '请求失败',
                            type: 'error'
                        });
                    }
                })
            },
            //获取用分类列表
            getStorys() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                NProgress.start();
                var _this = this;
                Resource.get({
                    resource: "album.story_list",
                    data: para,
                    success: function(data) {
                        _this.total = data.total_count;
                        _this.storys = data.items;
                        _this.pageSize = data.page_size;
                        _this.listLoading = false;
                        NProgress.done();
                    },
                    error: function() {
                        _this.listLoading = false;
                        NProgress.done();
                        _this.$notify({
                            title: '失败',
                            message: '请求失败',
                            type: 'error'
                        });
                    }
                })
            },
        },
        mounted() {
            //this.getStorys();
        }
    }

</script>

<style lang="scss" scoped>
.el-table td>div {
    height:100px!important;
}
</style>
