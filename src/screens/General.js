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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import Color from '../Utils/Colors';
import {FontSize} from '../../GlobalStyles';
import {ScrollView} from 'react-native-gesture-handler';
import GeneralHeader from '../components/main/GeneralHeader';

const {width, height} = Dimensions.get('window');

const ForG = [{Gender: 'Male'}, {Gender: 'Female'}];

const ForC = [{City: 'Kharar'}, {City: 'Chandigarh'}, {City: 'Mohali'}];

function Register(props) {
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [selectGender, setselectGender] = useState('');
  const [selectCity, setselectCity] = useState('');
  const [selectLooking, setSelectLooking] = useState('');

  const [search, setSearch] = useState(''); // for city

  const [clicked, setClicked] = useState(false); // for gender
  const [clickedC, setClickedC] = useState(false); // fro city
  console.log('🚀 ~ Register ~ clickedC:', clickedC);
  const [data, setData] = useState(ForG); // for gender
  const [dataC, setDataC] = useState(ForC); // for city

  // for city search
  //   const searchRef = useRef();
  //   const onSearch = search => {
  //     if (search !== '') {
  //       let tempData = dataC.filter(item => {
  //         return item.City.toLowerCase().indexOf(search.toLowerCase()) > -1;
  //       });
  //       setData(tempData);
  //     } else {
  //       setData(City);
  //     }
  //   };

  const handleSelectGender = gender => {
    setSelectedGender(gender);
    setShowModal(false);
  };
  const handleDetails = () => {
    //   if(!fullName && !mobileNo && !email){
    //      Alert.alert('Error', 'Please fill the Prefered Guest and selected Time ');
    //   return;
    // }

    const FlatDetails = {
      fullName,
      mobileNo,
      email,
      selectGender,
      selectCity,
      selectLooking,
    };
    console.log(FlatDetails.fullName);
    navigation.navigate('PropertyDetails', {FlatDetails});
  };

  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <GeneralHeader />
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
            }}>
            <View
              style={{
                width: '90%',
                height: height * 0.04,
                borderLeftColor: Color.colorRoyalblue_100,
                borderLeftWidth: 2,
                marginTop: 8,
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  color: Color.BLACK,
                  marginTop: 4,
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                Personal Details
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 'auto',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <View style={styles.formItem}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={Color.BLACK}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.formItem}>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile No"
                  placeholderTextColor={Color.BLACK}
                  value={mobileNo}
                  onChangeText={setMobileNo}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.formItem}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Color.BLACK}
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>

          <View
            style={{
              height: 'auto',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.GREY,
              borderRadius: 10,
              marginTop: 15,
              marginBottom: 15,
            }}>
            <View
              style={{
                width: '90%',
                height: height * 0.04,
                borderLeftColor: Color.colorRoyalblue_100,
                borderLeftWidth: 2,
                marginTop: 8,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  color: Color.BLACK,
                  marginTop: 4,
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                More
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 'auto',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: height * 0.045,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  alignSelf: 'center',

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderColor: Color.GREY,
                  backgroundColor: Color.lightblue,
                }}
                onPress={() => {
                  setClicked(!clicked);
                }}>
                <Text style={{fontWeight: '200', color: Color.BLACK}}>
                  {selectGender == '' ? 'For' : selectGender}
                </Text>
                {clicked ? (
                  <Image
                    source={require('../image/upload.png')}
                    style={{width: 10, height: 10}}
                  />
                ) : (
                  <Image
                    source={require('../image/dropdown.png')}
                    style={{width: 10, height: 10}}
                  />
                )}
              </TouchableOpacity>
              {clicked ? (
                <View
                  style={{
                    elevation: 5,
                    marginTop: 20,
                    height: 'auto',
                    alignSelf: 'center',
                    width: '90%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  {/* <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          /> */}

                  <FlatList
                    data={data}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setselectGender(item.Gender);
                            setClicked(!clicked);
                            // onSearch('');
                            // setSearch('');
                          }}>
                          <Text style={{fontWeight: '600', color: Color.BLACK}}>
                            {item.Gender}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : null}
            </View>

            <View
              style={{
                width: '100%',
                height: 'auto',
                marginTop: 20,
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: height * 0.045,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  alignSelf: 'center',

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderColor: Color.GREY,
                  backgroundColor: Color.lightblue,
                }}
                onPress={() => {
                  setClickedC(prev => !prev);
                }}>
                <Text style={{fontWeight: '200', color: Color.BLACK}}>
                  {selectCity == '' ? 'City' : selectCity}
                </Text>
                {clickedC ? (
                  <Image
                    source={require('../image/upload.png')}
                    style={{width: 10, height: 10}}
                  />
                ) : (
                  <Image
                    source={require('../image/dropdown.png')}
                    style={{width: 10, height: 10}}
                  />
                )}
              </TouchableOpacity>
              {clickedC && (
                <View
                  style={{
                    elevation: 5,
                    marginTop: 20,
                    height: 'auto',
                    alignSelf: 'center',
                    width: '90%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  {/* <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          /> */}

                  <FlatList
                    data={dataC}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            console.log('place item changed');
                            setselectCity(item.City);
                            setClickedC(!clickedC);
                          }}>
                          <Text style={{fontWeight: '600', color: Color.BLACK}}>
                            {item.City}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <View
            style={{
              height: 'auto',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.GREY,
              borderRadius: 10,
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
                  marginTop: 4,
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                Looking To
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 'auto',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <RadioButton.Group
                onValueChange={newValue => setSelectLooking(newValue)}
                value={selectLooking}>
                <View
                  style={{flexDirection: 'row', width: '90%', marginBottom: 8}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginRight: 30,
                    }}>
                    <RadioButton value="Rent" />
                    <Text style={{color: Color.BLACK}}>Rent/lease</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginLeft: 30,
                    }}>
                    <RadioButton value="ListPg" />
                    <Text style={{color: Color.BLACK}}>List-PG/Co-living</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <View
            style={{
              height: height * 0.12,
              width: '95%',
              alignItems: 'center',
              backgroundColor: Color.midblue,
              borderRadius: 5,
              marginVertical: 15,
              marginHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Image
                style={styles.skyscrapersIcon}
                contentFit="cover"
                source={require('../image/male.jpg')}
              />
              <Text
                style={{
                  marginLeft: 20,
                  width: '70%',
                  fontSize: 15,
                  top: 20,
                  color: Color.BLACK,
                }}>
                {' '}
                Don’t want to fill all the details Let us help you
              </Text>
              <TouchableOpacity
                style={{
                  width: 'auto',
                  height: 20,
                  backgroundColor: Color.colorRoyalblue_100,
                  borderRadius: 5,
                  marginTop: 34,
                }}>
                <Text
                  style={{
                    width: '100%',
                    color: 'white',
                    fontSize: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                  }}>
                  Call Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          height: height * 0.08,
          width: '100%',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(97, 85, 233, 100)',
            borderRadius: 10,
            marginHorizontal: 20,
            paddingHorizontal: 23,
            paddingVertical: 12,
            bottom: 10,
            position: 'absolute',

            width: '90%',
          }}
          //  onPress={()=>navigation.navigate("PropertyDetails")}
          onPress={handleDetails}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: '500',
              fontSize: 16,
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Next, add property details
          </Text>
        </TouchableOpacity>
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
    marginBottom: height * 0.02,
  },
  skyscrapersIcon: {
    left: 10,
    height: height * 0.037,
    width: 30,
    top: height * 0.02,
  },
  input: {
    height: height * 0.045,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 8,
    borderColor: Color.GREY,
    backgroundColor: Color.lightblue,
    fontSize: 15,
    color: Color.BLACK,
  },
  inputP: {
    height: height * 0.045,

    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 8,
    borderColor: Color.GREY,
    backgroundColor: Color.lightblue,
    fontSize: 15,
    color: Color.BLACK,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    justifyContent: 'space-between',
    color: Color.BLACK,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.BLACK,
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
    color: Color.BLACK,
  },
  selectedOutput: {
    fontSize: 16,
    marginTop: 20,
    color: Color.BLACK,
  },
});

export default Register;
