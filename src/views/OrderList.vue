<template>
    <div class="contents">
        <!--제목-->
        <div class="orderlist_title">
            <h1>주문내역 조회</h1>
        </div>

        <!--검색-->
        <div class="filter">
            <input type="text" placeholder="상품명으로 검색" />&nbsp;
            <button type="button">조회하기</button>
        </div>

        <!--목록-->
        <div class="order_view">
            <table>
                <colgroup>
                    <col style="width:35%">
                    <col style="width:15%">
                    <col style="width:20%">
                    <col style="width:15%">
                    <col style="width:15%">
                </colgroup>
                <thead>
                    <tr>
                        <th>상품정보</th>
                        <th>주문일자</th>
                        <th>주문번호</th>
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
                        </td>
                        <td>order_date</td> 
                        <td><router-link to="/orderDetail">orderNum</router-link></td> 
                        <td>productPrice</td> 
                        <td>paymentStatus</td>
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
            orderList: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            this.orderList = await this.$api('', 'get')
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
    background-color: black;
    margin-right: 20px;
}

.product_name {
    display: flex;
    align-items: center;
}</style>