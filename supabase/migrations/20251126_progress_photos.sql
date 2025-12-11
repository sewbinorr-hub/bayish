-- Create progress_photos table
CREATE TABLE IF NOT EXISTS public.progress_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add photo_url column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'progress_photos' 
    AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE public.progress_photos ADD COLUMN photo_url TEXT;
  END IF;
END $$;

-- Add month column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'progress_photos' 
    AND column_name = 'month'
  ) THEN
    ALTER TABLE public.progress_photos ADD COLUMN month INTEGER;
  END IF;
END $$;

-- Add year column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'progress_photos' 
    AND column_name = 'year'
  ) THEN
    ALTER TABLE public.progress_photos ADD COLUMN year INTEGER;
  END IF;
END $$;

-- Add description column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'progress_photos' 
    AND column_name = 'description'
  ) THEN
    ALTER TABLE public.progress_photos ADD COLUMN description TEXT;
  END IF;
END $$;

-- Set default month and year for existing rows if null (use current date as default)
UPDATE public.progress_photos 
SET 
  month = EXTRACT(MONTH FROM COALESCE(created_at, NOW()))::INTEGER,
  year = EXTRACT(YEAR FROM COALESCE(created_at, NOW()))::INTEGER 
WHERE month IS NULL OR year IS NULL;

-- Make month NOT NULL after setting defaults
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'progress_photos' 
    AND column_name = 'month'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE public.progress_photos ALTER COLUMN month SET NOT NULL;
  END IF;
END $$;

-- Make year NOT NULL after setting defaults
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'progress_photos' 
    AND column_name = 'year'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE public.progress_photos ALTER COLUMN year SET NOT NULL;
  END IF;
END $$;

-- Create index for efficient queries by month/year
CREATE INDEX IF NOT EXISTS idx_progress_photos_user_month_year 
ON public.progress_photos(user_id, year, month);

-- Enable RLS
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for progress_photos
CREATE POLICY "Users can view their own progress photos"
  ON public.progress_photos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress photos"
  ON public.progress_photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress photos"
  ON public.progress_photos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress photos"
  ON public.progress_photos FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress photos"
  ON public.progress_photos FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for progress photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('progress-photos', 'progress-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for progress photos
CREATE POLICY "Users can upload their own progress photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'progress-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own progress photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'progress-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own progress photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'progress-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view progress photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'progress-photos');

CREATE POLICY "Admins can view all progress photos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'progress-photos' AND
    has_role(auth.uid(), 'admin'::app_role)
  );

-- Add trigger for updated_at
CREATE TRIGGER update_progress_photos_updated_at
BEFORE UPDATE ON public.progress_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();



CREATE POLICY "Users can delete their own progress photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'progress-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view progress photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'progress-photos');

CREATE POLICY "Admins can view all progress photos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'progress-photos' AND
    has_role(auth.uid(), 'admin'::app_role)
  );

-- Add trigger for updated_at
CREATE TRIGGER update_progress_photos_updated_at
BEFORE UPDATE ON public.progress_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

