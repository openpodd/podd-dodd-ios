var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var ReportConstants = require('../components/Report/reportConstants');
var ReportCollectionStore = require('./ReportCollectionStore');

var config = require('../../config.js');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _availableAddresses = {};
var _shouldShowFilterModal = false;
var _currentFilter = undefined;

var FilterStore = assign({}, EventEmitter.prototype, {

  findAll: function() {
    return _availableAddresses; 
  },

  shouldShowFilterModal: function() {
    return _shouldShowFilterModal;
  },

  getCurrentFilter: function() {
    return _currentFilter;
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

function _add(rawFilters) {
  var addresses = rawFilters.availableAddresses;
  _availableAddresses = addresses; 
}

FilterStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.actionType) {
    case AppConstants.RECEIVE_RAW_FILTERS:
      _add(payload.rawFilters);
      FilterStore.emitChange();
      break;

    case AppConstants.FILTER_MODAL: 
      _shouldShowFilterModal = true;
      FilterStore.emitChange();
      break;

    case AppConstants.DISMISS_FILTER_MODAL:
      _shouldShowFilterModal = false;
      _currentFilter = payload.rowData;
      FilterStore.emitChange();
      break;

    case AppConstants.RESET_FILTER:
      _currentFilter = undefined;
      FilterStore.emitChange();
      break;

    default: break;
  }
})

module.exports = FilterStore;