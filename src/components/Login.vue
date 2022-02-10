<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <transition name="slide">
              <div :class="{ show: isShowRegister }" class="register">
                <input
                    type="text"
                    v-model="register.username"
                    placeholder="用户名"
                />
                <input
                    type="password"
                    v-model="register.password"
                    placeholder="密码"
                />
                <p :class="{ error: register.isError }">
                  {{ register.notice }}
                </p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>
            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div :class="{ show: isShowLogin }" class="login">
                <input type="text" v-model="login.username" placeholder="输入用户名"/>
                <input type="password" v-model="login.password" placeholder="密码"/>
                <p :class="{ error: login.isError }">{{ login.notice }}</p>
                <div class="button" @click="onLogin">登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {ref, reactive, computed} from 'vue'
// import setLocal from '../helpers/local'

export default {
  // components:{ElButton},
  setup() {

    // store router hook
    const store = useStore()

    const router = useRouter()

    const route = useRoute()

    // data
    let isShowLogin = ref(true)

    let isShowRegister = ref(false)

    let login = reactive({
      username: '',
      password: '',
      notice: '输入用户名和密码',
      isError: false
    })

    let register = reactive({
      username: '',
      password: '',
      notice: '创建账号后，请记住用户名和密码',
      isError: false
    })

    // methods
    // const registerUser = (payload) => store.dispatch('register',...payload)

    const loginUser = (payload) => store.dispatch('login',...payload)

    const onRegister = () => {
      const {username, password} = register
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(username)) {
        register.isError = true
        register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(password)) {
        register.isError = true
        register.notice = '密码长度为6~16个字符'
        return
      }
      store.dispatch('register',{username, password})
          .then(_ => {
            login.isError = false
            login.notice = ''
            router.push({
              path: 'notebooks'
            })
          })
          .catch(data => {
            login.isError = true
            login.notice = data.msg
          })
    }

    const onLogin = () => {
      const {username, password} = login
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(username)) {
        login.isError = true
        login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(password)) {
        login.isError = true
        login.notice = '密码长度为6~16个字符'
        return
      }
      store.dispatch('login',{username, password})
          .then(data => {
            login.isError = false
            login.notice = ''
            router.push({
              path: 'notebooks'
            })
          })
          .catch(data => {
            login.isError = true
            login.notice = data.msg
          })
    }

    const showLogin = () => {
      isShowLogin.value = true
      isShowRegister.value = false
    }

    const showRegister = () => {
      isShowLogin.value = false
      isShowRegister.value = true
    }

    return {
      isShowRegister,
      isShowLogin,
      showLogin,
      showRegister,
      login,
      register,
      onLogin,
      onRegister,
    }
  }
  /*
methods: {
...mapActions({
loginUser: 'login',
registerUser: 'register'
}),
}
   */
}

</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
    background-size: contain;
  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    //overflow: hidden;

    h3 {
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

    .login,
    .register {
      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height 0.4s;

      &.show {
        height: 193px;
      }

      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }

      input:focus {
        border: 3px solid #9dcaf8;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }
}
</style>
