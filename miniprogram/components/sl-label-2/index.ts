import { event } from "../../utils/interface";

// components/sl-label-2/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String
    },
    text: {
      type: String,
      value: 'Label',
    },
    style: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: '0', // 是否被点击
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnTap: function(e: event) {
      if(e.currentTarget.dataset.id == '0') {
        this.setData({
          status: '1',
        })
        // 向父组件通信
        this.triggerEvent('tap', {type: this.data.text});
        const that = this;
        setTimeout(() => {
          that.setData({
            status: '0',
          })
        }, 300)
      }
    }
  }
})
