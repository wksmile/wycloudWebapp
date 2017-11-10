<template>
  <div class="wrapper" v-show="showFlag" @click.stop="hide($event)">
    <transition name="fade">
      <div class="content">

      </div>
    </transition>
  </div>
</template>

<script>
    export default {
      data () {
          return {
              showFlag: false
          };
      },
      methods: {
         show () {
            this.showFlag = true;
         },
        hide ($event) {
             if ($event.target.className === 'wrapper') {
               this.showFlag = false;
             }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wrapper
  position: fixed
  z-index: 200
  width : 100%
  height : 100%
  top: 0
  left: 0
  background : rgba(0,0,0,0.37)
  .content
    position : absolute;
    z-index: 201
    left: 0
    width: 80%;
    height: 100%
    background: white
    &.fade-enter-active, &.fade-leave-active
      transition: all 2.5s line-grid-mode
      transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      transform translate3d(100%, 0, 0)
</style>
