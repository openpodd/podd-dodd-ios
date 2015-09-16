/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Component,
} = React;

class ReportFilterBox extends Component {
  render() {
    return (
      <View style={styles.filterBox}>
        <TouchableHighlight>
          <Text>Filter by ...</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
	filterBox: {
    height: 64,
    backgroundColor: '#eee',
  },
});


module.exports = ReportFilterBox;
