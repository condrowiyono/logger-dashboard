import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  item: {},
  pagination: {
    descending: true,
    page: 1,
    rowsPerPage: 16,
    sortBy: '',
    totalItems: 0,
    rowsPerPageItems: [1, 2, 4, 8, 16,32,80]
  },
  params: {
    dateFrom: '',
    dateTo: '',
  }
});

export const mutations = {
  setPagination (state, payload) {
    state.pagination = payload
  },
  setParams (state, payload) {
    state.params = payload
  },
  set(state, data) {
    state.list = data.items;
    state.pagination.totalItems = data.totalItems;
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, {data}) {
    state.list.filter(c => data.id !== c.id)
  },
  mergeItems(state, form) {
    assign(state.item, form)
  },
  setItems(state, form) {
    state.item = form
  }
};
export const getters = {
  loading (state) {
    return state.loading
  },
  pagination (state) {
    return state.pagination
  },
  params (state) {
    return state.params
  },
  list (state) {
    return state.list
  }
}

export const actions = {
  async get({commit, rootState}) {
    const { sortBy, descending, page, rowsPerPage } = rootState.logs.pagination
    const { dateFrom, dateTo } = rootState.logs.params
    
    var params = {
      limit: rowsPerPage,
      page,
      date_from: dateFrom,
      date_to: dateTo,
    } 
    await this.$axios.get(`/logs`, { params })
      .then((res) => {
        if (res.status === 200) {
          var items = res.data.data;
          var totalItems = res.data.meta.total;
          commit('set', { items, totalItems })
        }
      })
  },
  async show({commit}, params) {
    await this.$axios.get(`/logs/${params.log_id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergeItems', res.data.data)
        }
      })
  },
  async set({commit}, data) {
    await commit('set', data)
  },
  async form({commit}, form) {
    await commit('mergeItems', form)
  },
  async add({commit}, data) {
    await commit('add', data)
  },
  create({commit}, params) {
    return this.$axios.post(`/logs`, params)
  },
  update({commit}, params) {
    return this.$axios.put(`/logs/${params.id}`, params)
  },
  delete({commit}, params) {
    return this.$axios.delete(`/logs/${params.id}`)
  }
};