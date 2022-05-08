import axios from 'axios';
import { appUrl } from './client';
import { useMutation, useQueryClient } from 'react-query';

// make a new comment/reply
const addComment = (body) => {
	return axios.post(`${appUrl}/comments/new`, body);
};

export const useAddComment = (setIsAddingComment) => {
	const queryClient = useQueryClient();
	return useMutation(addComment, {
		onSuccess: ({ data }) => {
			if (data?.comment?.parent?.parentType === 'post') {
				queryClient.invalidateQueries([
					'post-comments',
					data?.comment?.parent?.parentDetails,
				]);
				queryClient.invalidateQueries('get-latest-posts');
			}
		},
		onSettled: () => {
			setTimeout(() => {
				setIsAddingComment(false);
			}, 1000);
		},
	});
};

// upvote/downvote a comment
const vote = ({ commentId, userId }) => {
	return axios.put(`${appUrl}/comments/votes/${commentId}`, { userId });
};

export const useUpvoteComment = () => {
	const queryClient = useQueryClient();
	return useMutation(vote, {
		onSuccess: (_, { postId }) => {
			queryClient.invalidateQueries(['post-comments', postId]);
		},
	});
};
