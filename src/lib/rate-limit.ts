/**
 * Rate limiting por janela fixa, em memória.
 *
 * ATENÇÃO — o estado vive no processo. Em serverless ou com mais de uma
 * instância cada réplica tem seu próprio contador, então isto reduz abuso
 * casual mas não substitui um limitador central. Em produção, troque a
 * implementação por Redis/Upstash mantendo esta mesma assinatura.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Evita que a Map cresça sem limite com chaves já expiradas. */
function evictExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  readonly allowed: boolean;
  /** Segundos até a janela reabrir — para a mensagem ao usuário. */
  readonly retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > 5_000) evictExpired(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  return {
    allowed: bucket.count <= limit,
    retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
  };
}
