import { USER_ACTIONS_TYPES } from "./user.types";

export const INITIAL_STATE = {
	currentUser: null,
	isAuth: false
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
	process.env.NODE_ENV !== "production" && console.log("dispatch");
	process.env.NODE_ENV !== "production" && console.log(action);
	const { type, payload } = action;
	switch (type) {
		case USER_ACTIONS_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			};
		case USER_ACTIONS_TYPES.SET_AUTH_USER:
			return {
				...state,
				isAuth: payload
			};
		default:
			return state;
	}
};
