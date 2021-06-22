import {Controller, Get, Header} from '@nestjs/common';

@Controller('local-script-loading-another-scripts.js')
export class LocalScriptLoadingAnotherScriptsController {

  @Get()
  @Header('Content-type', 'text/javascript')
  get(): string {
    //language=javascript
    return `
    console.log('local-script-loading-another-local-script');
    var s = document.createElement('script');
    s.src = '/another-local-script.js';
    document.head.appendChild(s);
    var s1 = document.createElement('script');
    s1.innerText = 'console.log("another-inline-script")';
    document.head.appendChild(s1);
    `;
  }

}
