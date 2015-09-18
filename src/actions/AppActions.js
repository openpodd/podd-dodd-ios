var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  likeReport: function(report){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.LIKE_REPORT,
      item: report
    })
  },

  encounterReport: function(report) {
    AppDispatcher.handleViewAction({
      actionType:AppConstants.ENCOUNTER_REPORT,
      item: report
    });
  },
}

module.exports = AppActions
