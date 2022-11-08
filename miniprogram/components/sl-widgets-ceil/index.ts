import { event } from "../../utils/interface";

// components/sl-button-4/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '组件',
    },
    icon: {
      type: String,
      value: '/svg/setting.svg',
    },
    style: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: '0', // 组件是否被点击
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnTap: function(e: event) {
      if(e.currentTarget.dataset.id == '0') {
        // 向父组件通信
        this.triggerEvent('tap', {type: this.data.text});
        this.setData({
          active: '1',
        })
        const that = this;
        setTimeout(() => {
          that.setData({
            active: '0',
          })
        }, 300)
      }
        
    },
  }
})
