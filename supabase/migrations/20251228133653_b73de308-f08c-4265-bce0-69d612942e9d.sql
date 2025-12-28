-- Bootstrap admin role for a specific founder email
CREATE OR REPLACE FUNCTION public.ensure_bootstrap_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_email text;
  current_id uuid;
BEGIN
  current_id := auth.uid();
  IF current_id IS NULL THEN
    RETURN;
  END IF;

  SELECT email INTO current_email
  FROM auth.users
  WHERE id = current_id;

  IF current_email = 'krishna.biochem85@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (current_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;