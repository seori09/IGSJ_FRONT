<template>
  <div class="inquire-box">
    <header class="inquire-title">
      <h1 class="tit">나의 1:1문의내역</h1>
    </header>
    <table class="n-table table-col">
      <colgroup>
      <col style="width:8%">
      <col style="width:12.6%">
      <col style="width:*">
      <col style="width:20%">
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">작성자</th>
          <th scope="col">제목</th>
          <th scope="col">내용</th>
          <th scope="col">작성일자</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(inquire, i) in inquireList">
          <router-link to="/inquire/InquireList">
            <td>{{ inquire.inquireNum }}</td>
            <td>{{ inquire.userId }}</td>
            <td>{{ inquire.inquireTitle }}</td>
            <td>{{ inquire.inquireContent }}</td>
            <td>{{ inquire.inquireReg_date }}</td>
          </router-link>
        </tr>
      </tbody>
    </table>

    <div class="n-btn-group">
      <router-link to="/inquire/InquireWrite">
        <button class="n-btn">문의하기</button>
      </router-link>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      inquireList: {
        inquireNum: '',
        userId: '',
        inquireTitle: '',
        inquireContent: '',
        inquireRegDate: ''
      }
    };
  },
  created() {
    this.InquireList();
  },
  methods: {
    InquireList() {
      this.$axios.get(this.$serverUrl + '/inquire/InquireList')
      then((res) => {
        console.log(res.data)
        this.inquireList = res.data;
      }).catch((err) => {
        console.log(err)
      })
    }
  },
}
</script>

<style>
.inquire-box {
  width: 100%;
  min-height: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.inquire-title {
  border-bottom: 3px solid #000;
  padding-bottom: 10px;
  line-height: 1.5;
  font-size: 15px;
}
.inquire-box .tit {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
}
.inquire-box .n-table th {
  height: 52px;
  border-bottom: 1px solid #000000;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  padding: 0;
}
.inquire-box .n-table.table-col td {
  height: 52px;
  border-bottom: 1px solid #000000;
  font-size: 13px;
  vertical-align: middle;
  font-weight: normal;
  text-align: center;
}
.inquire-box a {
  text-decoration: none;
  color: #000;
  display: contents;
}
.inquire-box a:hover {
  color: #0a3bffbe;
  transition: color 0.3s ease-in-out;
}

.inquire-box .n-btn {
  display: inline-block;
  min-width: 100px;
  height: 40px;
  color: #ffffff;
  background-color: #000;
  box-sizing: border-box;
  padding: 2px 8px 0 8px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  border: none;
}
.inquire-box .n-btn:hover {
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}
</style>