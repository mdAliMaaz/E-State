export type UserTypes = {
    name: string,
    email: string,
    password: string
}

export type intialStateTypes = {
    user: {

        isLoading: boolean,
        isError: boolean,
        data: {}
    }
}