import { event } from "../../../utils/interface";

// components/common/date-picker/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 日期选择器改变
     */
    dateChange: function(e: event) {
      this.setData({
        date: e.detail.value,
      })
      // 向父组件通信
      this.triggerEvent('change', {type: this.data.type, data: e.detail.value});
    }
  }
})
