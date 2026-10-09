-- Meldet über Realtime, dass sich die Anfragen eines Gegenstands geändert haben.
-- Das Signal enthält nur die Gegenstands-ID; die Zahl holt der Browser über anzahl_anfragen.
create function public.anfragen_geaendert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  gegenstand uuid := coalesce(new.item_id, old.item_id);
begin
  perform realtime.send(
    jsonb_build_object('gegenstand', gegenstand),
    'geaendert',
    'anfragen:' || gegenstand::text,
    false -- öffentlicher Kanal: auch Abgemeldete sehen den Zähler live
  );
  return null;
end;
$$;

-- Nur der Trigger ruft die Funktion auf, niemand direkt.
revoke execute on function public.anfragen_geaendert() from public, anon, authenticated;

create trigger anfragen_live
  after insert or delete on public.requests
  for each row execute function public.anfragen_geaendert();
