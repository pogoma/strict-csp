import {Controller, Get, Header, Query} from '@nestjs/common';

@Controller('2-self-csp')
export class SelfCspController {

  // http://localhost:3333/2-self-csp/without-script.html?param=Hello%20World
  // XSS-inline: http://localhost:3333/2-self-csp/without-script.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/2-self-csp/without-script.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('without-script.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'unsafe-inline' 'self';`)
  getWithoutScript(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      </body>
      </html>
    `
  }

  // http://localhost:3333/2-self-csp/with-inline-script.html?param=Hello%20World
  // XSS: http://localhost:3333/2-self-csp/with-inline-script.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/2-self-csp/with-inline-script.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-inline-script.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'unsafe-inline' 'self';`)
  getWithInlineScript(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
        <script>
          console.log("inline script")
        </script>
      </body>
      </html>
    `
  }

  // http://localhost:3333/2-self-csp/with-local-script.html?param=Hello%20World
  // XSS: http://localhost:3333/2-self-csp/with-local-script.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
  // XSS-external: http://localhost:3333/2-self-csp/with-local-script.html?param=%3Cscript%20src%3D%22https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js%22%3E%3C%2Fscript%3E
  @Get('with-local-script.html')
  @Header('Content-type', 'text/html')
  @Header('Content-Security-Policy', `script-src 'unsafe-inline' 'self';`)
  getWithScript(@Query('param') param: string): string {
    //language=HTML
    return `
      <html>
      <body>
      <div>
        ${param}
      </div>
      <script src="/local-script.js"></script>
      </body>
      </html>
    `
  }

}
