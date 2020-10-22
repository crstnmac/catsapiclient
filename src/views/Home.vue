<template>
<div class="container mx-auto">
  <autocomplete :search="search" placeholder="Search for cats" :debounce-time="300" :get-result-value="getResultValue" @exit.prevent @focus.prevent @keyup.enter.prevent @submit="onSubmit" @exit="onExit"></autocomplete>
  <div class="container mx-auto mt-12">
    <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
      {{breed_name}}
    </h3>
  </div>

  <div class="container mx-auto mt-6">
    <Loader v-if="isLoading" class="image__spinner" />
  </div>
  <masonry class="container mx-auto" v-if="!isLoading" :cols="{default: 4, 1000: 3, 700: 2, 400: 1}" :gutter="{default: '25px', 700: '15px'}">
    <div v-for="(current_image, index) in images" :key="index">
      <SVGFilterImage class="w-full" :src="current_image.url" :duration="1500" />
    </div>
  </masonry>
  <h3 class="container mx-auto" v-if="totalItems===0 && !isLoading">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1400 500" enable-background="new 0 0 1400 1400" xml:space="preserve">

      <g id="Objects">

        <g>
          <path fill="#EE5A41" d="M774.9,386l-74.9,4l-74.9-4c0,0-9.7,6.3-3.7,25.3c0,0,21,21.7,78.7,21.7s78.7-21.7,78.7-21.7     C784.6,392.3,774.9,386,774.9,386z" />
          <g>
            <path fill="#D6D5D7" d="M580.8,146.1c9.7-13.4,92.5,15.6,92.5,15.6l-98.5,82.7C567.5,207.5,571.1,159.5,580.8,146.1z" />
            <path fill="#F0A98C" d="M599.8,167.9c5.2-7.2,50,8.5,50,8.5L596.5,221C592.6,201.1,594.5,175.1,599.8,167.9z" />
            <path fill="#D6D5D7" d="M820.1,146.1c-9.7-13.4-92.5,15.6-92.5,15.6l98.5,82.7C833.4,207.5,829.7,159.5,820.1,146.1z" />
            <path fill="#F0A98C" d="M801.1,167.9c-5.2-7.2-50,8.5-50,8.5l53.3,44.7C808.3,201.1,806.3,175.1,801.1,167.9z" />
            <ellipse fill="#D6D5D7" cx="700.5" cy="283.5" rx="132.9" ry="127.9" />
            <ellipse fill="#E9A080" cx="617.3" cy="343.7" rx="22.8" ry="15" />
            <ellipse fill="#E9A080" cx="782.5" cy="343.7" rx="22.8" ry="15" />
            <path fill="#3C3A3D" d="M705.7,324.2h-5.3h-5.3c-2.7,0-4.5,2.8-3.3,5.3c0.9,1.8,2.6,3.8,5.7,5.3c1.8,0.9,3.8,0.9,5.6,0      c3.3-1.6,5-3.6,5.8-5.5C710.2,326.9,708.3,324.2,705.7,324.2z" />
            <g>
              <path fill="#BAB9B8" d="M700.5,219.5c8.9,4.4,9.5-38.4,9-63.5c-3-0.2-6-0.3-9.1-0.3c-2.8,0-5.6,0.1-8.3,0.3       C691.6,179.3,692.1,215.4,700.5,219.5z" />
              <path fill="#BAB9B8" d="M671.3,213.5c8.1,4,9.3-31.2,9.1-56.5c-6,0.9-11.9,2.1-17.6,3.8C662.7,183.2,664.2,210,671.3,213.5z" />
              <path fill="#BAB9B8" d="M729,210.8c7.4,3.6,9-25.6,9.1-49.9c-5.7-1.6-11.6-2.9-17.6-3.8C720.3,179.6,721.7,207.2,729,210.8z" />
            </g>
            <g>
              <circle fill="#FFFFFF" cx="640.1" cy="284.4" r="38.2" />
              <circle fill="#3C3A3D" cx="645" cy="284.4" r="14.4" />
              <path fill="#BAB9B8" d="M640.1,246.2c-21.1,0-38.2,17.1-38.2,38.2h76.4C678.3,263.3,661.2,246.2,640.1,246.2z" />
            </g>
            <g>
              <circle fill="#FFFFFF" cx="759.6" cy="284.4" r="38.2" />
              <circle fill="#3C3A3D" cx="754.7" cy="284.4" r="14.4" />
              <path fill="#BAB9B8" d="M759.6,246.2c21.1,0,38.2,17.1,38.2,38.2h-76.4C721.4,263.3,738.5,246.2,759.6,246.2z" />
            </g>
            <path fill="#3C3A3D" d="M700.5,354.5c-0.8,0-1.5-0.7-1.5-1.5v-23.2c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5V353      C702,353.8,701.3,354.5,700.5,354.5z" />
            <path fill="#3C3A3D" d="M720.1,359c-0.2,0-0.4,0-0.6-0.1c-23.2-9.6-35.4-0.3-35.5-0.2c-0.7,0.5-1.6,0.4-2.1-0.3      s-0.4-1.6,0.3-2.1c0.5-0.4,13.7-10.4,38.5-0.2c0.8,0.3,1.1,1.2,0.8,2C721.2,358.7,720.7,359,720.1,359z" />
            <g>
              <path fill="#3C3A3D" d="M851.7,324c-0.1,0-0.1,0-0.2,0l-45.3-6.2c-0.8-0.1-1.4-0.9-1.3-1.7c0.1-0.8,0.9-1.4,1.7-1.3l45.3,6.2       c0.8,0.1,1.4,0.9,1.3,1.7C853.1,323.5,852.5,324,851.7,324z" />
              <path fill="#3C3A3D" d="M837.1,347.7c-0.2,0-0.4,0-0.7-0.1l-30.7-14.8c-0.7-0.4-1.1-1.3-0.7-2s1.3-1.1,2-0.7l30.7,14.8       c0.7,0.4,1.1,1.3,0.7,2C838.2,347.3,837.6,347.7,837.1,347.7z" />
              <path fill="#3C3A3D" d="M548.3,324c-0.7,0-1.4-0.5-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7l45.3-6.2c0.8-0.1,1.6,0.5,1.7,1.3       c0.1,0.8-0.5,1.6-1.3,1.7l-45.3,6.2C548.4,324,548.3,324,548.3,324z" />
              <path fill="#3C3A3D" d="M562.9,347.7c-0.6,0-1.1-0.3-1.4-0.8c-0.4-0.7,0-1.6,0.7-2l30.7-14.8c0.7-0.4,1.6,0,2,0.7       c0.4,0.7,0,1.6-0.7,2l-30.7,14.8C563.4,347.6,563.1,347.7,562.9,347.7z" />
            </g>
          </g>
          <circle fill="#F0A736" cx="700" cy="422.3" r="16.3" />
          <circle fill="#F0BD39" cx="704.3" cy="417.9" r="5.9" />
        </g>
      </g>
    </svg>

    No images available
  </h3>

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
      breeds: {},
      selected_breed: {},
      breed_name: "",
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
      // console.log(this.selected_breed)
      this.getImages();
    },
    search() {
      this.page
    },
  },
  methods: {
    onExit() {
      return []
    },

    async search(input) {
      axios.defaults.headers.common['x-api-key'] = process.env.VUE_APP_API_KEY

      let query_params = {
        q: input
      }

      let result = await axios.get('https://api.thecatapi.com/v1/breeds/search', {
        params: query_params
      })
      // console.log(result.data)
      return result.data
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
      this.breed_name = result.name
      this.breed_ids = this.selected_breed
      // console.log(this.breed_ids)
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
      // console.log(this.images.length)
      // console.log(this.pagination_count)

    }

  }
};
</script>

<style lang="css" scoped>

</style>
