//index.js
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imageURL:'/images/WechatIMG5.jpeg',
		search:'',
		joke:[],
		current:0,
		active:0,
		currentIndex:0,
		allTarget:[],
		finishTarget:[],
		ingTarget:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		var tmp = Date.parse( new Date() ).toString();
  	tmp = tmp.substr(0,10);
		wx.request({
			url: 'https://v.juhe.cn/joke/content/list.php',
			method:"GET",
			data:{
				key:"163f49235d889954094b5f80fc0602e3",
				sort:"desc",
				time:tmp
			},
			success:function (res) {
				that.setData({
					joke:res.data.result.data
				});
			}	
		})

		const db = wx.cloud.database()
		db.collection('target')
			.get()
			.then(res => {
				that.setData({
					allTarget:res.data
				});
			})
			.catch(err => {
				console.error(err)
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
		const that = this;
		const { currentIndex } = this.data;
		const db = wx.cloud.database()
		console.log(typeof currentIndex);
		/**
		 * index  0:全部目标  1:已完成  2:进行中
		 * 根据index不同从数据库去检索不同的数据
		 * 
		 * progress: 0 进行中  1 已完成  
		 */
		if (currentIndex === 0) {
			db.collection('target')
				.get()
				.then(res => {
					that.setData({
						allTarget: res.data
					});
				})
				.catch(err => {
					console.error(err)
				})
		}
		else if (currentIndex === 1) {
			db.collection('target')
				.where({
					progress: 1,
				})
				.get()
				.then(res => {
					that.setData({
						finishTarget: res.data
					});
				})
				.catch(err => {
					console.error(err)
				})
		} else {
			db.collection('target')
				.where({
					progress: 0,
				})
				.get()
				.then(res => {
					that.setData({
						ingTarget: res.data
					});
				})
				.catch(err => {
					console.error(err)
				})
		}
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

	// 改变搜索框内容
	onChange: function (e) {
		this.setData({
			search:e.detail
		});
	},

	// 确定搜索时触发
	onSearch:function () {
		const { search } = this.data;
		const db = wx.cloud.database()
		db.collection('target')
			.where({
				targetName: new db.RegExp({
					regexp: search,
					options: 'i',
				})
			})
			.get()
			.then(res => {
				const data = JSON.stringify(res.data);
				wx.navigateTo({
					url: '/pages/block/block?data='+data+'',
				})
			})
			.catch(err => {
				console.error(err)
			})

		
	},

	// 取消搜索搜索时触发
	onCancel:function () {
		this.setData({
			search:''
		});
	},

	// 切换上一个笑话
	lastJoke: function () {
		var that = this;
		const { current } = this.data;
		if(current === 0) { 
			that.setData({
				current:19
			});
		} else {
			that.setData({
				current:current-1
			});
		}
	},

	// 切换下一个笑话
	nextJoke: function () {
		var that = this;
		const { current } = this.data;
		if (current === 19) {
			that.setData({
				current: 0
			});
		} else {
			that.setData({
				current: current + 1
			});
		}
	},

	// 切换目标Tab
	onTabChange: function (e) {
		var that = this;
		const { index } = e.detail;
		that.setData({
			currentIndex:index
		});
		const db = wx.cloud.database()
		console.log(typeof index);
		/**
		 * index  0:全部目标  1:已完成  2:进行中
		 * 根据index不同从数据库去检索不同的数据
		 * 
		 * progress: 0 进行中  1 已完成  
		 */
		if(index === 0) {
			db.collection('target')
				.get()
				.then(res => {
					that.setData({
						allTarget: res.data
					});
				})
				.catch(err => {
					console.error(err)
				})
		}
		else if(index === 1) {
			db.collection('target')
				.where({
					progress: 1, 
				})
				.get()
				.then(res => {
					that.setData({
						finishTarget: res.data
					});
				})
				.catch(err => {
					console.error(err)
				})
		} else {
			db.collection('target')
				.where({
					progress: 0,
				})
				.get()
				.then(res => {
					that.setData({
						ingTarget: res.data
					});
				})
				.catch(err => {
					console.error(err)
				})
		}
	}
})