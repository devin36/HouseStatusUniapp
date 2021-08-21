<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<a @click="jumpstatus">房态图</a>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				housetunnle: '8b42bca0745dc36e',
				status: 'pages/table/table2?tunnel=8b42bca0745dc36e'
			}
		},
		onLoad() {

		},
		methods: {
			jumpstatus: function(){
				window.location='#/pages/table/table2/?tunnel=8b42bca0745dc36e&date=2021-01'
			}						
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
