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
  const { address } = body;

  if (!address) {
    return new NextResponse("Missing address", { status: 400 });
  }

  const result = await _.doPost(toUrl('login/request'), body);
  console.log('result', result);

  if (result.id) {
    return NextResponse.json(result);
  }

  if (result.statusCode) {
    return new NextResponse(result.message, { status: result.statusCode });
  }

  return new NextResponse('Unexpected response from server', { status: 500 });
}