import React, { useState,useEffect,useCallback } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text,  ImageBackground,Image,FlatList,Dimensions } from "react-native";
import  EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation } from '@react-navigation/native';
import HeaderT from '../components/main/SearchPGH'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useRoute } from '@react-navigation/native';
import Color from '../Utils/Colors'
import { ScrollView } from "react-native-gesture-handler";
import { getPhoto, getpropertydetails } from "../apiservice/OwnerApi";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
const { width, height } = Dimensions.get("window");
function PGSearch(props)  {

  const [imagenew, setnewImage] = useState([]);
  const [refresh,setRefresh] = useState(false);

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
       
      }, [fetchPHOTO,refresh] );

    //data 

    const route = useRoute();
    const [data, setData] = useState([]);
    const dataCount = data.length;
    const {Search} = route.params;
    const {dataflat } = route.params;
  
    console.log(Search.selectCity)
    useEffect(() => {
        if (route.params?.data) {
          const processedData = route.params.data.map(item => {
            const topRoomTypes = item.roomTypeRent ? item.roomTypeRent.slice(0, 2) : [];
            const minPrices = item.roomTypeRent ? item.roomTypeRent.reduce((acc, room) => {
              if (!acc[room.type] || room.rent < acc[room.type]) {
                acc[room.type] = room.rent;
              }
              return acc;
            }, {}) : {};
            return { ...item, topRoomTypes, minPrices };
          });
          setData(processedData);
        }
      }, [route.params?.data]);
    


    const [isLiked, setIsLiked] = useState(false);
   
    const handleLikeToggle = () => {
        // Logic to toggle like status and update backend
        setIsLiked(!isLiked);
       
        // console.log(`Product ${productId} liked by user ${userId}`);
      };

    const navigation = useNavigation();

    const Pgproperty = async(type,id) =>{
        console.log(type);
        console.log(id);
        console.log("hello");
        // navigation.navigate('ViewProperty')
        try {
            
            const response = await getpropertydetails(type,id);
            const result = await response.json();

    //   // Beautify and log the response
      console.log('Response:', JSON.stringify(result, null, 2));
            if (response.status == 201) {

                
                navigation.navigate('ViewPropertyP',{result});
               
                console.log("successfull");
            } else {
              console.log(error);
            }
        } catch (error) {
            console.log(error);
            
        } finally {
           console.log("done");
        }
        };

    return (
        <>
        <View style={styles.container}>
            <HeaderT  dataFlat={dataflat}/>
            <View style={{marginTop:10,marginLeft:15}}>
                <Text style={{color:Color.BLACK}}>Yay! <Text style={styles.bold1}>{dataCount}</Text> result found in <Text style={styles.bold1}>{Search.selectCity}</Text></Text>
            </View>
            <View style ={{backgroundColor:"#FFF",
        height:"auto",width:"100%"}}>
           <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={ () => Pgproperty('PG', item.propertyId)}
          key={item.propertyId}
          style={{
            height: height*0.280,
            elevation: 3,
            backgroundColor: "#FFF",
            alignContent: "center",
            marginTop: height*0.020,
            borderRadius: 15,
            marginBottom: 6,
            width: "90%",
            marginHorizontal: 20
          }}
        >
          <ImageBackground
            source={require("../image/sampleRoom.png")}
            style={{ height: height*0.185, justifyContent: "center", alignItems: "center", borderRadius: 15 }}
            imageStyle={{ borderRadius: 15 }}
          >
            <Text style={styles.overlayText1}>
              For {item.preferredTenant}
            </Text>
            <TouchableOpacity onPress={handleLikeToggle}  style={styles.overlayheart2}>
              <MaterialCommunityIcons
                name={isLiked ? "heart" : "heart-outline"}
                size={responsiveFontSize(2.5)}
                color={isLiked ? 'red' : 'black'}
                style={{ position: 'absolute', top: 10, right: 10 }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{ flexDirection: "row", width: "100%", height: height*0.030, marginTop: 6 }}>
            <View style={{ flexDirection: "column", width: "50%", height: 15 }}>
              <Text style={{ height: height*0.020, width: "auto", marginLeft: 10, fontWeight: "500",color:Color.BLACK }}>PG for Stay</Text>
              <Text style={{ height: height*0.020, width: "auto", marginLeft: 10, fontSize: 11,color:Color.BLACK  }}>{item.location}</Text>
            </View>
            <Text style={{ textAlign: "right", width: "40%", fontSize: 14 ,color:Color.BLACK }}>
              ₹ {Math.min(...Object.values(item.minPrices || {}))}
            </Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%", height: 30, marginTop: 8 }}>
            {item.topRoomTypes.map((room, index) => (
              <View key={index} style={{ flexDirection: "column", width: "50%", height: 15, marginTop: 6 }}>
                <Text style={{ height: height*0.020, width: "auto", marginLeft: 10, fontSize: 10, fontWeight: "500",color:Color.BLACK  }}>
                  {room.type} Room With AC
                </Text>
                <Text style={{ textAlign: "left", width: "auto", fontSize: 10, marginLeft: 10 ,color:Color.BLACK }}>₹ {room.rent}</Text>
              </View>
            ))}
            
            <TouchableOpacity
              style={{
                width: width*0.22,
                height: height*0.025,
                backgroundColor: "blue",
                borderRadius: 5,
               
                position:"absolute",
                bottom:5,
                right:5
              }}
            >
              <Text
                style={{
                  width: "auto",
                  color: "white",
                  fontSize: 11,
                  paddingHorizontal: responsiveWidth(1),
                  paddingVertical: responsiveHeight(0.3)
                }}
              >
                Contact Owner
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
            </View>
           
         </View>
         <View style={{flexDirection:"row"}}>
        <View  style={styles.navbar} >
            
            <TouchableOpacity style={{alignItems:'center'}}
             onPress={()=>navigation.navigate("PgFilterby")}
            >
            <MaterialCommunityIcons name="filter-outline" size={24} color='#ffffff'/>

            <Text style={{color:Color.WHITE,textAlign:'left', fontSize:10}}>
                Filter by
            </Text>

            </TouchableOpacity >

            <TouchableOpacity style={{alignItems:'center'}}
            onPress={()=>navigation.navigate("#")}
            >
            <MaterialCommunityIcons name="cards-heart-outline" size={24} color='#ffffff'/>
            <Text style={{color:Color.WHITE,textAlign:'left', fontSize:10}}>
                Saved
            </Text>

            </TouchableOpacity >

            <TouchableOpacity style={{alignItems:'center'}}
            onPress={()=>navigation.navigate("#")}
            >
            <MaterialCommunityIcons name="google-maps" size={24} color='#ffffff'/>
            <Text style={{color:Color.WHITE,textAlign:'left', fontSize:10}}>
                Map View
            </Text>

            </TouchableOpacity>


            


        </View>
        <View style={{height:height*0.070,width:height*0.070,backgroundColor:'#0C132A',marginVertical:height*0.024,borderRadius:height*0.050}}
                          >
                            <Image    source={{ uri: `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}` }}
              
                            
                            style={{height:height*0.060,width:height*0.060,borderRadius:height*0.050,marginHorizontal:5,marginVertical:5}}/>
                         </View>
        </View>
         </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    bold1:{
        fontWeight:"500",
        color:Color.BLACK
    },
    featureBG:{
        height: height*0.20,
        width:"auto",
    },
    overlayText1: {
        paddingHorizontal: 15,
        left:10,
        textAlign:"center",
        fontSize: responsiveFontSize(1.1),
        backgroundColor:"rgba(97, 85, 223, 1)",
        opacity:1,
        fontWeight: "500",
        paddingTop: 5,
        paddingBottom: 6,
        color:"white",
        borderRadius: 5,
       
        position: 'absolute', // positions the text relative to the parent
        top: height*0.020, // adjusts the text to the bottom of the image
      }
      ,
      overlayheart2: {
  
        opacity:1,
  
        right:10,
        position: 'absolute', // positions the text relative to the parent
        top: 20, // adjusts the text to the bottom of the image
      }
      ,
      loginImage:{
        width: 230,
        height: height*0.450,
        marginTop:70,
        borderwidth:4,
        borderColor:Color.BLACK,
        borderRadius:15
    },
    subContainer:{
        width:'100%',
        backgroundColor:Color.WHITE,
        height:'90%',
        marginTop:2,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    navbar:{
        padding:15,
        height:height*0.080,
        backgroundColor:"#0C132A",
        borderRadius:22,
        marginTop:height*0.020,
        marginLeft:15,
        marginRight:5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom:15,
        width:"75%"
    },
    circle:{
        backgroundColor:"#0C132A",
        borderRadius:height*0.100,
        height:height*0.080,
        width:"18%",
        marginTop: 20,
        padding:15,
    },
    button2:{
        padding:15,
        height:50,
        backgroundColor:Color.YELLOW,
        borderRadius:50,
        marginTop:20,
        marginLeft:15,
        marginRight:15
    

    }
    
});

export default PGSearch;
