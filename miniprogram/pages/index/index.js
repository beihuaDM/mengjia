//index.js
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		search:'',
		joke:[],
		current:0,
		active:1
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

	// 改变搜索框内容
	onChange: function (e) {
		this.setData({
			search:e.detail
		});
	},

	// 确定搜索时触发
	onSearch:function () {
		const { search } = this.data;
		console.log(search);
		
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
		console.log(index);
		/**
		 * index  0:全部目标  1:已完成  2:进行中
		 * 根据index不同从数据库去检索不同的数据
		 */
	}
})