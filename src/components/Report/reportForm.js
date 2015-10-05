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
  Image,
  Text,
  ScrollView,
  ListView,
  TouchableHighlight,
  Component,
  Navigator,
} = React;

var NavigationBar = require('../../components/Navigation/NavigationBar');
var PhotoGallery = require('../../components/PhotoGallery/photoGallery');
var IconIonic = require('react-native-vector-icons/Ionicons');
var Accordion = require('react-native-collapsible/Accordion');
var DataSource = require('./reportDataSource');

class ReportForm extends Component {

  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
    this.onSectionChanged = this.onSectionChanged.bind(this);
    this.state = {
      selectingSectionKey: null,
      selectingRow: null,
    };
  } 

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          nextButton={()=>this.renderNextButton()}
          onBack={()=>this.props.closeModal()}
          title='รายงาน'/>

        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentInsets={{bottom: 50}}
          style={styles.scrollView}>
          <Accordion
            sections={DataSource}
            renderHeader={(section,key)=>this.renderHeader(section, key)}
            renderContent={this.renderContent}
            onChange={(activeSection)=>this.onSectionChanged(activeSection)}
          />
        </ScrollView>
      </View>
    );
  }

  renderNextButton() {
    return (
      <TouchableHighlight 
        style={styles.nextButton}
        underlayColor='transparent'
        onPress={()=>this.onNext()}>
        <IconIonic name="ios-arrow-thin-right" style={styles.nextButtonIcon}/>
      </TouchableHighlight>
    );
  }

  renderHeader(section, key) {
    var iconArrow = this.state.selectingSectionKey === key ? "arrow-up-b" : "arrow-down-b";
    return (
      <View style={[styles.header, {backgroundColor: section.color}]}>
        <Image
          resizeMode='contain'
          style={styles.headerIcon}
          source={require('image!animal-cow')} />
        
        <Text style={styles.headerText}>{section.title}</Text>
        <IconIonic name={iconArrow} style={styles.arrowIcon}/>
      </View>
    );
  }

  renderContent(section) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.content}>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(section.datasource)}
          renderRow={(rowData)=>this.renderRow(rowData)} />
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#999'
        onPress={()=>this.onPressRow(rowData)}>
        <View style={styles.row}>
          <IconIonic name="ios-body-outline" style={styles.rowIcon}/>
          <Text style={styles.rowTitle}>{rowData.title}</Text>
          { this.state.selectingRow && rowData && rowData === this.state.selectingRow
            ? <IconIonic name="ios-checkmark-empty" style={styles.rowIcon}/>
            : null
          }
        </View>
      </TouchableHighlight>
    );
  }

  onSectionChanged(activeSection) {
    console.log(activeSection);
    this.setState({
      selectingSectionKey: activeSection,
    });
  }

  onPressRow(rowData) {
    this.setState({
      selectingRow: rowData,
    });
  }

  onNext() {
    // if (this.state.selectingRow) {
      this.openPhotoGallery(); 
    // } else {
      // console.warn('no selectionRow');
    // }
  }

  openPhotoGallery() {
    this.props.navigator.push({
      component: PhotoGallery,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight
    })
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: contentHeight / 3,
  },

  headerText: {
    fontSize: 18,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#000',
  }, 

  headerIcon: {
    margin: 10,
    flex: 1,
    width: width * 0.6,
  },

  arrowIcon: {
    fontSize: 20,
    alignSelf: 'flex-end',
    color: '#000',
  },

  scrollView: {
    height: contentHeight,
  },

  row: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  rowTitle: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 20,
    fontSize: 20,
    color: '#fff',
  },

  rowIcon: {
    fontSize: 40,
    color: '#fff',
  },

  nextButton: {
    color: 'red',
  },

  nextButtonIcon: {
    color: '#ff0',
    marginRight: 10,
    fontSize: 36,
  },
});

module.exports = ReportForm;
