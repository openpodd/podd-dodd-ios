'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Component,
} = React;

class ReportMap extends Component {
  render() {
    return (
      <View style={styles.mapView}>
        <Text>MapView</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  mapView: {
    flex: 2,
    height: 200,
  }
});


module.exports = ReportMap;
