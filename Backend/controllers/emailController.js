const emailService = require('../services/emailService');

const sendEmail = async (req, res) => {
  try {
    const { userId, templateId, emailTo, emailCc } = req.body;
    
    const response = await emailService.sendEmail({ userId, templateId, emailTo, emailCc });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = { sendEmail };
