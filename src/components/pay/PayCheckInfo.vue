<!-- PayCheckInfo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>考勤信息</h2>
      </el-divider>
    </div>
    <!-- <el-calendar>
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar> -->
    <el-calendar :first-day-of-week="7">
      <template slot="dateCell"
                slot-scope="{ data }">
        <p>{{ data.day.split("-").slice(2).join("-") }}<br /></p>
        <div v-for="(item, index) in calendarData"
             :key="index">
          <div v-if="data.day == item.day">
            <div v-if="item.status==0">
              {{'✔️'}}
              <!-- {{ item.status == 0 ? '✔️' : '❌'}} -->
            </div>
            <div v-else-if="item.status==1">
              {{'❌️'}}
            </div>
            <div v-else>
              {{'️😁'}}
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'PayCheckInfo',
  data() {
    return {
      calendarData: [
        { day: '2022-01-05', status: 1 },
        { day: '2022-01-06', status: 0 },
        { day: '2022-01-04', status: 1 },
      ],
    }
  },
  methods: {
    init() {
      this.getCheckInfo()
    },
    getCheckInfo() {
      this.$axios.get('check/checkinfo').then((e) => {
        console.log(e)
        this.calendarData = e.data.checkinfo
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.header {
  height: 25px;
  margin-top: 10px;
}
.el-divider .el-divider__text {
  background-color: rgb(243, 243, 243);
}
.is-selected {
  color: #1989fa;
}
</style>
