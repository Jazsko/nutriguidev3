"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { foodList } from "@/data/foods";
import { User } from "@supabase/supabase-js";

export default function LogPage() {
  const [selected, setSelected] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLog = async () => {
    if (!selected || !amount || !user) return;
    const grams = parseInt(amount);
    const calc = (val: number) => Math.round(val * grams / 100);
    const { error } = await supabase.from("food_logs").insert({
      user_id: user.id,
      date: new Date().toISOString().slice(0, 10),
      food: selected.name,
      amount: grams,
      kalorier: calc(selected.kcal),
      protein: calc(selected.protein),
      fett: calc(selected.fett),
      karbohydrater: calc(selected.karbohydrater)
    });
    if (error) setMessage("Noe gikk galt!");
    else setMessage("Mat logget!");
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Logg mat</h1>
      <select
        className="w-full p-2 border mb-2"
        onChange={(e) => {
          const item = foodList.find((f) => f.name === e.target.value);
          setSelected(item || null);
        }}
      >
        <option value="">Velg matvare</option>
        {foodList.map((f) => (
          <option key={f.name} value={f.name}>{f.name}</option>
        ))}
      </select>
      <input
        type="number"
        className="w-full p-2 border mb-2"
        placeholder="Gram"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleLog}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Logg mat
      </button>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
