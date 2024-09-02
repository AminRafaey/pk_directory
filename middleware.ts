import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { slugData, cityData, stateData, countryData } from './src/shared/staticData'

export async function middleware(request: NextRequest) {
    // for latter use
    // const school_slugs = await (await fetch("http://localhost:9000/api/Schools/get-all-slug")).json();
    // const all_city = await (await fetch("http://localhost:9000/api/Schools/get-all-city")).json();
    // const all_state = await (await fetch("http://localhost:9000/api/Schools/get-all-state")).json();
    // const all_country = await (await fetch("http://localhost:9000/api/Schools/get-all-country")).json();
   
    const school_slugs = slugData;
    const all_city = cityData;
    const all_state = stateData;
    const all_country = countryData;

    const isSlugExist = school_slugs.find((data) => data.slug === request.nextUrl.pathname.replace("/", ""));
    if (isSlugExist) {
        return;
    }

    const isCityExist = all_city.find((data) => data.slugTypeCity === request.nextUrl.pathname.replace(/\s+/g, '-').toLowerCase().slice(1));
    if (isCityExist) {
        return NextResponse.rewrite(new URL(`/city/${isCityExist?.slugTypeCity}`, request.url))
    }

    const isStateExist = all_state.find((data) => data.slugTypeState === request.nextUrl.pathname.replace(/\s+/g, '-').toLowerCase().slice(1));
    if (isStateExist) {
        return NextResponse.rewrite(new URL(`/state/${isStateExist?.slugTypeState}`, request.url))
    }
    const isCountryExist = all_country.find((data) => data.slugTypeCountry === request.nextUrl.pathname.replace(/\s+/g, '-').toLowerCase().slice(1));
    if (isCountryExist) {
        return NextResponse.rewrite(new URL(`/country/${isCountryExist?.slugTypeCountry}`, request.url))
    }
    return;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|favicon.ico|icons|assets|manifest.json|logo|resource|webpack-hmr).*)',
    ],
}