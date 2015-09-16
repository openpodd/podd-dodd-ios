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

class FeedContainerView extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => ri !== r2}); 
    this.state = {
      dataSource: dataSource,
      loaded: false,
      fetchURL: fetchURL,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.executeQuery()
  }

  render() {
    return (
      <View style={styles.navigationContentContainer}>
        <ReportFilterBox/>
        { this.state.loaded ? 
          this.renderListView() :  
          this.renderLoadingView()}
        <ReportButton/>
      </View>
    );
  }
  
  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=>this.renderRow(rowData)} />
    );
  }

  renderRow(rowData) {
    return (
      <FeedItem rowData={rowData} navigator={this.props.navigator} />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading…</Text>
      </View>
    );
  }

  executeQuery() {
    fetch(this.state.fetchURL)
      .then(response => response.json())
      .then(json => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.results),
            loaded: true,
          });
        })
      .catch(error =>  console.log('error ' + error));
  }
}

var styles = StyleSheet.create({
  navigationContentContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#aaa',
    marginTop: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});

var fetchURL = 'http://www.thaispendingwatch.com:8088/api/reports/';
module.exports = FeedContainerView;
