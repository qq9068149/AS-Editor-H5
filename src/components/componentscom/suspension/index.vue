<template>
  <div id="suspension" @click="goHttp(datas)">
    <drag></drag>
    <!-- <div class="suspension-wrap" @click="goHttp(datas)">
      <img
        class="suspension-logo"
        src="https://imgs.starfirelink.com/vue-fire-start-h5/shop-peison/icon_back_36.png"
      />
    </div> -->
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
  width: 36px;
  height: 36px;
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