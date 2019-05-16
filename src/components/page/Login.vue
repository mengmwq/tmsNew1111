<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-row :gutter="24" style="display: flex;height: 500px;align-items: center;margin: 0">
                <el-col :span="13" style="padding: 0">
                    <div>
                        <img src="../../assets/img/loginLeft.png" alt="" style="background-size: 100%">
                    </div>
                </el-col>
                <el-col :span="10" style="padding: 0">
                    <div style="text-align: center">
                        <img src="../../assets/img/login2.png" alt="">
                    </div>

                    <el-form :model="ruleForm" :rules="rules" label-width="0px" class="ms-content">
                        <el-form-item prop="username">
                            <el-input v-model="ruleForm.username" placeholder="username">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm()">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>

                        <div class="part" style="height: 30px;line-height: 30px;position: relative;margin:25px 0px">
                            <input  type="checkbox" value="" id="remember" />
                            <span style="    font-size: 12px;position: absolute;left: 20px;top: 0;">记住登录状态</span>
                            <a style="font-size: 12px;text-decoration: none; position: absolute;right: 0;">忘记密码？</a>
                        </div>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm()">登录</el-button>
                        </div>

                    </el-form>
                </el-col>
            </el-row>


        </div>
    </div>


</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',

                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {

                this.$axios.post( this.URL_API + "zhanghaining/tms/public/index.php/index/login",{
                    UserName: this.ruleForm.username,
                    PassWord: this.ruleForm.password
                }) .then(res => {
                    if(res.data.code == 200) {
                        window.sessionStorage.setItem("username", this.ruleForm.username);

                        this.$router.push({ path: "/" });

                    }else{
                        this.$message.error(res.data.message);
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login.jpg);
        background-size: 100%;
        display: flex;
        padding-top: 180px;
        justify-content: center;/*水平居中*/

    }

    /* .ms-title{
         width:100%;
         line-height: 50px;
         text-align: center;
         font-size:20px;
         color: #fff;
         border-bottom: 1px solid #ddd;
     }*/
    .ms-login{
        width: 1200px;
        height: 500px;
        align-items: center;
        border-radius: 8px;
        background: #fff;
        overflow: hidden;

    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>