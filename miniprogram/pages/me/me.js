// pages/me/me.js

const classify = require('./constant.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.getUserInfo({
			success(res) {
				that.setData({
					classify:classify,
					userInfo:res.userInfo
				});
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

	// 点击每一项
	onClick:function (e) {
		const db = wx.cloud.database()
		const item = e.currentTarget.dataset.item;
		if(item.name === "全部目标") {
			db.collection('target')
				.get()
				.then(res => {
					const data = JSON.stringify(res.data);
					wx.navigateTo({
						url: '/pages/block/block?data=' + data + '',
					})
				})
				.catch(err => {
					console.error(err)
				})
		}
		else if (item.name === "已完成目标") {
			db.collection('target')
				.where({
					progress: 1,
				})
				.get()
				.then(res => {
					const data = JSON.stringify(res.data);
					wx.navigateTo({
						url: '/pages/block/block?data=' + data + '',
					})
				})
				.catch(err => {
					console.error(err)
				})

				
		}
		else if (item.name === "未完成目标") {
			db.collection('target')
				.where({
					progress: 0,
				})
				.get()
				.then(res => {
					const data = JSON.stringify(res.data);
					wx.navigateTo({
						url: '/pages/block/block?data=' + data + '',
					})
				})
				.catch(err => {
					console.error(err)
				})
		} else {
			wx.navigateTo({
				url: '/pages/contact/contact'
			})
		}
	}
})