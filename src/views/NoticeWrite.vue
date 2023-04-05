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

      <form method="post">
        <div class="section_form">
          <div class="area">
            <header class="n-section-title">
              <h2 class="tit">공지사항 작성</h2>
            </header>
            <table class="n-table table-row">
              <tbody>
                <tr>
                  <th scope="row">작성자</th>
                  <td>
                    <input type="text" class="n-input" v-model="noticeWriter" placeholder="작성자를 입력하세요">
                  </td>
                </tr>
                <tr>
                  <th scope="row">제목</th>
                  <td>
                    <input type="text" class="n-input" name="subject" v-model="noticeTitle" placeholder="제목을 입력해주세요">
                  </td>
                </tr>
                <tr class="n-same-row">
                  <th scope="row">공지내용</th>
                  <td>
                    <textarea name="qa_msg" cols="100" rows="100" class="textarea-input" placeholder="작성할 내용을 입력해주세요"
                      v-model="noticeContent"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="n-btn-group">
          <button @click="noticeWrite();" class="n-btn btn-accent">작성하기</button>
          <button type="button" @click="cancel();" class="n-btn btn-lighter">이전으로</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script scoped>

export default {
  data() {
    return {
      noticeWriter : '',
      noticeTitle : '',
      noticeContent : ''
    };
  },
  methods: {
    cancel() {
      if (confirm('작성을 취소하고 목록으로 이동하시겠습니까?')) {
        router.go(-1);
      }
    },

    noticeWrite() {
      this.$axios.post(this.$serverUrl + '/notice/NoticeWrite', {
        writer : this.noticeWriter,
        title : this.noticeTitle,
        content : this.noticeContent

      }).then((res) => {
        if (res.data == true) {

          alert("공지사항이 등록되었습니다.");

          location.href = '/notice/NoticeList';

        } else {

          alert("공지사항 등록에 실패하였습니다.");

          return false;
        }

      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('Server Error. Access Later')
        }
      })
    }
  }
}
</script>

<style>
th, td {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: top;
    background: transparent;
}

body {
    margin: 0;
}


.board-box {
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
  border-bottom: 1px solid #ddd;
  padding: 20px;
}

.n-info-txt > li:before {
  content: "▶";
  position: inherit;
  margin-right: 5px;
}
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
.n-table.table-row th, .n-table.table-row td {
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
.n-table.table-row th, .n-table.table-row td {
    height: auto;
    padding: 15px 0;
    box-sizing: border-box;
    border-top: 1px solid #f1f1f1;
    border-bottom: none;
    font-size: 14px;
    text-align: left;
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