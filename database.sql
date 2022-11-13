CREATE TABLE "location" (
	"id" serial NOT NULL,
	"city" varchar(100) NOT NULL,
	"state_code" varchar(2) NOT NULL,
	"lng" DECIMAL NOT NULL,
	"lat" DECIMAL NOT NULL,
	CONSTRAINT "location_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "location" ("city", "state_code", "lng", "lat")
VALUES ('Fargo', 'ND', '-96.789803', '46.877186'),
('Jamestown', 'ND', '-98.708534', '46.909538'),
('Detroit Lakes', 'MN', '-95.848160', '46.827316'),
('Bismarck', 'ND', '-100.778275', '46.825905'),
('Mandan', 'ND', '-100.889580', '46.826660');

SELECT * FROM "location";

--lat: 46.8321521
--lng: -96.813582

SELECT * FROM "location" 
ORDER BY
ABS('-96.813582' - "lng"), ABS('46.8321521' - "lat")
LIMIT 3;