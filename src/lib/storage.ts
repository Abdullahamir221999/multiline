import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const SIMULATE = process.env.WA_SIMULATE === '1';

/**
 * Cloudflare R2 (S3-compatible, no egress fees). Swap the endpoint for any
 * S3-compatible provider. Meta's media URLs expire, so the bytes must land here.
 */
let s3: S3Client | null = null;
function client() {
  if (!s3) {
    s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return s3;
}

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'video/mp4': 'mp4', 'video/3gpp': '3gp',
};

export async function storeAttachment(waNumber: string, buffer: Buffer, mimeType: string) {
  const ext = EXT[mimeType] ?? 'bin';
  const key = `complaints/${waNumber}/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;

  if (SIMULATE) return `https://simulated.local/${key}`;

  await client().send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  }));
  return `${process.env.R2_PUBLIC_BASE_URL}/${key}`;
}