export declare const auth: import("better-auth").Auth<{
    secret: string;
    trustedOrigins: string[];
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    emailAndPassword: {
        enabled: true;
    };
    user: {
        additionalFields: {
            role: {
                type: "string";
                required: true;
                defaultValue: string;
                input: true;
            };
            imageCldPubId: {
                type: "string";
                required: false;
                input: true;
            };
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map