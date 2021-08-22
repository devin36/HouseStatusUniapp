<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view :data="tableData" :change:data="renderView.updateData" id="tableTemplate">
		</view>
		<!-- <view :header="tableHeader" :change:header="renderView.updateHeader" id="tableHeader">
		</view> -->
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import houseStatusApi from "@/src/utils/service/housestatus-service.js";
	import md5 from "@/src/utils/md5.js";
	
	var t;
	var order; //升降序
	var prop; //排序列
	export default {
		data() {
			return {
				tableData: [],
				statusMap: {"0":"空","1":"满房"},
			}
		},
		onUnload() {},
		onLoad(option) {
			t = this;
			console.log('表格数据请异步加载，否则无法显示');
			setTimeout(function() {
				// t.tableHeader = [
				// 	{"name":"房间1", "value":"房间1status"},
				// 	{"name":"房间2", "value":"房间2status"},
				// ],
				// t.tableData = {"data":[
				// 			   {"date":"2021/8/1",
				// 			   "房间1status":"1",
				// 			   "房间1":"房间1",
				// 			   "房间2status":"1",
				// 			   "房间2":"房间1",},
							   
				// 			   {"date":"2021/8/2",
				// 			   "房间1status":"1",
				// 			   "房间1":"房间1",
				// 			   "房间2status":"0",
				// 			   "房间2":"房间2",},	
							   
				// 			  {"date":"2021/8/3",
				// 			  "房间1status":"1",
				// 			  "房间1":"房间1",
				// 			  "房间2status":"2",
				// 			  "房间2":"房间2",},	
				// 		   ],
				// 		   "header":[
				// 					{"name":"房间1", "value":"房间1status"},
				// 					{"name":"房间2", "value":"房间2status"},
				// 					{"name":"房间1", "value":"房间1status"},
				// 					{"name":"房间2", "value":"房间2status"},
				// 					]}
					// var md5str = "021fb57e6a3b163a";
					// var md5str = "8b42bca0745dc36e";
					var md5str = option.tunnel;
					var date = "2021-08-01 00:00:00 - 2021-08-22 00:00:00";
					var data = {
						'Tunnel':md5str,
						'DateScope':date,
					}
					data = JSON.stringify(data)
					houseStatusApi.houseStatusList(data).then(
															data => {
																console.log(JSON.parse(data.data.Data));
																t.tableData = JSON.parse(data.data.Data);
															 // if (!data) {
															 //  console.log(data.Message);
															 //  return;
															 // }
															 // if (data.Tag==1) {
															 //  console.log("登录成功!");  
															 // }
															},
															err => {
															}
										                  );															
				},
				1000)
		},
		
		 /* 监听table数据对象 */
		watch: {
		    tableData(val) {
		      this.doLayout();
		    }
		  },
	
		methods: {
			receiveMsg(params) {
				console.log(params)
				uni.showToast({
					title: JSON.stringify(params),
				})
			},
			clickCell: function(params) {
				console.log(params)
				uni.showToast({
					title: params.row[params.column.property].toString(),
					icon: "none"
				})
			},
			clickIcon: function() {
				uni.showToast({
					title: '点击了Icon',
					icon: "none"
				})
			},
			sort: function(column) {
				prop = column.prop;
				order = column.order;
				sort()
			},
			
			getHouseStatus() {
			   let date = "2021/01/02"; 
			   //let time = "11:22:33";
			   houseStatusApi.houseStatusList(date, time).then(data => {
				if (data.code != 0) {
				 console.log("返回成功", data);
				 return;
				}
				t.tableData = data.body;
				// if (isCollect == 1) {
				//  this.$toast("取消成功");
				// } else {
				//  this.$toast("收藏成功");
				// }
			   });
			}
			
		}
	}

	function sort() { //排序
		if (!t.tableData || t.tableData.length == 0) {
			return;
		}
		var org_data = t.tableData;
		t.tableData = [];
		setTimeout(function() {
			var n = org_data.length;
			for (var i = 0; i < n - 1; i++) {
				for (var j = i + 1; j < n; j++) {
					if ((order == "ascending" && convert(org_data[i][prop]) >
							convert(
								org_data[j][prop])) || (order == "descending" && convert(org_data[j][prop]) > convert(org_data[i][prop]))) {
						org_data = swap(org_data, i, j);
					}
				}
			}
			for (var i = 0; i < n; i++) {
				org_data[i].sort_id = i + 1;
			}
			t.tableData = org_data;
			console.log(org_data)
		}, 1000);
	}

	function convert(a) {
		if (typeof a == 'string') {
			if (a.indexOf("%") > -1) {
				a = parseFloat(a.replace("%", ""));
			} else {
				if (a.indexOf("-") > -1) {
					a = 0;
				}
			}
		}
		return a;
	}

	function swap(org_data, i, j) {
		var temp = org_data[i];
		org_data[i] = org_data[j];
		org_data[j] = temp;
		return org_data;
	}
</script>

//renderjs的教程请看官方文档https://uniapp.dcloud.io/frame?id=renderjs
<script module="renderView" lang="renderjs">
	var vm = null;
	var t;
	export default {
		mounted() {
			t = this;
			var tableTemplate = document.getElementById('tableTemplate');
			//表格模板的教程请看官方文档https://element.eleme.cn/#/zh-CN/component/table
			tableTemplate.innerHTML =
				`
			<div id="vueCtrl" v-cloak>
				<template>
					<el-table :data="tableData.data" border stripe :height="tableHeight" @cell-click="clickCell" @sort-change="sortChange"  :default-sort="{prop: 'count', order: 'descending'}" ref="table">
						<el-table-column fixed width="150" prop="date">
							<template slot="header" slot-scope="scope">
							        <i class="el-icon-time"></i>
									<span>adfadsfasdf</span>
							</template>
						</el-table-column>
						<el-table-column v-for="item in tableData.header" :label="item.name" :prop="item.value">
						</el-table-column>
					</el-table>
				</template>
			</div>`;

			var script = document.createElement('script');
			script.src = 'static/js/vue.js';
			script.onload = this.initElement.bind(this);
			document.head.appendChild(script);
		},
		methods: {
			initElement() {
				//加载element js
				var script = document.createElement('script');
				script.src = 'static/js/element.js';
				script.onload = this.initVue.bind(this);//js加载完毕要执行的方法
				document.head.appendChild(script);
				//加载element css
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = 'static/css/element.css';
				document.head.appendChild(link);
				//加载自定义样式
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = 'static/css/element_table.css';
				document.head.appendChild(link);
			},
			initVue() {
				vm = new Vue({
					el: '#vueCtrl',
					data: {
						tableData: [],
						tableHeight: window.screen.height - 110 //表格高度，需要指定
					},
					watch: {
						tableData(val) {
						      this.doLayout();
						    }
					},
					methods: {
						formatterNum: function(row, column) {
							if (row[column.property]) {
								return vm.getLocaleString(row[column.property]);
							} else {
								return 0;
							}
						},
						getLocaleString(num) { //千分位逗号
							var reg = /\d{1,3}(?=(\d{3})+$)/g;
							return (num + '').replace(reg, '$&,');
						},
						sortChange: function(column) {
							t.$ownerInstance.callMethod('sort', column)
						},
						clickCell: function(row, column, cell, event) {
							t.$ownerInstance.callMethod('clickCell', {
								row: row,
								column: column,
								cell: cell,
							})
						},
						clickIcon: function(event) {
							t.$ownerInstance.callMethod('clickIcon', {})
						},
						doLayout(){
							let that = this;
							this.$nextTick(() => {
									that.$refs.table.doLayout()
							})
						}
					}
				});
				this.$ownerInstance.callMethod('receiveMsg', {
					msg: '初始化成功'
				})
			},
			updateData(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				vm.tableData = newValue;
			},			
		}
	}

</script>


<style>
	.el-table {
		color: #757575;
	}

	.el-table__sripted {
		background-color: rgb(223, 242, 240);
	}

	.el-table--striped .el-table__body tr:nth-child(2n) td {
		background: rgb(223, 242, 240);
	}

	.el-table th>.cell {
		line-height: 16px;
	}

	.el-table .cell {
		line-height: 16px;
	}

	.el-table .cell,
	.el-table th>div {
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 2px;
		padding-bottom: 2px;
		text-align: center;
	}

	.el-table th {
		background-color: #7fcac3;
	}

	.el-table__footer-wrapper thead div,
	.el-table__header-wrapper thead div {
		background-color: #7fcac3;
	}

	.el-table .caret-wrapper,
	.el-table th>.cell {
		background-color: #7fcac3;
	}

	.el-pagination {
		padding: 10px 2px;
	}

	.el-pager li {
		padding: 0 2px;
	}

	.el-pagination__total {
		margin: 0 3px;
	}

	tbody tr td.el-table_1_column_2 {
		color: #007aff;
	}

	[v-cloak] {
		display: none;
	}
</style>
