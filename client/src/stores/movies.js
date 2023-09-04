import axios from 'axios'

import { defineStore } from 'pinia'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const baseUrl = 'https://movies-server.puthree.space'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    bookmarks: [],
    totalDataMovie: 0,
    totalPage: 0,
    currentPage: 0,
    isLogin: false,
    movie: {},
    qrCode: ''
  }),
  actions: {
    async registerCustomer(email, password) {
      try {
        const response = await axios({
          url: baseUrl + '/pub/register',
          method: 'post',
          data: { email, password }
        })
        this.showSuccessNotif('success')
        this.router.push('/login')
      } catch (err) {
        console.log(err.response.data.message[0])
        this.showError(err.response.data.message[0])
      }
    },
    async handleLogin(email, password) {
      try {
        const response = await axios({
          url: baseUrl + '/pub/login',
          method: 'post',
          data: { email, password }
        })
        const { access_token } = response.data
        localStorage.setItem('access_token', access_token)
        this.isLogin = true
        this.router.push('/bookmark')
      } catch (err) {
        console.log(err.response.data.message)
        this.showError(err.response.data.message)
      }
    },
    handleLogout() {
      localStorage.clear()
      this.isLogin = false
      this.router.push('/login')
    },
    async fetchMovies(page = 1, title) {
      try {
        let search = ''
        if (title) {
          search = `&&title=${title}`
        }
        const response = await axios.get(baseUrl + '/pub/movies?page=' + page + search)
        const { data } = response.data
        console.log({ data, page, url: baseUrl + '/pub/movies?page=' + page + search })
        this.movies = data
        this.totalPage = response.data.totalPage
      } catch (err) {
        console.log(err)
      }
    },
    async addBookmark(movieId) {
      try {
        if (localStorage.getItem('access_token')) {
          console.log(movieId, 'alohaa', localStorage.getItem('access_token'))
          const response = await axios({
            url: baseUrl + '/pub/bookmarks/' + movieId,
            method: 'post',
            headers: { access_token: localStorage.getItem('access_token') }
          })
          this.router.push('/bookmark')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchBookmark() {
      try {
        const response = await axios({
          url: baseUrl + '/pub/bookmarks',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.bookmarks = response.data.data
      } catch (err) {
        console.log(err)
      }
    },
    setIsLogin() {
      if (localStorage.getItem('access_token')) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    async googleLogin(response) {
      try {
        const dataGlogin = await axios({
          url: baseUrl + '/pub/glogin',
          method: 'POST',
          headers: { google_token: response.credential }
        })
        const token = dataGlogin.data.message
        this.isLogin = true
        localStorage.setItem('access_token', token)
        this.router.push('/bookmark')
      } catch (err) {
        console.log(err)
      }
    },
    async fetchDetail(movieId) {
      try {
        const response = await axios.get(baseUrl + '/pub/movies/' + movieId)
        const { data } = response.data
        this.movie = data
        this.qrCode = response.data.qrCode
        console.log(response.data, 111)
        console.log(this.qrCode)
      } catch (err) {
        console.log(err)
      }
    },
    showError(error) {
      $toast.error('Error: ' + error, {
        position: 'top-right',
        duration: 5000,
        dismissible: true
      })
    },
    showSuccessNotif(message) {
      $toast.success(message, {
        position: 'top-right',
        duration: 3000,
        dismissible: true
      })
    }
  }
})
