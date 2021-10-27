<template>
  <div class="shop">
    <section class="phoneAll" ref="imageTofile" id="imageTofile">
      <!-- 导航 -->
      <headerTop class="containwe-padding" :name="pageSetup" :head-height="2" />
      <!-- <button @click="fenxiang">分享</button> -->
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
    if (miniprogram == 1) {
      this.$httpApi
        .exists()
        .then(res => {
          console.log(res, '-----------exists res')
          // if (res.code == 0) {
          //   if (res.data == 0) {
          //     window.localStorage.setItem('phone', 0)
          //   }
          // if (res.data == 1) {
          window.localStorage.setItem('phone', 1)
          //   }
          // }
        })
        .catch(() => {
          this.$toast('数据请求失败，请重试！')
        })
    }
  },
  mounted() {},
  methods: {
    onRefresh() {
      setTimeout(() => {
        //$toast('刷新成功');
        this.isLoading = false
      }, 1000)
      // this.loadShopData()
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
          error: false,
          data: {
            shopTemplate: {
"id": null,
"name": "页面标题",
"templateJson": '{"name":"页面标题","details":"","bgColor":"rgba(249, 249, 249, 10)","bottomLogo":{"isShowBootom":false,"botLogo":""},"isPerson":false,"isBack":true,"titleHeight":35,"bgImg":""}',
"component": '[{"component":"tabBar","text":"底部导航","type":"1-5","active":false,"style":"tabBarStyle","setStyle":{"text":"底部导航","activeColor":"#1989fa","inactiveColor":"#7d7e80","isShowBorder":true,"iconWidth":"25","iconHeight":"25","fontSize":"14","Highlight":0,"iconList":[]}},{"component":"commoditysearch","text":"商品搜索","type":"1-1","active":false,"style":"commoditysearchstyle","setStyle":{"text":"商品搜索","heights":28,"position":0,"sweep":false,"borderRadius":0,"textPosition":0,"backgroundColor":"rgb(249, 249, 249)","borderColor":"rgb(255, 255, 255)","textColor":"rgb(150, 151, 153)","hotords":[]}},{"component":"captiontext","text":"标题文字","type":"1-3","active":false,"style":"captiontextsstyle","setStyle":{"text":"标题文字","name":"标题文字","description":"","wordSize":16,"descriptionSize":12,"wordWeight":400,"positions":"left","descriptionWeight":200,"wordColor":"rgba(50, 50, 51, 10)","descriptionColor":"rgba(150, 151, 153, 10)","backColor":"rgba(255, 255, 255, 10)","borderBott":false,"wordHeight":24,"more":{"show":false,"type":1,"text":"查看更多","httpType":1,"http":"","select":{}}}},{"component":"pictureads","text":"图片广告","type":"1-3","active":false,"style":"pictureadsstyle","setStyle":{"text":"图片广告","swiperType":3,"borderRadius":0,"pageMargin":0,"imageMargin":0,"pagingType":"bullets","rowindividual":2,"imageList":[{"src":"https://imgs.starfirelink.com/miniShop//asd_1635325222076.jpg","text":"","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//src=http___www.szwdj.cn_wp-content_uploads_2019_08_92935a23386784f38f0567343085ca85.jpg&refer=http___www.szwdj_1635325227258.jpg","text":"","http":{}},{"src":"https://imgs.starfirelink.com/miniShop//asd_1635325232322.jpg","text":"","http":{}}]}},{"component":"graphicnavigation","text":"图文导航","type":"1-4","active":false,"style":"graphicnavigationstyle","setStyle":{"text":"图文导航","imageList":[{"src":"https://imgs.starfirelink.com/miniShop//asd_1635325244026.jpg","text":"demo","http":{"externalLink":"https://baidu.com"},"linktype":"11"},{"src":"https://imgs.starfirelink.com/miniShop//src=http___www.szwdj.cn_wp-content_uploads_2019_08_92935a23386784f38f0567343085ca85.jpg&refer=http___www.szwdj_1635325276987.jpg","text":"demo2","http":{"externalLink":"https://baidu.com"},"linktype":"11"}],"navigationType":0,"imgStyle":0,"backgroundColor":"rgb(255, 255, 255)","textColor":"rgb(0, 0, 0)","borderRadius":0,"showSize":5,"textHeight":24,"textSize":12,"bgImg":""}},{"component":"notice","text":"公告","type":"1-7","active":false,"style":"noticestyle","setStyle":{"text":"公告","noticeText":"请填写内容，如果过长，将会在手机上滚动显示","backColor":"rgb(255, 248, 233)","textColor":"rgba(100, 101, 102)"}},{"component":"auxiliarysegmentation","text":"辅助分割","type":"1-11","active":false,"style":"auxiliarysegmentationstyle","setStyle":{"text":"辅助分割","blankHeight":30,"segmentationtype":1,"paddType":0,"auxliarColor":"rgb(229, 229, 229)","bordertp":"solid"}},{"component":"storeinformation","text":"店铺信息","type":"1-12","active":false,"style":"storeinformationstyle","setStyle":{"text":"店铺信息","bakcgroundImg":"","headPortrait":"","rubiksCubeType":4,"name":"店铺名称","Discount":"在线支付满150减30，满100减20"}},{"component":"entertheshop","text":"进入店铺","type":"1-13","active":false,"style":"entertheshopstyle","setStyle":{"text":"进入店铺","shopName":"cell","copywriting":" ","type":"11","http":{"externalLink":"https://baidu.com"}}},{"component":"communitypowder","text":"社群涨粉","type":"1-14","active":false,"style":"communitypowderstyle","setStyle":{"text":"社群涨粉","mainImg":"","qrcodeImg":"","title":"标题","describe":"辅助描述","buttonName":"立即添加","backColor":"rgb(255, 255, 255)"}},{"component":"suspension","text":"悬浮按钮","type":"1-16","active":false,"style":"suspensionstyle","setStyle":{"text":"悬浮按钮","linktype":"10","http":{}}},{"component":"listswitching","text":"商品","type":"2-1","active":true,"style":"listswitchingstyle","setStyle":{"text":"商品","commodityType":1,"moditystyle":0,"borderRadius":0,"pageMargin":15,"commodityMargin":10,"textWeight":400,"positions":"left","priceofcommodity":true,"purchasebutton":true,"commoditycorner":true,"purchasebuttonType":0,"commoditycornertype":0,"commodityTagColor":"#07c160","tagPosition":0,"imageList":[],"purchase":"马上抢","commoditylisttype":0,"commoditylisttypetab":[{"text":"分组","imageList":[]},{"text":"分组","imageList":[]}],"tabColor":"#f39800","showMore":false,"moreUrl":null,"bgImg":""}}]',
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

        // 传递userAdminId  query  获取当前店铺所有商品数据       当动态商品数据回来后  才渲染动态组件

        this.pageComponents = JSON.parse(datas.component)
        if (datas.templateJson) {
          this.pageSetup = JSON.parse(datas.templateJson)
        } else {
          this.pageSetup.name = datas.name
          this.pageSetup.details = datas.details
          this.pageSetup.bgColor = datas.bgColor
          this.pageSetup.isPerson = datas.isPerson
        }
        localStorage.setItem('shopHomeId', datas.id)
        localStorage.setItem('height', this.pageSetup.titleHeight)
      } catch (error) {
        console.error(error, '--------------loadShopData error')
      } finally {
        this.tota.clear()
      }
    },

    // 获取店铺动态商品数据
    async getShopCommodity(params, userAdminId) {
      try {
        console.log(
          'getShopCommodity 获取店铺动态商品数据-> params',
          params,
          userAdminId
        )
        console.log(
          this.$store.state.storeProductData.get(userAdminId),
          '-------------userAdminId'
        )
        // 先查询当前  userAdminId 在 map 数据中存不存在   如果存在不需要请求店铺商品数据
        // if (!this.$store.state.storeProductData.get(userAdminId)) {
        // getShopCommodity 接口参数   id | orgiId
        let getShopCommodity = await this.$httpApi.getShopCommodity(params)

        if (getShopCommodity.code !== 0)
          return this.$toast(getShopCommodity.msg)
        console.log('getShopCommodity -> getShopCommodity', getShopCommodity)
        // 把 userAdminId 当作 map key 存储当前店铺数据
        this.$store.commit('put_storeProductData', {
          productKey: userAdminId,
          productValue: getShopCommodity.data.shopCommodity
        })
        // } else {
        //   console.log(`当前店铺${userAdminId}已经存在`)
        // }
      } catch (error) {
        throw new Error(error)
        console.error('获取店铺动态商品数据失败', error)
      } finally {
        this.tota.clear()
      }
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
