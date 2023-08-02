export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

// Payload will be sent back to the Reducer
// Writing payload is not neccessary but it's the convention.
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const UnFollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
