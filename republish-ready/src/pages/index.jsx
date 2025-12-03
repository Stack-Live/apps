import Head from 'next/head';

import EmbedLoader from '@/components/EmbedLoader';
import { useState, useEffect, useMemo } from 'react';

export default function LandingPage() {
  const pageConfig = useMemo(() => ({"id":"home","isEnabled":true,"isProtected":false,"isStandard":true,"layout":"hero-with-features","layoutContent":{"features":[],"hero":[{"instanceId":"f3637aa8-6104-4ec5-a948-1577364d421c-1764625947420-0.11065254530625313","overrides":{},"token":"f3637aa8-6104-4ec5-a948-1577364d421c"}]},"name":"Landing Page","path":"/"}), []);
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
        <title>Landing Page - Republish Ready</title>
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

