import axios, { AxiosError } from "axios";
import { CheckForDraftServiceResponse, Hotel, HotelId } from "../interfaces";

export const fetchHotelDataService = async (
  id: string
): Promise<Hotel[] | AxiosError> => {
  const checkForDraft = await checkForHotelDataService({
    value: id,
    type: "drafts.",
  });
  if (checkForDraft instanceof AxiosError) {
    return checkForDraft;
  }

  if (checkForDraft.length !== 0) {
    return checkForDraft;
  } else {
    const getPublishedData = await checkForHotelDataService({
      value: id,
      type: "",
    });
    return getPublishedData;
  }
};

const checkForHotelDataService = async (
  id: HotelId
): Promise<Hotel[] | AxiosError> => {
  try {
    const response = await axios.post<CheckForDraftServiceResponse>(
      `https://${process.env.NEXT_PUBLIC_SANITY_ID}.api.sanity.io/${process.env.NEXT_PUBLIC_API_VERSION}/data/query/${process.env.NEXT_PUBLIC_DATASET_NAME}`,
      {
        query: `*[_id == "${id.type}${id.value}"]`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
        },
      }
    );

    return response.data.result;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
};
