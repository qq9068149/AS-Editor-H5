/**
 * 公共方法集合
 *
 * @export
 * @class Common
 */
 import store from '../store/index'
 
 class Common {
   /**
    * 判断设备是否为ios
    *
    * @returns {Boolean} 是否为ios true：是  false：不是
    * @memberof Common
    */
   isIos() {
     let u = navigator.userAgent
     if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
       //安卓手机
       return false
     } else if (u.indexOf('iPhone') > -1) {
       //苹果手机
       return true
     } else if (u.indexOf('iPad') > -1) {
       //iPad
       return false
     } else if (u.indexOf('Windows Phone') > -1) {
       //winphone手机
       return false
     } else {
       return false
     }
   }
 
   /**
    * 是否为移动端
    *
    * @returns { Boolean } true 是 false 不是
    * @memberof Common
    */
   isMobile() {
     let device = navigator.userAgent.match(
       /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
     )
     return device ? true : false
   }
 
   /**
    * 手动添加播放按钮
    *
    * @param {String} id  需要添加的父元素
    * @memberof Common
    * @returns {*}   创建好的按钮
    */
   addPlayButton(id) {
     let playBox = document.createElement('div')
     let imgNode = document.createElement('img')
     let targetNode = document.querySelector(`#${id}`)
 
     playBox.className = 'playBtn'
     playBox.style.cssText =
       'width:100%;height:100%;background-color:rgba(0,0,0, .5);display: flex;justify-content: center;align-items: center;position:absolute;top:0;left:0;'
     imgNode.style.cssText = 'width:60px;height:60px;'
     imgNode.src =
       'https://g.alicdn.com/de/prismplayer/2.8.7/skins/default/img/bigplay.png'
 
     playBox.appendChild(imgNode)
     targetNode.appendChild(playBox)
 
     return playBox
   }
 
   /**
    * 环境获取
    *
    * @returns { Promise }  resolve 1 小程序   2 公众号    3 h5app
    * @memberof Common
    */
   getCureentEnv() {
     return new Promise((resolve, reject) => {
       if (this.isMobile()) {
         // 是否为移动端设备
         const ua = window.navigator.userAgent.toLowerCase()
 
         try {
           if (ua.match(/MicroMessenger/i) == 'micromessenger') {
             //判断是否是微信环境
             //微信环境下
           } else {
             //非微信环境逻辑
             console.log('当前是h5环境')
             resolve(3)
           }
         } catch (e) {
           console.error('获取环境失败', e)
           reject(e)
         }
       } else {
         console.log('当前为pc端')
         resolve(0)
       }
     })
   }
 
   /**
    * 检验对象是否为空
    *
    * @param {*} object    检验对象
    * @returns { Boolean }  true 不为空    fasle 为空
    * @memberof Common
    */
   checkObjIsNull(object) {
     return Object.keys(object).length > 0
   }
 
   // getCoursewareData 匹配数组
   coursewareMetchArr = ['1', '2', '3', '6', '7']
 
   /**
    * 通过商品类型  商品id获取商品数据
    *
    * @param {String} type      商品类型
    * @param {Number} id        商品id
    * @memberof utils
    */
   getCoursewareData(type, id) {
     // 只匹配type 为 1 2 3 6
     if (this.coursewareMetchArr.includes(type)) {
       let shopCommodity = store.getters.getStoreProductData
 
       if (shopCommodity[type] && shopCommodity[type][id]) {
         return shopCommodity[type][id]
       }
     }
   }
 
   /**
    * 更新imageList数据
    *
    * @param {Array} imageList     需要改变的imageList数组
    * @returns {Array}             更改好的数据
    * @memberof utils
    */
   replaceImageList(imageList) {
     let newList = []
     if (imageList.length > 0) {
       // 有数据   不用更新封面图片 只用更新videoId name等数据
       imageList.forEach((element) => {
         // 区分是 linktype  还是 httpType
         if (element.linktype) {
           element.http =
             this.getCoursewareData(
               element.linktype ? element.linktype : element.http.type,
               element.http.id
             ) || element.http
         } else if (element.type) {
           this.getCoursewareData(element.type.toString(), element.id)
             ? newList.push(
                 this.getCoursewareData(element.type.toString(), element.id)
               )
             : []
         }
       })
       console.log(newList, '--------------------新的数据')
 
       return newList
     } else {
       return []
     }
   }
 
   /**
    * 递归合并两个对象
    *
    * @param {*} target
    * @param {*} sources
    * @return {*}
    * @memberof Common
    */
   assiginObj(target, sources) {
     let obj = target
     if (typeof target != 'object' || typeof sources != 'object' || typeof target) {
       return sources // 如果其中一个不是对象 就返回sources
     }
     for (let key in sources) {
       if (target.hasOwnProperty(key)) {
         obj[key] = this.assiginObj(target[key], sources[key])
       } else {
         // 不存在就直接添加
         obj[key] = sources[key]
       }
     }
     return obj
   }
 }
 export default new Common()
 