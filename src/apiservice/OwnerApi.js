import { checkToken } from './MainfuctionApi';
const base_url = "http://93.127.185.101:8005/";

export const ListPG = async (pgData, PGRoomDetails, Locality, PGdetails, PGAmenities, PGphotos, schedule) => {
  console.log('----------->', pgData, PGRoomDetails, Locality, PGdetails, PGAmenities, PGphotos, schedule);
  
  
  console.log('------------pgphoto-->',PGphotos.Images[0]);

  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    // Create FormData and append all fields
    const formData = new FormData();
    formData.append("pgName", pgData.PGName || '');
    formData.append("pgDescription", pgData.description || '');
    formData.append("roomType", pgData.roomTypes || '');
    formData.append("detailsSingleRoomexpectedMonthlyRent", PGRoomDetails.RentS || 0);
    formData.append("detailsSingleRoomexpectedDeposit", PGRoomDetails.DepositeS || 0);
    formData.append("detailsSingleRoomcloset", PGRoomDetails.ClosetS || false);
    formData.append("detailsSingleRoomTV", PGRoomDetails.TVS || false);
    formData.append("detailsSingleRoomBeddings", PGRoomDetails.BeddingS || false);
    formData.append("detailsSingleRoomGeyser", PGRoomDetails.GeyserS || false);
    formData.append("detailsSingleRoomAC", PGRoomDetails.ACS || false);
    formData.append("detailsSingleRoomBathroom", PGRoomDetails.BathroomS || false);
    formData.append("detailsSingleRoomAttachedBathroom", PGRoomDetails.AttachedBS || false);
    formData.append("detailsSingleRoomMealIncluded", PGRoomDetails.MealS || false);
    formData.append("detailsDoubleRoomexpectedMonthlyRent", PGRoomDetails.RentD || 0);
    formData.append("detailsDoubleRoomexpectedDeposit", PGRoomDetails.DepositeD || 0);
    formData.append("detailsDoubleRoomcloset", PGRoomDetails.ClosetD || false);
    formData.append("detailsDoubleRoomTV", PGRoomDetails.TVD || false);
    formData.append("detailsDoubleRoomBeddings", PGRoomDetails.BeddingD || false);
    formData.append("detailsDoubleRoomGeyser", PGRoomDetails.GeyserD || false);
    formData.append("detailsDoubleRoomAC", PGRoomDetails.ACD || false);
    formData.append("detailsDoubleRoomBathroom", PGRoomDetails.BathroomD || false);
    formData.append("detailsDoubleRoomAttachedBathroom", PGRoomDetails.AttachedBD || false);
    formData.append("detailsDoubleRoomMealIncluded", PGRoomDetails.MealD || false);
    formData.append("detailsTripleRoomexpectedMonthlyRent", PGRoomDetails.RentT || 0);
    formData.append("detailsTripleRoomexpectedDeposit", PGRoomDetails.DepositeT || 0);
    formData.append("detailsTripleRoomcloset", PGRoomDetails.ClosetT || false);
    formData.append("detailsTripleRoomTV", PGRoomDetails.TVT || false);
    formData.append("detailsTripleRoomBeddings", PGRoomDetails.BeddingT || false);
    formData.append("detailsTripleRoomGeyser", PGRoomDetails.GeyserT || false);
    formData.append("detailsTripleRoomAC", PGRoomDetails.ACT || false);
    formData.append("detailsTripleRoomBathroom", PGRoomDetails.BathroomT || false);
    formData.append("detailsTripleRoomAttachedBathroom", PGRoomDetails.AttachedBT || false);
    formData.append("detailsTripleRoomMealIncluded", PGRoomDetails.MealT || false);
    formData.append("detailsFourRoomexpectedMonthlyRent", PGRoomDetails.RentF || 0);
    formData.append("detailsFourRoomexpectedDeposit", PGRoomDetails.DepositeF || 0);
    formData.append("detailsFourRoomcloset", PGRoomDetails.ClosetF || false);
    formData.append("detailsFourRoomTV", PGRoomDetails.TVF || false);
    formData.append("detailsFourRoomBeddings", PGRoomDetails.BeddingF || false);
    formData.append("detailsFourRoomGeyser", PGRoomDetails.GeyserF || false);
    formData.append("detailsFourRoomAC", PGRoomDetails.ACF || false);
    formData.append("detailsFourRoomBathroom", PGRoomDetails.BathroomF || false);
    formData.append("detailsFourRoomAttachedBathroom", PGRoomDetails.AttachedBF || false);
    formData.append("detailsFourRoomMealIncluded", PGRoomDetails.MealF || false);
    formData.append("address", Locality.AddressPg || 'PG');
    formData.append("street", Locality.Streetpg || '');
    formData.append("city",Locality. City || '');
    formData.append("preferredGuest", PGdetails.Guest || '');
    formData.append("gateClosingTime", PGdetails.GateTime || '');
    formData.append("nearbyCollege", PGdetails.University || '');
    formData.append("placeFor", PGdetails.PlaceFor || '');
    formData.append("foodIncluded", PGdetails.FoodAvaliable || false);
    formData.append("breakfast", PGdetails.Breakfast || false);
    formData.append("lunch", PGdetails.Lunch || false);
    formData.append("dinner", PGdetails.Dinner || false);
    formData.append("smoking", PGdetails.NoSmoking || false);
    formData.append("guardians", PGdetails.NoGuardianStay || false);
    formData.append("nonVeg", PGdetails.NoNonVeg || false);
    formData.append("veg", PGdetails.NoDrink || false);
    formData.append("girlsAllowed", PGdetails.NoGirlsEntry || false);
    formData.append("boysAllowed", PGdetails.NoBoysEntry || false);
    formData.append("otherRules", PGdetails.PGDescription || '');
    formData.append("startDate", PGdetails.StartDate || '');
    formData.append("endDate", PGdetails.EndDate || '');
    formData.append("duration", PGdetails.Duration || 0);
    formData.append("laundry", PGAmenities.Laundry || 'No');
    formData.append("roomService", PGAmenities.RoomService || 'No');
    formData.append("wardenFacility", PGAmenities.Warden || 'No');
    formData.append("parking", PGAmenities.Parking || false);
    formData.append("direction", PGAmenities.DTip || '');
    formData.append("commonTv", PGAmenities.CommonTv || false);
    formData.append("cookingAllowed", PGAmenities.Cooking || false);
    formData.append("refrigerator", PGAmenities.Refregirator || false);
    formData.append("powerBackup", PGAmenities.PowerBackup || false);
    formData.append("mess", PGAmenities.Mess || false);
    formData.append("wifi", PGAmenities.Wifi || false);
    formData.append("lift", PGAmenities.Lift || false);
    formData.append("availability", schedule.day || 'Weekends');
    formData.append("startTime", schedule.startTime || '');
    formData.append("endTime", schedule.endTime || '');
    formData.append("status", "Active");
    // formData.append('photos',
    // {
    //   uri: PGphotos.Images[0],
    //   type: 'image/jpeg',
    //   name: 'image.jpg',
    // });
    // Append photos

    if (PGphotos && PGphotos.Images) {
      PGphotos.Images.forEach((uri, index) => {
        console.log(`Appending photo ${index}: ${uri}`);
        formData.append('photos', {
          uri: uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });
    }
  
    
    // Append photos
    // if (PGphotos && PGphotos.Images) {
    //   PGphotos.Images.forEach((image, index) => {
    //     formData.append(`photos[${index}]`, image);
    //   });
    // }

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: formData,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}api/owner/addPG`, requestOptions);
    console.log('response', response);
    

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const AddFlat = async (
  FlatDetails,
  PropertyDetails,
  RentalCondition,
  amenities,
  Locality,
  Fphotos,
  schedule
) => {
  console.log(
    '----------->',
    FlatDetails,
    PropertyDetails,
    RentalCondition,
    amenities,
    Locality,
    Fphotos,
    schedule
  );

  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    // Create FormData and append all fields
    const formData = new FormData();
    formData.append("accommodationName", PropertyDetails.AccommodationName || '');
    formData.append("type", PropertyDetails.type || '');
    formData.append("bhkType", PropertyDetails.BHK || '');
    formData.append("propertyAge", PropertyDetails.Page || 0);
    formData.append("floorNo", PropertyDetails.Floor || 0);
    formData.append("totalFloor", FlatDetails.TFloor || 0);
    formData.append("description", PropertyDetails.text || '');
    formData.append("area", PropertyDetails.Area || 0);
    formData.append("nearbyUniversities", PropertyDetails.Near || '');
    formData.append("expectedRent", RentalCondition.Rent || 0);
    formData.append("monthlyMaintenance", RentalCondition.Maintance || 0);
    formData.append("isRentNegotiable", RentalCondition.isNegotiable || false);
    formData.append("expectedDeposit", RentalCondition.Deposite || 0);
    formData.append("propertyAvailableFor", RentalCondition.AvailableFor || '');
    formData.append("furnishing", RentalCondition. Furnished || '');
    formData.append("availableFromDate", RentalCondition.selectedDate || '');
    formData.append("moreDetails", RentalCondition.Parking || '');
    formData.append("preferredTenant", RentalCondition.Gender || '');
    formData.append("bathroom", amenities.Bathroom || 0);
    formData.append("balcony", amenities.Balcony || 0);
    formData.append("gym", amenities.Gymavailability || false);
    formData.append("isNonVeg", amenities.Allowed || false);
    formData.append("gatedSecurity", amenities.Security || false);
    formData.append("smokingAllowed", amenities.Smoking|| false);
    formData.append("lift", amenities.islift || false);
    formData.append("internetConnection", amenities.isIC || false);
    formData.append("airConditioner", amenities.isAC || false);
    formData.append("clubHouse", amenities.isCH || false);
    formData.append("intercom", amenities.isI || false);
    formData.append("swimmingPool", amenities.isSP || false);
    formData.append("powerBackup", amenities.isPB || false);
    formData.append("fireSafety", amenities.isFS || false);
    formData.append("visitorParking", amenities.isVP || false);
    formData.append("shoppingCenter", amenities.isSC || false);
    formData.append("gasPipeline", amenities.isGP || false);
    formData.append("park", amenities.isP || false);
    formData.append("servantRoom", amenities.isSR || false);
    formData.append("houseKeeping", amenities.isHK || false);
    formData.append("directionDescription", amenities.text || '');
    formData.append("waterDetails", amenities.Water || '');
    formData.append("secondaryPhoneNumber", amenities.mobileNo || '');
    formData.append("whoWillShowProperty", amenities.Show || '');
    formData.append("address", Locality.Address || '');
    formData.append("street", Locality.Street || '');
    formData.append("availability", schedule.day || 'Weekends');
    formData.append("startTime", schedule.startTime || '');
    formData.append("endTime", schedule.endTime || '');
    formData.append("city",Locality.selectCity || '');
    formData.append("status", "Active");

    if (Fphotos && Fphotos.Images) {
      Fphotos.Images.forEach((uri, index) => {
        console.log(`Appending photo ${index}: ${uri}`);
        formData.append('photos', {
          uri: uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: formData,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}api/owner/addFlat`, requestOptions);
    console.log('response', response);
    const statusCode = response.status;
    const responseText = await response.text();

    // Log the status code and response text for debugging purposes
    console.log('Status Code:', statusCode);
    console.log('Response Text:', responseText);

    try {
      const result = JSON.parse(responseText);
      return { statusCode, result };
    } catch (jsonError) {
      console.error('Response is not valid JSON:', responseText);
      throw new Error(`Server responded with non-JSON data: ${responseText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchListing = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/owner/my-listings`, requestOptions); 

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

//date update

export const updateListingDate = async (propertyId, newDate,Type) => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newAvailability: newDate,propertyType :Type })
    };
    const response = await fetch(`${base_url}api/owner/update-availability/${propertyId}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response;

  } catch (error) {
    console.error('Error updating availability:', error);
  }
};

export const FilterSearchHouse = async (lookingFor,selectedRoom,value,selectCity,searchText,selectedOption) => {

  console.log(
    '----------->',
    lookingFor,
    selectedRoom,
    value,
    selectCity,
    searchText,
    selectedOption
    
  );
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({type:lookingFor})
    };

    const response = await fetch(`${base_url}api/tenant/search`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    
    console.log(response.status);
    return response;

  } catch (error) {
    console.error('Error searching for flats:', error);
  }
};

export const FilterSearchPG = async (lookingFor,selectedRType,Hvalue,selectCity,searchText,selectType) => {

  console.log(
    '----------->',
    lookingFor,selectedRType,Hvalue,selectCity,searchText,selectType
    
  );
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({type:lookingFor})
    };

    const response = await fetch(`${base_url}api/tenant/search`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
 
    console.log(response.status);
    return response;


  } catch (error) {
    console.error('Error searching for flats:', error);
  }
};


export const getpropertydetails = async (type,id) => {
  
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    console.log(type);
    console.log(id);

    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      
    };
    
    const response = await fetch(`${base_url}api/tenant/property/${type}/${id}`, requestOptions);
    console.log(response);
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response;

  } catch (error) {
    console.error('Error updating availability:', error);
  }
};

export const ContactedProperty = async (type,id) => {
  
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    console.log(type);
    console.log(id);

    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      
    };
    
    const response = await fetch(`${base_url}api/tenant/property/${type}/${id}/contact-owner`, requestOptions);
 
    console.log('--------> api testing --------->');
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response;

  } catch (error) {
    console.error('Error updating availability:', error);
  }
};


  export const Myresponses = async () => {
    try {
      const token = await checkToken();
      console.log('token', token);
      if (!token) {
        throw new Error('Token not found');
      }
      
      const requestOptions = {
        method: "GET",
        headers: {
          "Authorization": token
        }
      };
      const response = await fetch(`${base_url}api/tenant/my-responses`, requestOptions); 
     console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      return jsonData;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

// for owner dashboard for owner responses
  export const GetUserResponses = async () => {
    try {
      const token = await checkToken();
      console.log('token', token);
      if (!token) {
        throw new Error('Token not found');
      }
      
      const requestOptions = {
        method: "GET",
        headers: {
          "Authorization": token
        }
      };
      const response = await fetch(`${base_url}api/owner/get-all-response`, requestOptions); 
      console.log("---> owner api console for data getting correnctly")
     console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      return jsonData;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  export const updateContact = async (ResponseId,) => {
    try {
      const token = await checkToken();
      console.log('token', token);
      if (!token) {
        throw new Error('Token not found');
      }
  
      const requestOptions = {
        method: "PUT",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
        
      };
      const response = await fetch(`${base_url}api/owner/toggle-contacted/${ResponseId}`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("--->owner api for checking all is correct for contact");
      console.log(response);
      return response;
  
    } catch (error) {
      console.error('Error updating Contacts:', error);
    }
  };

// for Tenent  for all responses
export const GetSeenResponses = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/tenant/all-seen`, requestOptions); 
    console.log("---> tenent api console for data getting correnctly")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// home for getting university name
export const GetUniversity = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/tenant/get-nearby`, requestOptions); 
    console.log("---> property data")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

//for getting shortlisted property from tenent
export const shortlisted = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/tenant/shortlist`, requestOptions); 
    console.log("---> shortlisted data")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
//home page featured list
export const featured = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/tenant/featured`, requestOptions); 
    console.log("---> featured data")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const handpicked = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/tenant/handpicked`, requestOptions); 
    console.log("---> handpicked data")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const BookSiteVisit = async (type,id) => {
  
  console.log("booking",type);
  console.log("id",id);
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    console.log(type);
    console.log(id);

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      
    };
    
    const response = await fetch(`${base_url}api/tenant/toggle-visit/${type}/${id}`, requestOptions);
 
    console.log('--------> booking testing --------->');
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response;

  } catch (error) {
    console.error('Error updating availability:', error);
  }
};

export const BookedVisit = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/owner/booking-requests`, requestOptions); 
    console.log("---> booking  data")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const Uploadphoto = async (photo) => {
console.log("photo", photo)

  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    // Create FormData and append all fields
    const formData = new FormData();
  
    formData.append('photos',
    {
      uri: photo,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    // Append photos

   
    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: formData,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}api/users/upload-profile-picture`, requestOptions);
    console.log('response', response);
    

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getPhoto = async () => {
  try {
    const token = await checkToken();
    console.log('token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": token
      }
    };
    const response = await fetch(`${base_url}api/users/profile-picture`, requestOptions); 
    console.log("---> photo -->data")
   console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
