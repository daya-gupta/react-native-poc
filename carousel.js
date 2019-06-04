import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const paginatonSettings = {
    inactiveDotOpacity: 0.45,
    inactiveDotScale: 0.55
}

export default class CarouselComponent extends React.Component {
    state = {
        currentSlideIndex: 0,
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
        const {height, width} = Dimensions.get('window');
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
                <Image
                    source={{uri: item.imageUrl}}
                    style={{width: width - 20, height: 158}}
                />
            </View>
        );
    }

    onBeforeSnapToItem = (slideIndex) => {
        this.setState({ currentSlideIndex: slideIndex });
    }
 
    render() {
        const {height, width} = Dimensions.get('window');
        return (
            <View style={styles.carouselContainer}>
                <View style={styles.carousel}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        containerCustomStyle={styles.carousel}
                        itemWidth={width - 20}
                        onSnapToItem = {this.onBeforeSnapToItem}
                    />
                </View>
                <View style={styles.pagination}>
                    <Pagination
                        dotsLength={this.state.entries.length}
                        activeDotIndex={this.state.currentSlideIndex}
                        //   dotStyle={styles.sliderPaginationDot}
                        inactiveDotOpacity={paginatonSettings.inactiveDotOpacity}
                        inactiveDotScale={paginatonSettings.inactiveDotScale}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: 50,
        marginBottom: 50,
        // borderColor: '#ccc',
        // borderWidth: 2,
        // borderStyle: 'solid'
    },
    carousel: {
        height: 180
    },
    slide: {
        // borderColor: '#aaa',
        // borderWidth: 4,
        // borderStyle: 'dotted'
    },
    pagination: {
        height: 100,
        marginTop: -15
    },
    title: {

    } 
})
