// pages/contact/contact.js
import Dialog from 'vant-weapp/dialog/dialog';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		text:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
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

	onChange:function (e) {
		this.setData({
			text:e.detail.value
		});
	},
	onClick:function() {
		const { text } = this.data;
		// 不为空校验
		if(!text) {
			Dialog.alert({
				message: '张女士你好皮呀，什么话都不说就想发给我，哼！'
			})
			return ;
		} else {
			const db = wx.cloud.database()
			db.collection('content').add({
				data:{
					text:text
				}
			}).then(res => {
				Dialog.alert({
					message: '报告张女士，窦先生已经收到您的消息，但是他不一定时刻在关注，可是适当的提醒他一下下哈，(*^__^*) 嘻嘻……'
				})
			})
		}


	}
})