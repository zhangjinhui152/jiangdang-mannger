<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i> 表单
				</el-breadcrumb-item>
				<el-breadcrumb-item>上传</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="content-title">支持拖拽</div>
			<div class="plugins-tips">
				<p>请上传约定好的文件格式和文件内容</p>
			</div>
			<el-upload class="upload-demo" drag multiple :on-change="handle">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">
					将文件拖到
					<em>点击上传</em>
				</div>
				<template #tip>
					<div class="el-upload__tip">要创建哪个就选哪个 别 tm乱选</div>
					<br />
				</template>
			</el-upload>

			<el-row :gutter="20">
				<el-col :span="4">
					<el-select v-model="currentValue" placeholder="Select">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						/>
					</el-select>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="submit()"> 发送</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import { read, utils } from "xlsx";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import "cropperjs/dist/cropper.css";
export default {
	name: "upload",
	setup() {
		const params = ref([]);

		const store = useStore();
		let baseUrl = store.state.baseUrl;
		let bookUrl = baseUrl + store.state.bookUrl;
		let vrUrl = baseUrl + store.state.vrUrl;
		let newsUrl = baseUrl + store.state.newsUrl;
		let currentValue = ref("");
		const options = [
			{
				value: bookUrl,
				label: "上传book",
			},
			{
				value: vrUrl,
				label: "上传VR",
			},
			{
				value: newsUrl,
				label: "上传新闻动态",
			},
			{
				value: "Option4",
				label: "Option4",
			},
			{
				value: "Option5",
				label: "时光倒流",
				disabled: true,
			},
		];
		const readFile = (file) => {
			return new Promise((resolve) => {
				let reader = new FileReader();
				reader.readAsBinaryString(file);
				reader.onload = (ev) => {
					resolve(ev.target.result);
				};
			});
		};
		let tableData = [];
		const handle = async (file) => {
			const loadingInstance = ElLoading.service({
				fullscreen: true,
			});

			try {
				let dataBinary = await readFile(file.raw);
				const workbook = read(dataBinary, {
					type: "binary",
				});

				workbook.SheetNames.forEach((item) => {
					params.value.push({
						name: item,
						dataList: utils.sheet_to_json(workbook.Sheets[item]),
					});
					tableData.push(utils.sheet_to_json(workbook.Sheets[item]));
				});
				console.log(params.value);
				loadingInstance.close();
				ElMessage({
					message: `成功`,
					type: "success",
				});
			} catch (error) {
				ElMessage({
					message: `this is a message${error}`,
					type: "error",
				});
				loadingInstance.close();
			}

			return params;
		};
		const submit_url = (url, send) => {
			axios.post(url, {
					data: send,
				})
				.then((res) => {
					console.log(res);
					ElMessage({
						message: `成功了 ${(res.data.result, new Date().toString())}`,
						type: "info",
					});
					params.value = [];
				})
				.catch((err) => {
					err;
					ElMessage({
						message: `失败 重新尝试 无需上传 ${new Date().toString()}`,
						type: "info",
					});
				});
		};
		const submit = () => {
			if (params.value[0] === undefined || params.value[0] === null) {
				ElMessage({
					message: `上传文件啊 铁咩`,
					type: "error",
				});
				console.log(currentValue.value);
				return;
			}

			let send = JSON.stringify(params.value[0].dataList);

			submit_url(currentValue.value, send);
		};
		return {
			handle,
			params,
			submit,
			bookUrl,
			vrUrl,
			newsUrl,
			options,
			currentValue,
		};
	},
	data() {
		return {
			defaultSrc: require("../assets/img/img.jpg"),
			fileList: [],
			dialogVisible: false,
		};
	},
	components: {},
	methods: {
		handleError() {
			this.$notify.error({
				title: "上传失败",
				message: "图片上传接口上传失败，可更改为自己的服务器接口",
			});
		},
	},
	created() {
		this.cropImg = this.defaultSrc;
	},
};
</script>

<style scoped>
.content-title {
	font-weight: 400;
	line-height: 50px;
	margin: 10px 0;
	font-size: 22px;
	color: #1f2f3d;
}

.pre-img {
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 5px;
}

.crop-demo {
	display: flex;
	align-items: flex-end;
}

.crop-demo-btn {
	position: relative;
	width: 100px;
	height: 40px;
	line-height: 40px;
	padding: 0 20px;
	margin-left: 30px;
	background-color: #409eff;
	color: #fff;
	font-size: 14px;
	border-radius: 4px;
	box-sizing: border-box;
}

.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
</style>