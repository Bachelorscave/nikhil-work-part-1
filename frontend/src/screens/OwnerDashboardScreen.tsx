import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Property {
  _id: string;
  title: string;
  price: number;
  status: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}

const OwnerDashboardScreen = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOwnerProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/owner/properties');
      setProperties(response.data.data.properties);
    } catch (error) {
      console.error('Error fetching owner properties:', error);
      Alert.alert('Error', 'Failed to load properties');
    }
  };

  useEffect(() => {
    fetchOwnerProperties();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOwnerProperties();
    setRefreshing(false);
  };

  const handleAddProperty = () => {
    navigation.navigate('AddProperty');
  };

  const handleEditProperty = (propertyId: string) => {
    navigation.navigate('EditProperty', { propertyId });
  };

  const handleDeleteProperty = async (propertyId: string) => {
    Alert.alert(
      'Delete Property',
      'Are you sure you want to delete this property?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://localhost:3000/api/owner/properties/${propertyId}`);
              fetchOwnerProperties();
            } catch (error) {
              console.error('Error deleting property:', error);
              Alert.alert('Error', 'Failed to delete property');
            }
          },
        },
      ]
    );
  };

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyPrice}>${item.price}/month</Text>
        <Text style={styles.propertyAddress}>
          {item.address.street}, {item.address.city}, {item.address.state}
        </Text>
        <Text style={styles.propertyStatus}>Status: {item.status}</Text>
      </View>
      <View style={styles.propertyActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditProperty(item._id)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProperty(item._id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddProperty}>
        <Text style={styles.addButtonText}>Add New Property</Text>
      </TouchableOpacity>
      <FlatList
        data={properties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyInfo: {
    marginBottom: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  propertyAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  propertyStatus: {
    fontSize: 14,
    color: '#666',
  },
  propertyActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#34C759',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OwnerDashboardScreen; 