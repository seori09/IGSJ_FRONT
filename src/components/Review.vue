<template>
  <div class="review-box">
    <div class="review-tit">
      <h3>구매후기</h3>
      <ul class="rev-wr-no">
        <li>작성하신 후기는 IGSJ 스토어 이용자에게 공개됩니다.</li>
        <li>상품과 관련없거나 문자 및 기호의 단순 나열, 반복된 내용의 후기내용은 삭제처리될 수 있습니다.</li>
      </ul>
    </div>

    <!-- 리뷰write -->
    <div class="review-write">
      <form>
        <div class="rev-info">
          <span v-if=" this.id !== undefined ">{{this.$store.state.userInfo.userId}}</span>
          <span v-else>작성자ID</span>
          <p class="hide">pno</p>
        </div>
        <textarea class="rev-txt" placeholder="상품에 대한 평가를 20자 이상 작성해 주세요." minlength="20" v-model="writeRvContent"></textarea>
        <button type="button" class="btn-b" @click="reviewCreate()">후기등록</button>
      </form>
    </div>
    <!-- 리뷰write -->
  
    <!-- 리뷰view -->
    <div class="review-content">
      <ul>
        <li :key="i" v-for="(review, i) in reviewList">
          <div class="rev-info">
            <span class="us-nm">{{review.rvWriter}}</span>
            <span class="re-date">{{review.rvRegDate}}</span>
            <p class="hide">{{review.pno}}</p>
          </div>
          <p>{{review.rvContent}}</p>
          <div class="btn-gr" v-if="this.id===review.rvWriter">
            <button type="button" class='btn-a' @click="modalPopUp(review.rvno)">수정</button>
            <button type="button" class='btn-b' @click="reviewDelete(review.rvno)">삭제</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 리뷰view -->
  
    <!-- 댓글수정 모달창 -->
    <div class="modal-box" v-if="modalState == true">
      <div class="modal-content">
        <h3>리뷰수정</h3>
        <form>
          <div class="rev-info">
            <span>작성자ID</span>
            <p class="hide">pno</p>
          </div>
          <textarea class="rev-txt" placeholder="상품에 대한 평가를 20자 이상 작성해 주세요." minlength="20" v-model="newRvContent">
          </textarea>
          <div class="btn-gr">
            <button type="button" class="btn-a" @click="reviewUpdate(this.reviewToBeUpdated)">수정</button>
            <button type="button" class="btn-b" @click="modalPopDown()">취소</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 댓글수정 모달창 -->

  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        id:'', // (부모Comp에서 지정) id
        pno: '', // (부모Comp에서 지정) pno
        writeRvContent: '',
        modalState: false,
        reviewList: {},
        reviewToBeUpdated: '',
        newRvContent: ''
      }
    },
    methods:{
      reviewRead(pno) { // 리뷰 조회
        this.$axios.get(this.$serverUrl + '/review/getReviewList/'+pno)
        .then((res) => {this.reviewList = res.data})
        .catch((err) => {if (err.message.indexOf('Network Error') > -1) {alert('Review Read Error')}
        })
      },
      reviewCreate() { // 리뷰 작성
        if(this.id === undefined){
          alert("로그인 먼저 해주세요")
          this.$router.push('/login')
        }
        else {
          this.$axios.post(this.$serverUrl + '/review/writeReview', {
            pno: this.pno,
            rvContent: this.writeRvContent,
            rvWriter: this.id
          })
          .then((res) => {
            res.data ? alert('작성이 완료되었습니다.') : alert('WRITE has been Denied')
            location.reload()
          })
          .catch((err) => {if (err.message.indexOf('Network Error') > -1) {alert('Review Create Error')}}) 
        }
      },
      reviewUpdate(reviewNo){ // 리뷰 수정
        this.$axios.post(this.$serverUrl + '/review/modifyReview', {
          pno : this.pno,
          rvContent : this.newRvContent,
          rvno : reviewNo
        })
        .then((res) => {
          res.data ? alert('리뷰가 수정되었습니다.') : alert('UPDATE has been Denied')
          this.modalPopDown()
          location.reload()
        })
        .catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('Review Update Error')
          }
        })
      },
      reviewDelete(reviewNo){ // 리뷰 삭제
        this.$axios.post(this.$serverUrl + '/review/removeReview', {
          pno : this.pno,
          rvno : reviewNo
        })
        .then((res) => {
          res.data ? alert("리뷰가 삭제되었습니다.") : alert("Your 'DELETE' Trial has been failed/denied")
          location.reload()
        })
        .catch((err) => {if (err.message.indexOf('Network Error') > -1) {alert('Review Delete Error')}})
      },
      modalPopUp(rvno){ // 팝업창(리뷰 수정) 생성
        this.reviewToBeUpdated = rvno
        this.modalState = true
      },
      modalPopDown(){ // 팝업창(리뷰 수정) 제거
        this.reviewToBeUpdated = ''
        this.newRvContent=''
        this.modalState = false
      }
    }
  }
</script>
  
<style scoped>
  /* review */
  .review-box {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .review-tit h3 {
    font-weight: 600;
    border-bottom: 3px solid #000;
    padding: 10px 0;
    text-align: left;
  }
  .review-box ul {
    padding: 10px 0;
    margin: 0;
    list-style: none;
    text-align: left;
  }
  .rev-wr-no > li:before {
    content: "▶";
    position: inherit;
    margin-right: 5px;
  }
  .rev-wr-no li {
    color: #6c757d;
    font-size: 15px;
  }
  .review-write {
    min-height: 180px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .review-content {
    min-height: 200px;
  }
  .review-content li{
    border-bottom: 1px solid #ccc;
  }
  .rev-info {
    display: flex;
  }
  .rev-info span {
    display: flex;
    align-items: center;
    padding-right: 10px;
    font-weight: 600;
  }
  .hide {
    visibility: hidden;
    padding: 0;
  }
  .rev-info .re-date {
    color: #6c757d;;
  }
  .rev-txt {
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    padding: 5px;
    margin-top: 10px;
    resize: none;
  }
  .review-box .btn-gr {
    display: flex;
    justify-content: left;
    margin: 20px 0;
  }
  .review-box .btn-b {
    background-color: #000;
    color: #fff;
    display: block;
    min-width: 90px;
    height: 40px;
    box-sizing: border-box;
    padding: 2px 8px 0 8px;
    margin: 10px 0;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }
  .review-box .btn-b:hover {
    border: none;
    background-color: #0a3bffbe;
    transition: background 0.3s ease-in-out;
  }
  .review-box .btn-a {
    border: 1px solid #f1f1f1;
    background-color: #f1f1f1;
    color: #000000;
    display: block;
    min-width: 90px;
    height: 40px;
    box-sizing: border-box;
    padding: 2px 8px 0 8px;
    margin: 10px 0;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }
  .review-box .btn-a:hover {
    background-color: #c3c3c3be;
    transition: background 0.3s ease-in-out;
  }
  /* review */
  
  /* 모달창 */
  .modal-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    flex-direction: column;
    align-items: center;
  }
  .modal-content {
    width: 1000px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    margin: 130px 0;
  }
  .modal-content  h3 {
    font-weight: 600;
    border-bottom: 3px solid #000;
    padding: 10px 0;
    text-align: left;
  }
  .modal-content .rev-info {
    display: flex;
  }
  .modal-content .rev-info span {
    display: flex;
    align-items: center;
    padding-right: 10px;
    font-weight: 600;
  }
  .modal-content .rev-info .re-date {
    color: #6c757d;;
  }
  /* 모달창 */
</style>