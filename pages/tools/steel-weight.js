import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { useT } from '../../lib/i18n';

const DENSITY = 7850; // kg/m3 for steel

const SHAPE_FIELDS = {
  round: ['d'],
  square: ['a'],
  flat: ['w', 't'],
  pipe: ['od', 'wt'],
  tube: ['w', 'h', 't'],
};
const SHAPE_KEYS = ['round', 'square', 'flat', 'pipe', 'tube'];

function areaM2(shape, dims) {
  const mm = (v) => (parseFloat(v) || 0) / 1000; // mm -> m
  switch (shape) {
    case 'round': {
      const d = mm(dims.d);
      return (Math.PI * d * d) / 4;
    }
    case 'square': {
      const a = mm(dims.a);
      return a * a;
    }
    case 'flat': {
      return mm(dims.w) * mm(dims.t);
    }
    case 'pipe': {
      const od = mm(dims.od), wt = mm(dims.wt);
      const id = Math.max(od - 2 * wt, 0);
      return (Math.PI * (od * od - id * id)) / 4;
    }
    case 'tube': {
      const w = mm(dims.w), h = mm(dims.h), t = mm(dims.t);
      const iw = Math.max(w - 2 * t, 0), ih = Math.max(h - 2 * t, 0);
      return w * h - iw * ih;
    }
    default:
      return 0;
  }
}

export default function SteelWeightCalculator() {
  const [shape, setShape] = useState('round');
  const [dims, setDims] = useState({});
  const [length, setLength] = useState('');
  const [qty, setQty] = useState('1');
  const { t } = useT();

  const result = useMemo(() => {
    const L = parseFloat(length) || 0;
    const Q = parseInt(qty) || 0;
    const A = areaM2(shape, dims);
    const perPiece = A * L * DENSITY;
    return { perPiece, total: perPiece * Q, valid: A > 0 && L > 0 && Q > 0 };
  }, [shape, dims, length, qty]);

  const setDim = (key, value) => setDims((p) => ({ ...p, [key]: value }));

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/tools" className="text-blue-200 hover:text-white text-sm">{t('pages.tools.allTools')}</Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{t('pages.tools.steel.title')}</h1>
          <p className="text-blue-100 mt-2">{t('pages.tools.steel.intro')}</p>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.tools.steel.shapeLabel')}</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {SHAPE_KEYS.map((key) => (
                <button
                  key={key} type="button" onClick={() => { setShape(key); setDims({}); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${shape === key ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {t(`pages.tools.steel.shapes.${key}`)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {SHAPE_FIELDS[shape].map((fieldKey) => (
                <div key={fieldKey}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t(`pages.tools.steel.fields.${fieldKey}`)}</label>
                  <input
                    type="number" min="0" step="any" value={dims[fieldKey] || ''}
                    onChange={(e) => setDim(fieldKey, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.tools.steel.lengthLabel')}</label>
                <input
                  type="number" min="0" step="any" value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('pages.tools.steel.lengthPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.tools.steel.qtyLabel')}</label>
                <input
                  type="number" min="1" step="1" value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
              {result.valid ? (
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">{t('pages.tools.steel.perPiece')}</p>
                    <p className="text-3xl font-bold">{result.perPiece.toFixed(2)} <span className="text-lg font-medium">kg</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">{t('pages.tools.steel.totalWeight').replace('{qty}', qty)}</p>
                    <p className="text-3xl font-bold">{result.total.toFixed(2)} <span className="text-lg font-medium">kg</span></p>
                    <p className="text-blue-200 text-sm mt-1">{(result.total / 1000).toFixed(3)} {t('pages.tools.steel.tonnes')}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-blue-100">{t('pages.tools.steel.emptyResult')}</p>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {t('pages.tools.steel.note')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
