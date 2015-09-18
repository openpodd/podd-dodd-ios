var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var config = require('../../config.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var reports = [];
var AppStore = assign({}, EventEmitter.prototype, {

  /*
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

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.LIKE_REPORT:
        AppStore.emitChange();
        break;
      case AppConstants.ENCOUNTER_REPORT:
        AppStore.emitChange();
        break;
    }
    return true;
  }),

  /*
   * DataStore
   */
  findAll: function(callback) {
    fetch(config.development.feed_url)
      .then(response => response.json())
      .then(json=>{callback(json)})
      .catch(error =>  console.log('error ' + error));
  },

  findComment: function(id, callback) {
    fetch(config.development.comment_url)
      .then(response => response.json())
      .then(json=>{callback(json)})
      .catch(error =>  console.log('error ' + error));
  },


});


module.exports = AppStore;
