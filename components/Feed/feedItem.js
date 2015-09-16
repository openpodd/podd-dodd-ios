'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  ListView,
  Navigator,
  NavigationBar,
} = React;

var Moment = require('moment');
var CommentView = require('../../views/comment');

class FeedItem extends Component {
  
  constructor(props) {
    super(props);
    this.didSelectRow = this.didSelectRow.bind(this);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.didSelectRow}
        underlayColor={styles.rowPress.backgroundColor}>
        <View style={styles.rowContainer}>
          <View style={styles.rowHeader}>
            <Text style={styles.bold}>{this.props.rowData.created_by.display_name}</Text>
            <View style={styles.media}></View>
          </View>
          <View style={styles.rowDescription}>
            <Text>{this.props.rowData.content}</Text>
            <Text>{Moment(this.props.rowData.modified).fromNow()}</Text>
          </View>
          <View style={styles.rowSeparator}/>
        </View>
      </TouchableHighlight>
    );
  }

  didSelectRow() {
    this.props.navigator.push({
      name: 'Comment View',
      title: 'Comments',
      component: CommentView,
    });
  }
}

var styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },

  rowDescription: {
    flex: 1,
    margin: 10,
  },

  rowSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#888',
  },

  rowPress: {
    backgroundColor: '##fff',
  },

  bold: {
    fontWeight: '700',
  },

  media: {
    backgroundColor: '#ccc',
    flex: 1,
    marginHorizontal: 10,
    height: 200,
  },
});

module.exports = FeedItem;