<template>
  <div class="custommodule">
    {{ datas.text }}

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'custommodule',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.custommodule {
  position: relative;
}
</style>
