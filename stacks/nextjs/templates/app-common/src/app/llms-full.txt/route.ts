export function GET() {
	const content = `# ProductName

> A concise and factual description of the application for AI-powered response mechanisms.

## About

ProductName is a modern web application built with Next.js.
Here you can describe in detail what the product does, who it serves,
and what problems it solves.

## Main Features

### Feature 1
Detailed description of the product's main feature.

### Feature 2
Detailed description of the second feature.

## Documentation

- [Docs](/docs): Main product documentation
- [API](/docs/api): API reference
- [Quickstart](/docs/quickstart): How to get started
- [Changelog](/changelog): Change history
- [FAQ](/docs/faq): Frequently asked questions

## Technical Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Observability**: OpenTelemetry + Sentry

## API

Base URL: \`https://domain.com/api\`

### Public Endpoints
- \`GET /api/health\` — Application status
- \`GET /api/docs\` — API documentation

## Contact

- Site: https://domain.com
- GitHub: https://github.com/your-org/your-repo
- Email: [EMAIL_ADDRESS]

## License

MIT
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400, s-maxage=86400",
		},
	});
}
