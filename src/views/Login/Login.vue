<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current':item.current}"
            v-for="(item,i) in menuTab"
            :key="i"
            @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <el-form ref="ruleForms"
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
                         class="block"
                         @click="getSms()"
                         :disabled='codeButtonStatus.status'>{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     :disabled='loginButton'
                     class="login-btn block"
                     @click="submitForm('ruleForm')">{{model=='login'?'登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { checkName, validateEmail, validatecode, validatePassword } from '../../utils/validate'
import { GetSms, Register, Login } from '@/api/login'
import {
  setToken, userNmae
} from '@/utils/app'
export default {
  setup (prop, context) {

    //切换登录注册配置
    const menuTab = reactive([
      { text: '登录', current: true, type: 'login' },
      { text: '注册', current: false, type: 'register' }
    ])
    const isActive = ref(true)
    //绑定ref数据
    const ruleForms = ref(null)
    //切换状态
    const toggleMenu = (item) => {
      menuTab.forEach((item) => {
        item.current = false
      })
      item.current = true
      model.value = item.type
      resetFields()
      clearCountDown()
    }
    //清除表单数据
    const resetFields = () => {
      //切换是重置表单
      ruleForms._rawValue.resetFields()
    }
    /**
     * 更新按钮状态
     */
    const updateButtonStatus = params => {
      codeButtonStatus.status = params.status
      codeButtonStatus.text = params.text
    }
    //    定义判断登录按钮是否禁用
    const loginButton = ref(true)
    //记录倒计时
    const timer = ref(null)
    //验证码发送状态
    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码'
    })
    //模块值
    const model = ref('login')
    //配置验证规则
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
      console.log(validateEmail(value));
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (validateEmail(value)) {
        callback(new Error('邮箱格式不正确'))
        return false
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      ruleForm.password = checkName(value)
      value = ruleForm.password
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
      ruleForm.passwords = checkName(value)
      value = ruleForm.passwords
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePassword(value)) {
        callback(new Error("密码是6到20位+字母"))
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码不一致"))
      } else {
        callback()
      }
    }
    //配置登录注册参数
    const ruleForm = reactive({
      username: '',
      password: '',
      code: '',
      passwords: ''
    })
    //配置验证参数
    const rules = reactive({
      username: [{ validator: validatePass, trigger: 'blur' }],
      password: [{ validator: validatePass2, trigger: 'blur' }],
      passwords: [{ validator: validatePasswords, trigger: 'blur' }],
      code: [{ validator: checkAge, trigger: 'blur' }],
    })

    //提交数据
    const { proxy } = getCurrentInstance()
    /**
     * 提交表单
     */
    const submitForm = () => {

      ruleForms.value.validate((valid) => {
        //表单验证通过
        if (valid) {
          //判断当前是登录还是注册
          model.value === 'login' ? login() : register()

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    /**
     * 登录请求
     */
    const login = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      Login(data).then(response => {
        console.log(response);
        proxy.$message({
          message: response.data.message,
          type: 'success'
        })
        proxy.$store.commit('login/Set_token', response.data.data.token)
        proxy.$store.commit('login/Set_userName', response.data.data.username)
        setToken(response.data.data.token)
        userNmae(response.data.data.username)
        proxy.$router.push('/console')
      }).catch(erroe => { })
    }
    /**
     * 注册请求
     */
    const register = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      //注册请求
      Register(data).then(response => {
        const { data } = response
        proxy.$message({
          message: data.message,
          type: 'success'
        })
        toggleMenu(menuTab[0])
        clearCountDown()
      }).catch(error => {

      })
    }
    /**
     * 定义倒计时方法
     */
    const countDown = number => {
      if (timer.value) clearInterval(timer.value)

      timer.value = setInterval(() => {
        number--
        if (number === 0) {
          clearInterval(timer.value)
          updateButtonStatus({ status: false, text: '再次获取' })

        } else {
          codeButtonStatus.text = `倒计时${number}秒`
        }
      }, 1000)
    }
    /**
     * 获取验证码
     */
    const getSms = () => {
      if (ruleForm.username === '') {
        proxy.$message.error('请输入邮箱')
        return false
      }
      updateButtonStatus({ status: true, text: '已发送' })
      GetSms({ 'username': ruleForm.username, module: model.value }).then(response => {
        let { data } = response
        proxy.$message({
          message: '发送验证码成功',
          type: 'success'
        })
        console.log(data);
        //发送成功后登录按钮启动
        loginButton.value = false
        countDown(60)
      })
    }
    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      updateButtonStatus({ status: false, text: '获取验证码' })
      clearInterval(timer.value)
    }

    return {
      menuTab,
      isActive,
      toggleMenu,
      model,
      ruleForm,
      rules,
      ruleForms,
      submitForm,
      getSms,
      loginButton,
      codeButtonStatus
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
.el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>