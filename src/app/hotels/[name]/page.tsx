"use client";
import { useEffect } from "react";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import { checkForHotelData } from "@/store/slices/hotelPageDataSlice";
import { hotelPageDataActions } from "@/store/store";
import HotelOverview from "@/components/HotelOverview";
import HotelHeader from "@/components/HotelOverview/HotelHeader"
// import Link from "next/link";
// import { LeftArrow, RightArrow, SaveIcon } from "@/assets/icons/icons1";

interface Props {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: Props) {
  const { dispatch, useAppSelector } = useTypedStoreAction();
  const hotel = useAppSelector((state) => state.hotelPageData);
  useEffect(() => {
    dispatch(checkForHotelData(searchParams.id));
  }, []);

  const onChangeHandler = (componentName: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const elementName = e.target.name;
    const value = e.target.value;
    if (componentName === "HotelAddress") dispatch(hotelPageDataActions.hotelAddressDataReducer({ elementName, value }))
    if (componentName === "ContactDetails") dispatch(hotelPageDataActions.hotelContactDetailsReducer({ elementName, value }))
    if (componentName === "DisplayOptions") dispatch(hotelPageDataActions.hotelDisplayOptionsReducer({ elementName, value }))
    if (componentName === "Management") dispatch(hotelPageDataActions.hotelManagementReducer({ elementName, value }))
  }

  return <div>
    <HotelHeader hotel={hotel.hotel[0]} />
    <div className="min-h-screen max-w-[95%] 2xl:max-w-[80%] mx-auto">
      <div className="Gill-Sans-Nova-SemiBold text-5xl my-10">
        {hotel.hotel[0]?.name &&
          <h3>{hotel.hotel[0].name}</h3>
        }
      </div>
      <HotelOverview hotel={hotel.hotel[0]} onChangeHandler={onChangeHandler} />
    </div>
  </div>;
}