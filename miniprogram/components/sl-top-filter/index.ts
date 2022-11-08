import { event } from "../../utils/interface"

// components/sl-top-filter/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: ['item_1', 'item_2']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0, // 一共有多少个项
    selected: 0, // 记录当前指向的项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 改变指向
     * @param e 
     */
    changeIndex: function(e: event) {
      const id: any = e.currentTarget.dataset.id;
      this.setData({
        selected: id,
      })
      // 通信
      this.triggerEvent('change', {
        type: this.data.list[id],
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        count: this.data.list.length,
      })
    }
  }
})
