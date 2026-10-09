-- Issue 10: Besitzer*innen nehmen Anfragen an oder lehnen sie ab.

alter table public.requests
  add column status text not null default 'offen'
    check (status in ('offen', 'angenommen', 'abgelehnt')),
  add column email text;

-- Bestehende Anfragen bekommen einmalig die E-Mail ihres Kontos.
update public.requests r
  set email = u.email
  from auth.users u
  where u.id = r.user_id;

-- Neue Anfragen: Die Datenbank setzt die E-Mail selbst aus dem Login.
alter table public.requests
  alter column email set default (auth.jwt() ->> 'email'),
  alter column email set not null;

-- Lesen: die anfragende Person und die Besitzer*in des Gegenstands.
drop policy "Eigene Anfragen lesen" on public.requests;
create policy "Eigene und erhaltene Anfragen lesen" on public.requests
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.items i
      where i.id = item_id and i.owner_id = (select auth.uid())
    )
  );

-- Anlegen: nur die eigene, mit der eigenen E-Mail und als „offen“.
drop policy "Eigene Anfrage anlegen" on public.requests;
create policy "Eigene Anfrage anlegen" on public.requests
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and email = (select auth.jwt() ->> 'email')
    and status = 'offen'
  );

-- Ändern: nur die Besitzer*in des Gegenstands …
create policy "Besitzerin aendert Status" on public.requests
  for update to authenticated
  using (
    exists (
      select 1 from public.items i
      where i.id = item_id and i.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.items i
      where i.id = item_id and i.owner_id = (select auth.uid())
    )
  );

-- … und nur die Spalte status.
revoke update on public.requests from anon, authenticated;
grant update (status) on public.requests to authenticated;

create index items_owner_id_idx on public.items (owner_id);
