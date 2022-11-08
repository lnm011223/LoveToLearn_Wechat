// components/sl-button-2/index.ts
import {event} from '../../utils/interface';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: '0',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnTap: function(e: event) {
      const that = this;
      if(e.currentTarget.dataset.id = '0') {
        this.setData({
          status: "1",
        })
        this.triggerEvent('tap')
        setTimeout((): void => {
          that.setData({
            status: '0',
          })
        }, 300)
      }
    }
  }
})
