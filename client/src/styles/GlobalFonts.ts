import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  /* dongle-700 - korean */
  @font-face {
    font-family: 'Dongle';
    font-style: normal;
    font-weight: 700;
    src: url('./fonts/dongle-v4-korean-700.eot'); /* IE9 Compat Modes */
    src: local(''), url('./fonts/dongle-v4-korean-700.eot?#iefix') format('embedded-opentype'),
      /* IE6-IE8 */ url('./fonts/dongle-v4-korean-700.woff2') format('woff2'),
      /* Super Modern Browsers */ url('./fonts/dongle-v4-korean-700.woff') format('woff'),
      /* Modern Browsers */ url('./fonts/dongle-v4-korean-700.ttf') format('truetype'),
      /* Safari, Android, iOS */ url('./fonts/dongle-v4-korean-700.svg#Dongle') format('svg'); /* Legacy iOS */
  };


  /* nanum-gothic-700 - korean */
  @font-face {
    font-family: 'Nanum Gothic';
    font-style: normal;
    font-weight: 700;
    src: url('./fonts/nanum-gothic-v17-korean-700.eot'); /* IE9 Compat Modes */
    src: local(''), url('./fonts/nanum-gothic-v17-korean-700.eot?#iefix') format('embedded-opentype'),
      /* IE6-IE8 */ url('./fonts/nanum-gothic-v17-korean-700.woff2') format('woff2'),
      /* Super Modern Browsers */ url('./fonts/nanum-gothic-v17-korean-700.woff') format('woff'),
      /* Modern Browsers */ url('./fonts/nanum-gothic-v17-korean-700.ttf') format('truetype'),
      /* Safari, Android, iOS */ url('./fonts/nanum-gothic-v17-korean-700.svg#NanumGothic') format('svg'); /* Legacy iOS */
  };


`;
