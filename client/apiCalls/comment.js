import axios from 'axios';
import { appUrl } from './client';
import { useMutation, useQueryClient } from 'react-query';

// make a new comment/reply
const addComment = (body) => {
	return axios.post(`${appUrl}/comments/new`, body);
};

export const useAddComment = () => {
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
	});
};
