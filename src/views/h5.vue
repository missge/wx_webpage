<template>
  <div   v-show="show" class="page-navbar">
    <div class="body-wrap" v-html="content"></div>
  </div>
</template>
<script>
var Resource = require('../util/Resource');
export default {
  name: 'app_index',
  data () {
    return {
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 1.8,
          paginationClickable: true,
          spaceBetween: 1,
          paginationBulletRender(swiper, index, className) {
            return ""
          }
        },
       content: '',
       show: false,
    }
  },
  components: {
  },
  method: {
       onSlideChangeStart (currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd (currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        }
  },
  mounted() {
     var id = this.$route.query.id||"";
     var _this = this;
     Resource.options({
          method: "get",
          resource: "album.story",
          data: {
            "id": id
          },
          success: function(data) {
              console.log(data)
              _this.content = data.story.content
              _this.head_image = data.story.head_img
          },
          error: function(data) {
                _this.$notify({
                    title: '失败',
                    message: message,
                    type: 'error'
                });
              }
      });
     this.$nextTick(function () {
        setTimeout(() => {
            this.show = true;
        },1500)

    })
  }
}
</script>
<style lang="scss" src="../assets/main.scss"></style>
