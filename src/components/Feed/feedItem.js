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
var FeedPhotoGallery = require('./feedPhotoGallery');
class FeedItem extends Component {

  render() {
    return (
      <View style={styles.row}>
        <View style={styles.media}>
          <FeedPhotoGallery report={this.props.rowData}/>
        </View>
        <View style={styles.header}>
          <Text style={styles.bold}>{this.props.rowData.created_by.display_name}</Text>
          <Text style={styles.text}>{Moment(this.props.rowData.modified).fromNow()}</Text>
          <Text style={styles.text}>{this.props.rowData.content}</Text>
        </View>

        <View style={styles.supportToolbar}>
          <View style={styles.supportCount}>
            <Text>{this.props.rowData.encounter_count}</Text>
            <Text>ประสบด้วย</Text>
            <Text>{this.props.rowData.like_count || '0' }</Text>
            <Text>ให้กำลังใจ</Text>
          </View>

          <TouchableHighlight
            style={styles.supportButton}
            onPress={this.onPressSupport.bind(this)}>
            <Text style={styles.supportButtonTitle}>สนับสนุน</Text>
          </TouchableHighlight>
        </View>

        { this.props.modal ? 
          <View style={styles.commentToolbar}>
            <TouchableHighlight style={styles.commentCount}>
              <Text>{this.props.rowData.comment_count || 0} ความคิดเห็น</Text>
            </TouchableHighlight>
            <View style={styles.commentAction}>
              <TouchableHighlight style={styles.action}>
                <Text>Comment</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.action}>
                <Text>Share</Text>
              </TouchableHighlight>
            </View>
          </View>
          : null }
        <View style={styles.rowSeparator}/>
     </View>
    );
  }

  onPressRow() {
    if (this.props.onPressRow) {
      this.props.onPressRow(this.props.rowData);
    }
  }

  onPressSupport(rowData) {
    if (this.props.onPressSupport) {
      this.props.onPressSupport(this.props.rowData);
    }
  }
}

var styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  media: {
    marginVertical: 10,
  },

  header: {
    alignItems: 'stretch',
  },

  rowSeparator: {
    height: 1,
    backgroundColor: '#888',
    opacity: 0.5,
  },

  bold: {
    fontWeight: '700',
  },

  text: {
    fontWeight: '100',
  },

  supportToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  supportCount: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },

  supportButton: {
    flex: 1,
    backgroundColor: '#999',
    height: 44,
    alignItems: 'center',
  },

  supportButtonTitle: {
    fontWeight: '700',
  },

  commentToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentCount: {
    flexDirection: 'row',
    flex: 1,
  },

  commentAction: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },

  action: {
    marginLeft: 20,
  },
});

module.exports = FeedItem;