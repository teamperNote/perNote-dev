import styled from 'styled-components';

export const RecommendationContainer = styled.div`
    width: 1920px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Span = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 50px;
    line-height: 72px;
    text-align: center;
`;

export const Title = styled(Span)`
    margin-top: 130px;
    margin-bottom: 55px;
`;

export const TagBox = styled.div`
    display: flex;
    margin-bottom: 120px;
`;

export const RecommendationTag = styled.div`
    padding: 10px 30px;
    background: #E2E2E2;
    border-radius: 100px;
    margin-right: 30px;
    :last-child {
        margin-right: 0;
    }
`;

export const TagText = styled(Span)`
    font-weight: 400;
    font-size: 30px;
    line-height: 43px;
    ::before{
        content: '#';
    }
`;

export const PerfumeImage = styled.img`
    width: 730px;
    height: 730px;
    border-radius: 30px;
    margin-bottom: 60px;
`;

export const SubTitle = styled(Span)<{ margin_B: string }>`
    font-size: 40px;
    line-height: 58px;
    margin-bottom: ${({margin_B}) => margin_B};
`;

export const PerfumeDesc = styled(Span)<{ margin_B: string }>`
    max-width: 789px;
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    margin-bottom: ${({margin_B}) => margin_B};

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
`;

export const ShowMore = styled(Span)`
    font-weight: 500;
    font-size: 30px;
    line-height: 150%;
    text-decoration-line: underline;
    cursor: pointer;
    margin-bottom: 173px;
`;

export const Tip = styled(RecommendationTag)`
    padding: 10px 50px;
    background: #D9D9D9;
    margin-right: 0;
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    margin-bottom: 35px;
`;

export const TipText = styled(TagText)`
    ::before{
        content: '';
    }
    margin-bottom: 70px;
`;

export const ConditionsBox = styled.div`
    width: 1736px;
    height: 213px;
    background: #D9D9D9;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 210px;
`;

export const ConditionsTag = styled(RecommendationTag)`
    background: #FFFFFF;
`;

export const ConditionsText = styled(TipText)`
    margin-bottom: 0;
`;

export const SubRecommendationBox = styled.div`
    display: flex;
`;

export const SubRecommendationCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 46px;
    :last-child {
        margin-right: 0;
    }
`;

export const SubRecommendationImg = styled.div` //img로 수정
    width: 400px;
    height: 400px;
    background: #D9D9D9;
    border-radius: 30px;
    margin-bottom: 30px;
`;

export const SubPerfumeName = styled(TipText)`
    margin-bottom: 190px;
`;