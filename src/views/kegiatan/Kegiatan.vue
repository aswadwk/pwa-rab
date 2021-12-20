<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>List Kegiatan</h4>
      <!-- <CButton color="primary">Tambah Kegiatan</CButton> -->
    </CCardHeader>
    <CCardBody>
      <CCardTitle>List Kegiatan yang terdaftar</CCardTitle>
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
            <CTableHeaderCell scope="col">Nama Bidang</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow
            v-for="(x, index) in filteredRows"
            :key="x.id"
            @click="addKategori(x)"
          >
            <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
            <CTableDataCell>{{ x.nama_kegiatan }}</CTableDataCell>
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
      }" v-if="role=='OPERATOR'">
    <CModalHeader>
      <CModalTitle>Tambah Anggaran </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="d-flex justify-content-between">
        <h2>{{ xBidang }}</h2>
        <div>
          <button class="btn btn-sm btn-danger" @click="hapusKegiatan" v-if="role=='OPERATOR'">
            Hapus
          </button>
        </div>
      </div>
      <div class="submit-form">
        <!-- <div class="form-group">
          <label for="kegiatan">Nama Kegiatan</label>
          <input
            :value="xId"
            v-bind="form.idKegiatan"
            type="text"
            class="form-control"
            required
            name="idkegiatan"
            readonly
          />
          <input
            :value="xBidang"
            type="text"
            class="form-control mb-3"
            required
            name="kegiatan"
            readonly
          />
        </div> -->
        <div class="form-group">
          <label for="namakegiatan">Uraian</label>
          <input
            id="namaKegiatan"
            v-model="form.uraian"
            class="form-control mb-2"
            required
            name="kategori"
            placeholder="masukkan uraian"
          />
        </div>
        <div class="form-group">
          <label for="namakegiatan">Volume</label>
          <input
            id="namaKegiatan"
            v-model="form.volume"
            class="form-control mb-2"
            required
            name="kategori"
            placeholder="masukkan volume"
            @keyup="vTotal"
          />
        </div>
        <div class="form-group">
          <label for="namakegiatan">Satuan</label>
          <input
            id="namaKegiatan"
            v-model="form.satuan"
            class="form-control mb-2"
            required
            name="kategori"
            placeholder="masukkan satuan"
          />
        </div>
        <div class="form-group">
          <label for="namakegiatan">Harga Satuan</label>
          <input
            id="namaKegiatan"
            v-model="form.hargaSatuan"
            class="form-control mb-2"
            required
            name="kategori"
            placeholder="masukkan satuan"
            @keyup="sTotal"
          />
        </div>
        <div class="form-group">
          <h4 class="text-center mt-2">Jumlah Total</h4>
          <h2 class="text-center">{{ jumlahTotal }}</h2>
        </div>
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
      <CButton color="primary" @click="saveAnggaran" v-if="role=='OPERATOR'">+ Tambah Anggaran</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
// import axios from '../../axios'
import axios from 'axios'
import { authenticationService } from '../../service/authentication.service'


export default {
  data() {
    return {
      filter: '',
      form: {
        idKegiatan: '',
        uraian: '',
        volume: '',
        satuan: '',
        hargaSatuan: '',
        total: '',
      },
      jumlahTotal: '',

      kegiatan: [],
      visibleLiveDemo: false,
    }
  },
   created() {
    // redirect to home if already logged in
    if (!authenticationService.currentUserValue) {
      // return this.$router.push({ name: 'Home' })
      return this.$router.push({ name: 'Pages' })
    }else{
      console.log("User Auth : ", authenticationService.currentUserValue.role)
      this.role=authenticationService.currentUserValue.role
      console.log("role : ", this.role)
    }
  },
  computed: {
    filteredRows() {
      return this.kegiatan.filter((kegiatan) => {
        const fKegiatan = kegiatan.nama_kegiatan.toString().toLowerCase()
        const searchTerm = this.filter.toLowerCase()

        return fKegiatan.includes(searchTerm)
      })
    },
  },
  mounted() {
    axios
      .get('kegiatan')
      .then((res) => (this.kegiatan = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    vTotal() {
      this.jumlahTotal = this.form.volume * this.form.hargaSatuan
    },
    sTotal() {
      this.jumlahTotal = this.form.volume * this.form.hargaSatuan
    },
    addKategori(x) {
      this.visibleLiveDemo = true
      console.log(x)
      this.xBidang = x.nama_kegiatan
      this.xId = x.id
    },
    saveAnggaran() {
      const data = {
        kegiatan_id: this.xId,
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
        // close modal
        this.visibleLiveDemo = false
    },
    hapusKegiatan() {
      this.visibleLiveDemo = false

      const getKegiatan = async () => {
        try {
          const resp = await axios.get('kegiatan')
          console.log(resp.data.data)
          this.kegiatan = resp.data.data
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      const deleteKegiatan = async () => {
        try {
          const resp = await axios.delete(`kegiatan/${this.xId}`)
          console.log(resp.data)
          getKegiatan()
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      deleteKegiatan()
    },
  },
}
</script>
