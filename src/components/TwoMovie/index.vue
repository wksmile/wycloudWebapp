<template>
  <div class="out-wrapper">
    <div class="mv-wrapper" ref="mvWrapper">
      <div class="movie">
        <ul class="list-ul">
          <li v-for="(item, index) in mvList" :key="index">
            <div class="video-wrapper" v-on:click.stop="playVideo($event, index)">
              <video :id="'video'+index" :src="'../../../static/movie/' + index + '.mp4'" width="100%" preload="auto">
                你的浏览器不支持video
              </video>
              <div class="video-pause" v-show="isPlay[index]"><img src="../../../static/img/playvideo.png" width="50" height="50"></div>
              <div class="video-pause" v-show="isPause[index]" @click.stop="pauseVideo(index)"><img src="../../../static/img/pausevideo.png" width="50" height="50"></div>
            </div>
            <div class="video-detial">
              <div class="video-name">
                <p>{{item.name}}</p>
                <p>{{item.artistName}}</p>
              </div>
              <div class="video-praise">
                <p @click="plusPraise(index)"><img src="../../../static/img/praise.png" width="25" height="25"></p>
                <p>{{praise[index]}}</p>
              </div>
              <div class="video-comment">
                <p @click="plusComment(index)"><img src="../../../static/img/comment.png" width="25" height="25"></p>
                <p>{{comment[index]}}</p>
              </div>
              <div class="video-share" @click="showShare(index)">
                <img src="../../../static/img/videomenu.png" width="25" height="25">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <mv-share :images="images" :others="others" ref="mvshare"></mv-share>
  </div>
</template>

<script>
  //  ?????????   页面滚动存在问题
  import BScroll from 'better-scroll';
  import api from '../../api';
  import MvShare from '../MvShare';

  export default {
    data () {
      return {
        current_video: null,  //  当前播放的视屏id
        isPause: [],     //  显示暂停按钮  false表示不显示，true表示显示
        isPlay: [],      //  是否处于播放状态，true暂停状态，false播放状态
        comment: [],     //  评论数
        praise: [],      //  点赞数
        mvList: [],      //  mv的列表
        currentMvId: 310001,
        loading: false
      };
    },
    created () {
      //  初始化data数据
      this.initialData(9);
      //  获取数据
      this.getMvList(9);
      console.log('wozhixingl---------');
    },
    computed: {
      images () {
        let basicUrl = '../../../static/img/';
        return [
          {
            url: basicUrl + 'wyyyy.png',
            text: '云音乐动态'
          },
          {
            url: basicUrl + 'wxpyq.png',
            text: '微信朋友圈'
          },
          {
            url: basicUrl + 'wyyyy.png',
            text: '云音乐动态'
          },
          {
            url: basicUrl + 'wxhy.png',
            text: '微信好友'
          },
          {
            url: basicUrl + 'qqkj.png',
            text: 'QQ空间'
          },
          {
            url: basicUrl + 'qqhy.png',
            text: 'QQ好友'
          },
          {
            url: basicUrl + 'wb.png',
            text: '微博'
          },
          {
            url: basicUrl + 'sx.png',
            text: '私信'
          },
          {
            url: basicUrl + 'fzlj.png',
            text: '复制链接'
          },
          {
            url: basicUrl + 'yxpyq.png',
            text: '易信朋友圈'
          },
          {
            url: basicUrl + 'yxhy.png',
            text: '易信好友'
          }
        ];
      },
      others () {
        let basicUrl = '../../../static/img/';
        return [
          {
            url: basicUrl + 'collectmv.png',
            text: '收藏'
          },
          {
            url: basicUrl + 'nointrinest.png',
            text: '不感兴趣'
          }
        ];
      }
    },
    methods: {
      showShare (index) {
        this.$refs.mvshare.show(index);
      },
      //  播放视频 或者暂停视屏
      playVideo ($event, index) {
        console.log($event.target);
        //  如果视屏处于暂停状态
        if (this.isPlay[index]) {
          //  点击播放图标无效
          try {
              //  暂停之前的视频
            if (this.current_video !== null) {
              this.pauseVideo(this.current_video);
            }
            document.getElementById('video' + index).play();
            //  保存当前的视频id
            this.current_video = index;
            this.$set(this.isPlay, index, false);
          } catch (e) {
            console.log('视屏无法播放', e);
          }
        } else {    //  视屏处于播放状态
          this.$set(this.isPause, index, true);
          var that = this;
          setTimeout(function () {
            that.$set(that.isPause, index, false);
          }, 3000);
        }
      },
      pauseVideo (index) {
        try {   //  暂停视频，隐藏暂停按钮，显示播放按钮
          document.getElementById('video' + index).pause();
          //  暂停视频，清空当前播放视频的id
          this.current_video = null;
          this.$set(this.isPause, index, false);
          this.$set(this.isPlay, index, true);
        } catch (e) {
          console.log('暂停视屏失败', e);
        }
      },
      //  增加点赞数
      plusPraise (index) {
        let value = this.praise[index] + 1;
        this.$set(this.praise, index, value);
      },
      //  增加评论数
      plusComment (index) {
        let value = this.comment[index] + 1;
        this.$set(this.comment, index, value);
      },
      initialData (num) {
        while (num--) {
          this.isPause.push(false);
          this.isPlay.push(true);
          this.comment.push(0);
          this.praise.push(0);
        }
      },
      getMvList (num) {
        this.loading = true;
        // 根据参数num获取对应数量的mv
        while (num--) {
          this.$http.get(api.getMv(this.currentMvId)).then((res) => {
            this.mvList.push(res.data.data);
            this.currentMvId++;
            this.$nextTick(() => {
              this._initScroll();
            });
          });
        }
        this.loading = false;
        console.log('mvlist---', this.mvList);
        },
      _initScroll() {
        if (!this.mvScroll) {
          this.mvScroll = new BScroll(this.$refs.mvWrapper, {
            click: true,
            scrollY: true
          });
          console.log('better-scroll执行了');
        } else {
          this.mvScroll.refresh();
        }
      }
    },
    components: {
      MvShare
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.out-wrapper
  margin: 87px 0 45px 0;
  width: 100%;
  height: 100%
  .mv-wrapper
    width: 100%;
    position : absolute;
    top: 87px;
    bottom : 45px;
    overflow: hidden;
    background:#fff;
    .list-ul
      position : relative;
      margin : 0;
      padding : 0;
      list-style : none;
      li
        .video-wrapper
          width : 100%;
          position: relative;
          .video-pause
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -25px;
            margin-left: -25px;
        .video-detial
          position : relative;
          width : 100%;
          height : 50px;
          margin: 8px;
          display : flex;
          align-items : center;
          .video-name
            width: 55%;
            overflow: hidden;
            float : left;
            text-align: left;
            white-space : nowrap;
            text-overflow : ellipsis;
            color: black;
            font-size : 14px;
          .video-comment, .video-share, .video-praise
            width : 15%;
            float: right;
            text-align : center;
            color: #bfbfbf;
            font-size : 10px;
</style>
