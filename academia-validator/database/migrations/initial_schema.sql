CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  contact_email VARCHAR(100) NOT NULL,
  public_key TEXT,
  is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  institution_id INT REFERENCES institutions(id),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  institution_id INT REFERENCES institutions(id),
  certificate_number VARCHAR(100) NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  degree_name VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  grades JSONB,
  hash_value VARCHAR(255) NOT NULL,
  blockchain_tx_hash VARCHAR(255)
);

CREATE TABLE verification_logs (
  id SERIAL PRIMARY KEY,
  certificate_id INT REFERENCES certificates(id),
  verifier_id INT REFERENCES users(id),
  verification_method VARCHAR(20) NOT NULL,
  is_successful BOOLEAN NOT NULL,
  verification_details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id INT,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);