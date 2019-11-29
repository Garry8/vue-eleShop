<template>
  <div>
    <!-- 面包导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card shadow="hover">
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索姓名关键字" v-model="keywords" clearable>
            <!-- <el-button
              slot="append"
              icon="el-icon-search"
              @click="search(keywords)"
            ></el-button> -->
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>

        <!-- 用户列表区域 -->
        <div class="tablemenu">
          <el-table :data="search(keywords)" border stripe>
            <el-table-column label="序号" width="60">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column label="用户名" prop="name"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="角色" prop="behavior"></el-table-column>
            <el-table-column label="操作" prop="linadd">
              <template slot-scope="scope">
                <el-tooltip
                  effect="dark"
                  content="编辑"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circlefalse
                    @click="editUser(scope.row, scope.$index)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  effect="dark"
                  content="删除"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    type="danger"
                    @click="delUser(scope.$index)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页区域 -->
      </el-row>
    </el-card>

    <!-- 添加的弹出框 -->
    <el-dialog
      title="添加用户信息"
      :visible.sync="dialogVisible"
      width="40%"
      @close="clearAll"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input clearable v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input clearable v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input clearable v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input
            :disabled="true"
            placeholder="普通管理员"
            v-model="ruleForm.behavior"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //   验证邮箱
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的邮箱'))
    }
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^1[345678]\d{9}$/
      if (regPhone.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的手机号码'))
    }
    return {
      queryInfo: [],
      keywords: '',
      dialogVisible: false,
      ruleForm: {
        name: '',
        phone: '',
        email: '',
        behavior: '普通管理员'
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getMenu()
  },
  methods: {
    async getMenu() {
      await this.$http
        .get('http://localhost:8080/eleVue/hmenuServlet')
        .then(result => {
          if (result.status === 200) {
            this.queryInfo = result.data
            console.log(this.queryInfo)
          } else {
            return this.$message.error('获取数据失败')
          }
        })
    },
    search(keywords) {
      return this.queryInfo.filter(item => {
        if (item.name && item.name.includes(keywords)) {
          return item
        }
      })
    },
    clearAll() {
      this.$refs.ruleFormRef.resetFields()
    },
    addUser() {
      this.$refs.ruleFormRef.validate(valid => {
        //   console.log(valid)
        if (!valid) return
        //  标准的逻辑是当填完所有信息后需要向后台发送post请求,然后在后台去处理相关代码储存到数据库中的逻辑
        // 下面是push到get请求的表中
        var newUser = {
            'name': this.ruleForm.name,
            'phone': this.ruleForm.phone,
            'email': this.ruleForm.email,
            'behavior':this.ruleForm.behavior,
          }
        this.queryInfo.push(newUser)
        this.dialogVisible = false
        console.log(this.queryInfo)
        

        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tablemenu {
  margin-top: 52px;
}
</style>
