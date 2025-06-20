const secretKey = 'burger-secret-key';

export function encode(value: number): string {
  const raw = `${value}:${secretKey}`;
  return Buffer.from(raw).toString('base64'); 
}

export function decode(token: string): number | null {
  const raw = Buffer.from(token, 'base64').toString();
  const [val, key] = raw.split(':');
  if (key === secretKey) {
    return parseInt(val, 10);
  }
  return null;
}