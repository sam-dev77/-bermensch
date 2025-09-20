INSERT INTO institutions (name, code, contact_email, is_verified)
VALUES ('Jharkhand University', 'JHU001', 'contact@jhu.ac.in', TRUE);

INSERT INTO users (email, password_hash, full_name, role, institution_id, is_active)
VALUES ('admin@jhu.ac.in', '$2b$10$abcdef...', 'Admin User', 'institution_admin', 1, TRUE);

INSERT INTO certificates (institution_id, certificate_number, student_name, degree_name, issue_date, grades, hash_value)
VALUES (1, 'CERT2023001', 'Ananya Singh', 'B.Sc Computer Science', '2023-06-15', '{"GPA": "8.9"}', '0xabcdef...');