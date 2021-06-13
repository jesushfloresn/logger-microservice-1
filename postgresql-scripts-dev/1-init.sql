DROP TABLE IF EXISTS public.logs;

CREATE TABLE IF NOT EXISTS public.logs
(
    id integer NOT NULL,
    date date NOT NULL,
    event character varying(500) COLLATE pg_catalog."default" NOT NULL,
    usuario character varying(300) COLLATE pg_catalog."default" NOT NULL,
    ip character varying(15) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT logs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.logs
    OWNER to logger_admin;

INSERT INTO public.logs 
    VALUES 
        (1, now(), 'Login en el sistema', 'jesushfloren@metropolitan.org', '192.168.1.17'),
        (2, now(), 'Alta de usuario', 'jesushfloren@metropolitan.org', '192.168.1.17');
