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
                v-model="form.time"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
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
      },
    };
  },
  methods: {
    onSubmit() {
      let arr = [];
      arr.push(this.form);
      const data = JSON.stringify(arr);
      console.log(data);
      console.log(
        `${this.$store.state.baseUrl}${this.$store.state.messageUrl}`
      );

      axios
        .post(`${this.$store.state.baseUrl}${this.$store.state.messageUrl}`, {
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