import type { NextPage } from 'next'
import Card from '../components/Card';

const Note: NextPage = () => {
  return (
    <div className='container'>
      <div className='feature-container'>
        <span className='feature-text'>알파벳 바로가기</span>
        <span className='feature'>A&nbsp; B&nbsp; C&nbsp; D&nbsp; E&nbsp; F&nbsp; G&nbsp; H&nbsp; I&nbsp; J&nbsp; K&nbsp; L&nbsp; M&nbsp; N&nbsp; O&nbsp; P&nbsp; Q&nbsp; R&nbsp; S&nbsp; T&nbsp; U&nbsp; V&nbsp; W&nbsp; X&nbsp; Y Z</span>
      </div>
      <div className='alphabet'>A</div>
      <div className="card-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className='alphabet'>B</div>
      <div className="card-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className='pagination-box'>
        <div>MORE</div>
      </div>
      <style jsx>{`
        .container {
          width: 1280px;
          margin: 0 auto;
        }
        .feature-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 41px 0 36px 0;

        }
        .feature-text {
          font-size: 18px;

        }
        .feature {
          font-size: 18px;
          margin: 11px 0;
        }
        .dropdown-container {
          display: flex;
          justify-content: flex-end;
        }
        .card-container{
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }
        .alphabet{
          font-size: 50px;
          margin: 100px 0 30px 0;
        }
        .pagination-box {
          display: flex;
          justify-content: center;
          margin-bottom: 100px;
        }
      `}</style>
    </div>
  )
}

export default Note