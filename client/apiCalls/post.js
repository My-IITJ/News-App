import axios from 'axios';
import { appUrl } from './client';
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';
import auth from '@react-native-firebase/auth';

axios.interceptors.request.use(
	async (config) => {
		const token = await auth().currentUser.getIdToken();
		console.log(token);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
   (err) => Promise.reject(err)
);

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
		['search-posts', page, search],
		() => searchPosts(limit, page, search)
		// { keepPreviousData: true }
	);
};

// get post comments/details
const getPostComments = (postId) => {
	return axios.get(`${appUrl}/posts/${postId}`);
};

export const useGetPostComments = (postId) => {
	return useQuery(['post-comments', postId], () => getPostComments(postId));
};

// upvote/downvote a post
const vote = ({ postId, userId }) => {
	return axios.put(`${appUrl}/posts/votes/${postId}`, { userId });
};

export const useUpvotePost = (setIsVoting) => {
	const queryClient = useQueryClient();
	return useMutation(vote, {
		onSuccess: (_, { postId }) => {
			queryClient.invalidateQueries('get-latest-posts');
			queryClient.invalidateQueries('search-posts');
			queryClient.invalidateQueries(['post-comments', postId]);
			queryClient.invalidateQueries(['related-posts']);
			queryClient.invalidateQueries(['filter-posts-by-tag']);
			queryClient.invalidateQueries(['get-user-posts']);
			queryClient.invalidateQueries(['get-user-saved-posts']);
		},
		onSettled: () => {
			setTimeout(() => {
				setIsVoting(false);
			}, 1000);
		},
	});
};

const createFormData = (photo, body = {}) => {
	const data = new FormData();

	if (photo) {
		data.append('thumbnail', {
			name: `my-iitj-${body?.author}` + photo?.fileName,
			type: photo?.type,
			uri: photo.uri,
		});
	}

	Object.keys(body).forEach((key) => {
		data.append(key, body[key]);
	});

	return data;
};

// add post
const newPost = ({ data }) => {
	return axios.post(`${appUrl}/posts/new`, data);
};

export const useNewPost = () => {
	const queryClient = useQueryClient();
	return useMutation(newPost, {
		onSuccess: () => {
			queryClient.invalidateQueries('get-latest-posts');
			queryClient.invalidateQueries('search-posts');
			queryClient.invalidateQueries(['related-posts']);
			queryClient.invalidateQueries(['filter-posts-by-tag']);
			queryClient.invalidateQueries(['get-user-posts']);
			queryClient.invalidateQueries(['get-user-saved-posts']);
		},
	});
};

// edit post
const editPost = ({ data, postId }) => {
	return axios.put(`${appUrl}/posts/${postId}`, data);
};

export const useEditPost = () => {
	const queryClient = useQueryClient();
	return useMutation(editPost, {
		onSuccess: ({ postId }) => {
			queryClient.invalidateQueries('get-latest-posts');
			queryClient.invalidateQueries('search-posts');
			queryClient.invalidateQueries(['related-posts']);
			queryClient.invalidateQueries(['post-comments', postId]);
			queryClient.invalidateQueries(['filter-posts-by-tag']);
			queryClient.invalidateQueries(['get-user-posts']);
			queryClient.invalidateQueries(['get-user-saved-posts']);
		},
	});
};
