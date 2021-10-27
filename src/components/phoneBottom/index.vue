<template>
  <div class="phoneBottom">
    <p class="ft-links" v-if="datas.isShowBootom">
      <span @click="goHome">店铺主页</span>
      <span @click="goMine">个人中心</span>
      <!-- <span @click="$router.push({ path: '/' })">关注我们</span> -->
      <!-- <span>店铺信息</span> -->
    </p>
  </div>
</template>

<script>
export default {
  name: 'phoneBottom',
  props: {
    datas: String|Object,
  },
  created() {},
  methods: {
    goHome() {
      let orgId = window.localStorage.getItem('shopTemplateId')
      console.log(orgId, '---------------orgId')
      if (orgId) {
        this.$router.push({ path: '/shop', query: { orgId: orgId } })
      } else {
        localStorage.setItem('shopTemplateId', this.$route.query.orgId)
        let shopId = this.$route.query.orgId
        // let shopId = window.global_config.orgId //20200518 生产模板id修改
        this.$router.push({ path: '/shop', query: { orgId: shopId } })
      }
      // let shopId = this.$route.query.orgId
      // // let shopId = window.global_config.orgId //20200518 生产模板id修改
      // this.$router.push({ path: '/shop', query: { orgId: shopId } })
    },
    goMine() {
      window.location.href = 'https://app.starfirelink.com/#/mine'
    },
  },
  watch: {
    datas: function () {
      this.$store.commit('put_bottomLogo', this.datas)
      console.log(this.$store.state.bottomLogo,'-------------this.bottomLogo')
    },
  },
}
</script>

<style scoped lang="less">
.phoneBottom {
  width: 100%;
  background-color: #fff;
  min-height: 145px;
  cursor: pointer;
  position: relative;
  padding-top: 30px;
  box-sizing: border-box;
  .ft-links {
    text-align: center;
    padding: 0px 15px 10px;
    span {
      padding: 0 6px;
      color: #666;
      font-size: 12px;
      border-right: 1px solid #e5e5e5;
      &:last-of-type {
        border-right: 0;
      }
    }
  }

  .yinjia {
    color: #bfbfc3;
    text-align: center;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
}
</style>
