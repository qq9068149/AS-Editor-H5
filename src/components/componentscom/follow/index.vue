<template>
  <div id="follow">
    <div class="follow-box">
      <div class="follow-pic">
        <img :src="datas.heade" alt="" />
      </div>
      <div class="follow-info">
        <span>{{ datas.followName }}</span>
      </div>
      <div class="follow-right">
        <van-button color="#07C160" @click="follow">关注公众号</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'follow',
  props: {
    datas: Object,
  },
  data() {
    return {}
  },

  created() {},

  mounted() {},

  methods: {
    // 关注公众号
    follow() {
      let appIdEncode = window.btoa('3882442286')
      console.log(appIdEncode, '-------app encode')
      // __biz=后面的字符串，替换成自己公众号的字符串就可以了 Mzk0MjE5NTU0Ng==  
      // https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg4MjQ0MjI4Ng==&scene=110#wechat_redirect
      // let url = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${appIdEncode}#wechat_redirect`
      let url = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzk0MjE5NTU0Ng==#wechat_redirect`
      console.log(url, '-----------url')
      location.href = url
    },
  },

  computed: {},

  watch: {},
}
</script>

<style lang="less" scoped>
#follow {
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  .follow-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    .follow-pic {
      width: 50px;
      height: 50px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .follow-info {
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
