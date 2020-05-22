<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        populations-chart
      </h1>
      <h2 class="subtitle">
        Changes in total population by prefecture
      </h2>
      <div class="wrap-pref">
        <ul>
          <li v-for="(pref, index) in prefs" :key="pref.prefCode">
            <label>
              <input
                :id="'pref' + index"
                v-model="selectedPrefs"
                type="checkbox"
                :value="pref"
                @change="togglePref(pref)"
              />
              {{ pref.prefName }}
            </label>
          </li>
        </ul>
      </div>
      <div class="chart-container">
        <line-chart :chart-data="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      selectedPrefs: []
    }
  },
  computed: {
    prefs() {
      return this.$store.getters.getPref
    },
    chartData() {
      return this.$store.getters.getChart
    }
  },
  mounted() {
    this.fetchPref()
  },
  methods: {
    fetchPref() {
      this.$store.dispatch('fetchPref')
    },
    togglePref(val) {
      if (this.selectedPrefs.includes(val)) {
        this.$store.dispatch('fetchPopulation', val.prefCode)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
