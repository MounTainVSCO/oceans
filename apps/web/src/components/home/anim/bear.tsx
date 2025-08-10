import React from "react";

export default function BearAnim() {
  return (
    <>
      <style>{`
        .cozy-loader {
          width: 160px;
          height: 185px;
          position: relative;
          background: #f5e6d3; /* soft beige */
          border-radius: 100px 100px 0 0;
        }

        .cozy-loader:after {
          content: "";
          position: absolute;
          width: 100px;
          height: 125px;
          left: 50%;
          top: 25px;
          transform: translateX(-50%);
          background-image:
            radial-gradient(circle, #8a5a3c 48%, transparent 55%),
            radial-gradient(circle, #8a5a3c 48%, transparent 55%),
            radial-gradient(circle, #fffaf4 30%, transparent 45%),
            radial-gradient(circle, #5b4636 48%, transparent 51%),
            linear-gradient(#8a5a3c 20px, transparent 0),
            linear-gradient(#d4b499 60px, transparent 0),
            radial-gradient(circle, #d4b499 50%, transparent 51%),
            radial-gradient(circle, #d4b499 50%, transparent 51%);
          background-repeat: no-repeat;
          background-size:
            16px 16px, 16px 16px, 10px 10px, 42px 42px,
            12px 3px, 50px 25px, 70px 70px, 70px 70px;
          background-position:
            25px 10px, 55px 10px, 36px 44px, 50% 30px,
            50% 85px, 50% 50px, 50% 22px, 50% 45px;
          animation: cozyFaceLift 3s ease-in-out infinite alternate;
        }

        .cozy-loader:before {
          content: "";
          position: absolute;
          width: 140%;
          height: 125px;
          left: -20%;
          top: 0;
          background-image:
            radial-gradient(circle, #f5e6d3 48%, transparent 50%),
            radial-gradient(circle, #f5e6d3 48%, transparent 50%);
          background-repeat: no-repeat;
          background-size: 65px 65px;
          background-position: 0px 12px, 145px 12px;
          animation: cozyEarLift 3s ease-in-out infinite alternate;
        }

        @keyframes cozyFaceLift {
          0% { transform: translateX(-60%); }
          100% { transform: translateX(-30%); }
        }

        @keyframes cozyEarLift {
          0% { transform: translateX(10px); }
          100% { transform: translateX(0px); }
        }
      `}</style>

      <div className="cozy-loader"></div>
    </>
  );
}
