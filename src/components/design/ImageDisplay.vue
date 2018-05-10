<template>
<div>
  <el-form label-position="left"  ref="image_display" :model="image_display" label-width="100px"   border>
            <el-form-item label="显示方式">
                <el-radio-group v-model="image_display.ui_type" @change=handleChangeDisplay>
                  <el-radio  v-model="image_display.ui_type" label="1">普通</el-radio>
                  <el-radio  v-model="image_display.ui_type" label="2">两列</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图片-1">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessFirst"
                  :data="upload_type"
                  :file-list="fileListFirst"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- 图片预览弹窗 -->
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="链接地址-1" prop="url">
                <el-input v-model="image_display.url1"></el-input>
            </el-form-item>
            <el-form-item label="图片-2">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessSecond"
                  :data="upload_type"
                  :file-list="fileListSecond"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="链接地址-2" prop="url">
                <el-input v-model="image_display.url2"></el-input>
            </el-form-item>
            <el-form-item label="图片-3">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessThird"
                  :data="upload_type"
                  :file-list="fileListThird"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- 图片预览弹窗 -->
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="链接地址-3" prop="url">
                <el-input v-model="image_display.url3"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('image_display')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex'
    import GlobalConfig from '../../GlobalConfig'
    var Resource = require('../../util/Resource');
    var error_img = "http://wallpaper.cdn.pandora.xiaomi.com/thumbnail/webp/w512/MiTv/0bdab55084ff3433126f2aff3e847eda79130a0f9";

    var tmp = '<div style="margin-left: 10px;margin-right: 6px;display:inline-block;margin-bottom: 5px;"><ul style="padding-left: 0px; width: 100%; height: 100%; list-style: none;margin-top: 0px;"><li style="width:31%;float:left;margin-left:0px"><a href="HREF1" style=""><img style="width:100%;" src="IMG1" onerror="onerror=null;src=\'error_img\'"/></a></li><li style="width:31%;float:left;margin-left:10px"><a href="HREF2" style=""><img style="width:100%;" src="IMG2" onerror="onerror=null;src=\'error_img\'"/></a></li><li style="width:31%;float:left;margin-left:10px"><a href="HREF3" style=""><img style="width:100%;" src="IMG3" onerror="onerror=null;src=\'error_img\'"/></a></li></ul></div>'.replace(/error_img/g, error_img);
    var tmp1 = '<div style="display:inline-block;    margin-bottom: 5px"><div style="margin-left: 2.7%;overflow:hidden; height:310px;width:46%;float:left;display:inline;"><a href="HREF1"><img style="display:block;height:100%;width:100%" src="IMG1" onerror="onerror=null;src=\'error_img\'" /></a></div><div style="height:300px;width:45.5%;float:right;display:inline;margin-right: 3%;"><div style="height:50%"><a href="HREF2"><img style="display:block;width:100%;height:150px" src="IMG2" onerror="onerror=null;src=\'error_img\'" /></a></div><div style="height:50%;margin-top: 6%;"><a href="HREF3"><img style="display:block;width:100%;height:150px" src="IMG3" onerror="onerror=null;src=\'error_img\'"/></a></div></div></div>'.replace(/error_img/g, error_img);
    // var tmp1 = '<div><div style="overflow:hidden; height:300px;width:50%;float:left;display:inline;"><a href="HREF1"><img style="height:100%;" src="IMG1" onerror="onerror=null;src=\'error_img\'"/></a></div><div style="height:300px;width:48%;float:right;display:inline;"><div ><a href="HREF1"><img style="width:100%;height:150px" src="IMG2" onerror="onerror=null;src=\'error_img\'"/></a></div><div ><a href="HREF3"><img style="width:100%;height:150px" src="IMG3" onerror="onerror=null;src=\'error_img\'"/></a></div></div></div>'.replace(/error_img/g, error_img);

    export default {
        components : {},
        data() {
            return {
                upload_url:GlobalConfig.uploadImageUri,
                dialogImageUrl: '',
                dialogVisible: false,
                submitVisible: false,
                upload_type:{
                    type: GlobalConfig.uploadType,
                    online: true
                },
                image_display: {
                    img: "",
                    ui_type: "1",
                    url1: GlobalConfig.mifgUrl,
                    url2: GlobalConfig.mifgUrl,
                    url3: GlobalConfig.mifgUrl,
                    img1: "",
                    img2: "",
                    img3: "",
                },
                ui_type:"1",
                fileListFirst: [],
                fileListSecond: [],
                fileListThird: [],
                tmp: tmp,
                tmp1: tmp1
          }
        },
        computed: {
            ...mapState ({
                designCurrentData: state => state.designCurrentData,
                designCurrentType: state => state.designCurrentType
            })
          },
        methods: {
            ...mapActions({
                updateMode: 'updateMode',
            }),
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccessFirst(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img1 = response.data.url;
                    this.fileListFirst = [{
                        name:"",
                        url: this.image_display.img1
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img1 = "";
                }
            },
            handleSuccessSecond(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img2 = response.data.url;
                    this.fileListSecond = [{
                        name:"",
                        url: this.image_display.img2
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img2 = "";
                }
            },
            handleSuccessThird(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img3 = response.data.url;
                    this.fileListThird = [{
                        name:"",
                        url: this.image_display.img3
                    }]
                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img3 = "";
                }
            },
            onSubmit(formname){
                var currentData = this.designCurrentData;
                if (!currentData.data) {
                    currentData.html = this.tmp;
                } else if (this.image_display.ui_type == "1") {
                    currentData.html = this.tmp;
                } else {
                    currentData.html = this.tmp1;
                }
                currentData.html = currentData.html.replace("HREF1", this.image_display.url1.trim()||"javascript:void(0)").replace("IMG1", this.image_display.img1).replace("HREF2", this.image_display.url2.trim()||"javascript:void(0)").replace("IMG2", this.image_display.img2).replace("HREF3", this.image_display.url3.trim()||"javascript:void(0)").replace("IMG3", this.image_display.img3);
                console.log(currentData)
                currentData.data = this.image_display;
                this.updateMode(currentData);
            },
            handleChangeDisplay(value) {
                var currentData = this.designCurrentData;
                //TODO 替换参数
                
                if (value == "1") {
                    currentData.html = this.tmp;    
                } else {
                    currentData.html = this.tmp1;
                }

                if (this.image_display.url1) {
                    currentData.html = currentData.html.replace("HREF1", this.image_display.url1.trim()||"javascript:void(0)").replace("IMG1", this.image_display.img1).replace("HREF2", this.image_display.url2.trim()||"javascript:void(0)").replace("IMG2", this.image_display.img2).replace("HREF3", this.image_display.url3.trim()||"javascript:void(0)").replace("IMG3", this.image_display.img3);
                }
                this.image_display.ui_type = value
                currentData.data = this.image_display;
                this.updateMode(currentData);
            }
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data) {
                this.image_display = this.designCurrentData.data;
                this.fileListFirst = [{
                    name:"",
                    url: this.image_display.img1
                }];
                this.fileListSecond = [{
                    name:"",
                    url: this.image_display.img2
                }];
                this.fileListThird = [{
                    name:"",
                    url: this.image_display.img3
                }];
            } else {
                this.image_display = {
                    img: "",
                    url: "",
                    ui_type: "1",
                    url1: GlobalConfig.mifgUrl,
                    url2: GlobalConfig.mifgUrl,
                    url3: GlobalConfig.mifgUrl,
                    img1: "",
                    img2: "",
                    img3: "",
                }
            }
        }
    }
</script>
