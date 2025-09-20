const { User, Institution } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res, next) => {
  try {
    const { email, password, full_name, role, institution_code } = req.body;
    const institution = institution_code ? await Institution.findOne({ where: { code: institution_code } }) : null;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password_hash: hash,
      full_name,
      role,
      institution_id: institution ? institution.id : null
    });
    res.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, is_active: true } });
    if (!user) throw { status: 401, message: 'Invalid credentials' };
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw { status: 401, message: 'Invalid credentials' };
    const token = jwt.sign({
      id: user.id,
      role: user.role,
      institution_id: user.institution_id
    }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ success: true, token, user: { id: user.id, role: user.role } });
  } catch (err) { next(err); }
};