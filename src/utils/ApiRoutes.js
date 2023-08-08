///Backend in Vercel
export const host = "https://friend-chat-backend.vercel.app";

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getAllUsersRoute = `${host}/api/auth/getAllUsers`;
export const sendMessageRoute = `${host}/api/messages/addMessage`;
export const getAllMessageRoute = `${host}/api/messages/getAllMessage`;
