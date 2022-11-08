// components/sl-form-ceil/index.ts
// import { Debounce } from "../../utils/function/tools";
import { FuzzyListSchool } from "../../utils/data/apis";
import { Debounce } from "../../utils/function/tools";
import { event } from "../../utils/interface";

/**
 * @promise 防抖
 */
let debounce: Function = new Debounce().use(500);
Component({
  /**
   * 组件的属性列表
   */
  properties: { 
    title: {
      type: String,
      value: '标题',
    },
    style: {
      type: Object
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: ''
    }, // 输入框内容
  },

  /**
   * 组件的初始数据
   */
  data: {
    input: '', // 输入框结果
    focus: false, // 输入框激活
    tips: [], // 模糊搜索结果
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 向父组件传值
     */
    trigger: function(value: string) {
      this.triggerEvent('input', {type: this.data.title, value: value});
      this.setData({
        input: value,
      })
    },
    /**
     * @function 输入框激活
     */
    ceilFocus: function() {
      this.setData({
        focus: true,
      })
    },
    /**
     * @function 输入框不激活
     */
    ceilOutFocus: function() {
      this.setData({
        focus: false,
      })
    },
    /**
     * @function 监听输入
     */
    inputting: function(e: event) {
      // debounce().then(() => {
        this.trigger(e.detail.value);
      // })
      // 模糊搜索
      if(this.data.title == '学校' || this.data.title == '学校全称') {
        this.fuzzySearch(e.detail.value);
      }
    },
    /**
     * @function 模糊搜索
     */
    fuzzySearch: function(keyword: string = '') {
      debounce().then(() => {
        FuzzyListSchool({
          keyword: keyword,
        })
        .then((res: any) => {
          const tips: any = res.data.data;
          this.setData({
            tips: tips
          })
        })
      })
    },
    /**
     * @function 监听模糊搜索结果框内容被点击
     */
    bindTipsTap: function(e: event) {
      const value: any = e.currentTarget.dataset.id;
      this.trigger(value); // 向父组件通信
      this.setData({
        input: value,
        tips: [], // 收起弹窗
      })
    },
  },
  /**
   * @生命周期
   */
  lifetimes: {
    attached: function() {
      this.setData({
        input: this.properties.value,
      })
      if(this.data.title == '学校全称' || this.data.title == '学校') {
        this.fuzzySearch(); // 初始化学校列表
      }
    }
  }
})
