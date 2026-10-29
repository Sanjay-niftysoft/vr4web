import { useEffect, useRef } from 'react';

/**
 * BusinessHoursWidget - Embeds WidgetCraft Business Hours Widget (id: 10)
 * Usage:
 *   <div id="business-hours-widget-10"></div>
 *   <script
 *     src="https://backend.ormconsult.com/embed/business-hours.js"
 *     data-widget-id="10"
 *     data-api-base="https://backend.ormconsult.com">
 *   </script>
 */
export default function BusinessHoursWidget({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any previously appended business-hours script
    const prevScript = containerRef.current.querySelector('script[src*="business-hours.js"]');
    if (prevScript) prevScript.remove();

    const script = document.createElement('script');
    script.src = 'https://backend.ormconsult.com/embed/business-hours.js';
    script.setAttribute('data-widget-id', '10');
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
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`}>
      <div id="business-hours-widget-10"></div>
    </div>
  );
}
