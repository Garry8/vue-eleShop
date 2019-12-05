<template>
  <div class="userMainText">
    <!-- 面包导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <!-- <el-card shadow="hover"> -->
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
    </el-row>

    <!-- 用户列表区域 -->
    <div class="tablemenu">
      <el-card class="cardMain" shadow="hover">
        <el-table
          height="100%"
          :data="search(keywords)"
          :row-class-name="tabRowClassName"
          :cell-style="rowClass"
          :header-cell-style="headClass"
        >
          <!-- :header-cell-style="{ background: '#eef1f6', color: '#606266' }" -->
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <!-- <el-table-column label="序号" type="index" width="60"></el-table-column> -->
          <el-table-column label="用户名" prop="name"></el-table-column>
          <el-table-column label="电话" prop="phone"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="角色" prop="behavior"></el-table-column>
          <el-table-column colspan="2" label="操作" prop="linadd">
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
                  @click="showEditdia(scope.row, scope.$index)"
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
      </el-card>
    </div>

    <!-- </el-card> -->

    <!-- 添加用户的弹出框 -->
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

    <!-- 编辑用户的弹出框 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="editdialogVisible"
      width="40%"
      @close="clearEdit"
    >
      <el-form
        :model="editForm"
        :rules="editRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input
            clearable
            v-model="editForm.name"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input clearable v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input clearable v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input :disabled="true" placeholder="普通管理员"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
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
      userIndex: null,
      queryInfo: [],
      keywords: '',
      dialogVisible: false,
      editdialogVisible: false,
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
      },
      editForm: {},
      editRules: {
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
  created() {
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
          name: this.ruleForm.name,
          phone: this.ruleForm.phone,
          email: this.ruleForm.email,
          behavior: this.ruleForm.behavior
        }
        this.queryInfo.push(newUser)
        this.dialogVisible = false
      })
    },
    clearEdit() {
      this.$refs.editFormRef.resetFields()
    },
    showEditdia(item, idx) {
      // console.log(id)
      this.userIndex = idx
      this.editForm = {
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        behavior: '普通管理员'
      }
      this.editdialogVisible = !this.editdialogVisible
    },
    editUser() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        this.editdialogVisible = !this.editdialogVisible
        // 注意本地应用就要创建一个不被销毁的数据
        var succe = {
          name: this.editForm.name,
          phone: this.editForm.phone,
          email: this.editForm.email,
          behavior: this.editForm.behavior
        }
        this.queryInfo.splice(this.userIndex, 1, succe)
      })
    },
    // delUser(idx) {   // 删除方法一
    //   this.$confirm('确认删除？')
    //     // eslint-disable-next-line no-unused-vars
    //     .then(_ => {
    //       this.queryInfo.splice(idx, 1)
    //     })

    //     .catch(err => {
    //         return err
    //     })
    // },
    async delUser(idx) {
      // 删除方法二
      await this.$confirm('确认删除该条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.queryInfo.splice(idx, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 表头样式设置
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    // 表格样式设置
    rowClass() {
      return 'text-align: center;'
    },
    // 更改斑马纹颜色
    // eslint-disable-next-line no-unused-vars
    tabRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 1) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style lang="less">
.userMainText {
  height: calc(100vh - 120px);
  overflow: hidden;

  .tablemenu {
    margin-top: 10px;
    height: 90%;
  }

  // 修改表格隔行变色
  .el-table .warning-row {
    background: rgb(245, 255, 254);
  }

  // 修改表格hover颜色
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #eaf3f8;
  }

  
}
</style>
