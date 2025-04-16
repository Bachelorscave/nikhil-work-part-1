import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SliderBox} from 'react-native-image-slider-box';
import Colors from '../Utils/Colors';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Color, FontFamily, FontSize, Border} from '../../GlobalStyles';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {
  ContactedProperty,
  featured,
  getpropertydetails,
} from '../apiservice/OwnerApi';
import {FlatList} from 'react-native-gesture-handler';
export default function viewPropertyP({navigation}) {
  const [data, setData] = useState({});
  const route = useRoute();
  // useEffect(() => {
  //   if (route.params?.response) {
  //     const processedData = route.params.response || {};
  //     setData(processedData);
  //   }
  // }, [route.params?.response]);
  const {result} = route.params;

  const [type, settype] = useState(false);
  const singleRoom = result.property.roomDetails.roomType.includes('Single');
  const doubleRoom = result.property.roomDetails.roomType.includes('Double');
  const tripleRoom = result.property.roomDetails.roomType.includes('Triple');
  const fourRoom = result.property.roomDetails.roomType.includes('Four');

  console.log('----start here--->');

  console.log('Response:', JSON.stringify(result, null, 2));
  console.log('---->---->--->');
  console.log(result.property.roomDetails.roomType);
  // console.log(result.type);
  // console.log("------->");
  // console.log(result.property);
  // console.log("------->");
  // console.log(result.property.accommodationDetails);
  // console.log("------->");
  // console.log(result.property.accommodationDetails.bhkType);

  const images = [
    require('../image/room.jpg'),
    require('../image/room.jpg'),
    require('../image/room.jpg'),
    require('../image/room.jpg'),
    require('../image/room.jpg'),
    require('../image/room.jpg'),
    require('../image/room.jpg'),
    require('../image/room.jpg'),
  ];
  let Meal;
  if (result.property.foodIncluded === true) {
    Meal = 'Yes';
  } else {
    Meal = 'No';
  }
  const PropertyDetails = {
    // Title:result.property.accommodationDetails.bhkType,
    Type: result.type,
    Gender: result.property.placeFor,
    City: result.property.locality.city,
    Street: result.property.locality.street,
    Address: result.property.locality.address,
    Price: '5000',
    Deposit: '2000',
    // Bedroom: "result.property.accommodationDetails.bhkType.slice(0, 1)",
    // Bathroom: "result.property.amenities.bathroom",
    // Balcony: "result.property.amenities.balcony",

    Furnished: result.property.availability.startDate.slice(0, 10),
    Maintanance: Meal,
    PreferedTenant: result.property.placeFor,
    // Availability:result.property.availability.startDate.slice(0,10),
    Parking: result.property.parking,
    SqFt: result.property.gateClosingTime,
    Description: result.property.roomDetails.pgDescription,
  };
  const Amenities = ({amenities}) => {
    const trueAmenities = Object.entries(amenities).filter(
      ([key, value]) => value === true,
    );

    const amenitiesIcons = {
      commonTv: <MaterialIcons name="tv" size={28} color="#000000" />,
      cookingAllowed: (
        <MaterialIcons name="kitchen" size={28} color="#000000" />
      ),
      refrigerator: <MaterialIcons name="kitchen" size={28} color="#000000" />,
      mess: <MaterialIcons name="restaurant" size={28} color="#000000" />,
      wifi: <FontAwesome name="wifi" size={28} color="#000000" />,
      powerBackup: <MaterialIcons name="power" size={28} color="#000000" />,
      lift: <MaterialIcons name="door-sliding" size={25} color="black" />,
    };

    const groupedAmenities = [];
    for (let i = 0; i < trueAmenities.length; i += 4) {
      groupedAmenities.push(trueAmenities.slice(i, i + 4));
    }

    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
      const initialValue = expanded ? 1 : 0;
      const finalValue = expanded ? 0 : 1;

      setExpanded(!expanded);
      Animated.timing(animation, {
        toValue: finalValue,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    const maxVisibleRows = 2;
    const visibleHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [maxVisibleRows * 30, groupedAmenities.length * 60], // Adjust height according to your needs
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.ammenityContainer, {height: visibleHeight}]}>
          {groupedAmenities.map((group, index) => (
            <View
              key={index}
              style={[
                styles.ammenityRow,
                index > 0 ? styles.rowPadding : null,
              ]}>
              {group.map(([key]) => (
                <View key={key} style={styles.ammenityItem}>
                  {amenitiesIcons[key]}
                  <Text style={styles.amenityText}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Animated.View>
        <TouchableOpacity onPress={toggleExpand} style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>
            {expanded ? 'Show Less ⬆' : 'Show More ⬇'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const PGRules = ({rules}) => {
    const trueRules = Object.entries(rules).filter(
      ([key, value]) => value === true,
    );

    const rulesIcons = {
      smoking: <MaterialIcons name="smoke-free" size={28} color="#000000" />,
      guardians: (
        <MaterialIcons name="supervisor-account" size={28} color="#000000" />
      ),
      nonVeg: <MaterialIcons name="no-meals" size={28} color="#000000" />,
      veg: <MaterialIcons name="eco" size={28} color="#000000" />,
      girlsAllowed: <MaterialIcons name="female" size={28} color="#000000" />,
      boysAllowed: <MaterialIcons name="male" size={28} color="#000000" />,
    };

    const groupedRules = [];
    for (let i = 0; i < trueRules.length; i += 4) {
      groupedRules.push(trueRules.slice(i, i + 4));
    }

    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
      const initialValue = expanded ? 1 : 0;
      const finalValue = expanded ? 0 : 1;

      setExpanded(!expanded);
      Animated.timing(animation, {
        toValue: finalValue,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    const maxVisibleRows = 2;
    const visibleHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [maxVisibleRows * 30, groupedRules.length * 60], // Adjust height according to your needs
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.ammenityContainer, {height: visibleHeight}]}>
          {groupedRules.map((group, index) => (
            <View
              key={index}
              style={[
                styles.ammenityRow,
                index > 0 ? styles.rowPadding : null,
              ]}>
              {group.map(([key]) => (
                <View key={key} style={styles.ammenityItem}>
                  {rulesIcons[key]}
                  <Text style={styles.amenityText}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Animated.View>
        <TouchableOpacity onPress={toggleExpand} style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>
            {expanded ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RoomEquipment = ({equipment}) => {
    const trueEquipment = Object.entries(equipment).filter(
      ([key, value]) => value === true,
    );

    const equipmentIcons = {
      closet: (
        <MaterialIcons
          name="kitchen"
          size={20}
          color={Colors.colorRoyalblue_100}
        />
      ),
      TV: (
        <MaterialIcons name="tv" size={20} color={Colors.colorRoyalblue_100} />
      ),
      Beddings: (
        <MaterialIcons name="bed" size={20} color={Colors.colorRoyalblue_100} />
      ),
      Geyser: (
        <MaterialIcons
          name="hot-tub"
          size={20}
          color={Colors.colorRoyalblue_100}
        />
      ),
      AC: <Entypo name="air" size={20} color={Colors.colorRoyalblue_100} />,
      Bathroom: (
        <MaterialIcons
          name="bathtub"
          size={20}
          color={Colors.colorRoyalblue_100}
        />
      ),
      AttachedBathroom: (
        <MaterialIcons
          name="bathroom"
          size={20}
          color={Colors.colorRoyalblue_100}
        />
      ),
      MealIncluded: (
        <MaterialIcons
          name="restaurant-menu"
          size={20}
          color={Colors.colorRoyalblue_100}
        />
      ),
    };

    const groupedEquipment = [];
    for (let i = 0; i < trueEquipment.length; i += 2) {
      groupedEquipment.push(trueEquipment.slice(i, i + 2));
    }

    return (
      <View style={styles.container}>
        {groupedEquipment.map((group, index) => (
          <View
            key={index}
            style={[
              styles.equipmentRow,
              index > 0 ? styles.rowPadding1 : null,
            ]}>
            {group.map(([key]) => (
              <View key={key} style={styles.equipmentItem}>
                <AntDesign
                  name="checkcircle"
                  size={20}
                  color={Colors.colorRoyalblue_100}
                  style={{marginRight: 40}}
                />
                {equipmentIcons[key]}
                <Text style={styles.equipmentText}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, ' $1')}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const handlePGproperty = async (Type, id) => {
    console.log(Type);
    console.log(id);
    try {
      const response = await ContactedProperty(Type, id);

      //
      if (response.status == 201) {
        // navigation.navigate('ViewProperty',);
        console.log('successfull');
      } else if (response.status == 202) {
        // navigation.navigate('ViewProperty',);
        console.log(' user already registered for constacted successfull');
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
    }
  };
  const imageFlatlistRef = useRef();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    console.log('🚀 ~ handleOnScroll ~ index:', index);
    setCurrentImageIndex(index);
  };
  const renderFlatImages = ({item, index}) => {
    console.log('renderFlatImages------------------>', item);
    return (
      <View style={{width: responsiveWidth(100), height: responsiveWidth(60)}}>
        <Image
          source={{
            uri: validPropertyMedia[item]
              ? `http://93.127.185.101:8005/api/utils/get-image/${item}`
              : `https://rumah.soloproperty.co.id/wp-content/uploads/2022/04/rumah.png`,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  };
  //to show similar properties
  const [featuredData, setfeaturedData] = useState([]);
  console.log('🚀 ~ ViewProperty ~ featuredData:', featuredData);

  const fetchDataFetured = useCallback(async () => {
    try {
      const jsonData = await featured();
      if (jsonData) {
        setfeaturedData(jsonData);
        console.log('featured data:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  useEffect(() => {
    fetchDataFetured();
  }, []);

  //check property images
  const [validPropertyMedia, setValidPropertyMedia] = useState({});
  console.log('🚀 ~ viewPropertyP ~ validPropertyMedia:', validPropertyMedia);
  useEffect(() => {
    const checkPropertyMedia = async () => {
      const mediaValidity = {};
      for (let item of result.property.media.photos) {
        try {
          const response = await fetch(
            `http://93.127.185.101:8005/api/utils/get-image/${item}`,
            {
              method: 'HEAD',
            },
          );
          mediaValidity[item] = response.ok;
        } catch (error) {
          console.error('Error checking media:', error);
          mediaValidity[item] = false;
        }
      }
      setValidPropertyMedia(mediaValidity);
    };

    checkPropertyMedia();
  }, [result]);
  console.log('result.property.media.photos', result.property);
  const formatRent = rent => {
    if (rent >= 1000) {
      return `${(rent / 1000).toFixed(0)}k`;
    }
    return rent;
  };

  const propertyview = async (type, id) => {
    console.log('🚀 ~ propertyview ~ id:', id);
    console.log('🚀 ~ propertyview ~ type:', type);
    console.log('inside propertyView');
    // navigation.navigate('ViewProperty')
    try {
      const response = await getpropertydetails(type, id);
      const result = await response.json();

      //   // Beautify and log the response
      console.log('Response:', JSON.stringify(result, null, 2));
      if (response.status == 201) {
        if (type === 'Flat') {
          navigation.push('ViewProperty', {result});

          console.log('successfull');
        } else {
          navigation.push('ViewPropertyP', {result});

          console.log('successfull');
        }
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
    }
  };
  const [validFeaturedMedia, setValidFeaturedMedia] = useState({});
  useEffect(() => {
    const checkMedia = async () => {
      const mediaValidity = {};
      for (let item of featuredData) {
        try {
          const response = await fetch(
            `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`,
            {
              method: 'HEAD',
            },
          );
          mediaValidity[item.propertyId] = response.ok;
        } catch (error) {
          console.error('Error checking media:', error);
          mediaValidity[item.propertyId] = false;
        }
      }
      setValidFeaturedMedia(mediaValidity);
    };

    checkMedia();
  }, [featuredData]);
  return (
    <>
      <ScrollView>
        <View>
          {/* <SliderBox images={images} 
                dotColor="#5e17eb" 
                inactiveDotColor="black" 
                imageLoadingColor="black" 
                autoplay={true} 
                autoplayInterval={5000}
                circleLoop={true}
                paginationBoxVerticalPadding={10}
                style={{height:250,width:"100%"}}
                /> */}
          <View
            style={{
              width: responsiveWidth(100),
              height: responsiveWidth(60),
              // margin: 5,
              // borderWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: width * 0.025,
                // borderWidth: 1,
                borderColor: 'red',
                width: width,
                height: width * 0.1,
                zIndex: 100,
                justifyContent: 'space-between',
                paddingHorizontal: width * 0.05,
                // borderWidth: 1,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign
                  name="arrowleft"
                  size={25}
                  color={
                    result.property.media.photos.length == 0 ? '#000' : '#fff'
                  }
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <AntDesign
                    name="sharealt"
                    size={20}
                    color={
                      result.property.media.photos.length == 0 ? '#000' : '#fff'
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: width * 0.05}}>
                  <AntDesign
                    name="hearto"
                    size={20}
                    color={
                      result.property.media.photos.length == 0 ? '#000' : '#fff'
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            {result.property.media.photos.length == 0 ? (
              <View>
                <Image
                  source={{
                    uri: `https://rumah.soloproperty.co.id/wp-content/uploads/2022/04/rumah.png`,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            ) : (
              <FlatList
                ref={imageFlatlistRef}
                data={result.property.media.photos}
                renderItem={renderFlatImages}
                horizontal={true}
                pagingEnabled={true}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: scrollX}}}],
                  {useNativeDriver: false, listener: handleOnScroll},
                )}
                scrollEventThrottle={16}
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                position: 'absolute',
                bottom: responsiveWidth(3),
              }}>
              {result.property.media.photos.map((item, idx) => {
                return (
                  <View
                    key={`item${idx}`}
                    style={{
                      width: responsiveWidth(2),
                      height: responsiveWidth(2),
                      borderRadius: responsiveWidth(2) / 2,
                      backgroundColor:
                        currentImageIndex == idx ? Color.colorWhite : 'grey',
                      marginRight: responsiveWidth(1),
                      // position: 'absolute',
                      // bottom: responsiveWidth(2),
                    }}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.subContainer}>
            <View style={styles.heading}>
              <View style={{alignItems: 'left'}}>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'left',
                    fontSize: 15,
                    paddingStart: 5,
                    fontWeight: 'bold',
                  }}>
                  {PropertyDetails.Type} for {PropertyDetails.Gender} in{' '}
                  {PropertyDetails.City}
                </Text>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'left',
                    fontSize: 10,
                    paddingStart: 10,
                  }}>
                  {PropertyDetails.Address},{PropertyDetails.Street},
                  {PropertyDetails.City},India
                </Text>
              </View>

              <View style={{alignItems: 'Right'}}>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'right',
                    fontSize: 15,
                    paddingStart: 20,
                    fontWeight: 'bold',
                  }}>
                  ₹ {PropertyDetails.Price} / Month
                </Text>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'right',
                    fontSize: 10,
                    paddingStart: 20,
                  }}>
                  (₹ {PropertyDetails.Deposit} Deposit)
                </Text>
              </View>
            </View>

            <View style={styles.rect}></View>
            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: Color.colorBlack,
                }}>
                Overview
              </Text>
            </View>
            <View style={styles.groupRow}>
              <View style={styles.group}>
                <View style={styles.iconRow}>
                  <MaterialCommunityIcons
                    name="table-furniture"
                    style={styles.icon}
                  />
                  <View style={styles.overviewgroupColumn}>
                    <Text style={styles.overviewRow1}>
                      {PropertyDetails.Furnished}
                    </Text>
                    <Text style={styles.overviewRow2}>Posted on</Text>
                  </View>
                </View>
              </View>
              <View style={styles.group}>
                <View style={styles.iconRow}>
                  <MaterialCommunityIcons name="tools" style={styles.icon} />
                  <View style={styles.overviewgroupColumn}>
                    <Text style={styles.overviewRow1}>
                      {PropertyDetails.Maintanance}
                    </Text>
                    <Text style={styles.overviewRow2}>Meal Included</Text>
                  </View>
                </View>
              </View>
              <View style={styles.group}>
                <View style={styles.iconRow}>
                  <Fontisto name="person" style={styles.icon} />
                  <View style={styles.overviewgroupColumn}>
                    <Text style={styles.overviewRow1}>
                      {PropertyDetails.PreferedTenant}
                    </Text>
                    <Text style={styles.overviewRow2}>Prefered Tenant</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.groupRow}>
              <View style={styles.group}>
                <View style={styles.iconRow}>
                  <FontAwesome name="calendar-check-o" style={styles.icon} />
                  <View style={styles.overviewgroupColumn}>
                    <Text style={styles.overviewRow1}>Imediately</Text>
                    <Text style={styles.overviewRow2}>Availability</Text>
                  </View>
                </View>
              </View>
              <View style={styles.group}>
                <View style={styles.iconRow}>
                  <FontAwesome name="car" style={styles.icon} />
                  <View style={styles.overviewgroupColumn}>
                    <Text style={styles.overviewRow1}>
                      {PropertyDetails.Parking}
                    </Text>
                    <Text style={styles.overviewRow2}>Parking</Text>
                  </View>
                </View>
              </View>
              <View style={styles.group}>
                <View style={styles.iconRow}>
                  <FontAwesome5 name="vector-square" style={styles.icon} />
                  <View style={styles.overviewgroupColumn}>
                    <Text style={styles.overviewRow1}>
                      {PropertyDetails.SqFt}
                    </Text>
                    <Text style={styles.overviewRow2}>Gate CLosing Time</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.rect}></View>
            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: Color.colorBlack,
                }}>
                Room Offered
              </Text>
            </View>
            {singleRoom && (
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  height: 'auto',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '30%',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginLeft: 30,
                  }}>
                  <MaterialIcons
                    name="supervisor-account"
                    size={28}
                    color="#000000"
                  />
                  <Text style={{marginTop: 5, color: Color.colorBlack}}>
                    Single Room
                  </Text>
                </View>

                <View
                  style={{
                    height: 'auto',
                    borderWidth: 1,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginTop: 5,
                    marginLeft: 30,
                    borderColor: Color.colorSilver,
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: '98%',
                      borderBottomWidth: 1,
                      borderBottomColor: Color.colorDarkslategray_100,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      One Time Security Deposit :₹{' '}
                      {
                        result.property.roomDetails.detailsSingleRoom
                          .expectedDeposit
                      }
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      {' '}
                      ₹{' '}
                      {
                        result.property.roomDetails.detailsSingleRoom
                          .expectedMonthlyRent
                      }{' '}
                      per/bed
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '60%',
                      alignSelf: 'flex-start',
                      marginLeft: 30,
                      marginBottom: 20,
                    }}>
                    <RoomEquipment
                      equipment={
                        result.property.roomDetails.detailsSingleRoom.equipment
                      }
                    />
                  </View>
                </View>
              </View>
            )}
            {doubleRoom && (
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  height: 'auto',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '30%',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginLeft: 30,
                  }}>
                  <MaterialIcons
                    name="supervisor-account"
                    size={28}
                    color="#000000"
                  />
                  <Text style={{marginTop: 5, color: Color.colorBlack}}>
                    Double Room
                  </Text>
                </View>

                <View
                  style={{
                    height: 'auto',
                    borderWidth: 1,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginTop: 5,
                    marginLeft: 30,
                    borderColor: Color.colorSilver,
                  }}>
                  <View
                    style={{
                      height: height * 0.06,
                      width: '98%',
                      borderBottomWidth: 1,
                      borderBottomColor: Color.colorDarkslategray_100,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      One Time Security Deposit : ₹{' '}
                      {
                        result.property.roomDetails.detailsDoubleRoom
                          .expectedDeposit
                      }
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      {' '}
                      ₹{' '}
                      {
                        result.property.roomDetails.detailsDoubleRoom
                          .expectedMonthlyRent
                      }{' '}
                      per/bed
                    </Text>
                  </View>
                  <View
                    style={{flex: 1, alignItems: 'flex-start', width: '90%'}}>
                    <RoomEquipment
                      equipment={
                        result.property.roomDetails.detailsDoubleRoom.equipment
                      }
                    />
                  </View>
                </View>
              </View>
            )}
            {tripleRoom && (
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  height: 'auto',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '30%',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginLeft: 30,
                  }}>
                  <MaterialIcons
                    name="supervisor-account"
                    size={28}
                    color="#000000"
                  />
                  <Text style={{marginTop: 5, color: Color.colorBlack}}>
                    Triple Room
                  </Text>
                </View>

                <View
                  style={{
                    height: 'auto',
                    borderWidth: 1,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginTop: 5,
                    marginLeft: 30,
                    borderColor: Color.colorSilver,
                  }}>
                  <View
                    style={{
                      height: height * 0.06,
                      width: '98%',
                      borderBottomWidth: 1,
                      borderBottomColor: Color.colorDarkslategray_100,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      One Time Security Deposit : ₹{' '}
                      {
                        result.property.roomDetails.detailsTripleRoom
                          .expectedDeposit
                      }
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      {' '}
                      ₹{' '}
                      {
                        result.property.roomDetails.detailsTripleRoom
                          .expectedMonthlyRent
                      }{' '}
                      per/bed
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '60%',
                      alignSelf: 'flex-start',
                      marginLeft: 30,
                      marginBottom: 20,
                    }}>
                    <Equipment
                      equipment={
                        result.property.roomDetails.detailsTripleRoom.equipment
                      }
                    />
                  </View>
                </View>
              </View>
            )}
            {fourRoom && (
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  height: 'auto',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '30%',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginLeft: 30,
                  }}>
                  <MaterialIcons
                    name="supervisor-account"
                    size={28}
                    color="#000000"
                  />
                  <Text style={{marginTop: 5, color: Color.colorBlack}}>
                    Four Room
                  </Text>
                </View>

                <View
                  style={{
                    height: 'auto',
                    borderWidth: 1,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginTop: 5,
                    marginLeft: 30,
                    borderColor: Color.colorSilver,
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: '98%',
                      borderBottomWidth: 1,
                      borderBottomColor: Color.colorDarkslategray_100,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      One Time Security Deposit : ₹{' '}
                      {
                        result.property.roomDetails.detailsFourRoom
                          .expectedDeposit
                      }
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.colorBlack,
                      }}>
                      {' '}
                      ₹{' '}
                      {
                        result.property.roomDetails.detailsFourRoom
                          .expectedMonthlyRent
                      }{' '}
                      per/bed
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '60%',
                      alignSelf: 'flex-start',
                      marginLeft: 30,
                      marginBottom: 20,
                    }}>
                    <RoomEquipment
                      equipment={
                        result.property.roomDetails.detailsFourRoom.equipment
                      }
                    />
                  </View>
                </View>
              </View>
            )}

            <View style={styles.rect}></View>

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: Color.colorBlack,
                }}>
                Description
              </Text>
              <Text
                style={{
                  paddingTop: 8,
                  fontSize: 12,
                  marginLeft: 5,
                  marginRight: 5,
                  color: Color.colorBlack,
                }}>
                {PropertyDetails.Description}
              </Text>
            </View>

            <View style={styles.rect}></View>

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: Color.colorBlack,
                }}>
                Common Ammenities
              </Text>
            </View>

            <Amenities amenities={result.property.commonAmenities} />

            <View style={styles.rect}></View>

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: Color.colorBlack,
                }}>
                PG Rules
              </Text>
            </View>

            <PGRules rules={result.property.pgRules} />

            <View style={styles.rect}></View>

            {/* <View  style={{ marginTop:10,padding:20,height:250,width:"90%"} } >
            <Text style={{ fontWeight:'bold',fontSize:15} }>View On Map </Text>
        </View> */}

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  textAlign: 'center',
                  color: Color.colorBlack,
                }}>
                Similar Properties
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredData.map((item, index) => {
                console.log('Featured item***************************', item);
                // const [isValidMedia, setIsValidMedia] = useState(null);

                // useEffect(() => {
                //   const checkMedia = async () => {
                //     try {
                //       const response = await fetch(
                //         `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`,
                //         {
                //           method: 'HEAD',
                //         },
                //       );
                //       if (response.ok) {
                //         setIsValidMedia(true);
                //       } else {
                //         setIsValidMedia(false);
                //       }
                //     } catch (error) {
                //       console.error('Error checking media:', error);
                //       setIsValidMedia(false);
                //     }
                //   };

                //   checkMedia();
                // }, [item.photos]);

                return (
                  <View key={index}>
                    <TouchableOpacity
                      // onPress={()=>{navigation.navigate("Tentate")}}
                      onPress={() => propertyview(item.type, item.propertyId)}
                      style={{
                        height: height * 0.295,
                        elevation: 3,
                        backgroundColor: '#FFF',
                        marginLeft: 15,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 6,
                        width: width * 0.75,
                        marginRight: featuredData.length - 1 == index ? 20 : 0,
                        // borderWidth: 1,
                      }}>
                      <ImageBackground
                        // source={{ uri: item.gallery }}
                        // source={require('../image/sampleRoom.png')}
                        source={{
                          uri: validFeaturedMedia[item.propertyId]
                            ? `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`
                            : `https://rumah.soloproperty.co.id/wp-content/uploads/2022/04/rumah.png`,
                        }}
                        style={styles.featureBG}
                        imageStyle={{borderRadius: 15}}>
                        <Text style={styles.overlayText1}>
                          {item.preferredTenant}
                        </Text>
                      </ImageBackground>

                      {item.type === 'Flat' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 30,
                            marginTop: 6,
                            // borderWidth: 1,
                            // backgroundColor: 'red',
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: '50%',
                              height: 15,
                            }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                // fontWeight: '500',
                                // color: Color.BLACK,
                                color: Color.colorBlack,
                                fontFamily: FontFamily.interBold,
                              }}>
                              {item.bhkType} {item.type} for Rent
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontSize: 11,
                                // color: Color.BLACK,
                                color: '#696969',
                                fontFamily: FontFamily.interMedium,
                              }}>
                              {item.location}{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              textAlign: 'right',
                              width: '40%',
                              fontSize: 14,
                              color: Colors.BLACK,
                              fontFamily: FontFamily.interMedium,
                            }}>
                            ₹ {formatRent(item.expectedRent)}
                            {/* ₹{item.expectedRent} */}
                          </Text>
                        </View>
                      ) : item.type === 'PG' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: responsiveWidth(8),
                            marginTop: 6,
                            // borderWidth: 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: '50%',
                              height: 15,
                            }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontWeight: '500',
                                color: Colors.BLACK,
                                fontFamily: FontFamily.interBold,
                              }}>
                              {item.type} for Stay
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontSize: 11,
                                // color: Color.BLACK,
                                color: '#696969',
                                fontFamily: FontFamily.interMedium,
                              }}>
                              {item.location}{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              textAlign: 'right',
                              width: '40%',
                              fontSize: 14,
                              color: Colors.BLACK,
                              fontFamily: FontFamily.interMedium,
                            }}>
                            ₹ {formatRent(item.roomTypeRent[0].rent)}
                          </Text>
                        </View>
                      ) : null}
                      {item.type === 'Flat' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 30,
                            marginTop: 3,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '65%',
                              height: 15,
                              marginTop: 6,
                            }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontSize: 10,
                                // fontWeight: '500',
                                // color: Color.BLACK,
                                color: '#696969',
                                fontFamily: FontFamily.interMedium,
                              }}>
                              {item.area} sqft
                            </Text>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 20,
                                fontSize: 10,
                                fontWeight: '500',
                                color: Colors.BLACK,
                              }}>
                              {' '}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              width: width * 0.22,
                              height: height * 0.03,
                              backgroundColor: Color.colorRoyalblue_100,
                              borderRadius: 5,
                              marginTop: -4,
                              justifyContent: 'center',
                              alignItems: 'center',
                              // borderWidth: 1,
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                // fontSize: 11,
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                                fontFamily: FontFamily.interMedium,
                                fontSize: responsiveFontSize(1.2),
                              }}>
                              Contact Owner
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : item.type === 'PG' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 30,
                            marginTop: 3,
                            // borderWidth: 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '65%',
                              height: 15,
                              marginTop: 6,
                              paddingBottom: responsiveWidth(1),
                              // borderWidth: 1,
                            }}>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontSize: 10,

                                // fontWeight: '500',
                                // color: Color.BLACK,
                                color: '#696969',
                                fontFamily: FontFamily.interMedium,
                              }}>
                              Starting {item.roomTypeRent[0].type} Room{' '}
                            </Text>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 20,
                                fontSize: 10,
                                fontWeight: '500',
                                color: Colors.BLACK,
                              }}>
                              {' '}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              width: width * 0.22,
                              height: height * 0.03,
                              backgroundColor: Color.colorRoyalblue_100,
                              borderRadius: 5,
                              marginTop: -4,
                              justifyContent: 'center',
                              alignItems: 'center',

                              // borderWidth: 1,
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                // fontSize: 11,
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                                fontFamily: FontFamily.interMedium,
                                fontSize: responsiveFontSize(1.2),
                              }}>
                              Contact Owner
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            {/* <View style ={{backgroundColor:"#FFF",
        height:300,}}>
        <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    
                >
                    
                    <TouchableOpacity 
            // onPress={ () => houseproperty(route.params.data.type, item.propertyId)}
                        style={{
                            height:238,
                            elevation:3,
                            backgroundColor:"#FFF",
                            
                            alignContent:"center",
                           justifyContent:"center",
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:6,
                            width:"90%",
                            
        
                           marginHorizontal:20
                            
                            
                        }}
                    >
                        <ImageBackground
                              source={require("../image/sampleRoom.png")}
                              style={styles.featureBG}
                              imageStyle={{ borderRadius: 15 }}
                              
                            >
                             <Text style={styles.overlayText1}>
                                {item.preferredTenant}
                              </Text> 
                              <TouchableOpacity onPress={handleLikeToggle}>
                              <MaterialCommunityIcons
                                 name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? 'red' : 'black'} style={styles.overlayheart2}
                              />
                          </TouchableOpacity>
                            </ImageBackground>
                         <View style={{flexDirection:"row",width:"100%",height:30,marginTop:6}}>
                            <View style={{flexDirection:"column",width:"50%",height:15}}>
                                <Text style={{height:20,width:"auto",marginLeft:10,fontWeight:"500"}}>{item.bhkType} Flat for rent</Text>
                                <Text style={{height:20,width:"auto",marginLeft:10,fontSize:11,overflow:"hidden"}} numberOfLines={1} ellipsizeMode="tail">{item.accommodationName}, {item.location}</Text>
                                 </View>
                            <Text style={{textAlign:"right",width:"40%",fontSize:14}}>₹ {item.expectedRent}</Text>
                            </View>  
                            <View style={{flexDirection:"row",width:"100%",height:30,marginTop:3}}>
                            <View style={{flexDirection:"row",width:"65%",height:15,marginTop:6}}>
                                <Text style={{height:20,width:"auto",marginLeft:10,fontSize:10,fontWeight:"500"}}>{item.area}sqft</Text>
                                <Text style={{height:20,width:"auto",marginLeft:20,fontSize:10,fontWeight:"500"}}> {item.furnishing}</Text>
                                
                                 </View>
                                 <TouchableOpacity style={{width:95,height:25,backgroundColor:Color.colorRoyalblue_100,borderRadius:5,marginTop:-4}} ><Text style={{width:"auto",color:"white", fontSize:11,
                                paddingHorizontal:6,paddingVertical:4}}>Contact Owner</Text></TouchableOpacity>
                                </View> 
                            
                                    
                    </TouchableOpacity>

                </ScrollView>    



        </View> */}
          </View>
        </View>
      </ScrollView>

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
          onPress={() => handlePGproperty(result.type, result.property._id)}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: '700',
              fontSize: 16,
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Contact Owner
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    // height: height * 0.7,
    marginTop: -5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  navbar: {
    padding: 15,
    height: height * 0.05,
    backgroundColor: '#0C132A',
    borderRadius: 22,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button2: {
    padding: 15,
    height: height * 0.05,
    backgroundColor: Colors.YELLOW,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  ammenities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginLeft: 5,
    marginRight: 20,
  },
  overview: {
    marginTop: 20,
    marginLeft: 5,
  },
  suboverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 20,
  },
  group: {
    width: '30%', // Adjust the width to distribute space evenly
    height: 35,
    paddingHorizontal: 10, // Add consistent horizontal padding
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    size: 30,
    paddingTop: 10,
  },
  overviewRow1: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    height: 17,
    width: '100%', // Adjust width to fill the container
  },
  overviewRow2: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 17,
    width: '100%', // Adjust width to fill the container
    fontSize: 10,
    marginTop: 2,
  },
  overviewgroupColumn: {
    width: '100%', // Adjust width to fill the container
    marginLeft: 6,
  },
  iconRow: {
    height: 36,
    flexDirection: 'row',
    marginRight: -46,
  },
  groupRow: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between', // Add to evenly distribute columns
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  ammenity: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'left',
    marginRight: 10,
  },
  rect: {
    width: '95%',
    height: 2,
    backgroundColor: '#E6E6E6',
    marginTop: 25,
    marginHorizontal: 10,
  },
  overlayText1: {
    paddingHorizontal: 15,

    textAlign: 'center',
    fontSize: 11,
    backgroundColor: 'rgba(97, 85, 223, 1)',
    opacity: 1,
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 6,
    color: 'white',
    borderRadius: 5,
    marginLeft: 10,
    position: 'absolute', // positions the text relative to the parent
    top: 20, // adjusts the text to the bottom of the image
  },
  featureBG: {
    height: 170,
    width: 'auto',
  },
  container: {
    padding: 10,
  },
  ammenityContainer: {
    overflow: 'hidden',
  },
  ammenityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  rowPadding: {
    paddingTop: 5,
  },
  ammenityItem: {
    alignItems: 'center',
    width: '25%', // Each item takes up 25% of the row width
  },
  amenityText: {
    color: Colors.PRIMARY,
    textAlign: 'left',
    fontSize: 10,
  },
  showMoreButton: {
    marginTop: 5,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  showMoreText: {
    color: Colors.colorRoyalblue_100,
    fontSize: 12,
  },
  equipmentRow: {
    flexDirection: 'row',

    flexWrap: 'wrap',
    marginLeft: 10,
    marginBottom: 4,
  },
  rowPadding1: {
    paddingTop: 2,
  },
  equipmentItem: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 20,
    justifyContent: 'flex-start',
    width: '80%',
  },
  equipmentText: {
    fontWeight: '600',
    marginLeft: 35,
    color: Colors.colorRoyalblue_100,
  },
});
