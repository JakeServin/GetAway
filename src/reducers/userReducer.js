const initialState = {};

export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "SET_USER":
			return { ...payload };
			break;

		default:
			return state;
	}
};
