<template>
    <div class="contents">

        <!--제목-->
        <div class="title">
            <h1>Order / Payment</h1>
        </div>

        <!--주문서 작성-->
        <form>

            <!--배송지-->
            <div class="section delivery">
                <h3 class="delivery_title">배송 정보</h3>
                <ul class="delivery_box">
                    <li class="delivery_item" style="border-bottom: 1px solid #e5e5e5;">
                        <span class="delivery_item_label">이름 / 연락처</span>
                        <div class="delivery_item_area">
                            <ul>
                                <li id="delivery_name">{{ orderDTO.userName }}</li> |
                                <li id="delivery_phone">{{ orderDTO.userPhoneNumber }}</li>
                            </ul>
                        </div>
                    </li>
                    <li class="delivery_item" style="border-bottom: 1px solid #e5e5e5;">
                        <span class="delivery_item_label">수령인</span>
                        <div class="delivery_item_area">
                            <input type="text" id="recipient" v-model="recipient">
                        </div>
                    </li>
                    <li class="delivery_item" style="border-bottom: 1px solid #e5e5e5;">
                        <span class="delivery_item_label">수령인 전화번호</span>
                        <div class="delivery_item_area">
                            <input type="number" id="recipient_phone" v-model="recipient_phone">
                        </div>
                    </li>
                    <li class="delivery_item">
                        <span class="delivery_item_label">주소</span>
                        <div class="delivery_item_area" id="delivery_addr">
                            <div>
                                <input type="text" id="post_address" v-model="orderDTO.postAddress" readonly />
                                <input type="button" @click="daumZipCode()" value="우편번호 검색" />
                            </div>
                            <input type="text" id="detail_address" v-model="orderDTO.address" style="width:100%"
                                readonly /><br>
                            <input type="text" id="detail_address2" style="width:100%" v-model="orderDTO.detailAddress"
                                placeholder="상세주소" />

                        </div>
                    </li>
                </ul>
            </div>

            <!--상품정보-->
            <div class="section product">
                <h3 class="product_title">상품 정보</h3>

                <ul :key="i" v-for="(product, i) in productList" style="width:100%">
                    <li>
                        <span class="product_info">
                            <input v-model="product.pno" hidden>
                            <img :src="product.storedFileRootName" class="product_img">
                            <input class="productName" v-model="product.product_name" readonly>
                        </span>
                    </li>
                    <li><input class="productCnt" v-model="product.productCnt" readonly>개</li>
                    <li>{{ (product.product_price * product.productCnt).toLocaleString() }}원</li>
                </ul>
                <div class="totalPrice">총 금액: {{ Number(formattedTotalPrice).toLocaleString() }} 원</div>

            </div>

            <!--결제-->
            <div class="section payment">
                <h3 class="payment_title">결제 정보</h3>
                <div id="tabs">
                    <ul class="tab-menu">
                        <li v-for="(tab, index) in tabs" :key="index" v-bind:class="{ active: currentTab == index }">
                            <a href="#" onclick="return false" v-on:click="currentTab = index" value="seltab">{{ tab }}</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div id="tabs" v-show="currentTab == 0">
                            <select v-model="selectBank">
                                <option id="bank" v-for="(bank, i) in bankList" :key="i" :value="bank.value">
                                    {{ bank.name }}
                                </option>
                            </select>
                            <span class="bank_userName">{{ orderDTO.userName }}</span>
                            <ul class="bank_info">
                                <li>
                                    <span>무통장 입금 시 계좌번호는 다음과 같습니다.</span><br>
                                    <span class="igsjBank">신한은행 000-000-000000 | 예금주 IGSJ</span>
                                </li>
                                <li>입금자명, 주문금액이 일치해야 입금확인이 됩니다.</li>
                                <li>무통장 주문 시 입금기한은 3일이며 입금확인이 되지 않을 시 자동 취소됩니다.</li>
                                <li>인터넷뱅킹, 텔레뱅킹, ATM/CD기계, 은행 창구 등에서 입금할 수 있습니다.</li>
                                <li>무통장 주문 방식은 입금이 최종 완료된 후 주문 확인 및 출고가 진행됩니다.</li>
                                <li>입금 전 재고 소진, 상품 품절, 판매 종료 등의 사유가 발생할 경우 주문이 취소됩니다.</li>
                                <li>반복적인 주문취소는 주문제한 사유가 될 수 있습니다.</li>
                            </ul>
                        </div>
                        <div id="tabs" v-show="currentTab == 1">
                            카드결제
                        </div>
                        <div id="tabs" v-show="currentTab == 2">
                            카카오페이
                        </div>
                    </div>
                </div>
            </div>
        </form>

            <!--결제하기 버튼-->
            <div class="pay_btn">
                <button @click="Pay()">결제하기</button>
            </div>

    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            selectBank: '',
            bankList: [
                { name: "입금은행 선택", value: '' },
                { name: "기업은행", value: '기업은행' },
                { name: "우리은행", value: '우리은행' },
                { name: "수협은행", value: '수협은행' },
                { name: "농협중앙회", value: '농협중앙회' },
                { name: "부산은행", value: '부산은행' },
                { name: "신한은행", value: '신한은행' },
                { name: "하나은행", value: '하나은행' },
                { name: "광주은행", value: '광주은행' },
                { name: "우체국", value: '우체국' },
                { name: "대구은행", value: '대구은행' },
                { name: "경남은행", value: '경남은행' }
            ],
            orderDTO: {
                userId: '',
                userName: '',
                userPhoneNumber: '',
                postAddress: '',
                address: '',
                detailAddress: '',

            },
            productList: {
                pno: '',
                storedFileRootName: '',
                product_name: '',
                product_price: '',
                productCnt: ''
            },

            currentTab: 0,
            tabs: ['무통장입금', '카드결제', '카카오페이'],
            popupName: 'postcodePopup',
            post_address: '',
            detail_address: '',
            totalPrice: 0,
            seltab: ''
        };
    },
    created() {
        this.getOrder(this.$store.state.userInfo.userId),
            this.getProductOrder(this.$store.state.userInfo.userId);
    },
    computed: {
        formattedTotalPrice() {
            const totalPrice = this.productList.reduce((acc, product) => {
                return acc + product.product_price * product.productCnt;
            }, 0);
            return totalPrice;
        }
    },

    methods: {
        daumZipCode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                    let extraRoadAddr = ''; // 도로명 조합형 주소 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraRoadAddr !== '') {
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
                    // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                    if (fullRoadAddr !== '') {
                        fullRoadAddr += extraRoadAddr;
                    }
                    this.post_address = data.zonecode; // 5자리의 새 우편번호
                    this.detail_address = fullRoadAddr; // 주소칸에 주소를 넣어준다.
                    document.getElementById('detail_address2').focus();
                }
            }).open({
                popupName: 'postcodePopup'
            });
        },
        getOrder(userId) {
            this.$axios.get(this.$serverUrl + "/order/orderPage/" + userId
            ).then((res) => {
                console.log(res.data)
                this.orderDTO = res.data
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('회원 정보 조회 불가')
                }
            })
        },
        getProductOrder(userId) {
            this.$axios.get(this.$serverUrl + "/order/productOrderPage/" + userId
            ).then((res) => {
                console.log(res.data)
                this.productList = res.data
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('제품 정보 조회 불가')
                }
            })
        },
        Pay() {
            /* if (document.getElementById("recipient") == '') {
                alert("수령인을 입력해주십시오.")
                document.getElementById("recipient").focus();
                return false
            }
            if (document.getElementById("recipient_phone") == '') {
                alert("수령인 전화번호를 입력해주십시오.")
                document.getElementById("recipient_phone").focus();
                return false
            }
            if (document.getElementById("detail_address2") == '') {
                alert("상세주소를 입력해주십시오.")
                document.getElementById("detail_address2").focus();
                return false
            }
            if (document.getElementById("tabs").value == '무통장입금' && document.getElementById("bank").value == '') {
                alert("입금은행을 선택해주십시오.")
                document.getElementById("bank").focus();
                return false
            } */
            this.$axios.post(this.$serverUrl + "/order/orderNum", {
                userId: this.$store.state.userInfo.userId,
                post_address: this.orderDTO.postAddress,
                detail_address: this.orderDTO.address,
                detail_address2: this.orderDTO.detailAddress,
                recipient: this.recipient,
                recipient_phone: this.recipient_phone,
                paySet: this.tabs[this.currentTab],
                payMoney: this.formattedTotalPrice,
                payBank: this.selectBank

            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('주문 전송 불가')
                }
            }),
            alert("주문이 완료되었습니다.");
            location.href = '/orderFinish';
        }
    }
};
</script>

<style>
* {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.section {
    padding: 20px;
}

.title {
    /* padding-bottom: 14px;
    margin-top: 48px; */
    clear: both;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #ddd;
}

ul {
    list-style: none;
}

.delivery_title,
.product_title,
.payment_title {
    margin-bottom: 20px;
}

a {
    text-decoration: none;
    color: black;
}



/*배송지 */
.delivery_box {
    padding: 0;
    border: 1px solid #e5e5e5;
}

.delivery_item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 10px 10px 10px 0;
}

.delivery_item_label {
    display: flex;
    width: 200px;
    padding: 0 10px;
    font-weight: bold;
}

.delivery_item_area {
    height: 100%;
    width: 100%;
}

.delivery_item_area ul {
    display: flex;
    padding: 0;
}

.delivery_item_area input {
    margin: 5px 0;
    border: 2px solid #e5e5e5;
}

input:focus {
    outline: none;
}

.delivery_item_area button {
    border: none;
    background: #e5e5e5;
    padding: 3px 15px;
    font-weight: bold;
}

#delivery_name {
    margin-right: 10px;
}

#delivery_phone {
    margin-left: 10px;
}


/*상품정보 */

.product input {
    border: none;
    width: 80%;
}

.product_table {
    width: 100%;
    text-align: center;
}

.product_table th,
.product_table td {
    border: 1px solid #e5e5e5;
}

.product_table th {
    padding: 15px 0;
}

.td_product {
    padding: 15px;
    text-align: left;
}

.product_img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
}

.product_img img {
    width: 100%;
}

.productName {
    text-align: left;
}

.productCnt {
    text-align: right;
}

.productPrice {
    text-align: right;
}

.totalPrice {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    margin: 20px 20px 0 0;
    justify-content: flex-end;
}

.totalPrice input {
    width: 20%;
    text-align: right;
}

/*결제*/
.payment_box {
    border: 1px solid #e5e5e5;
    width: 100%;
}

.tab-menu {
    display: flex;
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 10px;
}

.tab-menu li {
    border: 1px solid #e5e5e5;
    padding: 10px;
    margin: 0 10px 0 0;
}

.tab-menu li a {
    color: black;
    text-decoration-line: none;
}

.tab-content {
    border: 1px solid #e5e5e5;
    width: 100%;
    padding: 10px;
}

.bank_info {
    padding: 0;
    margin: 20px;
    font-size: 12px;
    list-style: disc;
    color: gray;
}

.bank_info li {
    margin-bottom: 7px;
}

.bank_userName {
    margin-left: 15px;
    border: 1px solid #e5e5e5;
    padding: 0 50px;
}

.igsjBank {
    font-size: 16px;
    font-weight: bold;
    color: black;
}

.active {
    background-color: #e5e5e5;
}

/*결제하기 버튼*/
.pay_btn {
    margin: 50px 0;
    text-align: center;
}

.pay_btn button {
    width: 300px;
    padding: 10px;
    border: none;
    background-color: #0078ff;
    color: white;
    font-size: 20px;
    font-weight: bold;
}
</style>