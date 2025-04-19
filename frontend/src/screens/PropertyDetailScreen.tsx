import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  amenities: string[];
  images: Array<{
    url: string;
    caption: string;
  }>;
  owner: {
    _id: string;
    fullName: string;
    phoneNumber: string;
  };
}

const PropertyDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const { propertyId } = route.params as { propertyId: string };
      const response = await axios.get(`http://localhost:3000/api/properties/${propertyId}`);
      setProperty(response.data.data.property);
    } catch (error) {
      console.error('Error fetching property details:', error);
      Alert.alert('Error', 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !property) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {property.images && property.images[0] && (
        <Image
          source={{ uri: property.images[0].url }}
          style={styles.mainImage}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>${property.price}/month</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.address}>
            {property.address.street}
            {'\n'}
            {property.address.city}, {property.address.state} {property.address.zipCode}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            {property.amenities.map((amenity, index) => (
              <Text key={index} style={styles.amenityItem}>• {amenity}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.contactInfo}>Owner: {property.owner.fullName}</Text>
          <Text style={styles.contactInfo}>Phone: {property.owner.phoneNumber}</Text>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => {
            // Implement contact functionality
            Alert.alert('Contact', 'Contact functionality to be implemented');
          }}
        >
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  address: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  amenitiesList: {
    marginTop: 8,
  },
  amenityItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  contactButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PropertyDetailScreen; 