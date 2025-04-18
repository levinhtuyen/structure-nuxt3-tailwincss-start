export default defineEventHandler((event) => {
	const { req, res } = event.node;
	const { url } = req;

	if (url === "/") {
		res.writeHead(301, { Location: "/home" });
		res.end();
	} else if (url === "/about") {
		res.writeHead(301, { Location: "/about-us" });
		res.end();
	} else if (url === "/contact") {
		res.writeHead(301, { Location: "/contact-us" });
		res.end();
	} else {
		return;
	}
});
