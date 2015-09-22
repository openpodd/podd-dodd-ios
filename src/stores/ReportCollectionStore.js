var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var config = require('../../config.js');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _reports = {};

var ReportCollectionStore = assign({}, EventEmitter.prototype, {
  /**
   * DataStore
   */
  findAll: function(callback) {
    if (_reports.length > 0) {
      callback(_reports);
      return;
    }
    fetch(config.development.feed_url)
      .then(response => response.json())
      .then(json => {
        // Store report items in dictionary
        // [1: { ...report...},
        //  ,2: { ...report...}
        //  ,3: { ...report...}]
        var items = {};
        _.each(json, (item) => {
          items[item.id] = item;
        })
        return items;
      })
      .then(newReports => {
          // Update reports in DataStore
          // [1:{}, 2:{}, 3:{}] + [1:{}, 4:{}] = [1!,2,3,4]
          var reports = _reports;
          _.each(newReports, (report) => {
            reports[report.id] = report;
          })
          return reports;
        })
      .then(itemStore => { 
        // Response allItems in DataStore
        // TODO: Pagiantor
        console.log('reset reports store');
        callback(itemStore)
      })
      .catch(error =>  console.log('error ' + error));
  },

  find: function(id) {
    return _reports[id];
  },

  update: function(reportId, properties) {
    var report = _reports[reportId];
    if (report) {
      // TODO: Send to ReportWorker
      var isLiked = properties[AppConstants.REPORT_ACTION.IS_LIKED];
      var isEncounter = properties[AppConstants.REPORT_ACTION.IS_ENCOUNTERED];
      var comment = properties[AppConstants.REPORT_ACTION.COMMENT];
      if (isLiked) ReportCollectionStore.incrementLikeCount(reportId);
      if (isEncounter) ReportCollectionStore.incrementEncounterCount(reportId);
      if (comment !== null) ReportCollectionStore.addComment(reportId, properties);
    } else {
      // TODO: Send to NetworkRequestQueue
      console.warn('Cannot find report id ' + id);
    }
  },

  findComment: function(id, callback) {
    fetch(config.development.comment_url)
      .then(response => response.json())
      .then(json=>{callback(json)})
      .catch(error =>  console.log('error ' + error));
  },

  incrementLikeCount: function(id) {
    var report = _reports[id];
    report.like_count = (report.like_count || 0) + 1;
    _reports[id] = report;
    console.log(report.id + 'has like_count = ' + report.like_count);
  },

  incrementEncounterCount: function(id) {
    var report = _reports[id];
    report.encounter_count = (report.encounter_count || 0) + 1;
    _reports[id] = report;
  },

  addComment: function(id, properties) {
    var report = _reports[id];
    report.comment_count += 1;
    _reports[id] = report;
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.COMMENT_REPORT:
      var reportId = action.id;
      var properties = action.properties;
      ReportCollectionStore.update(reportId, properties);
      break;
    default: break;
  }
  ReportCollectionStore.emitChange();
  return true;
})

module.exports = ReportCollectionStore;
