var config = require('../../config.js');
var ReportServerActionCreators = require('../actions/ReportServerActionCreators');
var ReportFilterServerActionCreators = require('../actions/ReportFilterServerActionCreators');

module.exports = {

  getAllReports: function() {
    fetch(config.development.feed_url)
      .then(response => response.json())
      .then(json=>{
        ReportServerActionCreators.receiveAll(json);
      })
      .catch(error =>  console.log('error ' + error));
  },

  getAllFilters: function() {
    fetch(config.development.filter_url)
      .then(response => response.json())
      .then(json=>{
        ReportFilterServerActionCreators.receiveAllFilters(json);
      })
      .catch(error =>  console.log('error ' + error));
  },
}