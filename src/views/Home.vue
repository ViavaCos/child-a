<template>
  <div class="home">
    <!-- <el-button type="success" @click="$router.push('/about')">to about</el-button> -->
    <div id="main">
      <template v-if="aArr.length">
      <p v-for="(item, index) in $PStore.getters.getArr" :key="index">{{ item.data }}</p>
      <p v-for="(item, index) in objArr" :key="index + '10086'">{{ item.data }}</p>
      <br>
      <template v-if="$PStore">
        <!-- <p v-for="(item, index) in $PStore.getters.getStrArr" :key="index + 'a'">{{ item }}</p> -->
        <p v-for="(item, index) in $PStore.state.strArr" :key="index + 'a'">{{ item }}</p>
      </template>
      <br>
      <template v-if="$PStore">
        <!-- <p>{{ $PStore.getters.getStr }}, {{ $PStore.state.str }}</p> -->
        <p>{{ simpleText }}</p>
      </template>
      </template>
      <p class="child">Chid</p>
      <button @click="log">log</button>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

export default {
  data(){
    return {
      aArr: []
    }
  },
  computed:{
    simpleText: vm => {
      // return vm.$PStore ? vm.$PStore.getters.getStr : 10086
      return vm.$PStore ? vm.$PStore.state.str : 10086
    },
    objArr: vm => {
      let res = vm.$PStore.state.arr.filter(item => item !== 0)
      console.log(10086, res);
      return res
    }
  },
  mounted() {
    // this.init();
    if(this.$PStore) {
      this.aArr = this.$PStore.getters.getArr
    }
    console.log(this.$PStore);
  },
  methods: {
    init() {
      var ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      // eslint-disable-next-line no-undef
      $.getJSON(ROOT_PATH + "/data-gl/asset/data/population.json", function(data) {
        data = data
        .filter(function(dataItem) {
          return dataItem[2] > 0;
        })
        .map(function(dataItem) {
          return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });

        myChart.setOption({
          backgroundColor: "#cdcfd5",
          geo3D: {
            map: "world",
            shading: "lambert",
            light: {
              main: {
                intensity: 5,
                shadow: true,
                shadowQuality: "high",
                alpha: 30,
              },
              ambient: {
                intensity: 0,
              },
              ambientCubemap: {
                texture: "data-gl/asset/canyon.hdr",
                exposure: 1,
                diffuseIntensity: 0.5,
              },
            },
            viewControl: {
              distance: 50,
              panMouseButton: "left",
              rotateMouseButton: "right",
            },
            groundPlane: {
              show: true,
              color: "#999",
            },
            postEffect: {
              enable: true,
              bloom: {
                enable: false,
              },
              SSAO: {
                radius: 1,
                intensity: 1,
                enable: true,
              },
              depthOfField: {
                enable: false,
                focalRange: 10,
                blurRadius: 10,
                fstop: 1,
              },
            },
            temporalSuperSampling: {
              enable: true,
            },
            itemStyle: {},
            regionHeight: 2,
          },
          visualMap: {
            max: 40,
            calculable: true,
            realtime: false,
            inRange: {
              color: [
                "#313695",
                "#4575b4",
                "#74add1",
                "#abd9e9",
                "#e0f3f8",
                "#ffffbf",
                "#fee090",
                "#fdae61",
                "#f46d43",
                "#d73027",
                "#a50026",
              ],
            },
            outOfRange: {
              colorAlpha: 0,
            },
          },
          series: [
            {
              type: "bar3D",
              coordinateSystem: "geo3D",
              shading: "lambert",
              data: data,
              barSize: 0.1,
              minHeight: 0.2,
              silent: true,
              itemStyle: {
                color: "orange",
                // opacity: 0.8
              },
            },
          ],
        });
      });

      option && myChart.setOption(option);
    },
    log(){
      console.log(this.$PStore.getters.getArr);
    }
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 350px;
  color: #ccc;
  /* background-color: lightgreen; */
}
.child{
  line-height: 200px;
  font-size: 150px;
}
</style>
