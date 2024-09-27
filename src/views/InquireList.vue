<template>
  <div class="inquire-box">
    <header class="inquire-title">
      <h1 class="tit" v-if="this.$store.state.userInfo.userVerify == 128">회원 1:1문의내역</h1>
      <h1 class="tit" v-else>나의 1:1문의내역</h1>
    </header>
    <table class="n-table table-col">
      <colgroup>
        <col style="width: 8%" />
        <col style="width: 10%" />
        <col style="width: 20%" />
        <col style="width: *" />
        <col style="width: 20%" />
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
        <tr :key="i" v-for="(inquire, i) in inpList">
          <router-link :to="{ name: 'InquireView', params: { inquireNum: inquire.inquireNum } }" v-if="this.$store.state.userInfo.userVerify == 128">
            <td>{{ inquire.inquireNum }}</td>
            <td>{{ inquire.userId }}</td>
            <td>{{ inquire.inquireTitle }}</td>
            <td>{{ inquire.inquireContent }}</td>
            <td>{{ convertTime(inquire.inquireRegDate) }}</td>
          </router-link>
          <router-link :to="{ name: 'InquireView', params: { inquireNum: inquire.inquireNum } }"
          v-else-if="this.$store.state.userInfo.userVerify != 128 && this.$store.state.userInfo.userId == inquire.userId">
            <td>{{ inquire.inquireNum }}</td>
            <td>{{ inquire.userId }}</td>
            <td>{{ inquire.inquireTitle }}</td>
            <td>{{ inquire.inquireContent }}</td>
            <td>{{ convertTime(inquire.inquireRegDate) }}</td>
          </router-link>
        </tr>
      </tbody>
    </table>
    <div class="btn-gr">
      <router-link to="/inquire/InquireWrite">
        <button class="n-btn">문의하기</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inpList: {
        userId: "", // 유저아이디
        inquireNum: "", // 제품문의번
        pno: "", // 제품번호
        inquireTitle: "", // 문의제목
        inquireContent: "", // 문의내용
        inquireRegDate: "", // 문의날짜
      },

    };
  },
  created() {
    this.inquireList();
  },
  methods: {
    inquireList() {
      this.$axios
        .get(this.$serverUrl + "/inquire/InquireList")
        .then((res) => {
          console.log(res.data);
          this.inpList = res.data;
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    // 시간
    convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();

      let fullDate = noticeYear + "년 - " + noticeMonth + "월 - " + noticeDate + "일";

      return fullDate;
    }
  },
};
</script>

<style scoped>
.inquire-box {
  width: 100%;
  min-height: 600px;
  padding: 30px;
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
  background-color: #f1f1f1;
}

.inquire-box .n-table.table-col td {
  height: 52px;
  border-bottom: 1px solid #ccc;
  font-size: 13px;
  vertical-align: middle;
  font-weight: normal;
  text-align: center;
}

.btn-gr {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
}</style>