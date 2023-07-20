import ContactDetails from "./ContactDetails";
import DisplayOptions from "./DisplayOptions";
import HotelAddress from "./HotelAddress";
import Management from "./Management";
import MapLocation from "./MapLocation";
import HotelInformation from "./HotelInformation"
import ReviewTextAndMedia from "./ReviewTextAndMedia";
import { Hotel } from "@/store/slices/hotelPageDataSlice/interfaces";

interface Props {
    hotel: Hotel
    onChangeHandler: (componentName: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const HotelOverview = (props: Props) => {
    return (
        <div className="flex flex-col gap-y-10">
            {props.hotel?.addressGroup &&
                <HotelAddress
                    onChangeHandler={props.onChangeHandler.bind(null, "HotelAddress")} data={props.hotel.addressGroup}
                    headingInfo={{ header: "Hotel Address", description: "Lorem ipsum madafaka" }} />}

            {props.hotel?.location &&
                <MapLocation
                    data={props.hotel?.location} headingInfo={{ header: "Map location", description: "Lorem ipsum map location " }} />}

            {props.hotel?.contactGroup &&
                <ContactDetails
                    onChangeHandler={props.onChangeHandler.bind(null, "ContactDetails")} data={props.hotel.contactGroup}
                    headingInfo={{ header: "Contact details", description: "(Section Description - optional) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare." }} />}

            {props.hotel?.displayOptions &&
                <DisplayOptions
                    onChangeHandler={props.onChangeHandler.bind(null, "DisplayOptions")} data={props.hotel.displayOptions}
                    headingInfo={{ header: "Display Options", description: "(Section Description - optional) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare." }} />}

            {props.hotel?.management &&
                <Management
                    onChangeHandler={props.onChangeHandler.bind(null, "Management")} data={props.hotel.management}
                    headingInfo={{ header: "Management", description: "" }} />}
            {props.hotel?.hotelInformation &&
                <HotelInformation
                    onChangeHandler={props.onChangeHandler.bind(null, "HotelInformation")} data={props.hotel.hotelInformation}
                    headingInfo={{ header: "Hotel information", description: "" }} />}
            {props.hotel?.reviewTextAndMedia &&
                <ReviewTextAndMedia
                    onChangeHandler={props.onChangeHandler.bind(null, "HotelInformation")} data={props.hotel.reviewTextAndMedia}
                    headingInfo={{ header: "Review text and media", description: "" }} />
            }
        </div>
    )
}

export default HotelOverview
