import {Controller, Get, Header, Query} from '@nestjs/common';

@Controller('3-nonce')
export class NonceController {

  // http://localhost:3333/3-nonce/with-script.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/3-nonce/with-script.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/3-nonce/with-script.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-script.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'nonce-SOME-RANDOM-STRING';`)
  getWithScript(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script nonce="SOME-RANDOM-STRING">
        console.log('inline-script')
      </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/3-nonce/with-script-adding-another-not-trusted.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/3-nonce/with-script-adding-another-not-trusted.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/3-nonce/with-script-adding-another-not-trusted.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-script-adding-another-not-trusted.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'nonce-SOME-RANDOM-STRING';`)
  getWithScriptAddingAnotherNotTrusted(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script nonce="SOME-RANDOM-STRING">
        console.log('inline-script')
        var s = document.createElement('script');
        s.src = '/local-script.js';
        document.head.appendChild(s);
      </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/3-nonce/with-script-adding-another-trusted.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/3-nonce/with-script-adding-another-trusted.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/3-nonce/with-script-adding-another-trusted.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-script-adding-another-trusted.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'nonce-SOME-RANDOM-STRING' 'strict-dynamic';`)
  getWithScriptAddingAnotherTrusted(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script nonce="SOME-RANDOM-STRING">
        console.log('inline-script')
        var s = document.createElement('script');
        s.src = '/local-script.js';
        document.head.appendChild(s);
      </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/3-nonce/with-script-adding-another-and-another-trusted.html?param=Hello%20World
  @Get('with-script-adding-another-and-another-trusted.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'nonce-SOME-RANDOM-STRING' 'strict-dynamic';`)
  getWithScriptAddingAnotherAndAnotherTrusted(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script nonce="SOME-RANDOM-STRING">
        console.log('inline-script')
        var s = document.createElement('script');
        s.src = '/local-script-loading-another-scripts.js';
        document.head.appendChild(s);
      </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/3-nonce/with-script-adding-another-and-another-not-trusted.html?param=Hello%20World
  @Get('with-script-adding-another-and-another-not-trusted.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'nonce-SOME-RANDOM-STRING';`)
  getWithScriptAddingAnotherAndAnotherNotTrusted(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script nonce="SOME-RANDOM-STRING">
        console.log('inline-script')
        var s = document.createElement('script');
        s.src = '/local-script-loading-another-scripts.js';
        document.head.appendChild(s);
      </script>
      </body>
      </html>
    `
  }

}
