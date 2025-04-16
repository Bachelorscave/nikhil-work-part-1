import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import HeaderT from '../components/main/SearchH';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import Color from '../Utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {getPhoto, getpropertydetails} from '../apiservice/OwnerApi';
const {width, height} = Dimensions.get('window');
function SearchT(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const dataCount = data.length;
  const {SearchL} = route.params;
  const {dataflat} = route.params;
  console.log(SearchL.selectCity);
  useEffect(() => {
    if (route.params?.data) {
      const processedData = route.params.data.properties || [];
      setData(processedData);
    }
  }, [route.params?.data]);

  const [imagenew, setnewImage] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchPHOTO = useCallback(async () => {
    try {
      const jsonData = await getPhoto();
      if (jsonData) {
        // setShorlisted(jsonData);
        setnewImage(jsonData);

        console.log('Shortlisted photo:', jsonData);
        console.log('Shortlisted photo:', imagenew);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchPHOTO();
  }, [fetchPHOTO, refresh]);

  const handleLikeToggle = () => {
    // Logic to toggle like status and update backend
    setIsLiked(!isLiked);

    // console.log(`Product ${productId} liked by user ${userId}`);
  };
  const houseproperty = async (type, id) => {
    console.log(type);
    console.log(id);
    console.log('hello');
    // navigation.navigate('ViewProperty')
    try {
      const response = await getpropertydetails(type, id);
      const result = await response.json();

      //   // Beautify and log the response
      console.log('Response:', JSON.stringify(result, null, 2));
      if (response.status == 201) {
        navigation.navigate('ViewProperty', {result});
        console.log('successfull');
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
      <View style={styles.container}>
        <HeaderT dataflat={dataflat} />
        <View style={{marginLeft: 15}}>
          <Text style={{color: Color.BLACK}}>
            Yay! <Text style={styles.bold1}>{dataCount}</Text> result found in{' '}
            <Text style={styles.bold1}>{SearchL.selectCity}</Text>
          </Text>
        </View>
        <View style={{backgroundColor: '#FFF', height: 'auto', width: width}}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.propertyId || index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  houseproperty(route.params.data.type, item.propertyId)
                }
                style={{
                  height: height * 0.26, // Responsive height (25% of screen height)
                  elevation: 3,
                  backgroundColor: '#FFF',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginTop: height * 0.02, // Responsive top margin (2.5% of screen height)
                  borderRadius: width * 0.04, // Responsive border radius (4% of screen width)
                  marginBottom: height * 0.008, // Responsive bottom margin (0.8% of screen height)
                  width: width * 0.9, // Responsive width (90% of screen width)
                  marginHorizontal: width * 0.05,
                  // borderWidth: 1,
                  paddingBottom: width * 0.025,
                }}>
                <ImageBackground
                  source={require('../image/sampleRoom.png')}
                  style={styles.featureBG}
                  imageStyle={{borderRadius: width * 0.025}}>
                  <Text style={styles.overlayText1}>
                    {item.preferredTenant}
                  </Text>
                  <TouchableOpacity onPress={handleLikeToggle}>
                    <MaterialCommunityIcons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isLiked ? 'red' : 'black'}
                      style={styles.overlayheart2}
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width,
                    height: height * 0.03,
                    marginTop: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: width * 0.4,
                      height: height * 0.015,
                    }}>
                    <Text
                      style={{
                        height: height * 0.02,
                        width: 'auto',
                        marginLeft: 10,
                        fontWeight: '500',
                        color: Color.BLACK,
                      }}>
                      {item.bhkType} Flat for rent
                    </Text>
                    <Text
                      style={{
                        height: height * 0.02,
                        width: 'auto',
                        marginLeft: 10,
                        fontSize: 11,
                        overflow: 'hidden',
                        color: Color.BLACK,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.accommodationName}, {item.location}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'right',
                      width: width * 0.4,
                      fontSize: 14,
                      color: Color.BLACK,
                    }}>
                    ₹ {item.expectedRent}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width,
                    // height: 30,
                    // borderWidth: 1,
                    marginTop: 3,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.65,
                      height: 15,
                      marginTop: 6,
                    }}>
                    <Text
                      style={{
                        height: height * 0.02,
                        width: 'auto',
                        marginLeft: 10,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.BLACK,
                      }}>
                      {item.area}sqft
                    </Text>
                    <Text
                      style={{
                        height: height * 0.02,
                        width: 'auto',
                        marginLeft: 20,
                        fontSize: 10,
                        fontWeight: '500',
                        color: Color.BLACK,
                      }}>
                      {' '}
                      {item.furnishing}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: width * 0.22,
                      height: height * 0.03,
                      backgroundColor: Color.colorRoyalblue_100,
                      borderRadius: 5,
                      marginTop: -4,
                    }}>
                    <Text
                      style={{
                        width: 'auto',
                        color: 'white',
                        fontSize: 11,
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        color: Color.WHITE,
                      }}>
                      Contact Owner
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('Filterby')}>
            <MaterialCommunityIcons
              name="filter-outline"
              size={24}
              color="#ffffff"
            />

            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Filter by
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('#')}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={24}
              color="#ffffff"
            />
            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Saved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('#')}>
            <MaterialCommunityIcons
              name="google-maps"
              size={24}
              color="#ffffff"
            />
            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Map View
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: height * 0.075,
            width: height * 0.075,
            backgroundColor: '#0C132A',
            marginVertical: 24,
            borderRadius: 50,
          }}>
          <Image
            source={{
              uri: `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}`,
            }}
            style={{
              height: height * 0.06,
              width: height * 0.06,
              borderRadius: 50,
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bold1: {
    fontWeight: '500',
    color: Color.BLACK,
  },
  featureBG: {
    height: height * 0.2, // Adjusted for responsiveness
    width: 'auto',
  },
  overlayText1: {
    paddingHorizontal: width * 0.03, // Responsive padding
    textAlign: 'center',
    fontSize: width * 0.025, // Responsive font size
    backgroundColor: 'rgba(97, 85, 223, 1)',
    opacity: 1,
    fontWeight: '500',
    paddingTop: height * 0.006, // Responsive padding
    paddingBottom: height * 0.006, // Responsive padding
    color: 'white',
    borderRadius: width * 0.02, // Responsive border radius
    marginLeft: width * 0.025, // Responsive margin
    position: 'absolute',
    top: height * 0.02, // Responsive top position
  },
  overlayheart2: {
    opacity: 1,
    right: width * 0.025, // Responsive right position
    position: 'absolute',
    top: height * 0.015, // Responsive top position
  },
  loginImage: {
    width: width * 0.6, // Responsive width
    height: height * 0.6, // Responsive height
    marginTop: height * 0.1, // Responsive margin top
    borderWidth: 4,
    borderColor: Color.BLACK,
    borderRadius: width * 0.04, // Responsive border radius
  },
  subContainer: {
    width: '100%',
    backgroundColor: Color.WHITE,
    height: height * 0.9, // Responsive height
    marginTop: height * 0.01, // Responsive margin top
    borderTopLeftRadius: width * 0.08, // Responsive border radius
    borderTopRightRadius: width * 0.08, // Responsive border radius
  },
  navbar: {
    padding: width * 0.04, // Responsive padding
    height: height * 0.1, // Responsive height
    backgroundColor: '#0C132A',
    borderRadius: width * 0.06, // Responsive border radius
    marginTop: height * 0.02, // Responsive margin top
    marginLeft: width * 0.04, // Responsive margin left
    marginRight: width * 0.02, // Responsive margin right
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin bottom
    width: width * 0.75, // Responsive width
  },
  circle: {
    backgroundColor: '#0C132A',
    borderRadius: 100,
    height: height * 0.1, // Responsive height
    width: width * 0.18, // Responsive width
    marginTop: height * 0.03, // Responsive margin top
    padding: width * 0.04, // Responsive padding
  },
  button2: {
    padding: width * 0.04, // Responsive padding
    height: height * 0.06, // Responsive height
    backgroundColor: Color.YELLOW,
    borderRadius: width * 0.125, // Responsive border radius
    marginTop: height * 0.03, // Responsive margin top
    marginLeft: width * 0.04, // Responsive margin left
    marginRight: width * 0.04, // Responsive margin right
  },
});
export default SearchT;
