
import Dialog from 'vant-weapp/dialog/dialog';
import Toast from 'vant-weapp/toast/toast';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		animationData: {}
	},
	/**
  * 日历是否被打开
  */
	bindselect(e) {
		this.setData({
			isOpen:e.detail.ischeck
		});

	},
  /**
   * 获取选择日期
   */
	bindgetdate(e) {
		console.log(e.detail);
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		const data = JSON.parse(options.data);
		const { startDateChuo, endDateChuo } = data;
		const day = parseInt((endDateChuo - startDateChuo) / (1000 * 60 * 60 * 24));
		this.setData({
			data,
			day,
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

	// 点击打卡
	onClick:function () {
		Dialog.confirm({
			title: '别耍小聪明哟',
			message: '亲爱的佳佳同学，您确定已经完成了目标了嘛~现在后悔还来得及哦~^_^'
		}).then(() => {
			// on confirm
			const { _id } = this.data.data;
			const db = wx.cloud.database();
			const _ = db.command;
			db.collection('target').doc(_id).update({
				data: {
					progress:1
				},
				success(res) {
					Toast.success('佳佳棒棒！加油努力💪');
				}
			})

		}).catch(() => {
			// on cancel
		});
	},

	// 删除目标
	onRemove:function () {
		Dialog.confirm({
			title: '删除目标',
			message: '亲爱的佳佳同学，删除目标后数据该目标数据将被清空哦！'
		}).then(() => {
			// on confirm
			const { _id } = this.data.data;
			const db = wx.cloud.database();
			db.collection('target').doc(_id).remove()
				.then(function () {
					Toast.success('目标已被删除');
					setTimeout(function () {
						wx.switchTab({
							url: '/pages/index/index'
						})
					},1500);
				})
				.catch()

		}).catch(() => {
			// on cancel
		});
	}
})