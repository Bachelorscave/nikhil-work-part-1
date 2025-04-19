export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  PropertyList: undefined;
  PropertyDetail: { propertyId: string };
  OwnerDashboard: undefined;
  AddProperty: undefined;
  EditProperty: { propertyId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 