import React, {Component} from 'react';
import { Platform,StyleSheet, Text, View, TextInput, Button, TouchableHighlight,
    Alert, Modal, PermissionsAndroid, TouchableOpacity, ScrollView, Image } from 'react-native';
import Contacts from 'react-native-contacts';
import { HeaderBackButton } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";

export default class RechargeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerLeft: (
            <HeaderBackButton
              title='Home'
              backTitleVisible={true}
              onPress={() => navigation.goBack()}
            />
          )
        };
      }
    state = {
        textInput: '',
        showModal: false,
        contacts: [],
        photos: [],
        galleryLoaded: false
    };
    async _requestContactPermissionAndroid() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.'
                }
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                console.log("permission granted")
            } else {
                console.log("permission not granted")
            }
        } catch(err){
            console.warn(err);
        }
    }

    async componentDidMount() {
        if(Platform.OS === 'android')
            await this._requestContactPermissionAndroid()
    }
    updateTextInput = (input) => {
        this.setState({ textInput: input });
    }
    handleRecharge = () => {
        console.log(this.state.textInput);
        Alert.alert(this.state.textInput);
        this.setState({ textInput: '' });
    }
    loadContacts = () => {
        Contacts.getAll((err, contacts) => {
            if (err) {
                Alert.alert('not able to load contacts');
                throw err;
            }
            if (contacts && contacts.length) {
                this.setState({ contacts });
            } else {
                Alert.alert('no record found');
            }
            // update the first record
            // let someRecord = contacts[0]
            // someRecord.emailAddresses.push({
            //   label: "junk",
            //   email: "mrniet+junkmail@test.com",
            // })
            // Contacts.updateContact(someRecord, (err) => {
            //   if (err) throw err;
            //   // record updated
            // })
        })
    }
    populateTextInput(contact) {
        if (contact) {
            const formattedContactNumber = contact.phoneNumbers[0].number.replace(/[^0-9]/g, '')
            this.updateTextInput(formattedContactNumber);
        }
        this.setState({ contacts: [] });
    }
    renderContactsForm() {
        return (
            <View>
                <View>
                    <TextInput
                        style={styles.contactNumberTextInput}
                        value={this.state.textInput}
                        placeholder="Phone number"
                        onChangeText={this.updateTextInput}
                    />
                    <TouchableHighlight style={styles.loadContact}
                        onPress={this.loadContacts}
                    >
                        <Text>Load contacts</Text>
                    </TouchableHighlight>
                </View>
                <Button
                    onPress={this.handleRecharge}
                    title="Submit"
                />
            </View>
        );
    }
    renderContactsModal() {
        if(!this.state.contacts || !this.state.contacts.length) {
            return null;
        }
        return (
            <Modal
                visible={true}
            >
                <View style={{ margin: 20, marginTop: 100 }}>
                    <Text>Please select the contact you want to rechange..</Text>
                    {this.state.contacts.map((item, index) => {
                        return (
                            <TouchableHighlight style={styles.contactRow} onPress={() => this.populateTextInput(item)} key={item.recordID}>
                                <Text>{item.givenName}, {item.middleName}, {item.phoneNumbers[0].number}</Text>
                            </TouchableHighlight>
                        );
                    })}
                    <Button
                        onPress={() => this.populateTextInput(false)}
                        title="Cancel"
                    >
                    </Button>
                </View>
            </Modal>
        );
    }
    takePicture = () => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          console.log(this.camera.current);
          this.camera.takePictureAsync()
            .then(data => {
                console.log(data);
                CameraRoll.saveToCameraRoll(data.uri)
                    .then(() => Alert.alert('Success', 'Photo added to camera roll!'))
                    .catch(err => Alert.alert('err:', JSON.stringify(err)));
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    _loadGalleryImages = () => {
        if (this.state.galleryLoaded) {
            this.setState({
                photos: [], galleryLoaded: false
            })
            return;
        }
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(r => {
            this.setState({ photos: r.edges, galleryLoaded: true });
        })
        .catch((err) => {
            //Error Loading Images
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Recharge Screen! Please enter your phone number to recharge..
                </Text>
                {this.renderContactsForm()}
                {this.renderContactsModal()}

                <View className="camera-section" style={styles.camContainer}>
                    <Text>Welcome to React Native!</Text>
                    <Text>To get started, edit App.js</Text>
                    {/* <Text>{JSON.stringify(RNCamera.Constants.aspect)}</Text> */}
                    
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    />
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}> SNAP </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Button title={this.state.galleryLoaded ? 'Unload gallery' : 'Load gallery'} onPress={this._loadGalleryImages} />
                        <ScrollView>
                        {this.state.photos.map((p, i) => {
                        return (
                            <Image
                            key={i}
                            style={{
                                width: 300,
                                height: 100,
                            }}
                            source={{ uri: p.node.image.uri }}
                            />
                        );
                        })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

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
    },
    contactRow: {
        padding: 10,
        borderBottomWidth: 1
    },
    contactNumberTextInput: {
        padding: 10,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: '#ccc',
        width: 200
    },
    loadContact: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    camContainer: {
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: 'black',
        // width: 100
    },
    preview: {
        // flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});


// birthday: (...)
// company: (...)
// emailAddresses: (...)
// familyName: (...)
// givenName: (...)
// hasThumbnail: (...)
// jobTitle: (...)
// middleName: (...)
// note: (...)
// phoneNumbers: (...)
// postalAddresses: (...)
// recordID: (...)
// thumbnailPath: (...)
// urlAddresses: (...)