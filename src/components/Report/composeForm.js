/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  Navigator,
} = React;

var ImageAsset = require('../PhotoGallery/imageAsset');
var SurveyForm = require('../Report/surveyForm');

var ComposeForm = React.createClass({

  getInitialState() {
    return {
      text: '',
    };
  },

  render: function() {
    return (
      <View style={styles.container}>

        <Text>Compose a report</Text>
        <TouchableHighlight
          style={styles.nextButton}
          onPress={this.onNext}>
          <Text>Next…</Text>
        </TouchableHighlight>

        <ScrollView horizontal={false}
          contentContainerStyle={styles.formContainer}
          style={styles.scrollView}>
          <ScrollView 
            contentContainerStyle={styles.contentContainer}
            style={styles.imagePicker}>
            <ImageAsset asset='assetRef:://a' onSelectAsset={this.onSelectAsset} />
            <ImageAsset asset='assetRef:://b' onSelectAsset={this.onSelectAsset} />
          </ScrollView>
          <Text>Location Name</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline={true}
            placeholder='Say something…'
          />
        </ScrollView>
      </View>
    );
  },

  onSelectAsset: function() {

  },

  onNext: function() {
    this.props.navigator.push({
      component: SurveyForm,
    });
  },

});


var styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingTop: 20,
    backgroundColor: '#eee',
  },

  scrollView: {
    flex: 1,
    height: height,
  },

  formContainer: {
    alignItems: 'stretch',
  },

  contentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  imageAsset: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#999',
  },

  nextButton: {
    width: 100,
    height: 44,
    backgroundColor: '#888',
  },
});


module.exports = ComposeForm;
