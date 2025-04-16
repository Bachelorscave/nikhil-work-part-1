import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; // Updated import for Entypo
import { useNavigation } from '@react-navigation/native';

const Header20 = () => {
    const navigation = useNavigation();

    return (
        <View style={{
            height: 50,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingHorizontal: 15,
            marginTop: 10
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
                width: "100%",
                height: 30
            }}>
                <Image
                    source={require("../../image/brand.png")}
                    style={{
                        height: 30,
                        width: 20,
                        marginTop: 15
                    }}
                />
                <View style={{
                    height: '100%',
                    width: '5%',
                    marginTop: 25,
                    marginLeft: 15
                }}>
                    <Image
                        source={require("../../image/cave.png")}
                    />
                </View>
                <View style={{ width: "85%", alignItems: "flex-end" }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                        height: 30
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup1')}>
                            <Entypo
                                name="cross"
                                color="black"
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Header20;
