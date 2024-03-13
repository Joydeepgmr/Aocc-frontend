import React from 'react'
// import Cards from '../../../../components/card/cards'
import { Progress, Card } from 'antd';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent'
import "./style.scss"
import Performance from '../../../../assets/performance.svg'
import Airplane_1 from '../../../../assets/Airline_1.svg'
import RightArrow from '../../../../assets/RightArrow.svg'
const ProgressionCard = () => {
  return (
    <>
    <Card className='progress-card'>
    <div className='progress-card-body'>
            <div className='progress-body'>
            <div className='card-title'>
                <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="On-time performance" />
                <img src={Performance} alt="performance" />
            </div>
            <div className='progress-status-body'>
                <div className='progress-status-item'>
                    {/* <img src={Airplane_1} alt="" /> */}
                    <CustomTypography type="paragraph" fontSize={12} fontWeight="600" color="black" children="Airline 1"  />
                    <Progress percent={50} />
                </div>
            </div>
            <div className='progress-status-body'>
                <div className='progress-status-item'>
                    {/* <img src={Airplane_1} alt="" /> */}
                    <CustomTypography type="paragraph" fontSize={12} fontWeight="600" color="black" children="Airline 2"  />
                    <Progress percent={70} />
                </div>
            </div>
            </div>
            <div className='view-details'>
            <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="View Details" />
            <img src={RightArrow} alt="arrow" />
            </div>
        </div>
    </Card>
    </>  
  )
}

const CardContents = () => {
    return (
        <div className='progress-card-body'>
            <div className='progress-body'>
            <div className='card-title'>
                <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="On-time performance" />
                <img src={Performance} alt="performance" />
            </div>
            <div className='progress-status-body'>
                <div className='progress-status-item'>
                    <img src={Airplane_1} alt="" />
                    <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="On-time performance" />
                    <Progress percent={30} />
                </div>
            </div>
            <div className='view-details'>
            <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="View Details" />
            <img src={RightArrow} alt="arrow" />
            </div>
            </div>
            
        </div>
    )
}

export default ProgressionCard
