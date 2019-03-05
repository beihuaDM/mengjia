// pages/userInfo/userInfo.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					wx.switchTab({
						url: '/pages/index/index'
					})
				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	// 授权用户信息登录
	bindGetUserInfo:function (e) {
		if(e.detail.rawData && e.detail.rawData.length>0) {
			// 用户已经授权登录啦,用户的信息存储至storage
			wx.setStorage({
				key: 'userInfo',
				data: e.detail.userInfo
			})
			// 用户信息存储至数据库
			const db = wx.cloud.database();
			db.collection('userInfo').add({
				// data 字段表示需新增的 JSON 数据
				data: {
					userInfo:e.detail.userInfo
				}
			})
				.then(res => {
					console.log(res)
				})
				.then(() => {
					wx.switchTab({
						url: '/pages/index/index'
					})
				})
				.catch(console.error)
		}
	}
})