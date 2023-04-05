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
      <form method="post" action="">

      <h4 class="title_cs font-mss">1:1 Q&A</h4>
			<ul class="n-info-txt">
				<li class="text-danger">제품 사용, 오염, 전용 박스 손상, 라벨 제거, 사은품 및 부속 사용/분실 시, 환불이 불가능 합니다.</li>
				<li>주문내역/환불은 <router-link to="/#" class="button">마이페이지 ▶ 주문내역</router-link>에서 확인하실 수 있습니다.</li>
				<li>1:1문의 처리 내역은 <router-link to="/InquiryList" class="button">나의 문의내역</router-link>에서 확인하실 수 있습니다.</li>
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
                <th scope="row">제품번호</th>
                <td class="order-check">
                  <input type="text" name="ord-no" class="n-input" value="16482" readonly>
                </td>
              </tr>
              <tr>
                <th scope="row">문의번호</th>
                <td class="order-check">
                  <input type="text" name="ord-no" class="n-input" value="1" readonly>
                </td>
              </tr>
              <tr class="n-name-row">
                <th scope="row">작성일자</th>
                <td>
                  <input type="text" class="n-input" value="2023-03-29" readonly>
                </td>
              </tr>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input type="text" class="n-input" value="이젠" readonly>
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input type="text" class="n-input" name="subject" value="" placeholder="제목을 입력해주세요" >
                </td>
              </tr>
              <tr class="n-same-row">
                <th scope="row">문의내용</th>
                <td>
                  <textarea name="qa_msg" cols="100" rows="100" class="textarea-input" placeholder="고객님들의 불편사항 개선을 위해 최선을 다하겠습니다."></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="n-btn-group">
        <button @click="cancel();" class="n-btn btn-lighter">취소</button>
        <button @click="qna_add();" class="n-btn btn-accent">수정하기</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
  clear: both;
  border-bottom: 1px solid #ddd;
  min-height: 800px;
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
  clear: both;
  position: relative;
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
.inquiry-type_list_item_radio:checked + .inquiry-type_list_item_text {
    border-color: #000;
    background-color: #fff;
    color: #000;
}

.blind {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0 0 0 0);
}
.inquiry-type_list_item_text {
    display: block;
    padding: 7px 0;
    border: 1px solid #F5F5F5;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #F5F5F5;
    color: #777;
    text-align: center;
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
    -webkit-transition: border 0.2s, background 0.2s ease-in-out;
    -moz-transition: border 0.2s, background 0.2s ease-in-out;
    -o-transition: border 0.2s, background 0.2s ease-in-out;
    transition: border 0.2s, background 0.2s ease-in-out;
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