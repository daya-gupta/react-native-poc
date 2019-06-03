import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'; 
import Carousel from 'react-native-snap-carousel';

export default class CarouselComponent extends React.Component {
    state = {
        entries: [{
            title: 'first',
            imageUrl: 'https://offers.freecharge.in/RAPI/721x284.png'
        },{
            title: 'second',
            imageUrl: 'https://offers.freecharge.in/Medplus/721x284.png'
        },{
            title: 'third',
            imageUrl: 'https://offers.freecharge.in/Netmeds/NetmedsCarousel-721x284.jpg'
        },{
            title: '4',
            imageUrl: 'https://offers.freecharge.in/HPN/721x284.png'
        },{
            title: '5',
            imageUrl: 'https://offers.freecharge.in/UTSS/UTS_721X284.png'
        },{
            title: '6',
            imageUrl: 'https://offers.freecharge.in/JU/721x284.jpg'
        },{
            title: '7',
            imageUrl: 'https://offers.freecharge.in/mobilelegendsbang/MobileLegends_ADAPTS_Carousel-721x284.png'
        }]
    };
    
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
                <Image
                    source={{uri: item.imageUrl}}
                    style={{width: 400, height: 400}}
                />
            </View>
        );
    }
 
    render() {
        return (
            <View style={styles.carouselContainer}>
                <Text>This is carousel section..</Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={300}
                    itemWidth={290}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carouselContainer: {
        borderColor: '#ccc',
        borderWidth: 2,
        borderStyle: 'solid'
    },
    slide: {
        borderColor: '#aaa',
        borderWidth: 4,
        borderStyle: 'dotted'
    },
    title: {

    } 
})
