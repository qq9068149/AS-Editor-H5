<template>
  <div class="investigate" @click="guanbi">
    <!-- 内容 -->
    <div class="title">{{ datas.title }}</div>
    <div class="rescon" v-for="(item1, index1) in datas.jsonData" :key="index1">
      <!-- 输入框 -->
      <div v-if="item1.type == 0">
        <van-cell-group>
          <van-field
            :label="item1.name"
            :placeholder="item1.value"
            v-model="item1.value2"
          />
        </van-cell-group>
      </div>

      <!-- 下拉框 -->
      <div v-if="item1.type == 1" class="xiala">
        <div class="titlename">{{ item1.name }}</div>
        <div class="select">
          <input
            type="text"
            readonly="readonly"
            :placeholder="'点击选择' + item1.name"
            class="readinput"
            @click="showpic(index1)"
            v-model="item1.value2"
          />
          <ul :class="{ ulshow: item1.showPicker, ultext: true }">
            <li
              v-for="(item, index) in item1.value1"
              :key="index"
              @click="xuanze(index1, item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
 
      <!-- 单选框 -->
      <van-field name="radio" :label="item1.name" v-if="item1.type == 2">
        <template #input>
          <van-radio-group v-model="item1.value2" direction="horizontal">
            <van-radio
              :name="item"
              v-for="(item, index) in item1.value1"
              :key="index"
              >{{ item }}</van-radio
            >
          </van-radio-group>
        </template>
      </van-field>

      <!-- 复选框 -->

      <van-field
        name="checkboxGroup"
        :label="item1.name"
        v-if="item1.type == 3"
      >
        <template #input>
          <van-checkbox-group v-model="item1.value2" direction="horizontal">
            <van-checkbox
              :name="item"
              v-for="(item, index) in item1.value1"
              :key="index"
              :shape="item1.name"
              >{{ item }}</van-checkbox
            >
            <span class="multiple">(多选)</span>
          </van-checkbox-group>
        </template>
      </van-field>
    </div>
    <div class="button">
      <button @click="submit">提交</button>
    </div>
    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'investigate',
  data() {
    return {
      jsonData: [],
    }
  },
  props: {
    datas: Object,
  },
  created() {
    this.datas.jsonData.forEach((el) => {
      if (el.type == 3) {
        el.value2 = []
      }
    })
  },
  mounted() {},
  methods: {
    //点击显示下拉框
    showpic(index1) {
      event.stopPropagation()
      this.datas.jsonData.forEach((el) => {
        el.showPicker = false
      })
      // eslint-disable-next-line vue/no-mutating-props
      this.datas.jsonData[index1].showPicker = !this.datas.jsonData[index1]
        .showPicker
    },
    //关闭下拉选项
    guanbi() {
      this.datas.jsonData.forEach((el) => {
        el.showPicker = false
      })
    },
    //下拉选择
    xuanze(index1, item) {
      // this.value = value;

      // eslint-disable-next-line vue/no-mutating-props
      this.datas.jsonData[index1].value2 = item //保留被选中的值

      // eslint-disable-next-line vue/no-mutating-props
      this.datas.jsonData[index1].showPicker = false //关闭下拉选择
    },
    //保存数据到后台
    submit() {
      //判断不能为空，为空则不能提交
      for (let i = 0; i < this.datas.jsonData.length; i++) {
        if (this.datas.jsonData[i].value2 == '') {
          this.$toast(this.datas.jsonData[i].name + '不能为空')
          return
        }
      }
      //获取要提交的数据
      this.jsonData = []
      this.datas.jsonData.forEach((el) => {
        let text = {}
        text.name = el.name
        text.value = el.value2
        if (text.value instanceof Array) {
          console.log(text.value, '111111111')
          text.value = text.value.join('&')
        }
        this.jsonData.push(text)
      })
      console.log(this.jsonData, '0000000000')
      //提交信息
    },
    //
  },
  watch: {},
}
</script>

<style scoped lang="less">
.investigate {
  position: relative;
  padding: 0 6px;
}
form select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
.xiala {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  // overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  .titlename {
    width: 5.6em;
    margin-right: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
select {
  border: none;
  outline: none;
}
.title {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
/deep/.van-cell {
  display: block;
}
/deep/.el-form-item__label {
  text-align: center;
  width: 100% !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/deep/.el-form-item__content {
  margin-left: 100% !important;
}
/* 上传图片按钮 */
.uploadImg {
  width: 200px;
  height: 40px;
  margin-top: 20px;
}
/deep/.van-radio,
.van-checkbox {
  padding: 4px 0px;
}
/deep/.van-field__label {
  width: 100%;
  padding-left: 10px;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 10px;
  line-height: 20px;
  font-size: 13px;
}
/deep/.van-field__value {
  padding-left: 10px;
  font-size: 13px;
  padding-top: 5px;
}
.button {
  padding: 12px 24px;
  button {
    width: 100%;
    background: rgb(48, 116, 243);
    color: #fff;
    padding: 8px;
    border-radius: 20px;
    text-align: center;
    font-size: 14px;
    border: none;
  }
}
.select {
  position: relative;
  width: 100%;
  .readinput {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    cursor: default;
  }
}
.ultext {
  display: none;
  height: 0;
  overflow: hidden;
  transition: all linear 1s;
  background: #fff;
  z-index: 100;
  border-radius: 6px;
  box-shadow: 0 0 16px 1px rgba(200, 200, 200, 0.5);
  li {
    padding: 4px 16px;
    border-bottom: 1px solid #eeeeee;
    &:hover {
      background: #c3d4f5;
    }
  }
}
.ulshow {
  display: block;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 6px;
  position: absolute;
}
.multiple {
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  color: #aaaaaa;
}
</style>