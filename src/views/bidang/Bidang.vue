<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>List Bidang</h4>
      <CButton color="primary" @click="addBidang()" v-if="role=='OPERATOR'">Tambah Bidang</CButton>
    </CCardHeader>
    <CCardBody>
      <CCardTitle>List Bidang yang terdaftar</CCardTitle>
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
            <CTableDataCell>{{ x.nama_bidang }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
  <!-- modal tambah kegiatan -->
  <CModal
    size="xl"
    :visible="visibleLiveDemo"
    @close="
      () => {
        visibleLiveDemo = false
      }
    " v-if="role=='OPERATOR'">
    <CModalHeader>
      <CModalTitle>Form Tambah Kegiatan </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h3 class="d-flex justify-content-between">
        <h2>{{ xBidang }}</h2>
        <div v-if="role=='OPERATOR'">
          <button class="btn btn-sm btn-danger" @click="hapusBidang">
            Hapus
          </button>
        </div>
      </h3>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Nama Bidang</label>
          <input
            :value="xId"
            type="hidden"
            class="form-control mb-5"
            required
            name="idbidang"
            readonly
          />
          <input
            :value="xBidang"
            type="text"
            class="form-control"
            required
            name="bidang"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="namakegiatan" style="margin-top: 10px">Nama Kegiatan</label>
          <input
            id="namaKegiatan"
            v-model="form.namaKegiatan"
            class="form-control"
            required
            name="kategori"
          />
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
        Batal
      </CButton>
      <CButton color="primary" @click="saveKegiatan" v-if="role=='OPERATOR'">Tambah Kegiatan</CButton>
    </CModalFooter>
  </CModal>

  <!-- modal tambah bidang -->
  <CModal
    size="xl"
    :visible="modalTambahBidang"
    @close="
      () => {
        modalTambahBidang = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle v-if="role=='OPERATOR'">Tambah Bidang </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Nama Bidang</label>
          <input
            v-model="formAddBidang.namaBidang"
            type="text"
            class="form-control mb-2"
            required
            name="namabidang"
          />
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary" 
        @click="
          () => {
            modalTambahBidang = false
          }
        "
      >
        Close
      </CButton>
      <CButton color="primary" @click="saveBidang">Save changes</CButton>
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
      role:'',
      filter: '',
      form: {
        idBidang: '',
        namaBidang: '',
        namaKegiatan: '',
      },
      formAddBidang: {
        nama_bidang: '',
      },

      xId: '',

      bidang: [],
      visibleLiveDemo: false,
      modalTambahBidang: false,
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
      return this.bidang.filter((bidang) => {
        const fBidang = bidang.nama_bidang.toString().toLowerCase()
        const searchTerm = this.filter.toLowerCase()

        return fBidang.includes(searchTerm)
      })
    },
  },
  mounted() {
    axios
      .get('bidang')
      // .get('bidang')
      .then((res) => (this.bidang = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    addKategori(x) {
      this.visibleLiveDemo = true
      this.xBidang = x.nama_bidang
      this.xId = x.id
    },
    addBidang() {
      this.modalTambahBidang = true
    },
    saveKegiatan() {
      const data = {
        bidang_id: this.xId,
        nama_kegiatan: this.form.namaKegiatan,
      }
      console.log(data)
      axios
        .post('kegiatan', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      this.visibleLiveDemo = false
    },
    saveBidang() {
      const data = {
        nama_bidang: this.formAddBidang.namaBidang,
      }
      console.log(data)
      axios
        .post('bidang', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      this.bidang.push(data)
      this.formAddBidang.namaBidang = ''
      this.modalTambahBidang = false
    },
    hapusBidang() {
      this.visibleLiveDemo = false

      const getBidang = async () => {
        try {
          const resp = await axios.get('bidang')
          console.log(resp.data.data)
          this.bidang = resp.data.data
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      const deleteBidang = async () => {
        try {
          const resp = await axios.delete(`bidang/${this.xId}`)
          console.log(resp.data)
          getBidang()
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      deleteBidang()

      // axios
      //   .delete(`bidang/${this.xId}`)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err))

      // axios
      //   .get('bidang')
      //   .then((res) => (this.bidang = res.data.data))
      //   .catch((err) => console.log(err))
    },
  },
}
</script>
