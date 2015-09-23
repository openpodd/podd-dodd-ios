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
          source={{uri: this.representPhoto()}} />
      </View>
    );
  },

  representPhoto: function() {
    var uri = this.props.report.media && this.props.report.media[0].url;
    return uri;
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