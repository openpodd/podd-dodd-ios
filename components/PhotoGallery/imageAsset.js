/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableHighlight,
} = React;

class ImageAsset extends Component {
  
  render() {
    return (
      <TouchableHighlight 
        style={styles.imageAsset}
        onPress={()=>this.props.onSelectAsset(this.props.asset)}>
        <View style={styles.imageContainer}>
          <Text>{this.props.asset}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({

  imageAsset: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#999',
  },
});

module.exports = ImageAsset;