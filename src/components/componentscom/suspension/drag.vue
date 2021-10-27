<template>
  <div>
    <div
      class="xuanfu"
      ref="moveDiv"
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
      @touchmove.prevent
    >
      <div class="suspension-wrap">
        <img
          class="suspension-logo"
          src="https://imgs.starfirelink.com/vue-fire-start-h5/shop-peison/icon_back_36.png"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',
      windowWidth: document.documentElement.clientWidth - 36, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight - 86, //实时屏幕高度
    }
  },
  mounted() {
    this.moveDiv = this.$refs.moveDiv
    console.log(this.moveDiv, '--------------moveDiv data')
  },
  methods: {
    // 实现移动端拖拽
    down(event) {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.dx = this.moveDiv.offsetLeft
      this.dy = this.moveDiv.offsetTop
    },
    move(event) {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny
        if (this.xPum < 0) {
          this.xPum = 0
        }
        if (this.xPum >this.windowWidth) {
          this.xPum = this.windowWidth
        }
        if (this.yPum < 0) {
          this.yPum = 0
        }
        if (this.yPum > this.windowHeight) {
          this.yPum = this.windowHeight
        }
        this.moveDiv.style.left = this.xPum + 'px'
        this.moveDiv.style.top = this.yPum + 'px'
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false
      console.log('------------end')
    },
  },
}
</script>



<style lang="less" scoped>
.xuanfu {
  height: 36px;
  width: 36px;
  /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
  z-index: 999;
  position: fixed;
  right: 30px;
  bottom: 150px;
  z-index: 1000;
}
.yuanqiu {
  height: 36px;
  width: 36px;
}
.suspension-wrap {
  width: 36px;
  height: 36px;
  .suspension-logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
</style>