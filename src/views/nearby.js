'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
} = React;

var ReportMap = require('../components/ReportMap/reportMap');
var ReportFilterBox = require('../components/Report/reportFilter');
var ReportButton = require('../components/Report/reportButton');

class NearbyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ReportFilterBox/>
        <ReportMap/>
        <ReportButton navigator={this.props.navigator}/>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 20,
    backgroundColor: '#aaa',
  },
});

module.exports = NearbyView;
