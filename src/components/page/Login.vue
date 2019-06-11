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

                            <el-checkbox v-model="checked" >记住密码</el-checkbox>
                            <a style="font-size: 12px;text-decoration: none; position: absolute;right: 0;">忘记密码？</a>
                        </div>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm()"  @keyup.enter="submitForm">登录</el-button>
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
                checked:true,
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

        mounted() {
            this.getCookie();
        },
        methods: {
            submitForm() {
               if(this.checked == true){
                   console.log("checked == true");
                   //传入账号名，密码，和保存天数3个参数
                   this.setCookie(this.ruleForm.username, this.ruleForm.password, 7);
               }else {
                   console.log("清空Cookie");
                   //清空Cookie
                   this.clearCookie();
               }
                this.$axios.post( this.URL_API + "zhanghaining/tms/public/index.php/login/login",{
                    UserName: this.ruleForm.username,
                    PassWord: this.ruleForm.password
                }) .then(res => {
                    if(res.data.code == 200) {
                        window.sessionStorage.setItem("username", this.ruleForm.username);
                        window.sessionStorage.setItem("Company", res.data.data.Company);
                        window.sessionStorage.setItem("Mobile", res.data.data.Mobile);
                        window.sessionStorage.setItem("Operate", res.data.data.Operate);
                        window.sessionStorage.setItem("IsDel", res.data.data.IsDel);
                        window.sessionStorage.setItem("TrueName",res.data.data.TrueName)

                       this.$router.push({ path: "/" });

                    }else{
                        this.$message.error(res.data.message);
                        return false

                    }
                })

            },
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
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