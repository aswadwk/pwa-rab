<template>
  <CRow>
    <CCol class="col-md-4 col-12">
      <CWidgetStatsA class="mb-4" color="primary">
        <template #value>{{ bidang.length ? bidang.length : 0 }} </template>
        <template #title>Bidang</template>

        <template #chart>
          <CChart
            type="line"
            class="mt-3 mx-3"
            style="height: 70px"
            :data="{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
              ],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,.55)',
                  pointBackgroundColor: '#321fdb',
                  data: [68, 59, 84, 84, 51, 55, 40],
                },
              ],
            }"
            :options="{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  min: 30,
                  max: 89,
                  display: false,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 1,
                  tension: 0.4,
                },
                point: {
                  radius: 4,
                  hitRadius: 10,
                  hoverRadius: 4,
                },
              },
            }"
          />
        </template>
      </CWidgetStatsA>
    </CCol>
    <CCol class="col-md-4 col-12">
      <CWidgetStatsA class="mb-4" color="info">
        <template #value>{{ kegiatan.length ? kegiatan.length : 0 }} </template>
        <template #title>Kegiatan</template>

        <template #chart>
          <CChart
            type="line"
            class="mt-3 mx-3"
            style="height: 70px"
            :data="{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
              ],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,.55)',
                  pointBackgroundColor: '#39f',
                  data: [1, 18, 9, 17, 34, 22, 11],
                },
              ],
            }"
            :options="{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  min: -9,
                  max: 39,
                  display: false,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 1,
                },
                point: {
                  radius: 4,
                  hitRadius: 10,
                  hoverRadius: 4,
                },
              },
            }"
          />
        </template>
      </CWidgetStatsA>
    </CCol>
    <CCol class="col-md-4 col-12">
      <CWidgetStatsA class="mb-4" color="warning">
        <template #value>{{ anggaran.length ? anggaran.length : 0 }} </template>
        <template #title>Anggaran</template>

        <template #chart>
          <CChart
            type="line"
            class="mt-3"
            style="height: 70px"
            :data="{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
              ],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'rgba(255,255,255,.2)',
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [78, 81, 80, 45, 34, 12, 40],
                  fill: true,
                },
              ],
            }"
            :options="{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
              elements: {
                line: {
                  borderWidth: 2,
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                },
              },
            }"
          />
        </template>
      </CWidgetStatsA>
    </CCol>
  </CRow>
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
import axios from 'axios'
export default {
  name: 'WidgetsStatsA',
  components: {
    CChart,
  },
  data() {
    return {
      bidang: [],
      kegiatan: [],
      anggaran: [],
    }
  },
  mounted() {
    axios
      .get('bidang')
      .then((res) => (this.bidang = res.data.data))
      .catch((err) => console.log(err))
    axios
      .get('kegiatan')
      .then((res) => (this.kegiatan = res.data.data))
      .catch((err) => console.log(err))
    axios
      .get('anggaran')
      .then((res) => (this.anggaran = res.data.data))
      .catch((err) => console.log(err))
  },
}
</script>
