import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { connect } from 'react-redux'
import { RootState } from '../../services/reducers'
import * as newsActions from '../../services/actions/news/news'
import { NewsState } from '../../services/types/news'
import { NewsList } from '../../components/pages/news/feed/NewsList'
import { PageContainer } from '../../components/layout/PageContainer'
import { Spinner } from '../../components/ui/Spinner/Spinner'

type StateProps = NewsState

type DispatchProps = {
	getNews: typeof newsActions.getNews
	clearNews: typeof newsActions.clearNews
}

type Props = RouteComponentProps & StateProps & DispatchProps

const NewsPage: React.SFC<Props> = (props): JSX.Element => {
	const { getNews, total, ids, articles, loading } = props

	const didMount = React.useRef(false)
	const [page, setPage] = React.useState(1)
	const [hasNextPage, setHasNextPage] = React.useState(true)

	React.useEffect(() => {
		if (didMount.current) {
			setHasNextPage(ids.length < total)
		} else {
			didMount.current = true
		}
		getNews({ page: Number(page) })
	}, [page])

	const loadMore = async (
		startIndex: number,
		stopIndex: number
	): Promise<void> => {
		setPage(page + 1)
	}

	return (
		<PageContainer>
			{!didMount ? (
				<Spinner />
			) : (
				<NewsList
					articles={articles}
					loadMore={loadMore}
					loading={loading}
					ids={ids}
					hasNextPage={hasNextPage}
				/>
			)}
		</PageContainer>
	)
}

export default connect((store: RootState) => store.news, {
	getNews: newsActions.getNews,
	clearNews: newsActions.clearNews,
})(NewsPage)
