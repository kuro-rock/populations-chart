export const state = () => ({
  pref: [],
  population: []
})

export const mutations = {
  setPref(state, data) {
    state.pref = data
  },
  setPopulation(state, data) {
    const RGB = this.$hsvToRgb((360 / 15) * (data.prefCode % 15), 1, 1)
    const color = `rgba(${RGB[0]},${RGB[1]},${RGB[2]},1)`
    const obj = {
      prefCode: data.prefCode,
      data: data.result.data[0].data,
      isSelect: true,
      color
    }
    state.population.push(obj)
  },
  togglePref(state, prefCode) {
    state.population.forEach((item) => {
      if (item.prefCode === prefCode) item.isSelect = !item.isSelect
    })
  }
}

export const getters = {
  getPref: (state) => {
    return state.pref
  },
  existsPopulation: (state) => (prefCode) => {
    const index = state.population.findIndex(
      (item) => item.prefCode === prefCode
    )
    return index !== -1
  },
  getPrefNameByCode: (state) => (prefCode) => {
    return state.pref.find((item) => item.prefCode === prefCode).prefName
  },
  getLabels: (state) => {
    if (state.population.length < 1) return []
    return state.population[0].data.map((obj) => obj.year)
  },
  getDataSets: (state, getters) => {
    const datasets = []
    if (state.population.length < 1) return datasets

    const selectedPopulation = state.population.filter(
      (item) => item.isSelect === true
    )

    selectedPopulation.forEach((item) => {
      const obj = {
        label: getters.getPrefNameByCode(item.prefCode),
        fill: false,
        data: item.data.map((obj) => obj.value)
      }
      datasets.push(obj)
    })
    return datasets
  },
  getChart: (state, getters) => {
    const dataCollection = {
      labels: getters.getLabels,
      datasets: getters.getDataSets
    }
    return JSON.parse(JSON.stringify(dataCollection))
  }
}

export const actions = {
  async fetchPref({ commit }) {
    const data = await this.$api.$get('/prefectures')
    if (data.result) commit('setPref', data.result)
  },

  async fetchPopulation({ commit, getters }, prefCode) {
    if (getters.existsPopulation(prefCode)) {
      return commit('togglePref', prefCode)
    }

    const data = await this.$api.$get(
      `/population/composition/perYear?prefCode=${prefCode}`
    )

    if (data.result) {
      commit('setPopulation', { result: data.result, prefCode })
    }
  }
}
