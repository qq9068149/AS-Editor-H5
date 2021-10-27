<template>
  <div class="audios">
    <section class="video-wrap">
      <!-- 视频封面 -->
      <!-- <img @click="getAudio" draggable="false" v-if="!isPlayer" v-lazy="datas.voicerData.coverUrl" alt="" style="width: 100%;height:100%;display: block;"> -->
      <!-- 图标 -->
      <!-- <van-icon class="playIcon" name="play-circle-o" v-if="!isPlayer"  @click="getAudio"/> -->
      <!-- 视频播放 -->
      <!-- <div class="prism-player" :id="playerId"></div> -->
      <video
        :id="playerId"
        ref="alVideo"
        preload="auto"
        class="prism-player"
        playsinline
        webkit-playsinline
      ></video>
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'audios',
  props: {
    datas: Object,
  },
  data() {
    return {
      // playerOptions: {
      //   id: null,
      //   width: '100%',
      //   height: '100%',
      //   useH5Prism: true, // 指定使用H5播放器。
      //   useFlashPrism: false, // 指定flash播放器
      //   playsinline: true, //H5是否内置播放
      //   autoplay: false, // 自动播放
      //   source: '', // 支持播放地址播放,此播放优先级最高
      //   vid: '', // 视频id
      //   playauth: '', // 播放权证
      //   cover: '', // 播放器默认封面图片
      //   showBarTime: '3000', // 控制栏自动隐藏时间（ms）
      //   format: 'm3u8', // 指定播放地址格式
      //   mediaType: 'audio', // 指定返回音频还是视频  可选值为’video’和’audio’，默认为’video’
      //   encryptType: 1, //当播放私有加密流时需要设置。
      //   components: [],
      // },
      playerOptions: {
        fileID: '', // 请传入需要播放的视频filID 必须
        appID: '', // 请传入点播账号的appID 必须
        poster: '', // 设置封面图片
        playbackRates: [0.5, 1, 1.25, 1.5, 2], // 设置变速播放倍率选项
        psign: '', // HLS 加密播放
        autoplay: false, // 自动播放
        posterImage: true, //	是否显示封面。
        bigPlayButton: true, // 是否显示居中的播放按钮
        plugins: {
          ContinuePlay: {
            // auto: true // 是否在播放时自动续播
          },
          ProgressMarker: true, // 进度条标记
          ContextMenu: {
            levelSwitch: {
              open: true, // 打开切换提示
              // switchingText: '开始', // 开始切换时文案
              // switchedText: '成功', // 切换成功时文案
              // switchErrorText: '失败', // 切换失败时文案
            },
          },
        },
      },
      players: null, //阿里播放器实例
      playerId: null, // 播放器id
    }
  },
  created() {
    this.setPlayerId()
  },
  methods: {
    // 设置播放id
    setPlayerId() {
      this.playerId =
        'audio' +
        this.datas.voicerData.videoId +
        Math.floor(Math.random() * (1000 - 1) + 1)
      this.playerOptions.id = this.playerId // 播放器id

      this.getAudio()
    },

    /* 发送请求获取视频数据 */
    getAudio() {
      this.$httpApi
        .getPlayInfoMp4({
          videoId: this.datas.voicerData.videoId,
          type: 'Unencrypted',
        })
        .then((res) => {
          if (res.code != 0) return this.$toast(res.msg)
          // this.playerOptions.cover = res.data.payerInfo.coverUrl // 封面
          this.playerOptions.poster = res.data.payerInfo.coverUrl
          // 解决苹果设备上播放后无法显示播放背景
          if (res.data.payerInfo.coverUrl) {
            // document.getElementById(
            //   this.playerId
            // ).style.backgroundImage = `url(${this.playerOptions.cover})`
            document.getElementById(
              this.playerId
            ).style.backgroundImage = `url(${this.playerOptions.poster})`
            document.getElementById(this.playerId).style.backgroundPosition =
              'center'
            document.getElementById(this.playerId).style.backgroundRepeat =
              'no-repeat'
            document.getElementById(this.playerId).style.backgroundSize =
              'cover'
          }
          /* 获取播放凭证 */
          this.playVideo(this.datas.voicerData.videoId)
        })
    },

    playVideo(videoId) {
      console.log(videoId, '--------------videoId')
      // 通过 videoId 获取视频播放认证 playAuth
      // this.$httpApi
      //   .getVideoPlayAuth({
      //     videoId,
      //   })
      this.$httpApi
        .getVideoPlayAuthByTencent({
          fileId: videoId,
        })
        .then((res) => {
          if (res.code !== 0) return this.$toast(res.msg)

          // this.playerOptions.playauth = res.data.playAuth // 播放认证
          // this.playerOptions.vid = res.data.videoMeta.videoId // 视频id
          // this.playerOptions.cover = res.data.videoMeta.coverURL // 封面
          // this.playerOptions.id = this.playerId  // 播放器id

          this.playerOptions.fileID = res.data.fileId
          this.playerOptions.psign = res.data.token
          this.playerOptions.appID = res.data.appId
          this.players ? this.players.dispose() : null

          // eslint-disable-next-line no-undef
          // this.players = new Aliplayer(this.playerOptions, () => {})
          this.players = window.TCPlayer(this.playerId, this.playerOptions)
          console.log(this.players, '------------------players')
          this.players.on('play', function (res) {
            console.log(res, '------------videoss res')
          })
        })
    },
  },
  beforeDestroy() {
    this.players ? this.players.dispose() : null
    console.log('销毁播放器：：', this.players)
  },
}
</script>

<style scoped lang="less">
.audios {
  position: relative;

  /* 默认视频 */
  .default {
    width: 100%;
    height: 210px;
    background: #979797;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 播放图标 */
  .bof {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    opacity: 0.5;
    color: #999;
  }

  /* 播放视频 */
  .prism-player {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  /* 视频 */
  .video-wrap {
    position: relative;
    width: 100%;
    height: 210px;
    video {
      width: 100%;
      height: 210px;
    }
    .prism-player {
      width: 100%;
      height: 210px;
    }
    /deep/.prism-big-play-btn {
      left: 50% !important;
      top: 50% !important;
      transform: translate(-50%, -50%);
    }
    /* 播放icon */
    .playIcon {
      position: absolute;
      font-size: 85px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      color: #fff;
      opacity: 0.3;
    }
  }
}
/deep/ .vjs-icon-placeholder:before {
  font-size: 22px;
}
/deep/ .vjs-playback-rate-value {
  font-size: 14px !important;
}
/deep/ .video-js .vjs-play-progress:before {
  top: -6px !important;
}
/deep/ .vjs-current-time-display {
  width: 24px;
  height: 36px;
  line-height: 36px;
}
/deep/ .vjs-time-control {
  span {
    line-height: 36px;
  }
}
/deep/ .vjs-duration-display {
  width: 24px;
  height: 36px;
  line-height: 36px;
}
</style>
