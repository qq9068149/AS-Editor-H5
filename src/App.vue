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
    }
  },
  data() {
    return {
      isRouterAlive: true,
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
  }
}
</script>
<style lang="less">
p {
  margin: 0;
  padding: 0;
}
</style>
