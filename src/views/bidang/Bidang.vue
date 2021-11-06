<template>
  <CCard>
    <CCardHeader class="d-flex">List Bidang</CCardHeader>
    <CCardBody>
      <CCardTitle>List Bidang yang terdaftar</CCardTitle>
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
          <CTableRow v-for="x in bidang" :key="x.id" @click="addBidang()">
            <CTableHeaderCell scope="row">{{no+1}}</CTableHeaderCell>
            <CTableDataCell>{{ x.nama_bidang }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>

  <CModal
    :visible="visibleLiveDemo"
    @close="
      () => {
        visibleLiveDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Modal title</CModalTitle>
    </CModalHeader>
    <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
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
      <CButton color="primary">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
// import axios from '../../axios'
import axios from 'axios'

export default {
  data() {
    return {
      no:1,
      bidang: [],

      visibleLiveDemo: false,
    }
  },
  mounted() {
    axios
      .get('//api.zahrazhafira.com/api/bidang')
      .then((res) => (this.bidang = res.data.data))
      .catch((err) => console.log(err))
  },
  methods: {
    addBidang() {
      this.visibleLiveDemo = true
    },
  },
}
</script>
