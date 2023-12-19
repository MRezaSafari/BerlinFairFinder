"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Map />
    </div>
  );
}
