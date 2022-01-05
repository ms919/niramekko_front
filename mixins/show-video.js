export default {
  computed: {
    checkVideo() {
      let flg = false;
      let count = 0;
      const timerId = setInterval(() => {
        count++;
        const maxHeight = window
          .getComputedStyle(document.getElementsByTagName("iframe")[0])
          .getPropertyValue("max-height");
        flg = maxHeight == "761px";
        if (flg || count == 10) {
          clearInterval(timerId);
          return flg;
        }
      }, 1000);
    },
  },
}