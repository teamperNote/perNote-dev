/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";

const Options: NextPage = ({ options }:any) => {
  return (
    <div>
        {options.map((data: any) => (
            <span className='options' key={data.id}>{data.name}</span>
        ))}
        <style jsx>{`
            .options{
                font-size: 17px;
                cursor: pointer;
            }
            .options:after{
                content: 'ㅣ';
            }
            .options:last-child:after{
                content: '';
            }
        `}</style>
  </div>
  );
};

export default Options;
