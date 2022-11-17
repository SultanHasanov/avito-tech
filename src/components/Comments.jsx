import React, { useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';

function Comments({ comm }) {
	const [kidsComments, setKidsComments] = useState([]);
	const [openChildComments, setOpenChildComments] = useState(true);

	const getChildComments = async () => {
		if (comm?.kids?.length !== 0 || comm.kids) {
			const promisses = comm?.kids?.map(id => {
				return fetch(
					`https://hacker-news.firebaseio.com/v0/item/${id}.json`
				).then(response => response.json());
			});
			const result = await Promise.all(promisses);
			setKidsComments(result);
		}
		setOpenChildComments(false);
	};

	return (
		<div>
			<div className={`p-5 ml-2`}>
				<div className='flex'>
					<HiUserCircle className='text-xl' /> {comm.by}
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: comm.text }}
					className='ml-5 mt-5'
				></div>
				{openChildComments && comm.kids !== undefined && (
					<button
						onClick={getChildComments}
						className='px-2 py-1 ml-10 mt-5 bg-gray-700 text-white rounded hover:shadow-xl'
					>
						показать ответ..
					</button>
				)}
			</div>

			{kidsComments &&
				kidsComments.map(item => {
					return (
						<div className='ml-8 p-5'>
							<Comments key={item.id} comm={item} />
						</div>
					);
				})}
		</div>
	);
}

export default Comments;
