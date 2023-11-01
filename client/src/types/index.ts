export type UserTypes = {
    name?: string,
    email: string,
    password: string
}

export type intialStateUserTypes = {
    user: {

        isLoading: boolean,
        isError: boolean,
        data: {}
    }
}

export type intialStateListingTypes = {
    listing: {

        isLoading: boolean,
        isError: boolean,
        data: {},
    }
}