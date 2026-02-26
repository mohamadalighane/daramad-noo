import './globals.css'

export const metadata = {
  title: 'درآمد نو | مقالات تخصصی کسب درآمد',
  description: 'مقالات تخصصی کسب درآمد آنلاین، فریلنسینگ، و کارآفرینی دیجیتال',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
