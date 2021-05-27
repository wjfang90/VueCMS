<template>
  <div class="cmt-container">
    <div class="cmt-form">
      <h3>发表评论</h3>
      <hr />
      <textarea
        placeholder="请输入要BB的内容（做多吐槽120字）"
        maxlength="120"
        v-model="postContent"
      ></textarea>

      <mt-button type="primary" size="large" @click="postComment"
        >发表评论</mt-button
      >
    </div>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i + 1 }}楼&nbsp;&nbsp;用户：{{
            item.user_name
          }}&nbsp;&nbsp;发表时间：{{ item.add_time }}
        </div>
        <div class="cmt-body">
          {{ item.content === "undefined" ? "" : item.content }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMoreComments"
      >加载更多</mt-button
    >
  </div>
</template>

<script>
import { Toast } from "mint-ui";

// 导入格式化时间的插件
import moment from 'moment';

export default {
  data() {
    return {
      comments: [],
      pageIndex: 1,
      postContent:null,
    };
  },
  props: { dataid: String },
  created() {
    //   console.log(this.newsid);
    this.getComments();
  },
  methods: {
    getComments() {
      let url = "NewsCommentList";
      let params = { dataid: this.dataid, pageIndex: this.pageIndex };

      this.axios
        .get(url, params)
        .then((res) => {
          if (res.status == 200) {
            this.comments = this.comments.concat(res.data.rows);
          } else {
            Toast("加载评论列表失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMoreComments() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {


      if(!this.postContent||this.postContent.trim().length==0)
      {
          Toast('请输入要评论内容');
          return;
      }

      var postComment = {
        newsId: this.newsid,
        user_name: 'fang',
        content: this.postContent,
        add_time: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      let url ='PostComment'

      this.axios
      .post(url,postComment)
      .then(res=>{

          if(res.status==200){
            //   console.log('评论成功');

              this.comments.unshift(postComment);

              this.postContent='';
          }else{
              Toast('评论失败');
          }

      }).catch(error=>{
          console.log(error);
      })
    },
  },
};
</script>

<style scoped>
.cmt-container {
  padding: 15px 5px;
}

.cmt-form {
  margin-bottom: 10px;
}

.cmt-container h3 {
  font-size: 18px;
}

.cmt-container textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}

.cmt-list {
  margin: 5px 0;
}

.cmt-list .cmt-item {
  font-size: 13px;
}

.cmt-list .cmt-item .cmt-title {
  line-height: 30px;
  background-color: #ccc;
}

.cmt-list .cmt-item .cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>