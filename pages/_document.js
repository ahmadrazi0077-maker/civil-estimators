import Document, { Html, Head, Main, NextScript } from 'next/document'

const META_DESCRIPTIONS = {
  en: 'Precon Detailing - Steel & Rebar Detailing, Quantity Takeoff, Cost Estimation, BOQ Preparation, and Shop Drawings',
  ar: 'Precon Detailing - تفصيل الصلب وحديد التسليح، حصر الكميات، تقدير التكاليف، إعداد جداول الكميات، ومخططات التنفيذ',
  es: 'Precon Detailing: detallado de acero y varilla, cómputo de cantidades, estimación de costos, preparación de BOQ y planos de taller',
}

class MyDocument extends Document {
  render() {
    const locale = (this.props.__NEXT_DATA__ && this.props.__NEXT_DATA__.locale) || 'en'
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    return (
      <Html lang={locale} dir={dir}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={META_DESCRIPTIONS[locale] || META_DESCRIPTIONS.en} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
