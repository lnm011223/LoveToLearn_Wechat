import { DropRecord, Refund, TeacherCancelApply, UpdateOneOrder } from "../../utils/data/apis";
import { event } from "../../utils/interface";
import msg from "../../utils/model/msg";

let refundId: any = ''; // 触发退款的订单号
// components/sl-apply-ceil/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
    },
    id_flag: {
      type: String,
      value: 'student'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cancelContract: [
      '活动开始前1天退款订单总额的0%',
      '活动开始前2天退款订单总额的50%',
      '活动开始前3天退款订单总额的70%'
    ], // 退款政策
    actionSheetHide: true, // 取消条款弹窗
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 删除订单记录
     */
    toDelete: function(e: event) {
      const id: any = e.currentTarget.dataset.id;
      const status: any = e.currentTarget.dataset.type;
      // 更新订单信息
      // 删除确认
      msg.Modal('是否删除该记录', '删除订单', true)
      .then((res: any) => {
        if(res.confirm) {
          // 确定删除
          if(status == '2' && this.data.id_flag != 'teacher') {
            UpdateOneOrder({
              id: id,
              payState: '支付失败',
              status: '1',
            })
          }
          DropRecord({
            id: id,
            modelName: this.data.id_flag == 'teacher' ? 'teaSignList' : 'SignList',
          }) // 逻辑删除
          .then((res: any) => {
            if(res.data.data == '删除失败') {
              msg.Fail('删除失败');
            }
            else {
              msg.Success('删除成功');
              this.triggerEvent('flesh'); // 刷新页面
            }
          })
          .catch(() => {
            msg.Fail('删除失败');
          })
        }
      })
    },
    /**
     * @function 导师取消报名
     */
    teacherToCancel: function(e: event) {
      msg.Modal('确认取消该报名吗', '取消确认', true)
      .then((res: any) => {
        if(res.confirm) {
          msg.Loading();
          const orderid: any = e.currentTarget.dataset.id;
          console.log(orderid);
          TeacherCancelApply({
            orderid: orderid
          })
          .then((res: any) => {
            msg.HideLoading();
            if(res.data == '修改成功') {
              msg.Success('取消成功');
              const that = this;
              setTimeout(() => {
                that.triggerEvent('flesh'); // 刷新页面
              }, 500)
            }
            else {
              msg.Fail('取消失败');
            }
          })
          .catch((err: any) => {
            console.log(err);
            msg.HideLoading();
            msg.Fail('请求超时');
          })
        }
      })
    },
    /**
     * @function 展示取消条款
     */
    showCancelContract: function() {
      this.setData({
        actionSheetHide: false,
      })
    },
    /**
     * @function 折叠取消条款
     */
    foldCancelContract: function(e: event) {
      if(this.data.actionSheetHide) {
        return;
      }
      const id = e.currentTarget.dataset.id;
      if(id == 'cancel') {
        this.setData({
          actionSheetHide: true,
        })
        return;
      }
      // 确认退款
      msg.Loading();
      Refund({
        lowOrderId: refundId
      })
      .then((res: any) => {
        msg.HideLoading();
        const message = res.data.data.msg;
        if(message == '退款申请成功') {
          msg.Modal('退款申请成功', '申请成功');
        }
        else {
          msg.Modal('退款申请失败', '申请失败');
        }
        // 通信刷新
        this.triggerEvent('flesh');
      })
      .catch(err => {
        msg.HideLoading();
        msg.Modal('退款申请失败', '申请失败');
      })
      this.setData({
        actionSheetHide: true,
      })
    },
    /**
     * @function 继续报名
     */
    toContinue: function() {
      setTimeout(() => {
        wx.switchTab({
          url: '../../course/index'
        })
      }, 100)
    },
    /**
     * @function 退款
     */
    refund: function(e: event) {
      refundId = e.currentTarget.dataset.id;
      this.showCancelContract();
    },
    /**
     * @function 跳转订单确认页面
     */
    toOrderConfirm: function(e: event) {
      const orderid = e.currentTarget.dataset.id;
      const courseid = e.currentTarget.dataset.type;
      const user = wx.getStorageSync('user');
      if(orderid && courseid && user) {
        this.triggerEvent('topay', {
          orderid: orderid,
          courseid: courseid,
          userInfo: user
        })
      }
    },
    /**
     * @function 查看详情
     */
    getDetail: function(e: event) {
      const id: any = e.currentTarget.dataset.id;
      this.triggerEvent('todetail', {id, id_flag: this.data.id_flag});
    },
  }
})


