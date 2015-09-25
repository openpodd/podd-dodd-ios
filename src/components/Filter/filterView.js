'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  ListView,
  Text,
  Component,
} = React;

var FilterStore = require('../../stores/FilterStore');
var FilterItem = require('./filterItem');

class FilterView extends Component {

  constructor(props) {
    super(props);
    this.executeQuery = this.executeQuery.bind(this);
    this.state = {
      dataSource:  new ListView.DataSource({
        rowHasChanged: ((r1, r2) => r1 !== r2),
        sectionHeaderHasChanged: ((s1, s2) => s1 !== s2)
      }),
      availableAddresses: [],
    };
  }

  componentWillMount() {
    FilterStore.addChangeListener(this.executeQuery);
  }

  componentDidMount() {
    this.executeQuery();
  }

  componentWillUnmount() {
    FilterStore.removeChangeListener(this.executeQuery);
  }

  executeQuery() {
    var availableAddresses = FilterStore.findAll();
    var sections = this.state.dataSource.cloneWithRowsAndSections(availableAddresses);
    this.setState({
      dataSource: sections,
    })
  }

  render() {
    return (
      <ListView
        style={this.props.filterList || undefined}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <FilterItem rowData={rowData}/>}
        renderSectionHeader={(sectionData, sectionID) => {
          return (<Text style={{ margin: 10, fontWeight: '900', flex: 1, backgroundColor: '#bbb'}}>{sectionID}</Text>);
        }}/>
    );
  }
};


var styles = StyleSheet.create({
  
});


module.exports = FilterView;
