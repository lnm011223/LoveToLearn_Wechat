// components/sl-region-picker/index.ts
import { GetArea, Select } from "../../utils/data/location/location";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiArray: [['']], // 用于地区多列选择器
    multiIndex: [0,0,0], // 用于记录地区多列选择器的选中位置
    provinceList: [{}], // 省级单位列表 
    cityID: [''], // 地市ID列表
    regionActive: false, // 地区选择器是否被激活
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 地区多列选择器改变
     */
    multiChange: function(e: {detail: {column: 0 | 1 | 2, value: number}}) {
      console.log(e.detail);
      const index = this.data.multiIndex;
      index[e.detail.column] = e.detail.value;
      if(e.detail.column != 2) {
        this.setData({
          "multiIndex[2]": 0, // 防止地区选择击穿
        })
        if(e.detail.column == 0) {
          this.setData({
            "multiIndex[1]": 0, // 防止市区选择击穿
          })
        }
        this.getArea({
          column: e.detail.column,
          value: e.detail.value,
          present: {
            city: this.data.multiArray[1],
            cityID: this.data.cityID,
          }
        })
      } // 改变了省区/市区
      this.setData({
        multiIndex: index
      })
    },
    /**
     * @function 向父组件通信
     * @param select 
     */
    trigger: function() {
      if(!this.data.regionActive) {
        this.setData({
          regionActive: true,
        })
      }
      // 向父组件通信
      this.triggerEvent('change', {
        value: [
          this.data.multiArray[0][this.data.multiIndex[0]], 
          this.data.multiArray[1][this.data.multiIndex[1]],
          this.data.multiArray[2][this.data.multiIndex[2]]
        ]
      })
    },
    /**
     * @function 初始化地区选择器
     */
    getArea: function (select?: Select) {
      const area = GetArea(select);
      this.setData({
        multiArray: [area.provinceList, area.cityList, area.regionList],
        provinceList: area.province,
        cityID: area.cityID,
      })
      return;
    },
  },
  lifetimes: {
    attached() {
      this.getArea();
    }
  }
})
