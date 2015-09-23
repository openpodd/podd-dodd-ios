'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var tabBarHeight = 48;
var navigationBarHeight = 64;
var contentHeight = height - navigationBarHeight - tabBarHeight;
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
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}),
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
  }

  render() {
    return (
      <View style={styles.container}>
        <ReportFilterBox/>
        <View style={styles.content}>
          { this.state.loaded
          ? this.renderListView()
          : this.renderLoadingView() }
        </View>
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
      <View style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
          
        { this.state.showSupportForm ? 
          <SupportForm 
            rowData={this.state.selectingRowData}
            onDismiss={this.closeSupportModalForm}
            onSubmit={this.closeSupportModalForm}/> 
          : null }
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (

      <TouchableHighlight 
        onPress={()=>this.presentCommentView(rowData)}
        underlayColor='#eee'>
        <View>
          <FeedItem 
            modal 
            rowData={rowData} 
            onPressSupport={()=> {
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
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(items),
        loaded: true,
      });
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
  },

  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#ccc',
  },

  content: {
    height: contentHeight,
    backgroundColor: '#eee',
  },
});

module.exports = FeedContainerView;
