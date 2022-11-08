// pages/QuestionBank/QuestionList/QuestionList.ts
import { GetQuestionList } from "../../../utils/data/apis"
import { event } from "../../../utils/interface";
import msg from "../../../utils/model/msg"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: "",
    questionList:[],
  },

  /**
   * @param id
   * 获取该年级的题库 
   */
  getData: function(id :string | undefined){
    msg.Loading()
    var that = this
    let gradeID = id
    if(gradeID){
      switch (gradeID){
        case "1":{
          this.setData({
            grade : "一年级"
          })
          break;
        }
        case "2":{
          this.setData({
            grade : "二年级"
          })
          break;
        }
        case "3":{
          this.setData({
            grade : "三年级"
          })
          break;
        }
        case "4":{
          this.setData({
            grade : "四年级"
          })
          break;
        }
        case "5":{
          this.setData({
            grade : "五年级"
          })
          break;
        }
        case "6":{
          this.setData({
            grade : "六年级"
          })
        }
      }
      GetQuestionList({
        key: "",
        data: gradeID,
      })
      .then((res: any) => {
        if(res.data.data){
          console.log("GetQuestionList",res);
          that.setData({
            questionList: res.data.data
          })
          // console.log("this,data",this.data.questionList);
        }
        else {
          msg.Fail("获取题库失败");
        }
        msg.HideLoading();
      })
      .catch(err => {
        console.error(err);
        msg.Fail("获取题库失败");
        msg.HideLoading();
      })
    }
  },
  
  toQuestionDetail: function(e: event){
    // console.log("toQuestionDetail",e);
    if(e.detail.type){
      let paper = e.detail.type
      setTimeout(() => {
        wx.navigateTo({
          url: `../QuestionDetail/QuestionDetail?author=${paper.author}&book_name=${paper.book_name}&question_type=${paper.question_type}&section=${paper.section}&test_type=${paper.test_type}`,
        })
      }, 250)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(e);
    // console.log(typeof e.id);
    this.getData(e.id)
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