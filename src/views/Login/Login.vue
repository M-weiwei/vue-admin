<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current':item.current}"
            v-for="(item,i) in menuTab"
            :key="i"
            @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <el-form ref="ruleForm"
               :model="ruleForm"
               status-icon
               :rules="rules"
               class="login-form"
               size='medium'>
        <el-form-item prop="username">
          <label for="">邮箱</label>
          <el-input v-model="ruleForm.username"
                    type="text"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="">密码</label>
          <el-input v-model="ruleForm.password"
                    type="password"
                    minlength="6"
                    maxlength="20"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passwords"
                      v-if="model=='register'">
          <label for="">确认密码</label>
          <el-input v-model="ruleForm.passwords"
                    type="password"
                    minlength="6"
                    maxlength="20"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label for="">验证码</label>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model.number="ruleForm.code"
                        minlength="0"
                        maxlength="6"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type='success'
                         class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     class="login-btn block"
                     @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { checkName, validateEmail, validatecode, validatePassword } from '../../utils/validate'
export default {
  data () {
    const checkAge = (rule, value, callback) => {

      if (!value) {
        callback(new Error('请输入验证码'))
      }
      else if (validatecode(value)) {
        callback(new Error('验证码是6位数字字母'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (validateEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      this.ruleForm.password = checkName(value)
      value = this.ruleForm.password
      console.log(validatePassword(value));
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePassword(value)) {
        callback(new Error("密码是6到20位+字母"))
      } else {
        callback()
      }
    }
    const validatePasswords = (rule, value, callback) => {
      this.ruleForm.password = checkName(value)
      value = this.ruleForm.password
      console.log(value);
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePassword(value)) {
        callback(new Error("密码是6到20位+字母"))
      } else if (value != this.ruleForm.password) {
        callback(new Error("两次密码不一致"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        code: '',
        passwords: ''
      },
      rules: {
        username: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }],
        passwords: [{ validator: validatePasswords, trigger: 'blur' }],
        code: [{ validator: checkAge, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  setup () {
    const menuTab = reactive([
      { text: '登录', current: true },
      { text: '注册', current: false }
    ])
    const isActive = ref(true)
    const toggleMenu = (item) => {
      menuTab.forEach((item) => {
        item.current = false
      })
      item.current = true
      if (item.text == '登录') {
        model.value = 'reg'
      } else {
        model.value = 'register'
      }
    }
    //模块值
    const model = ref('reg')
    return {
      menuTab,
      isActive,
      toggleMenu,
      model
    }
  }
}

</script>

<style lang="scss" scoped>
.login {
  background-color: #344a5e;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  label {
    display: block;
    color: #fff;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .login-btn {
    margin-top: 29px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
}
.block {
  width: 100%;
  display: block;
}
</style>