App({
	onLaunch: function () {
		const that = this;
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力')
		} else {
			wx.cloud.init({
				env: 'mengjia-2f984a',
				traceUser: true,
			});
			/**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
			wx.getNetworkType({
				success(res) {
					const networkType = res.networkType;
					if (networkType === 'none') {
						that.globalData.isConnected = false
						wx.showToast({
							title: '网断了哟佳佳',
							icon: 'loading',
							duration: 2000
						});
						that.goStartIndexPage()
					}
				}
			});
			/**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
			wx.onNetworkStatusChange(function (res) {
				if (!res.isConnected) {
					that.globalData.isConnected = false
					wx.showToast({
						title: '网断了哟佳佳',
						icon: 'loading',
						duration: 2000,
						complete: function () {
							that.goStartIndexPage()
						}
					})
				} else {
					that.globalData.isConnected = true
					wx.hideToast();
				}
			});
		}
		this.globalData = {
			isConnected: true
		}
	},
	goStartIndexPage: function () {
		setTimeout(function () {
			wx.redirectTo({
				url: "/pages/unnet/unnet"
			})
		}, 1000)
	}
})