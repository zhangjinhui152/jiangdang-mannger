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
					<div class="el-upload__tip">
						要创建哪个就点哪个按钮 别乱点! 别乱点! 别乱点!
					</div>
					<br />
				</template>
			</el-upload>
			<el-container style="width: 30%;">
				<el-row >
				<el-col :span="8">
					<el-button type="primary" @click="submit_book">增加书</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary">增加动态</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary">增加vr网站</el-button>
				</el-col>
			</el-row>
			</el-container>
			
		</div>
	</div>
</template>

<script>
import { read, utils } from "xlsx";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";
import {ref} from 'vue'
import "cropperjs/dist/cropper.css";
export default {
	name: "upload",
	setup() {
		const params = ref([]);
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
			const loadingInstance = ElLoading.service({ fullscreen: true });

			try {
				let dataBinary = await readFile(file.raw);
				const workbook = read(dataBinary, { type: "binary" });

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
		const submit_book = ()=>{
			let send = JSON.stringify(params.value[0].dataList);
			console.log(send)
		}
		return {
			handle,
			params,
			submit_book,
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