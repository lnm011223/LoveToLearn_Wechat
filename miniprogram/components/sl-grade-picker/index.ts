// components/sl-region-picker/index.ts
import { GetGrade, Select } from "../../utils/data/grade/grade";
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
    multiArray: [['']], // 用于学段多列选择器
    multiIndex: [0,0], // 用于记录学段多列选择器的选中位置
    sectionList: [{}], // 学段单位列表 
    gradeID: [''], // 年级ID列表
    gradeActive: false, // 学段选择器是否被激活
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 学段多列选择器改变
     */
    multiChange: function(e: {detail: {column: 0 | 1  , value: number}}) {
      console.log("multiChange",e.detail);
      const index = this.data.multiIndex;
      index[e.detail.column] = e.detail.value;
      if(e.detail.column != 1) {
        this.setData({
          "multiIndex[1]": 0, // 防止选择击穿
        })
 
        this.getGrade({
          column: e.detail.column,
          value: e.detail.value,
          present: {
            gradeInfo: this.data.multiArray[1],
            gradeID: this.data.gradeID,
          }
        })
      } // 改变了学段/年级
      this.setData({
        multiIndex: index
      })
    },
    /**
     * @function 向父组件通信
     * @param select 
     */
    trigger: function() {
      if(!this.data.gradeActive) {
        this.setData({
          gradeActive: true,
        })
      }
      // 向父组件通信
      this.triggerEvent('change', {
        value: [
          this.data.multiArray[0][this.data.multiIndex[0]], 
          this.data.multiArray[1][this.data.multiIndex[1]],
        ]
      })
    },
    /**
     * @function 初始化学段选择器
     */
    getGrade: function (select? : Select) {
      const grade = GetGrade(select);
      this.setData({
        multiArray: [grade.sectionList, grade.gradeList],
        sectionList: grade.sectionInfo,
        gradeID: grade.gradeID,
      })
      return;
    },
  },
  lifetimes: {
    attached() {//组件初始化
      this.getGrade();
    }
  }
})
