/**
 * author: Tsong
 * time: 23/03/2024 23:48
 */
export const validatePostcode = async (_, value) => {
    if (!value){
        return Promise.reject(new Error("Please input your postcode"))
    }
    if (value.match(/^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/) == null){
        return Promise.reject(new Error("Please input valid postcode"))
    }
    return Promise.resolve()
}

export const validatePassword = async (_, value) => {
    if (!value){
        return Promise.reject(new Error("Please input your password"))
    }
    if (value.length < 8){
        return Promise.reject(new Error("The length must be longer than 8"))
    }
    if (value.length > 16){
        return Promise.reject(new Error("The length must be shorter than 16"))
    }
    if (value.match(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/) == null) {
        return Promise.reject(
            new Error("The password must contain at least 3 kinds of characters: " +
                "[Uppercase letters, Lowercase letters, Symbols, Numbers]"
            )
        )
    }
    return Promise.resolve()
}
export const validateConfirmPassword = async (_, value, firstPassword) => {
    if (value && value === firstPassword){
        return Promise.resolve()
    }
    return Promise.reject(new Error('Please confirm your password'))
}
