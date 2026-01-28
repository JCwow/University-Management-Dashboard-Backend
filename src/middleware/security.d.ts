import type { Request, Response, NextFunction } from "express";
declare const securityMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export default securityMiddleware;
//# sourceMappingURL=security.d.ts.map