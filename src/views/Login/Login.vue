<template>
  <div class="login">
    <el-button plain>Plain</el-button>
    <el-button type="primary"
               plain>Primary</el-button>
    <el-button type="success"
               plain>Success</el-button>
    <el-button type="info"
               plain>Info</el-button>
    <el-button type="warning"
               plain>Warning</el-button>
    <el-button type="danger"
               plain>Danger</el-button>
  </div>
</template>

<script>
export default {
  setup () {


    return {}
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-color: #344a5e;
  height: 100vh;
}
</style>