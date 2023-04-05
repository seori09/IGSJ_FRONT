<template>
  <div class="inquire-box">
    <header class="inquire-title">
      <h1 class="tit">나의 1:1문의내역</h1>
    </header>
    <div class="inquire-contents">
      <div class="contents-title">
        <h3>상품 불량ㅡㅡ</h3>
        <sapn>이젠종로</sapn>
        <span>2023.03.25</span>
      </div>
        <hr>
      <div class="inquirebox-contents">
        <p>반팔이 찢어져서 왔어요;; 힙하긴한데 좀 그럼;;;</p>
        <br>
      </div>
      <div class="n-btn-view">
        <router-link to="/inquire/InquireWrite">
          <button class="n-btn btn-wr">문의하기</button>
        </router-link>
        <router-link to="/inquire/InquireList">
          <button class="n-btn btn-list">목록으로</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.inquire-contents {
    padding: 10px;
    line-height: 20px;
}
.contents-title h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.contents-title span {
  font-size: 15px;
  color: #4d4d4d;
  margin-bottom: 10px;
}

.n-btn-view {
    min-height: 32px;
    text-align: left;
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
.n-btn.btn-wr {
    border: 1px solid #f1f1f1;
    background-color: #f1f1f1;
    color: #000000;
}
.n-btn.btn-wr:hover {
  background-color: #c3c3c3be;
  transition: background 0.3s ease-in-out;
}
.n-btn.btn-list {
  border: none;
  background-color: #000000;
}
.n-btn.btn-list:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}
</style>