import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';

const DENSITY = 7850; // kg/m3 for steel

const shapes = {
  round: { label: 'Round Bar', fields: [{ key: 'd', label: 'Diameter (mm)' }] },
  square: { label: 'Square Bar', fields: [{ key: 'a', label: 'Side (mm)' }] },
  flat: { label: 'Flat Bar / Plate', fields: [{ key: 'w', label: 'Width (mm)' }, { key: 't', label: 'Thickness (mm)' }] },
  pipe: { label: 'Round Pipe', fields: [{ key: 'od', label: 'Outer Diameter (mm)' }, { key: 'wt', label: 'Wall Thickness (mm)' }] },
  tube: { label: 'Rectangular Tube', fields: [{ key: 'w', label: 'Width (mm)' }, { key: 'h', label: 'Height (mm)' }, { key: 't', label: 'Wall Thickness (mm)' }] },
};

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
          <Link href="/tools" className="text-blue-200 hover:text-white text-sm">← All Tools</Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">⚖️ Steel Weight Calculator</h1>
          <p className="text-blue-100 mt-2">Calculate the weight of steel bars, plates and pipes. Density: 7,850 kg/m³</p>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {Object.entries(shapes).map(([key, s]) => (
                <button
                  key={key} type="button" onClick={() => { setShape(key); setDims({}); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${shape === key ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {shapes[shape].fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                  <input
                    type="number" min="0" step="any" value={dims[f.key] || ''}
                    onChange={(e) => setDim(f.key, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
                <input
                  type="number" min="0" step="any" value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
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
                    <p className="text-blue-200 text-sm mb-1">Weight per piece</p>
                    <p className="text-3xl font-bold">{result.perPiece.toFixed(2)} <span className="text-lg font-medium">kg</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Total weight ({qty} pcs)</p>
                    <p className="text-3xl font-bold">{result.total.toFixed(2)} <span className="text-lg font-medium">kg</span></p>
                    <p className="text-blue-200 text-sm mt-1">{(result.total / 1000).toFixed(3)} tonnes</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-blue-100">Enter dimensions, length and quantity to see the weight.</p>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Theoretical weight based on 7,850 kg/m³. Add 2-3% wastage for ordering.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
