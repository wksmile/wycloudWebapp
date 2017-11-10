<template>      <!--设置里面的每一块的列表-->
  <div class="wrapper">
    <div class="content">
      <ul class="list-ul">
        <li class="list" v-for="(list, index) in lists">
          <ul class="item-ul">
            <li class="item" v-for="item in list">
              <div class="share-img">
                <img :src="item.url">
              </div>
              <div class="share-span">
                <span>{{item.text}}</span>
              </div>
            </li>
          </ul>
          <item-line v-if="index !== (lists.length-1)"></item-line>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import ItemLine from '../ItemLine';
  export default {
    data () {
      return {
        lists: [
            [
              {
                url: '../../../static/img/xx.png',
                text: '我的消息'
              },
              {
                url: '../../../static/img/hy.png',
                text: '会员中心'
              },
              {
                url: '../../../static/img/sc.png',
                text: '商城'
              },
              {
                url: '../../../static/img/zx.png',
                text: '在线听歌免流量'
              }
            ], [
            {
              url: '../../../static/img/Peoplelight.png',
              text: '我的好友'
            },
            {
              url: '../../../static/img/fj.png',
              text: '附近的人'
            }
          ], [
            {
              url: '../../../static/img/pf.png',
              text: '个性皮肤'
            },
            {
              url: '../../../static/img/tgsq.png',
              text: '听歌识曲'
            },
            {
              url: '../../../static/img/ds.png',
              text: '定时停止播放'
            },
            {
              url: '../../../static/img/sys.png',
              text: '扫一扫'
            },
            {
              url: '../../../static/img/nz.png',
              text: '音乐闹钟'
            },
            {
              url: '../../../static/img/jsms.png',
              text: '驾驶模式'
            },
            {
              url: '../../../static/img/yp.png',
              text: '音乐云盘'
            }
          ]
        ]
      };
    },
    components: {
      ItemLine
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    width: 100%
    position: relative
    text-align: left
    .content
      width: 100%
      background: white
      .list-ul
        margin: 0
        padding: 0
        .list
          .item-ul
            margin: 0
            padding: 0
            .item
              display: flex
              margin: 10px
              .share-img
                width : 10%;
                height : 30px;
                img
                  width : 18px;
                  height : 18px;
              .share-span
                width: 90%;
                height: 30px;
                text-align: left;
                border-1px(#e2e2e2);
                span
                  font-size: 10px;
                  margin: 0 10px;
</style>
