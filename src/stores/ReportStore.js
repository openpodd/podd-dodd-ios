var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var ReportConstants = require('../components/Report/reportConstants');
var ReportCollectionStore = require('./ReportCollectionStore');

var config = require('../../config.js');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _report = {};
var _shouldShowReportModal = false;

var ReportStore = assign({}, EventEmitter.prototype, {
  get: function(id, callback) {
     fetch(config.development.report_url + id)
      .then(response => response.json())
      .then(json => { 
        _report = json;
        callback(json);
      })
      .catch(error =>  console.log('error ' + error));
  },

  getCurrent: function() {
    return _report;
  },

  shouldShowReportModal: function() {
    return _shouldShowReportModal;
  },

  /**
   * Prototype
   */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

ReportStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.actionType) {
    case AppConstants.COMMENT_REPORT:
      var reportId = payload.id;
      var properties = payload.properties;
      AppDispatcher.waitFor([ReportCollectionStore.dispatchToken]);
      ReportStore.emitChange();
      break;

    case AppConstants.REPORT_MODAL:
      var reportId = payload.id;
      var report = ReportCollectionStore.find(reportId);
      if (report) {
        _report = report;
        _shouldShowReportModal = true;
        ReportStore.emitChange();
      }
      break;
    case AppConstants.DISMISS_REPORT_MODAL:
      _shouldShowReportModal = false;
      ReportStore.emitChange();
      break;
    default: break;
  }
})

module.exports = ReportStore;