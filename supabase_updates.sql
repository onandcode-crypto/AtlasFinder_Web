-- ==========================================
-- AtlasFinder Supabase 스키마 업데이트 (V2)
-- 기존 테이블 유지하면서 새로운 요소만 추가/변경
-- ==========================================

-- ==========================================
-- 1. 기존 테이블 (Admins, Applications 등) 안전성 확인 (기존 코드 그대로 남겨둡니다)
-- ==========================================

-- 만약 admins 테이블이 없다면 만들기
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  needs_password_change BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 달력, 불가날짜, 포트폴리오, 갤러리 테이블이 없다면 만들기
CREATE TABLE IF NOT EXISTS public.calendar_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  open_days_limit INTEGER DEFAULT 30 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  price_type TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  os TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('인물', '상품')),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ★가장 중요★ 초기 관리자 계정('0000') 무조건 강제 주입!!
INSERT INTO public.admins (email, password_hash, needs_password_change) 
VALUES ('iam@atlasfinder.kr', '$2b$10$rmyoF4OnU8KiKgdv8zZ8IeE31ckFVnousY5IAJcqOwuT1gNXj9eUK', true)
ON CONFLICT (email) 
DO UPDATE SET password_hash = '$2b$10$rmyoF4OnU8KiKgdv8zZ8IeE31ckFVnousY5IAJcqOwuT1gNXj9eUK', needs_password_change = true;

-- 달력 기본 설정값 주입
INSERT INTO public.calendar_settings (open_days_limit) 
SELECT 30 WHERE NOT EXISTS (SELECT 1 FROM public.calendar_settings);


-- ==========================================
-- 2. 신규 테이블 생성 (AtlasLog, FAQ, Navigation, Site Atlas)
-- IF NOT EXISTS 를 사용하여 여러번 실행해도 안전하게 만듦
-- ==========================================

-- 2-1. AtlasLog (블로그 기능) 테이블
CREATE TABLE IF NOT EXISTS public.atlaslogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  author_id UUID REFERENCES public.admins(id),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2-2. Navigation Items (네비게이션 메뉴 관리) 테이블
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  path TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 초기 데이터 삽입 (기본 네비게이션이 비어있을 경우에만 주입)
INSERT INTO public.navigation_items (label, path, sort_order) 
SELECT '애플리케이션', '/applications', 1 
WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE path = '/applications');

INSERT INTO public.navigation_items (label, path, sort_order) 
SELECT '촬영서비스', '/photo', 2 
WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE path = '/photo');

INSERT INTO public.navigation_items (label, path, sort_order) 
SELECT 'About', '/#about', 3 
WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE path = '/#about');

INSERT INTO public.navigation_items (label, path, sort_order) 
SELECT 'AtlasLog', '/atlaslog', 4 
WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE path = '/atlaslog');


-- 2-3. FAQs (자주 묻는 질문 관리) 테이블
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2-4. Site Atlas (사이트 관리) 테이블
CREATE TABLE IF NOT EXISTS public.site_atlas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. Applications 테이블 상태 관리 개편 (is_active -> status)
-- ==========================================
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_schema='public' AND table_name='applications' AND column_name='is_active') THEN
    ALTER TABLE public.applications DROP COLUMN is_active;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema='public' AND table_name='applications' AND column_name='status') THEN
    ALTER TABLE public.applications ADD COLUMN status TEXT DEFAULT 'PUBLISHED' CHECK (status IN ('PUBLISHED', 'COMING_SOON', 'PRIVATE'));
  END IF;
END $$;


-- ==========================================
-- 4. RLS (Row Level Security) 및 조회 정책 설정
-- ==========================================

ALTER TABLE public.atlaslogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_atlas ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (충돌 방지)
DROP POLICY IF EXISTS "Public atlaslogs are viewable by everyone." ON public.atlaslogs;
DROP POLICY IF EXISTS "Public navigation are viewable by everyone." ON public.navigation_items;
DROP POLICY IF EXISTS "Public faqs are viewable by everyone." ON public.faqs;
DROP POLICY IF EXISTS "Public site_atlas are viewable by everyone." ON public.site_atlas;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.applications;

-- 누구나 볼 수 있도록 SELECT 정책 추가
CREATE POLICY "Public atlaslogs are viewable by everyone." ON public.atlaslogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public navigation are viewable by everyone." ON public.navigation_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public faqs are viewable by everyone." ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public site_atlas are viewable by everyone." ON public.site_atlas FOR SELECT USING (is_active = true);
CREATE POLICY "Public profiles are viewable by everyone." ON public.applications FOR SELECT USING (status IN ('PUBLISHED', 'COMING_SOON'));
