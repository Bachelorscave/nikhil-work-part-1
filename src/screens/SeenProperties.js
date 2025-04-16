import React ,{useState,useEffect,useCallback} from "react";
import { StyleSheet, View, Image, Text, Dimensions,TouchableOpacity,ScrollView,ImageBackground,Linking,Platform  } from "react-native";

import HeaderT from "../components/main/Tentantheader"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { BookSiteVisit, GetSeenResponses } from "../apiservice/OwnerApi";

const { width, height } = Dimensions.get("window");

function SeenProperties(props) {
  const [activeTab, setActiveTab] = useState("All");
  const [refresh, setRefresh] = useState(false);
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [listing, setListing] = useState([]);
  const [flats, setFlats] = useState([]);
  const [pgs, setPgs] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const jsonData = await GetSeenResponses();
      if (jsonData) {
        setListing(jsonData);
        console.log('Listing:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]);

  useEffect(() => {
    const filteredFlats = listing.filter(item => item.propertyDetails.type === 'Flat');
    const filteredPgs = listing.filter(item => item.propertyDetails.type === 'PG');

    setFlats(filteredFlats);
    setPgs(filteredPgs);

    
  }, [listing]);

  console.log("---> woring");
    console.log(JSON.stringify(listing, null, 2));
    console.log("---> Flat");
    console.log(JSON.stringify(flats, null, 2));
    console.log("---> Pg");
    console.log(JSON.stringify(pgs, null, 2));

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const getFirstNonZeroRent = (item) => {
      if (item.propertyDetails.rent.single !== 0) return item.propertyDetails.rent.single;
      if (item.propertyDetails.rent.double !== 0) return item.propertyDetails.rent.double;
      if (item.propertyDetails.rent.triple !== 0) return item.propertyDetails.rent.triple;
      if (item.propertyDetails.rent.four !== 0) return item.propertyDetails.rent.four;
      return null;  // Return null if all are zero
    };
  const navigation = useNavigation();

  const makeCall = (number) => {
    console.log('hello');
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const handleBooking = async (type,id) => {

    console.log("checking id ::::------------>",type);
    console.log("checking id ::::------------>",id);
      //  Make the API call to update the contact status
       try {
           const response = await BookSiteVisit(type,id);
           console.log(response);
           if (response.status === 201) {
             console.log("successfull work");
             ToastAndroid.showWithGravityAndOffset(
              'Booked visit Cancelled!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
                 setRefresh(prev => !prev);
           }
           if (response.status === 200) {
            console.log("successfull done");
            ToastAndroid.showWithGravityAndOffset(
              'Booked Visit Successful!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            setRefresh(prev => !prev);
          }
           else {
             console.log(error);
           }
         }
       catch (error) {
           console.error(error);
       }
   };
  return (
    <View style={styles.container}>
    <HeaderT />

   
    <View style ={{backgroundColor:"#FFF",
        height:"auto",width:"95%",borderWidth:1,borderColor:Color.GREY,marginTop:5,borderRadius:6,elevation:1,flex:1}}>
     <View style={{
      
      
     marginBottom:height*0.02,
      width: "100%",
      marginHorizontal:5,
      height:height*0.068
    }}>
      <View style={{marginVertical:5,marginLeft:10}}><Text style={{fontWeight:"500",color:Color.BLACK}}>Seen Properties</Text></View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "All" && styles.activeTab
          ]}
          onPress={() => handleTabClick("All")}
        >
          <Text style={[styles.tabText, activeTab === "All" && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "Rent" && styles.activeTab
          ]}
          onPress={() => handleTabClick("Rent")}
        >
          <Text style={[styles.tabText, activeTab === "Rent" && styles.activeTabText]}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "Pg/hostel" && styles.activeTab
          ]}
          onPress={() => handleTabClick("Pg/hostel")}
        >
          <Text style={[styles.tabText, activeTab === "Pg/hostel" && styles.activeTabText]}>Pg/hostel</Text>
        </TouchableOpacity>
      </View>
    
    </View>  
    {activeTab === "All" && (
     <ScrollView style={{width:"100%"}}>
                    
                
     {listing.map((item, index) => (
     <TouchableOpacity 
         // onPress={()=>navigation.navigate("Login")}
         key={index}
         style={{
             height:height*0.147,
             elevation:3,
             backgroundColor:"#FFF",
             
            marginHorizontal:10,
             marginTop:height*0.020,
             borderRadius:15,
             marginBottom:6,
             width:"95%"
         }}
     >
       <View style={{flexDirection:"row"}}>
      
         <ImageBackground
                source={{ uri: `http://93.127.185.101:8005/api/utils/get-image/${item.propertyDetails.photos[0]}` }}
               style={{width:width*0.270,height:height*0.147,marginRight:5}}
               imageStyle={{ width:width*0.270,height:height*0.147,overflow:"hidden",borderTopLeftRadius:15,borderBottomLeftRadius:15 }}
               
               
             >
              <Text style={styles.overlayText1}>
                 {item.propertyDetails.preferredTenant}
               </Text>
             </ImageBackground>
             {item.propertyDetails.type === 'Flat' ? (
             <View style={{flexDirection:"column",width:"100%",height:height*0.030,marginTop:4}}>
                   <View style={{width:"100%",height:10,flexDirection:"row"}}>
                       <Text style={{height:12,width:"60%",marginLeft:18,fontWeight:"200",fontSize:8,textAlign:"right",color:Color.BLACK}}>7 days ago</Text>
                       
                  </View>
               <View style={{flexDirection:"row",height:height*0.085}}>
                  <View style={{flexDirection:"column",width:"50%",height:height*0.019,marginTop:4}}>
                             <Text style={{height:height*0.020,width:"auto",marginLeft:10,fontWeight:"500",color:Color.BLACK}}>{item.propertyDetails.type} for Rent</Text>
                             <Text style={{height:height*0.020,width:width*0.3,marginLeft:10,fontSize:11,color:Color.BLACK,overflow:"hidden"}}numberOfLines={1} ellipsizeMode="tail"> {item.propertyDetails.location}</Text>
                             <Text style={{height:height*0.020,width:"auto",marginLeft:12,fontSize:15,marginTop:10,color:Color.BLACK}}> ₹ {item.propertyDetails.rent}</Text>
                  </View>
                  <View style={{flexDirection:"column", borderColor:Color.colorDimgray_100, backgroundColor:"white", paddingVertical:4,marginTop:height*0.025,
                  marginLeft:-15,height:height*0.035}}>
                             <Text style={{fontSize:10,textAlign:"center",borderBottomWidth:0.5,width:"100%",paddingHorizontal:6,paddingBottom:2,color:Color.BLACK}}>{item.ownerDetails.ownerName}</Text>
                             <Text style={{fontSize:10,textAlign:"center",paddingBottom:2,paddingVertical:2,color:Color.BLACK}}>+91{item.ownerDetails.ownerMobile}  </Text>

                  </View>

                  </View>
                  <View style={{flexDirection:"row",width:"100%",height:height*0.030,marginTop:3}}>
             <View style={{flexDirection:"row",width:"35%",height:15,marginTop:6,marginLeft:10}}>
               <TouchableOpacity style={{flexDirection:"row"}}>
             <MaterialIcons name="photo-library" size={14} color='#000000' style={{marginRight:5}} />
                 <Text style={{height:height*0.020,width:width*0.220,marginLeft:2,fontSize:10,textDecorationLine: "underline",color:Color.BLACK}}>
                 
                   See Photos</Text></TouchableOpacity>
                 

                  </View>
                  <View style={{marginRight:5}}>
                  <TouchableOpacity style={{width:"100%",height:20,backgroundColor: item.isSiteVisitBooked ? Color.WHITE : Color.colorRoyalblue_100,borderRadius:5,marginTop:-2,borderColor:Color.GREY,borderWidth:0.5}}
                                 onPress={() => handleBooking(item.propertyDetails.type,item.propertyDetails.propertyId)}
                                 >
                                  
                                  <Text style={{width:"100%",color: item.isSiteVisitBooked ?  Color.colorRoyalblue_100: Color.WHITE, fontSize:8,
                                paddingHorizontal:6,paddingVertical:4}}
                                
                                >{item.isSiteVisitBooked ? 'Booked' : 'Book Visit'}</Text>
                                </TouchableOpacity>
                 </View>
                 <View>
                                <TouchableOpacity style={{width:"auto",height:height*0.020,
                                           backgroundColor: item.isContacted === 'no' ? Color.colorRoyalblue_100 : Color.WHITE,
                                            borderRadius:5,marginTop:-2,borderWidth:0.5,borderColor:Color.GREY}} 
                                   onPress={() => makeCall(item.ownerDetails.ownerMobile)}
                                    >
                                     <Text style={{width:"100%",color: item.isContacted === 'no' ? Color.WHITE : Color.colorRoyalblue_100, fontSize:8,
                                       paddingHorizontal:6,paddingVertical:4}}>{item.isContacted === 'no' ? 'Contact' : 'Contacted'}</Text></TouchableOpacity>
                                
                                </View>
                 </View> 
                 
             
             
             </View>  
            ): item.propertyDetails.type === 'PG' ? ( getFirstNonZeroRent(item) && (
            
             
              <View style={{flexDirection:"column",width:"100%",height:height*0.030,marginTop:4}}>
              <View style={{width:"100%",height:10,flexDirection:"row"}}>
                  <Text style={{height:12,width:"60%",marginLeft:18,fontWeight:"200",fontSize:8,textAlign:"right",color:Color.BLACK}}>7 days ago</Text>
                  
             </View>
          <View style={{flexDirection:"row",height:height*0.085}}>
             <View style={{flexDirection:"column",width:"50%",height:height*0.019,marginTop:4}}>
                        <Text style={{height:height*0.020,width:"auto",marginLeft:10,fontWeight:"500",color:Color.BLACK}}>{item.propertyDetails.type} for Rent</Text>
                        <Text style={{height:height*0.020,width:width*0.3,marginLeft:10,fontSize:11,color:Color.BLACK,overflow:"hidden"}} numberOfLines={1} ellipsizeMode="tail"> {item.propertyDetails.location}</Text>
                             <Text style={{height:height*0.020,width:"auto",marginLeft:12,fontSize:15,marginTop:10}}> ₹ {getFirstNonZeroRent(item)} </Text>
                  </View>
                  <View style={{flexDirection:"column", borderColor:Color.colorDimgray_100, backgroundColor:"white", paddingVertical:4,marginTop:height*0.025,
                  marginLeft:-15,height:height*0.035}}>
                             <Text style={{fontSize:10,textAlign:"center",borderBottomWidth:0.5,width:"100%",paddingHorizontal:6,paddingBottom:2,color:Color.BLACK}}>{item.ownerDetails.ownerName}</Text>
                             <Text style={{fontSize:10,textAlign:"center",paddingBottom:2,paddingVertical:2,color:Color.BLACK}}>+91{item.ownerDetails.ownerMobile}  </Text>

                  </View>

                  </View>
                  <View style={{flexDirection:"row",width:"100%",height:height*0.030,marginTop:3}}>
             <View style={{flexDirection:"row",width:"35%",height:15,marginTop:6,marginLeft:10}}>
               <TouchableOpacity style={{flexDirection:"row"}}>
             <MaterialIcons name="photo-library" size={14} color='#000000' style={{marginRight:5}} />
                 <Text style={{height:height*0.020,width:width*0.220,marginLeft:2,fontSize:10,textDecorationLine: "underline",color:Color.BLACK}}>
                 
                   See Photos</Text></TouchableOpacity>
                 

                  </View>
                  <View style={{marginRight:5}}>
                  <TouchableOpacity style={{width:"100%",height:20,backgroundColor: item.isSiteVisitBooked ? Color.WHITE : Color.colorRoyalblue_100,borderRadius:5,marginTop:-2,borderColor:Color.GREY,borderWidth:0.5}}
                                 onPress={() => handleBooking(item.propertyDetails.type,item.propertyDetails.propertyId)}
                                 >
                                  
                                  <Text style={{width:"100%",color: item.isSiteVisitBooked ?  Color.colorRoyalblue_100: Color.WHITE, fontSize:8,
                                paddingHorizontal:6,paddingVertical:4}}
                                
                                >{item.isSiteVisitBooked ? 'Booked' : 'Book Visit'}</Text>
                                </TouchableOpacity>
                 </View>
                 <View>
                                <TouchableOpacity style={{width:"auto",height:height*0.020,
                                           backgroundColor: item.isContacted === 'no' ? Color.colorRoyalblue_100 : Color.WHITE,
                                            borderRadius:5,marginTop:-2,borderWidth:0.5,borderColor:Color.GREY}} 
                                   onPress={() => makeCall(item.ownerDetails.ownerMobile)}
                                    >
                                     <Text style={{width:"100%",color: item.isContacted === 'no' ? Color.WHITE : Color.colorRoyalblue_100, fontSize:8,
                                       paddingHorizontal:6,paddingVertical:4}}>{item.isContacted === 'no' ? 'Contact' : 'Contacted'}</Text></TouchableOpacity>
                                
                                </View>
                 </View> 
                 
             
             
             </View>  )) : null}
             

             
           </View>           
     </TouchableOpacity>
     ))}
     


</ScrollView>
    )}
     {activeTab === "Rent" && (
    <ScrollView style={{width:"100%"}}>
               {flats.map((item, index) => (            
                    <TouchableOpacity 
                 key={index}
                        
                        style={{
                            height:130,
                            elevation:3,
                            backgroundColor:"#FFF",
                            
                           marginHorizontal:10,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:6,
                            width:"95%"
                        }}
                    >
                      <View style={{flexDirection:"row"}}>
                        <ImageBackground
                              source={{ uri: `http://93.127.185.101:8005/api/utils/get-image/${item.propertyDetails.photos[0]}` }}
                              style={{width:120,height:130,marginRight:5}}
                              imageStyle={{ width:120,height:130,overflow:"hidden",borderTopLeftRadius:15,borderBottomLeftRadius:15 }}
                              
                              
                            >
                             <Text style={styles.overlayText1}>
                                boys
                              </Text>
                            </ImageBackground>
                            
                            <View style={{flexDirection:"column",width:"100%",height:height*0.030,marginTop:4}}>
                   <View style={{width:"100%",height:10,flexDirection:"row"}}>
                       <Text style={{height:12,width:"60%",marginLeft:18,fontWeight:"200",fontSize:8,textAlign:"right",color:Color.BLACK}}>7 days ago</Text>
                       
                  </View>
               <View style={{flexDirection:"row",height:height*0.085}}>
                  <View style={{flexDirection:"column",width:"50%",height:height*0.019,marginTop:4}}>
                             <Text style={{height:height*0.020,width:"auto",marginLeft:10,fontWeight:"500",color:Color.BLACK}}>{item.propertyDetails.type} for Rent</Text>
                             <Text style={{height:height*0.020,width:width*0.3,marginLeft:10,fontSize:11,color:Color.BLACK,overflow:"hidden"}}numberOfLines={1} ellipsizeMode="tail"> {item.propertyDetails.location}</Text>
                             <Text style={{height:height*0.020,width:"auto",marginLeft:12,fontSize:15,marginTop:10,color:Color.BLACK}}> ₹ {item.propertyDetails.rent}</Text>
                  </View>
                  <View style={{flexDirection:"column", borderColor:Color.colorDimgray_100, backgroundColor:"white", paddingVertical:4,marginTop:height*0.025,
                  marginLeft:-15,height:height*0.035}}>
                             <Text style={{fontSize:10,textAlign:"center",borderBottomWidth:0.5,width:"100%",paddingHorizontal:6,paddingBottom:2,color:Color.BLACK}}>{item.ownerDetails.ownerName}</Text>
                             <Text style={{fontSize:10,textAlign:"center",paddingBottom:2,paddingVertical:2,color:Color.BLACK}}>+91{item.ownerDetails.ownerMobile}  </Text>

                  </View>

                  </View>
                  <View style={{flexDirection:"row",width:"100%",height:height*0.030,marginTop:3}}>
             <View style={{flexDirection:"row",width:"35%",height:15,marginTop:6,marginLeft:10}}>
               <TouchableOpacity style={{flexDirection:"row"}}>
             <MaterialIcons name="photo-library" size={14} color='#000000' style={{marginRight:5}} />
                 <Text style={{height:height*0.020,width:width*0.220,marginLeft:2,fontSize:10,textDecorationLine: "underline",color:Color.BLACK}}>
                 
                   See Photos</Text></TouchableOpacity>
                 

                  </View>
                  <View style={{marginRight:5}}>
                  <TouchableOpacity style={{width:"100%",height:20,backgroundColor: item.isSiteVisitBooked ? Color.WHITE : Color.colorRoyalblue_100,borderRadius:5,marginTop:-2,borderColor:Color.GREY,borderWidth:0.5}}
                                 onPress={() => handleBooking(item.propertyDetails.type,item.propertyDetails.propertyId)}
                                 >
                                  
                                  <Text style={{width:"100%",color: item.isSiteVisitBooked ?  Color.colorRoyalblue_100: Color.WHITE, fontSize:8,
                                paddingHorizontal:6,paddingVertical:4}}
                                
                                >{item.isSiteVisitBooked ? 'Booked' : 'Book Visit'}</Text>
                                </TouchableOpacity>
                 </View>
                 <View>
                                <TouchableOpacity style={{width:"auto",height:height*0.020,
                                           backgroundColor: item.isContacted === 'no' ? Color.colorRoyalblue_100 : Color.WHITE,
                                            borderRadius:5,marginTop:-2,borderWidth:0.5,borderColor:Color.GREY}} 
                                   onPress={() => makeCall(item.ownerDetails.ownerMobile)}
                                    >
                                     <Text style={{width:"100%",color: item.isContacted === 'no' ? Color.WHITE : Color.colorRoyalblue_100, fontSize:8,
                                       paddingHorizontal:6,paddingVertical:4}}>{item.isContacted === 'no' ? 'Contact' : 'Contacted'}</Text></TouchableOpacity>
                                
                                </View>
                 </View> 
                 
             
             
             </View> 
                            
                            

                            
                          </View>           
                    </TouchableOpacity>
                   
                 
               ))}

                    
        </ScrollView>
    )}

{activeTab === "Pg/hostel" && (
     <ScrollView style={{width:"100%"}}>
     {pgs.map((item, index) => (            
          <TouchableOpacity 
       key={index}
              
              style={{
                  height:130,
                  elevation:3,
                  backgroundColor:"#FFF",
                  
                 marginHorizontal:10,
                  marginTop:20,
                  borderRadius:15,
                  marginBottom:6,
                  width:"95%"
              }}
          >
            <View style={{flexDirection:"row"}}>
              <ImageBackground
                     source={{ uri: `http://93.127.185.101:8005/api/utils/get-image/${item.propertyDetails.photos[0]}` }}
                    style={{width:120,height:130,marginRight:5}}
                    imageStyle={{ width:120,height:130,overflow:"hidden",borderTopLeftRadius:15,borderBottomLeftRadius:15 }}
                    
                    
                  >
                   <Text style={styles.overlayText1}>
                      boys
                    </Text>
                  </ImageBackground>
                  
                  <View style={{flexDirection:"column",width:"100%",height:height*0.030,marginTop:4}}>
              <View style={{width:"100%",height:10,flexDirection:"row"}}>
                  <Text style={{height:12,width:"60%",marginLeft:18,fontWeight:"200",fontSize:8,textAlign:"right",color:Color.BLACK}}>7 days ago</Text>
                  
             </View>
          <View style={{flexDirection:"row",height:height*0.085}}>
             <View style={{flexDirection:"column",width:"50%",height:height*0.019,marginTop:4}}>
                        <Text style={{height:height*0.020,width:"auto",marginLeft:10,fontWeight:"500",color:Color.BLACK}}>{item.propertyDetails.type} for Rent</Text>
                        <Text style={{height:height*0.020,width:width*0.3,marginLeft:10,fontSize:11,color:Color.BLACK,overflow:"hidden"}} numberOfLines={1} ellipsizeMode="tail"> {item.propertyDetails.location}</Text>
                             <Text style={{height:height*0.020,width:"auto",marginLeft:12,fontSize:15,marginTop:10}}> ₹ {getFirstNonZeroRent(item)} </Text>
                  </View>
                  <View style={{flexDirection:"column", borderColor:Color.colorDimgray_100, backgroundColor:"white", paddingVertical:4,marginTop:height*0.025,
                  marginLeft:-15,height:height*0.035}}>
                             <Text style={{fontSize:10,textAlign:"center",borderBottomWidth:0.5,width:"100%",paddingHorizontal:6,paddingBottom:2,color:Color.BLACK}}>{item.ownerDetails.ownerName}</Text>
                             <Text style={{fontSize:10,textAlign:"center",paddingBottom:2,paddingVertical:2,color:Color.BLACK}}>+91{item.ownerDetails.ownerMobile}  </Text>

                  </View>

                  </View>
                  <View style={{flexDirection:"row",width:"100%",height:height*0.030,marginTop:3}}>
             <View style={{flexDirection:"row",width:"35%",height:15,marginTop:6,marginLeft:10}}>
               <TouchableOpacity style={{flexDirection:"row"}}>
             <MaterialIcons name="photo-library" size={14} color='#000000' style={{marginRight:5}} />
                 <Text style={{height:height*0.020,width:width*0.220,marginLeft:2,fontSize:10,textDecorationLine: "underline",color:Color.BLACK}}>
                 
                   See Photos</Text></TouchableOpacity>
                 

                  </View>
                  <View style={{marginRight:5}}>
                  <TouchableOpacity style={{width:"100%",height:20,backgroundColor: item.isSiteVisitBooked ? Color.WHITE : Color.colorRoyalblue_100,borderRadius:5,marginTop:-2,borderColor:Color.GREY,borderWidth:0.5}}
                                 onPress={() => handleBooking(item.propertyDetails.type,item.propertyDetails.propertyId)}
                                 >
                                  
                                  <Text style={{width:"100%",color: item.isSiteVisitBooked ?  Color.colorRoyalblue_100: Color.WHITE, fontSize:8,
                                paddingHorizontal:6,paddingVertical:4}}
                                
                                >{item.isSiteVisitBooked ? 'Booked' : 'Book Visit'}</Text>
                                </TouchableOpacity>
                 </View>
                 <View>
                                <TouchableOpacity style={{width:"auto",height:height*0.020,
                                           backgroundColor: item.isContacted === 'no' ? Color.colorRoyalblue_100 : Color.WHITE,
                                            borderRadius:5,marginTop:-2,borderWidth:0.5,borderColor:Color.GREY}} 
                                   onPress={() => makeCall(item.ownerDetails.ownerMobile)}
                                    >
                                     <Text style={{width:"100%",color: item.isContacted === 'no' ? Color.WHITE : Color.colorRoyalblue_100, fontSize:8,
                                       paddingHorizontal:6,paddingVertical:4}}>{item.isContacted === 'no' ? 'Contact' : 'Contacted'}</Text></TouchableOpacity>
                                
                                </View>
                 </View> 
                 
             
             
             </View>
                  
                  

                  
                </View>           
          </TouchableOpacity>
         
       
     ))}

          
</ScrollView>
    )}
      
    </View>





    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"white"
  },
  image: {
    width: width * 0.8, // Adjusted width based on screen width
    height: height * 0.3, // Adjusted height based on screen height
  },
  loremIpsum: {
    fontFamily: "roboto-500",
    color: "#121212",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight:"700"
  },
  imageStack: {
    alignItems: "center",
    marginTop:30
  },
  materialUnderlineTextbox: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 20,
  },
  materialUnderlineTextbox1: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialUnderlineTextbox2: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialRightIconTextbox: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialCheckboxWithLabel: {
    marginTop: 10,
  },
  materialButtonPrimary: {
    height:49,
    width: width * 0.9, // Adjusted width based on screen width
    marginTop: 20,
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 15,
    marginBottom:20,
    // alignItems:"flex-start",
    // alignContent:"center",
    paddingBottom:20,
    width:"80%"
    
  },
  overlayText1: {
    paddingHorizontal: 5,
    
    textAlign:"center",
    fontSize: 7,
    backgroundColor:"rgba(97, 85, 223, 1)",
    opacity:1,
    fontWeight: "200",
    paddingTop: 5,
    paddingBottom: 6,
    color:"white",
    borderRadius: 5,
    marginLeft:6,
    position: 'absolute', // positions the text relative to the parent
    top: 10, // adjusts the text to the bottom of the image
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom:20
  },
  tabItem: {
    flex: 1,
    alignItems: "center"
  },
  tabText: {
    fontSize: 16,
    color: "black"
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: "royalblue"
    
  },
  activeTabText: {
    color: "royalblue"
  }

});

export default SeenProperties;