import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

// import { SliderBox } from 'react-native-image-slider-box'
import Colors from '../Utils/Colors';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Color, FontFamily, FontSize, Border} from '../../GlobalStyles';
import {useRoute} from '@react-navigation/native';
import {
  ContactedProperty,
  featured,
  getpropertydetails,
} from '../apiservice/OwnerApi';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {FlatList} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
export default function ViewProperty({navigation}) {
  const [data, setData] = useState({});
  const route = useRoute();
  // useEffect(() => {
  //   if (route.params?.response) {
  //     const processedData = route.params.response || {};
  //     setData(processedData);
  //   }
  // }, [route.params?.response]);
  const {result} = route.params;
  console.log('🚀 ~ ViewProperty ~ result:', result);

  const [type, settype] = useState(false);

  // console.log("----start here--->");

  // console.log('Response:', JSON.stringify(result, null, 2));
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
    require('../image/room.jpg'),
  ];

  const PropertyDetails = {
    Title: result.property.accommodationDetails.bhkType,
    Type: result.type,
    City: result.property.locality.city,
    Street: result.property.locality.Street,
    Address: result.property.locality.Address,
    Price: result.property.rentalConditions.expectedRent,
    Deposit: result.property.rentalConditions.expectedDeposit,
    Bedroom: result.property.accommodationDetails.bhkType.slice(0, 1),
    Bathroom: result.property.amenities.bathroom,
    Balcony: result.property.amenities.balcony,

    Furnished: result.property.rentalConditions.furnishing,
    Maintanance: result.property.rentalConditions.monthlyMaintenance,
    PreferedTenant: result.property.rentalConditions.preferredTenant,
    Availability: result.property.rentalConditions.availableFromDate.slice(
      0,
      10,
    ),
    Parking: result.property.rentalConditions.parking,
    SqFt: result.property.accommodationDetails.area,
    Description: result.property.accommodationDetails.description,
  };
  const Amenities = ({amenities}) => {
    const trueAmenities = Object.entries(amenities).filter(
      ([key, value]) => value === true,
    );

    const amenitiesIcons = {
      gym: <MaterialIcons name="fitness-center" size={28} color="#000000" />,
      isNonVeg: <MaterialIcons name="restaurant" size={28} color="#000000" />,
      gatedSecurity: (
        <MaterialIcons name="security" size={28} color="#000000" />
      ),
      smokingAllowed: (
        <MaterialIcons name="smoking-rooms" size={28} color="#000000" />
      ),
      lift: <MaterialIcons name="elevator" size={28} color="#000000" />,
      internetConnection: <FontAwesome name="wifi" size={28} color="#000000" />,
      airConditioner: <MaterialIcons name="air" size={28} color="#000000" />,
      clubHouse: (
        <MaterialIcons name="local-activity" size={28} color="#000000" />
      ),
      intercom: <MaterialIcons name="call" size={28} color="#000000" />,
      swimmingPool: <MaterialIcons name="pool" size={28} color="#000000" />,
      powerBackup: <MaterialIcons name="power" size={28} color="#000000" />,
      fireSafety: (
        <MaterialIcons name="fire-extinguisher" size={28} color="#000000" />
      ),
      visitorParking: (
        <MaterialIcons name="local-parking" size={28} color="#000000" />
      ),
      shoppingCenter: (
        <MaterialIcons name="shopping-cart" size={28} color="#000000" />
      ),
      gasPipeline: (
        <MaterialIcons name="local-gas-station" size={28} color="#000000" />
      ),
      park: <MaterialIcons name="park" size={28} color="#000000" />,
      servantRoom: (
        <MaterialIcons name="room-service" size={28} color="#000000" />
      ),
      houseKeeping: (
        <MaterialIcons name="cleaning-services" size={28} color="#000000" />
      ),
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
      outputRange: [maxVisibleRows * 60, groupedAmenities.length * 60], // Adjust height according to your needs
    });

    return (
      <View
        style={[
          styles.container,
          {
            width: width,
            height: 'auto',
            // borderWidth: 1,
            backgroundColor: 'white',
          },
        ]}>
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

  const handleFlatproperty = async (Type, id) => {
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
            uri: `http://93.127.185.101:8005/api/utils/get-image/${item}`,
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
  // image validation
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

  return (
    <>
      <ScrollView>
        <View style={{backgroundColor: '#fff'}}>
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
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={'#fff'} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <AntDesign name="sharealt" size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: width * 0.05}}>
                  <AntDesign name="hearto" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>
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
              <View style={{alignItems: 'Left'}}>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'left',
                    // fontSize: 15,
                    paddingStart: 10,
                    // fontWeight: 'bold',
                    fontFamily: FontFamily.interBold,
                    fontSize: responsiveFontSize(2),
                  }}>
                  {PropertyDetails.Title} {PropertyDetails.Type} in{' '}
                  {PropertyDetails.City}
                </Text>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'left',
                    // fontSize: 10,
                    fontFamily: FontFamily.interMedium,
                    fontSize: responsiveFontSize(1.5),
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
                    fontFamily: FontFamily.interBold,
                    fontSize: responsiveFontSize(2),
                    paddingStart: 20,
                  }}>
                  ₹ {PropertyDetails.Price} / Month
                </Text>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textAlign: 'right',
                    fontFamily: FontFamily.interMedium,
                    fontSize: responsiveFontSize(1.5),
                    paddingStart: 20,
                  }}>
                  (₹ {PropertyDetails.Deposit} Deposit)
                </Text>
              </View>
            </View>

            <View style={styles.ammenities}>
              <View style={{alignItems: 'Left'}}>
                <Text
                  style={{
                    // color: Colors.PRIMARY,
                    textAlign: 'left',
                    fontFamily: FontFamily.interMedium,
                    color: '#434343',
                    fontSize: responsiveFontSize(1.5),
                    paddingStart: 10,
                  }}>
                  <Ionicons name="bed" size={12} color="#000000" />{' '}
                  {PropertyDetails.Bedroom} Bedrooms
                </Text>
              </View>

              <View style={{alignItems: 'Left'}}>
                <Text
                  style={{
                    // color: Colors.PRIMARY,
                    textAlign: 'left',
                    fontFamily: FontFamily.interMedium,
                    color: '#434343',
                    fontSize: responsiveFontSize(1.5),
                    paddingStart: 10,
                  }}>
                  <FontAwesome5 name="bath" size={12} color="#000000" />{' '}
                  {PropertyDetails.Bathroom} Bathrooms
                </Text>
              </View>

              <View style={{alignItems: 'Left'}}>
                <Text
                  style={{
                    // color: Colors.PRIMARY,
                    textAlign: 'left',
                    fontFamily: FontFamily.interMedium,
                    color: '#434343',
                    fontSize: responsiveFontSize(1.5),
                    paddingStart: 10,
                  }}>
                  <MaterialCommunityIcons
                    name="balcony"
                    size={12}
                    color="#000000"
                  />{' '}
                  {PropertyDetails.Balcony} Balcony
                </Text>
              </View>

              <View style={{alignItems: 'Left'}}>
                <Text
                  style={{
                    // color: Colors.PRIMARY,
                    textAlign: 'left',
                    fontFamily: FontFamily.interMedium,
                    color: '#434343',
                    fontSize: responsiveFontSize(1.5),
                    paddingStart: 10,
                  }}>
                  | {PropertyDetails.Title}
                </Text>
              </View>
            </View>

            <View style={styles.rect}></View>
            <View
              style={{
                // marginTop: -10,
                marginVertical: responsiveWidth(2.5),
                marginLeft: 20,
                // borderWidth: 1,
              }}>
              <Text
                style={{
                  color: Color.colorBlack,
                  fontFamily: FontFamily.interMedium,
                  fontSize: responsiveFontSize(2),
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
                    <Text style={[styles.overviewRow1]}>
                      {PropertyDetails.Furnished}
                    </Text>
                    <Text style={styles.overviewRow2}>Furnishing Status</Text>
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
                    <Text style={styles.overviewRow2}>Maintainance</Text>
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
                    <Text style={styles.overviewRow1}>
                      {PropertyDetails.Availability}
                    </Text>
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
                    <Text style={styles.overviewRow2}>sq. ft</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.rect}></View>

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  color: Color.colorBlack,
                  fontFamily: FontFamily.interMedium,
                  fontSize: responsiveFontSize(2),
                }}>
                Description
              </Text>
              <Text
                style={{
                  paddingTop: 8,
                  color: '#434343',
                  fontFamily: FontFamily.interMedium,
                  fontSize: responsiveFontSize(1.5),
                  // marginLeft: 5,
                  marginRight: 5,
                }}>
                {PropertyDetails.Description}
              </Text>
            </View>

            <View style={styles.rect}></View>

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  color: Color.colorBlack,
                  fontFamily: FontFamily.interMedium,
                  fontSize: responsiveFontSize(2),
                }}>
                Ammenities
              </Text>
            </View>

            <Amenities amenities={result.property.amenities} />

            <View style={styles.rect}></View>

            {/* <View  style={{ marginTop:10,padding:20,height:250,width:"90%"} } >
            <Text style={{ fontWeight:'bold',fontSize:15} }>View On Map </Text>
        </View> */}

            <View style={{marginTop: -10, padding: 20}}>
              <Text
                style={{
                  fontFamily: FontFamily.interMedium,
                  color: '#434343',
                  fontSize: responsiveFontSize(2),
                  textAlign: 'center',
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
                        height: height * 0.285,
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
          onPress={() => handleFlatproperty(result.type, result.property._id)}>
          <Text
            style={{
              color: '#FFF',
              // fontWeight: '700',
              // fontSize: 16,
              fontFamily: FontFamily.interBold,
              fontSize: responsiveFontSize(2),
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
    // height: '70%',
    marginTop: -5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderWidth: 1,
  },
  navbar: {
    padding: 15,
    height: 50,
    backgroundColor: '#0C132A',
    borderRadius: 22,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button2: {
    padding: 15,
    height: 50,
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
    marginLeft: 5,
    marginRight: 20,
  },
  ammenities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 20,
    // borderWidth: 1,
    marginBottom: responsiveWidth(2.5),
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
    fontFamily: FontFamily.interMedium,
    color: '#434343',
    fontSize: responsiveFontSize(1.5),
    height: 17,
    width: '100%', // Adjust width to fill the container
  },
  overviewRow2: {
    fontFamily: FontFamily.interRegular,
    color: '#55555',
    fontSize: responsiveFontSize(1.2),
    height: 17,
    width: '100%', // Adjust width to fill the container

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
    marginBottom: responsiveWidth(2.5),
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
    // marginTop: 25,
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
    padding: 5,
  },
  ammenityContainer: {
    overflow: 'hidden',
  },
  ammenityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  rowPadding: {
    paddingTop: 20,
  },
  ammenityItem: {
    alignItems: 'center',
    width: '25%', // Each item takes up 25% of the row width
  },
  amenityText: {
    color: '#55555',
    textAlign: 'left',
    fontFamily: FontFamily.interSemiBold,
    fontSize: responsiveFontSize(1.2),
  },
  showMoreButton: {
    marginTop: 5,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  showMoreText: {
    color: '#5E17EB',
    fontFamily: FontFamily.interMedium,
    // fontSize: 12,
    fontSize: responsiveFontSize(1.5),
  },
});
