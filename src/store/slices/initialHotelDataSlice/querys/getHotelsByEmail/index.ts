import { HotelsQueryRange } from "../../interfaces";


export const hotelsByEmailQuery = (email: string, queryRange: HotelsQueryRange) =>
    /* groq */ `*[_type == 'hotel' && !(_id in path('drafts.**')) && contactGroup.managerEmailAddress == "${email}"] | order(_createdAt desc) 
    {_id, 
        name, 
        addressGroup {country, county}, 
        reviewTextAndMedia {homepageFeaturedImage { asset->{ url } }, reviewSummary},
        hotelInformation {minPrice,searchTags} 
    } 
    [${queryRange.from}...${queryRange.to}]`;

export const hotelsCountByEmail = (email: string) =>
    `count(*[_type == "hotel" && contactGroup.managerEmailAddress == "${email}" && !(_id in path('drafts.**'))])`

