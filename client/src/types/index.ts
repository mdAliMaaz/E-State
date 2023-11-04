export type UserTypes = {
    name?: string,
    email: string,
    password: string
}

export type intialStateUserTypes = {
    user: {

        isLoading: boolean,
        isError: boolean,
        data: {},
        myDetails: {
            name: string,
            email: string,
            _id: string
            avatar: {
                public_Id: string,
                url: string
            }
        }
    }
}

export type intialStateListingTypes = {
    listing: {

        isLoading: boolean,
        isError: boolean,
        data: {},
        allListings: [],
        myListing: []

    }
}

export type myListing = {
    address: string
    bathrooms: number
    bedrooms: number
    createdAt: string
    description: string
    furnished: boolean
    images: [{ public_Id: string, url: string }]
    name: string
    offer: string
    parking: boolean
    regularPrice: number
    type: string
    updatedAt: string
    user: string
    __v: number
    _id: string
}