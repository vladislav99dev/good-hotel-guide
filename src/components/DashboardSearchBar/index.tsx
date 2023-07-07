"use client"
import { useRouter } from "next/navigation"
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction"
import { searchFormDataActions } from "@/store/store"
import Input from "../UI/input"
import Select from "@/components/UI/select/index"
import { SearchIcon } from "@/assets/icons/icons1"
import hotelStatusTypes from "@/utils/schemas/hotelStatusTypes"
import urlQueryHandler from "@/utils/url/urlQueryHandler"


const DashboardSearchBar = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const searchFormData = useAppSelector(state => state.searchFormDataSlice)
    const router = useRouter();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const elementName = e.target.name.toUpperCase();
        const elementValue = e.target.value;
        dispatch(searchFormDataActions.formDataReducer({ elementName, value: elementValue }));
    };

    const handleSubmit = (e: React.FormEvent<EventTarget & HTMLFormElement>) => {
        e.preventDefault();
        if (!searchFormData.editProgress && !searchFormData.hotelName && !searchFormData.hotelStatus) {
            return router.push("/")
        }
        const url = urlQueryHandler({ ...searchFormData, page: 1 })
        if (url) router.push(url)
    }

    return (
        <form onSubmit={handleSubmit} className="h-[56px] bg-white flex items-center justify-center mt-2 gap-x-2">
            <Input type="text" name="hotelName" id="hotelName" icon={<SearchIcon />} customStyles="px-10 bg-[#FAFAFA] flex items-center" placeholder="Search Hotels" value={searchFormData.hotelName} onChangeHandler={onChangeHandler} />
            <Select onChangeHandler={onChangeHandler} options={hotelStatusTypes} placeholder="Status Type" customStyles="w-[230px]" name="hotelStatus" value={searchFormData.hotelStatus} />
            <Select onChangeHandler={onChangeHandler} options={hotelStatusTypes} placeholder="All Edit Progress" customStyles="w-[230px]" name="editProgress" value={searchFormData.editProgress} />
            <button className="bg-custom-purple px-4 py-2 min-h-[32px] uppercase text-white" type="submit">Search Reviews</button>
        </form>
    )
}

export default DashboardSearchBar
