<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>List Bidang</h4>
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
            <CTableDataCell>{{ x.nama_anggaran }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
  <!-- modal tambah kategori -->
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
      <CModalTitle>Tambahn Anggaran </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="d-flex justify-content-between">
        <h2>{{ xBidang }}</h2>
        <div>
          <button class="btn btn-sm btn-danger" @click="hapusBidang">
            Hapus
          </button>
        </div>
      </div>
      <div class="submit-form">
        <div class="form-group">
          <label for="anggaran">Nama Kegiatan</label>
          <input
            :value="xId"
            v-bind="form.idKegiatan"
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
        </div>

        <div class="form-group">
          <label for="namaanggaran">Nama Kegiatan</label>
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
        idKegiatan: '',
        namaBidang: '',
        namaKegiatan: '',
      },

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
  mounted() {
    axios
      .get('//api.zahrazhafira.com/api/anggaran')
      .then((res) => (this.anggaran = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    addKategori(x) {
      this.visibleLiveDemo = true
      console.log(x)
      this.xBidang = x.nama_anggaran
      this.xId = x.id
    },
    saveKegiatan() {
      const data = {
        anggaran_id: this.xId,
        nama_anggaran: this.form.namaKegiatan,
      }
      console.log(data)
      axios
        .post('//api.zahrazhafira.com/api/anggaran', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    },
  },
}
</script>
