<template>
  <div class="entertheshop">
    <!-- 内容 -->
    <van-cell
      @click="goHttp"
      icon="shop-collect-o"
      :title="datas.shopName"
      is-link
      :value="datas.copywriting"
    />

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'entertheshop',
  props: {
    datas: Object,
  },
  methods: {
    goHttp() {
      if (this.datas.type === '10') {
        if (!this.datas.http.id) return
        let orgId = window.localStorage.getItem('shopTemplateId')
        this.$router.push({
          path: '/shop',
          query: { id: this.datas.http.id, orgId: orgId },
        })
      } else if (this.datas.type === '11') {
        window.location.href = this.datas.http.externalLink
      }
    },
  },
}
</script>

<style scoped lang="less">
.entertheshop {
  position: relative;
}
</style>
