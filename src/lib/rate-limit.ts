export class RateLimiter {
    private cache: Map<string, { count: number; expiresAt: number }>;
  
    constructor() {
      this.cache = new Map();
    }
  
    limit(identifier: string, maxRequests: number = 10, windowMs: number = 60000) {
      const now = Date.now();
      const record = this.cache.get(identifier);
  
      if (record) {
        if (now > record.expiresAt) {
          // Expired, reset
          this.cache.set(identifier, { count: 1, expiresAt: now + windowMs });
          return { success: true };
        }
  
        if (record.count >= maxRequests) {
          // Rate limited
          return { success: false };
        }
  
        // Increment
        record.count += 1;
        return { success: true };
      }
  
      // New record
      this.cache.set(identifier, { count: 1, expiresAt: now + windowMs });
      return { success: true };
    }
}
  
export const rateLimiter = new RateLimiter();
