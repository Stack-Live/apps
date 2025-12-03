import Head from 'next/head';

import EmbedLoader from '@/components/EmbedLoader';
import { useState, useEffect, useMemo } from 'react';

export default function LandingPage() {
  const pageConfig = useMemo(() => ({"id":"home","isEnabled":true,"isProtected":false,"isStandard":true,"layout":"hero-with-features","layoutContent":{"features":[],"hero":[{"instanceId":"78fedb4b-585d-454b-bd90-5117a58875b9-1764627434477-0.13919875597832576","overrides":{},"token":"78fedb4b-585d-454b-bd90-5117a58875b9"}]},"name":"Landing Page","path":"/"}), []);
  const apiHost = process.env.NEXT_PUBLIC_QR_EMBED_URL;
  const [featuresEmbeds, setFeaturesEmbeds] = useState([]);
  const [heroEmbeds, setHeroEmbeds] = useState([]);
  
  useEffect(() => {
    
    const featuresEmbedsFromConfig = pageConfig.layoutContent?.features || [];
    setFeaturesEmbeds(featuresEmbedsFromConfig);
      
    const heroEmbedsFromConfig = pageConfig.layoutContent?.hero || [];
    setHeroEmbeds(heroEmbedsFromConfig);
      
  }, [pageConfig]);
    

  return (
    <>
      <Head>
        <title>Landing Page - ReplyAmp</title>
      </Head>
      <div>
        <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            {heroEmbeds && heroEmbeds.length > 0 ? 
        heroEmbeds.map((embedInfo, index) => (
          <EmbedLoader 
            key={embedInfo.instanceId || index}
            apiHost={apiHost}
            token={embedInfo.token}
            targetId={`embed-container-home-hero-${embedInfo.instanceId || index}`}
            overrides={embedInfo.overrides}
          />
        ))
       : null}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
            {featuresEmbeds && featuresEmbeds.length > 0 ? 
        featuresEmbeds.map((embedInfo, index) => (
          <EmbedLoader 
            key={embedInfo.instanceId || index}
            apiHost={apiHost}
            token={embedInfo.token}
            targetId={`embed-container-home-features-${embedInfo.instanceId || index}`}
            overrides={embedInfo.overrides}
          />
        ))
       : null}
          </div>
        
        </div>
      </div>
    </>
  );
}

