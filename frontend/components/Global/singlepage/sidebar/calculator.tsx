"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const Calculator = () => {
  const [avgComm, setAvgComm] = useState(5);
  const [conversions, setConversions] = useState(10);
  const [commission, setCommission] = useState(50);

  const calculateCommission = () => {
    const calculatedCommission = avgComm * conversions;
    setCommission(calculatedCommission);
  };

  return (
    <>
      <div className="bg-white rounded-md p-4">
        <div>
          <h4 className="text-xl font-semibold mb-1">Commission Calculator</h4>
          <hr className="w-36 border-b-2 border-primary rounded-lg" />
        </div>
        <div className="space-y-2 pt-4">
          <div>
            <Label className="text-sm font-medium mb-2">Avg Comm.</Label>
            <div className="relative">
              <Input
                className="pl-6 appearance-none  [-webkit-appearance:none] [-moz-appearance:textfield]"
                type="number"
                value={avgComm}
                onChange={(e) => setAvgComm(Number(e.target.value))}
              />
              <span className="absolute left-2 top-1.5 text-[16px] font-semibold text-emerald-600">$</span>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2">No. of Conversions</Label>
            <Input
            className=" appearance-none  [-webkit-appearance:none] [-moz-appearance:textfield]"
              type="number"
              value={conversions}
              onChange={(e) => setConversions(Number(e.target.value))}
            />
          </div>
          <Button className="w-full text-white tracking-wider" onClick={calculateCommission}>
            Calculate
          </Button>
        </div>
        <div className="border-t-2 mt-4 border-primary pt-2">
          <div className="flex flex-col text-center pt-5">
            <span className="text-4xl font-bold pb-1 text-emerald-600">${commission}</span>
            <span className="text-primary font-semibold">Total Commission</span>
          </div>
          {/* <Button className="w-full mt-2 text-white tracking-wider">Advanced Calculator</Button> */}
        </div>
      </div>
    </>
  );
};

export default Calculator;
