export const state = () => ({
  pref: []
})

export const mutations = {
  setPref(state, data) {
    state.pref = data
  }
}

export const getters = {
  getPref: (state) => {
    return state.pref
  }
}

export const actions = {
  async fetchPref({ commit }) {
    const data = await this.$api.$get('/prefectures')
    if (data.result) commit('setPref', data.result)
  }
}
