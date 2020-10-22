<template>
<div class="container mx-auto">
  <autocomplete :search="search" @change="resetPage()" :get-result-value="getResultValue" @submit="onSubmit"></autocomplete>
  <div class="container mx-auto my-auto">
    <Loader v-if="isLoading" class="image__spinner" />
  </div>

  <figure class="container" v-if="!isLoading" v-masonry horizontal-order="true" transition-duration="0.3s" item-selector=".item" gutter="3" fit-width="true">

    <div v-masonry-tile class="item" v-for="(current_image,i) in images" :key="i.id">
      <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
        <img class="w-full image__wrapper" :src="current_image.url">
      </div>
      <!-- END item -->
    </div>

  </figure>
  <div class="container pt-auto block my-auto">
    <t-pagination v-show="(isLoaded,!isLoading)" @change="getImages" :total-items="totalItems" :per-page="perPage" :limit="limit" :disabled="isLoading" v-model="page" />
  </div>
</div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import Loader from "../components/Loader"
import axios from "axios";
export default {
  name: "home",
  components: {
    Autocomplete,
    Loader
  },
  data() {
    return {
      country_flag_url: "",
      images: [],
      breeds: [],
      selected_breed: {},
      current_image: {},
      pagination_count: 0,
      perPage: 8,
      limit: 8,
      page: 1,
      isLoading: false,
      isLoaded: false,
    }
  },
  computed: {
    totalItems() {
      return parseInt(this.pagination_count)
    }
  },
  created() {
    this.getBreeds();
    this.isLoading = false
  },
  watch: {
    selected_breed() {
      console.log(this.selected_breed)
      this.getImages();
    },
    page() {
      this.getImages()
    }
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return []
      }
      return this.breeds.filter(breed => {
        return breed.name.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    resetPage() {
      this.page = 1,
        this.getImages();
    },
    getResultValue(result) {
      return result.name
    },
    onSubmit(result) {
      this.selected_breed = result.id
      this.breed_ids = this.selected_breed
      console.log(this.breed_ids)
    },
    async getBreeds() {
      axios.defaults.headers.common['x-api-key'] = process.env.VUE_APP_API_KEY
      let response = await axios.get('https://api.thecatapi.com/v1/breeds/')
      return this.breeds = response.data;

    },
    async getImages() {
      this.isLoading = true
      let query_params = {
        breed_ids: this.breed_ids,
        limit: this.limit,
        page: this.page - 1
      }

      let response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        params: query_params
      })

      this.pagination_count = response.headers['pagination-count'];
      this.images = response.data
      this.current_image = this.images[0]
      this.isLoading = false

      this.isLoaded = true
      console.log(this.images.length)

    }

  }
};
</script>

<style lang="css" scoped>

</style>
