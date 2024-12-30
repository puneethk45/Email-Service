const pool = require('../config/db');

const saveEmailLog = async (logData) => {
  const { id,userId,templateId, emailFrom, emailTo, emailCc, status, statusDesc } = logData;

 const currentDate = new Date();
const dateString = currentDate.toISOString().split('T')[0]; 
const created_by="admin"
  await pool.query(
    `INSERT INTO public.email_notifications
      (id,user_id,template_id, email_from, email_to, email_cc, status, status_desc,schedule_date,created_by,updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11)`,
    [id,userId, templateId, emailFrom, emailTo, emailCc, status, statusDesc,dateString,created_by,created_by]
  );
};

module.exports = { saveEmailLog };
