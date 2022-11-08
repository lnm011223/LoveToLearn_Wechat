// components/sl-button-3/index.ts
import {event} from '../../utils/interface';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      type: Object,
    },
    type: {
      type: String,
      value: '亲子活动',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: '0',
    imageUrl: {
      "研学课程": '/svg/edu.svg',
      "亲子活动": '/svg/picture.svg',
      "冬夏令营": '/svg/location.svg',
    }
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
        // 向父组件通信
        this.triggerEvent('change', {type: that.properties.type})
        setTimeout((): void => {
          that.setData({
            status: '0',
          })
        }, 300)
      }
    }
  }
})
