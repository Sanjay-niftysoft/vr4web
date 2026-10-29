import { useEffect, useRef } from 'react';

/**
 * GoogleMapsWidget - Embeds WidgetCraft Google Maps Widget (id: 44)
 * Usage:
 *   <div id="widgetcraft-44"></div>
 *   <script
 *     src="https://backend.ormconsult.com/embed/widget.js"
 *     data-widget-id="44"
 *     data-widget-type="google_maps"
 *     data-api-base="https://backend.ormconsult.com">
 *   </script>
 */
export default function GoogleMapsWidget({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any previously appended script inside container
    const existingScript = containerRef.current.querySelector('script[src*="widget.js"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://backend.ormconsult.com/embed/widget.js';
    script.setAttribute('data-widget-id', '44');
    script.setAttribute('data-widget-type', 'google_maps');
    script.setAttribute('data-api-base', 'https://backend.ormconsult.com');
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full min-h-[420px] rounded-[10px] overflow-hidden ${className}`}>
      <div id="widgetcraft-44"></div>
    </div>
  );
}

