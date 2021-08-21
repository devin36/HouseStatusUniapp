<template>
	<view class="table">
		<view class="cCon">
			<view class="outInBlock">
				<view class="title">
					{{headerTitle}}
				</view>
				<scroll-view scroll-y="true" scroll-x="true" class="xscoll">
					<view class="time-box">
						<view class="cheader" id="left" :style="{width: leftFixWidth}">
							<view class="left">
								<view class="text"></view>
							</view>
						</view>
						<view class="title" id="title" :style="{left: leftFixWidth}">
							<view class="time-block" v-for="(head,index) in tableHeader" :key="index" :style="headerStyle">
								<slot name="header" :header="head"></slot>
								{{!$scopedSlots.header ? (headerKey ? head[headerKey] : head) : ''}}
							</view>
						</view>
					</view>
					<view class="left" :style="{width: leftFixWidth}">
						<view class="classify">
							<view class="block" v-for="(item,index) in classifyData" :key="index" :style="{height: classifyDom[index] + 'px'}">
								<slot name="classifyItem" :classifyItem="item"></slot>
								{{!$scopedSlots.classifyItem ? (classifyDataKey?item[classifyDataKey]:item) : ''}}
							</view>
						</view>
						<view class="classifyBox">
							<view class="leftbox" :id="getdom(n,item)" v-for="(item,n) in tableContentLeftFixed" :key="n">
								<view class="outInTitle" :style="leftFixStyle">
									<slot name="leftFix" :leftFix="item"></slot>
									{{!$scopedSlots.leftFix ? (leftFixKey?item[leftFixKey]:item) : ''}}
								</view>
							</view>
						</view>
					</view>
					<view class="right-box">
						<view class="right" :style="{'height': domEles[n] + 'px'}" v-for="(item,n) in tableContent" :key="n">
							<view class="bot">
								<view class="infoNum" v-for="(data,i) in item[contentKey]" :key="i" :style="contentStyle">
									<slot name="content" :content="data"></slot>
									{{!$scopedSlots.content ? (unitKey?data[unitKey]:data) : ''}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * table 表格
	 * @description 固定表头和左侧表格组件
	 * @property {Array} tableHeader 头部数据 固定
	 * @property {Array} tableContentLeftFixed 左侧数据 固定
	 * @property {Array} tableContent body部分数据
	 * @property {String} headerKey 当不使用slot修改头部，渲染数据的属性
	 * @property {String} leftFixKey 当不使用slot修改左侧固定栏，渲染数据的属性
	 * @property {String} contentKey 当不使用slot修改body展现数据第一层，渲染数据的属性
	 * @property {String} unitKey 当不使用slot修改body展现数据第二层，渲染数据的属性
	 * @property {String} leftFixWidth 左侧固定列的宽度
	 * @property {String} classify 左侧有分类分级时需要传入用来做大类区分的属性名
	 * @property {Array} classifyData 传入的最左侧大分类数据
	 * @property {String} headerTitle 表格的title
	 * @property {Object} headerStyle 修改表头单元格样式
	 * @property {Object} leftFixStyle 修改左侧固定栏单元格样式
	 * @property {Object} contentStyle 修改内容单元格样式
	 * @example <v-table :tableContentLeftFixed="tableContentLeftFixed" 
						 :tableHeader="tableHeader"
						 :tableContent="tableContent"
						 :classifyData="classifyData"
						 :headerStyle="headerStyle"
						 :headerTitle="headerTitle"
						 leftFixWidth="15%"
						 contentKey="content"
						 unitKey="name"
						 classify="id"
						 classifyDataKey="name">
					<template v-slot:header="{header}">
						<view>{{header.name}}</view>
					</template>
					<template v-slot:leftFix="{leftFix}">
						<view>{{leftFix.name}}</view>
					</template>
					<template v-slot:content="{content}">
						<view>{{content}}</view>
					</template>
					<template v-slot:classifyItem="{classifyItem}">
						<view>{{classifyItem}}</view>
					</template>
				</v-table>
	 */
	export default{
		props: {
			tableHeader:{
				type: Array,
				default: () => []
			},
			tableContentLeftFixed: {
				type: Array,
				default: () => []
			},
			tableContent: {
				type: Array,
				default: () => []
			},
			headerKey: {
				type: String,
				default: null
			},
			leftFixKey: {
				type: String,
				default: null
			},
			contentKey: {
				type: String,
				default: null
			},
			unitKey: {
				type: String,
				default: null
			},
			leftFixWidth: {
				type: String,
				default: '25%'
			},
			classify: {
				type: String,
				default: null
			},
			classifyData: {
				type: Array,
				default: () => []
			},
			headerTitle: {
				type: String,
				default: null
			},
			headerStyle:{
				type: Object,
				default () {
					return {
						minWidth: '100px',
						color: '#333',
						fontSize: '18px',
					}
				}
			},
			leftFixStyle: {
				type: Object,
				default () {
					return {
						minWidth: '100px',
						color: '#333',
						fontSize: '14px',
					}
				}
			},
			contentStyle: {
				type: Object,
				default () {
					return {
						minWidth: '100px',
						color: '#333',
						fontSize: '18px',
					}
				}
			}
		},
		data(){
		    return{
				domEles: {}, 
				domIDs: {},
				classifyDom: {}
			}
		},
		watch:{
			domEles: {
				handler: function(val){
					debugger
					let keysArray = Object.keys(this.domIDs)
					if(!keysArray.length) return
					let num = 1,n = 0,self = this;
					const query = uni.createSelectorQuery().in(this);
					for(let i=0;i<keysArray.length;i++){
						for(let j=1;j<=this.domIDs[keysArray[i]];j++){
							console.log(self.domEles)
							self.classifyDom.hasOwnProperty(i)?self.$set(self.classifyDom,i,self.classifyDom[i]+val[n]):self.$set(self.classifyDom,i,val[n]);
							n++;
						}
					}
				},
				deep: true,
				// immediate: true
			},
			tableContentLeftFixed: {
				handler: function(val){
					debugger
					let self = this;
					let i;
					this.tableContentLeftFixed.forEach((data,index) =>{
						if(i !== data[self.classify]) {
							i = data[self.classify]
							self.$set(self.domIDs,data[self.classify],1)
						}else{
							self.$set(self.domIDs,data[self.classify],self.domIDs[data[self.classify]]+1)
						}
					})
				},
				deep: true,
				// #ifdef H5
				immediate: true
				// #endif
			}
		},
		created() {
			console.log("aaahahhaha" + this);
			
		},
		methods:{
			getdom(n,item){
			    let self = this;
			    this.$nextTick(function(){
			        const query = uni.createSelectorQuery().in(this);
			        query.select('#dom'+n).boundingClientRect(data => {
			            if (data) {
			                self.$set(self.domEles,n,data.height) 
						} else {
			                this.getdom(n)
			            }
			        }).exec();
			    })
			    return 'dom'+n
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table{
		width: 100%;
		height: 100%;
		flex: 1;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		padding: 0 32rpx;
		box-sizing: border-box;
		
		.cCon{
			width: 100%;
			height: 100%;
			flex: 1;
			position: relative;
			z-index: 2;
			.outInBlock{
				display: flex;
				position: relative;
				flex-direction: column;
				z-index: 1;
				height: calc(100% - 40px);
				.title{
					text-align: center;
				}
				.xscoll{
					overflow-x: auto;
					overflow-y: hidden;
					width: 100%;
					top: -80rpx;
					height: 100%;
					flex: 1;
					.time-box{
						height: 40px;
						width: 100%;
						top: 0;
						position: sticky;
						left:0;
						z-index: 18; 
						background: #f5f5f5;
						.cheader{
							width: 25%;
							display: flex;
							position: sticky;
							left: 0;
							z-index: 3;
							border-right: 2rpx solid color(bd1);
							box-sizing: border-box;
							background-color: color(bg);
							.left{
								display: flex;
								align-items: center;
								width: 25%;
								height: 80rpx;
								line-height: 80rpx;
								color: color(th);
								visibility: hidden;
								display: flex;
								.text{
									margin-left: 30rpx;
								}
							}
						}
						.title{
							display: flex;
							justify-content: center;
							align-items: center;
							height: 80rpx;
							line-height: 80rpx;
							position: absolute;
							top: 0;
							left: 25%;
							background-color: color(bg);
							z-index: 1;
							.time-block{
								flex: 1;
								height: 100%;
								min-width: 202rpx;
								box-sizing: border-box;
								display: flex;
								justify-content: center;
								align-items: center;
								color: color(tb);
								border-right: 2rpx solid color(bd2);
								position: relative;
							}
							.timeTip{
								background-color: color(error);
								position: absolute;
								// top: 18rpx;
								right: 0;
								width: 80rpx;
								text-align: center;
								color: #fff;
								//@include font(24);
								z-index: 19;
								top: 9px;
								padding: 0 10rpx;
								border-radius: 40rpx;
								transform: translateX(-50%);
							}
							.moreType{
								width: 340rpx;
								box-sizing: border-box;
								position: absolute;
								top: 70rpx;
								right: -20rpx;
								background-color: color(bg2);
								//@include radius(mini);
								z-index: 4;
								&::after{
									width: 20rpx;
									height: 20rpx;
									transform: rotate(45deg);
									content: '';
									background-color: color(bg2);
									position: absolute;
									top: -10rpx;
									right: 70rpx;
								}
								.optItem{
									width: 100%;
									height: 80rpx;
									line-height: 80rpx;
									text-align: center;
									&:first-child{
										border-bottom: 2rpx solid #eee;
									}
								}
							}
						}
					}
					
					.left{
						width: 25%;
						box-sizing: border-box;
						border-right: 2rpx solid color(bd1);
						z-index: 17;
						// height: 100%;
						position: sticky;
						left: 0;
						float: left;
						display: flex;
						overflow: hidden;
						.classify{
							width: 26px;
							.block{
								letter-spacing: 10rpx;
								background-color: #fff;
								text-align: center;
								vertical-align: middle;
								writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
								writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/ 
								border-bottom: 2rpx solid color(bd1);
								border-right: 2rpx solid color(bd1);
								box-sizing: border-box;
							}
						}
						.classifyBox{
							width: calc(100% - 26px);
							.leftbox{
								padding: 16rpx 32rpx;
								background-color: #fff;
								border-bottom: 2rpx solid color(bd1);
								border-right: 2rpx solid color(bd1);
								box-sizing: border-box;
								.outInTitle{
									//@include font(28);
									color: color(th);
									display: inline;
									white-space: break-spaces;
								}
							}
						}
					}
					
					.switch1{
						top: 100rpx;
						right: 0;
						position: absolute;
					}
					.right-box{
						float: left;
						width: 75%;
						position: relative;
						z-index: 16;
						.right{
							width: 75%;
							// padding-top: 80rpx;
							// margin-bottom: 16rpx;
							.bot{
								height: 100%;
								display: flex;
								justify-content: center;
								align-items: center;
								float: left;
								background-color: color(bg2);
								.infoNum{
									flex: 1;
									height: 100%;
									min-width: 200rpx;
									max-width: 200rpx;
									overflow: hidden;
									text-align: center;
									display: flex;
									position: relative;
									flex-direction: column;
									justify-content: center;
									box-sizing: border-box;
									border-right: 2rpx solid color(bd1);
									border-bottom: 2rpx solid color(bd1);
									view, uni-view, text, uni-text{
										font-size: 36rpx !important;
									}
									.num{
										//@include font(36,700);
										color: color(tb);
										position: relative;
										height: 100%;
										display: flex;
										justify-content: center;
										align-items: center;
										.input{
											border: 0;
											width: 100%;
											height: 100%;
											position: absolute;
											top: 0;
											left: 0;
											z-index: 0;
											background-color: transparent;
										}
									}
									.unit{
										position: absolute;
										bottom: 0;
										right: 5px;
										color: color(ts);
										font-size: 12px;
									}
								}
							}
						}
						.timeMask{
							position: absolute;
							top: -40px;
							left: 0;
							height: 100%;
							width: 50%;
							z-index: 18;
							padding-top: 40px;
							background: rgba(215, 215, 215, 0.1);
							border-right: 1px solid #F05151;
							pointer-events: none;
						}
					}
				}
			}
		}
	}
</style>