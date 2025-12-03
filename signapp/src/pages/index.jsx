import Head from 'next/head';

import EmbedLoader from '@/components/EmbedLoader';
import { useState, useEffect, useMemo } from 'react';

export default function LandingPage() {
  const pageConfig = useMemo(() => ({"id":"home","isEnabled":true,"isProtected":false,"isStandard":true,"layout":"single-column","layoutContent":{"main":[{"instanceId":"94932b94-cee5-4347-83e5-518d4d1b7b6e-1764793825625-0.7188031036293622","overrides":{},"token":"94932b94-cee5-4347-83e5-518d4d1b7b6e"}]},"name":"Landing Page","path":"/"}), []);
  const apiHost = process.env.NEXT_PUBLIC_QR_EMBED_URL;
  const [mainEmbeds, setMainEmbeds] = useState([]);
  
  useEffect(() => {
    
    const mainEmbedsFromConfig = pageConfig.layoutContent?.main || [];
    setMainEmbeds(mainEmbedsFromConfig);
      
  }, [pageConfig]);
    

  return (
    <>
      <Head>
        <title>Landing Page - signapp</title>
      </Head>
      <div>
        <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto space-y-8 flex flex-col items-center">
            {mainEmbeds && mainEmbeds.length > 0 ? 
        mainEmbeds.map((embedInfo, index) => (
          <EmbedLoader 
            key={embedInfo.instanceId || index}
            apiHost={apiHost}
            token={embedInfo.token}
            targetId={`embed-container-home-main-${embedInfo.instanceId || index}`}
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

