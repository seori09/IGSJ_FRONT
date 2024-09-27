<template>
    <section class="container">
        <div class="inner-container">
            <header class="passpageHeader">
                <h2>마이페이지(Login)</h2>
                <span style="color:red; font-size:10px;"> * 카카오 로그인 시 초기 비밀번호는 아이디와 동일합니다 (마이페이지에서 수정해주세요)</span>
            </header>
            <br />
            <div class="loginbox">
                <div class="input-id">
                    <label>아이디</label>
                    <input type="text" v-model="userId" maxlength="20" readonly />
                </div>
                <br />
                <div class="input-pass">
                    <label>비밀번호</label>
                    <input type="password" v-model="userPwd" maxlength="20" placeholder="비밀번호 입력" />
                </div>
                <br />
                <br />
                <div class="passok">
                    <button type="submit" id="btn-ok" class="btn btn-dark" @click="enterEdit()">확인</button>
                </div>
                <div class="passmain">
                    <button type="button" id="btn-main" class="btn btn-light" @click="goHome()">메인페이지</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    data() {
        return {
            memberDTO: {},
            userId: '',
            userPwd: ''
        }
    },
    created() {  //lifecycle hook - vue.js
        this.enter(this.$store.state.userInfo.userId)
    },
    methods: {
        goHome() {
            location.href = 'http://localhost:8080/'
        },
        enter(userId) {
            this.$axios.get(this.$serverUrl + "/member/memberProfile/" + userId
            ).then((res) => {
                console.log(res.data)
                this.memberDTO = res.data
                this.userId = this.memberDTO.userId
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('회원 정보 조회 불가')
                }
            })
        },
        enterEdit() {
            this.$axios.post(this.$serverUrl + "/member/passVerify", {
                userId: this.userId,
                userPwd: this.userPwd
            }).then((res) => {
                console.log(res.data)
                if (res.data == 1) {
                    alert("비밀번호 인증 성공")
                    location.href = "http://localhost:8080/mypage"
                    // this.$router.push({name:'MyPage'})
                } else if (res.data == 0) {
                    alert("비밀번호 인증 실패")
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('회원 비밀번호 검증 실패')
                }
            })
        }
    }
}

</script>

<style scoped>
.inner-container {
    text-align: center;
}

.passpageHeader {
    display: flex;
    float: center;
    align-items: center;
    border-bottom: 3px solid #000000;
    padding-bottom: 5px;
    margin-top: 30px;
    line-height: 1.5;
    position: relative;
}

.passpageHeader h2 {
    color: #000000;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    padding: 5px;
    margin-bottom: 20px;
}

input {
    width: 300px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
    background-color: #EEEFF1;
}

.input-id label {
    margin-right: 40px
}

.input-pass label {
    margin-right: 22px
}

#btn-ok {
    width: 30%;
    margin-bottom: 10px;
    margin-left: 30px;
}

#btn-main {
    width: 30%;
    margin-bottom: 10px;
    margin-left: 30px;
}</style>