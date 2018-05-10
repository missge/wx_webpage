<template>
<div style="padding:20px">
  <el-form label-position="left"  ref="image_display" :model="image_display" label-width="100px"   border>
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
    var tmp = '<div style="display: inline-block;margin-bottom: 5px"><div style="margin-left: 10px;overflow:hidden;width:46%;float:left;display:inline;"><a href="HREF1"><img style="display:block;height:100%;width:100%" src="IMG1" onerror="onerror=null;src=\'error_img\'" /></a></div><div style="width:45.9%;float:right;display:inline;    margin-right: 3%;"><a href="HREF2"><img style="display:block;width:100%;" src="IMG2" onerror="onerror=null;src=\'error_img\'" /></a></div></div>'.replace(/error_img/g, error_img);

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
                    url1: GlobalConfig.mifgUrl,
                    url2: GlobalConfig.mifgUrl,
                    img1: "",
                    img2: "",
                },
                fileListFirst: [],
                fileListSecond: [],
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
            onSubmit(formname){
                var currentData = this.designCurrentData;
                currentData.html = this.tmp;
                
                currentData.html = currentData.html.replace("HREF1", this.image_display.url1.trim()||"javascript:void(0)").replace("IMG1", this.image_display.img1).replace("HREF2", this.image_display.url2.trim()||"javascript:void(0)").replace("IMG2", this.image_display.img2);
                console.log(currentData)
                currentData.data = this.image_display;
                this.updateMode(currentData);
            },
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
            } else {
                this.image_display = {
                    url1: GlobalConfig.mifgUrl,
                    url2: GlobalConfig.mifgUrl,
                    img1: "",
                    img2: "",
                }
            }
        }
    }
</script>
