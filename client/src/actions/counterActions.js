export const ADD_COUNTER = "ADD_COUNTER";

export const DEC_COUNTER = "DEC_COUNTER";

export const addToCounter = () => ({
	type: ADD_COUNTER
});

export const subtractFromCounter = () => ({
	type: DEC_COUNTER
});
