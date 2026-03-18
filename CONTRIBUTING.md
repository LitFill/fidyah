# Contributing to Kalkulator Fidyah

Thank you for your interest in contributing to this project.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:
1. Check existing issues first
2. Create a new issue with:
   - Clear description
   - Steps to reproduce (if bug)
   - Expected vs actual behavior

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/LitFill/fidyah.git
cd fidyah

# Install dependencies (if any)
# No external dependencies - uses CDN

# Run tests
npm test

# Serve locally
# Use any static server, e.g.:
npx serve .
# Or open index.html directly in browser
```

### Code Style

- Follow existing code patterns
- Use meaningful variable names
- Comment complex logic
- Keep functions small and focused

### Commit Messages

Follow conventional commit format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Adding tests

Example: `feat(calculator): Add multi-year fidyah calculation`

## Project Structure

```
fidyah/
├── index.html          # Main calculator page
├── README.md           # Project documentation
├── USAGE.md            # Usage guide
├── FAQ.md              # Frequently asked questions
├── conductor/          # Project management (conductor)
│   ├── index.md
│   ├── workflow.md
│   ├── product.md
│   ├── tech-stack.md
│   └── tracks/         # Implementation tracks
└── .github/            # GitHub configuration
```

## Religious/Fiqh Content

For changes related to Islamic fiqh content:
- Ensure accuracy based on Madzhab Syafii
- Provide references (Quran verses, hadith)
- Consult with scholars if unsure

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
