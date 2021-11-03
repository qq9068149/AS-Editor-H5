<template>
  <div id="suspension" @click="goHttp(datas)">
    <drag></drag>
  </div>
</template>
<script>
import drag from './drag'
export default {
  name: 'suspension',
  props: {
    datas: Object,
  },
  components: {
    drag,
  },
  data() {
    return {}
  },

  created() {
    console.log(this.datas, '--------------suspension data')
  },
  mounted() {
    this.moveDiv = this.$refs.moveDiv
    console.log(this.moveDiv, '--------------moveDiv data')
  },
  methods: {
    goHttp(res) {
      console.log(this.moveDiv, '--------------moveDiv data')
    },
  },
}
</script>
<style lang="less" scoped>
#suspension {
  border: none;
  box-sizing: border-box;
  .suspension-wrap {
    width: 36px;
    height: 36px;
    .suspension-logo {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
}
</style>