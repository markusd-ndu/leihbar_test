drop policy if exists "Alle duerfen Gegenstaende anlegen" on public.items;
create policy "Angemeldete legen eigene Gegenstaende an" on public.items
  for insert to authenticated
  with check (owner_id = (select auth.uid()));
