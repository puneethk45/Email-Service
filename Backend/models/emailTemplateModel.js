const pool = require('../config/db');

const getTemplateById = async (templateId) => {
  const result = await pool.query(
    'SELECT * FROM public.email_templates WHERE template_id = $1',
    [templateId]
  );
  return result.rows[0];
};

module.exports = { getTemplateById };
