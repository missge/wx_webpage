<template>
<div>
  <div style="height : 1000px;width : 500px; display:inline-block;float:left;">
      <Phone msg="story"></Phone>
  </div>
  <div  style="height : auto;width : 500px; display:inline-block;float:left;">
     <el-form label-position="left"  ref="story" :model="story" label-width="100px"  style="margin:30px;width:80%;min-width:600px;" border>
        <el-form-item label="标题" prop="title">
            <el-input v-model="story.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="story.status" placeholder="请选择状态">
                <el-option
                  v-for="item in data.status"
                  :label="item.value"
                  :value="item.key"
                  :key="item.key">
                </el-option>
            </el-select>
        </el-form-item> -->
       <!--  <el-form-item label="分类" prop="categories">
            <el-checkbox-group v-model="story.categories">
                <el-checkbox v-for="filter in categories" :label="filter.id" :key="filter.id">{{filter.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="内容" prop="content">
           <VueUEditor @ready="editorReady" :ueditorConfig="editorConfig"></VueUEditor>  
        </el-form-item>
        <!-- <el-form-item label="标签" prop="tags">
          <el-select
              v-model="story.tags"
              multiple
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="getTags"
              :loading="loading">
              <el-option
                v-for="item in tags"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item> -->
<!--         <el-form-item label="图片" prop="images">
             <storyWall></storyWall>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('story')">发布</el-button>
        </el-form-item>
    </el-form>
    </div>  
    <div id="id4" style="clear:both"></div>   
</div>
</template>

<script>
import VueUEditor from 'vue-ueditor'
import GlobalConfig from '../GlobalConfig'
import { mapState, mapActions } from 'vuex'
import Phone from "./phone"
var Resource = require('../util/Resource');
export default {
  name: 'cp',
  components : {
      VueUEditor,
      Phone
  },
  data () {
    console.log(GlobalConfig.uploadImageUri)
    return {
      //msg: 'Welcome to Your Vue.js App',
      submitVisible: false,
      id:'',
      story: {
          title: '',
          status: '',
          categories: [],
          content: ""
      },
      editorConfig:{
          serverUrl: "http://localhost:8008/rest/album/api/pictures/",
          imageUrl: "/rest/account/api/upload/",
          imagePath: 'dfgsg',
          imageManagerUrlPrefix:"",
          imageActionName:  GlobalConfig.uploadImageUri,
          imageFieldName: "upfile",
          imageMaxSize: 2048000,
          imageAllowFiles: [
                ".jpg",
                ".jpeg",
          ],
          imageCompressEnable: true,
          imageCompressBorder: 1600,
          imageInsertAlign: "none",
          imageUrlPrefix: "",
          wordCount:true,
          toolbars: [[
          'fullscreen', 'source', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|','insertimage', 'pagebreak', 'template', '|',
          'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          // 'print', 'preview', 'searchreplace', 'drafts', 'help'
        ]],
      }
    }
  },
  methods: {
    ...mapActions({
        setPhoneContent: 'setPhoneContent',
    }),
    editorReady(editorInstance) {
        editorInstance.addListener("contentChange", () => {
          console.log(editorInstance.getContent())
          // this.setPhoneContent(editorInstance.getContent())
          this.story.content = editorInstance.getContent();
          sessionStorage.setItem('story_updated', true);
          sessionStorage.setItem('story', this.story.content);
        })
    },
    onSubmit(anme) {
        var method = "put";
        if (this.id) {  
          method = "post";
        }
        var data = this.story;
        console.log(this.story,"<<<<<<<<<")
        var _this = this;
        Resource.options({
          method: method,
          resource: "album.story",
          data: data,
          success: function(data) {
              _this.listLoading = false;
             
              _this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success'
              });
          },
          error: function(data) {
                _this.listLoading = false;
                var message = '添加标签失败，请联系相关研发～';
                if (data.data && data.data.errmsg) {
                    message = data.data.errmsg
                }
                NProgress.done();
                _this.$notify({
                    title: '失败',
                    message: message,
                    type: 'error'
                });
              }
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id||"";
    sessionStorage.setItem('story_updated', true);
    sessionStorage.setItem('story', "")
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
