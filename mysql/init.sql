-- Usuario app con acceso desde cualquier host
CREATE USER IF NOT EXISTS 'marcedb'@'%' IDENTIFIED BY 'marcepass';
GRANT ALL PRIVILEGES ON *.* TO 'marcedb'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
