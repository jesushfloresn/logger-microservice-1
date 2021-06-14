DROP TABLE IF EXISTS public.logs;

CREATE TABLE IF NOT EXISTS public.logs
(
    id SERIAL,
    date timestamp without time zone NOT NULL,
    event character varying(500) COLLATE pg_catalog."default" NOT NULL,
    admin_user character varying(300) COLLATE pg_catalog."default" NOT NULL,
    ip character varying(15) COLLATE pg_catalog."default",
    CONSTRAINT logs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.logs
    OWNER to logger_admin;

INSERT INTO public.logs(date, event, admin_user, ip)
    VALUES 
        (now(), 'Login en el sistema', 'jesushfloren@metropolitan.org', '192.168.1.17'),
        (now(), 'Alta de usuario', 'jesushfloren@metropolitan.org', '192.168.1.17');
