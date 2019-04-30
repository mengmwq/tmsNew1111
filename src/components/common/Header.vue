<template>
    <div class="header">
        <!-- 折叠按钮 -->

        <div class="logo"><img src="../../assets/img/中集冷云.png" alt=""></div>
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 账号设置 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`账号设置`:`账号设置`" placement="bottom">

                            <i class="el-icon-setting"></i>

                    </el-tooltip>

                </div>
              <!--   搜索-->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="search" placement="bottom">

                        <i class="el-icon-search"></i>

                    </el-tooltip>

                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img/user.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="javascript:;" target="_blank">
                            <el-dropdown-item>工号：123</el-dropdown-item>
                        </a>
                        <a href="avascript:;" target="_blank">
                            <el-dropdown-item>员工姓名：孟健康</el-dropdown-item>
                        </a>
                        <a  @click="handleAdd()">
                            <el-dropdown-item>手机号：15001015750 <i class="el-icon-mobile-phone" style="color: blue"></i></el-dropdown-item>
                        </a>
                        <a href="avascript:;" target="_blank">
                            <el-dropdown-item>所属网站：财经 </el-dropdown-item>
                        </a>
                        <a href="avascript:;" target="_blank">
                            <el-dropdown-item>部门：技术部 </el-dropdown-item>
                        </a>
                        <a href="avascript:;" target="_blank">
                            <el-dropdown-item>职位：前端开发 </el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
      <!--  绑定手机号弹框页面-->
        <el-dialog :title="title" :visible.sync="editVisible" width="25%">
            <el-form   ref="form" :model="form" label-width="0px" >
                <el-form-item>
                    <el-input  v-model="form.accout" placeholder="请输入手机号"  >
                        <el-button slot="prepend" icon="el-icon-mobile-phone"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-input  placeholder="请输入短信验证码" v-model="form.pwd" >
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                        <el-button type="button"  slot="append"  >发送验证码 </el-button>
                    </el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">

            <el-button type="primary" @click="saveEdit">ok</el-button>
          </span>
        </el-dialog>
    <!--    绑定成功页面弹框-->
        <el-dialog  :visible.sync="successDialog" width="25%">
            <div style="text-align: center">
                <h2 style="font-family: cursive">绑定成功</h2>
                <img src="../../assets/img/成功.png" alt=""  style="margin: 30px 0px">
                <p style="font-family: cursive">修改后请重新登录账户，谢谢。</p>
            </div>

        </el-dialog>
        <!--    绑定失败页面弹框-->
        <el-dialog  :visible.sync="falieDialog" width="25%">
            <div style="text-align: center">
                <h2 style="font-family: cursive">绑定失败</h2>
                <img src="../../assets/img/失败.png" alt=""  style="margin: 30px 0px">
                <p style="font-family: cursive">该手机已被绑定</p>
            </div>

        </el-dialog>
    </div>


</template>
<!-- 编辑弹出框 -->

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message:'账号设置',
                search:'搜索',
                editVisible:false,
                successDialog:false,
                falieDialog:false,
                title: "绑定手机号",
                title1:"bangding",
                form: {
                    accout: "",
                    pwd: "",

                },

            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            saveEdit(){

            },
            handleAdd() {


                this.editVisible = true;

            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 90px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: left;
    }
    ul#dropdown-menu-9624{
        min-width: 300px;
    }
</style>
