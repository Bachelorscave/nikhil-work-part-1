import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import Color from '../Utils/Colors';
import {FontFamily, FontSize} from '../../GlobalStyles';
import {ScrollView} from 'react-native-gesture-handler';

import Select from '../components/main/SelectPh';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');

function Property(props) {
  const [Address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleSelectGender = gender => {
    setSelectedGender(gender);
    setShowModal(false);
  };

  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        {/* <Select style={{marginTop:20}}/> */}

        <View
          style={{
            width: width,
            flexDirection: 'row',

            alignItems: 'center',
            // justifyContent: 'space-between',
            height: width * 0.15,
            paddingHorizontal: width * 0.05,
            // marginTop: 5,
            // width: '100%',
            // height: height * 0.06,
            // paddingBottom: 15,

            borderColor: Color.GREY,
            borderBottomWidth: 1.5,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={24} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginLeft: width * 0.1}}>
            <View
              style={
                {
                  // height: height * 0.05,
                  // width: '30%',
                  // marginTop: 5,
                  // marginLeft: width * 0.1,
                }
              }>
              <MaterialCommunityIcons
                name="pencil-circle"
                color={Color.colorRoyalblue_100}
                size={24}
              />
            </View>
            <View
              style={{
                marginLeft: width * 0.025,
                // height: height * 0.04,
                // width: '60%',
                // marginTop: height * 0.025,
              }}>
              <Text
                style={{
                  // fontWeight: '500',
                  // fontSize: 20,
                  // // marginLeft: -50,
                  color: Color.BLACK,
                  fontFamily: FontFamily.interSemiBold,
                  fontSize: responsiveFontSize(2.1),
                }}>
                Select Properties
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={{flex: 1, width: '95%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.GREY,
              borderRadius: 10,
              marginTop: width * 0.05,
              // marginTop: 50,
            }}>
            <View
              style={{
                width: '90%',
                height: 40,
                borderLeftColor: Color.colorRoyalblue_100,
                borderLeftWidth: 2,
                marginTop: 8,
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  color: Color.BLACK,
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Select Properties
              </Text>
            </View>
            <View
              style={{width: '100%', height: 'auto', marginTop: height * 0.02}}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    width: '95%',
                    height: height * 0.35,
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('General')}>
                  <View
                    style={{
                      height: 'auto',
                      backgroundColor: Color.lightblue,
                      width: '95%',
                      borderRadius: 15,
                      paddingBottom: 15,
                      alignItems: 'center',
                      marginVertical: 30,
                    }}>
                    <MaterialIcons
                      name="bedroom-parent"
                      color="black"
                      size={height * 0.1}
                      style={{marginVertical: width * 0.15}}
                    />
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 15,
                        color: Color.colorRoyalblue_100,
                      }}>
                      {' '}
                      Flat or House
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: '95%', height: 300, alignItems: 'center'}}
                  onPress={() => navigation.navigate('PgRoom')}>
                  <View
                    style={{
                      height: 'auto',
                      backgroundColor: Color.lightblue,
                      width: '95%',
                      borderRadius: 15,
                      paddingBottom: 15,
                      alignItems: 'center',
                      marginVertical: 30,
                    }}>
                    <MaterialIcons
                      name="bedroom-child"
                      color="black"
                      size={height * 0.1}
                      style={{marginVertical: width * 0.15}}
                    />
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 15,
                        color: Color.colorRoyalblue_100,
                      }}>
                      {' '}
                      PG Rooms{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formItem: {
    width: '90%',
    marginBottom: 20,
  },
  skyscrapersIcon: {
    left: 10,
    height: 37,
    width: 30,
    top: 20,
  },
  input: {
    height: height * 0.042,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 8,
    borderColor: Color.GREY,
    backgroundColor: Color.lightblue,
    fontSize: 15,
  },
  inputP: {
    height: height * 0.042,

    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 8,
    borderColor: Color.GREY,
    backgroundColor: Color.lightblue,
    fontSize: 15,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedGender: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalOptionText: {
    fontSize: 16,
  },
  selectedOutput: {
    fontSize: 16,
    marginTop: 20,
  },
  text1: {
    marginVertical: 15,
    marginHorizontal: 15,
    fontWeight: 500,
    color: Color.colorRoyalblue_100,
  },
});

export default Property;
