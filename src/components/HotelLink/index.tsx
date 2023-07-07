import Link from "next/link";
import { Ticket } from "@/assets/icons/icons1";

interface Props {
  hotel: any;
  userRole: string,
  index: number
}

export default function HotelLink({ hotel, userRole, index }: Props) {
  const elements = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
  const [firstElements, secondElements, thirdElements] = elements

  const hotelReview = hotel.reviewTextAndMedia.reviewSummary;


  return (
    <div className={`border-[1px] relative overflow-hidden  
    ${userRole === "hotelManager" ? "" : `max-w-[376px] ${firstElements.includes(index) ? "justify-self-start" : secondElements.includes(index) ? "justify-self-center" : "justify-self-end"}`}`}>
      <Link
        key={hotel._id}
        href={{
          pathname: `/hotels/${hotel.name}`,
          query: { id: hotel._id },
        }}
        className={`${userRole === "hotelManager" ? "flex" : ""}`}
      >
        <div className="absolute bg-custom-purple h-[240px] w-[240px] flex items-end justify-center -rotate-45 -left-32 -top-32">
          <div className=" Gibson-Regular text-white uppercase text-lg pb-2">
            <p>
              Special <br />
              Offer
            </p>
          </div>
        </div>
        <div
          className={`${userRole === "hotelManager" ? "!w-[32%] " : "h-[319px]"} `}
          style={{
            backgroundImage: `url(${hotel?.reviewTextAndMedia?.homepageFeaturedImage?.asset?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className={`p-10 flex flex-col gap-y-8 ${userRole === "hotelManager" ? "w-[68%]" : ""}`}>
          <div className="flex flex-col gap-y-1">
            <div className={`Gill-Sans-Nova-SemiBold text-2xl ${userRole === "hotelManager" ? "" : "h-[65px]"}`}>{hotel.name}</div>
            <div className="Gibson-Light flex flex-col gap-x-2">{`${hotel.addressGroup.county}, ${hotel.addressGroup.country}`}
              <div className="flex gap-x-2">
                <p className="text-[#BDBDBD]">From</p>
                <p className="">£{hotel.hotelInformation.minPrice}</p>
                <p className="text-[#BDBDBD]">per night</p>
              </div>
            </div>
            <div className="Gill-Sans-Nova-SemiBold text-lg flex items-center gap-x-2"><Ticket /> Special Offer Name Goes Here</div>
          </div>
          <div className={`Gibson-Light text-lg text-row-9 ${userRole === "hotelManager" ? "" : "h-[230px]"} `}>{hotelReview ? hotelReview[0].children[0].text : ""}</div>
          <div className="uppercase text-custom-purple Gibson-Regular">Edit Review</div>
        </div>
      </Link>
    </div>
  );
}
