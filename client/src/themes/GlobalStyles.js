import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
		font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
			"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
			"Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	* {
		box-sizing: border-box;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
			monospace;
	}
`;

export default GlobalStyles;
