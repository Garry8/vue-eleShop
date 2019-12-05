<template>
  <div class="wel">
    <h2>Welcome!</h2>
    <ul class="pul">
      <li v-for="(item, index) in 10" :key="index"></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.wel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pul {
  list-style: none;
  margin:-10% 0 0 -25%;

  @keyframes mymove {
    0% {
      opacity: 0.5;
      transform: translateY(-20px);
    }
    50% {
      opacity: 1;
      transform: translateY(-140px);
    }
    100% {
      opacity: 0;
      transform: translateY(-200px);
    }
  }

  li {
    border-radius: 10px;
    position: absolute;
    opacity: 0;
  }

  li:nth-child(1) {
    width: 8px;
    height: 8px;
    background-color: rgb(97, 97, 255);
    animation: mymove 3s 3s linear infinite;
    margin-left: -50px;
  }
  li:nth-child(2) {
    width: 6px;
    height: 6px;
    background-color: rgb(47, 250, 233);
    animation: mymove 3s 1s linear infinite;
    margin-left: -40px;
  }
  li:nth-child(3) {
    width: 8px;
    height: 8px;
    background-color: rgb(251, 253, 92);
    animation: mymove 3s 2.4s linear infinite;
    margin-left: -20px;
  }
  li:nth-child(4) {
    width: 10px;
    height: 10px;
    background-color: rgb(94, 255, 80);
    animation: mymove 3s 1.7s linear infinite;
    margin-left: 0px;
  }
  li:nth-child(5) {
    width: 6px;
    height: 6px;
    background-color: rgb(255, 169, 58);
    animation: mymove 3s 3.2s linear infinite;
    margin-left: 30px;
  }
  li:nth-child(6) {
    width: 8px;
    height: 8px;
    background-color: rgb(255, 58, 84);
    animation: mymove 3s 1.6s linear infinite;
    margin-left: 50px;
  }
  li:nth-child(7) {
    width: 9px;
    height: 9px;
    background-color: rgb(89, 100, 255);
    animation: mymove 3s 2.4s linear infinite;
    margin-left: 70px;
  }
  li:nth-child(8) {
    width: 6px;
    height: 6px;
    background-color: rgb(89, 255, 89);
    animation: mymove 3s 1.3s linear infinite;
    margin-left: 90px;
  }
  li:nth-child(9) {
    width: 8px;
    height: 8px;
    background-color: rgb(241, 253, 76);
    animation: mymove 3s 2.2s linear infinite;
    margin-left: 100px;
  }
  li:nth-child(10) {
    width: 6px;
    height: 6px;
    background-color: rgb(253, 102, 76);
    animation: mymove 3s 1.2s linear infinite;
    margin-left: 120px;
  }
}
</style>
