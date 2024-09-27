<template>
    <div class="contents">
        <!--제목-->
        <div class="orderdetail_title">
            <h1>주문 상세 내역</h1>
        </div>

        <div class="order_info">
            <span class="ordernum">주문번호 {{ orderDetailOne.orderNum }}</span>
            <span>주문일자 {{ convertTime(orderDetailOne.order_date) }}</span>
        </div>

        <!--목록-->
        <div class="order_view">
            <table>
                <colgroup>
                    <col style="width:40%">
                    <col style="width:20%">
                    <col style="width:20%">
                    <col style="width:20%">
                </colgroup>
                <thead>
                    <tr>
                        <th>상품정보</th>
                        <th>주문수량</th>
                        <th>주문금액</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key = "index" v-for="(orderDetailList, index) in orderDetailList">
                        <td>
                            <div style="display:flex">
                                <router-link :to="{ name: 'product', params: { pno: orderDetailList.pno } }"
                                    class="product_name">
                                    <img :src="orderDetailList.storedFileRootName" class="img_block" alt="product_name">
                                    <p class="product_name">{{ orderDetailList.product_name }}</p>
                                </router-link>
                            </div>
                        </td>
                        <td class = "productCnt">{{ orderDetailList.productCnt }} 개</td>
                        <td>{{ Number(orderDetailList.product_price * orderDetailList.productCnt).toLocaleString() }} 원</td>
                        <td>{{ orderDetailList.paymentStatus }}</td>
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
                        <td>{{ orderDetailOne.recipient }}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{{ orderDetailOne.recipient_phone }}</td>
                    </tr>
                    <tr>
                        <th>배송지 주소</th>
                        <td>{{ formattedTotalAddress }}</td>
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
                            <td>{{ orderDetailOne.payMoney }}원</td>
                        </tr>
                        <tr>
                            <th>최종 결제 금액</th>
                            <td>{{ orderDetailOne.payMoney }}원</td>
                        </tr>
                        <tr>
                            <th>결제 수단</th>
                            <td>{{ orderDetailOne.paySet }}</td>
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
                            <td></td>
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

<script>

export default {

    data() {
        return {
            orderDetailList: {
                pno: '',
                storedFileRootName: '',
                product_name: '',
                product_price: '',
                productCnt : '',
                paymentStatus: '',
                orderDetailNum: '',
            },

            orderDetailOne :  {
                orderNum : '',
                order_date : '',
                order_date: this.convertTime(),
                post_address : '',
                detail_address : '',
                detail_address2 : '',
                recipient : '',
                recipient_phone : '',
                payMoney : '',
                paySet : ''
            },
        }
    },
    created() {
        this.orderNum = this.$route.params.orderNum
        this.getOrderDetailList(this.orderNum)
        this.getOrderDetailOne(this.orderNum)
    },
    computed: {
        formattedTotalAddress() {
            const totalAddress = '(' + this.orderDetailOne.post_address + ')' + this.orderDetailOne.detail_address + this.orderDetailOne.detail_address2
            return totalAddress
        }
    },

    methods: {
        getOrderDetailList(orderNum) {
            this.$axios.get(this.$serverUrl + "/order/orderDetailPage?orderNum=" + orderNum
            ).then((res) => {
                console.log(res.data)
                this.orderDetailList = res.data
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('주문 정보 조회 불가')
                }
            })
        },
        getOrderDetailOne(orderNum) {
            this.$axios.get(this.$serverUrl + "/order/orderDetailOne?orderNum=" + orderNum
            ).then((res) => {
                console.log(res.data)
                this.orderDetailOne = res.data
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('주문 정보 조회 불가')
                }
            })
        },
        convertTime(order_date) {
            var time = new Date(order_date).getTime();
            var date = new Date(time);
            let noticeYear = date.getFullYear();
            let noticeMonth = date.getMonth() + 1;
            let noticeDate = date.getDate();

            let fullDate = noticeYear + "년 - " + noticeMonth + "월 - " + noticeDate + "일";

            return fullDate;
        }
    },

}
</script>



<style>
.contents {
    margin: 0 30px;
}

a {
    text-decoration: none;
    color: black;
}

.orderdetail_title {
    padding-bottom: 14px;
    margin-top: 48px;
}

.order_info {
    margin: 20px 0;
    font-weight: bold;
}

.ordernum {
    margin-right: 30px;
}

.order_view table {
    width: 100%;
    border-collapse: collapse;
}

.order_view th {
    height: 50px;
    border-top: 4px solid #000000;
    border-bottom: 1px solid #000000;
    font-size: 15px;
    vertical-align: middle;
    font-weight: bold;
    text-align: center;
}

.order_view td {
    height: 100px;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
}

.order_view ul {
    padding-top: 30px;
    color: gray;
}

.img_block {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    background-color: black;
    margin-right: 20px;
}

.product_name {
    display: flex;
    align-items: center;
}

/*배송지 정보*/
.delivery_info {
    width: 100%;
    margin: 100px 0;
}

.delivery_info_title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid black;
    margin: 0;
}

.delivery_info_table {
    width: 100%;
}

.delivery_info_table tr {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
}

.delivery_info_table th {
    width: 30%;
    font-weight: bold;
}

.wrap {
    display: flex;
    justify-content: space-between;
}

/*최종 결제 정보*/
.payment_info {
    width: 47%;
    margin: 100px 0;
}

.payment_info_title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid black;
    margin: 0;
}

.payment_info_table {
    width: 100%;
}

.payment_info_table tr {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
}

.payment_info_table th {
    width: 30%;
    font-weight: bold;
}

/*환불 정보 */
.refund_info {
    width: 47%;
    margin: 100px 0;
}

.refund_info_title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid black;
    margin: 0;
}

.refund_info_table {
    width: 100%;
}

.refund_info_table tr {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
}

.refund_info_table th {
    width: 30%;
    font-weight: bold;
}

input {
    border: none;
    text-align: center;
    cursor: default;
}

input:focus {
    outline: none;
    cursor: default;
}
</style>