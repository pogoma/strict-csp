import {Controller, Get, Header, Query} from '@nestjs/common';

@Controller('4-hash')
export class HashController {

  // http://localhost:3333/4-hash/with-script.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/4-hash/with-script.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/4-hash/with-script.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-script.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'sha256-FImAWU7iVEFpJK6iufCYbK48a0K3mY8+hOW1jnLtWRE=';`)
  getWithScript(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script>
        console.log('inline-script')
      </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/4-hash/with-script-adding-another-not-trusted.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/4-hash/with-script-adding-another-not-trusted.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/4-hash/with-script-adding-another-not-trusted.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-script-adding-another-not-trusted.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'sha256-LP9Pq6+W2TPZaJquEWU3rAMJceYKlFv5z7ARkWn6OSE=';`)
  getWithScriptAddingAnotherNotTrusted(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script>
        console.log('inline-script')
        var s = document.createElement('script');
        s.src = '/local-script.js';
        document.head.appendChild(s);
      </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/4-hash/with-script-adding-another-trusted.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/4-hash/with-script-adding-another-trusted.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/4-hash/with-script-adding-another-trusted.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-script-adding-another-trusted.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'sha256-LP9Pq6+W2TPZaJquEWU3rAMJceYKlFv5z7ARkWn6OSE=' 'strict-dynamic';`)
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

}
