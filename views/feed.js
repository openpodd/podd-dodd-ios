'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Component,
  Text,
  ListView,
} = React;

var Moment = require('moment');
var FeedItem = require('../components/Feed/feedItem');
var ReportFilterBox = require('../components/Report/reportFilter');
var ReportButton = require('../components/Report/reportButton');
var CommentView = require('../views/comment');
var SupportForm = require('../components/Report/supportForm');

class FeedContainerView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => ri !== r2}),
      loaded: false,
      fetchURL: fetchURL,
      showSupportForm: false,
      selectingRowData: null,
    };
  }

  componentWillMount() {
    this.executeQuery()
    this.closeSupportModalForm = this.closeSupportModalForm.bind(this);
    this.presentCommentView = this.presentCommentView.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ReportFilterBox/>
        <ReportButton/>
        <View style={styles.list}>
          { this.state.loaded ? 
          this.renderListView() :  
          this.renderLoadingView()}
        </View> 

        { this.state.showSupportForm ? 
          <SupportForm 
            rowData={this.state.selectingRowData}
            onPressLike={this.closeSupportModalForm} 
            onPressSupport={this.closeSupportModalForm} 
            onPressComment={(rowData)=>{
              this.closeSupportModalForm();
              var context = this;
              setTimeout(function() {
                context.presentCommentView(rowData)
              }, 500);
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
  
  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={()=>this.presentCommentView(rowData)}>
        <View>
          <FeedItem modal rowData={rowData} onPressSupport={()=> {
            console.log('show support form');
            this.setState({
              showSupportForm: true,
              selectingRowData: rowData,
            })
          }}/>
        </View>
      </TouchableHighlight>
    );
  }

  presentCommentView(rowData) {
    this.props.navigator.push({
      component: CommentView,
      passProps: {rowData: rowData},
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading…</Text>
      </View>
    );
  }

  executeQuery() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(FeedFixtures),
      loaded: true,
    });
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    marginTop: 20,
  },

  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#ccc',
  },

  list: {
    flex: 1,
    backgroundColor: '#999',
  },
});

var fetchURL = 'http://www.thaispendingwatch.com:8088/api/reports/';
var FeedFixtures = require('../fixures/feed');

module.exports = FeedContainerView;
