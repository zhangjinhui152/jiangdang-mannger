<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 基础表格
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button
					type="primary"
					icon="el-icon-delete"
					class="handle-del mr10"
					@click="delAllSelection"
					>批量删除
				</el-button>
				
			</div>
			<el-table
				:data="currenTableData"
				border
				class="table"
				ref="multipleTable"
				header-cell-class-name="table-header"
				@selection-change="handleSelectionChange"
			>	
			<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					v-for="item in table_head"
					:prop="item"
					:key="item"
					:label="item"
				/>
				
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						
						<el-button
							type="text"
							icon="el-icon-delete"
							class="red"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>
		<el-dialog title="编辑" v-model="editVisible" width="40%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item :label="table_head.id">
					<el-input v-model="form.id"></el-input>
				</el-form-item>
				<el-form-item :label="table_head.comment_id">
					<el-input v-model="form.comment_id"></el-input>
				</el-form-item>
				<el-form-item :label="table_head.reply_id">
					<el-input v-model="form.reply_id"></el-input>
				</el-form-item>
				<el-form-item :label="table_head.content">
					<el-input v-model="form.content"></el-input>
				</el-form-item>
			</el-form>	
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>


	</div>
</template>

<script>
// import { fetchData } from "../api/index";
import crypto from "crypto";
import axios from "axios";
export default {
	setup() {
		const table_head = {
			id: "id",
			comment_id: "comment_id",
			reply_id: "reply_id",
			content: "content",
			
		};

		// var form ={}
		const getmd5 = function (pwd) {
			var md5 = crypto.createHash("md5");
			md5.update(pwd);
			var password = md5.digest("hex");
			return password;
		};
		return {
			table_head,
			getmd5,
			// form
		};
	},
	name: "basetable",
	data() {
		return {
			query: {
				address: "",
				name: "",
				pageIndex: 1,
				pageSize: 10,
			},
			editVisible_add: false,
			tableData: [],
			currenTableData: [],
			multipleSelection: [],
			delList: [],
			editVisible: false,
			pageTotal: 0,
			// form: {
			// 	currentForm:[],
			// 	table_head:[]
			// },
			form: {},
			idx: -1,
			id: -1,
		};
	},
	created() {
		this.getData();
	},
	methods: {
		// 获取 数据
		getData() {
			axios
				.get(`${this.$store.state.baseUrl}${this.$store.state.selectFeedBackUrl}`, {
					page1: 1,
					page2: 50,
				})
				.then((res) => {
					this.tableData = res.data.data;
					console.log(res.data.data);
					this.currenTableData = this.tableData.slice(this.pageIndex * 10, 10);
					this.pageTotal = this.tableData.length;
					// this.query.pageSize= this.tableData.length;
				})
				.catch((err) => {
					console.error(err);
				});
		},
		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, "pageIndex", 1);
			this.getData();
		},
		// 删除操作
		handleDelete(index) {
			// 二次确认删除
			this.$confirm("确定要删除吗？", "提示", {
				type: "warning",
			})
				.then(() => {
					console.log(
						`${this.$store.state.baseUrl}+${this.$store.state.delFeedbackUrl}`
					);
					axios
						.post(
							`${this.$store.state.baseUrl}${this.$store.state.delFeedbackUrl}?id=${this.tableData[index].id}`
						)
						.then(() => {
							this.$message.success("删除成功");
							this.tableData.splice(index, 1);
							this.currenTableData.splice(index, 1);
						})
						.catch((err) => {
							this.$message.error("ERROR 已报告 W A U 监察中心 >>>>" + err);
						});
				})
				.catch(() => {});
		},
		// 多选操作
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(this.multipleSelection);
		},
		delAllSelection() {
			const length = this.multipleSelection.length;
			let str = "";
			this.delList = this.delList.concat(this.multipleSelection);
			for (let i = 0; i < length; i++) {
				str += this.multipleSelection[i].id + " ";
				axios
					.post(`${this.$store.state.baseUrl}${this.$store.state.delUserUrl}`, {
						id: this.multipleSelection[i].id,
					})
					.then(() => {
						this.$message.success("删除成功 防止误删 刷新后重新加载!");
						// this.tableData.map((value)=>{
						// 	if (value.id != 1) {
						// 		console.log(value.id == str)
						// 	}

						// })
					})
					.catch((err) => {
						this.$message.error("ERROR 已报告 W A U 监察中心 >>>>" + err);
					});
			}
			// 删除!

			this.$message.error(`删除了${str}`);
			this.multipleSelection = [];
		},
		// 编辑操作
		handleEdit(index, row) {
			this.idx = index;
			this.form = row;
			console.log(row);
			this.editVisible = true;
		},
		handleAdd() {
			this.form;
			this.editVisible_add = true;
		},
		// 保存编辑
		saveEdit() {
			this.editVisible = false;
			const data = JSON.stringify(this.form)
			axios
				.post(
					`${this.$store.state.baseUrl}${this.$store.state.updateUserUrl}`,
					{
						data:data
					}
				)
				.then((res) => {
					this.$message.success(`修改第 ${this.form.id} 行成功了吗?`);
					console.log(res);
				})
				.catch((err) => {
					this.$message.error(`ERROR 出现${err} 已报告SERN`);
					console.error(err);
				});
		},
		saveEdit_add() {
			this.editVisible_add = false;

			const data = JSON.stringify(this.form);
			console.log(data);
			axios
				.post(`${this.$store.state.baseUrl}${this.$store.state.userUrl}`, data)
				.then((res) => {
					this.$message.success(`add 用户=>${this.form.name}<====成功了吗?`);
					console.log(res);
				})
				.catch((err) => {
					this.$message.error(`ERROR 出现${err} 已报告SERN`);
					console.error(err);
				});
		},
		// 分页导航
		handlePageChange(val) {
			--val;
			console.log(val);

			this.currenTableData = this.tableData.slice(
				val * 10,
				this.query.pageSize * (val + 1)
			);

			// console.log(this.query.pageSize * (val + 1));
			// console.log(10 * val);
			// console.log(this.tableData.length - val * 10);
			// this.getData();
		},
	},
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
	display: inline-block;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #ff0000;
}

.mr10 {
	margin-right: 10px;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>