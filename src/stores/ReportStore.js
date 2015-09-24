var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var config = require('../../config.js');
var assign = require('object-assign');
var _ = require('underscore');
var UserDefaults = require('react-native-userdefaults-ios');

var CHANGE_EVENT = 'change';


var _report = {};

var ReportStore = assign({}, EventEmitter.prototype, {
  get: function(id, callback) {
     fetch(config.development.report_url + id)
      .then(response => response.json())
      .then(json => { 
        callback(json);
      })
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case 'REPORT_MODAL':
      UserDefaults.setObjectForKey(action.id, 'REPORT_MODAL')
        .then(result=>{
          console.log('report id' + action.id);
          ReportStore.get(action.id, (report)=> {
            ReportStore.emitChange();
          });
        });
      break;
    default: break;
  }
  return true;
})

module.exports = ReportStore;