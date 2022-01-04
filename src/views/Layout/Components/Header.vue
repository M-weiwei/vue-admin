<template>
  <div id="header-wrap">
    <div class="pull-left">
      <i class="iconfont icon-caidan"
         @click="navMenuState"></i>
    </div>
    <div class="pull-right">
      <div class="user-info">
        <img src="https://s3.ax1x.com/2020/11/19/DurmrT.jpg"
             alt="">
        <span> {{username}}</span>
      </div>
      <el-popconfirm confirm-button-text="确定"
                     cancel-button-text="取消"
                     icon-color="red"
                     title="您确定要退出吗?"
                     @confirm='exitlogin'>
        <template #reference>
          <i class="iconfont icon-tuichu"></i>
        </template>
      </el-popconfirm>

    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const navMenuState = () => {
      console.log(1);
      proxy.$store.commit('login/Set_isCollapse')
    }
    const username = computed(() => proxy.$store.state.login.userName)
    //退出事假
    const exitlogin = () => {
      proxy.$store.dispatch('login/exit').then(() => {
        proxy.$router.push('/login')
      })
    }
    return {
      navMenuState,
      username,
      exitlogin
    }
  }
}
</script>

<style lang="scss" scoped>
#header-wrap {
  //   position: fixed;
  //   top: 0;
  //   right: 0;
  //   left: 250px;
  //   height: 75px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  i {
    font-size: 25px;
    cursor: pointer;
  }
  .pull-left {
  }
  .pull-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .user-info {
      border-right: 1px solid #ededed;
      height: 100%;
      padding: 0 32px;
      display: flex;
      align-items: center;
      margin-right: 32px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50px;
        margin-right: 20px;
      }
    }
  }
}
</style>