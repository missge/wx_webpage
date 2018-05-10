<template>
<div>
  <el-form label-position="left"  ref="multi_image" :model="multi_image" label-width="100px"   border>
            <el-form-item label="背景图">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessBackGroundImage"
                  :data="upload_type"
                  :file-list="backgroundImageFileList"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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
                <el-input v-model="multi_image.url1"></el-input>
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
                <el-input v-model="multi_image.url2"></el-input>
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
                <el-input v-model="multi_image.url3"></el-input>
            </el-form-item>

            <el-form-item label="图片-4">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessFour"
                  :data="upload_type"
                  :file-list="fileListFour"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- 图片预览弹窗 -->
              <!-- <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
            </el-form-item>

            <el-form-item label="链接地址-4" prop="url">
                <el-input v-model="multi_image.url4"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('multi_image')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex'
    import GlobalConfig from '../../GlobalConfig'
    var Resource = require('../../util/Resource');
    var error_img = "http://wallpaper.cdn.pandora.xiaomi.com/thumbnail/webp/w512/MiTv/0bdab55084ff3433126f2aff3e847eda79130a0f9";

    var tmp = '<ul style="padding-left: 0px; width: 100%zheight: 100%; margin-top: 0px; margin-bottom: 0px;"><li style="position:relative;list-style-type:none;width:100%;background: url(BG_IMG) no-repeat;background-size: contain;background-repeat: no-repeat;width: 100%;height: 0;padding-top: 100%;"><div class="divOne" style="position: absolute;width: 89%;left: 5.2%;top: 10%;"><a href="HREF1" style=""><img src="IMG1" width="100%" alt=""/></a><div style="width: 100%;margin-top: 7px;"><a href="HREF2" style=""><img style="width:31.3%; height:31.3%;" src="IMG2"/></a><a href="HREF3" style="margin-left: 8px;"><img style="width:31.3%; height:31.3%;" src="IMG3"/></a><a href="HREF4" style="margin-left: 8px;"><img style="width:31.3%; height:31.3%;" src="IMG4"/></a></div></div></li>';
  
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
                multi_image: {
                    bg_img: "",
                    url1: "",
                    url2: "",
                    url3: "",
                    url4: "",
                    img1: "",
                    img2: "",
                    img3: "",
                    img4: ""
                },
                backgroundImageFileList:[],
                fileListFirst: [],
                fileListSecond: [],
                fileListThird: [],
                fileListFour: [],
                tmp: tmp,
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
            handleSuccessBackGroundImage(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.multi_image.bg_img = response.data.url;
                    this.backgroundImageFileList = [{
                        name:"",
                        url: this.multi_image.bg_img
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.multi_image.bg_img = "";
                }
            },
            handleSuccessFirst(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.multi_image.img1 = response.data.url;
                    this.fileListFirst = [{
                        name:"",
                        url: this.multi_image.img1
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.multi_image.img1 = "";
                }
            },
            handleSuccessSecond(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.multi_image.img2 = response.data.url;
                    this.fileListSecond = [{
                        name:"",
                        url: this.multi_image.img2
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.multi_image.img2 = "";
                }
            },
            handleSuccessThird(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.multi_image.img3 = response.data.url;
                    this.fileListThird = [{
                        name:"",
                        url: this.multi_image.img3
                    }]
                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.multi_image.img3 = "";
                }
            },
            handleSuccessFour(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.multi_image.img4 = response.data.url;
                    this.fileListFour = [{
                        name:"",
                        url: this.multi_image.img4
                    }]
                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.multi_image.img4 = "";
                }
            },
            onSubmit(formname){
                var currentData = this.designCurrentData;
                currentData.html = this.tmp;
                
                currentData.html = currentData.html.replace("HREF1", this.multi_image.url1.trim()||"javascript:void(0)").replace("IMG1", this.multi_image.img1).replace("HREF2", this.multi_image.url2.trim()||"javascript:void(0)").replace("IMG2", this.multi_image.img2).replace("HREF3", this.multi_image.url3.trim()||"javascript:void(0)").replace("IMG3", this.multi_image.img3).replace("IMG4", this.multi_image.img4).replace("HREF4", this.multi_image.url4.trim()||"javascript:void(0)").replace("BG_IMG", this.multi_image.bg_img);
                currentData.data = this.multi_image;
                this.updateMode(currentData);
            },
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data) {
                this.multi_image = this.designCurrentData.data;
                this.backgroundImageFileList = [{
                    name: "",
                    url: this.multi_image.bg_img
                }];
                this.fileListFirst = [{
                    name:"",
                    url: this.multi_image.img1
                }];
                this.fileListSecond = [{
                    name:"",
                    url: this.multi_image.img2
                }];
                this.fileListThird = [{
                    name:"",
                    url: this.multi_image.img3
                }];
                this.fileListFour = [{
                    name:"",
                    url: this.multi_image.img4
                }];
            } else {
                this.multi_image = {
                    img: "",
                    url: "",
                    ui_type: "1",
                    url1: GlobalConfig.mifgUrl,
                    url2: GlobalConfig.mifgUrl,
                    url3: GlobalConfig.mifgUrl,
                    url4: GlobalConfig.mifgUrl,
                    img1: "",
                    img2: "",
                    img3: "",
                    img4: ""
                }
            }
        }
    }
</script>
