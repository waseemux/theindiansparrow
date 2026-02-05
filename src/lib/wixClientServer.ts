import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";

export async function getWixClient() {
    await cookies();
    // const session = cookieStore.get("wix_accessToken"); // Removing unused for now

    return createClient({
        modules: {
            products,
            collections,
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
