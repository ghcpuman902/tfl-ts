# Security policy

## Supported versions

Security fixes go into the latest 2.x release on npm. Older versions are not patched; upgrade to the latest 2.x.

| Version | Supported |
| --- | --- |
| Latest 2.x | Yes |
| Older 2.x, 1.x | No |

## Reporting a vulnerability

Please report privately, not in a public issue. Use GitHub's private vulnerability reporting: open the [Security tab](https://github.com/ghcpuman902/tfl-ts/security) and click **Report a vulnerability** ([direct link](https://github.com/ghcpuman902/tfl-ts/security/advisories/new)).

Include the affected version, steps to reproduce, and the impact you expect.

## What to expect

tfl-ts has one maintainer. You should get a first reply within 7 days. Confirmed issues are fixed in a new release, and a GitHub Security Advisory is published once the fix is on npm. You are credited in the advisory unless you ask not to be.

## Scope

In scope:

- The `tfl-ts` npm package: the client, `tfl-ts/meta`, `tfl-ts/ui` and the other published entry points, and the `tfl` CLI.
- The MCP server (`tfl mcp`, also run as `npx tfl-ts mcp`).

Out of scope:

- The TfL Unified API itself. Report problems with it to Transport for London.
- The demo site at tfl-ts.dev, unless the issue comes from code in this package.
- Your own TfL API key handling outside this package.

## Background

The package has no runtime dependencies and no install scripts (`preinstall`, `install` or `postinstall`). The MCP server is read-only: it talks over stdio, opens no network port, and only sends your TfL key to the official TfL API.
