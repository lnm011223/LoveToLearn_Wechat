// components/sl-check-button/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: 'default',
    },
    icon: {
      type: String,
    },
    style: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: "0", // 记录选中状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 按钮被点击，切换激活/未激活状态
     */
    btnTap: function() {
      let status = this.data.status;
      status = status == '0' ? '1' : '0';
      // 通信
      this.triggerEvent('change', {
        type: this.data.text,
        status: status,
      })
      // 改变页面显示方式
      this.setData({
        status: status,
      })
    }
  }
})
