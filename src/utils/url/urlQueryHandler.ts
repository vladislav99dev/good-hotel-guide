import { UrlQueryParams } from "@/app/page";
const urlQueryHandler = (data: UrlQueryParams): string => {
    let url: string = "";

    if (data.hotelName || data.hotelStatus || data.editProgress || data.page) url = "?"


    if (data.hotelName) {
        url = url + `name=${data.hotelName}`
        if (data.hotelStatus || data.editProgress || data.page) url = url + "&"
    }
    if (data.hotelStatus) {
        url = url + `status=${data.hotelStatus}`
        if (data.editProgress || data.page) url = url + "&"
    }
    if (data.editProgress) {
        url = url + `edit=${data.editProgress}`
        if(data.page) url = url + "&"
    }
    if (data.page) {
        if (!data.hotelName && !data.editProgress && !data.hotelStatus) {
            url = url + `page=${data.page}`
        } else {
            url = url + `page=${data.page}`
        }
    }
    return url
}


export default urlQueryHandler