import React, { useState } from "react";
import cities from "./cities.json";

const PrayerTimes = () => {
  const [region, setRegion] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrayerTimes = async (region) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://islomapi.uz/api/present/day?region=${region}`
      );
      const data = await response.json();
      setPrayerTimes(data);
    } catch (error) {
      console.error("Failed to fetch prayer times", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    fetchPrayerTimes(selectedRegion);
  };

  return (
    <div>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 mt-4">
        <h1 className="text-2xl font-bold text-center">Namoz Vaqtlari</h1>
        <div className="mb-4">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            Shaharni tanlang
          </label>
          <select
            id="region"
            value={region}
            onChange={handleSelectChange}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Shaharni tanlang</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mx-auto"></div>
            <p className="text-gray-500 mt-2">Yuklanmoqda...</p>
          </div>
        ) : (
          prayerTimes && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">
                Region: {prayerTimes.region}
              </h2>
              <p>Sana: {prayerTimes.date}</p>
              <p>Hafta kuni: {prayerTimes.weekday}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Namoz vaqtlari:</h3>
                <ul className="grid grid-cols-1 divide-y gap-2 list-disc list-inside pl-2">
                  <li>Tong saharlik: {prayerTimes.times.tong_saharlik}</li>
                  <li>Quyosh: {prayerTimes.times.quyosh}</li>
                  <li>Peshin: {prayerTimes.times.peshin}</li>
                  <li>Asr: {prayerTimes.times.asr}</li>
                  <li>Shom iftor: {prayerTimes.times.shom_iftor}</li>
                  <li>Hufton: {prayerTimes.times.hufton}</li>
                </ul>
              </div>
            </div>
          )
        )}
      </div>
      <div className="bg-black text-white absolute bottom-0 w-full flex justify-center py-2">
        <h2 className="max-w-[400px] text-center">
          Ma'luotlar islomapi.uz API dan olingan islomapi.uz "islomapi.uz"
          norasmiy api bo'lib, "islom.uz" ning ochiq ma'lumotlariga asoslangan
          holda ishlaydi. Muallif hech narsaga javobgar emas.
        </h2>
      </div>
    </div>
  );
};

export default PrayerTimes;
