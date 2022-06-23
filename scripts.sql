DROP TABLE IF EXISTS one_com_role;
CREATE TABLE IF NOT EXISTS one_com_role ( 
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    role_name character varying(25) NOT NULL,
    CONSTRAINT one_com_role_unique UNIQUE (role_name),
    CONSTRAINT one_com_role_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS one_com_user;
CREATE TABLE IF NOT EXISTS one_com_user ( 
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  username character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  role_id integer NOT NULL,
  CONSTRAINT one_com_user_unique UNIQUE (role_name),
  constraint one_com_user_fkey foreign key (role_id) REFERENCES one_com_role (id)
);

DROP TABLE IF EXISTS one_com_permission;
CREATE TABLE IF NOT EXISTS one_com_permission ( 
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    endpoint character varying(25) NOT NULL,
    method character varying(10) NOT NULL,
    role_id integer NOT NULL,

    CONSTRAINT one_com_permission_pkey PRIMARY KEY (id),
    constraint one_com_permission_fkey foreign key (role_id) REFERENCES one_com_role (id)
);

INSERT INTO public.one_com_role(role_name) VALUES ('ADMIN');
INSERT INTO public.one_com_role(role_name) VALUES ('SELLER');
INSERT INTO public.one_com_role(role_name) VALUES ('SUPPORTER');
INSERT INTO public.one_com_role(role_name) VALUES ('CUSTOMER');

--"ADMIN"
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'POST', 1);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'GET', 1);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'PUT', 1);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'PATCH', 1);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'DELETE', 1);

--"SELLER"
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'POST', 2);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'GET', 2);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'PUT', 2);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'PATCH', 2);

-- "SUPPORTER"
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'GET', 3);
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'DELETE', 3);

--"CUSTOMER"
INSERT INTO public.one_com_permission(endpoint, method, role_id) VALUES ('/products', 'GET', 4);