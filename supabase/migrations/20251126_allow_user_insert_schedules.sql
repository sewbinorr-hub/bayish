-- Allow users to create their own schedules (bookings)
CREATE POLICY "Users can create their own schedules"
  ON public.schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own schedules
CREATE POLICY "Users can update their own schedules"
  ON public.schedules FOR UPDATE
  USING (auth.uid() = user_id);

