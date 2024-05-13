import fs from 'fs';
import path from 'path';
import { z } from 'zod';

import endpointsData from './endpoints'; // Assuming endpoints.ts is in the same directory



// Step 1: Parse endpoints.ts file
interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  key: string;
  prefix?: string;
  payload?: Record<string, z.AnyZodObject>;
}

function parseEndpointsData ( endpointsData: Record<string, { method: string; path: string; prefix: string; payload?: Record<string, z.AnyZodObject>; }> ): Endpoint[] {
  const endpoints: Endpoint[] = [];
  for ( const key in endpointsData ) {
    if ( Object.prototype.hasOwnProperty.call( endpointsData, key ) ) {
      const endpoint = endpointsData[ key ];
      endpoints.push( {
        method: endpoint.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
        path: endpoint.path,
        prefix: endpoint.prefix,
        payload: endpoint.payload,
        key
      } );
    }
  }
  return endpoints;
}

// Step 2: Generate TypeScript code for client SDK
function generateClientSDK ( endpoints: Endpoint[] ): string {
  let clientSDKCode = '// Generated Client SDK\n\n';

  // Add imports
  clientSDKCode += 'import fetcher, { ApiOptions } from \'@/lib/api/utils/fetcher\';\n\n';

  // Add client SDK functions

  endpoints.forEach( endpoint => {

    clientSDKCode += `export async function ${endpoint.key}(options: ApiOptions) {\n`;
    clientSDKCode += `  return await fetcher('${endpoint.key}', options);\n`;
    clientSDKCode += `}\n\n`;
  } );

  return clientSDKCode;
}

function genTypeDefs ( endpoints: Endpoint[] ): string {
  let typeDefs = '// Generated Client SDK\n\n';

  endpoints.forEach( endpoint => {
    const keys = Object.keys( endpoint.payload ?? {} );
    typeDefs += `export type Payload${endpoint.key} = {\n`;

    keys.map( key => {
      typeDefs += `${key}: ${endpoint.payload?.[ key ] instanceof z.ZodString ? `string` : 'any'};\n`;
    } );

    typeDefs += `}\n\n`;
  } );

  return typeDefs;
}



// Main function
function generateSDKFromEndpointsData ( endpointsData: Record<string, { method: string; path: string; prefix: string; }> ): void {
  const endpoints = parseEndpointsData( endpointsData );
  const clientSDK = generateClientSDK( endpoints );
  // const typeDefs = genTypeDefs( endpoints );

  // Write client SDK to a file
  const outputFilePath = path.join( __dirname, 'clientSDK.ts' );
  fs.writeFileSync( outputFilePath, clientSDK );

  // const typedefPath = path.join( __dirname, 'typeDefs.ts' );
  // fs.writeFileSync( typedefPath, typeDefs );

  console.log( `Client SDK generated successfully at ${outputFilePath}` );
}

// Usage
generateSDKFromEndpointsData( endpointsData );

