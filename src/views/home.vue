<template>
  <div class="shop">
    <section class="phoneAll" ref="imageTofile" id="imageTofile">
      <!-- 导航 -->
      <headerTop class="containwe-padding" :name="pageSetup" />
      <!-- 收藏组件 -->
      <div class="collect" v-if="orgid">
        <collect></collect>
      </div>
      <!-- 动态组件 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <section
          class="phone-container"
          :style="{
            'background-color': pageSetup.bgColor,
            backgroundImage: 'url(' + pageSetup.bgImg + ')'
          }"
        >
          <div v-for="(item, index) in pageComponents" :key="index">
            <keep-alive :include="item.component">
              <component
                :key="index"
                :is="item.component"
                :datas="item.setStyle"
                class="componentsClass"
                :data-type="item.type"
                @clickBanner="clickBanner"
              />
            </keep-alive>
          </div>
        </section>
      </van-pull-refresh>
    </section>
  </div>
</template>

<script>
import headerTop from 'components/headerTop'
import collect from 'components/collect'

import {
  captiontext,
  placementarea,
  pictureads,
  graphicnavigation,
  richtext,
  magiccube,
  auxiliarysegmentation,
  commoditysearch,
  storeinformation,
  entertheshop,
  notice,
  videoss,
  custommodule,
  communitypowder,
  storenotecard,
  crowdoperation,
  personalizedrecommendation,
  onlineservice,
  listswitching,
  investigate,
  tabBar,
  follow,
  suspension
} from 'components/componentscom'
export default {
  name: 'shop',
  inject: ['reload'],
  data() {
    return {
      isLoading: false,
      orgid: false,
      pageComponents: [],
      pageSetup: {
        // 页面设置属性
        name: '页面标题', //页面名称
        details: '', //页面描述
        isPerson: false, // 是否显示个人中心
        isBack: true, // 是否返回按钮
        titleHeight: 35, // 高度
        bgColor: 'rgba(249, 249, 249, 10)', //背景颜色
        bgImg: '' // 背景图片
      },
      tota: null
    }
  },
  activated() {
    //不能使用其他方式设置滚动条高度，否则回导致下拉刷新失效
    setTimeout(() => {
      window.scroll(0, this.$store.state.scroll)
    }, 500)
  },
  async created() {
    // 是否是iframe使用
    if (this.$route.query.type === 'iframe') {
      window.addEventListener('message', e => {
        console.log(e.data, '-------------message')
        let datas = e.data
        this.pageComponents = JSON.parse(datas.component)
        this.pageSetup = JSON.parse(datas.templateJson)
      })
      return
    }

    await this.loadShopData()
    let miniprogram = window.localStorage.getItem('miniprogram')
    console.log(miniprogram, '-------------------miniprogram')
  },
  mounted() {},
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },

    async loadShopData() {
      try {
        if (this.$route.query.orgId) {
          localStorage.setItem('shopTemplateId', this.$route.query.orgId)
        }

        this.tota = this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
          loadingType: 'spinner',
          overlay: true
        })
        this.orgid = false
        //  模板数据替换 shopTemplateData.data.shopTemplate 此处可替换成接口
        let shopTemplateData = {
          code: 0,
          success: true,
          error: false /*  */,
          data: {
            shopTemplate: {
              id: null,
              name: 'home',
              templateJson:
                '{"name":"home","details":"","bgColor":"rgba(249, 249, 249, 10)","bottomLogo":{"isShowBootom":false,"botLogo":""},"isPerson":false,"isBack":true,"titleHeight":35,"bgImg":""}',
              component:
                '[{"component":"graphicnavigation","text":"图文导航","type":"1-4","active":false,"style":"graphicnavigationstyle","setStyle":{"text":"图文导航","imageList":[],"navigationType":0,"imgStyle":0,"backgroundColor":"rgb(255, 255, 255)","textColor":"rgb(0, 0, 0)","borderRadius":0,"showSize":5,"textHeight":24,"textSize":12,"bgImg":""}},{"component":"magiccube","text":"魔方","type":"1-6","active":false,"style":"magiccubestyle","setStyle":{"text":"魔方","rubiksCubeType":4,"pageMargin":0,"imgMargin":4,"imageList":[{"src":"https://imgs.starfirelink.com/miniShop//pattern-iconFen_1636526662759.png","linktype":"10","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//pattern-marker_1636526672210.png","linktype":"10","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//pattern-iconFen_1636526703170.png","linktype":"10","http":{}},{"src":"","linktype":"10","http":{}},{"src":"","linktype":"10","http":{}}]}},{"component":"notice","text":"公告","type":"1-7","active":false,"style":"noticestyle","setStyle":{"text":"公告","noticeText":"请填写内容，如果过长，将会在手机上滚动显示","backColor":"rgba(255, 255, 255, 1)","textColor":"rgba(100, 101, 102)"}},{"component":"captiontext","text":"标题文字","type":"1-3","active":false,"style":"captiontextsstyle","setStyle":{"text":"标题文字","name":"星币充值","description":"","wordSize":16,"descriptionSize":12,"wordWeight":400,"positions":"left","descriptionWeight":200,"wordColor":"rgba(50, 50, 51, 10)","descriptionColor":"rgba(150, 151, 153, 10)","backColor":"rgba(255, 255, 255, 10)","borderBott":false,"wordHeight":24,"more":{"show":false,"type":1,"text":"查看更多","httpType":10,"http":""}}},{"component":"listswitching","text":"商品","type":"2-1","active":false,"style":"listswitchingstyle","setStyle":{"text":"商品","commodityType":3,"moditystyle":0,"borderRadius":0,"pageMargin":15,"commodityMargin":10,"textWeight":400,"positions":"left","priceofcommodity":true,"purchasebutton":true,"commoditycorner":true,"purchasebuttonType":0,"commoditycornertype":0,"commodityTagColor":"#07c160","tagPosition":0,"imageList":[],"purchase":"马上抢","commoditylisttype":0,"commoditylisttypetab":[{"text":"分组","imageList":[]},{"text":"分组","imageList":[]}],"tabColor":"#f39800","showMore":false,"moreUrl":null,"bgImg":""}},{"component":"storenotecard","text":"文章模块","type":"2-2","active":false,"style":"storenotecardstyle","setStyle":{"text":"文章模块","name":"","commodityType":0,"moditystyle":0,"borderRadius":0,"textWeight":400,"positions":"bottom","noteLabels":true,"readingNumber":true,"praisePoints":true,"viewMore1":false,"viewMore2":false,"imageList":[],"purchase":"马上抢","linktype":"10","http":{}}}]'
            }
          },
          msg: '成功'
        }
        console.log(shopTemplateData, '----------shopTemplateData')
        if (shopTemplateData.code !== 0) {
          return this.$toast(shopTemplateData.msg)
        }
        let datas = shopTemplateData.data.shopTemplate
        if (!datas) return this.tota.clear()
        this.pageComponents = JSON.parse(datas.component)
        this.pageSetup = JSON.parse(datas.templateJson)
      } catch (error) {
        console.error(error, '--------------loadShopData error')
      } finally {
        this.tota.clear()
      }
    },

    clickBanner() {
      console.log('clickBanner')
    }
  },

  components: {
    collect,
    headerTop,
    captiontext,
    placementarea,
    pictureads,
    graphicnavigation,
    richtext,
    magiccube,
    auxiliarysegmentation,
    commoditysearch,
    storeinformation,
    entertheshop,
    notice,
    videoss,
    custommodule,
    communitypowder,
    storenotecard,
    crowdoperation,
    personalizedrecommendation,
    onlineservice,
    listswitching,
    investigate,
    tabBar,
    follow,
    suspension
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/minx.less';
.shop {
  .phoneAll {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .collect {
    position: absolute;
    top: 28px;
    right: 8px;
    z-index: 1000;
  }
  .phone-container {
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  /deep/.van-pull-refresh {
    width: 100%;
  }
}
</style>
