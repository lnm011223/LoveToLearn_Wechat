import msg from "../../../utils/model/msg"
import { GetQuestionDetail  } from "../../../utils/data/apis"

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionList: <any>[],
    selectList: <any>[],
    answerList: <any>[],
    selectCount: <any>[],
    fillAnswer:<any>[],
    optionMark: ["A", "B", "C", "D", "E"],
    index: 0,
    anwserCompletion: false,
    bc_default: '#FBFBFB',
    bc_select: '#98FB98',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    rightNum: 0,
    score: 0,
    imgUrl: "",
    inputValue:"",
  },

  getData:function(author: string | undefined, book_name: string | undefined, question_type: string | undefined, section: string | undefined, test_type: string | undefined){
    var that = this
    GetQuestionDetail({
      author: author ? author : " ",
      book_name: book_name ? book_name : "",
      question_type: question_type ? question_type : "",
      section: section ? section : "",
      test_type: test_type ? test_type : "",
    })
    .then((res: any) => {
      if(res.data){
        console.log("GetQuestionDetail",res);
        that.setData({
          questionList: res.data,
          fillAnswer: Array(res.data.length).fill(null)?Array(res.data.length).fill(null): Array(1),
        })
        res.data.forEach((item: any) => {
          that.setData({
            selectCount: [...that.data.selectCount, Array(parseInt(item.input_area, 10))],
          })
        })
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    msg.Loading();
    if(e){
      this.getData(e.author,e.book_name,e.question_type,e.section,e.test_type)
    }
    msg.HideLoading();
  },

  //下一题
  nextQuestion: function () {
    var that = this;
    this.setData({
      index: that.data.index + 1,
      bcA: that.data.bc_default,
      bcB: that.data.bc_default,
      bcC: that.data.bc_default,
      bcD: that.data.bc_default,
      bcE: that.data.bc_default,
      inputValue:that.data.fillAnswer[this.data.index+1],
    });
    var select = that.data.selectList[that.data.index];
    if (select != null) {
      that.setData({
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
      for (let i = 0; i < select['length']; i++) {//select.length => select['length']
        switch (select[i]) {
          case 'A': that.setData({ bcA: that.data.bc_select }); break;
          case 'B': that.setData({ bcB: that.data.bc_select }); break;
          case 'C': that.setData({ bcC: that.data.bc_select }); break;
          case 'D': that.setData({ bcD: that.data.bc_select }); break;
          case 'E': that.setData({ bcE: that.data.bc_select }); break;
        }
      }
    }
  },

  //上一题
  lastQuestion: function () {
    var that = this;
    this.setData({
      index: that.data.index - 1,
      bcA: that.data.bc_default,
      bcB: that.data.bc_default,
      bcC: that.data.bc_default,
      bcD: that.data.bc_default,
      bcE: that.data.bc_default,
      inputValue:that.data.fillAnswer[this.data.index-1]
    });
    var select = that.data.selectList[that.data.index];
    // TODO 多选题遍历
    console.log("select",select);
    if (select && select != '' ) {
      for(let i = 0;i < select.length;i++)
      {
        switch (select[i]) {
          case 'A': that.setData({ bcA: that.data.bc_select }); break;
          case 'B': that.setData({ bcB: that.data.bc_select }); break;
          case 'C': that.setData({ bcC: that.data.bc_select }); break;
          case 'D': that.setData({ bcD: that.data.bc_select }); break;
          case 'E': that.setData({ bcE: that.data.bc_select }); break;
        }
      }
    }
  },
  //选择答案
  btnOpClick: function (e: any) {
    var that = this;
    var select = e.currentTarget.id;
    var selectAnswer;
    var index = that.data.index;
    switch (select) {
      case 'A': selectAnswer = that.data.questionList[index]["select1"][0]; break;
      case 'B': selectAnswer = that.data.questionList[index]["select1"][1]; break;
      case 'C': selectAnswer = that.data.questionList[index]["select1"][2]; break;
      case 'D': selectAnswer = that.data.questionList[index]["select1"][3]; break;
      case 'E': selectAnswer = that.data.questionList[index]["select1"][4]; break;
    }
    if (that.data.questionList[index]["question_type"] == "多选题") {
      if (that.data.selectList[index] == null)
        that.data.selectList[index] = "";
      if (that.data.selectList[index].search(select) == -1)
        that.data.selectList[index] += select;
      else {
        let selected = that.data.selectList[index];
        let split_str = selected.split(select);
        selected = split_str.join("");
        that.data.selectList[index] = selected;
      }

      that.data.answerList[index] = this.judgeAnswer(that.data.questionList[index]["ans"], that.data.selectList[index]) ? true : false;
    }
    else {
      that.data.selectList[index] = select;
      that.data.answerList[index] = (that.data.questionList[index]["ans"] == selectAnswer) ? true : false;
    }
    if (index != that.data.questionList.length - 1 && that.data.questionList[index]["question_type"] != "多选题")
      that.nextQuestion();
    else {
      if (that.data.questionList[index]["question_type"] != "多选题") {
        this.setData({
          bcA: that.data.bc_default,
          bcB: that.data.bc_default,
          bcC: that.data.bc_default,
          bcD: that.data.bc_default,
          bcE: that.data.bc_default,
        });
      }
      switch (select) {
        case 'A':
          if (that.data.bcA == that.data.bc_default || that.data.bcA == "")
            that.setData({ bcA: that.data.bc_select });
          else
            that.setData({ bcA: that.data.bc_default });
          break;
        case 'B':
          if (that.data.bcB == that.data.bc_default || that.data.bcB == "")
            that.setData({ bcB: that.data.bc_select });
          else
            that.setData({ bcB: that.data.bc_default });
          break;
        case 'C':
          if (that.data.bcC == that.data.bc_default || that.data.bcC == "")
            that.setData({ bcC: that.data.bc_select });
          else
            that.setData({ bcC: that.data.bc_default });
          break;
        case 'D':
          if (that.data.bcD == that.data.bc_default || that.data.bcD == "")
            that.setData({ bcD: that.data.bc_select });
          else
            that.setData({ bcD: that.data.bc_default });
          break;
        case 'E':
          if (that.data.bcE == that.data.bc_default || that.data.bcE == "")
            that.setData({ bcE: that.data.bc_select });
          else
            that.setData({ bcA: that.data.bc_default });
          break;
      }
    }
  },
  //判断答案
  judgeAnswer: function (stra: any, strb: any) {
    for (let i = 0; i < stra.length; i++) {
      let tmpret = false;
      for (let j = 0; j < strb.length; j++) {
        if (stra[i] == strb[j]) {
          tmpret = true;
          break;
        }
      }
      if (tmpret == false)
        return false;
    }
    return true;
  },
  //填空题输入
  titleInput:function(e: any){
    let value = e.detail.value;
    let index=e.target.id;
    let currentAnswer=this.data.fillAnswer[this.data.index];
    if(currentAnswer==null)currentAnswer=[];
    currentAnswer[parseInt(index,10)]=value;
    this.data.fillAnswer[this.data.index]=currentAnswer;
    let newAnswer=this.data.fillAnswer;
    this.data.questionList[this.data.index].fillAnswer=currentAnswer;
    this.setData({
      fillAnswer:newAnswer,
    })
    this.judgeFill(this.data.index)
  },
  //判断填空题对错
  //判断填空题对错
  //@Param currentIndex 当前题目的索引index
  judgeFill:function(currentIndex: any){
    var that =this;
    let question=that.data.questionList[currentIndex];
    let dbAnswer=question.select1;
    let fillAnswer=that.data.fillAnswer[currentIndex];
    let tag=true;//默认正确
    for (let index = 0; index < fillAnswer.length; index++) {
      const element = fillAnswer[index];
      if(element=='')return
      else{
        if(element==dbAnswer[index])continue;
        else {
          tag=false;break;
        }
      }
    }
    that.data.answerList[currentIndex]=tag;
  },
  //提交
  submit: function () {
    var that = this;
    var list = that.data.answerList;
    // console.log(list);
    var rightNum = 0;  //记录对的题目
    var score: any;
    var num = 0;    //记录答题数
    let question=that.data.questionList;
    for (let index = 0; index < question.length; index++) {
      const element = question[index];
      if(element.fillAnswer==null)element.fillAnswer=[]
    }
    list.forEach(function (item: any, index: any) {
      if (item)
        rightNum++;
      num++;
    })
    score = rightNum * 10;  //计算得分
    if (num != that.data.questionList.length)
      wx.showModal({
        title: '确定提交吗',
        content: '有题目未完成，确定提交吗',
        success: function (res) {
          if (res.confirm) {
            var selectList = that.data.selectList;
            that.setData({
              anwserCompletion: true,
              rightNum: rightNum,
              score: score,
              selectList: selectList,
            })
            that.submitRecord();
            // that.updateRank();
          } else if (res.cancel) {
            return;
          }
        }
      })
    else {
      var selectList = that.data.selectList;
      that.setData({
        anwserCompletion: true,
        rightNum: rightNum,
        score: score,
        selectList: selectList,
      })
      that.submitRecord();
      // that.updateRank();
    }
  },
  submitRecord: function () {
    var that = this;
    let openid = wx.getStorageSync('user').openid || -1;
    wx.request({
      url: app.globalData.url2 + 'submitRecord',
      method: 'GET',
      data: {
        userId: openid,
        rightNum: that.data.rightNum,
        score: that.data.score,
        questionList: that.data.questionList,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  //返回前提示
  turnBackPageWithLoss: function(){
    msg.Modal("题目尚未提交，确认退出？","确认返回",true)
    .then((res: any) =>{
      if(res.confirm){
        this.turnBackPage();
      }
    })
  },
  //返回
  turnBackPage: function(){
    wx.navigateBack({
      delta: 1,
    })
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