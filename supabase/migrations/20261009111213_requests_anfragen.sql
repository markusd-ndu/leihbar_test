create table public.requests (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (item_id, user_id)
);

create index requests_user_id_idx on public.requests (user_id);

alter table public.requests enable row level security;

create policy "Eigene Anfragen lesen" on public.requests
  for select to authenticated using (user_id = (select auth.uid()));

create policy "Eigene Anfrage anlegen" on public.requests
  for insert to authenticated with check (user_id = (select auth.uid()));

create policy "Eigene Anfrage loeschen" on public.requests
  for delete to authenticated using (user_id = (select auth.uid()));

-- Zählen dürfen alle: liefert nur die Zahl, nicht wer angefragt hat.
create function public.anzahl_anfragen(gegenstand uuid)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer from public.requests where item_id = gegenstand;
$$;

revoke execute on function public.anzahl_anfragen(uuid) from public;
grant execute on function public.anzahl_anfragen(uuid) to anon, authenticated;
