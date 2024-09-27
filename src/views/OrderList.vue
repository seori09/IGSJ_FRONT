<template>
    <div class="contents">
        <!--제목-->
        <div class="orderlist_title">
            <h1>주문내역 조회</h1>
        </div>

        <!--검색-->
        <!-- <div class="filter">
            <input type="text" placeholder="상품명으로 검색" />&nbsp;
            <button type="button">조회하기</button>
        </div> -->

        <!--목록-->
        <div class="order_view">
            <table>
                <colgroup>
                    <col style="width:40%">
                    <col style="width:15%">
                    <col style="width:15%">
                    <col style="width:15%">
                    <col style="width:10%">
                </colgroup>
                <thead>
                    <tr>
                        <th>상품정보</th>
                        <th>주문일자</th>
                        <th>주문번호</th>
                        <th>주문수량</th>
                        <th>주문금액</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="i" v-for="(order, i) in orderList">
                        <td>
                            <div style="display:flex">
                                <router-link :to="{name: 'product', params: {pno:order.pno}}" class="product_name">
                                    <img :src="order.storedFileRootName" class="img_block" alt="product_name">
                                    <input v-model="order.product_name" class="product_name" readonly>
                                </router-link>
                            </div>
                        </td>
                        <td>{{ convertTime(order.order_date) }}</td>
                        <!-- <td><input v-model="order.order_date" readonly></td>  -->
                        <td><router-link :to="{name: 'orderDetail', params: {orderNum:order.orderNum}}"><input v-model="order.orderNum" class="orderNum"></router-link></td>
                        <td>{{ order.productCnt }}개</td>
                        <td>{{  Number(order.product_price * order.productCnt).toLocaleString() }} 원 </td>
                        <td><input v-model="order.paymentStatus" readonly></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderList:{
                storedFileRootName: '',
                product_name: '',
                order_date: this.convertTime(),
                orderNum: '',
                product_price: '',
                productCnt : '',
                paymentStatus: '',
                pno:''
            },

        }
    },
    created() {
        this.getOrderList(this.$store.state.userInfo.userId)
    },
    methods: {
        getOrderList(userId) {
            this.$axios.get(this.$serverUrl + "/order/orderListPage/" + userId
            ).then((res) => {
                console.log(res.data)
                this.orderList = res.data
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

            let fullDate = noticeYear + "년 " + noticeMonth + "월 " + noticeDate + "일";

            return fullDate;
        }
    }
}

</script>

<style scoped>
.contents {
    margin: 0 30px;
}

.orderlist_title {
    padding-bottom: 14px;
    margin-top: 48px;
}
.filter {
    margin: 20px 0;
}
a{
    text-decoration: none;
    color: black;
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
    margin-right: 20px;
    cursor: pointer;
}

.product_name {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
}

.orderNum{
    cursor: pointer;
}

img{
    width: 100%;
}

input{
    width: 100%;
    border: none;
    text-align: center;
    cursor: default;
}
input:focus {
    outline: none;
    cursor: default;
}

</style>