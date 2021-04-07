import {Controller, Get, Header} from '@nestjs/common';

@Controller('local-script.js')
export class LocalScriptController {

  @Get()
  @Header('Content-type', 'text/javascript')
  get(): string {
    //language=javascript
    return `
    console.log('local-script');
    `;
  }

}
