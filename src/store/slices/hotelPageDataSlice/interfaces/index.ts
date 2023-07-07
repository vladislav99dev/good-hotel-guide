import { AxiosError } from "axios";

export interface Hotel {
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface InitialStateIHotelPage {
  hotel: Hotel[];
  loading: true | false;
  error: AxiosError | null | unknown;
  hasDraft: boolean;
}

export interface CheckForDraftServiceResponse {
  result: Hotel[];
}

export interface CreateDraftServiceResponse {
  transactionId: string;
  results: {
    operation: string;
    document: Hotel;
  }[];
}

export interface HotelId {
  value: string;
  type: "drafts." | "";
}
