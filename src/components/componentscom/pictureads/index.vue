<template>
  <div class="pictureads">
    <!-- 无图片 -->
    <div class="upload" v-if="!datas.imageList[0]">
      <i class="iconfont icon-lunbotu"></i>
    </div>

    <!-- 一行一个 -->
    <div
      v-if="datas.imageList[0] && datas.swiperType === 0"
      class="type0"
      :style="{
        'padding-left': datas.pageMargin + 'px',
        'padding-right': datas.pageMargin + 'px',
      }"
      ref="swiper"
    >
      <div
        v-for="(item, index) in datas.imageList"
        :key="index"
        class="imgLis"
        :style="{ 'margin-bottom': datas.imageMargin + 'px' }"
        ref="swiper"
      >
        <!-- 图片 -->
        <img
          :src="item.src"
          draggable="false"
          :style="{ 'border-radius': datas.borderRadius + 'px' }"
          @click="goHttp(item)"
        />
        <!-- 图片标题 -->
        <p class="title" v-if="item.text ? true : false">{{ item.text }}</p>
      </div>
    </div>

    <!-- 轮播组件 -->
    <div
      :class="swiperM"
      v-if="
        (datas.imageList[0] && datas.swiperType === 1) ||
        datas.swiperType === 2 ||
        datas.swiperType === 3
      "
      ref="swiper"
    >
      <div
        :class="
          datas.swiperType === 3 && datas.imageList[0]
            ? 'type3 type1 swiper-wrapper type3H'
            : 'swiper-wrapper type1'
        "
      >
        <div
          class="swiper-slide"
          v-for="(item, index) in datas.imageList"
          :key="index"
          ref="swiper"
        >
          <!-- 图片 -->
          <img
            :src="item.src"
            alt
            draggable="false"
            :style="{ 'border-radius': datas.borderRadius + 'px' }"
          />
          <!-- 图片标题 -->
          <p class="title" v-if="item.text ? true : false">{{ item.text }}</p>
        </div>
      </div>

      <!-- 分页器 -->
      <div class="swiper-pagination" style="color: #007aff"></div>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  name: 'pictureads',
  props: {
    datas: Object,
  },
  inject: ['productJump'],
  data() {
    return {
      mySwiper: null,
      swiperM: 'swiper-container',
    }
  },
  created(){
    console.log(this.datas,'-------pictureads')
  },
  mounted() {
    this.addSwiper()
    this.swiperM =
      this.swiperM +
      Math.floor(Math.random() * 1000) +
      Math.floor(Math.random() * 1000)
  },
  methods: {
    goHttp(res) {
      this.productJump(res)
    },
    /* 创建轮播对象 */
    addSwiper() {
      let _this = this
      this.$nextTick(() => {
        if (this.datas.swiperType !== 0 && this.datas.imageList[0]) {
          if (this.mySwiper instanceof Array) {
            this.mySwiper.forEach((element) => {
              element.destroy()
            })
          } else if (this.mySwiper instanceof Object) {
            // 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
            this.mySwiper.destroy()
          }
          const params = {
            loop: true,
            autoplay: true,
            preventClicks: true,
            preventClicksPropagation: true,
            pagination: {
              el: '.swiper-pagination',
              type: this.datas.pagingType,
            },
            on: {
              click: function () {
                let realIndex = this.realIndex
                _this.goHttp(_this.datas.imageList[realIndex])
              },
            },
          }
          if (this.datas.swiperType === 2) {
            params.slidesPerView = this.datas.rowindividual
            params.spaceBetween = this.datas.imageMargin
          } else if (this.datas.swiperType === 3) {
            params.slidesPerView = 1.3
            params.centeredSlides = true
          }
          this.mySwiper = new Swiper('.' + this.swiperM, params)
        } else {
          if (this.mySwiper instanceof Array) {
            this.mySwiper.forEach((element) => {
              element.destroy()
            })
          }
          // 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
          if (this.mySwiper instanceof Object) {
            this.mySwiper.destroy()
          }
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.pictureads {
  position: relative;

  /* 无图片 */
  .upload {
    background: #979797;
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 120px;
    }
  }

  /* 类型0 */
  .type0 {
    box-sizing: border-box;
    /* 图片列表 */
    .imgLis {
      width: 100%;
      position: relative;
      overflow: hidden;
      &:last-child {
        margin: 0 !important;
      }
      /* 图片 */
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .title {
        height: 36px;
        width: 100%;
        background-color: rgba(51, 51, 51, 0.8);
        text-align: center;
        line-height: 36px;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

  /* 类型1 */
  .type1 {
    width: 100%;
    position: relative;
    .swiper-slide {
      width: 100%;
      height: 250px;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .title {
      height: 36px;
      width: 100%;
      background-color: rgba(51, 51, 51, 0.8);
      text-align: center;
      line-height: 36px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }

  .type3 {
    width: 100%;
    height: 250px;
    align-items: center;
    .swiper-slide {
      height: 210px !important;
      text-align: center;
      font-size: 18px;
      background: #fff;
      box-shadow: rgba(173, 173, 173, 0.8) 0px 7px 24px 0px;
      border-radius: 12px;
      overflow: hidden;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
    .swiper-pagination {
      bottom: 0 !important;
    }
    .title {
      height: 36px;
      width: 100%;
      background-color: rgba(51, 51, 51, 0.8);
      text-align: center;
      line-height: 36px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }
  .type3H {
    height: 250px;
  }
  .swiper-container-horizontal > .swiper-pagination-progressbar {
    height: 2px;
  }
}
</style>
