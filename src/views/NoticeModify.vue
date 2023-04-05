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
          <router-link to="/inquire/InquireList" class="button">
            <span class="tap-title">My Question</span>
            <span class="tap-t">내 문의내역</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="board-contents">
      <div class="section_form">
        <div class="area">
          <header class="n-section-title">
            <h2 class="tit">{{ this.boardInfo.bno }} 번 공지사항 수정하기</h2>
          </header>
          <table class="n-table table-row">
            <tbody>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input type="text" class="n-input writer" v-model="this.boardInfo.writer" readonly title="작성자 수정불가">
                </td>
              </tr>
              <tr>
                <th scope="row">작성날짜</th>
                <td>
                  <input type="text" class="n-input reg_date" v-model="this.boardInfo.reg_date" readonly>
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input type="text" class="n-input" name="subject" v-model="this.boardInfo.title">
                </td>
              </tr>
              <tr class="n-same-row">
                <th scope="row">공지내용</th>
                <td>
                  <textarea name="qa_msg" cols="100" rows="100"
                    class="textarea-input" v-model="this.boardInfo.content">{{ this.boardInfo.content }}</textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="btn-no">
      <router-link to="/notice/NoticeList">
        <button type="button" class="n-btn">목록으로</button>
      </router-link>
      <router-link to="/notice/NoticeModify">
        <button class="n-btn-modi" @click="boardModify(this.bno)">수정완료</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boardInfo: {
        bno: '',
        writer: '',
        title: '',
        content: '',
        reg_date: ''
      }
    }
  },
  created() {
    this.bno = this.$route.params.bno
    this.getPostNum(this.bno)
  },
  methods: {
    getPostNum(bno) {
      // 아래는 백단의 view관련 메소드 재활용을 위해 View로 보냄.
      this.$axios.get(this.$serverUrl + '/notice/NoticeView?bno=' + bno)
        .then((res) => {

          this.boardInfo = res.data
          this.boardInfo.reg_date = this.convertTime(this.boardInfo.reg_date)

        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('Error')
          }
        })
    },
    // 수정완료 갈겼을때
    boardModify(bno) {
      this.$axios.post(this.$serverUrl + '/notice/NoticeModify', {
        bno: bno,
        title: this.boardInfo.title,
        content: this.boardInfo.content
      }
      )
        .then((res) => {
          // 경우의 수가 2가지일때는 최소한의 보안을 위해 boolean 타입으로 진행한다.
          // int는 0과 1이 대부분이라 보안에 매우 취약하다. 반면 boolean은 true false지만 흔한 해킹 기법으로 시도시 undifined로 뜬다.
          if (res.data == true) {
            alert("수정이 완료되었습니다.");

            location.href = "/notice/NoticeList"

          } else {
            alert("수정에 실패하였습니다.");

            return false;
          }
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('Error')
          }
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
};
</script>

<style scoped>
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: top;
  background: transparent;
}

ul {
  padding: 0;
}

hr {
  margin: 0;
}

body {
  margin: 0;
}

.board-box {
  min-height: 800px;
  display: flex;
  flex-direction: column;
}

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

.tap-t {
  display: block;
  font-size: 15px;
  color: #495057;
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

.board-contents {
  padding: 20px;
}

.area {
  display: table-cell;
}

.n-section-title {
  border-bottom: 3px solid #000000;
  margin-top: 48px;
  line-height: 1.5;
  font-size: 14px;
  position: relative;
}

.n-table {
  width: 100%;
  line-height: 1.5;
  font-size: 14px;
  border-collapse: collapse;
  table-layout: fixed;
  border-bottom: 1px solid #ccc;
}

.n-table.table-row th,
.n-table.table-row td {
  height: auto;
  padding: 15px 0;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  border-bottom: none;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
}

.n-input {
  width: 100%;
  height: 32px;
  padding: 5px 6px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
}

.writer,
.reg_date {
  border: none;
  pointer-events: none;
}

.textarea-input {
  width: 100%;
  height: 200px;
  padding: 5px 6px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
}

.n-table th {
  width: 170px;
  padding-top: 22px;
  padding-right: 20px;
}

.n-table.table-row th {
  text-align: left;
  font-weight: normal;
  vertical-align: top;
}

.n-table.table-row th,
.n-table.table-row td {
  height: auto;
  padding: 15px 0;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  border-bottom: none;
  font-size: 14px;
  text-align: left;
}

.n-btn {
  display: inline-block;
  min-width: 100px;
  height: 40px;
  line-height: 36px;
  color: #ffffff;
  box-sizing: border-box;
  padding: 2px 8px 0 8px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;

}

.n-btn-modi {
  display: inline-block;
  min-width: 100px;
  height: 40px;
  line-height: 36px;
  color: #000000;
  box-sizing: border-box;
  padding: 2px 8px 0 8px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;

}

.n-btn {
  border: none;
  background-color: #000000;
}

.n-btn:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}

.n-btn-modi {
  border: none;
  background-color: #f1f1f1;
}

.n-btn-modi:hover {
  border: none;
  color: #f1f1f1;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}

.btn-no {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
</style>