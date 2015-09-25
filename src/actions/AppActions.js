var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  addComment: function(id, form) {
    AppDispatcher.dispatch({
      actionType: AppConstants.COMMENT_REPORT,
      id: id,
      properties: form,
    });
  },

  viewReportModal: function(id) {
    AppDispatcher.dispatch({
      actionType: AppConstants.REPORT_MODAL,
      id: id
    });
  },

  dismissReportModal: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.DISMISS_REPORT_MODAL,
    });
  }
}

module.exports = AppActions;
