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

var ReportCollectionStore = require('../../src/stores/ReportCollectionStore');

class FeedContainerView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false,
      showSupportForm: false,
      selectingRowData: null,
    };
  }

  componentWillMount() {
    this.executeQuery()
    this.closeSupportModalForm = this.closeSupportModalForm.bind(this);
    this.presentCommentView = this.presentCommentView.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    ReportCollectionStore.addChangeListener(this.executeQuery);
  }

  componentWillUnmount() {
    ReportCollectionStore.removeChangeListener(this.executeQuery);
    console.log('unmount feed');
  }

  render() {
    return (
      <View style={styles.container}>
        <ReportFilterBox/>
        <ReportButton navigator={this.props.navigator}/>
        <View style={styles.list}>
          { this.state.loaded ? 
          this.renderListView() :  
          this.renderLoadingView()}
        </View> 

        { this.state.showSupportForm ? 
          <SupportForm 
            rowData={this.state.selectingRowData}
            onDismiss={this.closeSupportModalForm}
            onSubmit={this.closeSupportModalForm}/> 
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
    var _this = this;
    ReportCollectionStore.findAll(function(items){
      console.log('feed query via EventEmitter ' + items['373'].like_count);
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(items),
        loaded: true,
      });
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

module.exports = FeedContainerView;
