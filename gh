# 🚀 درآمد نو — راهنمای راه‌اندازی کامل

## معرفی
سایت فروش مقالات با Next.js 14 + MongoDB + ZarinPal + تلگرام

---

## 📦 ساختار پروژه
```
daramad-noo/
├── app/
│   ├── page.js              ← صفحه اصلی
│   ├── articles/
│   │   ├── page.js          ← لیست مقالات
│   │   └── [slug]/page.js   ← صفحه هر مقاله
│   ├── admin/page.js        ← پنل ادمین
│   ├── payment/
│   │   ├── success/page.js  ← پرداخت موفق
│   │   └── failed/page.js   ← پرداخت ناموفق
│   └── api/
│       ├── articles/        ← API مقالات
│       ├── payment/         ← شروع پرداخت
│       ├── verify/          ← تایید پرداخت
│       ├── download/        ← دانلود امن
│       └── admin/           ← لاگین ادمین
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ArticleCard.js
│   └── BuyButton.js
├── lib/
│   ├── mongodb.js
│   ├── auth.js
│   └── telegram.js
├── models/
│   ├── Article.js
│   └── Purchase.js
└── middleware.js
```

---

## ⚙️ راه‌اندازی گام به گام

### ۱. MongoDB Atlas (رایگان)
1. به [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) برو
2. حساب رایگان بساز
3. یک Cluster رایگان بساز
4. در Database Access یک کاربر بساز
5. در Network Access آی‌پی `0.0.0.0/0` اضافه کن
6. Connection String رو کپی کن

### ۲. ربات تلگرام
1. به @BotFather برو
2. `/newbot` بفرست
3. توکن رو کپی کن

### ۳. زرین‌پال
1. به [zarinpal.com](https://zarinpal.com) برو
2. حساب بساز و Merchant ID بگیر
3. برای تست از sandbox استفاده کن

### ۴. Vercel (هاست رایگان)
1. به [vercel.com](https://vercel.com) برو
2. با GitHub حساب بساز
3. Import کن این ریپو رو
4. متغیرهای زیر رو تنظیم کن:

---

## 🔑 متغیرهای محیطی (Environment Variables)

در Vercel → Settings → Environment Variables اضافه کن:

| متغیر | مقدار |
|-------|-------|
| `MONGODB_URI` | mongodb+srv://user:pass@cluster.mongodb.net/daramad-noo |
| `JWT_SECRET` | یه رشته تصادفی طولانی |
| `ZARINPAL_MERCHANT_ID` | Merchant ID زرین‌پال |
| `NEXT_PUBLIC_SITE_URL` | https://your-app.vercel.app |
| `TELEGRAM_BOT_TOKEN` | توکن ربات تلگرام |
| `TELEGRAM_CHANNEL_ID` | @channel_id یا chat_id عددی |
| `ADMIN_PASSWORD` | رمز ادمین قوی |

---

## 🛠 اجرای محلی

```bash
# نصب dependencies
npm install

# ساخت فایل .env.local
cp .env.example .env.local
# (مقادیر را پر کن)

# اجرا
npm run dev
```

سایت روی http://localhost:3000 باز میشه

---

## 📝 اضافه کردن مقاله

به آدرس `/admin` برو و با ADMIN_PASSWORD وارد شو.

برای فایل مقاله:
- آپلود در **Google Drive** (Public link)  
- آپلود در **GitHub** در پوشه public
- یا هر CDN دیگه

---

## 🔒 امنیت پیاده‌شده
- ✅ JWT با HttpOnly Cookie
- ✅ Rate Limiting روی API
- ✅ لینک دانلود موقت ۲۴ ساعته
- ✅ حداکثر ۳ بار دانلود هر توکن
- ✅ Security Headers
- ✅ Input Validation
- ✅ تاخیر در لاگین غلط

---

## 📱 ارسال تلگرام
بعد از هر خرید موفق:
1. ربات به خریدار لینک دانلود میفرسته
2. ادمین اطلاع‌رسانی دریافت میکنه

خریدار باید آی‌دی تلگرام @ رو وارد کنه و قبلاً به ربات `/start` فرستاده باشه.

---

**ساخته‌شده با ❤ برای درآمد نو**
