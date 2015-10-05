'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var contentHeight = height - 64 - 49;

var {
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  ScrollView,
  Component,
  Navigator,
  CameraRoll,
} = React;
 
var NavigationBar = require('../Navigation/NavigationBar');
var ComposeForm = require('../Report/composeForm');
var ImageAsset = require('../PhotoGallery/imageAsset');
var IconIonic = require('react-native-vector-icons/Ionicons');

class PhotoGallery extends Component {

  constructor(props) {
    super(props);
    this.renderAsset = this.renderAsset.bind(this);
    this.state = {
      photos: null,
    } 
  }

  componentWillMount() {
    var _ = this;
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
    }, function(assets) {
      _.setState({
        photos: assets,
      })
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    var items;
    var _ = this;
    if (this.state.photos && this.state.photos.edges) {
      items = this.state.photos.edges.map(function(asset) {
        return _.renderAsset(asset);
      });
    }
    return (
      <View style={styles.container}>
        <NavigationBar 
          onBack={()=>this.props.navigator.pop()}
          nextButton={()=>this.renderNextButton()}
          title='รูปภาพ'/>

        <ScrollView
          removeClippedSubviews={true}
          automaticallyAdjustContentInsets={false}
          style={styles.collectionView}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.cell}>
            <TouchableHighlight
              style={styles.imagePicker}
              onPress={()=>{}}>
              <Image
                resizeMode={Image.resizeMode.cover}
                style={styles.image}
                source={require('image!animal-cow')} />
            </TouchableHighlight>
          </View>

          {items}

        </ScrollView>
      </View>
    );
  }

  renderAsset(asset) {
    return (
      <View style={styles.cell}>
        <Image
          resizeMode={Image.resizeMode.cover}
          style={styles.image}
          source={{uri: asset.node.image.uri, assetThumbnail: true}} />
      </View>
    )
  }

  renderNextButton() {
    return (
      <TouchableHighlight 
        style={styles.nextButton}
        underlayColor='transparent'
        onPress={()=>this.onNext()}>
        <View style={styles.nextButtonWrapper}>
          <Text style={styles.nextButtonTitle}>Next</Text>
          <IconIonic name="ios-arrow-thin-right" style={styles.nextButtonIcon}/>
        </View>
      </TouchableHighlight>
    );
  }

  onSelectAsset(asset) {
    console.log('on select asset ' + asset);
  }

  onNext() {
    this.props.navigator.push({
      component: ComposeForm,
    });
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nextButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nextButton: {
    color: 'red',
  },

  nextButtonTitle: {
    color: '#ff0',
    marginRight: 10,
    fontSize: 20,
  },

  nextButtonIcon: {
    color: '#ff0',
    marginRight: 10,
    fontSize: 36,
  },  

  collectionView: {
    backgroundColor: 'green',
    flex: 1,
  },

  contentContainer: {
    backgroundColor: 'blue',
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  cell: {
    width: width / 4,
    height: 80,
    backgroundColor: '#f00',
    padding: 1,
    borderColor: '#444',
    borderWidth: 1,
  },

  image: {
    width: 100,
    height: 80,
    backgroundColor: 'yellow',
  },

});

module.exports = PhotoGallery;
