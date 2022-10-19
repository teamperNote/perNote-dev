import * as style from './RecommendationStyle';

const Recommendation = () => {
  return (
    <style.RecommendationContainer>
      <style.Title>당신에게 이 향수를 추천합니다</style.Title>
      <style.TagBox>
        {tag.map((data) => (
          <style.RecommendationTag key={data.id}>
            <style.TagText>
              {data.text}
            </style.TagText>
          </style.RecommendationTag>
          ))}
      </style.TagBox>
      <style.PerfumeImage />
      <style.SubTitle margin_B={'60px'}>Lorem Ipsum</style.SubTitle>
      <style.PerfumeDesc margin_B={'35px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis morbi nunc vel turpis sit congue. Vitae, vulputate nascetur sed placerat id orci velit sed. Consectetur faucibus magna at id etiam aliquam ultrices. Enim elementum, molestie blandit sagittis. Orci, tincidunt vel ac quis donec placerat viverra donec. In varius neque, ut turpis volutpat quis odio proin egestas. Ultrices dolor elementum bibendum maecenas amet aliquam gravida. Bibendum quis sit enim tempor. Tincidunt quis elit diam vitae lectus nullam proin nibh egestas. Vulputate non morbi tempor arcu. Sit id euismod pretium ante in nulla egestas dui in. Orci ut at metus ultricies. Amet, eget aliquam amet feugiat mi euismod. Egestas ac tortor consectetur maecenas amet proin nec, metus. Mauris, massa tellus lorem ultrices enim. Diam nullam massa odio eleifend viverra eget proin at magna. Ut turpis sed donec pharetra. Risus non posuere a elit. Dui gravida sagittis, vitae enim. </style.PerfumeDesc>
      <style.ShowMore>Show more &gt;</style.ShowMore>
      <style.Tip>TIP</style.Tip>
      <style.SubTitle margin_B={'5px'}>이런 상황에서 사용해보세요</style.SubTitle>
      <style.TipText>당신을 더욱 향기로운 사람으로 만들어줄 거예요!</style.TipText>
      <style.ConditionsBox>
        {conditions.map((data) => (
          <style.ConditionsTag key={data.id}>
            <style.ConditionsText>{data.text}</style.ConditionsText>
           </style.ConditionsTag>
        ))}
      </style.ConditionsBox>
      <style.SubTitle margin_B={'90px'}>비슷한 향수를 추천합니다</style.SubTitle>
      <style.SubRecommendationBox>
        {subRecommendation.map((data) => (
          <>
            <style.SubRecommendationCard key={data.id}>
              <style.SubRecommendationImg />
              <style.SubPerfumeName>{data.text}</style.SubPerfumeName>
            </style.SubRecommendationCard>
          </>
        ))}
      </style.SubRecommendationBox>

    </style.RecommendationContainer>
  )
}

const tag = [
  {
    id: 0,
    text: '여성스러운'
  },
  {
    id: 1,
    text: '산뜻한'
  },
  {
    id: 2,
    text: '데일리'
  },
  {
    id: 3,
    text: '달콤한'
  }
];

const conditions = [
  {
    id: 0,
    text: '눈이 내리는 겨울'
  },
  {
    id: 1,
    text: '데이트 할 때'
  },
  {
    id: 2,
    text: '파티에 갈 때'
  },
  {
    id: 3,
    text: '꾸안꾸 데일리로'
  },
];

const subRecommendation = [
  {
    id: 0,
    text: 'Lorem Ipsum'
  },
  {
    id: 1,
    text: 'Lorem Ipsum'
  },
  {
    id: 2,
    text: 'Lorem Ipsum'
  },
  {
    id: 3,
    text: 'Lorem Ipsum'
  },
];

export default Recommendation
