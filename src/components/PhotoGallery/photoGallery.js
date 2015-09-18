'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Component,
  Navigator,
} = React;
 
var MapView = require('../Map/map');
var ComposeForm = require('../Report/composeForm');
var ImageAsset = require('../PhotoGallery/imageAsset');

var PhotoGallery = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Photo Gallery</Text>

        <TouchableHighlight
          style={styles.nextButton}
          onPress={this.onNext}>
          <Text>Next…</Text>
        </TouchableHighlight>

        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          style={styles.imagePicker}>
          <ImageAsset asset='assetRef:://a' onSelectAsset={this.onSelectAsset} />
          <ImageAsset asset='assetRef:://b' onSelectAsset={this.onSelectAsset} />
          <ImageAsset asset='assetRef:://c' onSelectAsset={this.onSelectAsset} />
          <ImageAsset asset='assetRef:://a' onSelectAsset={this.onSelectAsset} />
          <ImageAsset asset='assetRef:://b' onSelectAsset={this.onSelectAsset} />
          <ImageAsset asset='assetRef:://c' onSelectAsset={this.onSelectAsset} />
        </ScrollView>
        <MapView/>
      </View>
    );
  },

  onSelectAsset: function(asset) {
    console.log('on select asset ' + asset);
  },

  onNext: function() {
    this.props.navigator.push({
      component: ComposeForm,
    });
  },

});


var styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'stretch',
    paddingTop: 20,
    backgroundColor: '#eee',
  },

  nextButton: {
    width: 100,
    height: 44,
    backgroundColor: '#888',
  },

  imagePicker: {
    height: 200,
    marginTop: 44,
    backgroundColor: '#ddd',
  },

  contentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  
});

module.exports = PhotoGallery;
