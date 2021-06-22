import {Controller, Get, Header} from '@nestjs/common';

@Controller('another-local-script.js')
export class AnotherLocalScriptController {

  @Get()
  @Header('Content-type', 'text/javascript')
  get(): string {
    //language=javascript
    return `
    console.log('another-local-script');
    `;
  }

}
