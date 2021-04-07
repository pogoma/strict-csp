import {Controller, Get, Header, Query} from '@nestjs/common';


// http://localhost:3333/1-no-csp.html?param=Hello%20World
// XSS: http://localhost:3333/1-no-csp.html?param=%3Cscript%3Ealert(0)%3C%2Fscript%3E
@Controller('1-no-csp.html')
export class NoCspController {

  @Get()
  @Header('Content-type', 'text/html')
  get(@Query('param') param: string): string {
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

}
