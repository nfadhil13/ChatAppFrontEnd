/**
 * @author: larbi JIRARI
 * @source : https://medium.com/js-dojo/yet-another-pattern-for-api-calls-using-vuejs-vuex-b22ecdfb0ea2
 */

export default class StoreUtil {
    /**
     * init the state.
     * @return {Object} default state
     */
    static state() {
      return {
        data: null,
        status: {
          loading: false,
          success: false,
          fail: false,
          error: null
        }
      };
    }
    /**
     * @param {Object} state - the state to update
     * @param {Object,Error} data - data to update with
     * @returns {Object} state after update
     */
  
    static updateState(state, data = null) {
      //TODO: ADD CHECK to verify that state
      if (data === null) {
        // PENDING
        return this._mutationPending({ ...state });
      }
      //SUCCESS or FAIL
      return data instanceof Error
        ? this._mutationFail({ ...state }, data)
        : this._mutationSuccess({ ...state }, data);
    }
  
    /**
     * @param {Object} state - the status to be put in pending state
     * @returns {Object} updated state
     */
    static _mutationPending(state) {
      state.data = null;
      state.status.loading = true;
      state.status.success = false;
      state.status.fail = false;
      state.status.error = null;
      return state;
    }
  
    /**
     * @param {Object} state - the status to be put in success state
     * @param {Object,array} - data to update with
     * @returns {Object} updated state
     */
    static _mutationSuccess(state, data) {
      console.log('menuju mutasi success')
      state.data = data instanceof Array ? data : [data];
      state.status.loading = false;
      state.status.success = true;
      state.status.fail = false;
      state.status.error = null;
      console.log(state)
      return state;
    }
  
    /**
     * @param {Object} state - the status to be put in success state
     * @param {Object,array} - data to update with
     * @returns {object} updated state
     */
    static _mutationFail(state, data) {
      state.data = null;
      state.status.loading = false;
      state.status.success = false;
      state.status.fail = true;
      state.status.error = data;
      return state;
    }
  }