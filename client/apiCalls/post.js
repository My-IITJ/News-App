import axios from 'axios';
import { appUrl } from './client';
import { useInfiniteQuery, useQuery } from 'react-query';

// fetching posts for home page
const fetchPosts = ({ pageParam = 1 }, limit) => {
	return axios.get(`${appUrl}/posts?limit=${limit}&page=${pageParam}`);
};

export const useGetPosts = (limit) => {
	return useInfiniteQuery('get-latest-posts', (p) => fetchPosts(p, limit), {
		getNextPageParam: (lastPage, pages) => {
			let total = Math.ceil(lastPage?.data?.count / limit);
			if (pages.length < total) {
				return pages.length + 1;
			} else {
				return undefined;
			}
		},
	});
};

// searching posts in explore page
const searchPosts = (limit, page = 1, search = '') => {
	return axios.get(
		`${appUrl}/posts/search?limit=${limit}&page=${page}&search=${search}`
	);
};

export const useSearchPosts = (page, limit, search) => {
	return useQuery(
		['search-posts', page],
		() => searchPosts(limit, page, search),
		{ keepPreviousData: true }
	);
};
