var config = require('../../config.js');
var ReportServerActionCreators = require('../actions/ReportServerActionCreators');

module.exports = {

  getAllReports: function() {
    fetch(config.development.feed_url)
      .then(response => response.json())
      .then(json=>{
        ReportServerActionCreators.receiveAll(json);
      })
      .catch(error =>  console.log('error ' + error));
  },
}