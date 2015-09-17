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
  ScrollView,
} = React;

var SupportForm = React.createClass({
  render: function() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalUnderlay}/>
        <ScrollView style={styles.modal}>
          <Text>Confirm?</Text>

          <TouchableHighlight 
            style={styles.button}
            onPress={this.onPressSupport}>
            <Text>ประสบด้วย</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={styles.button}
            onPress={this.onPressLike}>
            <Text>ให้กำลังใจ</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={styles.commentButton}
            onPress={this.onPressComment}>
            <Text>แสดงความคิดเห็น</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  },

  onPressSupport: function() {
    this.props.onPressSupport ? this.props.onPressSupport() : null;
  },

  onPressLike: function() {
    this.props.onPressLike ? this.props.onPressLike() : null;
  },

  onPressComment: function() {
    this.props.onPressComment ? this.props.onPressComment(this.props.rowData) : null;
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
});


module.exports = SupportForm;
