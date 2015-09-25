'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Component,
} = React;

class ProfileView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: '#eee',
  }
});


module.exports = ProfileView;
