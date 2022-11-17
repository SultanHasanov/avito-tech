import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentNews, getNewsCurrent } from '../features/newsCurrent';
import moment from 'moment';
import Comments from './Comments';
import { RiDownloadFill } from 'react-icons/ri';

function NewsCurrent() {
	const useParamsId = useParams();
	const id = useParamsId.id;

	const dispatch = useDispatch();

	const news = useSelector(state => state.commentsNews.item);
	const comments = useSelector(state => state.commentsNews.comments);
	const loading = useSelector(state => state.commentsNews.loading);

	useEffect(() => {
		dispatch(getCommentNews(id));
	}, []);

	useEffect(() => {
		dispatch(getNewsCurrent(id));
	}, []);

	const updateComments = () => dispatch(getCommentNews(id));

	useEffect(() => {
		updateComments();
	}, []);

	return (
		<div className='mx-auto w-2/3 mt-8 bg-gray-100  rounded-md '>
			<div className='p-10'>
				<p className='text-2xl'> {news.title} </p>
				<div>
					<span>
						<b>{'дата: '}</b>
						{moment(news.time, 'X').format('lll')}
					</span>
					<span className='ml-2'>{news.by}</span>
					<span className='ml-2'>
						{'комментарии: '}
						{news.descendants}
					</span>
				</div>
				<a href={news.url} className='border-t-4 text-green-700'>
					ссылка на новость
				</a>
			</div>
			<div>
				{news.descendants !== 0 ? (
					<>
						<button
							onClick={updateComments}
							className='px-5 py-2 ml-10 bg-gray-700 text-white rounded hover:shadow-xl'
						>
							Обновить
						</button>
						{loading ? (
							<svg className='animate-bounce w-20 h-20 mx-auto text-3xl mt-20'>
								<RiDownloadFill />
							</svg>
						) : (
							comments?.map(comment => {
								return <Comments comm={comment} key={comment.id} />;
							})
						)}
					</>
				) : null}
			</div>
		</div>
	);
}

export default NewsCurrent;
