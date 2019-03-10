import Dialog from 'vant-weapp/dialog/dialog';
import Toast from 'vant-weapp/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		activeNames:['1'],
		show:true,
		targetName:'',
		startDateChoose:false,
		endDateChoose:false,
		currentDate:'',
		minDate: new Date().getTime(),
		startDate:'',
		startDateChuo: '',
		endDate: '',
		endDateChuo: '',
		expect:'',
		plan:''
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.request({
			url: 'https://apis.juhe.cn/simpleWeather/query',
			method: "GET",
			data: {
				key: "c633cac025ac98c2af7be7401466b721",
				city:"石家庄"
			},
			success: function (res) {
				that.setData({
					weather:res.data.result
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
		var that = this;
		setTimeout(function () {
			that.setData({
				show: false
			});
		}, 3000);
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

	// 输入目标改变
	onTargetChange:function (e) {
		this.setData({
			targetName:e.detail
		});
	},

	// 输入实践步骤改变
	onPlanChange: function (e) {
		this.setData({
			plan: e.detail
		});
	},

	// 输入预期效果改变
	onExpectChange: function (e) {
		this.setData({
			expect: e.detail
		});
	},

	// 点击开始时间展示时间选择控件
	startDateChoose:function () {
		this.setData({
			startDateChoose:true
		});
	},

	// 点击结束时间展示时间选择控件
	endDateChoose: function () {
		this.setData({
			endDateChoose: true
		});
	},
	

	// 时间选择控件蒙层关闭
	onClose:function () {
		this.setData({
			startDateChoose:false,
			endDateChoose: false
		});
	},

	// 开始时间选择确认
	onStartConfirmDate:function (e) {
		  const dateFormatter = function(nows) {
			if (!nows) return ''
			var now = new Date(nows)
			var year = now.getFullYear()

			var month = now.getMonth() + 1
			month = checkAddZone(month)

			var date = now.getDate()
			date = checkAddZone(date)
			return year + '-' + month + '-' + date
		}

		function checkAddZone(num) {
			return num < 10 ? '0' + num.toString() : num
		}

		var startDate = dateFormatter(e.detail);
		this.setData({
			startDateChuo:e.detail,
			startDate:startDate
		});
		this.onClose();
	},
// 结束时间选择确认
	onEndConfirmDate: function (e) {
		const dateFormatter = function (nows) {
			if (!nows) return ''
			var now = new Date(nows)
			var year = now.getFullYear()

			var month = now.getMonth() + 1
			month = checkAddZone(month)

			var date = now.getDate()
			date = checkAddZone(date)
			return year + '-' + month + '-' + date
		}

		function checkAddZone(num) {
			return num < 10 ? '0' + num.toString() : num
		}

		var endDate = dateFormatter(e.detail);
		this.setData({
			endDateChuo: e.detail,
			endDate: endDate
		});
		this.onClose();
	},

	// 点击确定建立目标
	submit:function () {
		const { 
		 targetName,
		 startDate,
		 startDateChuo,
		 endDate,
		 endDateChuo,
		 expect,
		 plan
		} = this.data;
		// 内容为空检验
		if(!targetName) {
			Dialog.alert({
				message: '张女士你是在逗我吗？目标名称都没填呀！你可真是个小机灵鬼'
			});
		}
		else if (!(startDate && endDate)) {
			Dialog.alert({
				message: '咱至少把时间周期选全了吧/(ㄒoㄒ)/~~'
			})
		}
		else if (!expect) {
			Dialog.alert({
				message: '听说心里期盼着自己什么样自己就会是什么样子哦！说人话：赶紧把预期效果填上'
			})
		}
		else {
			if ((startDateChuo - endDateChuo) > 0) {
				Dialog.alert({
					message: '佳佳，开始时间和结束时间是不是选反了呀'
				})
			} else {
				if(!plan) {
					Dialog.confirm({
						title: '建立目标',
						message: '哼~实践步骤没有写被我发现了吧。不过嘛，就让你通过咯，请张女士点击确认来建立自己的目标哦！'
					}).then(() => {
						// on confirm  数据存储至数据库
						const db = wx.cloud.database();
						db.collection('target').add({
							// data 字段表示需新增的 JSON 数据
							data: {
								targetName,
								startDate,
								startDateChuo,
								endDate,
								endDateChuo,
								expect,
								plan,
								progress:0,
								selected:[]
							}
						})
							.then(res => {
								Toast.success('建立目标成功啦！张女士加油加油！');
							})
							.catch(console.error)

					}).catch(() => {
						// on cancel
					});
				} else {
					Dialog.confirm({
						title: '建立目标',
						message: '呀！请张女士点击确认来建立自己的目标吧！'
					}).then(() => {
						// on confirm  把上面的代码粘贴一遍，数据存储
						const db = wx.cloud.database();
						db.collection('target').add({
							// data 字段表示需新增的 JSON 数据
							data: {
								targetName,
								startDate,
								startDateChuo,
								endDate,
								endDateChuo,
								expect,
								plan,
								progress: 0,
								selected:[]
							}
						})
							.then(res => {
								Toast.success('建立目标成功啦！张女士加油加油！');
							})
							.catch(console.error)

					}).catch(() => {
						// on cancel
					});
				}
			}
		}
		
	},

	// 天气预报下拉
	onWeatherChange:function(event) {
		this.setData({
			activeNames: event.detail
		});
	}
})