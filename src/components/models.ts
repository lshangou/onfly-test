// Hotels
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
  amenities: Array<any> | null;
  hasBreakFast: boolean | null;
  hasRefundableRoom: boolean | null;
  hasAgreement: boolean | null;
  nonRefundable: boolean | null;
  address:
    | {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        country: string;
        zipCode: any | null;
        fullAddress: string;
      }
    | any;
  images: Array<string>;
  deals: null;
  roomsQuantity: number | null;
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
  value: Destination;
};
