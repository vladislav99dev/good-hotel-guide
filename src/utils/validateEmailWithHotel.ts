import axios, { AxiosError } from "axios";
const validateEmailWithHotel = async (email: string): Promise<boolean> => {
    const query = `*[_type == 'hotel' && !(_id in path('drafts.**')) && contactGroup.managerEmailAddress == "${email}"] | order(_createdAt desc)
    {
        contactGroup{
            managerEmailAddress
        }
    } `

    try {
        const response = await axios.post(
            `https://${process.env.NEXT_PUBLIC_SANITY_ID}.api.sanity.io/${process.env.NEXT_PUBLIC_API_VERSION}/data/query/${process.env.NEXT_PUBLIC_DATASET_NAME}`,
            {
                query: query,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
                },
            }
        );
        return Boolean(response.data.result[0].contactGroup.managerEmailAddress)

    } catch (e) {
        return false
    }




}


export default validateEmailWithHotel;





