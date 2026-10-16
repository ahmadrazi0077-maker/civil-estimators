import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';

const MIXES = {
  '1:1.5:3': { label: '1 : 1.5 : 3 (M20)', parts: [1, 1.5, 3] },
  '1:2:4': { label: '1 : 2 : 4 (M15)', parts: [1, 2, 4] },
  '1:3:6': { label: '1 : 3 : 6 (M10)', parts: [1, 3, 6] },
  '1:4:8': { label: '1 : 4 : 8', parts: [1, 4, 8] },
};

const DRY_FACTOR = 1.52; // dry volume factor
const CEMENT_DENSITY = 1440; // kg/m3
const BAG_KG = 50;

export default function ConcreteCalculator() {
  const [element, setElement] = useState('slab');
  const [dims, setDims] = useState({});
  const [count, setCount] = useState('1');
  const [mix, setMix] = useState('1:1.5:3');

  const setDim = (key, value) => setDims((p) => ({ ...p, [key]: value }));
  const num = (v) => parseFloat(v) || 0;

  const result = useMemo(() => {
    const n = parseInt(count) || 0;
    let vol = 0;
    if (element === 'slab') {
      vol = num(dims.l) * num(dims.w) * num(dims.t);
    } else if (element === 'column') {
      if (dims.shape === 'round') {
        const d = num(dims.d);
        vol = (Math.PI * d * d) / 4 * num(dims.h);
      } else {
        vol = num(dims.l) * num(dims.w) * num(dims.h);
      }
    } else if (element === 'footing') {
      vol = num(dims.l) * num(dims.w) * num(dims.t);
    }
    const totalVol = vol * n;
    const parts = MIXES[mix].parts;
    const sum = parts[0] + parts[1] + parts[2];
    const dryVol = totalVol * DRY_FACTOR;
    const cementVol = (parts[0] / sum) * dryVol;
    const sandVol = (parts[1] / sum) * dryVol;
    const aggVol = (parts[2] / sum) * dryVol;
    const cementBags = (cementVol * CEMENT_DENSITY) / BAG_KG;
    return { totalVol, cementBags, sandVol, aggVol, valid: totalVol > 0 && n > 0 };
  }, [element, dims, count, mix]);

  const field = (key, label, placeholder) => (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="number" min="0" step="any" value={dims[key] || ''}
        onChange={(e) => setDim(key, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/tools" className="text-blue-200 hover:text-white text-sm">← All Tools</Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">🏗️ Concrete Calculator</h1>
          <p className="text-blue-100 mt-2">Concrete volume and material quantities — cement, sand & aggregate.</p>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Element</label>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { key: 'slab', label: 'Slab' },
                { key: 'column', label: 'Column' },
                { key: 'footing', label: 'Footing' },
              ].map((el) => (
                <button
                  key={el.key} type="button"
                  onClick={() => { setElement(el.key); setDims({}); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${element === el.key ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {el.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {element === 'slab' && (
                <>
                  {field('l', 'Length (m)', 'e.g. 5')}
                  {field('w', 'Width (m)', 'e.g. 4')}
                  {field('t', 'Thickness (m)', 'e.g. 0.15')}
                </>
              )}
              {element === 'column' && (
                <>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Column Shape</label>
                    <div className="flex gap-2">
                      {[
                        { key: 'rect', label: 'Rectangular' },
                        { key: 'round', label: 'Round' },
                      ].map((s) => (
                        <button
                          key={s.key} type="button"
                          onClick={() => setDim('shape', s.key)}
                          className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${(dims.shape || 'rect') === s.key ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {(dims.shape || 'rect') === 'round' ? (
                    <>{field('d', 'Diameter (m)', 'e.g. 0.4')}</>
                  ) : (
                    <>{field('l', 'Length (m)', 'e.g. 0.3')}{field('w', 'Width (m)', 'e.g. 0.3')}</>
                  )}
                  {field('h', 'Height (m)', 'e.g. 3')}
                </>
              )}
              {element === 'footing' && (
                <>
                  {field('l', 'Length (m)', 'e.g. 2')}
                  {field('w', 'Width (m)', 'e.g. 2')}
                  {field('t', 'Thickness (m)', 'e.g. 0.5')}
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of elements</label>
                <input
                  type="number" min="1" step="1" value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mix Ratio</label>
                <select
                  value={mix} onChange={(e) => setMix(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {Object.entries(MIXES).map(([key, m]) => (
                    <option key={key} value={key}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
              {result.valid ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Wet Volume</p>
                    <p className="text-2xl font-bold">{result.totalVol.toFixed(2)} <span className="text-sm font-medium">m³</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Cement</p>
                    <p className="text-2xl font-bold">{result.cementBags.toFixed(1)} <span className="text-sm font-medium">bags</span></p>
                    <p className="text-blue-200 text-xs mt-1">50 kg bags</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Sand</p>
                    <p className="text-2xl font-bold">{result.sandVol.toFixed(2)} <span className="text-sm font-medium">m³</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Aggregate</p>
                    <p className="text-2xl font-bold">{result.aggVol.toFixed(2)} <span className="text-sm font-medium">m³</span></p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-blue-100">Enter dimensions to calculate materials.</p>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Includes 1.52 dry-volume factor. Add 5% wastage for ordering.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
