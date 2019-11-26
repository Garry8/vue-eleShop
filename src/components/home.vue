<template>
  <el-container class="homeCon">
    <el-header class="headerCon" height="80px">
      <div>
        <h2 class="tith">智能云管理平台</h2>
      </div>
      <el-button type="danger" @click="exit" round>退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          background-color="#c3d2db"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
        >
          <el-submenu :index="item.id +''" v-for="item in meauList" :key="item.id">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="1" >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>选项一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      meauList: ''
    }
  },
  mounted() {
    this.getMainMeau()
  },
  methods: {
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getMainMeau() {
      this.$http
        .get('http://localhost:8080/eleVue/mainmeauServlet')
        .then(result => {
          if (result.status === 200) {
            this.meauList = result.data
            console.log(this.meauList)
          } else {
            return this.$message.error('获取数据失败')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.homeCon {
  height: 100%;
}
.headerCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tith {
  color: #fff;
  letter-spacing: 2px;
}
.el-header {
  background-color: rgb(145, 196, 193);
}
.el-aside {
  background-color: #c3d2db;
}
.el-main {
  background-color: #f3f3f3;
}
</style>
