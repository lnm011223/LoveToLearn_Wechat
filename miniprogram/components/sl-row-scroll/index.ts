import { VerifyCourseApply } from "../../utils/data/apis";
import { event } from "../../utils/interface";
import msg from "../../utils/model/msg";

// components/sl-row-scroll/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
    },
    title: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图标
    icon: {
      "热门活动": "/svg/hot.svg",
      "历史回顾": "/svg/history.svg",
    },
    // 主题色
    color: {
      "热门活动": "#ffbb00aa",
      "历史回顾": "#0066ff66",
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @function 跳转课程详情
     */
    toCourseDetail: function(e: event) {
      const id: any = e.currentTarget.dataset.id;
      const isOnly = e.currentTarget.dataset.type;
      const id_flag: string = wx.getStorageSync('id_flag'); // 用户身份
      if(isOnly && id_flag != 'teacher') {
        // 有些课程需要绑定学校才可以进入
        msg.Modal('', '输入活动密码', true, true, '密码')
        .then((res: any) => {
          if(!res.confirm) {
            return;
          }
          const password = res.content;
          msg.Loading();
          VerifyCourseApply({
            courseid: id,
            password: password
          })
          .then((res: any) => {
            msg.HideLoading();
            if(res.data.data.msg != '密码正确') {
              msg.Fail('密码错误');
              return;
            }
            msg.Success('密码正确');
            setTimeout(() => {
              wx.navigateTo({
                url: `../../pages/detail/course/index?id=${id}`,
              })
            }, 250)
          }) // 验证密码
          .catch(() => {
            msg.HideLoading();
            msg.Fail('网络错误');
          })
        })
        return;
      }
      wx.navigateTo({
        url: `../../pages/detail/course/index?id=${id}`
      })
    },
  }
})
