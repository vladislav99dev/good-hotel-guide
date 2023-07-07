import axios, { AxiosError } from "axios";
import { initialHotelDataQuery, initialHotelsCount } from "../querys/getAllHotels";
import { hotelsByEmailQuery, hotelsCountByEmail } from "../querys/getHotelsByEmail"
import {
  getInitialHotelDataServiceResponse,
  GetInitialDataFunctionParameters,
  HotelsData,
} from "../interfaces";

export const getInitialHotelDataService = async (data: GetInitialDataFunctionParameters
): Promise<HotelsData | AxiosError> => {
  let hotelsDataQuery: string = initialHotelDataQuery(data.searchParams, data.hotels);
  let hotelsCountQuery: string = initialHotelsCount(data.searchParams)
  
  if (data.hotelManagerEmail) {
    hotelsDataQuery = hotelsByEmailQuery(data.hotelManagerEmail, data.hotels)
    hotelsCountQuery = hotelsCountByEmail(data.hotelManagerEmail)
  }

  const options = {
    url: `https://${process.env.NEXT_PUBLIC_SANITY_ID}.api.sanity.io/${process.env.NEXT_PUBLIC_API_VERSION}/data/query/${process.env.NEXT_PUBLIC_DATASET_NAME}`,
    query: hotelsDataQuery,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
    }
  }

  try {
    const [response, hotelsCount] = await Promise.all([
      axios.post<getInitialHotelDataServiceResponse>(options.url, { query: options.query }, { headers: options.headers }),
      axios.post(options.url, { query: hotelsCountQuery }, { headers: options.headers })
    ])
    return { hotels: response.data.result, hotelsCount: hotelsCount.data.result };
  } catch (e) {
    const error = e as AxiosError;

    return error;
  }
};