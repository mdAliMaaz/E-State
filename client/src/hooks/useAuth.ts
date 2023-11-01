const useAuth = () => {

    const user = localStorage.getItem("UserId")

    if (user) {
        return true
    }
    else {
        return false
    }
}

export default useAuth;