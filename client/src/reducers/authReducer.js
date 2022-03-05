export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user }
	} = action

	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				user
			}

		default:
			return state
	}
}

export const LOCAL_STORAGE_TOKEN_NAME ='learnit-mern'