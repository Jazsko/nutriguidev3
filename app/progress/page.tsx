"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function ProgressPage() {
  const user = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("food_logs")
        .select("date, kalorier")
        .eq("user_id", user.id)
        .order("date", { ascending: true });
      if (!error) setData(data);
    };
    fetch();
  }, [user]);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kalorier over tid</h1>
      <LineChart width={350} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="kalorier" stroke="#8884d8" />
      </LineChart>
    </main>
  );
}
//as