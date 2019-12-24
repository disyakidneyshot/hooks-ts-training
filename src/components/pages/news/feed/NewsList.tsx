import React from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { NewsElement } from '../../../../services/types/news'
import { NewsCard } from './NewsCard'
import { ThemeContext } from 'styled-components'
import { Spinner } from '../../../ui/Spinner/Spinner'

interface NewsListProps {
	articles: { [key: string]: NewsElement }
	ids: string[]
	hasNextPage: boolean
	loading: boolean
	loadMore: (startIndex: number, stopIndex: number) => Promise<void>
}

export const NewsList: React.FC<NewsListProps> = ({
	articles,
	ids,
	hasNextPage,
	loading,
	loadMore,
}): JSX.Element => {
	const theme = React.useContext(ThemeContext)

	const itemCount = hasNextPage ? ids.length + 1 : ids.length

	const loadMoreItems = loading ? () => {} : loadMore

	const isItemLoaded = (index: number) => !hasNextPage || index < ids.length

	const rowRenderer = ({ index, style }: { index: number; style: object }) => {
		if (!isItemLoaded(index)) {
			return (
				<div
					key={index}
					style={{
						...style,
						left: '50%',
						transform: 'translateX(-50%)',
						width: '100%',
						height: '400px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Spinner />
				</div>
			)
		}

		const id: string = ids[index]
		const article = articles[id]

		return (
			<NewsCard
				article={article}
				key={id}
				style={{
					...style,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			/>
		)
	}

	return (
		<AutoSizer
			style={{ width: '100%', height: '100%', backgroundColor: theme.bg }}
		>
			{({ height, width }) => (
				<InfiniteLoader
					isItemLoaded={isItemLoaded}
					itemCount={itemCount}
					//@ts-ignore
					loadMoreItems={loadMoreItems}
					threshold={1}
				>
					{({ onItemsRendered, ref }) => (
						<List
							style={{ overflowX: 'hidden' }}
							itemSize={400}
							height={height}
							width={width}
							itemCount={itemCount}
							onItemsRendered={onItemsRendered}
							ref={ref}
							overscanCount={2}
						>
							{rowRenderer}
						</List>
					)}
				</InfiniteLoader>
			)}
		</AutoSizer>
	)
}
