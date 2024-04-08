import { useMutation } from "react-query";
import { POST_MANAGE_ACCESS } from "../../api";
import { Post } from "../HttpServices/HttpServices";

export const usePostAccessManagement = (props) => {
    const response = useMutation({
        mutationKey: ['post-access-management'],
        mutationFn: async ({ type, values }) => {
            return await Post(`${POST_MANAGE_ACCESS}/${type}`, values);
        },
        ...props,
    })
    return response;
}