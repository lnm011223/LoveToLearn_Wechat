export default {
  // 成功提示
  Success: (text: string, duration?: number) => {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title: text,
        duration: duration || 1000,
        icon: "success",
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  // 失败警示
  Fail: (text: string, duration?: number) => {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title: text,
        icon: 'error',
        duration: duration || 1000,
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  // 加载
  Loading: (title: string = '加载中') => {
    wx.showLoading({
      title: title
    })
  },
  // 隐藏加载
  HideLoading: () => {
    wx.hideLoading();
  },
  // 对话框
  Modal: (text: string, title: string = '提示', showCancel: boolean = false, editable: boolean = false, placeholder: string = '在此输入') => {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: showCancel, 
        editable: editable,
        placeholderText: placeholder
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  // 选项框
  ActionSheet: (menu: Array<string>, title: string = '') => {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: menu,
        alertText: title,
        success: (res: {tapIndex: any}) => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      })
    })
  },
}