//获取应用实例
var app = getApp();
Page({

	/**
	 * 去往主页面
	 */
	goToIndex: function () {
		if (app.globalData.isConnected) {
			wx.switchTab({
				url: '/pages/index/index',
			});
		} else {
			wx.showToast({
				title: '没网呀佳佳',
				icon: 'none',
			})
		}
	},
})