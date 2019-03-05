import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
VantComponent({
  classes: ['num-class', 'desc-class', 'thumb-class', 'title-class', 'price-class', 'origin-price-class'],
  mixins: [link],
  props: {
		item:Object,
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: String,
    thumbMode: {
      type: String,
      value: 'aspectFit'
    },
    currency: {
      type: String,
      value: '¥'
    }
  },
  methods: {
    onClickThumb: function onClickThumb() {
      this.jumpLink('thumbLink');
    },
		onClick:function (e) {
			const data = JSON.stringify(e.currentTarget.dataset.item);
			wx.navigateTo({
				url: '/pages/detail/detail?data=' + data + '',
			})
			
		}
  }
});