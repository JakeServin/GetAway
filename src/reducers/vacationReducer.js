const initialState = {};

export const vacationReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
        case "SET_VACATION":
			return {...payload};
			break;

		default:
			return state;
	}
};
