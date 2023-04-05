<template>
    <div class="contents">
        <!--제목-->
        <div class="orderdetail_title">
            <h1>주문 상세 내역</h1>
        </div>
        
        <div class="order_info">
            <span class="ordernum">주문번호 orderNum</span>
            <span>주문일자 order_date</span>
        </div>
        
        <!--목록-->
        <div class="order_view">
            <table>
                <colgroup>
                    <col style="width:50%">
                    <col style="width:25%">
                    <col style="width:25%">
                </colgroup>
                <thead>
                    <tr>
                        <th>상품정보</th>
                        <th>주문금액(수량)</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    <!--<tr :key="i" v-for="(order, i) in orderList">-->
                    <tr>
                        <td>
                            <div style="display:flex">
                                <a href="#" class="img_block">
                                    <img src="" alt="product_name">
                                </a>
                                <a href="#" class="product_name">product_name</a>
                            </div>
                        </td> <!--productDTO-->
                        <td>productPrice</td>  <!--productDTO-->
                        <td>paymentStatus</td>    <!--orderDetailDTO-->
                    </tr>
                </tbody>
            </table>
            <!--안내문-->
            <div>
                <ul>
                    <li>동일한 주문번호라도 2개 이상의 브랜드에서 주문하신 경우 출고지 주소가 달라 각각 출고됩니다. (택배 박스를 2개 이상 수령 가능)</li>
                    <li>출고 완료 직후 교환 / 환불 요청을 하더라도 상품을 수령하신 후 택배 업체를 통해 보내주셔야 처리 가능합니다.</li>
                    <li>별도의 구매 결정이 없더라도 상품 배송 완료 후 7일이 지난 경우에는 자동 구매확정됩니다.</li>
                    <li>자세한 내용은 FAQ를 확인하여 주시기 바랍니다.</li>
                </ul>
            </div>
        </div>

        <!--배송지 정보-->
        <div class="delivery_info">
            <p class="delivery_info_title">배송지 정보</p>
            <table class="table-row delivery_info_table">
                <tbody>
                    <tr>
                        <th>이름</th>
                        <td>recipient(수령인)</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>recipient_phone(수령인번호)</td>
                    </tr>
                    <tr>
                        <th>배송지 주소</th>
                        <td>post_address + detail_address + detail_address2</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="wrap">
            <!--최종 결제 정보-->
            <div class="payment_info">
                <p class="payment_info_title">최종 결제 정보</p>
                <table class="table-row payment_info_table">
                    <tbody>
                        <tr>
                            <th>상품 합계</th>
                            <td>payMoney(결제총금액)</td>
                        </tr>
                        <tr>
                            <th>최종 결제 금액</th>
                            <td>payMoney(결제총금액)</td>
                        </tr>
                        <tr>
                            <th>결제 수단</th>
                            <td>payset(결제방법)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!--환불 정보-->
            <div class="refund_info">
                <p class="refund_info_title">환불 정보</p>
                <table class="table-row refund_info_table">
                    <tbody>
                        <tr>
                            <th>환불 금액</th>
                            <td>Refund_money</td>
                        </tr>
                        <tr>
                            <th>환불 수단</th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<style>
.contents{
    margin: 0 30px;
}
a{
    text-decoration: none;
    color: black;
}
.orderdetail_title{
    padding-bottom: 14px;
    margin-top: 48px;
}
.order_info{
    margin: 20px 0;
    font-weight: bold;
}
.ordernum{
    margin-right: 30px;
}
.order_view table{
    width: 100%;
    border-collapse: collapse;
}
.order_view th{
    height: 50px;
    border-top: 4px solid #000000;
    border-bottom: 1px solid #000000;
    font-size: 15px;
    vertical-align: middle;
    font-weight: bold;
    text-align: center;
}
.order_view td{
    height: 100px;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
}
.order_view ul{
    padding-top: 30px;
    color: gray;
}
.img_block{
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    background-color: black;
    margin-right: 20px;
}
.product_name{
    display: flex;
    align-items: center;
}


/*배송지 정보*/
.delivery_info{
    width: 47%;
    margin: 100px 0;
}
.delivery_info_title{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid black;
    margin: 0;
}
.delivery_info_table{
    width: 100%;
}
.delivery_info_table tr{
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
}
.delivery_info_table th{
    width: 30%;
    font-weight: bold;
}

.wrap{
    display: flex;
    justify-content: space-between;
}
/*최종 결제 정보*/
.payment_info{
    width: 47%;
    margin: 100px 0;
}
.payment_info_title{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid black;
    margin: 0;
}
.payment_info_table{
    width: 100%;
}
.payment_info_table tr{
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
}
.payment_info_table th{
    width: 30%;
    font-weight: bold;
}

/*환불 정보 */
.refund_info{
    width: 47%;
    margin: 100px 0;
}
.refund_info_title{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid black;
    margin: 0;
}
.refund_info_table{
    width: 100%;
}
.refund_info_table tr{
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
}
.refund_info_table th{
    width: 30%;
    font-weight: bold;
}

</style>