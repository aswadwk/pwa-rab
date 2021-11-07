<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <h1>Login</h1>
                <p class="text-medium-emphasis">Sign In to your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <input
                    id="username"
                    v-model="form.username"
                    class="form-control"
                    required
                    name="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    required
                    name="password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol :xs="5">
                    <CButton color="primary" @click="login" class="px-4 col"
                      >Login</CButton
                    >
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login: function (e) {
      e.preventDefault()
      if (this.form.username == '' || this.form.password == '') {
        alert('lengkapi username atau password')
      } else {
        const data = {
          username: this.form.username,
          password: this.form.password,
        }
        console.log(data)
      }
    },
  },
}
</script>
