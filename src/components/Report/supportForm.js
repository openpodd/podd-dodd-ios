/* @flow */
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var AppActions = require('../../actions/AppActions');
var ReportConstants = require('./reportConstants');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
} = React;

var IS_LIKED = ReportConstants.REPORT_ACTION.IS_LIKED;
var IS_ENCOUNTERED = ReportConstants.REPORT_ACTION.IS_ENCOUNTERED;
var COMMENT = ReportConstants.REPORT_ACTION.COMMENT;

var SupportForm = React.createClass({

  getInitialState: function() {
    return ({
      IS_LIKED: null,
      IS_ENCOUNTERED: null,
      COMMENT: null,
    });
  },

  render: function() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalUnderlay}/>

        <TouchableHighlight
          style={styles.dismissButton}
          onPress={this.onDismiss}>
          <Text>close</Text>
        </TouchableHighlight>

        <ScrollView style={styles.modal}>
          <Text>Confirm?</Text>

          <TouchableHighlight 
            style={styles.button}
            onPress={this.onPressEncounter}>
            { this.state.IS_ENCOUNTERED
              ? <Text>ประสบด้วย (selected)</Text>
              : <Text>ประสบด้วย</Text>}
          </TouchableHighlight>

          <TouchableHighlight 
            style={styles.button}
            onPress={this.onPressLike}>
            { this.state.IS_LIKED === false || this.state.IS_LIKED === null
              ? <Text>ให้กำลังใจ</Text>
              : <Text>ให้กำลังใจ (selected)</Text>}
          </TouchableHighlight>

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(comment) => this.setState({
              COMMENT: comment,
            })}
            placeholder='แสดงความคิดเห็น'
            multiline={true}
            value={this.state.comment}
          />

          <TouchableHighlight 
            style={styles.submitButton}
            onPress={this.onPressSubmit}>
            <Text>ยืนยัน</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  },

  onPressEncounter: function() {
    this.setState({
      IS_ENCOUNTERED: !this.state.IS_ENCOUNTERED,
    });
  },

  onPressLike: function() {
    this.setState({
      IS_LIKED: !this.state.IS_LIKED,
    });
  },

  onPressSubmit: function() {
    AppActions.addComment(this.props.rowData.id, this.state);
    this.setState(this.getInitialState());
    this.props.onSubmit();
  },

  onDismiss: function() {
    this.props.onDismiss();
  },
});


var styles = StyleSheet.create({
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
    overflow: 'hidden',
    padding: 10,
    alignSelf: 'center',
  },

  button: {
    flex: 1,
    margin: 10,
    backgroundColor: '#aaa',
    alignSelf: 'center',
  },

  commentButton: {
    backgroundColor: '#eee',
    alignItems: 'center',
    height: 44,
  },

  submitButton: {
    backgroundColor: '#777',
    color: '#fff',
    marginVertical: 10,
    height: 44,
  },

  dismissButton: {
    backgroundColor: '#888',
    height: 32,
  },
});


module.exports = SupportForm;
