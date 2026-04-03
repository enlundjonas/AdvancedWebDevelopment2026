function InfoSection({ image, title, text, reverse }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <img
        src={image}
        alt={title}
        className={`w-full rounded-xl shadow-md ${reverse ? "md:order-2" : ""}`}
      />

      <div className={`space-y-4 ${reverse ? "md:order-1" : ""}`}>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default InfoSection;