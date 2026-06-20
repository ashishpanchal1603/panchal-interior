export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Track page views on route changes
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track standard event actions
export const event = (
  action: string,
  {
    category,
    label,
    value,
    ...rest
  }: { category?: string; label?: string; value?: number; [key: string]: any } = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      page_location: window.location.href,
      timestamp: new Date().toISOString(),
      ...rest,
    });
  }
};

export interface ConversionParams {
  eventName: string;
  serviceSelected?: string;
  buttonSource: string;
  label?: string;
  [key: string]: any;
}

// Specific lead and intent conversion tracking helper
export const trackConversion = ({
  eventName,
  serviceSelected,
  buttonSource,
  label,
  ...rest
}: ConversionParams) => {
  event(eventName, {
    category: "Conversion",
    label: label || eventName,
    service_selected: serviceSelected,
    button_source: buttonSource,
    ...rest,
  });
};
