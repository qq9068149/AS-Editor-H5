<template>
  <div class="tabBar">
    <div v-if="datas.iconList.length !== 0" class="tabbar">
      <!-- <div class=""></div> -->
      <van-tabbar
        v-model="Active"
        :border="datas.isShowBorder"
        :active-color="datas.activeColor"
        :inactive-color="datas.inactiveColor"
        @change="changeTab"
        replace="true"
      >
        <van-tabbar-item
          v-for="(item, index) in datas.iconList"
          :key="index"
          :name="item.iconName"
          :icon="item.iconPic"
          :dot="item.isDot"
          >{{ item.iconText }}</van-tabbar-item
        >
      </van-tabbar>
    </div>

    <div v-else>
      <van-tabbar
        v-model="active"
        :border="datas.isShowBorder"
        :active-color="datas.activeColor"
        :inactive-color="datas.inactiveColor"
        @change="changeTab"
      >
        <van-tabbar-item icon="search" dot name="home">标签</van-tabbar-item>
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  inject: ['productJump'],
  props: {
    datas: Object,
  },
  data() {
    return {
      active: this.datas.Highlight,
    }
  },

  created() {
    console.log(this.datas, '--------------tabbar data')
  },

  mounted() {},

  methods: {
    changeTab(index) {
      if (this.datas.iconList.length !== 0) {
        console.log(this.datas.iconList[index], '-----------changeTab datas')
        this.productJump(this.datas.iconList[index])
      }
    },
  },

  computed: {
    Active() {
      return this.datas.Highlight
    },
  },

  watch: {},
}
</script>

<style lang="less" scoped>
.tabBar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.tabbar {
  /deep/ .van-icon {
    width: 25px;
    height: 25px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

/deep/ .van-tabbar {
  box-shadow: 0px 20px 25px 5px rgba(0, 0, 0);
  .van-tabbar-item__icon {
    margin-bottom: 4px;
  }
  .van-tabbar-item__text {
    font-size: 12px;
    line-height: 1;
  }
}
</style>
