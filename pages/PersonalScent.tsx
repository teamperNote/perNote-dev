import type { NextPage } from 'next'

const PersonalScent: NextPage = () => {
  return (
    <div className='container'>
            <div className='start-container'>
                <div className='start-box'>
                    <span className='box-title'>PERSONAL</span>
                    <span className='box-title'>SCENT</span>
                    <span className='box-subtitle'>당신의 향을 찾아드립니다</span>
                    <span className='box-text'>자신만의 향을 찾기 힘들었나요?</span>
                    <span className='box-text'>​간단한 질문으로 여러분들에게 향수를 추천해드립니다!</span>
                    <div className='next-btn'>START</div>
                </div>
            </div>
            <img src='https://static.wixstatic.com/media/11062b_74216a4b17dd43cda4e9f7e5fd51e649~mv2_d_7680_4320_s_4_2.jpg/v1/fill/w_2766,h_1710,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/11062b_74216a4b17dd43cda4e9f7e5fd51e649~mv2_d_7680_4320_s_4_2.jpg' />
        <style jsx>{`
            .container {
                width: 100%;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .start-container {
                position: absolute;
                background-color: white;
                width: 580px;
                height: 300px;
                margin: 0 auto;
                padding: 5px;
                z-index: 1;
            }
            .start-box {
                border: 1px solid black;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 13px;
            }
            .box-title {
                font-size: 55px;
                color: #282626;
            }
            .box-subtitle {
                font-size: 17px;
                margin: 15px 0 12px 0;

            }
            .box-text {
                font-size: 15px;
            }
            .next-btn {
                color: white;
                background-color: black;
                width: 172px;
                height: 48px;
                /* position: absolute; */
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            img {
                width: 100%;
                z-index: 0;
            }
            `}</style>
    </div>
  )
}

export default PersonalScent
