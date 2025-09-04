


import { useState, useTransition } from "react";

export default function About() {

  const [query, setQuery] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const bigList = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Non-urgent update (filtering big list)
    startTransition(() => {
      const filtered = bigList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setList(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />

      {isPending && <p>Loading...</p>}

      <ul>
        {query && list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

}