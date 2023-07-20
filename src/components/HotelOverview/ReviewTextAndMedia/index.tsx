import { useEffect, useState } from "react"
import { hotelPageDataActions } from "@/store/store"
import { ReviewTextAndMedia } from "@/store/slices/hotelPageDataSlice/interfaces"
import HideShowFormComponents from "@/HOC/hideShowComponents"
import FormFieldsWrapper from "@/components/UI/inputWrapper"
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction"
import FormGallery from "@/components/FormGallery/intex"
import { PlusIcon } from "@/assets/icons/icons1"

interface Props {
    data: ReviewTextAndMedia,
}

const ReviewTextAndMedia = (props: Props) => {
    const [reviewSummary, setReviewSummary] = useState("");
    const [reviewFull, setReviewFull] = useState("");
    const { dispatch } = useTypedStoreAction();


    useEffect(() => {
        let reviewSummaryText = ""
        let reviewFull = ""
        props.data.reviewSummary.map((el, index) => {
            if (reviewSummaryText.length > 0)
                reviewSummaryText = `${reviewSummaryText} \n \n${el.children[0].text}`
            if (reviewSummaryText.length <= 0) reviewSummaryText = `${el.children[0].text}`

        })
        props.data.reviewFull.map((el, index) => {
            if (reviewFull.length > 0)
                reviewFull = `${reviewFull} \n \n ${el.children[0]?.text}`
            if (reviewFull.length <= 0) reviewFull = `${el.children[0]?.text}`

        })
        setReviewSummary(reviewSummaryText)
        setReviewFull(reviewFull)
    }, [])

    const onChangleHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const arr = e.target.value.split("\n");
        const filteredArr = arr.filter((el) => el.match(/[a-zA-Z]/))
        dispatch(hotelPageDataActions.hotelReviewTextAndMediaReducer(filteredArr))
    }


    return (
        <section className="flex flex-col gap-y-8">
            <FormFieldsWrapper wrapperStyles="capitalize col-span-2" labelProps={{ htmlFor: "reviewSummary", text: `Review Summary` }}
                textareaProps={{ onChangeHandler: onChangleHandler, value: reviewSummary, name: "reviewSummary", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize col-span-2" labelProps={{ htmlFor: "reviewFull", text: `Review Summary` }}
                textareaProps={{
                    onChangeHandler: onChangleHandler, value: reviewFull, name: "reviewFull", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: ""
                }}
            />
            <FormGallery images={props.data.images} featuredImage={props.data.homepageFeaturedImage} />
            <button className="w-full h-[48px] bg-custom-purple text-white flex justify-center items-center gap-x-4 text-lg uppercase">
                <PlusIcon />
                Add item
            </button>
        </section>
    )
}

export default HideShowFormComponents(ReviewTextAndMedia)
