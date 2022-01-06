<template>
  <!-- 标题 -->
  <div>
    <div
      class="headerTop"
      style="position: fixed"
      :style="{
        height: name.titleHeight + 'px'
      }"
    >
      <!-- 左半部分 -->
      <div @click="pushHome" class="lef" v-if="name.isBack">
        <van-icon name="arrow-left" />
      </div>
      <!-- 标题 -->
      <div
        class="header-title"
        :style="{
          height: name.titleHeight + 'px',
          'line-height': name.titleHeight + 'px'
        }"
      >
        {{ name.name ? name.name : '' }}
      </div>
      <div
        class="rig"
        @click="
          $router.push({ name: name.urlname ? name.urlname : 'personal' })
        "
        v-if="name.isPerson"
      >
        <span v-html="name.subhead ? name.subhead : '个人中心'"></span>
      </div>
    </div>
    <div :style="{
        height: name.titleHeight + 'px'
      }"></div>
  </div>
</template>

<script>
export default {
  name: 'headerTop',
  props: {
    name: Object
  },
  data() {
    return {
      fanhui: true //返回按钮是否显示
    }
  },

  created() {
    // if(!localStorage.getItem('shopHomeId')) return this.fanhui = false
    // const id = localStorage.getItem('shopHomeId')
    // if(this.$route.query.id == id) this.fanhui = false
    console.log(this.name, '--------name')
  },
  methods: {
    /* 跳转视频播放页面 */
    push() {
      this.$router.push({ name: 'personal' })
    },
    // 跳转首页
    pushHome() {
      console.log(
        this.$route,
        'this.$route.query.isonthis.$route.query.isonthis.$route.query.isonthis.$route.query.ison'
      )
      if (this.$route.query.isonmini) {
        let orgId = window.localStorage.getItem('shopTemplateId')
        this.$router.push({ path: '/shop', query: { orgId } })
      } else if (window.history.length > 1) {
        this.$router.go(-1)
      } else if (window.location.hash.indexOf('#/shop') <= -1) {
        console.log('当前页面不是首页，并且为最后1个页面')
        let shopId = window.localStorage.getItem('shopTemplateId')
        this.$router.push({ path: '/shop', query: { orgId: shopId } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/minx.less';
/* 导航 */
.headerTop {
  height: 35px;
  width: 375px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  margin-left: -18px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f7f8fa;
  position: relative;
  z-index: 10;
  /* 左边 */
  .lef {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    /* 图标 */

    span {
      color: #000;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .header-title {
    width: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    color: #333333;
  }
  /* 右边 */
  .rig {
    // display: flex;
    // align-items: center;
    // height: 100%;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    /* 搜索图标 */
    i {
      font-size: 18px;
      margin: 0 7px 5px;
    }

    /* 文字 */
    span {
      margin: 0 7px;
      font-size: 12px;
    }
  }
}
</style>
