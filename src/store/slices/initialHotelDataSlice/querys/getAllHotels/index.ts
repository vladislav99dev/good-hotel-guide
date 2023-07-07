import { SearchParams, HotelsQueryRange } from "../../interfaces";
export const initialHotelDataQuery = (searchParams: SearchParams | null, queryRange: HotelsQueryRange) => {

  const paramsString = `${searchParams?.name && `&& name=="${searchParams.name}"`} ${searchParams?.status && `&& management.hotelStatusType.value=="${searchParams.status}"`}`

  return `*[_type == 'hotel' && !(_id in path('drafts.**')) ${paramsString.length && paramsString} ] | order(_createdAt desc) 
  {_id, 
    name, 
    addressGroup {country, county}, 
    reviewTextAndMedia {homepageFeaturedImage { asset->{ url } }, reviewSummary},
    hotelInformation {minPrice,searchTags} 
  } 
  [${queryRange.from}...${queryRange.to}]`;
}


export const initialHotelsCount = (searchParams: SearchParams | null) => {
  const paramsString = `${searchParams?.name && `&& name=="${searchParams.name}"`} ${searchParams?.status && `&& management.hotelStatusType.value=="${searchParams.status}"`}`
  return `count(*[_type == "hotel"  && !(_id in path('drafts.**'))  ${paramsString && paramsString}])`
} 