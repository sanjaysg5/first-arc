-- =============================================================================
-- First Arc — initial schema
-- Metadata + leads only. No raw enterprise data is ever stored here.
-- =============================================================================

create extension if not exists pgcrypto;

-- ------------------------------- buyers -------------------------------------
create table if not exists public.buyers (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  name                  text not null,
  email                 text not null,
  company               text not null,
  role                  text,
  linkedin              text,
  company_website       text,
  company_type          text,
  use_case              text,
  training_stage        text[],
  description           text,
  industry              text,
  workflow              text,
  source_systems        text,
  volume_requirement    text,
  historical_or_ongoing text,
  format                text,
  recurring             text,
  exclusivity           boolean default false,
  geography             text,
  timeline              text,
  budget_range          text,
  status                text not null default 'new'
                        check (status in ('new','qualified','discovery','matched','pilot','closed','rejected')),
  notes                 text
);

-- ------------------------------ suppliers -----------------------------------
create table if not exists public.suppliers (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  contact_name          text not null,
  email                 text not null,
  company               text not null,
  website               text,
  industry              text,
  employee_count        text,
  country               text,
  role                  text,
  systems               text[],
  history_years         text,
  estimated_volume      text,
  employees_represented text,
  customers_represented text,
  workflow_types        text,
  excluded_data         text,
  licensing_interest    text,
  license_preference    text,
  residency_constraints text,
  security_requirements text,
  status                text not null default 'new'
                        check (status in ('new','qualified','discovery','matched','pilot','closed','rejected')),
  notes                 text
);

-- ----------------------------- data_assets ----------------------------------
create table if not exists public.data_assets (
  id                uuid primary key default gen_random_uuid(),
  supplier_id       uuid references public.suppliers(id) on delete set null,
  created_at        timestamptz not null default now(),
  asset_name        text not null,
  description       text,
  industry          text,
  systems           text[],
  workflow_type     text,
  historical_years  text,
  estimated_records text,
  estimated_size    text,
  sensitivity       text,
  pii_level         text,
  ip_risk           text,
  customer_data     text,
  workflow_richness text,
  legal_status      text,
  status            text not null default 'discovered'
                    check (status in ('discovered','under_review','qualified','available','licensed','rejected'))
);

-- ------------------------------- matches ------------------------------------
create table if not exists public.matches (
  id           uuid primary key default gen_random_uuid(),
  buyer_id     uuid not null references public.buyers(id) on delete cascade,
  supplier_id  uuid not null references public.suppliers(id) on delete cascade,
  asset_id     uuid references public.data_assets(id) on delete set null,
  created_at   timestamptz not null default now(),
  match_score  integer,
  match_reason text,
  status       text not null default 'suggested'
               check (status in ('suggested','reviewing','introduced','pilot','licensed','closed')),
  notes        text
);

-- ----------------------------- admin_users ----------------------------------
create table if not exists public.admin_users (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text not null unique,
  role       text default 'admin'
);

-- --------------------------- contact_messages -------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  company    text,
  message    text not null,
  type       text
);

-- --------------------------- admin_audit_log --------------------------------
create table if not exists public.admin_audit_log (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  actor_email text,
  entity      text not null,
  entity_id   uuid,
  action      text not null,
  detail      text
);

-- ------------------------------- indexes ------------------------------------
create index if not exists buyers_created_at_idx on public.buyers (created_at desc);
create index if not exists buyers_status_idx on public.buyers (status);
create index if not exists suppliers_created_at_idx on public.suppliers (created_at desc);
create index if not exists suppliers_status_idx on public.suppliers (status);
create index if not exists data_assets_supplier_idx on public.data_assets (supplier_id);
create index if not exists data_assets_status_idx on public.data_assets (status);
create index if not exists matches_buyer_idx on public.matches (buyer_id);
create index if not exists matches_supplier_idx on public.matches (supplier_id);
create index if not exists contact_created_at_idx on public.contact_messages (created_at desc);

-- =============================================================================
-- Row Level Security
--   Public (anon/authenticated) may INSERT leads only — no read access.
--   All reads/updates happen via the service-role key on the server, which
--   bypasses RLS. Internal tables have no public policies at all.
-- =============================================================================

alter table public.buyers            enable row level security;
alter table public.suppliers         enable row level security;
alter table public.contact_messages  enable row level security;
alter table public.data_assets       enable row level security;
alter table public.matches           enable row level security;
alter table public.admin_users       enable row level security;
alter table public.admin_audit_log   enable row level security;

drop policy if exists "public submit buyers" on public.buyers;
create policy "public submit buyers"
  on public.buyers for insert to anon, authenticated with check (true);

drop policy if exists "public submit suppliers" on public.suppliers;
create policy "public submit suppliers"
  on public.suppliers for insert to anon, authenticated with check (true);

drop policy if exists "public submit contact" on public.contact_messages;
create policy "public submit contact"
  on public.contact_messages for insert to anon, authenticated with check (true);

-- data_assets, matches, admin_users, admin_audit_log: no public policies
-- (RLS enabled with zero policies = deny all for anon/authenticated).
