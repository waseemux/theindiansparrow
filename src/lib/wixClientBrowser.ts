import { createClient, OAuthStrategy } from "@wix/sdk";
import { currentCart, checkout } from "@wix/ecom";
import { redirects } from "@wix/redirects";

// Browser-side Wix client for checkout operations
export function getWixClientBrowser() {
    return createClient({
        modules: {
            currentCart,
            checkout,
            redirects,
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                refreshToken: { value: "", role: "visitor" } as any,
                accessToken: { value: "", expiresAt: 0 },
            },
        }),
    });
}
