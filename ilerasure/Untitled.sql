CREATE TABLE "Utilisateurs" (
  "user_id" INT PRIMARY KEY,
  "name" VARCHAR,
  "email" VARCHAR,
  "password" VARCHAR,
  "phone_number" VARCHAR,
  "role" ENUM,
  "address" TEXT,
  "created_at" TIMESTAMP
);

CREATE TABLE "Médecins" (
  "doctor_id" INT PRIMARY KEY,
  "name" VARCHAR,
  "email" VARCHAR,
  "password" VARCHAR,
  "phone_number" VARCHAR,
  "specialization" VARCHAR,
  "license_number" VARCHAR,
  "created_at" TIMESTAMP
);

CREATE TABLE "Médicaments" (
  "medicine_id" INT PRIMARY KEY,
  "name" VARCHAR,
  "description" TEXT,
  "price" DECIMAL,
  "availability_status" BOOLEAN,
  "pharmacy_id" INT
);

CREATE TABLE "Pharmacies" (
  "pharmacy_id" INT PRIMARY KEY,
  "name" VARCHAR,
  "location" GEOMETRY,
  "contact" VARCHAR,
  "rating" DECIMAL
);

CREATE TABLE "Commandes" (
  "order_id" INT PRIMARY KEY,
  "user_id" INT,
  "pharmacy_id" INT,
  "total_price" DECIMAL,
  "status" ENUM,
  "created_at" TIMESTAMP
);

CREATE TABLE "Paiements" (
  "payment_id" INT PRIMARY KEY,
  "order_id" INT,
  "payment_method" ENUM,
  "amount" DECIMAL,
  "payment_date" TIMESTAMP
);

CREATE TABLE "Ordonnances" (
  "prescription_id" INT PRIMARY KEY,
  "doctor_id" INT,
  "user_id" INT,
  "issued_date" TIMESTAMP,
  "details" TEXT,
  "valid_until" DATE,
  "status" ENUM
);

CREATE TABLE "Notifications" (
  "notification_id" INT PRIMARY KEY,
  "recipient_id" INT,
  "message" TEXT,
  "sent_at" TIMESTAMP
);

ALTER TABLE "Médicaments" ADD FOREIGN KEY ("pharmacy_id") REFERENCES "Pharmacies" ("pharmacy_id");

ALTER TABLE "Commandes" ADD FOREIGN KEY ("user_id") REFERENCES "Utilisateurs" ("user_id");

ALTER TABLE "Commandes" ADD FOREIGN KEY ("pharmacy_id") REFERENCES "Pharmacies" ("pharmacy_id");

ALTER TABLE "Paiements" ADD FOREIGN KEY ("order_id") REFERENCES "Commandes" ("order_id");

ALTER TABLE "Ordonnances" ADD FOREIGN KEY ("doctor_id") REFERENCES "Médecins" ("doctor_id");

ALTER TABLE "Ordonnances" ADD FOREIGN KEY ("user_id") REFERENCES "Utilisateurs" ("user_id");

ALTER TABLE "Paiements" ADD FOREIGN KEY ("payment_method") REFERENCES "Paiements" ("order_id");
