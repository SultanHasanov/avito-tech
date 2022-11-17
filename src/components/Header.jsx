import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
			<div className='bg-gray-200 w-4/5  h-20 mx-auto rounded-md shadow-xl sticky top-0 z-10'>
				<div>
					<h1 className='leading-[80px] text-3xl mx-5'>
						<Link to={'/'} className='text-2xl leading-[80px]'>
							Hacker News
						</Link>
					</h1>
				</div>
			</div>
		);
}

export default Header;