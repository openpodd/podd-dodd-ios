'use strict';

var React = require('react-native');
var IconIonic = require('react-native-vector-icons/Ionicons');

var navigationBarHeight = 64;

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Component,
} = React;

class NavigationBar extends Component {

  render() {
    return (
      <View style={styles.navigationBar}>
          <View style={styles.navigationBarTitleView}>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
          </View>

          <View style={styles.navigationBarItems}>
            { this.props.backButton
              ? this.props.backButton()
              : <TouchableHighlight 
                  style={styles.backButton}
                  underlayColor='transparent'
                  onPress={()=>{
                    this.props.onBack && this.props.onBack();
                  }}>
                  <IconIonic name="ios-arrow-thin-left" style={styles.backIcon}/>
                </TouchableHighlight>
            }

            { this.props.nextButton
              ? this.props.nextButton()
              : null
            }
          </View>
        </View>
    );
  }
}


var styles = StyleSheet.create({
  navigationBar: {
    height: navigationBarHeight,
    backgroundColor: '#333',
  },

  navigationBarItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },

  navigationBarTitleView: {
    position: 'absolute',
    justifyContent: 'center',
    top: 20,
    left: 40,
    right: 40,
    bottom: 0,
    backgroundColor: 'transparent',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '100',
    color: '#fff',
    textAlign: 'center',
  },

  backIcon: {
    color: 'white',
    marginLeft: 10,
    fontSize: 36,
  },

  backButtonTitle: {
    color: '#fff',
  },
});


module.exports = NavigationBar;