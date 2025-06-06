'use client'

import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('about')
  
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              {t('title')} <span className="font-bold text-teal-400">{t('subtitle')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto rounded-full"></div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">2+</div>
              <div className="text-gray-300 text-sm md:text-base">{t('experience')}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">15+</div>
              <div className="text-gray-300 text-sm md:text-base">{t('projects')}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">5+</div>
              <div className="text-gray-300 text-sm md:text-base">{t('clients')}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-gray-300 text-sm md:text-base">{t('technologies')}</div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-light text-white mb-6">
                  {t('passionateTitle')} <span className="font-bold text-teal-400">{t('passionateSubtitle')}</span>
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {t('description1')}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {t('description2')}
                </p>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-light text-white mb-8">
                {t('technicalTitle')} <span className="font-bold text-teal-400">{t('technicalSubtitle')}</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS'].map(skill => (
                      <span key={skill} className="bg-teal-500/20 text-teal-300 px-4 py-2 rounded-full text-sm font-medium border border-teal-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'PostgreSQL', 'MongoDB'].map(skill => (
                      <span key={skill} className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'Photoshop', 'Figma', 'Sanity', 'Wordpress', 'Shopify'].map(skill => (
                      <span key={skill} className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 