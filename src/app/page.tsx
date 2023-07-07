"use client"
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import { SearchForm as SearchParams } from "@/store/slices/dashboardSearchSlice/interfaces";
import { searchFormDataActions } from "@/store/store";
import { getInitialHotelData } from "@/store/slices/initialHotelDataSlice";
import HotelDashboard from "@/components/HotelDashboard";
import DashboardWelcomeMessage from "@/components/DashboardWelcomeMessage";
import DashboardSerchBar from "@/components/DashboardSearchBar/index"
import Pagination from "@/components/UI/pagination";
import { PageGuard } from "@/HOC/routeGuard";

export interface UrlQueryParams extends SearchParams {
  page: number
}

const Home = () => {
  const { dispatch, useAppSelector } = useTypedStoreAction()
  const userData = useAppSelector(state => state.userDataSlice)
  const params = useSearchParams();

  useEffect(() => {
    if (userData.role === "reviewer" || userData.role === "superAdmin") {
      const searchParams: UrlQueryParams = {
        hotelName: params.get("name") || "",
        hotelStatus: params.get("status") || "",
        editProgress: params.get("edit") || "",
        page: Number(params.get("page")) || 1
      }

      dispatch(searchFormDataActions.setAll(searchParams))
      dispatch(getInitialHotelData({
        searchParams: {
          name: searchParams.hotelName,
          status: searchParams.hotelStatus,
          edit: searchParams.editProgress
        },
        hotelManagerEmail: null,
        hotels: {
          from: searchParams.page === 1 ? 0 : (searchParams.page - 1) * 9,
          to: searchParams.page === 1 ? 9 : searchParams.page * 9
        }
      }))
    }
    if (userData.role === "hotelManager") {
      const page = Number(params.get("page") || 1)
      dispatch(getInitialHotelData({
        searchParams: {
          name: "",
          status: "",
          edit: ""
        },
        hotelManagerEmail: userData.email,
        hotels: {
          from: page === 1 ? 0 : (page - 1) * 9,
          to: page === 1 ? 9 : page * 9
        }
      }))
    }
  })

  return (
    <main >
      <div className="max-w-[95%] 2xl:max-w-[80%] mx-auto">
        {(userData.role === "reviewer" || userData.role === "superAdmin") ? <DashboardSerchBar /> : <div className="h-[56px]"></div>}
        <DashboardWelcomeMessage userData={userData} />
        <HotelDashboard userData={userData} />
        <Pagination />
      </div>
    </main>
  );
}

export default PageGuard(Home)

