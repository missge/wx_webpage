<template>
<div>
  <VueUEditor @ready="editorReady" :ueditorConfig="editorConfig"></VueUEditor>
</div>
</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex'
    import VueUEditor from 'vue-ueditor'
    import GlobalConfig from '../../GlobalConfig'
    var album_url = GlobalConfig.base + "/rest/album/api/pictures/";
    var Resource = require('../../util/Resource');
    export default {
        components : {VueUEditor},
        data() {
            return {
                dialogPictureListVisible:false,
                dialogVisible: false,
                dialogImageUrl: "",
                editorConfig:{
                    albumIds:"",
                    serverUrl: album_url,
                    imageUrl: "/rest/account/api/upload/",
                    imagePath: '',
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
                    editorInstance: "",
                },
                tmp:'<div style="width:100%">content</div>'
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
            editorReady(editorInstance) {
                this.editorInstance = editorInstance;
                this.editorInstance.setContent(this.designCurrentData.html)
                this.editorInstance.addListener("contentChange", () => {
                    var data = this.designCurrentData;
                    data.html =  this.tmp.replace("content",editorInstance.getContent());
                    this.updateMode(data)
                    // this.story.content = editorInstance.getContent();
                    // this.editorInstance.options.serverUrl = this.editorConfig.serverUrl;
                    // this.editorInstance.options.albumIds = this.editorConfig.albumIds;
                    // var cacheParams = {
                    //     updated: true,
                    //     key: "content"
                    // }
                    // sessionStorage.setItem('story_updated', JSON.stringify(cacheParams));
                    // sessionStorage.setItem('story_content', this.story.content);
                })

              },
        },
        mounted() {

        }
    }
</script>
