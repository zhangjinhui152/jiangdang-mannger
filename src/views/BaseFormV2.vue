<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i> 表单
				</el-breadcrumb-item>
				<el-breadcrumb-item>基本表单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="消息内容">
						<el-input v-model="form.content"></el-input>
					</el-form-item>
					<el-form-item label="您的id">
						<el-input v-model="form.send_id"></el-input>
					</el-form-item>
					<el-form-item label="日期时间">
						<el-col :span="11">
							<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="form.date1"
								style="width: 100%"
							></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-time-picker
								placeholder="选择时间"
								v-model="form.date2"
								style="width: 100%"
							></el-time-picker>
						</el-col>
					</el-form-item>
					<el-button type="primary" @click="onSubmit">提交</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "baseform",
	data() {
		return {
			form: {
				send_id: 0,
				content: "",
				time: "",
				date2: "",
			},
		};
	},
	methods: {
		onSubmit() {
			const data = JSON.stringify(this.form);
            console.log(data)
			axios
				.post(`${this.$store.state.baseUrl}${this.$store.state.mettingUrl}`, {
					data: data,
				})
				.then(() => {
					this.$message.success("提交成功！");
				})
				.catch((err) => {
                    this.$message.error(`${err} ERROR 已报告?`);
					// console.error();
				});
		},
	},
};
</script>