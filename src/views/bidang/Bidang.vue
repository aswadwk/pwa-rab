<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>List Bidang</h4>
      <CButton color="primary">Tambah Bidang</CButton>
    </CCardHeader>
    <CCardBody>
      <CCardTitle>List Bidang yang terdaftar</CCardTitle>
      <input
        v-model="filter"
        class="form-control"
        type="text"
        placeholder="Filter"
      />
      <CCardText>
        <!-- List Bidang yang terdaftar -->
      </CCardText>

      <!-- Table -->
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
      <CModalTitle>Tambahn Kegiatan </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h3 class="text-center">{{ xBidang }}</h3>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Nama Bidang</label>
          <input
            :value="xId"
            v-bind="form.idBidang"
            type="text"
            class="form-control mb-2"
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
          <label for="namakegiatan">Nama Kegiatan</label>
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
        Close
      </CButton>
      <CButton color="primary" @click="saveKegiatan">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
// import axios from '../../axios'
import axios from 'axios'

export default {
  data() {
    return {
      filter: '',
      form: {
        idBidang: '',
        namaBidang: '',
        namaKegiatan: '',
      },

      bidang: [],
      visibleLiveDemo: false,
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
      .get('//api.zahrazhafira.com/api/bidang')
      .then((res) => (this.bidang = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    addKategori(x) {
      this.visibleLiveDemo = true
      console.log(x)
      this.xBidang = x.nama_bidang
      this.xId = x.id
    },
    saveKegiatan() {
      const data = {
        idBidang: this.xId,
        namaBidang: this.form.namaBidang,
        namaKegiatan: this.form.namaKegiatan,
      }
      console.log(data)
    },
  },
}
</script>
