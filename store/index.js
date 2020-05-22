export const state = () => ({
  pref: [],
  population: []
})

export const mutations = {
  setPref(state, data) {
    state.pref = data
  },
  setPopulation(state, data) {
    const obj = {
      prefCode: data.prefCode,
      data: data.result.data[0].data
    }
    state.population.push(obj)
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

    state.population.forEach((item) => {
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
      return false
    }

    const data = await this.$api.$get(
      `/population/composition/perYear?prefCode=${prefCode}`
    )

    if (data.result) {
      commit('setPopulation', { result: data.result, prefCode })
    }
  }
}
