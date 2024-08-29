import { QueryParamProvider, QueryParamAdapterComponent } from 'use-query-params';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';

export const NextRouterAdapter: QueryParamAdapterComponent = ({ children }) => {
    const router = useRouter();
    const [location, setLocation] = useState({
        search: router.asPath.split('?')[1] || '',
    });

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setLocation({
                search: url.split('?')[1] || '',
            });
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const pushLocation = ({ search }: { search: string }) => {
        const newUrl = search ? `${router.pathname}?${search}` : router.pathname;
        router.push(newUrl, undefined, { shallow: true });
    };

    return (
        <QueryParamProvider adapter={{ location, pushLocation }}>
            {children}
        </QueryParamProvider>
    );
};
