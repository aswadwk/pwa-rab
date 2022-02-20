<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>List Kegiatan</h4>
      <CButton v-if="role == 'OPERATOR'" color="primary" @click="addAnggaran()"
        >Tambah Anggaran</CButton
      >
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
            <CTableHeaderCell scope="col">NO</CTableHeaderCell>
            <CTableHeaderCell scope="col">Kegiatan</CTableHeaderCell>
            <CTableHeaderCell scope="col">Bidang</CTableHeaderCell>
            <CTableHeaderCell class="text-center" scope="col"
              >Aksi</CTableHeaderCell
            >
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
            <CTableDataCell>{{ x.bidang.nama_bidang }}</CTableDataCell>
            <CTableDataCell>
              <CButton
                v-if="role == 'OPERATOR'"
                size="sm"
                color="primary"
                @click="editAnggaran()"
                >Edit</CButton
              >
              <CButton
                v-if="role == 'OPERATOR'"
                size="sm"
                class="ml-2 mr-2"
                color="danger"
                variant="outline"
                @click="editAnggaran()"
                >Hapus</CButton
              >
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
  <!-- modal tambah Anggaran -->
  <CModal
    v-if="role == 'OPERATOR'"
    size="xl"
    :visible="visibleLiveDemo"
    @close="
      () => {
        visibleLiveDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Tambah Anggaran </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="d-flex justify-content-between">
        <h4>Form Tambah Anggaran</h4>
        <!-- <h2>{{ xBidang }}</h2> -->
        <!-- <div>
          <button
            v-if="role == 'OPERATOR'"
            class="btn btn-sm btn-danger"
            @click="hapusKegiatan"
          >
            Hapus
          </button>
        </div> -->
      </div>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Bidang</label>
          <CFormSelect
            v-model="form.kegiatan_id"
            name="bidang"
            size="sm"
            class="mb-3"
            aria-label="Small select example"
          >
            <option>Pilih Kegiatan</option>
            <option v-for="x in kegiatan" :key="x.id" value="x.id">
              {{ x.nama_kegiatan }}
            </option>
          </CFormSelect>
        </div>
        <div class="form-group">
          <label for="namakegiatan">Material</label>
          <CFormSelect
            v-model="form.material"
            name="bidang"
            size="sm"
            class="mb-3"
            aria-label="Small select example"
          >
            <option>Pilih Material</option>
            <option v-for="x in material" :key="x.id" value="x.id">
              {{ x.name }}
            </option>
          </CFormSelect>
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
      <CButton v-if="role == 'OPERATOR'" color="primary" @click="saveAnggaran"
        >+ Tambah Anggaran</CButton
      >
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
        kegiatan_id: '',
        material: '',
      },
      jumlahTotal: '',

      kegiatan: [],
      material: [],
      visibleLiveDemo: false,
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
      .get('kegiatan')
      .then((res) => (this.kegiatan = res.data.data))
      .catch((err) => console.log(err))
    axios
      .get('material')
      .then((res) => (this.material = res.data.data))
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
      console.log(this.kegiatan)
      this.xBidang = x.nama_kegiatan
      this.xId = x.id
    },
    saveAnggaran() {
      const data = {
        kegiatan_id: this.form.kegiatan_id,
        material: this.form.material,
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

<style scoped>
.mr-2 {
  margin-right: 10px;
}
.ml-2 {
  margin-left: 10px;
}
</style>
