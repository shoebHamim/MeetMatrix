import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <div>Room no {params.id}</div>;
};

export default page;
