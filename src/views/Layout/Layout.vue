<template>
  <div :class="[isCollapse?'close':'open']">
    <el-container>
      <el-aside width="250px">
        <LayoutNav />
      </el-aside>
      <el-container>
        <el-header>
          <LayoutHeader />
        </el-header>
        <el-main>
          <LayoutMain>
          </LayoutMain>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'
import { mapState } from 'vuex'
export default {
  setup () {


    return {}
  },
  computed: {
    ...mapState({ isCollapse: state => state.login.isCollapse })
  },
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  padding: 0;
}

.el-aside {
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  @include wevkit(transition, all 0.7s ease 0s);
}
.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main {
  box-sizing: border-box;
  background-color: #f7f7f7;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.close {
  .el-aside {
    width: 64px;
  }
}
</style>