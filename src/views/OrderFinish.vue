<template>
    <div class="contents">
        <!--제목-->
        <div class="title">
            <h1>Order / Payment</h1>
        </div>

        <!--결제완료타이틀-->
        <div class="finish">
            <p class="finish_title">주문과 결제가 정상적으로 완료되었습니다.</p>
            <p class="finish_info">업체(브랜드)의 주문 확인 후 발송됩니다.</p>

            <button class="btn_home" @click="$router.push('/')">홈으로 가기</button>
        </div>

    </div>
</template>


<style>
.contents{
    min-height: 500px;
}
.finish {
    padding: 80px;
    text-align: center;
}
a{
    text-decoration: none;
    color: black;
}
.title {
    /* padding-bottom: 14px;
    margin-top: 48px; */
    clear: both;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #ddd;
}

.finish_ordernum {
    color: gray;
    margin-bottom: 20px;
}

.finish_title {
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
}

.finish_info {
    font-weight: bold;
}

.finish button {
    margin: 0 10px;
    padding: 10px 0;
    width: 200px;
    margin-top: 20px;
}

.btn_orderdetail {
    border: 1px solid #e5e5e5;
    background-color: white;
    font-weight: bold;
}

.btn_home {
    border: none;
    color: white;
    background-color: black;
    font-weight: bold;
}

</style>