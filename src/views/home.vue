<template>
  <div class="shop">
    <section class="phoneAll" ref="imageTofile" id="imageTofile">
      <!-- 导航 -->
      <headerTop class="containwe-padding" :name="pageSetup" :head-height="2" />
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
          <template v-for="(item, index) in pageComponents">
            <keep-alive :include="item.component" :key="index">
              <component
                :key="index"
                :is="item.component"
                :datas="item.setStyle"
                class="componentsClass"
                :data-type="item.type"
                @clickBanner='clickBanner'
              />
            </keep-alive>
          </template>
          <!-- 底部 -->
          <phoneBottom :datas="pageSetup.bottomLogo" />
        </section>
      </van-pull-refresh>
    </section>
  </div>
</template>

<script>
import phoneBottom from 'components/phoneBottom' // 手机底部
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
  voicer,
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
        name: '', //页面名称
        subhead: '', //副标题
        urlname: '',
        details: '', //页面描述
        bgColor: 'rgba(249, 249, 249, 10)', //背景颜色
        bottomLogo: {
          isShowBootom: true,
          botLogo: ''
        }, // 底部logo
        isPerson: true
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
              id: 275,
              name: '页面标题1231111',
              templateJson:
                '{"name":"页面标题1231111","details":"","bgColor":"rgba(249, 249, 249, 10)","bottomLogo":{"isShowBootom":false,"botLogo":""},"isPerson":false,"isBack":true,"titleHeight":35,"bgImg":"https://imgs.starfirelink.com/miniShop//。。。_1622100505794.jpg"}',
              component:
                '[{"component":"commoditysearch","text":"商品搜索","type":"1-1","active":false,"style":"commoditysearchstyle","setStyle":{"text":"商品搜索","heights":28,"position":0,"sweep":false,"borderRadius":0,"textPosition":0,"backgroundColor":"rgb(249, 249, 249)","borderColor":"rgb(255, 255, 255)","textColor":"rgb(150, 151, 153)","hotords":[]}},{"component":"pictureads","text":"图片广告","type":"1-3","active":false,"style":"pictureadsstyle","setStyle":{"text":"图片广告","swiperType":0,"borderRadius":0,"pageMargin":0,"imageMargin":0,"pagingType":0,"rowindividual":2,"imageList":[{"src":"https://imgs.starfirelink.com/miniShop//haibao_1_1622100790033.jpg","text":"","http":{}}]}},{"component":"magiccube","text":"魔方","type":"1-6","active":false,"style":"magiccubestyle","setStyle":{"text":"魔方","rubiksCubeType":1,"pageMargin":0,"imgMargin":0,"imageList":[{"src":"https://imgs.starfirelink.com/miniShop//coupon_1_1622100837311.png","linktype":"1","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//coupon_2_1622100845102.png","linktype":"1","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//coupon_3_1622100853953.png","linktype":"1","http":{}},{"src":"","linktype":"1","http":{}},{"src":"","linktype":"1","http":{}}]}},{"component":"magiccube","text":"魔方","type":"1-6","active":false,"style":"magiccubestyle","setStyle":{"text":"魔方","rubiksCubeType":0,"pageMargin":0,"imgMargin":0,"imageList":[{"src":"https://imgs.starfirelink.com/miniShop//area_1_1622100909927.png","linktype":"1","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//area_2_1622100919085.png","linktype":"1","http":{}},{"src":"","linktype":"1","http":{}},{"src":"","linktype":"1","http":{}},{"src":"","linktype":"1","http":{}}]}},{"component":"listswitching","text":"商品","type":"2-1","active":true,"style":"listswitchingstyle","setStyle":{"text":"商品","commodityType":0,"moditystyle":0,"borderRadius":0,"pageMargin":15,"commodityMargin":10,"textWeight":400,"positions":"left","priceofcommodity":true,"purchasebutton":true,"commoditycorner":true,"purchasebuttonType":0,"commoditycornertype":0,"commodityTagColor":"#07c160","tagPosition":0,"imageList":[{"coverUrl":"https://imgs.starfirelink.com/minicourse/16230504261_1623050836184.jpg","introduce":"传承 第一季-4.04","price":0,"name":"传承4.04","videoId":"3701925918997853348","id":469,"type":1,"seriesId":"0","httpType":"1"}],"purchase":"马上抢","commoditylisttype":0,"commoditylisttypetab":[{"text":"分组","imageList":[]},{"text":"分组","imageList":[]}],"tabColor":"#f39800","showMore":false,"moreUrl":null,"bgImg":""}},{"component":"notice","text":"公告","type":"1-7","active":false,"style":"noticestyle","setStyle":{"text":"公告","noticeText":"请填写内容，如果过长，将会在手机上滚动显示","backColor":"rgb(255, 248, 233)","textColor":"rgba(100, 101, 102)"}}]'
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

    clickBanner(){
      console.log('clickBanner')
    }
  },

  components: {
    collect,
    headerTop,
    phoneBottom,
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
    voicer,
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
