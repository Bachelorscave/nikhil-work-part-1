import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkToken} from '../apiservice/MainfuctionApi';

// import OwnerDashboard from '../screens/OwnerDashboard';
// import { Image } from 'react-native';

import Home from '../screens/Home';
import Login20 from '../screens/Login';
import LoginMain from '../screens/Login';

import OwnerDashboard from '../screens/OwnerDashboard';
import Register from '../screens/Register';
import Filterby from '../screens/Filter';
import ByFilter from '../screens/Filterby';
import SearchT from '../screens/Search';
import TentantSpace from '../screens/TentantSpace';
import TenantProfile from '../screens/TenantProfile';
import OwnerProfile from '../screens/OwnerProfile';
import MatchingTenant from '../screens/MatchingTenant';
import PGSearch from '../screens/PgSearch';
import PGFilterby from '../screens/PgFilterby';
import PgSchedule from '../screens/PgSchedule';
import PGphotos from '../screens/PgPhotos';
import SeenProperties from '../screens/SeenProperties';

// import Filter from '../screens/Filter'
// import Search from '../screens/Search';
// import Filterby from '../screens/Filterby';
// import Menu from '../screens/menu';
// import ViewProperty from '../screens/ViewProperty';
// import Tentate from '../screens/TentantSpace';
// import SeenProperties from '../screens/SeenProperties';
import General from '../screens/General';
// import PropertyDeatils from '../screens/PropertyDetails'
// import RentalC from '../screens/RentalCondition'
// import Amenities from '../screens/Amenities'
// import LocalityD from '../screens/LocalityD'
// import PhotoS from '../screens/PhotoS'
// import SchedulerS from '../screens/ScheduleS'

import Property from '../screens/property';
import PgRoom from '../screens/PgRoom';
import viewPropertyP from '../screens/viewPropertyP';
import PropertyDeatils from '../screens/PropertyDetails';
import RentalCondition from '../screens/RentalCondition';
import Amenities from '../screens/Amenities';
import LocalityD from '../screens/LocalityD';
import PhotoS from '../screens/PhotoS';
import SchedulerS from '../screens/ScheduleS';
import PgRoomDetails from '../screens/PgRoomDetails';
import PGlocality from '../screens/LocalityPG';
import PGdetails from '../screens/PgDetails';
import PGAmenities from '../screens/PgAmenities';
import ViewProperty from '../screens/ViewProperty';
// import PgRoom from '../screens/PgRoom'
// import PgRoomDetails from '../screens/PgRoomDetails'
// import LocalityPG from '../screens/LocalityPG'
// import PGdetails from '../screens/PgDetails'
// import PgAmenities from '../screens/PgAmenities'
// import PgPhoto from '../screens/PgPhotos'
// import PgSearch from '../screens/PgSearch'
// import PgScheduler from '../screens/PgSchedule'
// import PgFilter from '../screens/PgFilterby'
// import TenantProfile from '../screens/TenantProfile'
// import MatchingT from '../screens/MatchingTenant'
// import OwnerProfile from '../screens/OwnerProfile'
// import ViewPropertyS from '../screens/viewPropertyP'
const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    overshootClamping: false,
    stiffness: 100,
    damping: 10,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const forHorizontalTransition = ({current, inverted, layouts: {screen}}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-screen.width, 0], // Move from left to right
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};

const screenOptionStyle = {
  headerShown: false,

  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

const HomeStackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const tokenExists = await checkToken();
      setIsLoggedIn(tokenExists);
      setIsLoading(false);
    };

    initialize();
  }, []);

  if (isLoading) {
    return null; // Optionally render a loading spinner or splash screen
  }

  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={Home}>
      {isLoggedIn ? (
        <Stack.Screen name="HomeStack" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginMain} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
      {/* <Stack.Screen name="Login" component={LoginMain} /> */}
      {/* <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={LoginMain} /> */}
      <Stack.Screen
        name="Owner"
        component={OwnerDashboard}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen name="HomeStack1" component={Home} />
      <Stack.Screen name="Signup1" component={Register} />
      <Stack.Screen name="Login1" component={LoginMain} />
      <Stack.Screen
        name="Filter"
        component={Filterby}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchT}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Filterby"
        component={ByFilter}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen name="Tentate" component={TentantSpace} />
      <Stack.Screen
        name="SeenP"
        component={SeenProperties}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="General"
        component={General}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Tenantprofile"
        component={TenantProfile}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: forHorizontalTransition,
        }}
      />
      <Stack.Screen
        name="OwnerProfile"
        component={OwnerProfile}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: forHorizontalTransition,
        }}
      />
      <Stack.Screen
        name="MatchingT"
        component={MatchingTenant}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />

      <Stack.Screen
        name="PgFilterby"
        component={PGFilterby}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />

      <Stack.Screen
        name="SearchPG"
        component={PGSearch}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen name="PgScheduler" component={PgSchedule} />
      <Stack.Screen
        name="PgPhoto"
        component={PGphotos}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SProperty"
        component={Property}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="PgRoom"
        component={PgRoom}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ViewPropertyP"
        component={viewPropertyP}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ViewProperty"
        component={ViewProperty}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDeatils}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="RentalCondition"
        component={RentalCondition}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Amenities"
        component={Amenities}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="LocalityDetails"
        component={LocalityD}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PhotoS"
        component={PhotoS}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen name="Scheduler" component={SchedulerS} />
      <Stack.Screen
        name="PgRoomDetails"
        component={PgRoomDetails}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PGlocality"
        component={PGlocality}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PGdetails"
        component={PGdetails}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PGAmenities"
        component={PGAmenities}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
