// import { BehaviorSubject } from 'rxjs'

// import config from 'config'
// import { requestOptions, handleResponse } from '@/_helpers'

// const currentUserSubject = () => {
//     return JSON.parse(localStorage.getItem('currentUser'))
// }

export const authenticationService = {
    // login,
    // logout,

    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    get currentUserValue() {
        // console.log(currentUserSubject)
        // console.log(JSON.parse(localStorage.getItem('currentUser')))
        return JSON.parse(localStorage.getItem('currentUser'))
    },
}

// function login(username, password) {
//   return fetch(
//     `${config.apiUrl}/users/authenticate`,
//     requestOptions.post({ username, password }),
//   )
//     .then(handleResponse)
//     .then((user) => {
//       // store user details and jwt token in local storage to keep user logged in between page refreshes
//       localStorage.setItem('currentUser', JSON.stringify(user))
//       currentUserSubject.next(user)

//       return user
//     })
// }

// function logout() {
//   // remove user from local storage to log user out
//   localStorage.removeItem('currentUser')
//   currentUserSubject.next(null)
// }