var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var ReportConstants = require('../components/Report/reportConstants');

var config = require('../../config.js');
var assign = require('object-assign');
var _ = require('underscore');
var CHANGE_EVENT = 'change';

var _reports = {};

var ReportCollectionStore = assign({}, EventEmitter.prototype, {

  findAll: function(callback) {
    var allReports = [];
    _.each(_reports, function(report) {
      allReports.push(_reports[report.id]);
    });
    return allReports;
  },

  find: function(id) {
    return _reports[id];
  },

  findComment: function(id, callback) {
    fetch(config.development.comment_url)
      .then(response => response.json())
      .then(json=>{callback(json)})
      .catch(error =>  console.log('error ' + error));
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

function _add(json) {
  _.each(json, (report) => {
    _reports[report.id] = report;
  });
}

function _update(reportId, properties) {
  
  var report = _reports[reportId];
  if (report) {
    var isLiked = properties[ReportConstants.REPORT_ACTION.IS_LIKED];
    var isEncounter = properties[ReportConstants.REPORT_ACTION.IS_ENCOUNTERED];
    var comment = properties[ReportConstants.REPORT_ACTION.COMMENT];

    if (isLiked) {
      report.like_count = (report.like_count || 0) + 1;
    }

    if (isEncounter) {
      report.encounter_count = (report.encounter_count || 0) + 1;
    }

    if (comment) {
      report.comment_count = (report.comment_count || 0) + 1;
    }
  } else {
    console.warn('Cannot find report id ' + id);
  }
}

ReportCollectionStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.actionType) {
    case AppConstants.COMMENT_REPORT:
      var reportId = payload.id;
      var properties = payload.properties;
      _update(reportId, properties);
      ReportCollectionStore.emitChange();
      break;

    case AppConstants.RECEIVE_RAW_REPORTS:
      _add(payload.rawReports);
      ReportCollectionStore.emitChange();
      break;
    default: break;
  }
})

module.exports = ReportCollectionStore;
