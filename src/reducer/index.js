export default history => combineReducers({
    router: connectRouter(history),
    auth,
    post,
  });