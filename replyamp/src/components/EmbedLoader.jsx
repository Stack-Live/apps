
import { useEffect, useMemo } from 'react';

export default function EmbedLoader({ apiHost, token, targetId, overrides }) {
  const stableOverrides = useMemo(() => {
    if (!overrides || Object.keys(overrides).length === 0) return null;
    return JSON.stringify(overrides);
  }, [overrides]);

  useEffect(() => {
    if (apiHost === undefined || !token || !targetId) return;

    const container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = `${apiHost}/embed.js`;
    script.defer = true;
    script.dataset.token = token;
    script.dataset.host = apiHost;
    script.dataset.targetId = targetId;

    if (stableOverrides) {
      script.dataset.overrides = stableOverrides;
    }

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [apiHost, token, targetId, stableOverrides]);

  return <div id={targetId} className="min-h-[400px] flex items-center justify-center"></div>;
}
    