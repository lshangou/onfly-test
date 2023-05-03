export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

// Hotels

export interface Amenity {
  key: string;
  label: string;
}

export interface Address {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string | null;
  fullAddress: string;
}

export interface Deal {
  // No examples on data.
  id: string;
}

export interface Hotel {
  id: number;
  favorite: boolean;
  name: string;
  description: string;
  stars: string;
  thumb: string;
  amenities: Array<Amenity>;
  hasBreakfast: boolean;
  hasRefundableRoom: boolean;
  hasAgreement: boolean;
  nonRefundable: boolean | null;
  adress: Address;
  images: Array<string>;
  deals: Array<Deal> | null;
  roomsQuantity: boolean;
}

// Destinations
export interface State {
  name: string;
  shortname: string;
}

export interface Destination {
  name: string;
  state: State;
  placeId: number;
}

export type ShortenedCity = {
  label: string;
  value: string;
};
