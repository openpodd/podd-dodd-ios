var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

module.exports = {

  receiveAllFilters: function(rawFilters) {
    AppDispatcher.dispatch({
      actionType: AppConstants.RECEIVE_RAW_FILTERS,
      rawFilters: rawFilters,
    })
  },
};
