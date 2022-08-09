/* Pagination 비활성화 (백엔드 구현 안되어 있음)
 *
import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
    const { lastPage, newsPosts, loading } = useSelector(({ newsPosts, loading }) => ({
        lastPage: newsPosts.lastPage,
        posts: newsPosts.newsPosts,
        loading: loading['posts/LIST_NEWSPOSTS'],
    }))

//포스트 데이터가 없거나 로딩 중이면 아무것도 보여 주지 않음
    if(!newsPosts || loading) return null;

// page가 없으면 1을 기본값으로 사용
    const { brand, username, page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return(
        <Pagination
            brand={brand}
            username={username}
            page={parseInt(page,10)}
            lastPage={lastPage}
        />
    );
};

export default withRouter(PaginationContainer);

*/