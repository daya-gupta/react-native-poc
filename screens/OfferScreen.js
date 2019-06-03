import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


class OfferScreen extends React.Component {
    static navigationOptions = {
      title: 'Offers',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>Welcome to Offer Screen!</Text>
          </View>
      );
    }
  }

  export default OfferScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });