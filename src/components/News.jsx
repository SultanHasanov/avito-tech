import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNews } from '../features/news';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import Preloader from './Preloader';
import { BiLike } from 'react-icons/bi';

function News() {
	const dispatch = useDispatch();
	const news = useSelector(state => state.news.items);
	const loadind = useSelector(state => state.news.loading);
	moment.locale('ru');

	useEffect(() => {
		dispatch(loadNews());
	}, [dispatch]);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(loadNews());
		}, 60000);
		return () => {
			clearInterval(interval);
		};
	});
	const getUpdateNews = () => dispatch(loadNews());
	useEffect(() => {
		getUpdateNews();
	}, [dispatch]);

	if (loadind) {
		return <Preloader />;
	}

	return (
		<>
			<div className='mx-auto w-4/5'>
				<button
					onClick={getUpdateNews}
					className=' px-5 py-2 bg-gray-700 text-white hover:bg-green-600 rounded mt-10 shadow-xl'
				>
					Обновить
				</button>
			</div>
			<div className='mx-auto w-4/5 mt-10 h-full'>
				{news.map((item, index) => {
					return (
						<div
							key={item.id}
							className='w-full bg-gray-100 mb-3 h-13 rounded-md'
						>
							<div className='w-full'>
								{index + 1 + '.'}
								<Link to={`/news/${item?.id}`} className='ml-1 text-[25px]'>
									{item.title}
								</Link>
							</div>
							<div className='  pl-4'>
								<div className=' flex ml-2'>
									<span className='flex around mt-[3px]'>
										<BiLike className='mt-1' />
										{item.score}
									</span>
									<span className='ml-1'>{'|'}</span>
									<p className='ml-2'>{' автор ' + item.by}</p>
									<span className='ml-3'>{'|'}</span>
									<p className='ml-2'>{moment(item.time, 'X').fromNow()}</p>
								</div>
							</div>
							<hr className='bg-grey-700' />
						</div>
					);
				})}
			</div>
		</>
	);
}

export default News;
