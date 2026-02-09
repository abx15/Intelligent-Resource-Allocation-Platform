import Lottie from "lottie-react";
import successAnimation from "../assets/animations/success.json";

const SuccessAnimation = () => {
  return (
    <div className="w-32 h-32 mx-auto">
      <Lottie animationData={successAnimation} loop={false} />
    </div>
  );
};

export default SuccessAnimation;
