create table public.items (
  id uuid primary key default gen_random_uuid(),
  titel text not null check (char_length(btrim(titel)) between 1 and 120),
  kategorie text not null check (kategorie in ('Mode', 'Wohnen & Deko', 'Technik', 'Freizeit')),
  beschreibung text not null default '' check (char_length(beschreibung) <= 2000),
  besitzer text not null check (char_length(btrim(besitzer)) between 1 and 80),
  ort text not null check (char_length(btrim(ort)) between 1 and 120),
  preis_pro_tag numeric(8, 2) not null default 0 check (preis_pro_tag >= 0 and preis_pro_tag <= 10000),
  verfuegbar boolean not null default true,
  bild_url text,
  owner_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index items_created_at_idx on public.items (created_at desc);

alter table public.items enable row level security;

-- Jeder darf lesen.
create policy "Alle duerfen Gegenstaende lesen"
  on public.items for select
  to anon, authenticated
  using (true);

-- Jeder darf anlegen. owner_id muss leer bleiben, bis es Anmeldung gibt (Issue 5).
create policy "Alle duerfen Gegenstaende anlegen"
  on public.items for insert
  to anon, authenticated
  with check (owner_id is null);
