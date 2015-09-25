var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

module.exports = {

  receiveAll: function(rawReports) {
    AppDispatcher.dispatch({
      actionType: AppConstants.RECEIVE_RAW_REPORTS,
      rawReports: rawReports,
    })
  },
};
