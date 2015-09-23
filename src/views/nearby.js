'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
} = React;

var ReportMap = require('../components/ReportMap/reportMap');
var ReportFilterBox = require('../components/Report/reportFilter');

class NearbyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ReportFilterBox navigator={this.props.navigator}/>
        <ReportMap/>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#aaa',
    height: height,
  },
});

module.exports = NearbyView;
