import axios from "axios";

const homeAxios = axios.create();
homeAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const initialState = {
    loading: true,
    name: '',
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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "STOP_LOADING": {
            return {
                ...state,
                loading: false
            }
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
            return state
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
        homeAxios.get("/api/home")
            .then(response => {
                const { user } = response.data;
                dispatch(authenticate(user));
            })
            .catch(err => {
                dispatch({
                    type: "STOP_LOADING"
                })
                console.error(err);
            })
    }
}

export function signup(userInfo) {
    return dispatch => {
        axios.post("/auth/signup", userInfo)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));
                // console.log(response.data)
            })
            .catch(err => {
                dispatch(authError("signup", err.response.status))
                console.error(err);
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
                // console.log(response.data)
            })
            .catch(err => {
                dispatch(authError("login", err.response.status))
                console.error(err);
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
