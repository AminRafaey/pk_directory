export const RouteChangeHandler = (completeHandler, events) => {
    events.on("routeChangeComplete", completeHandler);
    return () => {
        events.off("routeChangeComplete", completeHandler);
    };
}