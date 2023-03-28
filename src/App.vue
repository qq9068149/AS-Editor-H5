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
      isRouterAlive: true
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
    // 跳转事件
    productJump(res) {
      if (res.http) {
        switch (res.linktype) {
          case '10': // 内部链接
            this.$router.push({
              path: res.http.externalLink
            })
            break
          case '11': // 外部链接
            window.location.href = res.http.externalLink
            break
        }
      }
    }
  },
  mounted() {
    // 判断是否为移动端
    if (
      !navigator.userAgent.match(
        /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
      )
    ) {
      // pc端的宽度显示设为375px
      let html = document.querySelector('html')
      html.style = 'font-size: 37.5px;width: 375px; margin: 0 auto;'
      window.onresize = () => {
        html.style = 'font-size: 37.5px;width: 375px; margin: 0 auto;'
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
