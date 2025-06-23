// src/contexts/PacketContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type PacketData = {
  price: string;
  duration: string;
  type: string;
} | null;

type PacketContextType = {
  selectedPacket: PacketData;
  setSelectedPacket: (packet: PacketData) => void;
};

const PacketContext = createContext<PacketContextType | undefined>(undefined);

export const PacketProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPacket, setSelectedPacketState] = useState<PacketData>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedPacket = localStorage.getItem("selectedPacket");
    if (storedPacket) {
      try {
        setSelectedPacketState(JSON.parse(storedPacket));
      } catch (err) {
        console.error("Failed to parse stored packet data", err);
      }
    }
  }, []);

  // Save to localStorage on change
  const setSelectedPacket = (packet: PacketData) => {
    setSelectedPacketState(packet);
    localStorage.setItem("selectedPacket", JSON.stringify(packet));
  };

  return (
    <PacketContext.Provider value={{ selectedPacket, setSelectedPacket }}>
      {children}
    </PacketContext.Provider>
  );
};

export const usePacket = () => {
  const context = useContext(PacketContext);
  if (!context)
    throw new Error("usePacket must be used within a PacketProvider");
  return context;
};
