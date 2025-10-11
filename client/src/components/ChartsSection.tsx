"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartPieSimple } from "./charts/PieChart";
import { ChartLineDefault } from "./charts/LineChart";
import { ChartTooltipDefault } from "./charts/TooltipChart";

const ChartsSection = () => {
  const [dataType, setDataType] = useState<"expense" | "income">("expense");

  return (
    <div className="w-full md:container md:mx-auto">
      <div className="overflow-hidden">
        <Tabs defaultValue="pie" className="w-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <TabsList className="bg-muted rounded-full">
              <TabsTrigger
                value="pie"
                className="rounded-full font-medium data-[state=active]:bg-orange-200 data-[state=active]:text-black cursor-pointer"
              >
                Pie
              </TabsTrigger>
              <TabsTrigger
                value="line"
                className="rounded-full font-medium data-[state=active]:bg-orange-200 data-[state=active]:text-black cursor-pointer"
              >
                Line
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="rounded-full font-medium data-[state=active]:bg-orange-200 data-[state=active]:text-black cursor-pointer"
              >
                Weekly
              </TabsTrigger>
            </TabsList>

            <Select
              value={dataType}
              onValueChange={(value) =>
                setDataType(value as "expense" | "income")
              }
            >
              <SelectTrigger className="w-32 rounded-full text-black font-medium cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="expense">
                  Expense
                </SelectItem>
                <SelectItem className="cursor-pointer" value="income">
                  Income
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4">
            <TabsContent value="pie" className="m-0">
              <ChartPieSimple />
            </TabsContent>

            <TabsContent value="line" className="m-0">
              <ChartLineDefault />
            </TabsContent>

            <TabsContent value="weekly" className="m-0">
              <ChartTooltipDefault />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ChartsSection;
