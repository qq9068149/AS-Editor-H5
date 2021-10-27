<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
      productJump: this.productJump
    }
  },
  data() {
    return {
      isRouterAlive: true,
      transitionName: '',
      path: ['personalCourse'],
      userpop: true //第一次授权
    }
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    productJump(res) {
      console.log(res, '----------------productJump')
      // 判断用户是否有绑手机号
      let phone = window.localStorage.getItem('phone')
      let orgId = localStorage.getItem('shopTemplateId')
      window.localStorage.setItem('jump', JSON.stringify(res))
      if (phone == 0) {
        this.$router.push({
          path: '/investigation'
        })
      }
      if (res.http) {
        if (res.http.id || res.http.externalLink) {
          switch (res.linktype) {
            case '1': // 视频
              this.$router.push({
                path: `/videoOnDemand?videoId=${res.http.videoId}&vid=${res.http.id}`
              })
              break
            case '2': // 书籍
              this.$router.push({
                path: `/videoOnDemand?bookId=${res.http.id}`
              })
              break
            case '3': // 音频
              this.$router.push({
                path: `/videoOnDemand?videoId=${res.http.videoId}&type=3&vid=${res.http.id}`
              })
              break
            case '6': // 直播
              this.$router.push({
                name: 'mobileLive',
                query: { roomId: res.http.id }
              })
              break
            case '7': // 实物商品
              this.$router.push({
                name: 'shopdetails',
                query: { id: res.http.id }
              })
              break
            case '10': // 跳转至历史页面
              this.$router.push({
                path: '/shop',
                query: { id: res.http.id, orgId: orgId }
              })
              break
            case '11': // 外链
              window.location.href = res.http.externalLink
              break
          }
        }
      } else {
        if (res.type && res.id) {
          switch (res.type) {
            case 1: // 视频
              this.$router.push({
                path: `/videoOnDemand?videoId=${res.videoId}&vid=${res.id}`
              })
              break
            case 2: // 书籍
              this.$router.push({ path: `/videoOnDemand?bookId=${res.id}` })
              break
            case 3: // 音频
              this.$router.push({
                path: `/videoOnDemand?videoId=${res.videoId}&type=3&vid=${res.id}`
              })
              break
            case 6: // 直播
              this.$router.push({
                name: 'mobileLive',
                query: { roomId: res.id }
              })
              break
            case 7: // 实物商品
              this.$router.push({
                name: 'shopdetails',
                query: { id: res.id }
              })
              break
            case 10: // 跳转至历史页面
              this.$router.push({
                path: '/shop',
                query: { id: res.id, orgId: orgId }
              })
              break
            case 11: // 外链
              window.location.href = res.externalLink
              break
          }
        }
      }
    }
  }
}
</script>
<style lang="less">
p {
  margin: 0;
  padding: 0;
}
</style>
