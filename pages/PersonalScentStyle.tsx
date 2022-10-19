import styled from 'styled-components';

export const PersonalScentContainer = styled.div`
    width: 1920px;
    height: 970px;
    background: #EAEAEA;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 79px;
`;

export const PersonalScentBox = styled.div`
    width: 1398px;
    height: 738px;
    background: #D9D9D9;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const PersonalScentTitle = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 80px;
    line-height: 116px;
    margin-top: 148.05px;
    margin-bottom: 30.57px;
`;

export const PersonalScentText = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 35px;
    line-height: 51px;
    text-align: center;
    margin-bottom: 128.88px;
`;

export const StartBtn = styled.div`
    width: 288px;
    height: 80px;
    background: #FFFFFF;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StartSpan = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 50px;
    line-height: 72px;
`;

export const SubTitle = styled.span<{ margin_B?: string }>`
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 35px;
    line-height: 51px;
    margin-top: 90px;
    margin-bottom: ${({margin_B}) => margin_B || '113px'};
`;

export const CardContainer = styled.div`
    display: flex;
`;

export const Card = styled.div`
    width: 230px;
    height: 310px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-right: 63px;
    :last-child {
        margin-right: 0;
    }
`;

export const CardContent = styled.div`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 25px;
    line-height: 36px;
    text-align: center;
    margin-top: 233.06px;
`;
    
export const ColorCardContainer = styled(CardContainer)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
`;

export const ColorCard = styled(Card)`
    width: 200px;
    height: 200px;
    :last-child {
        margin-right: 0;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 0;
`;

export const Color = styled.div<{background: string}>`
    width: 66px;
    height: 66px;
    border-radius: 100%;
    background: ${({background}) => background};
`;

export const ColorCardContent = styled(CardContent)`
    margin-top: 28px;
`;

export const TextCardContainer = styled(ColorCardContainer)`
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: row dense;
`;

export const TextCard = styled(Card)`
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;
`;


export const TextCardContent = styled(CardContent)`
    margin-top: 0;
`;