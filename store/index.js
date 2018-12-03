import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      step: {
        activeStep: 0,
        prevStep: 0
      },
      sale: {
        total: 0,
        assortmentsSale: [],
        quantity: 0,
        date: '',
        note: ''
      },
      assortments: [],
      assortmentsClone: [],
      searchInput: '',
      searchAssortmentsResult: ''
    }),
    mutations: {
      // Set date of sale
      SET_SALE_DATE(state, saleDate) {
        state.sale.date = saleDate
      },

      // Set which step of sale is active
      SET_ACTIVE_STEP(state, activeStep) {
        state.step = activeStep
      },

      // Load assortments to table
      LOAD_ASSORTMENTS(state, assortments) {
        state.assortments = assortments
        state.assortmentsClone = assortments
      },

      // Update total price
      CALCULATE_TOTAL(state, totalPrice) {
        state.sale.total = totalPrice
      },

      // Update state in basket
      UPDATE_BASKET(state, newValue) {
        state.sale.total = 0
        state.sale.quantity = 0
        state.sale.assortments = []

        newValue.assortments.forEach((item, index) => {
          item.assortment[0].full_price =
            item.assortment[0].quantity * item.assortment[0].price
          if (item.assortment[0].id === newValue.id) {
            state.sale.assortments = state.sale.assortments.filter(
              assortment => assortment.id != newValue.id
            )
            item.assortment[0].quantity = 0
            item.assortment[0].full_price = 0
          }
          state.sale.total += item.assortment[0].full_price
          state.sale.total = parseFloat(state.sale.total.toFixed(2))
          state.sale.quantity += parseFloat(item.assortment[0].quantity)

          if (item.assortment[0].quantity > 0) {
            state.sale.assortments.push(item.assortment[0])
          }
        })
      },

      // Searches the product code column and filters it
      SET_SEARCH(state, searchResults) {
        state.searchAssortmentsResult = searchResults
        searchResults = searchResults.trim().toLowerCase()
        state.assortmentsClone = state.assortments.filter(item => {
          return (
            item.assortment[0].code.toLowerCase().includes(searchResults) ||
            item.assortment[0].quantity > 0
          )
        })
      },

      // Sets search input assortments state variable in vuex
      SEARCH_INPUT_ASSORTMENTS(state, searchInput) {
        state.searchInput = searchInput
      },

      // Resets entire sale
      RESET_SALE(state) {
        let pad = s => {
          return s < 10 ? '0' + s : s
        }
        let d = new Date()

        state.step.activeStep = 0
        state.step.prevStep = state.activeStep

        state.sale.note = ''
        state.sale.date = [
          pad(d.getDate()),
          pad(d.getMonth() + 1),
          d.getFullYear()
        ].join('.')

        state.sale.total = 0
        state.sale.assortments = []
        state.sale.quantity = 0
        state.assortments = []
        state.assortmentsClone = []
        state.searchInput = ''
        state.searchAssortmentsResult = ''
      }
    },
    actions: {
      // Setting date of sale
      setSaleDate({ commit }, saleDate) {
        commit('SET_SALE_DATE', saleDate)
      },
      // Set active step
      setActiveStep({ commit }, activeStep) {
        commit('SET_ACTIVE_STEP', activeStep)
      },
      // Loading all assortments into table
      loadAssortments({ commit, state }) {
        this.$axios
          .get(`/data.json`, {})
          .then(response => response)
          .then(data => {
            if (data) {
              let assortments = data.data.data

              //assortments.filter(assortment => (assortment.id === ));

              // full_price_without_discount_gift
              // price_sm_gift
              assortments.forEach(item => {
                item.assortment[0].quantity = 0
                item.assortment[0].full_price = 0
              })

              assortments = assortments.filter(
                item => item.assortment[0].available !== 0
              )
              commit('LOAD_ASSORTMENTS', assortments)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      // Update basket value
      updateValue({ commit }, newValue) {
        commit('UPDATE_BASKET', newValue)
      },
      // Keyword that is passed from search
      search({ commit }, keywords) {
        commit('SET_SEARCH', keywords)
      },
      // Set search input value
      searchInput({ commit }, value) {
        commit('SEARCH_INPUT', value)
      },
      // Finishing sale
      completeSale({ commit, dispatch }, data) {
        let strDay = data.created_at ? data.created_at.slice(0, 2) : ''
        let strMonth = data.created_at ? data.created_at.slice(3, 5) + '-' : ''
        let strYear = data.created_at ? data.created_at.slice(6, 10) + '-' : ''

        let date =
          strYear !== '' || strMonth !== '' || strDay !== ''
            ? `${strYear}${strMonth}${strDay}`
            : null

        console.log({
          total_price: data.total_price,
          assortments: data.assortments,
          note: data.note,
          created_at: date
        })
        commit('RESET_SALE')
        // AXIOS CALL THAT SENDS DATA TO BACKEND
        /*this.$axios
          .post(`/save.json`, {
            total_price: data.giftData.total_price,
            consummation_assortments: data.giftData.gift_assortments,
            consummation_note: data.giftData.gift_note,
            created_at: date
          })
          .then(response => response)
          .then(data => {
            commit('RESET_SALE')
          })
          .catch(function(error) {
            console.log(error)
          })*/
      },
      // Resets sale
      saleReset({ commit }) {
        commit('RESET_SALE')
      }
    },
    getters: {
      // Get sale object
      getSale: state => {
        return state.sale
      },
      // Get active step
      getActiveStep: state => {
        return state.step
      },
      // Clone list of assortments
      assortmentsClone: state => {
        return state.assortmentsClone
      },
      // List of assortments
      getAssortments: state => {
        return state.assortments
      },
      // Results of the search
      getSearchAssortmentsResult: state => {
        return state.searchAssortmentsResult
      },
      // Search input value
      getSearchInput: state => {
        return state.searchInput
      }
    }
  })
}

export default createStore
