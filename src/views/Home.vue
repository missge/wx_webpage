<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="4" class="logo">
                <img src="../assets/logo4.png" /> <span>Gallery<i class="txt">ADMIN</i></span>
            </el-col>
            <el-col :span="2">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="14">
                <el-menu  class="el-menu-vertical-demo" theme="dark" mode="horizontal" @select="handleMainSelect">
                    <el-menu-item index="1">手机</el-menu-item>
                    <!-- <el-menu-item index="2">电视</el-menu-item> -->
                    <el-menu-item index="3">笔记本</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
                     theme="dark" unique-opened router v-show="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="checkRouter(item)">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden" :key="child.path">
                                <i :class="child.iconCls"></i>
                            {{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                </el-menu>

                    <!--导航菜单-折叠后-->
                    <ul class="el-menu--dark el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed" >
                        <li v-for="(item,index) in $router.options.routes" v-if="checkRouter(item)" class="el-submenu item">
                            <template v-if="!item.leaf">
                                <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                                <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                                    <li v-for="child in item.children" v-if="!child.hidden" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                                </ul>
                            </template>
                            <template v-else>
                                <li class="el-submenu">
                                    <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                                </li>
                            </template>
                        </li>
                    </ul>
            </aside>
            <section class="content-container" ref="contentContainer">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched"  key="item.name">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition>
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    // import { requestLogout } from '../api/api';
    export default {
        data() {
            return {
                sysUserName: '',
                sysUserAvatar: '',
                collapsed:false,
                current_app:'apps',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },

            handleMainSelect: function(val) {
                console.log(">>>handleMainSelect",val)
                if (val == "1") {
                    this.current_app = "apps";

                } else if (val == "2") {
                    this.current_app = "mitv";
                } else {
                    this.current_app = "minotebook"
                }
                this.$router.push('/'+this.current_app);
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');

                    _this.API_UTIL.API_BASE.requestLogout().then(data => {
                        _this.$router.push('/');
                    });

                }).catch(() => {

                });
            },
            //折叠导航栏
            collapse:function(){
                this.collapsed=!this.collapsed;
                console.log(this.$refs.contentContainer)
                if (this.collapsed == true){
                    this.$refs.contentContainer.style.left="60px";
                } else {
                    this.$refs.contentContainer.style.left="230px";
                }

            },
            showMenu(i,status){
                console.log(">><<<<<333")
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';

            },
            checkRouter(item) {
                var path = "/"+this.current_app;
                if (!item.hidden && item.path == path) {
                    return true
                }
                return false
            },
        },
        mounted() {
            console.log(this.$route);
            var path = this.$route.path;
            this.current_app = this.$route.path.split("/")[1];
            console.log(this.current_app,"<><><><>",this.$route.path.split("/"))
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.username || '';
                this.sysUserAvatar = user.avatar || '';
            }
        }
    }

</script>

<style scoped lang="scss">
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #1F2D3D;
            color: #c0ccda;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                .userinfo-inner {
                    color: #c0ccda;
                    cursor: pointer;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                font-size: 22px;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #20a0ff
                }
            }

            .el-menu {
                background-color: #1F2D3D;
            }
        }
        .main {
            background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex:0 0 200px;
                width: 200px;
                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu{
                    height: 100%;
                }
                .collapsed{
                    width:60px;
                    .item{
                        position: relative;
                    }
                    .submenu{
                        position:absolute;
                        top:0px;
                        left:60px;
                        z-index:99999;
                        height:auto;
                        display:none;
                    }

                }

            }
            .menu-collapsed{
                flex:0 0 60px;
                width: 60px;
            }
            .menu-expanded{
                flex:0 0 230px;
                width: 230px;
            }
            .menu-expanded .el-menu--dark{
                width: 230px!important;
            }
            .content-container {
                background: #f1f2f7;
                position: absolute;
                right: 0px;
                top: 0px;
                bottom: 0px;
                left: 230px;
                overflow-y: scroll;
                padding: 20px;
                .breadcrumb-container {
                    margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
