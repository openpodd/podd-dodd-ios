/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

var SurveyForm = React.createClass({

  getInitialState: function() {
    return ({
      showConfirmation: false,
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Survey Form</Text>
        </View>

        <View style={styles.interactiveForm}>
          <Text>Interactive Form</Text>
        </View> 

        <TouchableHighlight
          onPress={this.onSurveyEnd}
          style={styles.submit}>
          <Text>Submit</Text>
        </TouchableHighlight>

        { this.state.showConfirmation ? 
          <ConfirmationForm/> :
          null }
      </View>
    );
  },

  onSurveyEnd: function() {
    this.setState({
      showConfirmation: true,
    })
  },

});

var ConfirmationForm = React.createClass({

  render: function() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalUnderlay}/>
        <View style={styles.modal}>
          <Text>Confirm?</Text>

          <TouchableHighlight onPress={this.onConfirm}>
            <Text>Yes</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.onCancel}>
            <Text>No</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  onConfirm: function() {
    this.props.onConfirm ? this.props.onConfirm() : null;
  },

  onCancel: function() {
    this.props.onCancel ? this.props.onCancel() : null;
  },
});

module.exports = ConfirmationForm;


var styles = StyleSheet.create({
  container: {
    height: height,
    paddingTop: 20,
    paddingBottom: 50,
  },

  header: {
    backgroundColor: '#aaa',
    flex: 1,
  },

  interactiveForm: {
    flex: 4,
    backgroundColor: '#eee',
  },

  submit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#aaa',
  },

  modalContainer: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
  },

  modalUnderlay: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    opacity: 0.2,
    backgroundColor: '#000'
  },

  modal: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    bottom: 100,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 4,
    overflow: 'hidden'
  },
});


module.exports = SurveyForm;
