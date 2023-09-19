import { useContext, useState, memo } from 'react';
import { PlayersContext } from '../../context/PlayersProvider';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingScreen from '../LoadingScreen';
import Player from './Player';
import TableColumnHeader from './TableColumnHeader';

function Table() {
	const { players, options } = useContext(PlayersContext);
	const [hasMore, setHasMore] = useState(true);
	const itemsPerPage = 100;
	const [records, setRecords] = useState(itemsPerPage);

	const loadMore = () => {
		if (records >= players.length) {
			setHasMore(false);
		} else {
			setTimeout(() => {
				setRecords(records + itemsPerPage);
			}, 500);
		}
	};

	return (
		<div className='w-full xl:flex xl:items-center xl:justify-center overflow-x-scroll text-sm md:text-md mb-20'>
			<table className='overflow-x-scroll table-auto  bg-slate-700 text-slate-100'>
				<InfiniteScroll
					pageStart={0}
					loadMore={loadMore}
					hasMore={hasMore}
					loader={
						<tr
							className='w-full absolute h-36 left-0 bottom-0 bg-slate-700 text-center flex items-center justify-center'
							key={0}
						>
							<LoadingScreen inTable={true} />
						</tr>
					}
					element='tbody'
					//useWindow={false}
				>
					<tr>
						{options.map((option) => (
							<TableColumnHeader key={option.value} option={option} />
						))}
					</tr>
					{players.slice(0, records).map((player) => (
						<Player key={player.Id} player={player} />
					))}
				</InfiniteScroll>
			</table>
		</div>
	);
}

export default memo(Table);
