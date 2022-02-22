<template>
  <CCard>
    <CCardHeader class="d-flex justify-content-between">
      <h4>Daftar User</h4>
      <CButton v-if="role == 'OPERATOR'" color="primary" @click="addUser()"
        >Tambah User</CButton
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
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
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
            <CTableDataCell>{{ x.role }}</CTableDataCell>
            <CTableDataCell class="text-center">
              <CButton
                v-if="role == 'OPERATOR'"
                color="primary"
                size="sm"
                @click="passwordReset(x.id)"
                >Reset Password</CButton
              >
              <CButton
                v-if="role == 'OPERATOR'"
                size="sm"
                class="btn btn-md btn-danger ml-2 mr-2"
                @click="deleteUser(x.id)"
                >Hapus</CButton
              >
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
  <!-- modal tambah kegiatan -->
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
      <CModalTitle>Form Tambah Kegiatan </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h3 class="d-flex justify-content-between">
        <h2>{{ xBidang }}</h2>
        <div v-if="role == 'OPERATOR'">
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
          <label for="namakegiatan" style="margin-top: 10px"
            >Nama Kegiatan</label
          >
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
      <CButton v-if="role == 'OPERATOR'" color="primary" @click="saveKegiatan"
        >Tambah Kegiatan</CButton
      >
    </CModalFooter>
  </CModal>

  <!-- modal tambah bidang -->
  <CModal
    size="xl"
    :visible="modalTambahUser"
    @close="
      () => {
        modalTambahUser = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle v-if="role == 'OPERATOR'">Tambah User </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="submit-form">
        <div class="form-group">
          <label for="bidang">Nama</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control mb-2"
            required
            placeholder="Username"
            name="namabidang"
          />
        </div>
        <div class="form-group">
          <label for="bidang">Role</label>
          <select id="" v-model="form.role" name="" class="form-control mb-2">
            <option value="">-Pilih Role-</option>
            <option value="OPERATOR">OPERATOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div class="form-group">
          <label for="bidang">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control mb-2"
            placeholder="Password"
            required
            name="namabidang"
          />
        </div>
        <div class="form-group">
          <label for="bidang">Password Confirm</label>
          <input
            v-model="form.passwordConfirm"
            type="password"
            class="form-control mb-2"
            required
            placeholder="Password Confirm"
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
            modalTambahUser = false
          }
        "
      >
        Batal
      </CButton>
      <CButton color="primary" @click="saveUser">Tambah</CButton>
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

      user: [],
      visibleLiveDemo: false,
      modalTambahUser: false,
    }
  },
  computed: {
    filteredRows() {
      return this.user.filter((user) => {
        const fUser = user.name.toString().toLowerCase()
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
      .get('user')
      // .get('bidang')
      .then((res) => (this.user = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    addKategori(x) {
      this.visibleLiveDemo = true
      this.xBidang = x.nama_bidang
      this.xId = x.id
    },
    addUser() {
      this.modalTambahUser = true
    },
    saveUser() {
      const data = {
        name: this.form.name,
        password: this.form.password,
        role: this.form.role,
      }
      // console.log(data);
      if (this.form.password == this.form.passwordConfirm) {
        console.log(data)

        axios
          .post('add-user', data)
          .then((res) => {
            console.log(res)
            axios
              .get('user')
              .then((res) => (this.user = res.data.data))
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))

        // axios
        //   .post(
        //     `http://127.0.0.1:8000/api/register?name=${data.name}&password=${data.password}&role=${data.role}`,
        //   )
        //   .then((res) => {
        //     this.modalTambahUser = false
        //     console.log(res)
        //     axios
        //       .get('user')
        //       .then((res) => (this.user = res.data.data))
        //       .catch((err) => console.log(err))
        //   } )
        //   .catch((err) => console.log(err))
      } else {
        alert('Password tidak sama !')
      }
    },
    saveBidang() {
      const data = {
        nama_bidang: this.form.namaBidang,
      }
      console.log(data)
      axios
        .post('bidang', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      this.bidang.push(data)
      this.form.namaBidang = ''
      this.modalTambahUser = false
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
    passwordReset(x) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
      axios
        .post(`reset-password/${x}`, config)
        .then((res) => {
          console.log(res)
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
