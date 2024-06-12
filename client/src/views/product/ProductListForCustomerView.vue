<template>
  <div class="mt-3">
    <div class="row gx-3 gy-2 align-items-center">
      <div class="col-sm-3">
        <label class="visually-hidden" for="productName">Name</label>
        <input
          type="text"
          class="form-control"
          id="productName"
          placeholder="Product Name"
          v-model="searchName"
          @keyup.enter="doSearch"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary me-1" @click="doSearch">Search</button>
      </div>
    </div>
    <div v-for="(group, index) in paginatedProducts" :key="index" class="row mt-2">
      <div
        class="col-xl-3 col-lg-3 col-md-6"
        v-for="product in group"
        :key="product.product_id"
      >
        <div class="card" style="width: 100%">
          <img
            :src="`${serverUrl}/static/images/${product.img1}`"
            class="card-img-top"
            style="height: 180px; width: auto"
            :alt="product.product_name"
          />
          <div class="card-body">
            <h5 class="card-title" @click="goToDetail(product.product_id)">
              {{ product.product_name }}
            </h5>
            <p class="card-text">
              {{ $convertNumberFormat(product.original_price, '#,###') }}원 |
              {{ product.category_name }} | {{ product.supplier_name }}
            </p>
            <a
              href="#"
              class="btn btn-primary me-1"
              @click="goToDetail(product.product_id)"
              >상세보기</a
            >
            <a
              href="#"
              class="btn btn-success"
              @click="addBasket(product.product_id)"
              >장바구니</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <button class="btn btn-secondary me-1" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [],
      searchName: '',
      currentPage: 1,
      itemsPerPage: 8
    }
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      const paginatedList = this.productList.slice(start, end)
      const groups = []
      for (let i = 0; i < paginatedList.length; i += 4) {
        groups.push(paginatedList.slice(i, i + 4))
      }
      return groups
    },
    totalPages() {
      return Math.ceil(this.productList.length / this.itemsPerPage)
    }
  },
  mounted() {
    this.doSearch()
  },
  methods: {
    async doSearch() {
      const loader = this.$loading.show()
      this.productList = await this.$get('/api/product/searchByName', {
        params: {
          name: this.searchName
        }
      })
      this.currentPage = 1 // 검색 시 첫 페이지로 초기화
      loader.hide()
    },
    goToDetail(productId) {
      this.$router.push({
        path: '/product/detail',
        query: { product_id: productId }
      })
    },
    addBasket(productId) {
      this.$store.commit('basket/add', {
        product_id: productId,
        order_qty: 1
      })
      this.$swal({
        title: '장바구니로 이동 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '이동',
        cancelButtonText: '취소'
      }).then(result => {
        if (result.isConfirmed) {
          this.$router.push({ path: '/basket' })
        }
      })
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>
