-- Add photo_url column if it doesn't exist
ALTER TABLE public.progress_photos 
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Add month column if it doesn't exist
ALTER TABLE public.progress_photos 
ADD COLUMN IF NOT EXISTS month INTEGER;

-- Add year column if it doesn't exist
ALTER TABLE public.progress_photos 
ADD COLUMN IF NOT EXISTS year INTEGER;

-- Add description column if it doesn't exist
ALTER TABLE public.progress_photos 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update existing rows to have default month and year (use created_at or current date)
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

-- Add index for efficient queries by month/year if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_progress_photos_user_month_year 
ON public.progress_photos(user_id, year, month);


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

-- Add index for efficient queries by month/year if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_progress_photos_user_month_year 
ON public.progress_photos(user_id, year, month);

