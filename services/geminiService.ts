import { GoogleGenAI, Type } from "@google/genai";
import { Hotel } from '../types';

interface FetchHotelsParams {
    city: string;
    country: string;
    priceMin?: number;
    priceMax?: number;
}

const fetchHotels = async (params: FetchHotelsParams): Promise<Hotel[]> => {
  const { city, country, priceMin, priceMax } = params;

  // It's a hard requirement to get the API key from process.env
  // Do not add any UI to get the API key from the user.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
  const destination = `${city}, ${country}`;

  let priceInstruction = "a realistic price per night";
  if (priceMin && priceMax) {
      priceInstruction = `a realistic price per night between ${priceMin} and ${priceMax} USD`;
  } else if (priceMin) {
      priceInstruction = `a realistic price per night above ${priceMin} USD`;
  } else if (priceMax) {
      priceInstruction = `a realistic price per night below ${priceMax} USD`;
  }

  const prompt = `Generate a list of 12 fictional hotels in ${destination}. For each hotel, provide a unique and creative name, a short compelling description, ${priceInstruction}, a rating between 3.5 and 5.0 (with one decimal place), and a list of 3-5 popular amenities.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The name of the hotel.",
            },
            description: {
              type: Type.STRING,
              description: "A brief, engaging description of the hotel.",
            },
            pricePerNight: {
              type: Type.INTEGER,
              description: "The price per night in USD.",
            },
            rating: {
              type: Type.NUMBER,
              description: "The customer rating out of 5.",
            },
            amenities: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: "A list of key amenities.",
            },
          },
          required: ["name", "description", "pricePerNight", "rating", "amenities"],
        },
      },
    },
  });
  
  const jsonResponse = JSON.parse(response.text);

  // Add a random image URL and location to each hotel
  const hotelsWithImages: Hotel[] = jsonResponse.map((hotel: Omit<Hotel, 'imageUrl' | 'location'>, index: number) => ({
    ...hotel,
    location: destination,
    imageUrl: `https://picsum.photos/seed/${destination.replace(/\s/g, '')}${index}/400/300`,
  }));

  return hotelsWithImages;
};

export { fetchHotels };