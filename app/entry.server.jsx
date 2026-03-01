import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';
import { ServerRouter } from 'react-router';
import { createReadableStreamFromReadable } from '@react-router/node';

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext
) {
  return new Promise((resolve, reject) => {
    // Add charset to content type
    responseHeaders.set('Content-Type', 'text/html; charset=utf-8');

    const passThrough = new PassThrough();

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellError() {
          passThrough.destroy(new Error('React Router SSR Shell Error'));
          reject(new Error('React Router SSR Shell Error'));
        },
        onError(error) {
          responseStatusCode = 500;
          console.error('React Router SSR Error:', error);
        },
      }
    );

    // Abort the shell rendering if the request gets aborted
    const abort_timer = setTimeout(() => {
      abort();
    }, 30_000);

    pipe(
      new PassThrough({
        destroy() {
          clearTimeout(abort_timer);
        },
      })
    ).pipe(passThrough);

    resolve(
      new Response(createReadableStreamFromReadable(passThrough), {
        headers: responseHeaders,
        status: responseStatusCode,
      })
    );
  });
}
