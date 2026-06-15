export function GET() {
	const content = `# ProductName

> A concise and factual description of the application for AI-powered response mechanisms.

## Documentation

- [Docs](/docs): Main product documentation
- [API](/docs/api): API reference
- [Changelog](/changelog): Change history

## Contact

- Site: https://domain.com
- GitHub: https://github.com/your-org/your-repo
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400, s-maxage=86400",
		},
	});
}
