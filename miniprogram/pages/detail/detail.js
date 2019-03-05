// pages/detail/detail.js
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
		const data = JSON.parse(options.data);
		this.setData({
			data,
		});
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
		const { data } = this.data;
		const { detail } = e;
		var that = this;

		wx.showModal({
			title: '提示',
			content: '确定要切换目标动态呀？',
			success: res => {
				if (res.confirm) {
					const db = wx.cloud.database();
					db.collection('target').doc(data._id).update({
						// data 传入需要局部更新的数据
						data: {
							// 表示将 done 字段置为 true
							progress: !data.progress
						}
					})
						.then(() => {
							db.collection('target').where({
								_openid: data._openid
							}).get().then(res => {
								that.setData({
									data:res.data
								});
							})
						})
						.catch(console.error)
				}
			}
		});
	}
})