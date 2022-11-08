import { event } from "../../utils/interface";

// components/sl-column-ceil/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
    },
    style: {
      type: Object
    },
    type: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: "0",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindtap: function(e: event) {
      if(e.currentTarget.dataset.id == "0") {
        this.setData({
          status: "1",
        })
        const that = this;
        this.triggerEvent('tap', {type: this.data.item})
        setTimeout(() => {
          that.setData({
            status: "0",
          })
        }, 300)
      }
    }
  }
})
