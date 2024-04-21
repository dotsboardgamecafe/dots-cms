import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
import { pipeline } from 'stream';
import { promisify } from 'util';

import { IMAGE_MIME_MAP } from '@/constant/mime';
const pump = promisify( pipeline );

export async function POST ( req: NextRequest ) {
  try {
    const formData = await req.formData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file: any = formData.getAll( 'files' )[ 0 ];
    const typedFile = file as unknown as File;
    const fileFormat = IMAGE_MIME_MAP[ typedFile.type as keyof typeof IMAGE_MIME_MAP ];

    const timestamp = Date.now();
    const fileName = `${timestamp}${fileFormat}`;
    const filePath = `./public/file/${fileName}`;
    await pump( file.stream(), fs.createWriteStream( filePath ) );
    return NextResponse.json( { status: "success", data: `/file/${fileName}` } );
  }
  catch ( e ) {
    return NextResponse.json( { status: "fail", data: e } );
  }
}