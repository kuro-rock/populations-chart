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
      prefName: data.prefName,
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
