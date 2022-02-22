/* eslint-disable prettier/prettier */
<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>Daftar Material</h4>
      <CButton v-if="role == 'OPERATOR'" color="primary" @click="addMaterial()"
        >Tambah Material</CButton
      >
    </CCardHeader>
    <CCardBody>
      <!-- <CCardTitle>Daftar User</CCardTitle> -->
      <input
        v-model="filter"
        class="form-control"
        type="text"
        placeholder="Filter"
      />
      <CTable hover responsive small>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
            <CTableHeaderCell scope="col">Satuan</CTableHeaderCell>
            <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
            <CTableHeaderCell
              v-if="role == 'OPERATOR'"
              scope="col"
              class="text-center"
              >Aksi</CTableHeaderCell
            >
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="(x, index) in filteredRows" :key="x.id">
            <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
            <CTableDataCell>{{ x.name }}</CTableDataCell>
            <CTableDataCell>{{ x.satuan }}</CTableDataCell>
            <CTableDataCell>{{ x.harga }}</CTableDataCell>
            <CTableDataCell class="d-flex justify-content-center">
              <CButton
                v-if="role == 'OPERATOR'"
                size="sm"
                color="primary"
                @click="editMaterial(x)"
                >Edit</CButton
              >
              <CButton
                v-if="role == 'OPERATOR'"
                size="sm"
                variant="outline"
                class="btn btn-md btn-danger ml-2 mr-2"
                @click="hapusMaterial(x.id)"
                >Hapus</CButton
              >
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>

  <!-- modal tambah Material -->
  <CModal
    size="xl"
    :visible="modalTambahMatrial"
    @close="
      () => {
        modalTambahMatrial = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle v-if="role == 'OPERATOR'">Tambah Material </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Nama Material</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control mb-2"
            required
            placeholder="Nama"
            name="name"
          />
        </div>
        <div class="form-group">
          <label for="bidang">Satuan</label>
          <input
            v-model="form.satuan"
            type="text"
            class="form-control mb-2"
            required
            placeholder="satuan"
            name="satuan"
          />
        </div>
        <div class="form-group">
          <label for="bidang">Harga</label>
          <input
            v-model="form.harga"
            type="text"
            class="form-control mb-2"
            required
            placeholder="0"
            name="harga"
          />
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            modalTambahMatrial = false
          }
        "
      >
        Batal
      </CButton>
      <CButton color="primary" @click="saveMaterial">Tambah</CButton>
    </CModalFooter>
  </CModal>
  <!-- Modal Edit -->
  <CModal
    size="xl"
    :visible="modalEditMatrial"
    @close="
      () => {
        modalEditMatrial = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle v-if="role == 'OPERATOR'">Tambah Material </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Nama Material</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control mb-2"
            required
            placeholder="Nama"
            name="name"
          />
        </div>
        <div class="form-group">
          <label for="bidang">Satuan</label>
          <input
            v-model="form.satuan"
            type="text"
            class="form-control mb-2"
            required
            placeholder="satuan"
            name="satuan"
          />
        </div>
        <div class="form-group">
          <label for="bidang">Harga</label>
          <input
            v-model="form.harga"
            type="text"
            class="form-control mb-2"
            required
            placeholder="0"
            name="harga"
          />
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            modalEditMatrial = false
          }
        "
      >
        Batal
      </CButton>
      <CButton color="primary" @click="updateMaterial">Update</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import axios from 'axios'

import { authenticationService } from '../../service/authentication.service'

export default {
  data() {
    return {
      role: '',
      filter: '',
      form: {
        name: '',
        password: '',
        passwordConfirm: '',
        role: '',
      },
      // form: {
      //   nama_bidang: '',
      // },

      xId: '',

      material: [],
      visibleLiveDemo: false,
      modalTambahMatrial: false,
      modalEditMatrial: false,
    }
  },
  computed: {
    filteredRows() {
      return this.material.filter((material) => {
        const fUser = material.name.toString().toLowerCase()
        const searchTerm = this.filter.toLowerCase()

        return fUser.includes(searchTerm)
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
      .get('material')
      // .get('bidang')
      .then((res) => (this.material = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    addKategori(x) {
      this.visibleLiveDemo = true
      this.xBidang = x.nama_bidang
      this.xId = x.id
    },
    addMaterial() {
      this.modalTambahMatrial = true
    },
    saveMaterial() {
      const data = {
        name: this.form.name,
        satuan: this.form.satuan,
        harga: this.form.harga,
      }

      axios
        .post('material', data)
        .then((res) => {
          console.log(res)
          axios
            .get('material')
            .then(
              (res) => {
                this.material = res.data.data
                this.modalTambahMatrial = false
              },
              // (res) => (this.user = res.data.data)
            )
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    },

    saveBidang() {
      const data = {
        nama_bidang: this.form.namaBidang,
      }
      console.log(data)
      axios
        .post('material', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      this.bidang.push(data)
      this.form.namaBidang = ''
      this.modalTambahUser = false
    },

    hapusMaterial(id) {
      const getMaterial = async () => {
        try {
          const resp = await axios.get('material')
          console.log(resp.data.data)
          this.metrial = resp.data.data
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      const deleteBidang = async (id) => {
        try {
          const resp = await axios.delete(`material/${id}`)
          console.log(resp.data)
          getMaterial()
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }

      deleteBidang(id)
    },

    editMaterial(x) {
      this.form = { ...x }
      this.modalEditMatrial = true
    },

    updateMaterial() {
      const data = {
        name: this.form.name,
        satuan: this.form.satuan,
        harga: this.form.harga,
      }

      axios
        .put(`material/${this.form.id}`, data)
        .then((res) => {
          console.log(res)
          axios
            .get('material')
            .then((res) => {
              this.material = res.data.data
              this.modalEditMatrial = true
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    },

    deleteUser(x) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
      axios
        .delete(`user/${x}`, config)
        .then((res) => {
          console.log(res)
          axios
            .get('user')
            .then((res) => (this.user = res.data.data))
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
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
