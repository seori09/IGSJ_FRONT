import { createApp } from "vue";
import App from "./EntrancePage.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import mitt from "./mitt";
import mixins from "./mixins";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = "http://localhost:8086";
app.use(store).use(router).use(mitt).mixin(mixins).mount("#app");

// 여기 아래 두줄은 커밋,PR 절대금지
// 여기 아래 두줄은 커밋,PR 절대금지
// 여기 아래 두줄은 커밋,PR 절대금지
// 여기 아래 두줄은 커밋,PR 절대금지
// 여기 아래 두줄은 커밋,PR 절대금지
// 여기 아래 두줄은 커밋,PR 절대금지
// 여기 아래 두줄은 커밋,PR 절대금지
window.Kakao.init("e959d6307106a637c24bba959b59c97e");
window.console.log("kakao : " + Kakao.isInitialized());
