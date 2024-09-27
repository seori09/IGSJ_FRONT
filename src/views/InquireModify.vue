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
            <h4 class="tit">{{ this.inquireInfo.inquireNum }}. 문의내역</h4>
          </header>
          <table class="n-table table-row">
            <tbody>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input
                    type="text"
                    class="n-input-re"
                    v-model="this.inquireInfo.userId"
                    readonly
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">작성날짜</th>
                <td>
                  <input
                    id="reg_date"
                    type="text"
                    class="n-input-re"
                    v-model="this.inquireInfo.inquireRegDate"
                    readonly
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input
                    type="text"
                    class="n-input"
                    name="subject"
                    v-model="this.inquireInfo.inquireTitle"
                  />
                </td>
              </tr>
              <tr class="n-same-row">
                <th scope="row">문의내용</th>
                <td>
                  <textarea
                    name="qa_msg"
                    cols="100"
                    rows="100"
                    class="textarea-input"
                    v-model="this.inquireInfo.inquireContent"
                    >{{ this.inquireInfo.inquireContent }}</textarea
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="btn-gr">
      <router-link to="/inquire/InquireUpdate" @click="inquireUpdate(this.inquireNum)">
        <button type="button" class="n-btn btn-updt">수정완료</button>
      </router-link>
      <router-link to="/inquire/InquireList">
        <button type="button" class="n-btn btn-mo">목록으로</button>
      </router-link>
    </div>
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
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Error");
          }
        });
    },
    // 수정완료
    inquireUpdate(inquireNum) {
      this.$axios.post(this.$serverUrl + "/inquire/InquireModify", {
          inquireNum: inquireNum,
          inquireTitle: this.inquireInfo.inquireTitle,
          inquireContent: this.inquireInfo.inquireContent,
        })
        .then((res) => {
          // 경우의 수가 2가지일때는 최소한의 보안을 위해 boolean 타입으로 진행한다.
          // int는 0과 1이 대부분이라 보안에 매우 취약하다. 반면 boolean은 true false지만 흔한 해킹 기법으로 시도시 undifined로 뜬다.
          if (res.data == true) {
            alert("수정이 완료되었습니다.");

            location.href = "/inquire/InquireList";
          } else {
            alert("수정에 실패하였습니다.");

            return false;
          }
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Error");
          }
        });
    },
    // 시간변환
    convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();

      let fullDate =
        noticeYear + "년 - " + noticeMonth + "월 - " + noticeDate + "일";

      return fullDate;
    },
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
  margin-top: 20px;
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

.n-input-re {
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

.n-input-re:focus {
  outline: none;
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
.n-btn.btn-updt {
  border: none;
  background-color: #000000;
}
.n-btn.btn-updt:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}

</style>