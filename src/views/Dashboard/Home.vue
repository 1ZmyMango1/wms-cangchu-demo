<template>
  <div>
    <div class="logo">
      <div class="photoLeft">
        <div class="photo">
          <div class="imgLeft">
            <div class="avatar">
              <img src="../../assets/imgs/avatar.png" alt="" />
              <br />
              <span>仓储管理员</span>
            </div>
          </div>
          <div class="imgRight">
            <div class="text">
              <span>我不是为了输赢，我就是认真！</span>
              <br />
            </div>
            <div class="textOne">
              <span>---罗永浩</span>
            </div>
          </div>
        </div>

        <div class="toDo">
          <div class="toDo-title">任务导航</div>
          <div class="enter">
            <div class="enter-item" v-for="(item, index) in list" :key="index">
              <div class="top">
                <span>
                  <i class="el-icon-collection"></i>
                </span>
                <span>
                  {{ item.name }}
                </span>
              </div>
              <div class="bottom">
                <span class="add">新增 </span>
                <span class="one">{{ item.value1 }}</span>
                <span class="add">待审核 </span>
                <span class="two">{{ item.value2 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notice">
        <div class="item">
          <h4>通知/公告</h4>
          <el-divider></el-divider>
          <span>晋级盘点通知</span>
          <br />
          <span>2022-12-10</span>
          <el-divider></el-divider>
          <span>晋级盘点通知</span>
          <br />
          <span>2022-12-10</span>
          <el-divider></el-divider>
          <span>晋级盘点通知</span>
          <br />
          <span>2022-12-10</span>
          <el-divider></el-divider>
          <span>晋级盘点通知</span>
          <br />
          <span>2022-12-10</span>
          <el-divider></el-divider>
        </div>
      </div>
    </div>

    <div class="task">
      <div class="task-title">任务导航</div>
      <div class="task-item">
        <div class="task-left">
          <img src="../../assets/imgs/empty.png" alt="" />
          <span>收货任务</span>
        </div>

        <div class="task-left">
          <img src="../../assets/imgs/empty.png" alt="" />
          <span>上架任务</span>
        </div>

        <div class="task-left">
          <img src="../../assets/imgs/empty.png" alt="" />
          <span>盘点任务</span>
        </div>

        <div class="task-left">
          <img src="../../assets/imgs/empty.png" alt="" />
          <span>拣货任务</span>
        </div>

        <div class="task-left">
          <img src="../../assets/imgs/empty.png" alt="" />
          <span>交换任务</span>
        </div>
      </div>
    </div>

    <div class="boxEcharts">
      <div class="box-text">入库/出库信息</div>
      <div id="myChart" :style="{ width: '800px', height: '400px' }"></div>
    </div>

    <div class="box">
      <div class="box-echarts02">
        <div class="echarts02">库存使用情况</div>
        <div id="pieChart" :style="{ width: '400px', height: '250px' }"></div>
      </div>
      <div class="box-echarts03">
        <div class="echarts03">库区使用情况</div>
        <div
          id="pieChartRight"
          :style="{ width: '816px', height: '260px' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEnter } from '../../api/home.js'
export default {
  data() {
    return {
      list: [],
      mag: 'lala'
    }
  },
  mounted() {
    this.drawLine()
    this.drawLineLeft()
    this.drawLineRight()
    // console.log(this.$echarts)
  },
  created() {
    this.getEnter()
  },
  methods: {
    async getEnter() {
      try {
        const res = await getEnter()
        // console.log(res)
        this.list = res.data.data
        // console.log(this.list, 'list')
      } catch (e) {
        console.log(e)
      }
    },

    // echarts
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [0, 0.2, 0.4, 0.6, 0.8, 1],
            type: 'bar',
            itemStyle: {
              color: '#ff7100'
            },
            name: '入库'
          },
          {
            data: [0, 0.2, 0.4, 0.6, 0.8, 1],
            type: 'bar',
            itemStyle: {
              color: '#ffb200'
            },
            name: '出库'
          }
        ],
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow',
            width: 30
          },
          backgroundColor: '#fff',
          borderColor: '#dfdfdf',
          borderWidth: '2',
          textStyle: {
            color: '#333'
          },
          extraCssText: 'box-shadow: 0 0 20px #ccc ;padding: 15px 20px;'
        },
        legend: {
          data: ['入库', '出库']
        }
      })
    },
    drawLineLeft() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      myChart.setOption({
        // color: ['#ffa05e'], // 配置颜色
        tooltip: {
          trigger: 'item'
        },

        series: [
          {
            avoidLabelOverlap: false,
            // itemStyle: {
            //   borderRadius: 10,
            //   borderColor: '#fff',
            //   borderWidth: 2
            // },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            name: '可用库存',
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{ value: 1048 }],
            itemStyle: {
              color: '#ff7100'
            }
          }
        ]
      })
    },
    drawLineRight() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(
        document.getElementById('pieChartRight')
      )
      // 绘制图表
      myChart.setOption({
        // color: ['#ffa05e'], // 配置颜色
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 'right'
        },
        series: [
          {
            // name: '拣货区',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出库区' },
              { value: 677, name: '暂存库区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
.photo {
  width: 800px;
  height: 148px;
  display: flex;
  box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
  background: linear-gradient(270deg, #ffc771, #ffa634);
  border-radius: 12px;
  .imgLeft {
    position: relative;
    background-repeat: no-repeat;
    height: 148px;
    width: 200px;
    background-size: 200px 148px;
    background-image: url('../../assets/imgs/dashboard-banner-left.png');
    .avatar {
      position: absolute;
      top: 31px;
      left: 43px;
      height: 62px;
    }
  }
  .imgRight {
    background-repeat: no-repeat;
    position: relative;
    height: 148px;
    width: 600px;
    background-size: 300px 148px;
    // background-image: url('../../assets/imgs/dashboard-banner-right.png');
    .text {
      color: #fff;
      position: absolute;
      left: 40px;
      top: 30px;
    }
    .textOne {
      color: #fff;
      position: absolute;
      top: 60px;
      left: 250px;
    }
  }
}

.toDo {
  width: 800px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  border-radius: 12px;
  margin-top: 20px;
  .toDo-title {
    font-size: 17px;
    font-weight: 700;
    padding-top: 20px;
    margin-left: 20px;
  }
  .enter {
    height: 186px;
    width: 800px;
    display: flex;
    box-sizing: border-box;
    padding-top: 20px;
    margin-top: 30px;
    .enter-item {
      height: 186px;
      width: 200px;
      background: #fbf7f7;
      border-radius: 8px;
      margin-left: 20px;
      margin-right: 30px;
      .top,
      .bottom {
        height: 96px;
        width: 200px;
        line-height: 96px;
      }
      .top {
        padding-left: 20px;
        overflow: hidden;
        span {
          float: left;
          &:nth-child(1) {
            i {
              // width: 50px;
              // height: 50px;
              font-size: 50px;
              margin-top: 21px;
            }
          }
        }
      }
      .bottom {
        .add {
          margin-left: 20px;
        }
        span {
          float: left;
          &:nth-child(3) {
            margin: 0 10px;
          }
          &:nth-child(2) {
            margin: 0 10px;
          }
        }
        .one {
          color: black;
          font-size: 36px;
        }
        .two {
          color: #ffb046;
          font-size: 36px;
        }
      }
    }
  }
}

.notice {
  position: absolute;
  right: 2%;
  top: 13%;
  width: 400px;
  height: 465px;
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  border-radius: 20px;
  .item {
    width: 300px;
    margin: 0 auto;
  }
}

.task {
  background: #fff;
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  width: 100%;
  height: 200px;
  margin-top: 25px;
  border-radius: 12px;
  .task-title {
    font-size: 17px;
    font-weight: 700;
    padding-top: 20px;
    margin-left: 20px;
  }
  .task-item {
    display: flex;
    .task-left {
      width: 200px;
      height: 95px;
      line-height: 95px;
      background: #fbf7f7;
      margin-top: 30px;
      margin-left: 20px;
      border-radius: 8px;
      margin: 30px;
      img {
        width: 50px;
        height: 50px;
        margin-left: 20px;
        float: left;
        margin-top: 23px;
        margin-right: 15px;
      }
    }
  }
}

.boxEcharts {
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  margin-top: 25px;
  border-radius: 12px;
  .box-text {
    font-size: 17px;
    font-weight: 700;
    margin-left: 20px;
    padding-top: 20px;
  }
}

.box {
  display: flex;
  margin-top: 20px;
  .box-echarts02 {
    box-shadow: 0 0 20px rgb(93 93 93 / 33%);
    width: 400px;
    height: 300px;
    margin-right: 30px;
    border-radius: 12px;
    .echarts02 {
      font-size: 17px;
      font-weight: 700;
      margin-left: 20px;
      padding-top: 20px;
    }
  }
  .box-echarts03 {
    box-shadow: 0 0 20px rgb(93 93 93 / 33%);
    width: 816px;
    height: 300px;
    border-radius: 12px;
    .echarts03 {
      font-size: 17px;
      font-weight: 700;
      margin-left: 20px;
      padding-top: 20px;
    }
  }
}
</style>
