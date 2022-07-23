<!-- PayHome -->
<template>
  <div>
    <div class="top">
      <p></p>
    </div>
    <div class="body">
      <p class="hello">Hello De-lovely</p>
      <hr />
      <div class="punch">
        <h2>新的一天，工作顺利</h2>
      </div>

    </div>
    <div id="end">
      <p></p>
    </div>
    <video width="80%"
           v-if="videoPath"
           height="60%"
           controls="controls">
      <!-- <source src="movie.ogg"
              type="video/ogg"> -->
      <!-- <source src="http://192.168.100.7:8081/payService/load/static/resource/profile/test.mp4"
              type="video/mp4"> -->
      <!-- <source src="../../assets/vlog.mp4"
              type="video/mp4"> -->
      <source :src="videoPath"
              type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: 'PayHome',
  data() {
    return {
      videoPath: undefined,
    }
  },
  methods: {
    init() {
      this.getVideo()
    },
    getVideo() {
      this.$axios.get('sysConfigs/videoHomePath').then((e) => {
        if (e.data.error === 1) {
          this.videoPath = e.data.data
        } else {
          this.$message({
            type: 'warning',
            message: '视频获取失败！',
          })
        }
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.hello {
  font-size: 16px;
}
.punch {
  color: rgb(236, 175, 175);
}
</style>
