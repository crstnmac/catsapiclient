<template>
<div class="container mx-auto">
  <autocomplete :search="search" placeholder="Search for cats in breeds" :debounce-time="300" :get-result-value="getResultValue" @exit.prevent @focus.prevent @keyup.enter.prevent @submit="onSubmit" @exit="onExit"></autocomplete>
  <div class=" mx-auto mt-12">
    <Loader v-if="isLoading" class="image__spinner" />
  </div>

  <masonry v-if="!isLoading" :cols="{default: 4, 1000: 3, 700: 2, 400: 1}" :gutter="{default: '30px', 700: '15px'}">
    <div v-for="(current_image, index) in images" :key="index">
      <SVGFilterImage class="w-full" :src="current_image.url" :duration="1500" />
    </div>
  </masonry>

  <div class="container pt-auto block my-auto">
    <t-pagination v-show="(totalItems>perPage) && !isLoading" @change="getImages" :total-items="totalItems" :per-page="perPage" :limit="limit" :disabled="isLoading" v-model="page" />
  </div>
</div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import Loader from "../components/Loader"
import SVGFilterImage from "../components/SVGFilterImage";

import axios from "axios";
export default {
  name: "home",
  components: {
    Autocomplete,
    Loader,
    SVGFilterImage
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
  beforeMount() {
    this.getBreeds();
    this.isLoading = false
  },
  watch: {
    selected_breed() {
      console.log(this.selected_breed)
      this.getImages();
    },
    search() {
      this.page
    }
  },
  methods: {
    onExit() {
      return []
    },
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
      }).then((result) => {
        this.isLoading = false,
          this.isLoaded = false
        this.pagination_count = result.headers['pagination-count'];

        return result
      })

      this.images = response.data
      this.current_image = this.images[0]
      console.log(this.images.length)
      console.log(this.pagination_count)

    }

  }
};
</script>

<style lang="css" scoped>

</style>
