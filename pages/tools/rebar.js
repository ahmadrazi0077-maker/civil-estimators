import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';

const DIAMETERS = [8, 10, 12, 16, 20, 25, 32];

export default function RebarCalculator() {
  const [diameter, setDiameter] = useState(12);
  const [length, setLength] = useState('');
  const [count, setCount] = useState('1');

  const result = useMemo(() => {
    const L = parseFloat(length) || 0;
    const N = parseInt(count) || 0;
    const perMeter = (diameter * diameter) / 162.2; // kg/m
    const perBar = perMeter * L;
    const totalLength = L * N;
    return { perMeter, perBar, total: perBar * N, totalLength, valid: L > 0 && N > 0 };
  }, [diameter, length, count]);

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/tools" className="text-blue-200 hover:text-white text-sm">← All Tools</Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">📏 Rebar Calculator</h1>
          <p className="text-blue-100 mt-2">Bar weights using the standard D²/162.2 formula.</p>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bar Diameter</label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-6">
              {DIAMETERS.map((d) => (
                <button
                  key={d} type="button" onClick={() => setDiameter(d)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${diameter === d ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  ⌀{d}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length per bar (m)</label>
                <input
                  type="number" min="0" step="any" value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of bars</label>
                <input
                  type="number" min="1" step="1" value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
              {result.valid ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Unit weight</p>
                    <p className="text-2xl font-bold">{result.perMeter.toFixed(3)} <span className="text-sm font-medium">kg/m</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Weight per bar</p>
                    <p className="text-2xl font-bold">{result.perBar.toFixed(2)} <span className="text-sm font-medium">kg</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Total weight</p>
                    <p className="text-2xl font-bold">{result.total.toFixed(2)} <span className="text-sm font-medium">kg</span></p>
                    <p className="text-blue-200 text-xs mt-1">{(result.total / 1000).toFixed(3)} tonnes</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Total length</p>
                    <p className="text-2xl font-bold">{result.totalLength.toFixed(1)} <span className="text-sm font-medium">m</span></p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-blue-100">Enter length and quantity to see the weight.</p>
              )}
            </div>

            {/* Reference table */}
            <div className="mt-8">
              <h3 className="font-bold mb-3">Standard unit weights (kg/m)</h3>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2 text-center text-sm">
                {DIAMETERS.map((d) => (
                  <div key={d} className="bg-gray-50 rounded-lg py-2 px-1">
                    <p className="font-semibold">⌀{d}</p>
                    <p className="text-gray-600">{((d * d) / 162.2).toFixed(3)}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Add 5-7% wastage and laps for ordering.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
