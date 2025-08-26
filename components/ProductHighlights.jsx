export default function ProductHighlights() {
  const highlights = [
    { title: "Fast", desc: "Quick product browsing experience" },
    { title: "Secure", desc: "Safe login and data storage" },
    { title: "Modern UI", desc: "Responsive and beautiful design" },
  ];

  return (
    <section className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {highlights.map((item, idx) => (
          <div key={idx} className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
