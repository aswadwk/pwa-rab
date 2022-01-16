<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>List Anggaran</h4>
      <!-- <CButton color="primary">Tambah Kegiatan</CButton> -->
    </CCardHeader>
    <CCardBody>
      <CCardTitle>List Anggaran yang terdaftar</CCardTitle>
      <input
        v-model="filter"
        class="form-control"
        type="text"
        placeholder="Filter"
      />
      <CTable hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
            <CTableHeaderCell scope="col">Kegiatan</CTableHeaderCell>
            <CTableHeaderCell scope="col">Uraian</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow
            v-for="(x, index) in anggaran"
            :key="x.id"
            @click="detailAnggaran(x)"
          >
            <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
            <CTableDataCell>{{ x.created_at }}</CTableDataCell>
            <CTableDataCell>{{ x.nama_kegiatan }}</CTableDataCell>
            <CTableDataCell>{{ x.uraian }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
  <!-- modal tambah Anggaran -->
  <CModal
    size="xl"
    :visible="visibleLiveDemo"
    @close="
      () => {
        visibleLiveDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Detail Anggaran {{ xKegiatanId }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <!-- <div class="d-flex justify-content-between">
        <h2>{{ xBidang }}</h2>
        <div>
          <button class="btn btn-sm btn-danger" @click="hapusAnggaran">
            Hapus
          </button>
        </div>
      </div> -->
      <div class="submit-form">
        <!-- <div class="form-group">
          <label for="anggaran">Nama Kegiatan</label>
          <input
            :value="xId"
            v-bind="form.idAnggaran"
            type="text"
            class="form-control"
            required
            name="idanggaran"
            readonly
          />
          <input
            :value="xBidang"
            type="text"
            class="form-control mb-3"
            required
            name="anggaran"
            readonly
          />
        </div> -->
        <CTable hover>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">Uraian</CTableHeaderCell>
              <!-- <CTableHeaderCell scope="row">Volume</CTableHeaderCell>
              <CTableHeaderCell scope="row">Satuan</CTableHeaderCell>
              <CTableHeaderCell scope="row">Harga Satuan</CTableHeaderCell>
              <CTableHeaderCell scope="row">Total</CTableHeaderCell> -->
              <CTableHeaderCell scope="row" class="text-center"
                >Aksi</CTableHeaderCell
              >
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">{{
                uraianDetail
              }}</CTableHeaderCell>
              <!-- <CTableHeaderCell scope="row">{{
                volumeDetail
              }}</CTableHeaderCell>
              <CTableHeaderCell scope="row">{{
                satuanDetail
              }}</CTableHeaderCell>
              <CTableHeaderCell scope="row">{{
                hargaSatuanDetail
              }}</CTableHeaderCell>
              <CTableHeaderCell scope="row">{{
                jummlahTotalDetail
              }}</CTableHeaderCell> -->
              <CTableHeaderCell scope="row" class="text-center">
                <button
                  v-if="role == 'OPERATOR'"
                  class="btn btn-sm btn-danger mx-3"
                  @click="deleteAnggaran"
                >
                  Delete
                </button>
                <button
                  class="btn btn-sm btn-success mx-3"
                  @click="downloadAnggaran(xKegiatanId)"
                >
                  Download
                </button>
                <!-- <download-excel :data="json_data" :fields="json_fields">
                  <button type="button" class="btn btn-sm btn-success">
                    Download Excel
                  </button>
                </download-excel> -->
                <!-- <button class="btn btn-sm btn-danger" @click="hapusAnggaran">
                  Hapus
                </button> -->
              </CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleLiveDemo = false
          }
        "
      >
        Close
      </CButton>
      <!-- <CButton color="primary" @click="saveAnggaran">Tambah Anggaran</CButton> -->
    </CModalFooter>
  </CModal>
</template>
<script>
import axios from 'axios'
// import JsonExcel from '../../components/DownloadExcel.vue'
import { authenticationService } from '../../service/authentication.service'

export default {
  components: {
    // JsonExcel: JsonExcel,
    // 'component-b': ComponentB
  },
  data() {
    return {
      filter: '',
      form: {
        idAnggaran: '',
        uraian: '',
        volume: '',
        satuan: '',
        hargaSatuan: '',
        total: '',
      },
      jumlahTotal: '',

      anggaran: [],
      visibleLiveDemo: false,
    }
  },
  computed: {
    // filteredRows() {
    //   return this.anggaran.filter((anggaran) => {
    //     const fKegiatan = anggaran.nama_anggaran.toString().toLowerCase()
    //     const searchTerm = this.filter.toLowerCase()
    //     return fKegiatan.includes(searchTerm)
    //   })
    // },
  },
  created() {
    // redirect to home if already logged in
    if (!authenticationService.currentUserValue) {
      // return this.$router.push({ name: 'Home' })
      return this.$router.push({ name: 'Pages' })
    } else {
      console.log('User Auth : ', authenticationService.currentUserValue.role)
      this.role = authenticationService.currentUserValue.role
      console.log('role : ', this.role)
    }
  },
  mounted() {
    axios
      .get('anggaran')
      .then((res) => (this.anggaran = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    vTotal() {
      this.jumlahTotal = this.form.volume * this.form.hargaSatuan
    },
    sTotal() {
      this.jumlahTotal = this.form.volume * this.form.hargaSatuan
    },
    detailAnggaran(x) {
      this.visibleLiveDemo = true
      // console.log(x)
      this.xId = x.id
      this.xKegiatanId = x.kegiatan_id

      this.uraianDetail = x.uraian
      this.volumeDetail = x.volume
      this.satuanDetail = x.satuan
      this.hargaSatuanDetail = x.harga_satuan
      this.jummlahTotalDetail = x.jumlah_total
      this.createAtDetail = x.created_at
    },
    saveAnggaran() {
      const data = {
        anggaran_id: this.xId,
        uraian: this.form.uraian,
        volume: this.form.volume,
        satuan: this.form.satuan,
        harga_satuan: this.form.hargaSatuan,
        jumlah_total: this.form.volume * this.form.hargaSatuan,
      }
      console.log(data)
      axios
        .post('anggaran', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    },
    deleteAnggaran() {
      this.visibleLiveDemo = false

      const getAnggaran = async () => {
        try {
          const resp = await axios.get('anggaran')
          console.log(resp.data.data)
          this.anggaran = resp.data.data
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      const deleteAnggaran = async () => {
        try {
          const resp = await axios.delete(`anggaran/${this.xId}`)
          console.log(resp.data)
          getAnggaran()
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      deleteAnggaran()
    },
    downloadAnggaran(xKegiatanId) {
      // window.open(`https://api.passoloran.com/api/anggaran-excel/${xKegiatanId}`, '_blank')
      window.open(
        `https://api.passoloran.com/api/anggaran-excel_id/${xKegiatanId}`,
        '_blank',
      )
    },
  },
}
</script>
