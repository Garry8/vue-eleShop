<template>
  <el-container class="homeCon">
    <!-- 头部区域 -->
    <el-header class="headerCon" height="80px">
      <div>
        <h2 class="tith">智能云管理平台</h2>
      </div>

    <!-- 退出按钮 -->
      <div class="exitCls">
        <el-button type="danger" class="exCut" @click="visible = !visible" round
          >退出</el-button
        >
        <div class="showPale" v-show="visible">
          <p>
            确定退出吗？
            <el-button size="mini" type="text" @click="visible = false"
              >取消</el-button
            >
            <el-button type="danger" size="mini" @click="exit">确定</el-button>
          </p>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧树 -->
      <el-tooltip
        class="item"
        effect="dark"
        content="切换"
        placement="top-start"
      >
        <div class="togg" @click="toggPale">|||</div>
      </el-tooltip>
      <el-aside :width="pflag ? '65px' : '200px'">
        <el-menu
          :default-active="acPath"
          background-color="#EAEAEA"
          text-color="#666"
          active-text-color="#CD580A"
          unique-opened
          :collapse="pflag"
          :collapse-transition="false"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in meauList"
            :key="item.id"
          >
            <!-- 一级菜单 -->
            <template slot="title">
              <i :class="iconmain[item.id]"></i>
              <span>{{ item.title }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.submain"
              :key="subItem.id"
              @click="savePath(subItem.path)"
            >
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>{{ subItem.ename }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧可视区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      meauList: [],
      linList: [],
      pflag: false,
      visible: false,
      acPath: '',
      iconmain: {
        '1': 'iconfont icon-lianxiren',
        '2': 'iconfont icon-yingyong',
        '3': 'iconfont icon-youjian',
        '4': 'iconfont icon-caogaoxiang',
        '5': 'iconfont icon-xiaoxi'
      }
    }
  },
  created() {
    this.getMainMeau(), (this.acPath = window.sessionStorage.getItem('acPath'))
  },
  beforeUpdate() {
    this.putsub()
  },
  methods: {
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getMainMeau() {
      // 谁放在前的问题
      this.$http.get('http://localhost:8080/eleVue/linServlet').then(result => {
        if (result.status === 200) {
          this.linList = result.data
          //   console.log(this.linList)
        } else {
          return this.$message.error('获取数据失败')
        }
        this.$http
          .get('http://localhost:8080/eleVue/mainmeauServlet')
          .then(result => {
            if (result.status === 200) {
              this.meauList = result.data
              //   console.log(this.meauList)
            } else {
              return this.$message.error('获取数据失败')
            }
          })
      })
    },
    putsub() {
      var map = {}
      this.meauList.forEach(v => {
        v.submain = []
        map[v.mid] = v
      })
      this.linList.forEach(v => {
        map[v.submid].submain.push(v)
      })
      //   console.log(this.meauList)
    },
    toggPale() {
      this.pflag = !this.pflag
    },
    savePath(acPath) {
      window.sessionStorage.setItem('acPath', acPath)
      this.acPath = acPath
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
  background-color: #554d63;
}
.togg {
  position: absolute;
  bottom: 15px;
  right: 0;
  left: 20px;
  letter-spacing: 2px;
  width: 20px;
  cursor: pointer;
}
.el-aside {
  background-color: #eaeaea;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #f3f3f3;
}
.iconfont {
  margin: 0 8px 0 2px;
}
.el-submenu .el-menu-item span {
  padding-left: 12px;
}
.exitCls .el-popover .el-popper {
  position: relative;
  right: 0;
  top: 0;
}
.exCut {
  margin-right: 20px;
}
.showPale {
  background-color: #fff;
  width: 220px;
  position: absolute;
  right: 120px;
  top: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  p {
    font-size: 14px;
    margin: 16px;
  }
}
</style>
