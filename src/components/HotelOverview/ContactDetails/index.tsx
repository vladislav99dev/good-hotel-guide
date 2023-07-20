import React from 'react'
import HideShowFormComponents from '@/HOC/hideShowComponents'
import { ContactGroup } from '@/store/slices/hotelPageDataSlice/interfaces'
import FormFieldsWrapper from '../../UI/inputWrapper'


interface Props {
    data: ContactGroup,
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
}

const ContactDetails = (props: Props) => {
    return (
        <section className='relative'>
            <div className="grid grid-cols-2  gap-x-8 gap-y-10">
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "contactName", text: `Contact name` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "contactName", id: "contactName", customStyles: "px-4 text-[#9E9E9E]", value: props.data.contactName }}
                />
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "emailAddress", text: `Email address` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "emailAddress", id: "emailAddress", customStyles: "px-4 text-[#9E9E9E]", value: props.data.emailAddress }}
                />
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "groupName", text: `Group name` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "groupName", id: "groupName", customStyles: "px-4 text-[#9E9E9E]", value: props.data.groupName }}
                />
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "groupEmailAddress", text: `Group email address` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "groupEmailAddress", id: "groupEmailAddress", customStyles: "px-4 text-[#9E9E9E]", value: props.data.groupEmailAddress }}
                />
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "managerEmailAddress", text: `Manager email address` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "managerEmailAddress", id: "managerEmailAddress", customStyles: "px-4 text-[#9E9E9E]", value: props.data.managerEmailAddress }}
                />
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "telephone", text: `Telephone` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "telephone", id: "telephone", customStyles: "px-4 text-[#9E9E9E]", value: props.data.telephone }}
                />
                <div className='relative'>
                    <FormFieldsWrapper wrapperStyles=" border-[1px] !flex-row-reverse !justify-end p-4 gap-x-2 h-full " labelProps={{ htmlFor: "displayEmail", text: `Display email` }}
                        inputProps={{ onChangeHandler: props.onChangeHandler, type: "checkbox", name: "displayEmail", id: "displayEmail", customStyles: "!p-0 !h-[20px] !w-[20px] text-[#9E9E9E]", isCheckboxChecked: props.data.displayEmail }}
                    />
                    <p className='text-[#757575] Gibson-Light mt-2 absolute bottom-5 left-11 text-sm'>Hides the phone number</p>
                </div>
                <div className='relative'>
                    <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "contactEmailAddress", text: `Contact Email Address` }}
                        inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "contactEmailAddress", id: "contactEmailAddress", customStyles: "px-4 text-[#9E9E9E]", value: props.data.contactEmailAddress }}
                    />
                    <p className='text-[#757575] Gibson-Light mt-2 absolute -bottom-6'>This email will be  displayed if the display email box is checked</p>
                </div>
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "websiteUrl", text: `Website url` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "websiteUrl", id: "websiteUrl", customStyles: "px-4 text-[#9E9E9E]", value: props.data.websiteUrl }}
                />
                <FormFieldsWrapper wrapperStyles="" labelProps={{ htmlFor: "bookingUrl", text: `Booking url` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "bookingUrl", id: "bookingUrl", customStyles: "px-4 text-[#9E9E9E]", value: props.data.bookingUrl }}
                />
                <FormFieldsWrapper wrapperStyles=" col-span-2" labelProps={{ htmlFor: "bookNowUrl", text: `Book now url` }}
                    inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "bookNowUrl", id: "bookNowUrl", customStyles: "px-4 text-[#9E9E9E]", value: props.data.bookingUrl }}
                />

            </div>
        </section>

    )
}

export default HideShowFormComponents(ContactDetails)
