'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Component,
} = React;

class MapView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Show current locaiton</Text>
      </View>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  }
});


module.exports = MapView;
