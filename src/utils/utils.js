import CryptoJS from 'crypto-js'


/**
 * 工具类
 *
 * @export
 * @class Utils
 */
export default class Utils {

  /**
   * 登录密码加密
   *
   * @param {String} psd    密码
   * @memberof Utils
   */
  rememberPsd(psd) {

    console.log('密码加密')
    // 密码加密
    let encrypt = this.encrypt(psd)
    console.log(encrypt, '加密密码--------')

    // 加密密码保存到cookie中
    this.setCookie('accountInfo', encrypt, 1440 * 3)    // 保存3天

  }

  /**
   * 解密密码
   *
   * @memberof Utils
   */
  getPsd(encryptKey) {

    return this.decrypt(this.getCookie('accountInfo'))

  }

  /**
   * 清除密码
   *
   * @memberof Utils
   */
  clearPsd() {
    this.clearCookie('accountInfo')
  }

  /**
   * CryptoJS 加密
   *
   * @param {String} encryptData  需要加密数据
   * @returns 加密后的数据
   * @memberof Utils
   */
  encrypt(encryptData) {
    var key = CryptoJS.enc.Utf8.parse('firestudyonline-live');
    var srcs = CryptoJS.enc.Utf8.parse(encryptData);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();

  }


  /**
   * CryptoJS 解密
   *
   * @param {String} encryptData  需要加密数据
   * @returns 解密后的数据
   * @memberof Utils
   */
  decrypt(encryptData) {
    var key = CryptoJS.enc.Utf8.parse('firestudyonline-live');
    var decrypt = CryptoJS.AES.decrypt(encryptData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();

  }


  /**
   * 清除cookie
   *
   * @param {*} cookieName    cookie名称
   * @memberof Utils
   */
  clearCookie(cookieName) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(cookieName);
    if (cval != null) {
      document.cookie = cookieName + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }


  /**
   * 设置cookie
   *
   * @param {*} cookieName
   * @param {*} value
   * @param {*} expiremMinutes
   * @memberof Utils
   */
  setCookie(cookieName, value, expiremMinutes) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
    document.cookie = cookieName + "=" + escape(value) + ((expiremMinutes == null) ? "" : ";expires=" + exdate.toGMTString());
  }


  /**
   * 获取cookie
   *
   * @param {*} cookieName
   * @returns
   * @memberof Utils
   */
  getCookie(cookieName) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(cookieName + "=");
      if (c_start != -1) {
        c_start = c_start + cookieName.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1)
          c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }

}