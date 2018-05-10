<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                    <el-form label-position="left" label-width="0px" class="demo-ruleForm card-box loginform"
                        v-loading="login_actions.disabled"
                        element-loading-text="正在登录..."
                        :style="formOffset"
                        :model='data'
                        :rules="rule_data"
                        ref='data'>
                        <h3 class="title">Gallery CMS 登录</h3>
                        <el-form-item
                            prop='username'>
                            <el-input type="text" auto-complete="off" placeholder="账号"
                                v-model='data.username'
                                @keyup.native.enter="login('data')"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop='password'>
                            <el-input type="password" auto-complete="off" placeholder="密码"
                                v-model='data.password'
                                @keyup.native.enter="login('data')"></el-input>
                        </el-form-item>
                        <el-checkbox style="margin:0px 0px 35px 0px;"
                            :checked='remumber'
                            v-model='remumber'>记住密码</el-checkbox>
                        <el-form-item style="width:100%;">
                            <el-button type="primary" @click='login("data")'>登录</el-button>
                            <el-button @click='resetForm("data")'>重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // import { requestLogin } from '../api/api';
    export default {
        name: 'login',
        data() {
            return {
                winSize: {
                    width: '',
                    height: ''
                },

                formOffset: {
                    position: 'absolute',
                    left: '',
                    top: ''
                },

                remumber: true,//this.$store.state.user.remumber,

                login_actions: {
                    disabled: false
                },

                data: {
                    username: '',
                    password: '',
                    // token: ''
                },

                rule_data: {
                    username: [{
                        required: true,
                        message: '用户名不能为空！',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空！',
                        trigger: 'blur'
                    }],
                }
            }
    },
    methods: {
        setSize() {
            this.winSize.width = $(window).width() + "px";
            this.winSize.height = $(window).height() + "px";

            this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
            this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
        },

        login(ref) {
            var _this = this;
            this.$router.push({ path: '/apps/webpage' });
            // this.$refs[ref].validate((valid) => {
            //     if (valid) {
            //         this.login_actions.disabled = true;
            //         var loginParams = { username: this.data.username, password: this.data.password };
            //         _this.API_UTIL.API_BASE.requestLogin(loginParams).then(data => {
            //             console.log(data)
            //             let { msg, code, user } = data;
            //             if (code !== 200) {
            //               this.$notify({
            //                   title: '错误',
            //                   message: data.data.msg,
            //                   type: 'error'
            //                 });
            //               this.login_actions.disabled = false;
            //               } else {
            //                 if (this.remumber) {
            //                     sessionStorage.setItem('user', JSON.stringify(loginParams));
            //                 }
            //                 var localUser = sessionStorage.getItem("user");
            //                 localUser = JSON.parse(localUser);
            //                 // if(localUser.username=="sunyang"){
            //                 //     this.$router.push({ path: '/apps/category' });
            //                 // }else{
            //                 this.$router.push({ path: '/apps/picture' });
            //                 // }
            //               }
            //         });
            //     }
            // });
        },

        resetForm(ref) {
            this.$refs[ref].resetFields();
        }
    },
    created() {
        this.setSize();
        $(window).resize(() => {
            this.setSize();
        });
    },
    mounted() {
        var localUser = sessionStorage.getItem("user");
        if (localUser) {
            localUser = JSON.parse(localUser);
            this.data.username = localUser.username;
            this.data.password = localUser.password;
            this.remumber = true;
        }
    }
}
</script>

<style scoped lang='less'>
    .login{
        background: #1F2D3D;

        .card-box {
            box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            margin-bottom: 20px;
            background-color: #F9FAFC;
            border: 2px solid #8492A6;
        }

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

         .loginform {
            width: 350px;
            padding: 35px 35px 15px 35px;
        }
    }
</style>
