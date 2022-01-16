<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <form @submit.prevent="onSubmit">
          <CCol :md="6">
            <CCardGroup>
              <CCard class="p-4">
                <CCardBody>
                  <h1>Rancangan Anggaran Biaya</h1>
                  <p class="text-medium-emphasis">Silahkan Login !</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <input
                      id="username"
                      v-model="username"
                      class="form-control"
                      placeholder="Username"
                      required
                      name="username"
                    />
                    <!-- <div
                      v-if="submitted && !this.username.required"
                      class="invalid-feedback"
                    >
                      Username is required
                    </div> -->
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <input
                      id="password"
                      v-model="password"
                      placeholder="Password"
                      type="password"
                      class="form-control"
                      required
                      name="password"
                    />
                    <!-- <div
                      v-if="submitted && !$v.password.required"
                      class="invalid-feedback"
                    >
                      Password is required
                    </div> -->
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="5">
                      <!-- <CButton color="primary" @click="login" class="px-4 col"
                        >Login</CButton
                      > -->
                      <div class="form-group">
                        <button class="btn btn-primary" :disabled="loading">
                          <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm mr-2"
                          ></span>
                          <span class="mx-2">Login</span>
                        </button>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
        </form>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'
import { authenticationService } from '../../service/authentication.service'
import { required } from 'vuelidate/lib/validators'
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
      submitted: false,
      loading: false,
      error: '',
    }
  },
  validations: {
    username: { required },
    password: { required },
  },
  created() {
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      return this.$router.push({ name: 'Home' })
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
    async onSubmit() {
      this.submitted = true

      // stop here if form is invalid
      // this.$v.$touch()
      // if (this.$v.$invalid) {
      //   return
      // }

      this.loading = true
      const data = {
        name: this.username,
        password: this.password,
      }
      console.log(this.username)
      console.log(this.password)

      const response = await axios.post('login', data)
      // console.log(response)
      const user = response.data.data
      if (response.data.meta.message == 'Login Berhasil !') {
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.loading = false
        console.log(user)

        return this.$router.push({ name: 'Home' })
      } else {
        this.loading = false
        alert('Username atau password Salah !!!')
      }

      // authenticationService.login(this.username, this.password)
      //     .then(
      //         user => router.push(this.returnUrl),
      //         error => {
      //             this.error = error;
      //             this.loading = false;
      //         }
      //     );
    },
  },
}
</script>
