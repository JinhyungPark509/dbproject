<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" @click="goToMenu('/')">GLAM</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              aria-current="page"
              @click="goToMenu('/')"
              >Home</a
            >
          </li>
          <li v-if="isLogin" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              :class="{
                active:
                  $route.path.indexOf('/category/') > -1 ||
                  $route.path.indexOf('/supplier/') > -1 ||
                  $route.path.indexOf('/shipper/') > -1 ||
                  $route.path.indexOf('/employee/') > -1 ||
                  $route.path.indexOf('/customer/') > -1
              }"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" @click="goToMenu('/category/list')"
                  >Category</a
                >
              </li>
              <li>
                <a class="dropdown-item" @click="goToMenu('/supplier/list')"
                  >Supplier</a
                >
              </li>
              <li>
                <a class="dropdown-item" @click="goToMenu('/shipper/list')"
                  >Shipper</a
                >
              </li>
              <li>
                <a class="dropdown-item" @click="goToMenu('/employee/list')"
                  >Employee</a
                >
              </li>
              <li>
                <a class="dropdown-item" @click="goToMenu('/customer/list')"
                  >Customer</a
                >
              </li>
            </ul>
          </li>
          <li v-if="isLogin" class="nav-item">
            <a
              class="nav-link"
              :class="{ active: $route.path === '/order/list' }"
              aria-current="page"
              @click="goToMenu('/order/list')"
              >Order List</a
            >
          </li>
          <li v-if="isLogin" class="nav-item">
            <a
              class="nav-link"
              :class="{ active: $route.path === '/product/list' }"
              aria-current="page"
              @click="goToMenu('/product/list')"
              >Product List</a
            >
          </li>
          <li v-if="isLogin" class="nav-item">
            <a
              class="nav-link"
              :class="{ active: $route.path === '/basket' }"
              aria-current="page"
              @click="goToMenu('/basket')"
              >Basket</a
            >
          </li>
          <li v-if="!isLogin" class="nav-item">
            <button class="btn btn-danger" type="button" @click="kakaoLogin">
              로그인
            </button>
          </li>
          <li v-else class="nav-item">
            <button class="btn btn-danger" type="button" @click="kakaoLogout">
              로그아웃
            </button>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { Collapse } from 'bootstrap'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['isLogin'])
  },
  methods: {
    ...mapMutations('user', ['setUserInfo', 'clearUserInfo']),
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: this.getProfile
      })
    },
    getProfile(authObj) {
      console.log(authObj)
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakaoAccount = res.kakao_account
          console.log(kakaoAccount)
          this.setUserInfo(kakaoAccount)
          alert('로그인 성공!')
        }
      })
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response)
        this.clearUserInfo()
        alert('로그아웃')
        this.$router.push({ path: '/' })
      })
    },
    goToMenu(path) {
      this.$router.push({ path: path }).then(() => {
        // 메뉴 이동 후 드롭다운 메뉴 닫기
        const navbarCollapse = document.getElementById('navbarSupportedContent')
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new Collapse(navbarCollapse, {
            toggle: false
          })
          bsCollapse.hide()
        }
      })
    }
  }
}
</script>

<style>
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(128, 0, 0, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E") !important;
}
</style>
