import {ref, reactive, computed, defineComponent, Transition} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import style from '../assets/css-module/login.module.css'

export default defineComponent(() => {
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
    isError: false,
  })

  let register = reactive({
    username: '',
    password: '',
    notice: '创建账号后，请记住用户名和密码',
    isError: false,
  })

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
    store
      .dispatch('register', {username, password})
      .then((_) => {
        login.isError = false
        login.notice = ''
        return router.push({
          path: 'notebooks',
        })
      })
      .catch((data) => {
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
    store
      .dispatch('login', {username, password})
      .then((data) => {
        login.isError = false
        login.notice = ''
        return router.push({
          path: 'notebooks',
        })
      })
      .catch((data) => {
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

  return () => {
    return (
      <div id="login">
        <div className={style['modal-mask']}>
          <div className={style['modal-wrapper']}>
            <div className={style['modal-container']}>
              <div className={style.main}/>
              <div className={style.form}>
                <h3 className={style.h3} onClick={showRegister}> 创建账户 </h3>
                <Transition name="slide">
                  <div className={[style.register, isShowRegister.value ? style.show : ''].join(' ')}>
                    <input className={style.input} type="text" vModel={register.username} placeholder="用户名"/>
                    <input className={style.input} type="password" vModel={register.password} placeholder="密码"/>
                    <p className={[style.p, register.isError ? style.error : '']}> {register.notice} </p>
                    <div className={style.button} onClick={onRegister}>创建账号</div>
                  </div>
                </Transition>


                <h3 className={style.h3} onClick={ showLogin }>登录</h3>
                <Transition name="slide">
                  <div className={[style.login, isShowLogin.value ? style.show : ''].join(' ')}>
                    <input className={style.input} type="text" vModel={ login.username } placeholder="输入用户名"/>
                    <input className={style.input} type="password" vModel={ login.password } placeholder="密码"/>
                    <p className={[style.p, login.isError ? style.error : '']}>{login.notice}</p>
                    <div className={style.button} onClick={onLogin}>登录</div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
