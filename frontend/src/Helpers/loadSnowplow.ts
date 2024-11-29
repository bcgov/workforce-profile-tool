// src/utils/loadSnowplow.ts
export const loadSnowplow = () => {
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/Snowplow_Standalone vE.2.14.0.js`;
    script.async = true;
    document.body.appendChild(script);
};
