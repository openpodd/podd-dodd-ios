'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  ScrollView,
} = React;

var FeedItem = require('../components/Feed/feedItem');
var CommentItem = require('../components/Comment/commentItem');

class CommentView extends Component {

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <CommentItem rowData='Comment 1'/>
        <CommentItem rowData='Comment 2'/>
        <CommentItem rowData='Comment 3'/>
        <CommentItem rowData='Comment 4'/>
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({

  scrollView: {
    flex: 1,
    marginTop: 64,
    marginBottom: 50,
    backgroundColor: '#fff',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

module.exports = CommentView;
