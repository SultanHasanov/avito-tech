const initialState = {
	items: [],
	loading: false
};
export const newsReduser = (state = initialState, action) => {
	switch (action.type) {
		case 'news/load/pending':
			return {
				...state,
				loading: true
			};
		case 'news/load/fulfilled':
			return {
				...state,
				items: action.payload,
				loading: false
			};
		default:
			return state;
	}
};

export const loadNews = () => {
	return async dispatch => {
		dispatch({ type: 'news/load/pending' });
		const url =
			'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
		try {
			const response = await fetch(url);
			if (response.ok === false) {
				throw new Error('Ошибка в запросе:' + response.text);
			}
			const json = await response.json();
			const promises = await json.slice(0, 100).map(id => {
				return fetch(
					`https://hacker-news.firebaseio.com/v0/item/${id}.json`
				).then(response => response.json());
			});
			const result = await Promise.all(promises);
			dispatch({ type: 'news/load/fulfilled', payload: result });
		} catch (err) {
			console.error(err);
		}
	};
};
