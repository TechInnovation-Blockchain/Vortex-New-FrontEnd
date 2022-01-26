import { Typography } from "@material-ui/core";
import ThemeModal from "../../Components/theme-modal";

const StakeComplete = () => {
  const content = () => (
    <>
      <div className="content text-center px-4">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring__circle"
            stroke="#65C988"
            strokeWidth="6"
            fill="transparent"
            r="45"
            cx="60"
            cy="60"
          />
        </svg>
        <Typography>
          <p style={{ fontSize: "24px" }} className="mb-4">
            STAKE COMPLETE
          </p>
          <p className="text">
            <span className="primaryText">{"10,000 XIO "}</span>
            tokens to be vested from
            <span className="primaryText">{"03.10.2021 "}</span>
            to
            <span className="primaryText">{" 03.10.2021"}</span>
          </p>
        </Typography>
      </div>
    </>
  );
  return (
    <>
      <ThemeModal show Content={content} />
    </>
  );
};

export default StakeComplete;
