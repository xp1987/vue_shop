<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input  v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 登录表单数据绑定对象
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        // 表单验证规则
        loginFormRules: {
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"},
            {min: 2, max: 10, message: "长度在2到10个字符之间", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入登录密码", trigger: "blur"},
            {min: 6, max: 15, message: "长度为6-15个字符", trigger: "blur"}
          ]
        }
      }    
    },

    methods: {
      // 重置登录用户数据
      resetLoginForm() {
        // console.log(this)
        this.$refs.loginFormRef.resetFields()
      },

      login() {
        this.$refs.loginFormRef.validate( async (valid) => {
          // console.log(valid)
          if(!valid) return;
          const {data: res} = await this.$http.post('login', this.loginForm);
          // console.log(this);
          if(res.meta.status !== 200) return this.$message.error('login error');
          this.$message.success('login success');

          // 将登陆成功后的 token 保存到客户端的 sessionStorage
          //    将项目中除了登录之外的其他API接口， 必须在登录后才能访问
          //    token 只应在当前网站打开期间生效， 所以将 token 保存在sessionStorage 中
          // console.log(res)
          window.sessionStorage.setItem('token', res.data.token)
          //  通过编程式导航跳转到后台主页， 路由地址是 /home
          this.$router.push('/home')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #111;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>