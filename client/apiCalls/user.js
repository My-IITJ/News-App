import axios from './axios';
import { appUrl } from './client';
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';

// fetching posts of a given user
const fetchPosts = ({ pageParam = 1 }, limit, userId) => {
	return axios.get(
		`${appUrl}/users/posts/${userId}?limit=${limit}&page=${pageParam}`
	);
};

export const useGetUserPosts = (limit, userId) => {
	return useInfiniteQuery(
		['get-user-posts', userId],
		(p) => fetchPosts(p, limit, userId),
		{
			getNextPageParam: (lastPage, pages) => {
				let total = Math.ceil(lastPage?.data?.count / limit);
				if (pages.length < total) {
					return pages.length + 1;
				} else {
					return undefined;
				}
			},
		}
	);
};

// fetching saved posts of a given user
const fetchSavedPosts = ({ pageParam = 1 }, limit, userId) => {
	return axios.get(
		`${appUrl}/users/saved-posts/${userId}?limit=${limit}&page=${pageParam}`
	);
};

export const useGetUserSavedPosts = (limit, userId) => {
	return useInfiniteQuery(
		['get-user-saved-posts', userId],
		(p) => fetchSavedPosts(p, limit, userId),
		{
			getNextPageParam: (lastPage, pages) => {
				let total = Math.ceil(lastPage?.data?.count / limit);
				if (pages.length < total) {
					return pages.length + 1;
				} else {
					return undefined;
				}
			},
		}
	);
};

// get a list of subscribedTags
const fetchSubscribedTags = (userId) => {
	return axios.get(`${appUrl}/users/subscribed-tags/${userId}`);
};

export const useGetSubscribedTags = (userId) => {
	return useQuery(['get-user-subscribed-tags', userId], () =>
		fetchSubscribedTags(userId)
	);
};

// get profile details
const fetchProfile = (userId) => {
	return axios.get(`${appUrl}/users/${userId}`);
};

export const useGetProfileDetails = (userId, page) => {
	return useQuery(['get-user-profile', userId, page], () =>
		fetchProfile(userId)
	);
};

// edit profile details
const editProfile = ({ userId, data }) => {
	return axios.put(`${appUrl}/users/edit/${userId}`, data);
};

export const useEditProfile = () => {
	const queryClient = useQueryClient();
	return useMutation(editProfile, {
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries(['get-user-profile', userId]);
		},
	});
};
