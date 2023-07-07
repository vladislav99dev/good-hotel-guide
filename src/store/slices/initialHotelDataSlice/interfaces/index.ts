import { AxiosError } from "axios";

export interface getInitialHotelDataServiceResponse {
  ms: number;
  query: string;
  result: InitialHotels[];
}

export interface InitialHotels {
  _id: string;
  name: string;
}

export interface InitialStateInteface {
  hotels: InitialHotels[];
  loading: true | false;
  pageNumbers: number;
  error: AxiosError | null | unknown;
}

export interface HotelsData {
  hotels: InitialHotels[],
  hotelsCount: number
}

export interface GetInitialDataFunctionParameters {
  searchParams: SearchParams | null
  hotelManagerEmail: string | null
  hotels: {
    from: number
    to: number
  }
}

export interface SearchParams {
  name: string,
  status: string,
  edit: string
}


export interface HotelsQueryRange {
  from: number,
  to: number
}

