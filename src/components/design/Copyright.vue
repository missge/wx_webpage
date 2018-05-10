<template>
<div>
  <el-form label-position="left"  ref="copyright" :model="copyright" label-width="100px"  style="margin:30px;width:80%;min-width:600px;" border>
         <el-form-item label="文字" prop="text">
            <el-input v-model="copyright.text"></el-input>
        </el-form-item>
         <el-form-item label="字体大小" prop="font_size">
            <el-input-number :min="10" v-model="copyright.font_size"></el-input-number>
        </el-form-item>
        <el-form-item label="上边距" prop="margin">
            <el-input-number :min="0" v-model="copyright.margin"></el-input-number>
        </el-form-item>
        <el-form-item label="字体颜色" prop="color">
           <!--  <el-input v-model="copyright.color"></el-input> -->
            <sketch-picker :value="copyright.color" @input="updateValue"></sketch-picker>
        </el-form-item>
        
        
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('copyright')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { Sketch } from 'vue-color'
    import { mapState, mapActions,mapGetters } from 'vuex'
    import GlobalConfig from '../../GlobalConfig'
    var Resource = require('../../util/Resource');
    export default {
        components : {
                // 'compact-picker': compact,
                // 'swatches-picker': swatches,
                // 'slider-picker': slider,
                'sketch-picker': Sketch,
                //'chrome-picker': Photoshop,
                // 'photoshop-picker': photoshop
        },
        data() {
            return {
                submitVisible: false,
                copyright: {
                    color: "#FFF",
                    text: "www.mi.com",
                    font_size: 15,
                    margin: 28
                },
                tmp: '<div style="height:100px;text-align: center;"><div style="margin-top:MARGIN%"><span style="font-family:fzyh-bz;color:COLOR;font-size:FONTSIZEpx">TEXT</span></div></div>',
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
            updateValue(value){
                this.copyright.color = value.hex;
            },
            onSubmit(formname){
                var currentData = this.designCurrentData;
                currentData.html = this.tmp;

                currentData.html = currentData.html.replace("TEXT", this.copyright.text||"").replace("COLOR", this.copyright.color).replace("FONTSIZE", this.copyright.font_size).replace("MARGIN", this.copyright.margin);
                currentData.data = this.copyright;
                this.updateMode(currentData)
            },
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data) {
                this.copyright = this.designCurrentData.data;
            } else {
                this.copyright = {
                    color: "#FFF",
                    text: "www.mi.com",
                    font_size: 15,
                    margin:28
                }
            }
        }
    }
</script>
