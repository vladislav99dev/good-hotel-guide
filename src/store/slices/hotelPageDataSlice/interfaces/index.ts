import { AxiosError } from "axios";

export interface Hotel {
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  name: string;
  parentPage: string;
  addressGroup: AddressGroup;
  contactGroup: ContactGroup;
  displayOptions: DisplayOptions;
  hotelInformation: HotelInformation;
  location: Location;
  management: Management;
  questionnaireTab: QuestionnaireTab;
  reviewTextAndMedia: ReviewTextAndMedia;
  searchTagSummaries: SearchTagSummaries;
  seoGroup: SeoGroup;
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

export interface AddressGroup {
  country: string
  county: string
  postCode: string
  region: string
  street: string
  town: string
  trainStation: string
  village: string
  _type: string
}

export interface ContactGroup {
  bookNowUrl: string
  bookingUrl: string
  contactEmailAddress: string
  contactName: string
  displayEmail: boolean
  emailAddress: string
  groupEmailAddress: string
  groupName: string
  managerEmailAddress: string
  telephone: string
  websiteUrl: string
  _type: string
}

export interface DisplayOptions {
  extended: boolean
  inGuide: boolean
  omitted: boolean
  paid: boolean
  shortlist: boolean
  _type: string
}

export interface SearchTag extends Tag {
  _key: string
}

export interface Tag {
  label: string
  value: string
}

export interface Facility {
  _key: string
  _ref: string
  _type: string
}


export interface HotelInformation {
  backgroundMusic: string
  bedrooms: string
  children: string
  creditCards: string
  dogs: string
  facilities: Facility[]
  locationDescription: string
  maxPrice: number
  minPrice: number
  open: string
  prices: string
  searchTags: SearchTag[]
  smoking: string
  _type: string
}


export interface Location {
  lat: number
  lng: number
  _type: string
}

export interface Management {
  accessId: string
  hotelStatusType:
  {
    label: string,
    value: string
  }
  _type: string
}

export interface QuestionnaireTab {
  q_Bedrooms: {
    hasBedroomFacilities: boolean
    hasIndoorHotTub: boolean
    hasOutdoorHotTub: boolean
    _type: string
  }
  _type: string
}

export interface ReviewTextAndMedia {
  homepageFeaturedImage: Image
  images: Image[]
  _type: string
  reviewSummary: Review[]
  reviewFull: Review[]
}

export interface Review {
  style: string
  _key: string
  _type: string
  markDefs: any[]
  children: ReviewChild[]

}

export interface ReviewChild {
  marks: any[]
  text: string,
  _key: string,
  _type: string,
}

export interface Asset {
  _ref: string
  _type: string
  url: string
}

export interface Image {
  _key: string
  _type: string
  asset: Asset
}


export interface SearchTagSummaries {
  searchTagSummaries: SearchTagSummary[]
}

export interface SeoGroup {
  seoMetaDescription: string
  seoMetaTitle: string
  _type: string
}

export interface SearchTagSummary {
  summary: string,
  tag: Tag[],
  _key: string
  _type: string
}
export interface Slug {
  current: string,
  _type: string
}
