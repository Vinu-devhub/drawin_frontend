export const BgLightGrid1 = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#00091d_1px,transparent_1px)] [background-size:16px_16px] light" />
  );
};

export const BgDarkGrid1 = () => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] dark" />
  );
};
export const BgDark = () => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark " />
  );
};

export const BgLight = () => {
  return <div className="absolute top-0 z-[-2] h-screen w-screen bg-white  light" />;
};
