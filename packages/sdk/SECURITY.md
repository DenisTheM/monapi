# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in `@monapi/sdk`, please report it responsibly.

**Email:** security@monapi.dev

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Response time:** We aim to acknowledge reports within 48 hours and provide a fix within 7 days for critical issues.

## What qualifies?

- Input validation bypasses
- Dependency vulnerabilities that affect MonAPI users
- Supply chain attack vectors
- Payment routing manipulation
- Configuration injection

## What does NOT qualify?

- Vulnerabilities in x402 protocol or Coinbase Facilitator (report to respective maintainers)
- Rate limiting / DDoS (this is the API operator's responsibility)
- Issues requiring physical access to the server

## Scope

This policy covers the `@monapi/sdk` npm package and its source code at https://github.com/DenisTheM/monapi.

## Safe Harbor

We will not pursue legal action against researchers who:
- Act in good faith
- Avoid accessing user data
- Report findings promptly
- Do not publicly disclose before a fix is available
