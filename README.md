# toyonix.github.io

The root toyonix site: landing page and portfolio at <https://toyonix.github.io/>, and the
publisher of `/registry.json`, the app list behind the shared nav.

Built with Next.js (static export) on [`@toyonix/web-kit`](https://github.com/ToYoNiX/web-kit),
from the `web-starter` template. See [AGENTS.md](AGENTS.md).

```sh
npm ci
npm run dev                                   # http://localhost:3000/
GITHUB_TOKEN=$(gh auth token) npm run build   # static export to ./out
npm run check                                 # format, lint, typecheck, build
```

## License

MIT, see [LICENSE](LICENSE).
