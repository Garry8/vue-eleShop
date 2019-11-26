<template>
  <div class="logCon" v-cloak>
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
                  type="text"
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
  background: url("../assets/img/bgc-1.png");
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  // position: relative;

  .bgc {
    border-radius: 6px;
    box-shadow: 2px 2px 10px #dedede;
  }

  .usico {
    width: 38px;
    height: 38px;
    position: absolute;
  }
  .testMain {
    width: 66%;
    display: flex;
    margin: 0 auto;
    padding-top: 12%;
    // justify-content: space-between;
  }

  .testLeft {
    flex: 1;
    .pone {
      font-size: 46px;
      font-weight: 800;
      margin-bottom: 20px;
      color: #61649f;
    }

    .ptwo {
      font-size: 30px;
      font-weight: 500;
    }

    .boLine {
      width: 60px;
      height: 6px;
      border-radius: 10px;
      background-color: #333;
      margin-top: 26%;
    }
  }

  .testRight {
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
</style>
