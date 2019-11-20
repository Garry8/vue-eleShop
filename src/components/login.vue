<template>
  <div class="logCon" v-cloak>
    <div class="testMain">
      <div class="testLeft">
        <transition appear name="pone">
          <p class="pone">欢迎您</p>
        </transition>
        <transition appear name="ptwo">
          <p class="ptwo">使用智能后台管理系统</p>
        </transition>
        <transition appear name="divone">
          <div class="boLine"></div>
        </transition>
      </div>

      <transition appear name="pone">
        <div class="testRight">
          <div class="testGet">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="50px"
              class="demo-ruleForm"
            >
              <svg class="icon usico" aria-hidden="true">
                <use xlink:href="#icon-jana" />
              </svg>
              <el-form-item prop="username">
                <el-input
                  prefix-icon="el-icon-search"
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
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  background-color: #f1f1f1;
  height: 100%;
  // position: relative;

  .usico {
    width: 38px;
    height: 38px;
    position: absolute;
  }
  .testMain {
    width: 60%;
    display: flex;
    margin: 0 auto;
    padding-top: 10%;
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
      font-size: 32px;
      font-weight: 500;
    }

    .boLine {
      width: 60px;
      height: 6px;
      border-radius: 10px;
      background-color: #333;
      margin-top: 30%;
    }
  }

  .testRight {
    .testGet {
      width: 400px;
      margin: 10px;
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
