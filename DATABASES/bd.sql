CREATE DATABASE  SERVER_PRINT;

USE SERVER_PRINT;

CREATE TABLE user(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE Documents(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    Name_Document VARCHAR(220),
    CONSTRAINT id_user FOREIGN KEY(id_user) REFERENCES user(id)
);

DELIMITER $$
CREATE TRIGGER delete_grup BEFORE DELETE ON user
  FOR EACH ROW
  BEGIN
  DELETE FROM Documents WHERE id_user = OLD.id;
  END $$
DELIMITER ;







DELETE FROM user WHERE id = 3;
-- SELECT * FROM Documents AS D LEFT JOIN user AS U ON ;
SELECT * FROM Documents JOIN user;
SELECT id_user AS id,Name_Document AS name,created_at AS date  FROM Documents AS D LEFT JOIN user AS U ON D.id_user = U.id ;


