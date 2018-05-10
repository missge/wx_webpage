import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login.vue'
// import PictureList from '@/views/album/PictureList'
// import AlbumList from '@/views/album/AlbumList'
// import CategoryList from '@/views/category/CategoryList'
// import CPList from '@/views/cp/CPList'
// import VendorList from '@/views/vendor/VendorList'
// import DailyRecommendList from '@/views/daily_recommend/DailyRecommendList'
// import EditDailyRecommend from '@/views/daily_recommend/EditDailyRecommend'
// import ForceRecommendList from '@/views/force_recommend/ForceRecommendList'
// import EditForceRecommend from '@/views/force_recommend/EditForceRecommend'
// import ForceOfflineList from '@/views/force_offline/ForceOfflineList'
// import EditForceOffline from '@/views/force_offline/EditForceOffline'
// import BrandList from '@/views/brand/BrandList'
// import BannerList from '@/views/banner/BannerList'
// import EditPicture from '@/views/album/EditPicture'
// import LatestTopic from '@/views/latest_topic/LatestTopic'
// import ShoppingCart from '@/views/shopping_cart/ShoppingCart'
// import EditAlbum from '@/views/album/EditAlbum'
// import Index from '@/views/index'
import AppIndex from '@/views/AppIndex'
// import Tag from '@/views/tag/TagList'
// import CPUserList from '@/views/cp/CPUserList'
// import AlbumCheck from '@/views/cp_album/AlbumCheck'
// import CPEditAlbum from '@/views/cp_album/EditAlbum'
import Hello from '@/views/Hello.vue'
import Phone from '@/views/phone.vue'
import H5 from '@/views/h5.vue'
import WebpageList from '@/views/webpage/WebpageList.vue'
import EditWebpage from '@/views/webpage/EditWebpage.vue'
// import OldEditWebpage from '@/views/webpage/OldEditWebpage.vue'
import Test from '@/views/Test.vue'
// import MiECommerce from '@/views/mi_ecommerce/MiECommerce.vue'


Vue.use(Router)

const Router1 = new Router({
  routes:
  [
     {
      path: '/test',
      name: 'test',
      component: Test,
      hidden: true
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/phone',
      name: 'phone',
      component: Phone,
      hidden: true
    },
    {
      path: '/story',
      name: 'story',
      component: H5,
      hidden: true
    },
    {
      path: '/app_index',
      name: 'AppIndex',
      component: AppIndex,
      hidden: true
    },
    {
      path: '/apps',
      name: '运营',
      iconCls: 'fa fa-database',
      component: Home,
      children:
        [
          { path: 'webpage', component: WebpageList, name: '合集' },
          { path: 'edit_webpage', component: EditWebpage, name: '编辑合集', hidden: true },
        ],
    },
   
  ]
});
export default Router1;



