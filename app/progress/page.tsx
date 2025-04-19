"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { User } from "@supabase/supabase-js";

interface FoodLog {
  date: string;
  kalorier: number;
}

export default function ProgressPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [data, setData] = useState<FoodLog[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

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