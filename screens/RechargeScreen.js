import React, {Component} from 'react';
import { Platform,StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, Modal,PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import { HeaderBackButton } from 'react-navigation';

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
    state = { textInput: '', showModal: false, contacts: [] };
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
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Recharge Screen! Please enter your phone number to recharge..
                </Text>
                {this.renderContactsForm()}
                {this.renderContactsModal()}
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
    }
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