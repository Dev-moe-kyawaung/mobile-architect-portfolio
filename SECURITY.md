
---

## 📄 SECURITY.md

```markdown
# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes    |
| < 1.0   | ❌ No     |

## Reporting Vulnerabilities

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, email us at: **moekyawaung@programmer.net**

### What to Include
- Type of vulnerability
- Affected version/URL
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

### Response Timeline
- **24 hours**: Initial response
- **48 hours**: Detailed assessment
- **7 days**: Security patch (if critical)

## Security Best Practices

1. **XSS Prevention**
   - Escape user input
   - Use Content Security Policy
   
2. **Data Protection**
   - No sensitive data in client-side code
   - Use HTTPS for production

3. **Dependency Security**
   - Regular security audits
   - Keep dependencies updated

4. **Configure Security Headers**
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
   <meta http-equiv="X-Frame-Options" content="DENY">
   <meta http-equiv="X-XSS-Protection" content="1; mode=block">
