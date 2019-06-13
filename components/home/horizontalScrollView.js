import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

export default class HorizontalScrollView extends React.Component {
    state = {
        data: [
            {
                key: 'a',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'b',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'c',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'd',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'e',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'f',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'g',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'h',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            },
            {
                key: 'i',
                imgUrl: "https://facebook.github.io/react-native/img/favicon.png"
            }
        ]
    }
    _renderItem({ item, index }) {
        return (
            <View style={styles.listItem}>
                <Image
                    source={{uri: item.imgUrl}}
                    style={styles.itemImg}
                />
                <Text style={styles.itemLabel}>{item.key}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.listContainer}>
                <FlatList horizontal={true}
                    data={this.state.data}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    listContainer: {
        height: 160
    },
    listItem:{
        width: (screenWidth/4),
        alignItems: 'center'
    },
    itemImg:{
        width:((screenWidth/4)-10),
        height:100
    },
    itemLabel:{
        
    }
})
