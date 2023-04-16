import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';
// import PageFive from './PageFive';
import PageStepTwo from './PageStepTwo';
import PageSix from './PageSix';
// import PageSeven from './PageSeven';
import PageEight from './PageEight';
import PageNine from './PageNine';
import PageStepThree from './PageStepThree';
import PageTen from './PageTen';
import PageEleven from './PageEleven';
import PageTwelve from './PageTwelve';
import PageThirteen from './PageThirteen';
import BedCount from './BedCount';
// import PageCounter from './PageCounter';
// import ProgressBar from "@badrap/bar-of-progress";
// import { useRouter } from 'next/router';



const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const pageNumber = useSelector((state) => state.pageNumber);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const getPage = (step) => {
    switch (step) {
      case 1:
        return <PageOne nextStep={nextStep} />;
      case 2:
        return <PageTwo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <PageThree nextStep={nextStep} prevStep={prevStep} />;
      // case 4:
      //   return <PageFour nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <BedCount nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <PageStepTwo nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <PageSix nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <PageThirteen nextStep={nextStep} prevStep={prevStep} />;
      case 8:
        return <PageEight nextStep={nextStep} prevStep={prevStep} />;
      case 9:
        return <PageNine nextStep={nextStep} prevStep={prevStep} />;
      case 10:
        return <PageStepThree nextStep={nextStep} prevStep={prevStep} />;
      case 11:
        return <PageTen nextStep={nextStep} prevStep={prevStep} />;
      case 12:
        return <PageEleven nextStep={nextStep} prevStep={prevStep} />;
      case 13:
        return <PageTwelve nextStep={nextStep} prevStep={prevStep} />;
    //   case 13:
    //     return <PageTwelve nextStep={nextStep} prevStep={prevStep} />;
      case 14:
        // return <PageFive prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return <div className="">{getPage(pageNumber || step)}</div>;
};

export default MultiStepForm;
