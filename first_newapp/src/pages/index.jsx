import Head from 'next/head';

import EmbedLoader from '@/components/EmbedLoader';
import { useState, useEffect, useMemo } from 'react';

export default function LandingPage() {
  const pageConfig = useMemo(() => ({"id":"home","isEnabled":true,"isProtected":false,"isStandard":true,"layout":"single-column","layoutContent":{"main":[{"instanceId":"4f0f20a8-903c-400a-9634-83094c3421bb-1764778924700-0.6295552268513557","overrides":{"card_badge":"","card_button_link":"","card_button_text":"Choose Plan","card_featured":false,"card_features":[],"card_price":"","card_title":"","chatbot_initial_questions":[],"chatbot_welcome_message":"","cta_button_link":"","cta_button_text":"","cta_subtitle":"","cta_title":"","dev_success_url":"","form_submissions_email":"","founder_bio":"","founder_image_url":"","founder_name":"","founder_title":"","frameless":true,"image_alt_text":"","image_url":"","jwt_secret":"","page_content":"","prod_domain":"","success_url_a":""},"token":"4f0f20a8-903c-400a-9634-83094c3421bb"},{"instanceId":"c49e0f9b-d9fd-45f1-af4a-1d7e3255e384-1764783142049-0.8735974856397727","overrides":{"card_badge":"","card_button_link":"","card_button_text":"Choose Plan","card_featured":false,"card_features":[],"card_price":"","card_title":"","chatbot_initial_questions":[],"chatbot_welcome_message":"","cta_button_link":"","cta_button_text":"","cta_subtitle":"","cta_title":"","dev_success_url":"","form_submissions_email":"","founder_bio":"","founder_image_url":"","founder_name":"","founder_title":"","frameless":true,"image_alt_text":"","image_url":"","jwt_secret":"","page_content":"","prod_domain":"","success_url_a":""},"token":"c49e0f9b-d9fd-45f1-af4a-1d7e3255e384"}]},"name":"Landing Page","path":"/"}), []);
  const apiHost = process.env.NEXT_PUBLIC_QR_EMBED_URL;
  const [mainEmbeds, setMainEmbeds] = useState([]);
  
  useEffect(() => {
    
    const mainEmbedsFromConfig = pageConfig.layoutContent?.main || [];
    setMainEmbeds(mainEmbedsFromConfig);
      
  }, [pageConfig]);
    

  return (
    <>
      <Head>
        <title>Landing Page - newapp</title>
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

