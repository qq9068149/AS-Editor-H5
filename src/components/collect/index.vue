<template>
  <div class="collect">
    <div
      :class="isCoollect ? 'collected' : 'coollect'"
      id="coollect"
      @click="coolectchange"
    >
      {{ isCoollect ? '已收藏' : '收藏店铺' }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCoollect: false, // 是否收藏
      tip: '失败',
      show: false,
    }
  },

  created() {
    this.queryCollection()
  },

  methods: {
    // 查看店铺是否收藏
    queryCollection() {
      let params = {
        orgId: this.$route.query.orgId,
      }
      console.log(params, '-------collect')
      this.$httpApi.queryCollection(params).then((res) => {
        if (res.data.code === 500005) {
          this.isCoollect = true
        } else if (res.data.code === 500006) {
          this.isCoollect = false
        }
      })
    },
    //添加收藏
    addCollection() {
      let params = {
        orgId: this.$route.query.orgId,
      }
      // console.log(params)
      // if(params === undefined) return this.$toast("未登录，无法收藏")
      this.$httpApi.addCollection(params).then((res) => {
        //判断请求是否成功
        if (res.code != 0) return this.$toast(res.msg)
        //判断请求返回数据
        if (res.data.code === 500000) {
          this.isCoollect = !this.isCoollect
          this.$toast(res.data.msg)
        } else if (res.data.code === 500001 || res.data.code === 500002) {
          this.$toast(res.data.msg)
        }
      })
    },
    //已收藏
    delCollection() {
      let params = {
        orgId: this.$route.query.orgId,
      }
      this.$httpApi.delCollection(params).then((res) => {
        //判断请求是否成功
        if (res.code != 0) return this.$toast(res.msg)
        //判断请求返回数据
        if (res.data.code === 500003) {
          this.isCoollect = !this.isCoollect
          this.$toast(res.data.msg)
        } else if (res.data.code === 500004 || res.data.code === 500008) {
          this.$toast(res.data.msg)
        }
      })
    },
    //根据是否收藏添加或取消收藏
    coolectchange() {
      if (this.isCoollect) {
        this.delCollection()
      } else {
        this.addCollection()
      }
    },
  },
}
</script>

<style lang="less" scoped>
#coollect {
  width: 50px;
  height: 20px;
  border-radius: 10px;
  font-size: 11px;
  line-height: 20px;
  color: #fff;
  text-align: center;
}
.coollect {
  background: linear-gradient(#ff552d, #ff0000);
  padding: 0 4px;
}
.collected {
  border: 1px solid #fff;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0 2px;
}
.tooltip {
  position: fixed;
  padding: 2px 14px;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  background-color: rgba(19, 18, 18, 0.5);
  color: #ffffff;
  font-weight: bold;
  border-radius: 4px;
}
</style>
