<template>
  <div class="logCon" v-cloak>
    <div class="testMain">
      <div class="testLeft">
        <transition appear name="pone">
          <p class="pone">欢迎您</p>
        </transition>
        <transition appear name="ptwo">
          <p class="ptwo">使用智能云系统后台管理系统</p>
        </transition>
        <transition appear name="divone">
          <div class="boLine"></div>
        </transition>
      </div>

      <transition appear name="pone">
        <div class="testRight" :class="{bgc:isSee}" @mouseenter="backbgc" @mouseleave="backgone">
          <div class="testGet">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="50px"
              class="demo-ruleForm"
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
                  autocomplete="off"
                  placeholder="请填写账号"
                ></el-input>
              </el-form-item>

              <svg class="icon usico" aria-hidden="true">
                <use xlink:href="#icon-lvcheng" />
              </svg>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  placeholder="请填写密码"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="rigBut" type="text" @click="resetForm('ruleForm')">重置输入</el-button>
              </el-form-item>
              <el-form-item>
                <el-button class="putget" type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      manone: true,
      womanone: false,
      isSee: false,
      ruleForm: {
        username: '',
        pass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        username: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    backbgc () {
      this.isSee = !this.isSee
    },
    backgone () {
      this.isSee = !this.isSee
    },
    enter () {
      this.manone = !this.manone
      this.womanone = !this.womanone
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
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
  box-sizing: border-box;
  height: 100%;
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
    width: 70%;
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
      margin-top: 22%;
    }
  }

  .testRight {
    .testGet {
      width: 450px;
      margin:20px 40px 40px 20px;
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
