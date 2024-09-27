<template>
  <div class="inquire-box">
    <header class="inquire-title">
      <h2 class="inquire-tit">나의 1:1문의내역</h2>
      <hr>
    </header>
    <div class="inquire-contents">
      <div class="section_form">
        <div class="area">
          <header class="n-section-title">
            <h4 class="tit">{{ this.inquireInfo.inquireNum }} 번 문의내역</h4>
          </header>
          <!-- 문의내용 -->
          <div class="inq-con">
          <table class="n-table table-row">
            <tbody>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input type="text" class="n-input" v-model="this.inquireInfo.userId" readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">작성날짜</th>
                <td>
                  <input id="reg_date" type="text" class="n-input" v-model="this.inquireInfo.inquireRegDate" readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input type="text" class="n-input" name="subject" v-model="this.inquireInfo.inquireTitle" readonly />
                </td>
              </tr>
              <tr class="n-same-row">
                <th scope="row">문의내용</th>
                <td>
                  <textarea name="qa_msg" cols="100" rows="100" class="inquire-textarea"
                    readonly>{{ this.inquireInfo.inquireContent }}</textarea>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <!-- 문의내용 -->
          <!-- 답변하기 -->
          <div class="ans-content">
            <header class="n-section-title">
              <h4 class="tit">{{ this.inquireInfo.inquireNum }}. 문의내역 답변작성</h4>
            </header>
            <table class="n-table table-row">
              <tbody>
                <tr class="n-same-row">
                  <th scope="row">답변내역작성</th>
                  <td>
                    <textarea name="qa_msg" cols="100" rows="100" class="answer-textarea" v-model="this.answerInfo.ansContent"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 답변하기 -->
        </div>
      </div>
    </div>
    <div class="btn-gr">

      <button type="button" class="n-btn btn-wr" @click="answerWrite()">답변완료</button>

      <router-link to="/inquire/InquireList">
        <button type="button" class="n-btn btn-mo">목록으로</button>
      </router-link>
    </div>
  </div>
  <div class="review-box">
    <div class="review"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inquireInfo: {
        userId: "",
        inquireNum: "",
        pno: "",
        inquireTitle: "",
        inquireContent: "",
        inquireRegDate: "",
      },

      answerInfo: {
        ansContent: '',
        ansRegDate: ''
      }
    };
  },
  created() {
    this.inquireNum = this.$route.params.inquireNum;
    this.getinquireNum(this.inquireNum);
  },
  methods: {
    // 게시글 불러오기위해 List에서 넘겨준 데이터를 받아내야함
    getinquireNum(inquireNum) {
      this.$axios
        .get(this.$serverUrl + "/inquire/InquireView?inquireNum=" + inquireNum)
        .then((res) => {
          this.inquireInfo = res.data;
          this.inquireInfo.inquireRegDate = this.convertTime(
            this.inquireInfo.inquireRegDate
          );

          console.log(this.convertTime(
            this.inquireInfo.inquireRegDate
          ));
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Error");
          }
        });
    },
    answerWrite() {
      this.$axios
        .post(this.$serverUrl + "/answer/AnswerWrite", {
          inquireNum : this.inquireInfo.inquireNum,
          ansContent : this.answerInfo.ansContent
        })

        .then((res) => {
          if(res.data == true){
            alert("답변 작성이 완료되었습니다.");

            location.href = "/inquire/InquireView/" + this.inquireInfo.inquireNum;

          } else {
            alert("이미 답변이 달려있는 경우에는 추가답변이 불가합니다.\n문의를 새로 작성해주세요.");

            return false;
          }

        })
        .catch((err) => {
          this.error = err.message;
          console.log(this.error);

        });
    },
    // 시간변환
    convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();
      let noticeHour = date.getHours();
      let noticeMin = date.getMinutes();
      let noticeSec = date.getSeconds();

      let fullDate =
        noticeYear + "-" + noticeMonth + "-" + noticeDate + " " + noticeHour + ":" + noticeMin + ":" + noticeSec;

      return fullDate;
    }
  },
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

.inquire-tit {
  margin: 0;
  padding: 20px;
}

.inquire-box {
  min-height: 800px;
  display: flex;
  flex-direction: column;
}

.inquire-contents {
  padding: 20px;
  line-height: 20px;
}

.n-section-title {
  border-bottom: 2px solid #ccc;
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
  font-weight: 600;
  text-align: left;
}

.n-input {
  width: 100%;
  height: 32px;
  padding: 5px 6px;
  border: none;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
  pointer-events: none;
}

.n-input:focus {
  outline: none;
}

.inquire-textarea{
  width: 100%;
  height: 150px;
  padding: 5px 6px;
  border: none;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
  resize: none;
  pointer-events: none;
}

.ans-content {
  background-color: #f2f2f2;
}

.ans-content .n-section-title {
  border-top: 2px solid #ccc;
  border-bottom: none;
}

.ans-content .answer-textarea {
  background-color: #fff;
  width: 950px;
}


.ans-content .n-same-row {
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.ans-content > .n-table.table-row th  {
  text-align: center;
  vertical-align: inherit;
}

.answer-textarea{
  width: 100%;
  height: 200px;
  padding: 5px 6px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
  resize: none;
}

.btn-gr {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
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

.n-btn.btn-mo {
  border: 1px solid #f1f1f1;
  background-color: #f1f1f1;
  color: #000000;
}

.n-btn.btn-mo:hover {
  background-color: #c3c3c3be;
  transition: background 0.3s ease-in-out;
}

.n-btn.btn-wr {
  border: none;
  background-color: #000000;
}

.n-btn.btn-wr:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}
</style>
