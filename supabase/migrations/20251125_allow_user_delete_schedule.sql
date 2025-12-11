-- Allow users to delete their own schedules (Cancellation)
CREATE POLICY "Users can delete their own schedules"
  ON public.schedules FOR DELETE
  USING (auth.uid() = user_id);
