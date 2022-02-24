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
      <CTable hover class="table-responsive" responsive small>
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
          <CTableRow v-for="(x, index) in filteredRows" :key="x.id">
            <CTableHeaderCell
              scope="row"
              @click="detailAnggaranByKegiatan(x)"
              >{{ index + 1 }}</CTableHeaderCell
            >
            <CTableDataCell @click="detailAnggaranByKegiatan(x)">{{
              x.nama_kegiatan
            }}</CTableDataCell>
            <CTableDataCell @click="detailAnggaranByKegiatan(x)">{{
              x.bidang.nama_bidang
            }}</CTableDataCell>
            <CTableDataCell>
              <CButton
                size="sm"
                color="success"
                @click="downloadAnggaran(x.id)"
                >Download</CButton
              >
              <CButton
                v-if="role == 'OPERATOR'"
                size="sm"
                class="ml-2 mr-2"
                color="danger"
                variant="outline"
                @click="deleteKegiatan(x.id)"
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
      </div>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Pilih Kegiatan {{ form.kegiatan_id }}</label>
          <CFormSelect
            v-model="form.kegiatan_id"
            name="kegiatan"
            size="sm"
            class="mb-3"
            aria-label="Small select example"
            @change="onChangeKegiatan($event)"
          >
            <option>Pilih Kegiatan</option>
            <option
              v-for="(x, index) in kegiatan"
              :key="index"
              :value="x.id"
              @click="testFunction(alert('test'))"
            >
              {{ x.nama_kegiatan }} {{ x.id }}
            </option>
          </CFormSelect>
        </div>
        <div class="form-group">
          <label for="namakegiatan">Material {{ form.material }}</label>
          <CFormSelect
            v-model="form.material"
            name="material"
            size="sm"
            class="mb-3"
            @change="onChangeMaterial($event)"
          >
            <option>Silahkan Pilih Material</option>
            <option
              v-for="(x, index) in material"
              :key="index"
              :value="x.id"
              @click="
                () => {
                  alert(x)
                }
              "
            >
              {{ x.name }} {{ x.id }}
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

  <!-- modal detail -->
  <CModal
    v-if="role == 'OPERATOR'"
    size="xl"
    :visible="modalDetail"
    @close="
      () => {
        modalDetail = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Detail </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="d-flex justify-content-between">
        <h4>Detail {{ aDetailName }}</h4>
      </div>
      <CTable striped small responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Material</CTableHeaderCell>
            <CTableHeaderCell scope="col">Satuan</CTableHeaderCell>
            <CTableHeaderCell scope="col">Volume</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="(x, index) in detail_anggaran" :key="x.id">
            <CTableDataCell>{{ index + 1 }}</CTableDataCell>
            <CTableDataCell>{{ x.uraian }}</CTableDataCell>
            <CTableDataCell>{{ x.satuan }}</CTableDataCell>
            <CTableDataCell>{{ x.volume }}</CTableDataCell>
            <CTableDataCell>{{ x.jumlah_total }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            modalDetail = false
          }
        "
      >
        Close
      </CButton>
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
      detail_anggaran: [],
      visibleLiveDemo: false,
      modalDetail: false,
      add_kegiatan_id: '',
      aDetailName: '',
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
    addAnggaran() {
      this.visibleLiveDemo = true
    },
    saveAnggaran() {
      const data = {
        kegiatan_id: this.form.kegiatan_id,
        uraian: this.form.uraian,
        volume: this.form.volume,
        satuan: this.form.satuan,
        harga_satuan: this.form.hargaSatuan,
        jumlah_total: this.form.volume * this.form.hargaSatuan,
      }
      console.log(data)
      axios
        .post('anggaran', data)
        .then((res) => {
          console.log(res)
          this.visibleLiveDemo = false
        })
        .catch((err) => console.log(err))
      // close modal
    },
    // hapusKegiatan() {
    //   this.visibleLiveDemo = false

    //   const getKegiatan = async () => {
    //     try {
    //       const resp = await axios.get('kegiatan')
    //       console.log(resp.data.data)
    //       this.kegiatan = resp.data.data
    //     } catch (err) {
    //       // Handle Error Here
    //       console.error(err)
    //     }
    //   }

    //   const deleteKegiatan = async (x) => {
    //     try {
    //       const resp = await axios.delete(`kegiatan/${x}`)
    //       console.log(resp.data)
    //       getKegiatan()
    //     } catch (err) {
    //       // Handle Error Here
    //       console.error(err)
    //     }
    //   }

    //   deleteKegiatan(x)
    // },
    deleteKegiatan(x) {
      axios
        .delete(`kegiatan/${x}`)
        .then((res) => {
          console.log(res)
          axios
            .get('kegiatan')
            .then((res) => (this.kegiatan = res.data.data))
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    },
    onChangeKegiatan(x) {
      this.form.kegiatan_id = x.target.value
      console.log(x)
      console.log(this.form.kegiatan_id)
      console.log(x.target.value)
    },
    materialClick(x) {
      const data = { ...x }
      this.form.satuan = data.satuan
      this.form.hargaSatuan = data.harga
      this.form.uraian = data.name
      console.log('Data Meterial ', { ...this.material })
      console.log('Material ', data)
      console.log('Material Name ', data.name)
      this.jumlahTotal = this.form.volume * this.form.hargaSatuan
    },
    onClickMaterial(x) {
      console.log('Material ', x)
    },
    onChangeMaterial(x) {
      console.log(
        'Material Target',
        this.material[x.target.options.selectedIndex - 1],
      )
      const data = this.material[x.target.options.selectedIndex - 1]
      this.form.satuan = data.satuan
      this.form.hargaSatuan = data.harga
      this.form.uraian = data.name
      this.jumlahTotal = this.form.volume * this.form.hargaSatuan
    },
    detailAnggaranByKegiatan(x) {
      this.modalDetail = true
      const data = { ...x }
      this.aDetailName = data.nama_kegiatan
      console.log('Detail Anggaran ', data)
      axios
        .get(`kegiatan/${data.id}`)
        .then((res) => (this.detail_anggaran = res.data.data))
        .catch((err) => console.log(err))
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

<style scoped>
.mr-2 {
  margin-right: 10px;
}
.ml-2 {
  margin-left: 10px;
}
</style>
