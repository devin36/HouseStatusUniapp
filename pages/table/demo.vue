<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view :data="tableData" :change:data="renderView.updateData" id="tableTemplate"></view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	var t;
	var order; //升降序
	var prop; //排序列
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		onUnload() {},
		onLoad() {
			t = this;
			console.log('表格数据请异步加载，否则无法显示');
			setTimeout(function() {
					t.tableData = [{
						sort_id: 1,
						user_name: '刘一',
						age: 30,
						login_total: 23,
						sex: "男",
						salary: 10000,
					}, {
						sort_id: 2,
						user_name: '陈二',
						age: 20,
						login_total: 10,
						sex: "女",
						salary: 1000,
					}, {
						sort_id: 3,
						user_name: '张三',
						age: 30,
						login_total: 23,
						sex: "男",
						salary: 100,
					}, {
						sort_id: 4,
						user_name: '李四',
						age: 25,
						login_total: 10,
						sex: "男",
						salary: 2000,
					}, {
						sort_id: 5,
						user_name: '王五',
						age: 40,
						login_total: 23,
						sex: "男",
						salary: 7000,
					}, {
						sort_id: 6,
						user_name: '赵六',
						age: 30,
						login_total: 10,
						sex: "男",
						salary: 5000,
					}, {
						sort_id: 7,
						user_name: '孙七',
						age: 30,
						login_total: 23,
						sex: "男",
						salary: 30000,
					}, {
						sort_id: 8,
						user_name: '周八',
						age: 30,
						login_total: 100,
						sex: "女",
						salary: 20000,
					}, {
						sort_id: 9,
						user_name: '吴九',
						age: 25,
						login_total: 23,
						sex: "女",
						salary: 5000,
					}, {
						sort_id: 10,
						user_name: '郑十',
						age: 35,
						login_total: 10,
						sex: "男",
						salary: 7000,
					}, {
						sort_id: 11,
						user_name: '刘一',
						age: 40,
						login_total: 23,
						sex: "男",
						salary: 10000,
					}, {
						sort_id: 12,
						user_name: '陈二',
						age: 22,
						login_total: 10,
						sex: "女",
						salary: 1000,
					}, {
						sort_id: 13,
						user_name: '张三',
						age: 20,
						login_total: 23,
						sex: "男",
						salary: 100,
					}, {
						sort_id: 14,
						user_name: '李四',
						age: 29,
						login_total: 10,
						sex: "男",
						salary: 2000,
					}, {
						sort_id: 15,
						user_name: '王五',
						age: 30,
						login_total: 23,
						sex: "男",
						salary: 1000,
					}, {
						sort_id: 16,
						user_name: '赵六',
						age: 30,
						login_total: 10,
						sex: "男",
						salary: 5000,
					}, {
						sort_id: 17,
						user_name: '孙七',
						age: 35,
						login_total: 23,
						sex: "男",
						salary: 30000,
					}, {
						sort_id: 18,
						user_name: '周八',
						age: 33,
						login_total: 100,
						sex: "女",
						salary: 20000,
					}, {
						sort_id: 19,
						user_name: '吴九',
						age: 23,
						login_total: 23,
						sex: "女",
						salary: 5000,
					}, {
						sort_id: 20,
						user_name: '郑十',
						age: 24,
						login_total: 10,
						sex: "男",
						salary: 7000,
					}]
				},
				1000)

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
					<el-table :data="tableData" border stripe :height="tableHeight" @cell-click="clickCell" @sort-change="sortChange"  :default-sort="{prop: 'count', order: 'descending'}">
						<el-table-column fixed prop="sort_id" label="序号" width="70">
						</el-table-column>
						<el-table-column fixed prop="user_name" width="70">
						<template slot="header" slot-scope="scope">
						   姓名
						   <i class="el-icon-warning-outline" style="color:#409EFF" @click="clickIcon"></i>
						</template>
						</el-table-column>
						<el-table-column prop="sex" label="性别" width="70">
						</el-table-column>
						<el-table-column prop="age" label="年龄" width="90" sortable="custom">
						</el-table-column>
						<el-table-column prop="salary" label="薪酬" width="90" :formatter="formatterNum" sortable="custom">
						</el-table-column>
						<el-table-column prop="login_total" label="登录次数" width="110" :formatter="formatterNum" sortable="custom">
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
					}
				});
				this.$ownerInstance.callMethod('receiveMsg', {
					msg: '初始化成功'
				})
			},
			updateData(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				vm.tableData = newValue;
			}
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
