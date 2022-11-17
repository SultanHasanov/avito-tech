const initialState = {
	item: [],
	comments: [],
	loading: false
};

export const newsCurrentReduser = (state = initialState, action) => {
	switch (action.type) {
		case 'newsCurrent/load/pending':
			return {
				...state,
				loading: true
			};
		case 'newsCurrent/load/fulfilled':
			return {
				...state,
				item: action.payload,
				loading: false
			};
		case 'comment/load/pending':
			return {
				...state,
				loading: true
			};
		case 'comment/load/fulfilled':
			return {
				...state,
				comments: action.payload,
				loading: false
			};
		default:
			return state;
	}
};

export const getNewsCurrent = id => {
	return async dispatch => {
		dispatch({ type: 'newsCurrent/load/pending' });
		const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
		try {
			const response = await fetch(url);
			if (response.ok === false) {
				throw new Error('Ошибка в запросе:' + response.text);
			}
			const json = await response.json();
			dispatch({ type: 'newsCurrent/load/fulfilled', payload: json });
		} catch (err) {
			console.error(err);
		}
	};
};

export const getCommentNews = id => {
	return async dispatch => {
		dispatch({ type: 'comment/load/pending' });
		const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
		try {
			const response = await fetch(url);
			if (response.ok === false) {
				throw new Error('Ошибка в запросе:');
			}
			const json = await response.json();
			if (json.kids === undefined) {
				return;
			}
			const promisses = json.kids?.map(async id => {
				return await fetch(
					`https://hacker-news.firebaseio.com/v0/item/${id}.json`
				).then(response => response.json());
			});
			const result = await Promise.all(promisses);
			dispatch({ type: 'comment/load/fulfilled', payload: result });
		} catch (err) {
			console.error(err);
		}
	};
};
