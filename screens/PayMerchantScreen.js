import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


class PayMerchantScreen extends React.Component {
    static navigationOptions = {
      title: 'Pay Merchant',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>Welcome to PayMerchant Screen!</Text>
          </View>
      );
    }
  }

  export default PayMerchantScreen;
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