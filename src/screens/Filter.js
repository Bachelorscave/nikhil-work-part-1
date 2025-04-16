import React, {useState, useEffect} from 'react';
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
  ToastAndroid,
  FlatList,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Platform} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Color from '../Utils/Colors';
import {FilterSearchHouse, FilterSearchPG} from '../apiservice/OwnerApi';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

//select object for Guest
const ForCity = [{City: 'Mohali'}, {City: 'Chandigardh'}, {City: 'Kharar'}];
function Filterby({}) {
  const route = useRoute();
  const {search} = route.params || {};
  // const [Loading,setLoading] =(false);

  const [searchText, setsearchText] = useState('');
  useEffect(() => {
    if (search && search.searchText) {
      setsearchText(search.searchText);
    }
  }, [search]);

  const [isFullHouse, setisFullHouse] = useState(true);
  const [isHostel, setisHostel] = useState(false);
  const [is1BK, setis1BK] = useState(true);
  const [is1BHK, setis1BHK] = useState(false);
  const [is2BHK, setis2BHK] = useState(false);
  const [is3BHK, setis3BHK] = useState(false);
  const [is4BHK, setis4BHK] = useState(false);
  const [is4, setis4] = useState(false);
  //availability

  const [selectedOption, setSelectedOption] = useState('immediate');

  const handleOptionClick = option => {
    setSelectedOption(option); // Set the selected option
  };
  //tentant type
  const [selectType, setSelectType] = useState('Male');

  const handleTenantType = type => {
    setSelectType(type);
  };
  // reset all
  const resetStates = () => {
    setisFullHouse(true);
    setisHostel(false);
    setis1BK(true);
    setis1BHK(false);
    setis2BHK(false);
    setis3BHK(false);
    setis4BHK(false);
    setis4(false);
  };
  // room type

  const [selectedSRoom, setSelectedSRoom] = useState(true);
  const [selectedDRoom, setSelectedDRoom] = useState(false);
  const [selectedTRoom, setSelectedTRoom] = useState(false);
  const [selectedFRoom, setSelectedFRoom] = useState(false);

  const handleSRoomType = () => {
    setSelectedSRoom(!selectedSRoom);
  };
  const handleDRoomType = () => {
    setSelectedDRoom(!selectedDRoom);
  };
  const handleTRoomType = () => {
    setSelectedTRoom(!selectedTRoom);
  };
  const handleFRoomType = () => {
    setSelectedFRoom(!selectedFRoom);
  };

  // all for Guest
  const [selectCity, setselectCity] = useState('');
  const [clickedCity, setClickedCity] = useState(false); // for Guest
  const [dataCity, setdataCity] = useState(ForCity); // for Guest

  const handleFirstButtonClick = () => {
    setisFullHouse(true); // Set Full House as selected
    setisHostel(false);
  };

  const handleSecondButtonClick = () => {
    setisFullHouse(false); // Unset Full House
    setisHostel(true);
  };
  const handle1BK = () => {
    setis1BK(!is1BK);
  };
  const handle1BHK = () => {
    setis1BHK(!is1BHK);
  };
  const handle2BHK = () => {
    setis2BHK(!is2BHK);
  };
  const handle3BHK = () => {
    setis3BHK(!is3BHK);
  };
  const handle4BHK = () => {
    setis4BHK(!is4BHK);
  };
  const handle4 = () => {
    setis4(!is4);
  };

  const [value, setValue] = useState({values: [1000, 40000]});
  const multiSliderValuesChange = values => {
    setValue({
      values,
    });
  };

  const [Hvalue, setHValue] = useState({values: [1000, 15000]});
  const multiSliderValuesChangeH = values => {
    setHValue({
      values,
    });
  };

  const handleHouseSearch = async () => {
    const selectedRoom = [];
    if (is1BHK || is2BHK || is3BHK || is4 || is4BHK || is1BK) {
      const selectFlat = {
        oneRK: is1BK,
        oneBHK: is1BHK,
        twoBHK: is2BHK,
        threeBHK: is3BHK,
        fourBHK: is4BHK,
        moreBHK: is4,
      };
      selectedRoom.push(selectFlat);
    }
    let lookingFor = 'Flat';

    console.log(selectedRoom); // Ensure `selectedRoom` is defined somewhere in your code
    console.log(lookingFor);
    console.log(value);
    console.log(selectCity);
    console.log(searchText);
    console.log(selectedOption);

    try {
      // setLoading(true);
      const response = await FilterSearchHouse(
        lookingFor,
        selectedRoom,
        value,
        selectCity,
        searchText,
        selectedOption,
      );
      console.log(response);
      if (response.status == 201) {
        ToastAndroid.showWithGravityAndOffset(
          'Searched successfull!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );

        const data = await response.json();

        console.log(data);
        console.log('successfull');
        const SearchL = {
          selectCity,
        };
        const dataflat = {
          lookingFor,
          selectedRoom,
          value,
          selectCity,
          searchText,
          selectedOption,
        };

        console.log(SearchL.selectCity);
        navigation.navigate('Search', {data, SearchL, dataflat});
        console.log(dataflat);
      } else {
        console.log('Unexpected response status code:', response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const handlePGSearch = async () => {
    const selectedRType = [];
    if (selectedSRoom || selectedSRoom || selectedSRoom || selectedSRoom) {
      const selectRoom = {
        Single: selectedSRoom,
        Double: selectedDRoom,
        Triple: selectedTRoom,
        Four: selectedFRoom,
      };
      selectedRType.push(selectRoom);
    }
    let lookingFor = 'PG';

    console.log(selectedRType); // Ensure `selectedRoom` is defined somewhere in your code
    console.log(lookingFor);
    console.log(Hvalue);
    console.log(selectCity);
    console.log(searchText);
    console.log(selectType);

    try {
      // setLoading(true);
      const response = await FilterSearchPG(
        lookingFor,
        selectedRType,
        Hvalue,
        selectCity,
        searchText,
        selectType,
      );
      console.log(response);
      if (response.status == 201) {
        const dataP = await response.json();
        const data = dataP.properties;
        console.log(data);
        console.log('successfull');
        const Search = {
          selectCity,
        };
        const dataflat = {
          lookingFor,
          selectedRType,
          Hvalue,
          selectCity,
          searchText,
          selectType,
        };

        console.log(dataflat);

        navigation.navigate('SearchPG', {data, Search, dataflat});
      } else {
        console.log('Unexpected response status code:', response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <HeaderT  /> */}
        <View
          style={{
            height: height * 0.05,
            borderBottomLeftRadius: height * 0.02,
            borderBottomRightRadius: height * 0.02,
            paddingHorizontal: height * 0.005,

            marginBottom: height * 0.05,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: 5,
              width: '100%',
              height: height * 0.05,
              // paddingBottom: 15,
              // borderWidth:1,
              borderColor: Color.GREY,
              borderBottomWidth: 1.5,
            }}>
            <View
              style={{
                height: height * 0.04,
                width: '100%',
                // marginTop: height * 0.025,
                // marginLeft: width * 0.05,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: width * 0.05,
              }}>
              <TouchableOpacity
                onPress={() => {
                  resetStates();
                }}>
                <MaterialCommunityIcons
                  name="reload"
                  color="black"
                  size={24}
                  style={{
                    marginTop: height * 0.01,
                    // marginLeft: width * 0.02
                  }}
                />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontWeight: '500', fontSize: 20, color: Color.BLACK}}>
                  Filter by
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Entypo
                    name="cross"
                    color="black"
                    size={24}
                    style={{marginVertical: 2}}
                    onPress={() => navigation.goBack()}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{marginLeft: 25}}>
            <Text style={{fontSize: 15, fontWeight: 600, color: Color.BLACK}}>
              <EvilIcons name="location" size={20} color="black" /> Locality
              Search
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 8,
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', width: '90%'}}>
              <View style={{width: '35%'}}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 45,
                    borderRadius: 8,
                    borderWidth: 1,
                    alignSelf: 'center',

                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderColor: Color.GREY,
                    backgroundColor: Color.WHITE,
                  }}
                  onPress={() => {
                    setClickedCity(!clickedCity);
                  }}>
                  <Text style={{fontWeight: '200', color: Color.BLACK}}>
                    {selectCity == '' ? 'City' : selectCity}
                  </Text>
                  {clickedCity ? (
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
                {clickedCity ? (
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
                      data={dataCity}
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
                              setselectCity(item.City);
                              setClickedCity(!clickedCity);
                              // onSearch('');
                              // setSearch('');
                            }}>
                            <Text
                              style={{fontWeight: '600', color: Color.BLACK}}>
                              {item.City}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={{width: '65%'}}>
                <View style={{}}>
                  <TextInput
                    placeholder="Street, city..."
                    placeholderTextColor={Color.BLACK}
                    style={{
                      borderRadius: 10,
                      fontSize: 15,
                      backgroundColor: Color.WHITE,
                      borderColor: '#E7E7EA',
                      borderWidth: 1,
                      marginLeft: 10,
                      paddingLeft: 20,
                      height: 45,
                      color: Color.BLACK,
                    }}
                    value={searchText}
                    onChangeText={text => setsearchText(text)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: height * 0.02}}>
          <View style={{marginLeft: width * 0.03}}>
            <Text style={{fontSize: 20, color: Color.BLACK}}>Looking For</Text>
          </View>
          <View style={styles.maincontent}>
            <TouchableOpacity
              onPress={handleFirstButtonClick}
              style={[
                styles.button1,
                isFullHouse ? styles.clickedButton : styles.unclickedButton,
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: isFullHouse ? 'white' : 'black'},
                ]}>
                Full house
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSecondButtonClick}
              style={[
                styles.button1,
                isHostel ? styles.clickedButton : styles.unclickedButton,
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: isHostel ? 'white' : 'black'},
                ]}>
                Pg/Hostel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* for full house */}
        {isFullHouse && (
          <View style={{marginTop: 20}}>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 20, color: Color.BLACK}}>BHK Type</Text>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={handle1BK}
                style={[
                  styles.button,
                  is1BK ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: is1BK ? 'white' : 'black'},
                  ]}>
                  1RK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handle1BHK}
                style={[
                  styles.button,
                  is1BHK ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: is1BHK ? 'white' : 'black'},
                  ]}>
                  1BHK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handle2BHK}
                style={[
                  styles.button,
                  is2BHK ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: is2BHK ? 'white' : 'black'},
                  ]}>
                  2BHK
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={handle3BHK}
                style={[
                  styles.button,
                  is3BHK ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: is3BHK ? 'white' : 'black'},
                  ]}>
                  3BHK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handle4BHK}
                style={[
                  styles.button,
                  is4BHK ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: is4BHK ? 'white' : 'black'},
                  ]}>
                  4BHK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handle4}
                style={[
                  styles.button,
                  is4 ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[styles.buttonText, {color: is4 ? 'white' : 'black'}]}>
                  4+BHK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isHostel && (
          <View style={{marginTop: 20}}>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 20, color: Color.BLACK}}>
                Tenant Type
              </Text>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={() => handleTenantType('Male')}
                style={[
                  styles.button,
                  selectType === 'Male'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectType === 'Male' ? 'white' : 'black'},
                  ]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTenantType('Female')}
                style={[
                  styles.button,
                  selectType === 'Female'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectType === 'Female' ? 'white' : 'black'},
                  ]}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTenantType('Anyone')}
                style={[
                  styles.button,
                  selectType === 'Anyone'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectType === 'Anyone' ? 'white' : 'black'},
                  ]}>
                  Anyone
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isFullHouse && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
              }}>
              <Text style={styles.slider_Length}>Price Range :</Text>

              <Text style={styles.mainSlider}>{value.values[0]} min</Text>
              <Text style={{fontSize: 22, color: 'black'}}> - </Text>
              <Text style={styles.mainSlider}>{value.values[1]} max </Text>
            </View>

            <View style={styles.slider_box}>
              <MultiSlider
                values={[value.values[0], value.values[1]]}
                sliderLength={300}
                selectedStyle={{backgroundColor: Color.colorRoyalblue_100}}
                containerStyle={{alignSelf: 'center', marginTop: 20}}
                onValuesChange={multiSliderValuesChange}
                markerStyle={{
                  ...Platform.select({
                    android: {
                      height: 13,
                      width: 13,
                      borderRadius: 50,
                      backgroundColor: Color.colorRoyalblue_100,
                    },
                  }),
                }}
                min={3000}
                max={40000}
                step={1000}
              />
            </View>
          </View>
        )}
        {isHostel && (
          <View>
            <View style={{marginLeft: 20, marginTop: 20}}>
              <Text style={{fontSize: 20, color: Color.BLACK}}>Room Type</Text>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={handleSRoomType}
                style={[
                  styles.button1,
                  selectedSRoom ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedSRoom ? 'white' : 'black'},
                  ]}>
                  Single Room
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDRoomType}
                style={[
                  styles.button1,
                  selectedDRoom ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedDRoom ? 'white' : 'black'},
                  ]}>
                  Double Room
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={handleTRoomType}
                style={[
                  styles.button1,
                  selectedTRoom ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedTRoom ? 'white' : 'black'},
                  ]}>
                  Triple Room
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleFRoomType}
                style={[
                  styles.button1,
                  selectedFRoom ? styles.clickedButton : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedFRoom ? 'white' : 'black'},
                  ]}>
                  Four Room
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isHostel && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
              }}>
              <Text style={styles.slider_Length}>Price Range :</Text>

              <Text style={styles.mainSlider}>{Hvalue.values[0]} min</Text>
              <Text style={{fontSize: 22, color: 'black'}}> - </Text>
              <Text style={styles.mainSlider}>{Hvalue.values[1]} max </Text>
            </View>

            <View style={styles.slider_box}>
              <MultiSlider
                values={[Hvalue.values[0], Hvalue.values[1]]}
                sliderLength={300}
                selectedStyle={{backgroundColor: Color.colorRoyalblue_100}}
                containerStyle={{alignSelf: 'center', marginTop: 20}}
                onValuesChange={multiSliderValuesChangeH}
                markerStyle={{
                  ...Platform.select({
                    android: {
                      height: 13,
                      width: 13,
                      borderRadius: 50,
                      backgroundColor: Color.colorRoyalblue_100,
                    },
                  }),
                }}
                min={3000}
                max={15000}
                step={1000}
              />
            </View>
          </View>
        )}

        {isFullHouse && (
          <View>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 20, color: Color.BLACK}}>
                Availability
              </Text>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={() => handleOptionClick('immediate')}
                style={[
                  styles.button1,
                  selectedOption === 'immediate'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedOption === 'immediate' ? 'white' : 'black'},
                  ]}>
                  Immediate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionClick('15 Days')}
                style={[
                  styles.button1,
                  selectedOption === '15 Days'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedOption === '15 Days' ? 'white' : 'black'},
                  ]}>
                  Within 15 Days
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.maincontent}>
              <TouchableOpacity
                onPress={() => handleOptionClick('30 Days')}
                style={[
                  styles.button1,
                  selectedOption === '30 Days'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: selectedOption === '30 Days' ? 'white' : 'black'},
                  ]}>
                  Within 30 Days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionClick('After 30 days')}
                style={[
                  styles.button1,
                  selectedOption === 'After 30 days'
                    ? styles.clickedButton
                    : styles.unclickedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        selectedOption === 'After 30 days' ? 'white' : 'black',
                    },
                  ]}>
                  After 30 days
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      {isFullHouse && (
        <View style={{height: 80, width: '100%', backgroundColor: 'white'}}>
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
            //  onPress={()=>navigation.navigate("Search")}
            onPress={handleHouseSearch}>
            <Text
              style={{
                color: '#FFF',
                fontWeight: '700',
                fontSize: 16,
                alignItems: 'center',
                textAlign: 'center',
              }}>
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isHostel && (
        <View style={{height: 80, width: '100%', backgroundColor: 'white'}}>
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
            //  onPress={()=>navigation.navigate("SearchPG")}
            onPress={handlePGSearch}>
            <Text
              style={{
                color: '#FFF',
                fontWeight: '700',
                fontSize: 16,
                alignItems: 'center',
                textAlign: 'center',
              }}>
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: width * 0.26,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,

    marginLeft: 10,
  },
  button1: {
    width: width * 0.34,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,

    marginLeft: 10,
  },
  unclickedButton: {
    backgroundColor: Color.WHITE,
    borderColor: Color.BLACK,
    borderWidth: 1,
  },
  clickedButton: {
    backgroundColor: Color.colorRoyalblue_100,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    fontWeight: '500',
  },
  slider_Length: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'flex-start',

    marginLeft: 20,
    marginRight: 15,
  },

  slider_box: {
    width: Dimensions.get('window').width - 60,
    height: height * 0.08,
    marginHorizontal: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius: 10,
    marginTop: 17,
  },
  Text: {color: 'black', fontSize: 20, marginHorizontal: 10, marginTop: 10},
  mainSlider: {
    color: 'black',
    fontSize: 15,
    marginTop: 5,
  },
  maincontent: {
    flexDirection: 'row',
    marginLeft: width * 0.02,
    marginTop: height * 0.01,
  },
});

export default Filterby;
