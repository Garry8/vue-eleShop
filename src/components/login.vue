<template>
  <div class="logCon" v-cloak>
    <div class="header">
      <div class="inner-header flex"></div>

      <div>
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>

    <div class="testMain">
      <div class="testLeft">
        <transition appear name="pone">
          <p class="pone">欢迎您</p>
        </transition>
        <transition appear name="ptwo">
          <p class="ptwo">使用智能云平台后台管理系统</p>
        </transition>
        <transition appear name="divone">
          <div class="boLine"></div>
        </transition>
      </div>

      <transition appear name="pone">
        <div
          class="testRight"
          :class="{ bgc: isSee }"
          @mouseenter="backbgc"
          @mouseleave="backgone"
        >
          <div class="testGet">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="50px"
            >
              <div @mouseenter="enter">
                <svg class="icon usico" aria-hidden="true" v-show="manone">
                  <use xlink:href="#icon-jana" />
                </svg>
                <svg class="icon usico" aria-hidden="true" v-show="womanone">
                  <use xlink:href="#icon-Jess" />
                </svg>
              </div>
              <el-form-item prop="username">
                <el-input
                  type="username"
                  v-model="ruleForm.username"
                  placeholder="请填写账号"
                ></el-input>
              </el-form-item>

              <svg class="icon usico" aria-hidden="true">
                <use xlink:href="#icon-lvcheng" />
              </svg>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  placeholder="请填写密码"
                  @keyup.enter.native="submitForm()"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  class="rigBut"
                  size="mini"
                  round
                  @click="resetForm('ruleForm')"
                  >重置输入</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button class="putget" type="primary" @click="submitForm()"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: '',
      manone: true,
      womanone: false,
      isSee: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    backbgc() {
      this.isSee = !this.isSee
    },
    backgone() {
      this.isSee = !this.isSee
    },
    enter() {
      this.manone = !this.manone
      this.womanone = !this.womanone
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(async valid => {
    //     if (valid) {
    //       //发起请求,await后面的一串代码返回的是一个promise,就用await解析,前面定义的是只拿data属性,并用res记录
    //       // async是await的环境,用来修饰异步方法
    //       const { data: res } = await this.$http.post('https://api.apiopen.top/getJoke?page=1&count=2&type=video', this.ruleForm)
    //       if (res.status !== 200) {
    //         return this.$message.error('登陆失败')
    //       } else {
    //         this.$message.success('登陆成功')
    //         window.sessionStorage.setItem('token',res.token)
    //         this.$router.push('/home')
    //       }
    //     }
    //   })
    // },
    getUserList() {
      this.$http
        .get('http://localhost:8080/eleVue/userServlet')
        .then(result => {
          if (result.status === 200) {
            this.userList = result.data
          } else {
            return this.$message.error('获取数据失败')
          }
          // eslint-disable-next-line no-unused-vars
        })
    },
    submitForm() {
      var name = this.ruleForm.username
      var passward = this.ruleForm.password
      if (
        name == this.userList[0].username &&
        passward == this.userList[0].passward
      ) {
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('tokeid', this.userList[0].tokeid)
        this.$router.push('/home')
      } else {
        return this.$message.error('登陆失败')
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
[v-cloak] {
  display: none;
}
.logCon {
  // background-color: #f1f1f1;
  //   background: url("../assets/img/bgc-1.png");
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  // position: relative;

  .bgc {
    border-radius: 6px;
    box-shadow: 2px 1px 8px rgba(74, 125, 155, 0.3);
  }

  .usico {
    width: 38px;
    height: 38px;
    position: absolute;
  }
  .testMain {
    width: 66%;
    display: flex;
    padding: 2% 0;
    position: absolute;
    top: 16%;
    left: 20%;
    background-color: rgba(252, 252, 252, 0.1);
    border-radius: 10px;
    // justify-content: space-between;
  }

  .testLeft {
    padding-left: 5%;
    flex: 1;
    .pone {
      font-size: 46px;
      font-weight: 800;
      margin-bottom: 20px;
      color: #fff;
    }

    .ptwo {
      font-size: 30px;
      font-weight: 500;
      color: #fff;
    }

    .boLine {
      width: 60px;
      height: 6px;
      border-radius: 10px;
      background-color: rgb(238, 238, 238);
      margin-top: 26%;
    }
  }

  .testRight {
    margin-right: 2%;
    .testGet {
      width: 450px;
      margin: 20px 40px 40px 20px;
      padding: 20px;
    }

    .rigBut {
      float: right;
    }
    .putget {
      width: 100%;
    }
  }

  // 定义动画
  .pone-enter {
    opacity: 0;
    transform: translateY(100px);
  }

  .pone-enter-active {
    transition: all 1s ease;
  }

  .ptwo-enter {
    opacity: 0;
    transform: translateY(140px);
  }

  .ptwo-enter-active {
    transition: all 1.2s ease;
  }

  .divone-enter {
    opacity: 0;
    transform: translateY(120px);
  }

  .divone-enter-active {
    transition: all 1.6s ease;
  }
}

// 参照的波浪样式
body {
  margin: 0;
}

.header {
  position: relative;
  text-align: center;
  background: linear-gradient(
    70deg,
    rgba(76, 207, 247, 0.945) 0%,
    rgb(0, 159, 180) 100%
  );
  color: white;
}

.inner-header {
  height: 84vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
