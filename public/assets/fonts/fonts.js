import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: 'NSKR-B';
        src: local('NSKR-B'),
        url(./NotoSansKR-Bold.otf) format('woff');
        font-weight: 700;
    }
    @font-face {
        font-family: 'NSKR-M';
        src: local('NSKR-B'),
        url(NotoSansKR-Medium.otf) format('woff');
        font-weight: 500;
    }
    @font-face {
        font-family: 'NSKR-R';
        src: local('NSKR-R'),
        url(NotoSansKR-Regular.otf) format('woff');
        font-weight: 400;
    }
`;
