"use client"
import { useEffect } from "react";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import { getInitialHotelData } from "@/store/slices/initialHotelDataSlice";
import { User } from "@/store/slices/userDataSlice/interfaces";
import HotelLink from "../HotelLink";

interface Props {
  userData: User
}

export default function HotelDashboard({ userData }: Props) {
  const { dispatch, useAppSelector } = useTypedStoreAction();
  const hotels = useAppSelector((state) => state.initialHotelData.hotels);

  const content = (
    <div className={`${userData.role === "hotelManager" ? 'flex flex-col justify-center' : 'grid grid-cols-3 justify-items-center'} gap-10 min-h-[500px]`}>
      {hotels.map((hotel: any, index: number) => (
        <HotelLink key={hotel._id} hotel={hotel} userRole={userData.role} index={index} />
      ))}
    </div>
  );
  return content;
}