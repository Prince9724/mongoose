export className AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    
    // Simple admin authentication check
    if (email === 'admin@princelensbeats.com' && password === 'admin123') {
      const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dev_admin_token_2026';
      return res.json({
        success: true,
        message: 'Admin authentication successful',
        token: dummyToken,
        user: { name: 'Prince Admin', email }
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }
}
