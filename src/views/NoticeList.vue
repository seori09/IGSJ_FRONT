<template>
  <div class="board-box">
    <div class="cs-center-tap">
      <h2 class="title-pg">CS center</h2>
      <hr>
      <ul>
        <li>
          <span class="tap-title">Tel. 1515 - 0000</span>
          <span class="tap-t">평일 9:00 ~ 18:00</span>
        </li>
        <li class="cs-tap">
          <router-link to="/inquire/InquireWrite" class="button">
            <span class="tap-title">1:1 Q&A</span>
            <span class="tap-t">문의하러가기</span>
          </router-link>
        </li>
        <li class="cs-tap">
          <router-link to="/inquire/InquireList" class="button" v-if="this.$store.state.userInfo.userVerify == 128">
            <span class="tap-title">User Question</span>
            <span class="tap-t">회원 문의내역</span>
          </router-link>
          <router-link to="/inquire/InquireList" class="button" v-else-if="this.$store.state.userInfo.userId != null">
            <span class="tap-title">My Question</span>
            <span class="tap-t">내 문의내역</span>
          </router-link>
          <router-link to="/login" class="button" v-else>
            <span class="tap-title">My Question</span>
            <span class="tap-t">내 문의내역</span>
            <span class="login-noitce">로그인 후 이용가능</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="board-contents">
      <h2 class="title-t">Notice</h2>
      <table class="notice-table">
        <colgroup>
          <col style="width:8%">
          <col style="width:10%">
          <col style="width:20%">
          <col style="width:*">
          <col style="width:20%">
        </colgroup>
        <thead>
          <th scope="col">번호</th>
          <th scope="col">게시자</th>
          <th scope="col">제목</th>
          <th scope="col">내용</th>
          <th scope="col">등록일</th>
        </thead>
        <tbody>
          <tr :key="i" v-for="(board, i) in noticeList">
            <router-link :to="{ name: 'NoticeView', params: { bno: board.bno } }">
              <!-- name은 index.js에 지정된 경로 이름을 나타냄, params는 지정된 경로에 보내줄 값을 나타냄 -->

              <td>{{ board.bno }}</td>
              <td><a>{{ board.writer }}</a></td>
              <td>{{ board.title }}</td>
              <td>{{ board.content }}</td>
              <td>{{ convertTime(board.reg_date) }}</td>
            </router-link>
          </tr>
        </tbody>
      </table>
      <div class="pagination-box">
        <div class="pagination">
          <div class="wrapper">
            <a href="#" class="paging-btn btn prev">&lt;</a>
            <a href="#" class="paging-btn btn active">1</a>
            <a href="#" class="paging-btn btn next">&gt;</a>
          </div>
        </div>
      </div>
      <div class="notice-write" v-if="this.$store.state.userInfo.userVerify == 128">
        <router-link to="/notice/NoticeWrite">
          <button type="button">공지사항작성</button>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  /*
    private int bno;
    private String writer;
    private String title;
    private String content;
    private Date reg_date;
  */
  data() {
    return {
      noticeList: {
        bno: '',
        writer: '',
        content: '',
        title: '',
        reg_date: ''
      },
    }
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    getNoticeList() {
      this.$axios.get(this.$serverUrl + '/notice/NoticeList').
        then((res) => {
          console.log(res.data)
          this.noticeList = res.data;

        }).catch((err) => {
          console.log(err);

        })
    },

    convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();

      let fullDate = noticeYear + "년 - " + noticeMonth + "월 - " + noticeDate + "일";

      return fullDate;
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

hr {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td,
th {
  text-align: left;
}

.board-box {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  min-height: 600px;
}

/* cs center 시작 */
.cs-center-tap {
  width: 100%;
}

.title-pg {
  margin: 0;
  padding: 20px;
}

.cs-center-tap ul {
  display: table;
  width: 100%;
}

.cs-center-tap ul li {
  display: table-cell;
  width: 33.3%;
  margin: -1px 0 0 0;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  padding: 20px;
}

.cs-center-tap ul li:first-child {
  border-left: none;
}

.cs-tap {
  cursor: pointer;
}

.cs-tap:hover {
  background: #f1f1f1;
  transition: color 0.3s ease-in-out;
}

.tap-t {
  display: block;
  font-size: 15px;
}

.tap-title {
  color: #000;
  font-size: 20px;
  font-weight: 600;
}

.cs-center-tap ul li a {
  display: block;
  text-decoration: none;
  color: #000;
}

/* cs center 끝 */

.board-contents {
  clear: both;
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: 30px;
}

.notice-table th {
  height: 52px;
  border-top: 3px solid #000;
  border-bottom: 1px solid #000;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  padding: 0;
  background-color: #f1f1f1;
}

.notice-table td {
  height: 52px;
  border-bottom: 1px solid #ccc;
  font-size: 13px;
  vertical-align: middle;
  font-weight: normal;
  text-align: center;
}

.notice-table a {
  text-decoration: none;
  color: #000;
  display: contents;
}

.notice-table a:hover {
  color: #0a3bffbe;
  transition: color 0.3s ease-in-out;
}

.pagination-box {
  width: 100%;
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.pagination {
  width: auto;
  float: right;
}

.notice-write {
  display: flex;
  justify-content: right;
}

.notice-write>a>button {
  /* router-link는 a태그로 지정해주어야 함 */
  padding: 10px;
  margin-top: 10px;
  border: none;
}

.notice-write>a>button:hover {
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}

.paging-btn {
  width: auto;
  min-width: 33px;
  padding: 0 2px;
}

.notice-write button {
  float: right;
  background-color: #000;
  color: #f1f1f1;
}

.login-noitce{
  font-size: 5px;
  font-weight: 400;
}
</style>