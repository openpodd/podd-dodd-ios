'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  Image,
} = React;

var FeedPhotoGallery = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={{uri: 'http://thaispendingwatch.s3.amazonaws.com/JPEG_20150122_115551_-578926518.jpg'}} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  photo: {
    height: 200,
  },
});

module.exports = FeedPhotoGallery;