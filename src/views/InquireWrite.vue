<template>
  <div class="inquire-box">
    <div class="cs-center-tap">
      <h2 class="title-pg">CS center</h2>
      <hr />
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

    <div class="inquire-contents">
      <form method="post" action="">
        <h4 class="title_cs font-mss">1:1 Q&A</h4>
        <ul class="n-info-txt">
          <li class="text-danger">
            제품 사용, 오염, 전용 박스 손상, 라벨 제거, 사은품 및 부속 사용/분실
            시, 환불이 불가능 합니다.
          </li>
          <li>
            주문내역/환불은
            <router-link to="/#" class="button"
              >마이페이지 ▶ 주문내역</router-link
            >에서 확인하실 수 있습니다.
          </li>
          <li>
            1:1문의 처리 내역은
            <router-link to="/inquire/InquireList" class="button"
              >나의 문의내역</router-link
            >에서 확인하실 수 있습니다.
          </li>
          <li>최대한 자세하게 남겨주실수록 빠르고 정확한 답변이 가능합니다.</li>
        </ul>

        <div class="section_form">
          <div class="area">
            <header class="n-section-title">
              <h2 class="tit">문의 작성</h2>
            </header>
            <table class="n-table table-row">
              <tbody>
                <tr>
                  <th scope="row">작성자</th>
                  <td class="order-check">
                    <input
                      type="text"
                      class="n-input userId"
                      v-model="userId"
                      readonly
                    />
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <th scope="row">제목</th>
                  <td>
                    <input
                      type="text"
                      class="n-input"
                      v-model="inquireTitle"
                      placeholder="제목을 입력해주세요"
                    />
                  </td>
                </tr>
                <tr class="n-same-row">
                  <th scope="row">문의내용</th>
                  <td>
                    <textarea
                      cols="100"
                      rows="100"
                      class="textarea-input"
                      placeholder="고객님들의 불편사항 개선을 위해 최선을 다하겠습니다."
                      v-model="inquireContent"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="n-btn-group">
          <button type="button" @click="inqWrite()" class="n-btn btn-accent">
            문의하기
          </button>
          <button type="button" @click="cancel()" class="n-btn btn-lighter">
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      inquireTitle: "",
      inquireContent: "",
    };
  },
  created() {
    this.userId = this.$store.state.userInfo.userId;
  },
  methods: {
    // 뒤로가기
    cancel() {
      if (confirm("취소하시겠습니까?")) {
        history.back();
      }
    },
    // 문의 시작
    inqWrite() {
      this.$axios
        .post(this.$serverUrl + "/inquire/InquireWrite", {
          userId: this.userId,
          inquireTitle: this.inquireTitle,
          inquireContent: this.inquireContent,
        })
        .then((res) => {
          if (res.data == true) {
            alert("문의가 접수되었습니다.");

            location.href = "/inquire/InquireList";
          } else {
            alert("문의 접수에 실패하였습니다.");

            return false;
          }
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Server Error. Access Later");
          }
        });
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

ul li {
    margin: 5px 0 0 0;
    color: #777;
    font-size: 15px;
}

.inquire-box {
  border-bottom: 1px solid #ddd;
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
  list-style: none;
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

.inquire-contents {
  padding: 20px;
}

/* .n-info-txt > li:before {
  content: "▶";
  position: inherit;
  margin-right: 5px;
} */
.title_cs {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  display: inline-block;
}
.n-info-txt {
  line-height: 1.5;
  font-size: 14px;
  padding-top: 20px;
}

.n-info-txt > li:before {
  content: "▶";
  position: inherit;
  margin-right: 5px;
}

.n-info-txt > li:first-of-type {
  margin-top: 0;
}
.n-info-txt > li {
  margin-top: 5px;
  position: relative;
  line-height: 1.5;
}

.area {
  display: table-cell;
}
.n-section-title {
  border-bottom: 3px solid #000000;
  margin-top: 30px;
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

.n-table th {
  width: 170px;
  padding-top: 22px;
  padding-right: 20px;
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

.userId {
  border: none;
  outline: none;
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
  resize: none;
}

.n-btn-group {
  min-height: 32px;
  text-align: center;
  padding-top: 20px;
  clear: both;
  position: relative;
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
.n-btn.btn-lighter {
  border: 1px solid #f1f1f1;
  background-color: #f1f1f1;
  color: #000000;
}
.n-btn.btn-lighter:hover {
  background-color: #c3c3c3be;
  transition: background 0.3s ease-in-out;
}
.n-btn.btn-accent {
  border: none;
  background-color: #000000;
}
.n-btn.btn-accent:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}
</style>
