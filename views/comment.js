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
var SupportForm = require('../components/Report/supportForm');

class CommentView extends Component {

  constructor(props) {
    super(props);
    this.closeSupportModalForm = this.closeSupportModalForm.bind(this);
    this.state = {
      showSupportForm: false,
      selectingRowData: null,
    }; 
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <FeedItem rowData={this.props.rowData} onPressSupport={()=> {
            this.setState({
              showSupportForm: true,
              selectingRowData: this.props.rowData,
            })
          }}/>

          <CommentItem rowData={CommentFixture[0]}/>
          <CommentItem rowData={CommentFixture[1]}/>
          <CommentItem rowData={CommentFixture[2]}/>
          <CommentItem rowData={CommentFixture[3]}/>
        </ScrollView>

        { this.state.showSupportForm ? 
          <SupportForm 
            rowData={this.state.selectingRowData}
            onPressLike={this.closeSupportModalForm} 
            onPressSupport={this.closeSupportModalForm} 
            onPressComment={(rowData)=>{
              this.closeSupportModalForm();
            }}/> 
          : null }
      </View>
    );
  }

  closeSupportModalForm() {
    this.setState({
      showSupportForm: false,
    });
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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

var CommentFixture = require('../fixures/comment');
module.exports = CommentView;

