<template>
  <div
    @click="
      $router.push({
        path: '/search',
        query: {
          hotords: JSON.stringify(datas.hotords),
          isShowSweep: JSON.stringify(datas.sweep),
        },
      })
    "
    class="commoditysearch"
    :style="{
      background: datas.backgroundColor,
      border: `1px solid ${datas.backgroundColor}`,
    }"
  >
    <!-- 搜索框 -->
    <section
      class="searchs"
      :style="{
        height: datas.heights + 'px',
        'justify-content': datas.textPosition === 0 ? 'left' : 'center',
        background: datas.borderColor,
        'border-radius': datas.borderRadius === 0 ? '0px' : '10px',
      }"
    >
      <van-icon name="search" size="16" :style="{ color: datas.textColor }" />
      <span :style="{ color: datas.textColor }">搜索商品</span>
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'commoditysearch',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.commoditysearch {
  position: relative;
  /* 搜索框 */
  .searchs {
    width: 345px;
    min-height: 28px;
    margin: 5px auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    i {
      margin: 0 5px;
    }
  }
}
</style>
