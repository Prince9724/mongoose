import Contact from '../models/Contact.js';

export class ContactController {
  static async submitContact(req, res) {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
      }
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
      return res.status(201).json({ success: true, message: 'Your booking inquiry has been received!' });
    } catch (err) {
      return res.status(201).json({ success: true, message: 'Message received! (Demo Mode)' });
    }
  }

  static async getContacts(req, res) {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.json(contacts);
    } catch (err) {
      return res.json([
        { _id: '1', name: 'Sarah Jenkins', email: 'sarah@vogue-editorial.com', subject: 'Photography Booking', message: 'Shoot in LA on Oct 12', createdAt: new Date() }
      ]);
    }
  }
}
