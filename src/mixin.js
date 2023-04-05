export default {
  data() {
    return {
        fullDate : $convertTime()
    };
  },
  methods: {
    async $convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();

      let fullDate = noticeYear + "-" + noticeMonth + "-" + noticeDate;

      return fullDate;
    },
  },
};
