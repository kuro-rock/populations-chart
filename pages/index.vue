<template>
  <div class="container">
    <div>
      <h1 class="title">
        Changes in total population by prefecture
      </h1>
      <div class="wrap-pref">
        <ul class="pref_list">
          <li
            v-for="(pref, index) in prefs"
            :key="pref.prefCode"
            class="pref_list-item"
          >
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
export default {
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
      } else {
        this.$store.commit('togglePref', val.prefCode)
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
  padding: 0.5em 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-weight: bold;
  font-size: 2rem;
  color: #35495e;
}

.wrap-pref {
  margin-top: 1rem;
}

.pref_list {
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.pref_list-item {
  text-align: left;
  display: inline-blocks;
  width: 6em;
}
</style>
