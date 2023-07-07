import useTypedStoreAction from "@/store/hooks/useTypedStoreAction"
import { searchFormDataActions } from "@/store/store"
import { useRouter } from "next/navigation";
import urlQueryHandler from "@/utils/url/urlQueryHandler";
import { useEffect, useState } from "react";



const Pagination = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const pagesCount = useAppSelector(state => state.initialHotelData.pageNumbers)
    const searchFormData = useAppSelector(state => state.searchFormDataSlice)
    const router = useRouter();
    const [beforeLastPage, setBeforeLastPage] = useState<boolean>(false)
    const [pageRange, setPageRange] = useState<number>(1)
    const buttonStyles = "py-2 border-[1px] border-custom-purple text-custom-purple px-2 w-[46px]"

    useEffect(() => {
        if (searchFormData.page + 3 >= pagesCount) {
            setBeforeLastPage(true)
        } else if (searchFormData.page + 3 < pagesCount && beforeLastPage) setBeforeLastPage(false)
        if (pagesCount < 5) setPageRange(searchFormData.page);
        if (pagesCount > 5) setPageRange(5);
    })

    const handlePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        let url: string = "";
        if (value === "next") {
            if (searchFormData.page + 1 > pagesCount) return
            url = urlQueryHandler({ ...searchFormData, page: Number(searchFormData.page + 1) })
        }
        if (value === "prev") {
            if (searchFormData.page + 1 > pagesCount) return
            url = urlQueryHandler({ ...searchFormData, page: Number(searchFormData.page - 1) })
        }
        if (value !== "next" && value !== "prev") {
            url = urlQueryHandler({ ...searchFormData, page: Number(value) })
        }
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            router.push(url)
        }, 500)
    }


    return (
        <div className="h-[56px] my-10 flex gap-x-4 items-center justify-between">
            <button className={`${buttonStyles} min-w-[100px]`} onClick={handlePagination} value="prev">Prev</button>
            <div className="flex items-center gap-x-3">
                <button
                    onClick={handlePagination}
                    className={`${buttonStyles} ${1 === searchFormData.page && 'bg-[#f6efe8]'}`}
                    value={1}>1
                </button>
                {pageRange > 1 && [...Array(pageRange)].map((el, index) => {
                    let value: number = 0;
                    if (searchFormData.page >= 4) value = index + (searchFormData.page - 2)

                    if (searchFormData.page < 4) value = index + 2

                    if (searchFormData.page + 2 >= pagesCount) value = index + (searchFormData.page - 3)

                    return value < pagesCount && <button
                        onClick={handlePagination}
                        key={index}
                        className={`${buttonStyles} ${value === searchFormData.page && 'bg-[#f6efe8]'}`}
                        value={value}>
                        {value}
                    </button>
                })}
                {!beforeLastPage && (
                    <div className="text-custom-purple">...</div>
                )}
                {pagesCount > 5 && (
                    <button
                        onClick={handlePagination}
                        className={`${buttonStyles} ${pagesCount === searchFormData.page && 'bg-[#f6efe8]'}`}
                        value={pagesCount}
                    >{pagesCount}
                    </button>
                )}
            </div>
            <button className={`${buttonStyles} min-w-[100px]`} onClick={handlePagination} value="next">Next</button>
        </div>
    )

}


export default Pagination