# ==========================================
# AtlasFinder Supabase Database Schema
# ==========================================

-- 1. 예약 테이블 (Reservations)
CREATE TABLE public.reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  type TEXT NOT NULL, -- '인물웨딩', '인물스냅', '상품'
  date DATE NOT NULL,
  location TEXT,
  request TEXT,
  status TEXT DEFAULT '대기중' CHECK (status IN ('대기중', '확정', '취소')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 인덱스
CREATE INDEX idx_reservations_phone_email ON public.reservations(phone, email);

-- 2. 달력 설정 관리 (Calendar Settings)
CREATE TABLE public.calendar_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  open_days_limit INTEGER DEFAULT 30 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 단일 설정(Row)만 유지
INSERT INTO public.calendar_settings (open_days_limit) VALUES (30);

-- 3. 예약 불가 날짜 관리 (Blocked Dates)
CREATE TABLE public.blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. 애플리케이션 포트폴리오 (Applications)
CREATE TABLE public.applications (
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

-- 5. 사진 갤러리 (Galleries)
CREATE TABLE public.galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('인물', '상품')),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) 설정
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

-- 누구나 애플리케이션, 갤러리를 볼 수 있음 (Read-Only)
CREATE POLICY "Public profiles are viewable by everyone." ON public.applications FOR SELECT USING (true);
CREATE POLICY "Public galleries are viewable by everyone." ON public.galleries FOR SELECT USING (true);

-- API Server를 통해서만 예약을 추가, 서버 서비스 롤(Service Role)은 모두 접근 가능
-- (권한 설정은 Admin 대시보드에서 SSR로 처리하므로 Service Key 사용을 전제)
