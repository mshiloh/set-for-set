import axios from "axios";



const profileAxios = axios.create();
profileAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


const initialState = {
    firstName: '',
    lastName: '',
    loading: true,
    email: "",
    score: "",
    avatar: "",
    isAdmin: false,
    isAuthenticated: false,
    authErrCode: {
        signup: "",
        login: ""
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "STOP_LOADING":
            return {
                ...state,
                loading: false
            }
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false
            }
        case "AUTHENTICATE":
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode: initialState.authErrCode,
                loading: false

            }
        case "LOGOUT":
            return {
                ...initialState,
                loading: false
            }
        default:
            return {
                state,
                loading: false
            }
    }
}

function authenticate(user) {
    return {
        type: "AUTHENTICATE",
        user
    }
}
export function verify() {
    return dispatch => {
        profileAxios.get("/api/profile")
            .then(response => {
                const { user } = response.data;
                dispatch(authenticate(user));
            })
    }
}
export function signup(userInfo) {
    return dispatch => {
        axios.post("/auth/signup", userInfo)
            .then(response => {
                const { token, user } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));
                console.log(response.data)
            })
            .catch(err => {
                dispatch(authError("signup", err.response.status))
            })

    }
}
export function login(credentials) {
    return dispatch => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { token, user } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));

            })
            .catch(err => {
                dispatch(authError("login", err.response.status))

            })
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: "LOGOUT"
    }
}

export function authError(key, errCode) {
    return {
        type: "AUTH_ERROR",
        key,
        errCode
    }


}
export default reducer;
