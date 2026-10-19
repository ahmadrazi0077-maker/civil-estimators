import Link from 'next/link';

/**
 * Shared hero banner for inner pages.
 * Props: image (bg url), badge, title, subtitle, crumb (current page label)
 */
export default function PageHero({ image, badge, title, subtitle, crumb }) {
  return (
    <div className="relative h-[380px] md:h-[460px] overflow-hidden">
      <img
        src={image}
        alt={typeof title === 'string' ? title : crumb}
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/70 to-black/80"></div>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <nav className="flex items-center space-x-2 text-sm mb-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-white font-medium">{crumb}</span>
            </nav>

            {badge && (
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white mb-4">
                {badge}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl text-gray-200 max-w-3xl">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
