var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  addComment: function(id, form) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.COMMENT_REPORT,
      id: id,
      properties: form,
    }); 
  },

  viewReportModal: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REPORT_MODAL,
      id: id
    });
  },
}

module.exports = AppActions
