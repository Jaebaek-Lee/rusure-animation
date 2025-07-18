# Eye Tracking Character

귀여운 녹색 삼각형 캐릭터가 마우스를 따라다니는 인터랙티브 웹 애플리케이션입니다.

## 기능

- 🎯 마우스 따라가는 눈동자 애니메이션
- 💧 마우스를 아래로 내리면 눈물 효과 (파도 애니메이션)
- 😊 마우스를 위로 올리면 볼 홍조 효과
- 📱 반응형 디자인

## 기술 스택

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Database**: PostgreSQL + Drizzle ORM

## Vercel 배포 방법

### 1. 프로젝트 준비
```bash
# 프로젝트 클론
git clone <your-repo-url>
cd <project-name>

# 의존성 설치
npm install
```

### 2. Vercel CLI 설치 및 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

### 3. 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수를 설정하세요:
- `DATABASE_URL`: PostgreSQL 연결 문자열
- `NODE_ENV`: production

### 4. 빌드 명령어
Vercel이 자동으로 감지하지만, 필요시 다음 설정을 사용하세요:
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm install`

## 로컬 개발

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 파일 구조

```
├── client/          # React 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
├── server/          # Express 백엔드
├── shared/          # 공통 타입/스키마
├── vercel.json      # Vercel 배포 설정
└── ...
```

## 주의사항

1. **데이터베이스**: PostgreSQL 데이터베이스가 필요합니다 (Neon, Supabase 등)
2. **환경 변수**: DATABASE_URL을 반드시 설정해야 합니다
3. **포트**: Vercel에서는 자동으로 포트가 할당됩니다