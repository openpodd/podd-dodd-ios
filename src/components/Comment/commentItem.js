'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
} = React;

var Moment = require('moment');

class CommentItem extends Component {
  
  render() {
    return (
      <TouchableHighlight
        style={styles.commentItem}
        onPress={this.props.onSelectComment}
        underlayColor='#eee'>
        <View style={styles.commentBackground}>
          <Text style={styles.bold}>{this.props.rowData.created_by.display_name}</Text>
          <Text style={styles.text}>{this.props.rowData.comment}</Text>
          <Text style={styles.text}>{Moment(this.props.rowData.created).fromNow()}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  commentItem: {
    flex: 1,
    marginBottom: 2,
  },

  commentBackground: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  bold: {
    fontWeight: '700',
    flex: 1,
    marginBottom: 5,
  },

  text: {
    fontWeight: '100',
    flex: 1,
  },
});

module.exports = CommentItem;