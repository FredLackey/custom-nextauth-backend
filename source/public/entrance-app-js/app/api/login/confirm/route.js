import _ from 'restutils-helpers';
import { NextRequest, NextResponse } from 'next/server';

const { PRIVATE_API_URL } = process.env;

const toUrl = url => {
  const base = PRIVATE_API_URL.endsWith('/')
    ? PRIVATE_API_URL.substring(0, PRIVATE_API_URL.length - 1)
    : PRIVATE_API_URL;
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`;
}

export const POST = async (req) => {
  
  const body = await req.json();
  const { address, code } = body;

  if (!address || !code) {
    return new NextResponse("Missing address or code", { status: 400 });
  }

  const result = await _.doPost(toUrl('login/confirm'), body);
  if (result.statusCode !== 200) {
    return new NextResponse(result.message, { status: result.statusCode });
  }

  return new NextResponse(result, { status: 200 });
}