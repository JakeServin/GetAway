const initialState = false;

export const loginReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "LOG_IN":
			return true;
			break;
		case "LOG_OUT":
			return false;
			break;
		default:
			return state;
	}
};
