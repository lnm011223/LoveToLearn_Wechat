// pages/Question/Question.ts
import {toGradeQuestion } from "../../../utils/data/apis"
import { event } from "../../../utils/interface";
import msg from "../../../utils/model/msg"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeList:[  
      {id: 1, name:"一年级"},
      {id: 2, name:"二年级"},
      {id: 3, name:"三年级"},
      {id: 4, name:"四年级"},
      {id: 5, name:"五年级"},
      {id: 6, name:"六年级"},
    ],
    questionList: [],// 页面显示-题库
  },

  toGradeQuestion: function(e: event){
    // console.log(e);
    if(e.detail.type.id){
      let id = e.detail.type.id
      setTimeout(() => {
        wx.navigateTo({
          url: `../QuestionList/QuestionList?id=${id}`,
        })
      }, 250)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.GetData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})