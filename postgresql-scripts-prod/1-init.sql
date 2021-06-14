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