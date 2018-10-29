# concurrent-react-router

Experimentation with trying to handle async and concurrent page loading with react-router

The idea was inspired by the way Youtube loads pages. Doesn't leave the page you are on, keeps the current UI interactive, and handles new navigation before another one finishes (don't end up with multiple entries in your history when you "really" only navigated once).

Note: Some of the things done in this library don't really follow expected use by React Router or React Loadable. I would not recommend using this in a production application. I attempted to implement this in a production app and ran into more odd bugs than I expected.
