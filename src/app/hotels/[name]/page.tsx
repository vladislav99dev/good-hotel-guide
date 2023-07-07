"use client";
import { useEffect } from "react";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import { checkForHotelData } from "@/store/slices/hotelPageDataSlice";

interface Props {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: Props) {
  const { dispatch, useAppSelector } = useTypedStoreAction();
  const hotel = useAppSelector((sate) => sate);
  console.log(hotel, "Signle Hotel");

  useEffect(() => {
    dispatch(checkForHotelData(searchParams.id));
  }, []);

  return <div>{searchParams.id}</div>;
}
