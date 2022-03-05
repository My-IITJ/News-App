import axios from 'axios';
import { appUrl } from './client';
import { useInfiniteQuery, useQuery } from 'react-query';

// fetch a single tag's details
const fetchTag = (tagId) => {
	return axios.get(`${appUrl}/tags/${tagId}`);
};

export const useGetTagDetails = (tagId) => {
	return useQuery(['tag-details', tagId], () => fetchTag(tagId));
};

//get tag related posts
const searchRelatedPosts = ({ pageParam = 1 }, limit, tag) => {
	return axios.get(
		`${appUrl}/posts/search?limit=${limit}&page=${pageParam}&search=${tag}`
	);
};

export const useRelatedPosts = (limit, tag) => {
	return useInfiniteQuery(
		['related-posts', tag],
		(p) => searchRelatedPosts(p, limit, tag),
		{
			getNextPageParam: (lastPage, pages) => {
				let total = Math.ceil(lastPage?.data?.count / limit);
				if (pages.length < total) {
					return pages.length + 1;
				} else {
					return undefined;
				}
			},
			enabled: !!tag,
		}
	);
};