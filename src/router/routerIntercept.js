/**
 * 路由拦截配置
 */
import router from '@/router/index.js'
import store from '@/store/index'
import CONST from '@/utils/CONST'

let whiteList = CONST.WHITELIST          // 请求白名单

router.beforeEach((to, from, next) => {

  /* 登录拦截结合自己项目需求 */
  if (whiteList.indexOf(to.name) !== -1) {
    // 在免费登录白名单中，直接进入
    next()
  } else {
    // 没有访问权限的其他页将重定向到登录页。
    // next(`/login`)
    next()
  }

  
})
  