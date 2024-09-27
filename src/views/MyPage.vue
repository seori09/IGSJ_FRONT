<template>
	<section class="container">
		<header class="mypageheader">
			<h2>회원 정보 수정</h2>
		</header>
		<table class="n-table table-row my-info-modify">
			<tbody>
				<tr class="mypageid">
					<th scope="row">아이디<label>(아이디는 수정이 불가능합니다.)</label></th>
					<td>
						<input type="text" class="form-control" id="id" v-model="this.memberDTO.userId"
							onkeyup="this.value=this.value.replace(/[^a-zA-Z][^0-9]/g,'');" maxlength="20" readonly />
					</td>
				</tr>
				<tr class="mypagepwd">
					<th scope="row"><label>비밀번호</label></th>
					<td>
						<input type="password" class="form-control" id="pwd" v-model="this.memberDTO.userPwd" maxlength="20"
							placeholder="비밀번호 입력" />
					</td>
				</tr>
				<tr class="mypagerepwd">
					<th scope="row"><label>비밀번호 확인</label></th>
					<td>
						<input type="password" class="form-control" id="repwd" maxlength="20" placeholder="비밀번호 확인" />
					</td>
				</tr>
				<tr class="mypagename">
					<th scope="row"><label>이름</label></th>
					<td>
						<input type="text" class="form-control" id="name" v-model="this.memberDTO.userName" maxlength="20"
							readonly title="이름은 별도의 인증과정을 거쳐야 수정이 가능합니다." />
					</td>
				</tr>
				<tr class="mypagebirth">
					<th scope="row"><label>생년월일</label></th>
					<td>
						<input type="date" class="form-control" id="birth" v-model="this.memberDTO.userBirth" maxlength="20"
							readonly title="생년월일은 별도의 인증과정을 거쳐야 수정이 가능합니다." />
					</td>
				</tr>
				<tr class="mypagephone">
					<th scope="row"><label>전화번호</label></th>
					<td>
						<input type="tel" class="form-control" id="phoneNumber" v-model="this.memberDTO.userPhoneNumber"
							onkeyup="this.value=this.value.replace(/[^0-9]/gi,'');" maxlength="20" readonly
							title="전화번호는 별도의 인증과정을 거쳐야 수정이 가능합니다." />
					</td>
				</tr>
				<tr class="mypageemail">
					<th scope="row"><label>이메일</label></th>
					<td>
						<input type="email" class="form-control" id="email" v-model="this.memberDTO.userEmail"
							maxlength="100" placeholder="이메일 입력" />
					</td>
				</tr>
				<tr class="mypagepost">
					<th scope="row"><label>우편 번호</label></th>
					<td>
						<span class="span-post">
							<input type="text" class="form-control" id="zipcode"
								v-model="this.memberAddressDTO.postAddress" />
							&emsp;
							<input type="button" class="form-control btn btn-sm btn-dark input-post-search"
								@click="daumZipCode()" value="우편번호 검색" />
							<!-- 자바스크립트로 api 처리하자 -->
						</span>
					</td>
				</tr>
				<tr class="mypageadd">
					<th scope="row"><label>주 소</label></th>
					<td>
						<input type="text" class="form-control" id="address_1" v-model="this.memberAddressDTO.address" />
					</td>
				</tr>
				<tr class="myapgedetailadd">
					<th scope="row"><label>상세 주소</label></th>
					<td>
						<input type="text" class="form-control" id="address_2"
							v-model="this.memberAddressDTO.detailAddress" />
					</td>
				</tr>
				<!--수정버튼-->
				<tr class="mypagebutton">
					<th scope="row"></th>
					<td>
						<button type="submit" id="btn-modify" class="btn btn-sm btn-dark"
							@click="editMember(userId)">수정</button>
						<button type="button" id="btn-delete" class="btn btn-sm btn-light"
							@click="removeMember()">회원탈퇴</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
export default {
	data() {
		return {
			memberDTO: {
				userId: '',
				userPwd: '',
				userName: '',
				userPhoneNumber: '',
				userEmail: '',
				userBirth: ''
			},
			memberAddressDTO: {
				postAddress: '',
				address: '',
				detailAddress: ''
			}
		}
	},
	created() {  //lifecycle hook - vue.js
		this.editInfo(this.$store.state.userInfo.userId)
	},
	methods: {
		// 수정을 위한 회원 정보 조회
		editInfo(userId) {
			this.$axios.get(this.$serverUrl + "/member/memberProfile/" + userId
			).then((res) => {
				console.log(res.data)
				this.memberDTO = res.data
			}).catch((err) => {
				if (err.message.indexOf('Network Error') > -1) {
					alert('회원 정보 조회 불가')
				}
			}),
				//수정을 위한 회원 주소 정보 조회
				this.$axios.get(this.$serverUrl + "/address/memberAddressProfile/" + userId
				).then((res) => {
					console.log(res.data)
					this.memberAddressDTO = res.data
				}).catch((err) => {
					if (err.message.indexOf('Network Error') > -1) {
						alert('회원 주소 정보 조회 불가')
					}
				})
		},
		// 회원 수정
		editMember() {
			const edit = confirm("회원정보를 수정하시겠습니까?")
			if (edit == true) {
				if (document.getElementById("pwd").value == "" || document.getElementById("pwd").value == null || document.getElementById("pwd").value.length < 4) {
					alert("회원정보 수정에는 비밀번호가 필요합니다.")
					document.getElementById("pwd").focus();
					return false
				}
				if (document.getElementById("pwd").value != document.getElementById("repwd").value) {
					alert("비밀번호와 비밀번호 확인 입력값이 다릅니다.")
					document.getElementById("repwd").focus();
					return false
				}
				this.$axios.post(this.$serverUrl + "/member/memberModify", {
					userId: this.memberDTO.userId,
					userPwd: this.memberDTO.userPwd,
					userName: this.memberDTO.userName,
					userEmail: this.memberDTO.userEmail,
					userPhoneNumber: this.memberDTO.userPhoneNumber,
					userBirth: this.memberDTO.userBirth,
				}).then((res) => {
					console.log(res)
				}).catch((err) => {
					if (err.message.indexOf('Network Error') > -1) {
						alert('회원정보 수정 불가')
					}
				}),
					// 회원 주소 정보 수정
					this.$axios.post(this.$serverUrl + "/address/memberAddressModify", {
						userId: this.memberDTO.userId,
						postAddress: this.memberAddressDTO.postAddress,
						address: this.memberAddressDTO.address,
						detailAddress: this.memberAddressDTO.detailAddress,
					}).then((res) => {
						console.log(res)
					}).catch((err) => {
						if (err.message.indexOf('Network Error') > -1) {
							alert('회원 주소 정보 수정 불가')
						}
					})
			} else {
				alert("회원 정보 수정이 취소되었습니다.")
			}
			alert("회원정보 수정이 완료되었습니다.")
		},
		removeMember() {
			// 회원탈퇴
			const deleteYN = confirm("회원 탈퇴를 진행하시겠습니까?");

			if (deleteYN == true) {
				if (document.getElementById("pwd").value == "" || document.getElementById("pwd").value == null || document.getElementById("pwd").value.length < 4) {
					alert("회원정보 수정에는 비밀번호가 필요합니다.")
					document.getElementById("pwd").focus();
					return false
				}
				if (document.getElementById("pwd").value != document.getElementById("repwd").value) {
					alert("비밀번호와 비밀번호 확인 입력값이 다릅니다.")
					document.getElementById("repwd").focus();
					return false
				}
				this.$axios.post(this.$serverUrl + "/member/removeMember", {
					userId: this.memberDTO.userId
				}).then((res) => {
					console.log(res);
					console.log(res.data);

					if (res.data == 1) {
						alert("회원탈퇴가 완료되었습니다.")
						this.$store.commit('signOut')
						location.href = "http://localhost:8080/"
					}

				}).catch((err) => {
					alert("회원 탈퇴에 실패 하였습니다.\n주문목록이나 주문현황을 확인 하신 뒤 관리자에게 문의 해 주세요.");
					console.log(err.request.status)
					if(err.request.status == 500){
						location.href = "http://localhost:8080/inquire/InquireWrite";
					}

				})
			} else {
				alert("회원탈퇴가 취소되었습니다.")
			}
		},
		// 다음주소api
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
					this.memberAddressDTO.postAddress = data.zonecode; // 5자리의 새 우편번호
					this.memberAddressDTO.address = fullRoadAddr; // 주소칸에 주소를 넣어준다.
					document.getElementById('address_2').focus();
				}
			}).open({
				popupName: 'postcodePopup'

			});

		}
	}
}

</script>

<style scoped>
.mypageheader {
	display: flex;
	align-items: center;
	border-bottom: 1px solid lightgray;
	padding: 10px 20px 10px 20px;
	line-height: 1.5;
	position: relative;
}

.mypageheader h2 {
	color: #000000;
	font-weight: bold;
	font-size: 20px;
	text-transform: uppercase;
	padding: 4px;
	margin-bottom: 0.5px;
}

/* .n-table th {
		text-align: left;
    	font-weight: normal;
    	vertical-align: top;
	} */
.n-table tr th {
	height: auto;
	padding: 10px 10px;
	box-sizing: border-box;
	border-top: 1px solid lightgray;
	border-bottom: none;
	font-size: 14px;
	background-color: #f9f9f9;
}

.n-table tr td {
	width: 1000px;
	height: auto;
	padding: 10px 10px;
	box-sizing: border-box;
	border-top: 1px solid lightgray;
	border-bottom: none;
	font-size: 14px;
}

.container .mypageadd input,
.container .myapgedetailadd input,
.container .mypageemail input {
	border: 1 solid black;
	width: 500px;
}

.container .mypagepost input,
.container .mypageid input,
.container .mypagepwd input,
.container .mypagerepwd input,
.container .mypagebirth input,
.container .mypagename input,
.container .mypagephone input {
	display: inline;
	border: 1 solid black;
	width: 200px;
}

input[readonly] {
	background-color: #bebebe;
	pointer-events: none;
}

#birth {
	background: none;
}

.mypagebirth input {
	border: none;
	pointer-events: none;
	outline: none;
}

.n-table .mypageid label {
	color: red;
	font-size: 8px;
	width: 250px;
}

.container {
	padding: 0;
}

#btn-modify {
	width: 15%;
	margin-top: 20px;
	margin-bottom: 10px;
	margin-left: 30px;
}

#btn-delete {
	width: 15%;
	margin-top: 20px;
	margin-bottom: 10px;
	margin-left: 30px;
}

.span-post {
	display: inline-flex;
	align-self: center;
}
</style>