import React from 'react'
import './SearchPage.css'
import { useStateValue } from '../StateProvider'
import useGoogleSearch from './useGoogleSearch';
import Response from './response'
import { Link } from 'react-router-dom';
import Search from './Search';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RoomIcon from '@material-ui/icons/Room';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// https://developers.google.com/custom-search/v1/using_rest
// https://cse.google.com/cse/create/new

function SearchPage() {
	const [{ term }, dispatch] = useStateValue(); // this term we are pulling from the data layer
	// real API
	const { data } = useGoogleSearch(term);

	// Mock API call for developing
	// const data = Response;

	return (
		<div className="searchPage">
			<div className="searchPage_header">
				<Link to="/">
					<img
						className="searchPage_logo"
						src="https://cdn.vox-cdn.com/thumbor/Ous3VQj1sn4tvb3H13rIu8eGoZs=/0x0:2012x1341/1400x788/filters:focal(0x0:2012x1341):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"
						alt=""
					/>
				</Link>
				<div className="searchPage_headerBody">
					<Search hideButtons />

					<div className="searchPage_options">

						<div className="searchPage_optionsLeft">
							<div className="searchPage_option">
								<SearchIcon />
								<Link to="/all">All</Link>
							</div>
							<div className="searchPage_option">
								<DescriptionIcon />
								<Link to="/news">News</Link>
							</div>
							<div className="searchPage_option">
								<ImageIcon />
								<Link to="/images">Images</Link>
							</div>
							<div className="searchPage_option">
								<LocalOfferIcon />
								<Link to="/shopping">Shopping</Link>
							</div>
							<div className="searchPage_option">
								<RoomIcon />
								<Link to="/maps">maps</Link>
							</div>
							<div className="searchPage_option">
								<MoreVertIcon />
								<Link to="/more">more</Link>
							</div>
						</div>

						<div className="searchPage_optionsRight">
							<div className="searchPage_option">
								<Link to="/settings">Settings</Link>
							</div>
							<div className="searchPage_option">
								<Link to="/tools">Tools</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{term && (
				<div className="searchPage_results">
					<p className="searchPage_resultCount">
						Abount {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for Tesla
					</p>

					{/* data? - optinal changing, it doesn't result crashing */}
					{data?.items.map(item => (
						<div className="searchPage_result">
							<a href={item.link}>
								{item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
									<img
										className="searchPage_resultImage"
										src={item.pagemap?.cse_image.length > 0 && item.pagemap?.cse_image[0]?.src}
										alt=""
									/>
								)}
								{item.displayLink} ∇
							</a>
							<a className="searchPage_resultTitle" href={item.link}>
								<h2>{item.title}</h2>
							</a>
							<p className="searchPage_resultSnippet">
								{item.snippet}
							</p>
						</div>
					))}
				</div>
			)}


		</div>
	)
}

export default SearchPage
